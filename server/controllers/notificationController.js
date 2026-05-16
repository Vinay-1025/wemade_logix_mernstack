const Notification = require('../models/Notification');

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ 
      recipient: req.user._id,
      isDeleted: false 
    })
      .sort('-createdAt')
      .limit(20);
    res.json(notifications);
  } catch (error) {
    console.error('FETCH_NOTIFICATIONS_ERROR:', error);
    res.status(500).json({ 
      message: 'Server error fetching notifications', 
      error: error.message,
      stack: process.env.NODE_ENV === 'production' ? null : error.stack 
    });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id
// @access  Private
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    notification.isRead = true;
    notification.isDeleted = true; // Soft delete on click
    await notification.save();

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const clearNotifications = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id },
      { isDeleted: true }
    );
    res.json({ message: 'All notifications cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  clearNotifications,
};
