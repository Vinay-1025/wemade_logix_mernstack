const mongoose = require('mongoose');

const capstonePoolSchema = new mongoose.Schema({
  projectCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  assignedAt: {
    type: Date,
    default: null
  },
  progress: {
    completedModules: {
      type: [String],
      default: []
    },
    completedPages: {
      type: [String],
      default: []
    },
    completedCollections: {
      type: [String],
      default: []
    },
    uncheckReasons: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    customChecklist: [{
      taskName: { type: String, required: true },
      completed: { type: Boolean, default: false },
      isDeleted: { type: Boolean, default: false },
      deletedAt: { type: Date, default: null }
    }]
  },
  planner: [{
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: { type: String, enum: ['todo', 'in_progress', 'done'], default: 'todo' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    dueDate: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
  }],
  timesheet: [{
    date: { type: Date, required: true },
    hours: { type: Number, required: true },
    description: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('CapstonePool', capstonePoolSchema);
