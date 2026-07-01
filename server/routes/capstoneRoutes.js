const express = require('express');
const router = express.Router();
const { getMyAssignedProject, getAdminCapstones, releaseCapstoneAllocation, updateCapstoneProgress } = require('../controllers/capstoneController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/my', protect, getMyAssignedProject);
router.post('/progress', protect, updateCapstoneProgress);
router.get('/admin', protect, admin, getAdminCapstones);
router.post('/admin/release', protect, admin, releaseCapstoneAllocation);

module.exports = router;
