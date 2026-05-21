const DayLock = require('../models/DayLock');
const logAction = require('../utils/auditLogger');

// @desc    Get all day lock overrides
// @route   GET /api/course/day-locks
// @access  Private
const getDayLocks = async (req, res) => {
  try {
    const locks = await DayLock.find({});
    res.status(200).json({ success: true, locks });
  } catch (error) {
    console.error('Get day locks error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching day locks' });
  }
};

// @desc    Update or create a day lock override
// @route   PUT /api/course/day-locks
// @access  Private/Admin
const updateDayLock = async (req, res) => {
  const { dayId, status } = req.body;

  if (!dayId || !status) {
    return res.status(400).json({ success: false, message: 'dayId and status are required' });
  }

  if (!['locked', 'unlocked', 'default'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value' });
  }

  try {
    const dayLock = await DayLock.findOneAndUpdate(
      { dayId },
      { status, updatedBy: req.user._id },
      { new: true, upsert: true }
    );

    // Audit log
    await logAction(
      req.user,
      'COURSE_LOCK_UPDATE',
      `Updated lock status of day ${dayId} to ${status}`,
      dayLock._id,
      'DayLock'
    );

    res.status(200).json({ success: true, dayLock });
  } catch (error) {
    console.error('Update day lock error:', error);
    res.status(500).json({ success: false, message: 'Server error updating day lock' });
  }
};

module.exports = {
  getDayLocks,
  updateDayLock
};
