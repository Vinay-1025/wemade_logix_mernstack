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

// Migration function to populate dayId in old records and normalize dayId formats
const migrateAttendanceData = async () => {
  try {
    const AttendanceRecord = require('./models/AttendanceRecord');
    const AttendanceSession = require('./models/AttendanceSession');
    
    const normalizeDayId = (dayId) => {
      if (!dayId) return '';
      const str = dayId.toString().trim().toLowerCase();
      if (/^\d+$/.test(str)) {
        const dayNo = parseInt(str, 10);
        if (dayNo === 0) return 'w1-d0';
        const week = Math.ceil(dayNo / 6);
        const day = dayNo % 6 === 0 ? 6 : dayNo % 6;
        return `w${week}-d${day}`;
      }
      return str;
    };

    // 1. Backfill dayId in records where it doesn't exist
    const recordsWithoutDayId = await AttendanceRecord.find({ dayId: { $exists: false } }).populate('session');
    if (recordsWithoutDayId.length > 0) {
      console.log(`[Migration] Found ${recordsWithoutDayId.length} attendance records missing dayId. Backfilling...`);
      for (const rec of recordsWithoutDayId) {
        if (rec.session && rec.session.dayId) {
          rec.dayId = rec.session.dayId.toString().trim();
        } else {
          rec.dayId = 'w1-d0'; // Fallback
        }
        await rec.save();
      }
      console.log('[Migration] Backfilling completed.');
    }

    // 2. Normalize dayId in all existing Sessions
    const sessions = await AttendanceSession.find();
    let updatedSessionsCount = 0;
    for (const session of sessions) {
      if (session.dayId) {
        const normalized = normalizeDayId(session.dayId);
        if (session.dayId !== normalized) {
          session.dayId = normalized;
          await session.save();
          updatedSessionsCount++;
        }
      }
    }
    if (updatedSessionsCount > 0) {
      console.log(`[Migration] Normalized dayId in ${updatedSessionsCount} sessions.`);
    }

    // 3. Normalize dayId in all existing Records and resolve duplicate collisions
    const records = await AttendanceRecord.find();
    let updatedRecordsCount = 0;
    for (const rec of records) {
      if (rec.dayId) {
        const normalized = normalizeDayId(rec.dayId);
        if (rec.dayId !== normalized) {
          // Check for index collision before saving
          const isDuplicate = await AttendanceRecord.findOne({
            student: rec.student,
            dayId: normalized,
            _id: { $ne: rec._id }
          });
          
          if (isDuplicate) {
            console.log(`[Migration] Duplicate record found for student ${rec.student} on normalized day ${normalized}. Deleting duplicate.`);
            await AttendanceRecord.deleteOne({ _id: rec._id });
          } else {
            rec.dayId = normalized;
            await rec.save();
            updatedRecordsCount++;
          }
        }
      }
    }
    if (updatedRecordsCount > 0) {
      console.log(`[Migration] Normalized dayId in ${updatedRecordsCount} records.`);
    }

    console.log('[Migration] Attendance data normalization check completed.');
  } catch (err) {
    console.error('[Migration] Failed to migrate/normalize attendance records:', err);
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
