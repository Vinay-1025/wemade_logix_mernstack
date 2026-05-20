const express = require('express');
const router = express.Router();
const {
  enableAttendance,
  getActiveSession,
  endAttendance,
  scanQR,
  getAttendanceRecords,
} = require('../controllers/attendanceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/session', protect, admin, enableAttendance);
router.get('/session/active', protect, getActiveSession);
router.put('/session/end', protect, admin, endAttendance);
router.post('/scan', protect, scanQR);
router.get('/records', protect, admin, getAttendanceRecords);

module.exports = router;
