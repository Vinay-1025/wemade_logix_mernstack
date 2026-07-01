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
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CapstonePool', capstonePoolSchema);
