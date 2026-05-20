const mongoose = require('mongoose');

const attendanceSessionSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dayId: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  disabledAt: {
    type: Date,
  }
});

module.exports = mongoose.model('AttendanceSession', attendanceSessionSchema);
