const Assignment = require('../models/Assignment');
const Notification = require('../models/Notification');
const User = require('../models/User');
const logAction = require('../utils/auditLogger');

// @desc    Submit an assignment
// @route   POST /api/assignments
// @access  Private (Student)
const submitAssignment = async (req, res) => {
  const { topicId, topicTitle, code } = req.body;

  if (!topicId || !topicTitle || !code) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const assignment = await Assignment.create({
      student: req.user._id,
      topicId,
      topicTitle,
      code,
    });

    // Audit Log
    await logAction(req.user, 'Assignment Submission', `Submitted assignment for ${topicTitle}`, assignment._id, 'Assignment');

    // Notify Admins and Superadmins
    const staff = await User.find({ role: { $in: ['admin', 'superadmin'] } });
    const notifications = staff.map(s => ({
      recipient: s._id,
      sender: req.user._id,
      type: 'assignment_submission',
      message: `${req.user.name} submitted an assignment for ${topicTitle}`,
      relatedId: assignment._id,
    }));

    await Notification.insertMany(notifications);

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all assignments
// @route   GET /api/assignments
// @access  Private (Admin)
const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate('student', 'name email')
      .sort('-submittedAt');
    res.json(assignments);
  } catch (error) {
    console.error('FETCH_ASSIGNMENTS_ERROR:', error);
    res.status(500).json({ message: 'Server error fetching assignments', error: error.message });
  }
};

// @desc    Update assignment status (Accept/Reject/Comment)
// @route   PUT /api/assignments/:id
// @access  Private (Admin)
const updateAssignment = async (req, res) => {
  const { status, feedback } = req.body;

  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    assignment.status = status || assignment.status;
    assignment.feedback = feedback || assignment.feedback;

    const updatedAssignment = await assignment.save();

    // Audit Log
    await logAction(req.user, 'Assignment Status Update', `Updated ${assignment.topicTitle} to ${status}`, assignment._id, 'Assignment');

    // Notify Student
    await Notification.create({
      recipient: assignment.student,
      sender: req.user._id,
      type: 'assignment_feedback',
      message: `Your assignment for ${assignment.topicTitle} has been ${status}. Feedback: ${feedback || 'No comments'}`,
      relatedId: assignment._id,
    });

    res.json(updatedAssignment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get current student's assignments
// @route   GET /api/assignments/my
// @access  Private
const getMyAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ student: req.user._id });
    res.json(assignments);
  } catch (error) {
    console.error('FETCH_MY_ASSIGNMENTS_ERROR:', error);
    res.status(500).json({ message: 'Server error fetching your assignments', error: error.message });
  }
};

module.exports = {
  submitAssignment,
  getAssignments,
  updateAssignment,
  getMyAssignments,
};
