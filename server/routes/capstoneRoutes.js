const express = require('express');
const router = express.Router();
const { getMyAssignedProject, getAdminCapstones, releaseCapstoneAllocation } = require('../controllers/capstoneController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/my', protect, getMyAssignedProject);
router.get('/admin', protect, admin, getAdminCapstones);
router.post('/admin/release', protect, admin, releaseCapstoneAllocation);

module.exports = router;
