const express = require('express');
const router = express.Router();
const {
  enableAttendance,
  getActiveSession,
  endAttendance,
  scanQR,
  getAttendanceRecords,
  getAttendanceStats,
  markRecordingAttendance,
  getMyAttendance,
  getAttendanceReport,
  updateStudentAttendance,
  getExtraSessions,
  updateExtraSession,
  deleteExtraSession,
} = require('../controllers/attendanceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/session', protect, admin, enableAttendance);
router.get('/session/active', protect, getActiveSession);
router.put('/session/end', protect, admin, endAttendance);
router.post('/scan', protect, scanQR);
router.get('/records', protect, admin, getAttendanceRecords);
router.get('/report', protect, admin, getAttendanceReport);
router.get('/stats', protect, getAttendanceStats);
router.get('/stats/:studentId', protect, getAttendanceStats);
router.get('/my', protect, getMyAttendance);
router.post('/recording', protect, markRecordingAttendance);
router.put('/update', protect, admin, updateStudentAttendance);

// Extra Classes / Schedule Adjustments Admin routes
router.get('/extra-sessions', protect, admin, getExtraSessions);
router.get('/schedule-adjustments', protect, admin, getExtraSessions);
router.put('/extra-sessions/:oldDayId', protect, admin, updateExtraSession);
router.delete('/extra-sessions/:dayId', protect, admin, deleteExtraSession);

module.exports = router;
