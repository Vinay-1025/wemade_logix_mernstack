const mongoose = require('mongoose');

const attendanceRecordSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AttendanceSession',
    required: false, // Optional for recording-based attendance
  },
  dayId: {
    type: String,
    required: true, // Direct course day association (e.g., "w1-d2")
  },
  attendanceType: {
    type: String,
    enum: ['live', 'recording'],
    default: 'live',
  },
  markedAt: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: String,
    default: () => new Date().toLocaleDateString('en-CA'),
  }
});

// Compound index to prevent duplicate attendance markings for the same student on the same course day
attendanceRecordSchema.index({ student: 1, dayId: 1 }, { unique: true });

module.exports = mongoose.model('AttendanceRecord', attendanceRecordSchema);

