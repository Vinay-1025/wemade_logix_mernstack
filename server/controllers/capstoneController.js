const mongoose = require('mongoose');
const CapstonePool = require('../models/CapstonePool');
const Assignment = require('../models/Assignment');
const logAction = require('../utils/auditLogger');

// @desc    Seed Capstone projects on startup if pool is empty or missing FP-00
const seedCapstonePool = async () => {
  try {
    const count = await CapstonePool.countDocuments({});
    if (count === 0) {
      const projects = [
        { projectCode: "FP-00", title: "MERN Sandbox & Reference Template" },
        { projectCode: "FP-01", title: "E-Commerce Marketplace Platform" },
        { projectCode: "FP-02", title: "Healthcare Booking & Consultation Portal" },
        { projectCode: "FP-03", title: "Real-Time Collaborative Project Board" },
        { projectCode: "FP-04", title: "Personal Finance & Expense Tracker Dashboard" },
        { projectCode: "FP-05", title: "Fitness & Workout Planner API" },
        { projectCode: "FP-06", title: "Online Learning Management System (LMS)" },
        { projectCode: "FP-07", title: "Real-Time Chat & Instant Messenger Hub" },
        { projectCode: "FP-08", title: "Customer Relationship Management (CRM) Suite" },
        { projectCode: "FP-09", title: "Recipe Sharing & Culinary Community Platform" },
        { projectCode: "FP-10", title: "Smart Home Automation IoT Dashboard" },
        { projectCode: "FP-11", title: "Hotel & Resort Booking Engine" },
        { projectCode: "FP-12", title: "Job Search & Career Recruitment Portal" },
        { projectCode: "FP-13", title: "Social Media & Community Networking Feed" },
        { projectCode: "FP-14", title: "Blogging & Content Management CMS System" },
        { projectCode: "FP-15", title: "Movie Rating & Cinema Ticketing App" },
        { projectCode: "FP-16", title: "Event Management & Ticketing Organizer" },
        { projectCode: "FP-17", title: "Virtual Classroom & Document Sharing Space" },
        { projectCode: "FP-18", title: "Vehicle Rental & Fleet Management System" },
        { projectCode: "FP-19", title: "Stock Portfolio & Investment Analytics Portal" },
        { projectCode: "FP-20", title: "Real Estate Listing & Broker Connection Hub" },
        { projectCode: "FP-21", title: "Cloud File Storage & Encrypted Sharing Portal" },
        { projectCode: "FP-22", title: "Human Resource Management (HRM) System" },
        { projectCode: "FP-23", title: "Interactive Trivia & Gamified Learning Platform" },
        { projectCode: "FP-24", title: "Food Delivery & Restaurant Directory App" },
        { projectCode: "FP-25", title: "Freelance Developer Freelancer Bid Board" },
        { projectCode: "FP-26", title: "Music Streaming & Playlist Curation Service" },
        { projectCode: "FP-27", title: "Issue Tracker & Bug Ticketing Platform" },
        { projectCode: "FP-28", title: "Charity Donation & Crowdfunding Platform" },
        { projectCode: "FP-29", title: "Weather Station & Geospatial Sensor Portal" },
        { projectCode: "FP-30", title: "Gym Membership & Schedule Booking System" },
        { projectCode: "FP-31", title: "Local Service Directory & Reviews Platform" },
        { projectCode: "FP-32", title: "Online Art Gallery & Artist Portfolio Studio" }
      ];
      await CapstonePool.insertMany(projects);
      console.log('[Seed] 33 Capstone Projects seeded successfully.');
    } else {
      // Make sure FP-00 is seeded in existing databases
      const fp00Exists = await CapstonePool.findOne({ projectCode: 'FP-00' });
      if (!fp00Exists) {
        await CapstonePool.create({ projectCode: 'FP-00', title: 'MERN Sandbox & Reference Template' });
        console.log('[Seed] Seeded missing FP-00 reference project.');
      }
    }
  } catch (err) {
    console.error('[Seed] Capstone seeding error:', err);
  }
};

