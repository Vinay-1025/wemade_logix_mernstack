const express = require('express');
const router = express.Router();
const { getRecording, upsertRecording, getAllRecordings } = require('../controllers/recordingController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, getAllRecordings);
router.get('/:dayId', protect, getRecording);
router.post('/:dayId', protect, admin, upsertRecording);

module.exports = router;
