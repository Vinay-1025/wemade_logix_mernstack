const express = require('express');
const router = express.Router();
const {
  submitAssignment,
  getAssignments,
  updateAssignment,
  getMyAssignments,
} = require('../controllers/assignmentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, submitAssignment);
router.get('/my', protect, getMyAssignments);
router.get('/', protect, admin, getAssignments);
router.put('/:id', protect, admin, updateAssignment);

module.exports = router;