// @desc    Get or assign a student's Capstone project
// @route   GET /api/capstone/my
// @access  Private (Student/Admin)
const getMyAssignedProject = async (req, res) => {
  try {
    // If admin or superadmin, return specific student project or FP-00 sandbox project from DB
    if (req.user.role === 'admin' || req.user.role === 'superadmin') {
      const studentId = req.query.studentId;
      if (studentId) {
        const project = await CapstonePool.findOne({ assignedTo: studentId }).populate('assignedTo', 'name email');
        return res.status(200).json({ success: true, project });
      }
      const project = await CapstonePool.findOne({ projectCode: 'FP-00' });
      return res.status(200).json({ success: true, project });
    }

    // Find if student is already assigned a project
    let project = await CapstonePool.findOne({ assignedTo: req.user._id });
    
    if (!project) {
      // Find an available project that is not assigned to anyone, excluding FP-00 sandbox
      const availableProject = await CapstonePool.findOne({ assignedTo: null, projectCode: { $ne: 'FP-00' } });
      
      if (!availableProject) {
        return res.status(400).json({ 
          success: false, 
          message: 'All 32 unique Capstone Project topics have been allocated. Please contact an instructor to manually assign yours.' 
        });
      }

      // Claim it atomically to avoid collision
      project = await CapstonePool.findOneAndUpdate(
        { _id: availableProject._id, assignedTo: null },
        { assignedTo: req.user._id, assignedAt: new Date() },
        { new: true }
      );

      if (!project) {
        // Fallback in case of quick multi-click race condition
        return res.status(409).json({ 
          success: false, 
          message: 'Allocation collision detected. Please refresh to claim a project.' 
        });
      }
      
      // Log event
      await logAction(
        req.user,
        'CAPSTONE_CLAIM',
        `Student claimed unique Capstone project ${project.projectCode}: ${project.title}`,
        project._id,
        'CapstonePool'
      );
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    console.error('Get my capstone error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving Capstone allocation' });
  }
};

// @desc    Get all projects in the Capstone pool populated with student and submission details
// @route   GET /api/capstone/admin
// @access  Private (Admin/SuperAdmin)
const getAdminCapstones = async (req, res) => {
  try {
    // Exclude FP-00 template from normal allocation lists
    const list = await CapstonePool.find({ projectCode: { $ne: 'FP-00' } })
      .populate('assignedTo', 'name email')
      .lean();

    const submissions = await Assignment.find({ topicId: 'final-project-topic' }).lean();

    const enriched = list.map(item => {
      if (item.assignedTo) {
        const sub = submissions.find(s => s.student.toString() === item.assignedTo._id.toString());
        return {
          ...item,
          submission: sub ? { 
            _id: sub._id, 
            status: sub.status, 
            code: sub.code, 
            feedback: sub.feedback || '',
            submittedAt: sub.submittedAt 
          } : null
        };
      }
      return { ...item, submission: null };
    });

    res.status(200).json({ success: true, projects: enriched });
  } catch (error) {
    console.error('Get admin capstones error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving Capstone pool audit' });
  }
};

// @desc    Release project allocation back into the available pool
// @route   POST /api/capstone/admin/release
// @access  Private (Admin/SuperAdmin)
const releaseCapstoneAllocation = async (req, res) => {
  const { projectCode } = req.body;

  if (!projectCode) {
    return res.status(400).json({ success: false, message: 'projectCode is required' });
  }

  try {
    const project = await CapstonePool.findOne({ projectCode });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project code not found' });
    }

    if (!project.assignedTo) {
      return res.status(400).json({ success: false, message: 'Project is already unallocated' });
    }

    const previousAssignee = project.assignedTo;
    project.assignedTo = null;
    project.assignedAt = null;
    await project.save();

    // Log event
    await logAction(
      req.user,
      'CAPSTONE_RELEASE',
      `Released Capstone project ${projectCode} allocation from user ${previousAssignee}`,
      project._id,
      'CapstonePool'
    );

    res.status(200).json({ success: true, message: `Successfully released project ${projectCode}` });
  } catch (error) {
    console.error('Release capstone error:', error);
    res.status(500).json({ success: false, message: 'Server error releasing Capstone allocation' });
  }
};

