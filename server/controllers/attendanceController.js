const crypto = require('crypto');
const AttendanceSession = require('../models/AttendanceSession');
const AttendanceRecord = require('../models/AttendanceRecord');

// @desc    Enable attendance (Generate new active session)
// @route   POST /api/attendance/session
// @access  Private/Admin
const enableAttendance = async (req, res) => {
  try {
    // 1. Deactivate any active sessions
    await AttendanceSession.updateMany({ isActive: true }, { isActive: false, disabledAt: new Date() });

    // 2. Generate random 16-character code
    const code = crypto.randomBytes(8).toString('hex').toUpperCase();

    const { dayId } = req.body;

    if (!dayId || !dayId.toString().trim()) {
      return res.status(400).json({ message: 'Class Day Number is required' });
    }

    // 3. Create new session
    const session = await AttendanceSession.create({
      code,
      isActive: true,
      createdBy: req.user._id,
      dayId: dayId.toString().trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Attendance enabled successfully',
      session,
    });
  } catch (error) {
    console.error('Error enabling attendance:', error);
    res.status(500).json({ message: 'Server error while enabling attendance' });
  }
};

// @desc    Get current active attendance session
// @route   GET /api/attendance/session/active
// @access  Private
const getActiveSession = async (req, res) => {
  try {
    const session = await AttendanceSession.findOne({ isActive: true });
    
    res.status(200).json({
      success: true,
      session,
    });
  } catch (error) {
    console.error('Error getting active session:', error);
    res.status(500).json({ message: 'Server error while getting active session' });
  }
};

// @desc    Disable active attendance session (End session)
// @route   PUT /api/attendance/session/end
// @access  Private/Admin
const endAttendance = async (req, res) => {
  try {
    const result = await AttendanceSession.updateMany(
      { isActive: true },
      { isActive: false, disabledAt: new Date() }
    );

    res.status(200).json({
      success: true,
      message: 'Attendance session ended successfully',
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error('Error ending attendance:', error);
    res.status(500).json({ message: 'Server error while ending attendance' });
  }
};

// @desc    Scan QR Code to mark attendance
// @route   POST /api/attendance/scan
// @access  Private
const scanQR = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: 'Verification code is required' });
  }

  const formattedCode = code.trim().toUpperCase();

  try {
    // 1. Find active session with this code
    const session = await AttendanceSession.findOne({ code: formattedCode, isActive: true });

    if (!session) {
      return res.status(400).json({ message: 'Invalid or expired QR code' });
    }

    // 2. Check if student already marked attendance for this session
    const existingRecord = await AttendanceRecord.findOne({
      student: req.user._id,
      session: session._id,
    });

    if (existingRecord) {
      return res.status(400).json({ message: 'Attendance already marked for this session' });
    }

    // 3. Create attendance record
    const record = await AttendanceRecord.create({
      student: req.user._id,
      session: session._id,
      date: new Date().toLocaleDateString('en-CA'),
    });

    res.status(201).json({
      success: true,
      message: 'Attendance marked successfully',
      record,
    });
  } catch (error) {
    console.error('Error scanning QR code:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Attendance already marked for this session' });
    }
    res.status(500).json({ message: 'Server error while marking attendance' });
  }
};

// @desc    Get all attendance records (with student and session details)
// @route   GET /api/attendance/records
// @access  Private/Admin
const getAttendanceRecords = async (req, res) => {
  try {
    const records = await AttendanceRecord.find()
      .populate('student', 'name email')
      .populate('session', 'code createdAt isActive disabledAt dayId')
      .sort({ markedAt: -1 });

    res.status(200).json({
      success: true,
      records,
    });
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ message: 'Server error while fetching attendance records' });
  }
};

// @desc    Get attendance stats, streaks and heatmap data
// @route   GET /api/attendance/stats/:studentId?
// @access  Private
const getAttendanceStats = async (req, res) => {
  try {
    let studentId = req.user._id;
    if (req.params.studentId && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
      studentId = req.params.studentId;
    }

    const sessions = await AttendanceSession.find().sort({ createdAt: 1 }) || [];
    const records = await AttendanceRecord.find({ student: studentId }) || [];

    const attendedSessionIds = new Set();
    records.forEach(r => {
      if (r && r.session) {
        attendedSessionIds.add(r.session.toString());
      }
    });

    // Group sessions by date string (YYYY-MM-DD)
    const sessionsByDate = {};
    sessions.forEach(session => {
      if (!session) return;
      const dateObj = session.createdAt || new Date();
      const dateStr = new Date(dateObj).toLocaleDateString('en-CA');
      if (!sessionsByDate[dateStr]) {
        sessionsByDate[dateStr] = [];
      }
      sessionsByDate[dateStr].push(session);
    });

    const sortedSessionDates = Object.keys(sessionsByDate).sort();
    const totalSessions = sortedSessionDates.length;

    let attendedCount = 0;
    const heatmapData = {};

    sortedSessionDates.forEach(dateStr => {
      const daySessions = sessionsByDate[dateStr];
      const attended = daySessions.some(s => s._id && attendedSessionIds.has(s._id.toString()));
      if (attended) {
        attendedCount++;
        heatmapData[dateStr] = 'attended';
      } else {
        heatmapData[dateStr] = 'missed';
      }
    });

    const attendancePercentage = totalSessions > 0 
      ? Math.round((attendedCount / totalSessions) * 100) 
      : 100;

    // Calculate streaks based on unique session dates
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;

    sortedSessionDates.forEach(dateStr => {
      const daySessions = sessionsByDate[dateStr];
      const attended = daySessions.some(s => s._id && attendedSessionIds.has(s._id.toString()));
      if (attended) {
        tempStreak++;
        if (tempStreak > maxStreak) {
          maxStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
    });

    for (let i = sortedSessionDates.length - 1; i >= 0; i--) {
      const dateStr = sortedSessionDates[i];
      const daySessions = sessionsByDate[dateStr];
      const attended = daySessions.some(s => s._id && attendedSessionIds.has(s._id.toString()));
      if (attended) {
        currentStreak++;
      } else {
        // If the last session date has an active session and the student hasn't marked it yet, we don't break the streak.
        const hasActiveSession = daySessions.some(s => s.isActive);
        if (i === sortedSessionDates.length - 1 && hasActiveSession) {
          continue;
        }
        break;
      }
    }

    res.status(200).json({
      success: true,
      stats: {
        attendancePercentage,
        totalSessions,
        attendedCount,
        currentStreak,
        maxStreak,
        heatmapData
      }
    });
  } catch (error) {
    console.error('Error fetching attendance stats:', error);
    res.status(500).json({ message: 'Server error while calculating attendance stats' });
  }
};

module.exports = {
  enableAttendance,
  getActiveSession,
  endAttendance,
  scanQR,
  getAttendanceRecords,
  getAttendanceStats,
};

