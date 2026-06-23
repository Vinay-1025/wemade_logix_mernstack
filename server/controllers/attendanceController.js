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
  const baseDate = new Date(Date.UTC(2026, 4, 18)); // May 18, 2026 (Month is 0-indexed, UTC)

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

  let targetDate = new Date(baseDate.getTime());
  let nonSundayDaysAdded = 0;

  while (nonSundayDaysAdded < dayNo - 1) {
    targetDate.setUTCDate(targetDate.getUTCDate() + 1);
    if (targetDate.getUTCDay() !== 0) { // 0 is Sunday
      nonSundayDaysAdded++;
    }
  }

  const yyyy = targetDate.getUTCFullYear();
  const mm = String(targetDate.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(targetDate.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
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

    attendedCount = liveCount + recordingCount;

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


// @desc    Get attendance report HTML download
// @route   GET /api/attendance/report
// @access  Private/Admin
const getAttendanceReport = async (req, res) => {
  try {
    const User = require('../models/User');

    // 1. Fetch all students
    const students = await User.find({ role: 'student' }).sort({ name: 1 });
    
    // 2. Fetch all attendance records
    const records = await AttendanceRecord.find({});
    
    // 3. Fetch all sessions to calculate maxDayNum
    const sessions = await AttendanceSession.find({});

    // 4. Calculate max day number
    const getDayNumberFromId = (id) => {
      if (!id) return 0;
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
      return 0;
    };

    const getRecommendedDay = () => {
      const baseDate = new Date(2026, 4, 21); // May 21, 2026
      const today = new Date();
      baseDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      if (today < baseDate) {
        return 4;
      }

      let nonSundayDays = 0;
      let tempDate = new Date(baseDate);

      while (tempDate < today) {
        tempDate.setDate(tempDate.getDate() + 1);
        if (tempDate.getDay() !== 0) {
          nonSundayDays++;
        }
      }

      return 4 + nonSundayDays;
    };

    let maxDayNum = getRecommendedDay();

    sessions.forEach(s => {
      const num = getDayNumberFromId(s.dayId);
      if (num > maxDayNum) maxDayNum = num;
    });

    records.forEach(r => {
      const num = getDayNumberFromId(r.dayId);
      if (num > maxDayNum) maxDayNum = num;
    });

    // 5. Determine if Day 0 is present in any session or record
    const hasDay0 = sessions.some(s => s.dayId === 'w1-d0') || records.some(r => r.dayId === 'w1-d0');
    const daysList = [];
    if (hasDay0) {
      daysList.push(0);
    }
    for (let i = 1; i <= maxDayNum; i++) {
      daysList.push(i);
    }

    // Map each day to its calendar date and group normalized dayIds by date to avoid duplicates (e.g. May 18 coming 2 times)
    const uniqueDates = [];
    const dateToDayIds = {};
    daysList.forEach(d => {
      const normId = normalizeDayId(d);
      const dateStr = getCalendarDateForDay(normId);
      if (!uniqueDates.includes(dateStr)) {
        uniqueDates.push(dateStr);
      }
      if (!dateToDayIds[dateStr]) {
        dateToDayIds[dateStr] = [];
      }
      dateToDayIds[dateStr].push(normId);
    });

    const totalDays = uniqueDates.length;

    // 6. Map all records by student_dayId for fast O(1) lookup
    const recordMap = {};
    records.forEach(r => {
      if (r.student && r.dayId) {
        const sId = r.student.toString();
        const dId = normalizeDayId(r.dayId);
        recordMap[`${sId}_${dId}`] = r;
      }
    });

    // 7. Compile report rows
    let rowsHtml = '';
    students.forEach(student => {
      let liveCount = 0;
      let recordingCount = 0;
      let daysHtml = '';

      uniqueDates.forEach(dateStr => {
        const dayIds = dateToDayIds[dateStr];
        let matchedRecord = null;
        for (const dayId of dayIds) {
          const record = recordMap[`${student._id}_${dayId}`];
          if (record) {
            matchedRecord = record;
            break;
          }
        }

        if (matchedRecord) {
          if (matchedRecord.attendanceType === 'live') {
            liveCount++;
            daysHtml += `<td style="background-color: #dcfce7; color: #16a34a; font-weight: bold; border: 1px solid #cbd5e1; text-align: center; font-family: Calibri, sans-serif; padding: 8px;">Live</td>`;
          } else {
            recordingCount++;
            daysHtml += `<td style="background-color: #fef9c3; color: #ca8a04; font-weight: bold; border: 1px solid #cbd5e1; text-align: center; font-family: Calibri, sans-serif; padding: 8px;">Recording</td>`;
          }
        } else {
          daysHtml += `<td style="background-color: #fee2e2; color: #dc2626; font-weight: bold; border: 1px solid #cbd5e1; text-align: center; font-family: Calibri, sans-serif; padding: 8px;">Absent</td>`;
        }
      });

      const attendedCount = liveCount + recordingCount;
      const pct = totalDays > 0 ? Math.round((attendedCount / totalDays) * 100) : 100;
      
      const nameColor = pct >= 80 ? '#16a34a' : '#dc2626';

      rowsHtml += `
        <tr>
          <td style="color: ${nameColor}; font-weight: bold; border: 1px solid #cbd5e1; font-family: Calibri, sans-serif; padding: 8px;">${student.name}</td>
          <td style="color: #475569; border: 1px solid #cbd5e1; font-family: Calibri, sans-serif; padding: 8px;">${student.email}</td>
          ${daysHtml}
          <td style="background-color: ${pct >= 80 ? '#f0fdf4' : '#fef2f2'}; color: ${pct >= 80 ? '#16a34a' : '#dc2626'}; font-weight: bold; text-align: center; border: 1px solid #cbd5e1; font-family: Calibri, sans-serif; padding: 8px;">${pct}%</td>
        </tr>
      `;
    });

    // Generate day headers using actual calendar dates
    const dayHeadersHtml = uniqueDates.map(dateStr => {
      let formattedDate = dateStr;
      if (dateStr && dateStr.includes('-')) {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
          const date = new Date(parts[0], parts[1] - 1, parts[2]);
          formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
      }
      return `<th style="background-color: #f1f5f9; color: #475569; font-weight: bold; border: 1px solid #cbd5e1; text-align: center; font-family: Calibri, sans-serif; padding: 8px;">${formattedDate}</th>`;
    }).join('\n');

    // 8. Generate the Excel XML content
    const excelContent = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
  <!--[if gte mso 9]>
  <xml>
    <x:ExcelWorkbook>
      <x:ExcelWorksheets>
        <x:ExcelWorksheet>
          <x:Name>Attendance Report</x:Name>
          <x:WorksheetOptions>
            <x:DisplayGridlines/>
          </x:WorksheetOptions>
        </x:ExcelWorksheet>
      </x:ExcelWorksheets>
    </x:ExcelWorkbook>
  </xml>
  <![endif]-->
  <style>
    table {
      border-collapse: collapse;
      font-family: Calibri, sans-serif;
    }
    th {
      background-color: #f1f5f9;
      color: #475569;
      font-weight: bold;
      border: 1px solid #cbd5e1;
      padding: 8px;
      text-align: left;
    }
    td {
      padding: 8px;
      border: 1px solid #cbd5e1;
    }
  </style>
</head>
<body>
  <table>
    <thead>
      <!-- Title Row -->
      <tr>
        <th colspan="${3 + uniqueDates.length}" style="font-size: 16pt; font-weight: bold; text-align: left; background-color: #ffffff; border: none; padding-bottom: 5px; color: #0f172a; font-family: Calibri, sans-serif;">
          Students Attendance Report
        </th>
      </tr>
      <!-- Meta Row -->
      <tr>
        <th colspan="${3 + uniqueDates.length}" style="font-size: 10pt; color: #64748b; font-weight: normal; text-align: left; background-color: #ffffff; border: none; padding-bottom: 15px; font-family: Calibri, sans-serif;">
          Generated: ${new Date().toLocaleString()} | Total Days Tracked: ${totalDays}
        </th>
      </tr>
      <!-- Empty Spacer Row -->
      <tr>
        <th colspan="${3 + uniqueDates.length}" style="background-color: #ffffff; border: none; height: 10px;"></th>
      </tr>
      <!-- Main Table Headers -->
      <tr>
        <th style="background-color: #f1f5f9; color: #475569; font-weight: bold; border: 1px solid #cbd5e1; font-family: Calibri, sans-serif; padding: 8px;">Student Name</th>
        <th style="background-color: #f1f5f9; color: #475569; font-weight: bold; border: 1px solid #cbd5e1; font-family: Calibri, sans-serif; padding: 8px;">Email</th>
        ${dayHeadersHtml}
        <th style="background-color: #f1f5f9; color: #475569; font-weight: bold; border: 1px solid #cbd5e1; text-align: center; font-family: Calibri, sans-serif; padding: 8px;">Attendance %</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>
</body>
</html>
    `.trim();

    // 9. Send response as Excel file download
    res.setHeader('Content-Type', 'application/vnd.ms-excel');
    res.setHeader('Content-Disposition', 'attachment; filename=wemade_attendance_report.xls');
    return res.status(200).send(excelContent);
  } catch (error) {
    console.error('Error generating attendance report:', error);
    res.status(500).json({ message: 'Server error while generating attendance report' });
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
  getAttendanceReport,
};

