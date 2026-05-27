const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

// Middleware
app.use(express.json());

// Production CORS configuration
app.use(cors({
  origin: [
    'https://wemade-logix-mernstack.web.app',
    'https://wemade-logix-mernstack.firebaseapp.com',
    'http://localhost:5173',
    'http://localhost:5175',
    'http://localhost:5176'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/assignments', require('./routes/assignmentRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/audit', require('./routes/auditRoutes'));
app.use('/api/recordings', require('./routes/recordingRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/course', require('./routes/courseRoutes'));

// Basic Route
app.get('/', (req, res) => {
  res.send('FluenC API is running...');
});

// Migration function to populate dayId in old records
const migrateAttendanceData = async () => {
  try {
    const AttendanceRecord = require('./models/AttendanceRecord');
    const AttendanceSession = require('./models/AttendanceSession');
    
    const recordsWithoutDayId = await AttendanceRecord.find({ dayId: { $exists: false } }).populate('session');
    if (recordsWithoutDayId.length > 0) {
      console.log(`[Migration] Found ${recordsWithoutDayId.length} attendance records missing dayId. Migrating...`);
      for (const rec of recordsWithoutDayId) {
        if (rec.session && rec.session.dayId) {
          rec.dayId = rec.session.dayId.toString().trim();
        } else {
          rec.dayId = 'w1-d0'; // Fallback
        }
        
        // Prevent duplicate index collisions: check if a record with student + dayId already exists
        const isDuplicate = await AttendanceRecord.findOne({
          student: rec.student,
          dayId: rec.dayId,
          _id: { $ne: rec._id }
        });
        
        if (isDuplicate) {
          console.log(`[Migration] Duplicate record found for student ${rec.student} on day ${rec.dayId}. Deleting duplicate.`);
          await AttendanceRecord.deleteOne({ _id: rec._id });
        } else {
          await rec.save();
        }
      }
      console.log('[Migration] Attendance record migration completed.');
    }
  } catch (err) {
    console.error('[Migration] Failed to migrate attendance records:', err);
  }
};

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    migrateAttendanceData();
  })
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
