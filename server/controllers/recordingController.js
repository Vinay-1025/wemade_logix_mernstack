const Recording = require('../models/Recording');
const User = require('../models/User');
const Notification = require('../models/Notification');

// @desc    Get recording links for a specific day
// @route   GET /api/recordings/:dayId
// @access  Private
const getRecording = async (req, res) => {
  try {
    const recording = await Recording.findOne({ dayId: req.params.dayId });
    if (!recording) {
      return res.json({ dayId: req.params.dayId, morningLink: '', eveningLink: '', commonLink: '' });
    }
    res.json(recording);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upsert recording links for a specific day
// @route   POST /api/recordings/:dayId
// @access  Private/Admin
const upsertRecording = async (req, res) => {
  try {
    const { morningLink, eveningLink, commonLink, dayTitle, topicId } = req.body;
    let recording = await Recording.findOne({ dayId: req.params.dayId });
    
    if (recording) {
      recording.morningLink = morningLink;
      recording.eveningLink = eveningLink;
      recording.commonLink = commonLink;
      recording.updatedBy = req.user._id;
      recording.updatedAt = Date.now();
      await recording.save();
    } else {
      recording = await Recording.create({
        dayId: req.params.dayId,
        morningLink,
        eveningLink,
        commonLink,
        updatedBy: req.user._id,
      });
    }

    // Only send notification if links are actually provided
    if (morningLink || eveningLink || commonLink) {
      // Extract Day Number (e.g. "2" from "Day 2: Multimedia Elements & Metadata")
      let dayNo = req.params.dayId;
      if (req.params.dayId === 'w1-d0') {
        dayNo = '0';
      } else if (dayTitle) {
        const match = dayTitle.match(/Day\s+(\d+)/i);
        if (match) {
          dayNo = match[1];
        }
      }

      const students = await User.find({ role: { $nin: ['admin', 'superadmin'] } });
      const notificationMessage = `day no ${dayNo} video recording is available in portal now`;

      // Prevent duplicate notifications
      const notifications = [];
      for (const student of students) {
        const exists = await Notification.findOne({
          recipient: student._id,
          type: 'system',
          targetTopicId: topicId || '',
          message: notificationMessage
        });
        
        if (!exists) {
          notifications.push({
            recipient: student._id,
            sender: req.user._id,
            type: 'system',
            message: notificationMessage,
            targetTopicId: topicId || '',
            relatedId: recording._id,
          });
        }
      }

      if (notifications.length > 0) {
        await Notification.insertMany(notifications);
      }
    }

    res.json(recording);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRecording, upsertRecording };
