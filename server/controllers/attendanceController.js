const crypto = require('crypto');
const AttendanceSession = require('../models/AttendanceSession');
const AttendanceRecord = require('../models/AttendanceRecord');

const normalizeDayId = (dayId) => {
  if (!dayId) return '';
  const str = dayId.toString().trim().toLowerCase();
  if (/^\d+$/.test(str)) {
    const dayNo = parseInt(str, 10);
    if (dayNo === 0) return 'w1-d0';
    const week = Math.ceil(dayNo / 6);
    const day = dayNo % 6 === 0 ? 6 : dayNo % 6;
    return `w${week}-d${day}`;
  }
  return str;
};

const getCalendarDateForDay = (dayId) => {
  const baseDate = new Date(2026, 4, 18); // May 18, 2026 (Month is 0-indexed)
  baseDate.setHours(0, 0, 0, 0);

  const getDayNumber = (id) => {
    if (!id) return 1;
    const str = id.toString().trim().toLowerCase();
    if (/^\d+$/.test(str)) {
      return parseInt(str, 10);
    }
    const match = str.match(/^w(\d+)-d(\d+)$/);
    if (match) {
      const week = parseInt(match[1], 10);
      const day = parseInt(match[2], 10);
      if (week === 1 && day === 0) return 0;
      return (week - 1) * 6 + day;
    }
    return 1;
  };

  const dayNo = getDayNumber(dayId);
  if (dayNo === 0) {
    return '2026-05-18';
  }

  let targetDate = new Date(baseDate);
  let nonSundayDaysAdded = 0;

  while (nonSundayDaysAdded < dayNo - 1) {
    targetDate.setDate(targetDate.getDate() + 1);
    if (targetDate.getDay() !== 0) { // 0 is Sunday
      nonSundayDaysAdded++;
    }
  }

  return targetDate.toLocaleDateString('en-CA');
};

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
      dayId: normalizeDayId(dayId),
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

    // 2. Check if student already marked attendance for this course day
    const normalizedDayId = normalizeDayId(session.dayId);
    const existingRecord = await AttendanceRecord.findOne({
      student: req.user._id,
      dayId: normalizedDayId,
    });

    if (existingRecord) {
      return res.status(400).json({ message: 'Attendance already marked for this day' });
    }

    // Restrict to one live attendance per calendar day
    const todayDate = new Date().toLocaleDateString('en-CA');
    const existingLiveRecordToday = await AttendanceRecord.findOne({
      student: req.user._id,
      attendanceType: 'live',
      date: todayDate,
    });

    if (existingLiveRecordToday) {
      return res.status(400).json({ message: 'You have already marked live attendance for today' });
    }

    // 3. Create attendance record
    const record = await AttendanceRecord.create({
      student: req.user._id,
      session: session._id,
      dayId: normalizedDayId,
      attendanceType: 'live',
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
      return res.status(400).json({ message: 'Attendance already marked for this day' });
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
const getAttendanceStats = async (req, res) => {
  try {
    let studentId = req.user._id;
    if (req.params.studentId && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
      studentId = req.params.studentId;
    }

    const sessions = await AttendanceSession.find().sort({ createdAt: 1 }) || [];
    const records = await AttendanceRecord.find({ student: studentId }) || [];

    // Map attended days with their attendanceType
    const attendedDayIds = {};
    records.forEach(r => {
      if (r && r.dayId) {
        attendedDayIds[normalizeDayId(r.dayId)] = r.attendanceType || 'live';
      }
    });

    // Group sessions by calculated calendar date string (YYYY-MM-DD)
    const sessionsByDate = {};
    sessions.forEach(session => {
      if (!session || !session.dayId) return;
      const dateStr = getCalendarDateForDay(session.dayId);
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
      
      let attendanceType = null;
      daySessions.forEach(s => {
        if (s && s.dayId) {
          const key = normalizeDayId(s.dayId);
          if (attendedDayIds[key]) {
            attendanceType = attendedDayIds[key];
          }
        }
      });

      if (attendanceType) {
        attendedCount++;
        heatmapData[dateStr] = attendanceType; // 'live' or 'recording'
      } else {
        heatmapData[dateStr] = 'missed';
      }
    });

    // Overlay records directly on their calculated calendar dates so they are guaranteed to show up in the heatmap
    records.forEach(r => {
      if (r && r.dayId) {
        const calculatedDateStr = getCalendarDateForDay(r.dayId);
        if (!heatmapData[calculatedDateStr] || heatmapData[calculatedDateStr] === 'missed' || heatmapData[calculatedDateStr] === 'none') {
          heatmapData[calculatedDateStr] = r.attendanceType || 'live';
        }
      }
    });

    // Calculate live and recording counts from heatmapData
    let liveCount = 0;
    let recordingCount = 0;
    Object.values(heatmapData).forEach(status => {
      if (status === 'live') {
        liveCount++;
      } else if (status === 'recording') {
        recordingCount++;
      }
    });

    const attendedCount = liveCount + recordingCount;

    const attendancePercentage = totalSessions > 0 
      ? Math.round((attendedCount / totalSessions) * 100) 
      : 100;

    // Calculate streaks based on unique session dates
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;

    sortedSessionDates.forEach(dateStr => {
      const daySessions = sessionsByDate[dateStr];
      const attended = daySessions.some(s => s && s.dayId && attendedDayIds[normalizeDayId(s.dayId)]);
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
      const attended = daySessions.some(s => s && s.dayId && attendedDayIds[normalizeDayId(s.dayId)]);
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
        liveCount,
        recordingCount,
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

// @desc    Mark attendance via watching recording
// @route   POST /api/attendance/recording
// @access  Private
const markRecordingAttendance = async (req, res) => {
  const { dayId } = req.body;

  if (!dayId || !dayId.toString().trim()) {
    return res.status(400).json({ message: 'Day ID is required' });
  }

  const formattedDayId = normalizeDayId(dayId);

  try {
    // 1. Check if student already marked attendance for this course day
    const existingRecord = await AttendanceRecord.findOne({
      student: req.user._id,
      dayId: formattedDayId,
    });

    if (existingRecord) {
      return res.status(400).json({
        message: `Attendance already marked for this day (${existingRecord.attendanceType.toUpperCase()})`,
      });
    }

    // 2. Calculate the calendar date of the session from the start date (May 18, 2026) skipping Sundays
    const recordDate = getCalendarDateForDay(formattedDayId);

    // 3. Create recording-based attendance record
    const record = await AttendanceRecord.create({
      student: req.user._id,
      dayId: formattedDayId,
      attendanceType: 'recording',
      date: recordDate,
    });

    res.status(201).json({
      success: true,
      message: 'Attendance marked via Recording successfully',
      record,
    });
  } catch (error) {
    console.error('Error marking recording attendance:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Attendance already marked for this day' });
    }
    res.status(500).json({ message: 'Server error while marking recording attendance' });
  }
};

// @desc    Get student's own attendance records
// @route   GET /api/attendance/my
// @access  Private
const getMyAttendance = async (req, res) => {
  try {
    const records = await AttendanceRecord.find({ student: req.user._id })
      .populate('session', 'code createdAt dayId')
      .sort({ markedAt: -1 });

    res.status(200).json({
      success: true,
      records,
    });
  } catch (error) {
    console.error('Error getting my attendance:', error);
    res.status(500).json({ message: 'Server error while getting my attendance' });
  }
};

module.exports = {
  enableAttendance,
  getActiveSession,
  endAttendance,
  scanQR,
  getAttendanceRecords,
  getAttendanceStats,
  markRecordingAttendance,
  getMyAttendance,
};

