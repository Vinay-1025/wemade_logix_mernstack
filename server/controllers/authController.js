const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logAction = require('../utils/auditLogger');
const { sendWelcomeEmail } = require('../utils/emailService');
const crypto = require('crypto');
const Assignment = require('../models/Assignment');

const getCertificateId = (studentId) => {
  const hash = crypto
    .createHmac('sha256', process.env.JWT_SECRET || 'secret')
    .update(studentId.toString())
    .digest('hex')
    .substring(0, 8);
  return `WM-${studentId}-${hash}`;
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      // Audit Log
      await logAction(user, 'User Registration', `New student registered: ${user.email}`, user._id, 'User');

      // Auto email credentials securely
      await sendWelcomeEmail(user.email, user.name, password, user.role);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (!user.isActive) {
        return res.status(403).json({ message: 'Application was inactive for you and consult the management' });
      }
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      certificateOverride: user.certificateOverride || null,
      certificateId: getCertificateId(user._id),
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Get all users
// @route   GET /api/auth/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    const usersWithCertId = users.map(u => {
      const userObj = u.toObject();
      userObj.certificateId = getCertificateId(u._id);
      return userObj;
    });
    res.json(usersWithCertId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new user (Admin only)
// @route   POST /api/auth/users
// @access  Private/Admin
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'student',
    });

    if (user) {
      // Audit Log
      await logAction(req.user, 'Personnel Enrollment', `Enrolled new ${role}: ${user.email}`, user._id, 'User');

      // Auto email credentials securely
      await sendWelcomeEmail(user.email, user.name, password, user.role);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/auth/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (user.role === 'superadmin') {
        return res.status(403).json({ message: 'Cannot delete superadmin' });
      }

      await User.deleteOne({ _id: user._id });

      // Audit Log
      await logAction(req.user, 'Personnel Removal', `Removed personnel: ${user.email}`, user._id, 'User');

      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user status (Active/Inactive)
// @route   PUT /api/auth/users/:id/status
// @access  Private/Admin
const updateUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const oldStatus = user.isActive;
    const newStatus = req.body.isActive;

    if (user.role === 'superadmin' && !newStatus) {
      return res.status(403).json({ message: 'Cannot deactivate superadmin' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: newStatus },
      { new: true }
    ).select('-password');

    // Detailed Audit Log
    await logAction(
      req.user,
      'Status Change',
      `Status toggled from [${oldStatus ? 'Active' : 'Inactive'}] to [${newStatus ? 'Active' : 'Inactive'}] for ${user.email}`,
      user._id,
      'User'
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user
// @route   PUT /api/auth/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const changes = [];
    if (req.body.name && req.body.name !== user.name) changes.push(`Name: ${user.name} -> ${req.body.name}`);
    if (req.body.email && req.body.email !== user.email) changes.push(`Email: ${user.email} -> ${req.body.email}`);
    if (req.body.role && req.body.role !== user.role) changes.push(`Role: ${user.role} -> ${req.body.role}`);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name || user.name,
        email: req.body.email || user.email,
        role: req.body.role || user.role,
      },
      { new: true }
    ).select('-password');

    // Detailed Audit Log
    if (changes.length > 0) {
      await logAction(
        req.user,
        'Profile Update',
        `Changes to ${user.email}: ${changes.join(' | ')}`,
        user._id,
        'User'
      );
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user password
// @route   PUT /api/auth/password
// @access  Private
const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (user && (await user.matchPassword(currentPassword))) {
      user.password = newPassword;
      await user.save();

      await logAction(req.user, 'Security Update', `Password changed successfully`, user._id, 'User');

      res.json({ message: 'Password updated successfully' });
    } else {
      res.status(401).json({ message: 'Invalid current password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify student certificate
// @route   GET /api/auth/verify-certificate/:certId
// @access  Public
const verifyCertificate = async (req, res) => {
  const { certId } = req.params;

  try {
    if (!certId || !certId.startsWith('WM-')) {
      return res.status(400).json({ message: 'Invalid Certificate Format', isValid: false });
    }

    const parts = certId.split('-');
    if (parts.length !== 3) {
      return res.status(400).json({ message: 'Invalid Certificate Format', isValid: false });
    }

    const [prefix, studentId, signature] = parts;

    // Validate signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.JWT_SECRET || 'secret')
      .update(studentId)
      .digest('hex')
      .substring(0, 8);

    if (signature !== expectedSignature) {
      return res.status(400).json({ message: 'Certificate Signature Invalid', isValid: false });
    }

    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found', isValid: false });
    }

    // Calculate progress
    const acceptedCount = await Assignment.countDocuments({
      student: studentId,
      status: 'accepted',
    });
    const totalCourseDays = 43; // w1-d0 to w7-d6 = 43 days
    const progressPercent = Math.min(Math.round((acceptedCount / totalCourseDays) * 100), 100);

    const isUnlocked = student.certificateOverride === 'unlocked' || 
                       (student.certificateOverride !== 'locked' && progressPercent >= 100);

    if (!isUnlocked) {
      return res.json({
        isValid: false,
        message: 'Certificate is currently locked by system policy or management.',
        student: { name: student.name }
      });
    }

    let issueDate = student.createdAt;
    if (student.certificateOverride === 'unlocked') {
      issueDate = student.certificateUnlockedAt || student.createdAt;
    } else {
      const lastAssignment = await Assignment.findOne({
        student: studentId,
        status: 'accepted',
      }).sort({ updatedAt: -1 });
      if (lastAssignment) {
        issueDate = lastAssignment.updatedAt;
      }
    }
    const AttendanceRecord = require('../models/AttendanceRecord');
    const attendanceRecords = await AttendanceRecord.find({ student: studentId }).sort({ dayId: 1 });
    const studentAssignments = await Assignment.find({ student: studentId }).sort({ topicId: 1 });

    res.json({
      isValid: true,
      student: {
        name: student.name,
        email: student.email,
      },
      course: 'Full-Stack MERN Stack Development',
      issueDate: issueDate,
      completionDate: issueDate,
      engagement: {
        attendance: attendanceRecords,
        assignments: studentAssignments,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message, isValid: false });
  }
};

// @desc    Update single student certificate override
// @route   PUT /api/auth/users/:id/certificate-override
// @access  Private/Admin
const updateCertificateOverride = async (req, res) => {
  const { override } = req.body;

  try {
    const student = await User.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const overrideValue = override === 'auto' ? null : override;
    student.certificateOverride = overrideValue;
    if (override === 'unlocked') {
      student.certificateUnlockedAt = new Date();
    } else {
      student.certificateUnlockedAt = null;
    }
    await student.save();

    // Audit Log
    await logAction(
      req.user,
      'Certificate Override Update',
      `Certificate override set to [${override}] for ${student.email}`,
      student._id,
      'User'
    );

    res.json({
      message: `Certificate status updated for ${student.name}`,
      user: {
        _id: student._id,
        certificateOverride: student.certificateOverride,
        certificateId: getCertificateId(student._id),
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update all students certificate overrides
// @route   POST /api/auth/users/certificate-override-all
// @access  Private/Admin
const updateAllCertificateOverrides = async (req, res) => {
  const { override } = req.body;

  try {
    const overrideValue = override === 'auto' ? null : override;
    const updateFields = { certificateOverride: overrideValue };
    if (override === 'unlocked') {
      updateFields.certificateUnlockedAt = new Date();
    } else {
      updateFields.certificateUnlockedAt = null;
    }
    
    const result = await User.updateMany(
      { role: 'student' },
      updateFields
    );

    // Audit Log
    await logAction(
      req.user,
      'Global Certificate Override',
      `Set all student certificates override to [${override}]. Affected: ${result.modifiedCount} users.`,
      req.user._id,
      'User'
    );

    res.json({
      message: `Successfully set all student certificates to ${override}`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getUsers,
  createUser,
  deleteUser,
  updateUserStatus,
  updateUser,
  updatePassword,
  verifyCertificate,
  updateCertificateOverride,
  updateAllCertificateOverrides,
};
