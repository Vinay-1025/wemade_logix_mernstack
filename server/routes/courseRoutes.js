const express = require('express');
const router = express.Router();
const { getDayLocks, updateDayLock } = require('../controllers/courseController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/day-locks', protect, getDayLocks);
router.put('/day-locks', protect, admin, updateDayLock);

module.exports = router;
