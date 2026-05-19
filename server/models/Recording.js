const mongoose = require('mongoose');

const recordingSchema = new mongoose.Schema({
  dayId: {
    type: String,
    required: true,
    unique: true,
  },
  morningLink: {
    type: String,
    default: '',
  },
  eveningLink: {
    type: String,
    default: '',
  },
  commonLink: {
    type: String,
    default: '',
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Recording', recordingSchema);