// @desc    Update progress checkboxes for a student's assigned project
// @route   POST /api/capstone/progress
// @access  Private
const updateCapstoneProgress = async (req, res) => {
  const { completedModules, completedPages, completedCollections, uncheckReasons } = req.body;

  try {
    let project;
    if (req.user.role === 'admin' || req.user.role === 'superadmin') {
      project = await CapstonePool.findOne({ projectCode: 'FP-00' });
    } else {
      project = await CapstonePool.findOne({ assignedTo: req.user._id });
    }

    if (!project) {
      return res.status(404).json({ success: false, message: 'You do not have a Capstone project assigned.' });
    }

    project.progress = {
      completedModules: completedModules || [],
      completedPages: completedPages || [],
      completedCollections: completedCollections || [],
      uncheckReasons: uncheckReasons || {}
    };

    // Explicitly mark progress as modified because it contains a Mixed type (uncheckReasons Map/Object)
    project.markModified('progress');

    await project.save();

    res.status(200).json({ success: true, message: 'Progress saved successfully', progress: project.progress });
  } catch (error) {
    console.error('Update capstone progress error:', error);
    res.status(500).json({ success: false, message: 'Server error saving progress' });
  }
};

// Helper to find capstone project by student or admin query
const findProjectByUserOrAdmin = async (req, studentId) => {
  let project;
  if (req.user.role === 'admin' || req.user.role === 'superadmin') {
    if (studentId) {
      project = await CapstonePool.findOne({ assignedTo: studentId });
    } else {
      project = await CapstonePool.findOne({ projectCode: 'FP-00' });
    }
  } else {
    project = await CapstonePool.findOne({ assignedTo: req.user._id });
  }
  return project;
};

// @desc    Add a student custom task checklist item
// @route   POST /api/capstone/custom-tasks
// @access  Private
const addCustomTask = async (req, res) => {
  const { taskName, studentId } = req.body;
  if (!taskName) {
    return res.status(400).json({ success: false, message: 'Task description is required' });
  }

  try {
    const project = await findProjectByUserOrAdmin(req, studentId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'No assigned capstone project found.' });
    }

    if (!project.progress) project.progress = {};
    if (!project.progress.customChecklist) project.progress.customChecklist = [];

    project.progress.customChecklist.push({ taskName, completed: false });
    project.markModified('progress');

    const { addToPlanner } = req.body;
    if (addToPlanner) {
      if (!project.planner) project.planner = [];
      project.planner.push({
        title: taskName,
        description: 'Auto-created from Custom Tasks checklist',
        status: 'todo',
        priority: 'medium',
        dueDate: null
      });
      project.markModified('planner');
    }

    await project.save();

    res.status(200).json({ success: true, project });
  } catch (error) {
    console.error('Add custom task error:', error);
    res.status(500).json({ success: false, message: 'Server error adding custom task' });
  }
};

// @desc    Toggle a student custom task completed status
// @route   PUT /api/capstone/custom-tasks/:taskId/toggle
// @access  Private
const toggleCustomTask = async (req, res) => {
  const { taskId } = req.params;
  const { completed, studentId } = req.body;

  try {
    const project = await findProjectByUserOrAdmin(req, studentId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'No assigned capstone project found.' });
    }

    if (!project.progress) project.progress = {};
    if (!project.progress.customChecklist) project.progress.customChecklist = [];

    const item = project.progress.customChecklist.id(taskId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Custom task not found.' });
    }

    item.completed = completed !== undefined ? completed : !item.completed;
    project.markModified('progress');
    await project.save();

    res.status(200).json({ success: true, project });
  } catch (error) {
    console.error('Toggle custom task error:', error);
    res.status(500).json({ success: false, message: 'Server error toggling custom task' });
  }
};

// @desc    Delete a student custom task item
// @route   DELETE /api/capstone/custom-tasks/:taskId
// @access  Private
const deleteCustomTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const studentId = req.body?.studentId || req.query.studentId;

    if (!mongoose.isValidObjectId(taskId)) {
      return res.status(400).json({ success: false, message: 'Invalid custom task ID format.' });
    }

    const project = await findProjectByUserOrAdmin(req, studentId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'No assigned capstone project found.' });
    }

    if (!project.progress) project.progress = {};
    if (!project.progress.customChecklist) project.progress.customChecklist = [];

    const task = project.progress.customChecklist.id(taskId);
    if (task) {
      task.isDeleted = true;
      task.deletedAt = new Date();
      project.markModified('progress');
      await project.save();
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    console.error('Delete custom task error:', error);
    res.status(500).json({ success: false, message: `Server error: ${error.message || error.toString()}` });
  }
};

