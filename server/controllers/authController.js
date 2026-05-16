const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logAction = require('../utils/auditLogger');

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
    res.json(users);
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

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getUsers,
  createUser,
  deleteUser,
  updateUserStatus,
  updateUser,
};
