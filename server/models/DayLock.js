const mongoose = require('mongoose');

const dayLockSchema = new mongoose.Schema({
  dayId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['locked', 'unlocked', 'default'],
    default: 'default',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('DayLock', dayLockSchema);