// @desc    Add an Agile sprint planner Kanban card
// @route   POST /api/capstone/planner
// @access  Private
const addPlannerCard = async (req, res) => {
  const { title, description, priority, dueDate, studentId } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, message: 'Card title is required' });
  }

  try {
    const project = await findProjectByUserOrAdmin(req, studentId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'No assigned capstone project found.' });
    }

    if (!project.planner) project.planner = [];

    project.planner.push({
      title,
      description: description || '',
      priority: priority || 'medium',
      dueDate: dueDate || null,
      status: 'todo'
    });
    await project.save();

    res.status(200).json({ success: true, project });
  } catch (error) {
    console.error('Add planner card error:', error);
    res.status(500).json({ success: false, message: 'Server error adding planner card' });
  }
};

// @desc    Update a Kanban card (status, details, priority)
// @route   PUT /api/capstone/planner/:cardId
// @access  Private
const updatePlannerCard = async (req, res) => {
  const { cardId } = req.params;
  const { title, description, priority, dueDate, status, studentId } = req.body;

  try {
    const project = await findProjectByUserOrAdmin(req, studentId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'No assigned capstone project found.' });
    }

    if (!project.planner) project.planner = [];

    const card = project.planner.id(cardId);
    if (!card) {
      return res.status(404).json({ success: false, message: 'Planner card not found.' });
    }

    if (title !== undefined) card.title = title;
    if (description !== undefined) card.description = description;
    if (priority !== undefined) card.priority = priority;
    if (dueDate !== undefined) card.dueDate = dueDate;
    if (status !== undefined) card.status = status;

    await project.save();

    res.status(200).json({ success: true, project });
  } catch (error) {
    console.error('Update planner card error:', error);
    res.status(500).json({ success: false, message: 'Server error updating planner card' });
  }
};

// @desc    Delete a Kanban card
// @route   DELETE /api/capstone/planner/:cardId
// @access  Private
const deletePlannerCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const studentId = req.body?.studentId || req.query.studentId;

    if (!mongoose.isValidObjectId(cardId)) {
      return res.status(400).json({ success: false, message: 'Invalid planner card ID format.' });
    }

    const project = await findProjectByUserOrAdmin(req, studentId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'No assigned capstone project found.' });
    }

    if (!project.planner) project.planner = [];

    const card = project.planner.id(cardId);
    if (card) {
      card.isDeleted = true;
      card.deletedAt = new Date();
      await project.save();
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    console.error('Delete planner card error:', error);
    res.status(500).json({ success: false, message: `Server error: ${error.message || error.toString()}` });
  }
};

// @desc    Log timesheet hours
// @route   POST /api/capstone/timesheet
// @access  Private
const addTimesheetLog = async (req, res) => {
  const { date, hours, description, studentId } = req.body;
  if (!date || !hours || !description) {
    return res.status(400).json({ success: false, message: 'Date, hours, and description are required.' });
  }

  try {
    const project = await findProjectByUserOrAdmin(req, studentId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'No assigned capstone project found.' });
    }

    if (!project.timesheet) project.timesheet = [];

    project.timesheet.push({ date, hours: Number(hours), description });
    await project.save();

    res.status(200).json({ success: true, project });
  } catch (error) {
    console.error('Add timesheet log error:', error);
    res.status(500).json({ success: false, message: 'Server error adding timesheet log' });
  }
};

// @desc    Delete a timesheet log entry
// @route   DELETE /api/capstone/timesheet/:logId
// @access  Private
const deleteTimesheetLog = async (req, res) => {
  try {
    const { logId } = req.params;
    const studentId = req.body?.studentId || req.query.studentId;

    if (!mongoose.isValidObjectId(logId)) {
      return res.status(400).json({ success: false, message: 'Invalid timesheet log ID format.' });
    }

    const project = await findProjectByUserOrAdmin(req, studentId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'No assigned capstone project found.' });
    }

    if (!project.timesheet) project.timesheet = [];

    const log = project.timesheet.id(logId);
    if (log) {
      log.isDeleted = true;
      log.deletedAt = new Date();
      await project.save();
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    console.error('Delete timesheet error:', error);
    res.status(500).json({ success: false, message: `Server error: ${error.message || error.toString()}` });
  }
};

module.exports = {
  seedCapstonePool,
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
};
