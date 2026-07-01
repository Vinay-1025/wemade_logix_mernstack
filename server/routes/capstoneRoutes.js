const express = require('express');
const router = express.Router();
const { 
  getMyAssignedProject, 
  getAdminCapstones, 
  releaseCapstoneAllocation, 
  updateCapstoneProgress,
  addCustomTask,
  toggleCustomTask,
  deleteCustomTask,
  addPlannerCard,
  updatePlannerCard,
  deletePlannerCard,
  addTimesheetLog,
  deleteTimesheetLog
} = require('../controllers/capstoneController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/my', protect, getMyAssignedProject);
router.post('/progress', protect, updateCapstoneProgress);
router.get('/admin', protect, admin, getAdminCapstones);
router.post('/admin/release', protect, admin, releaseCapstoneAllocation);

// Addons: Custom Checklist Tasks
router.post('/custom-tasks', protect, addCustomTask);
router.put('/custom-tasks/:taskId/toggle', protect, toggleCustomTask);
router.delete('/custom-tasks/:taskId', protect, deleteCustomTask);

// Addons: Agile Planner Cards
router.post('/planner', protect, addPlannerCard);
router.put('/planner/:cardId', protect, updatePlannerCard);
router.delete('/planner/:cardId', protect, deletePlannerCard);

// Addons: Work Timesheet
router.post('/timesheet', protect, addTimesheetLog);
router.delete('/timesheet/:logId', protect, deleteTimesheetLog);

module.exports = router;
