const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

const User = require('./models/User');
const AttendanceRecord = require('./models/AttendanceRecord');

const targetEmail = 'anushaboda563@gmail.com';
const targetDayId = 'w3-d1'; // June 1 corresponds to Day 13 (w3-d1)
const targetDate = '2026-06-01';

const runSeed = async () => {
  try {
    console.log(`Searching for student: ${targetEmail}...`);
    const student = await User.findOne({ email: targetEmail });
    
    if (!student) {
      console.error(`Error: User with email "${targetEmail}" not found.`);
      process.exit(1);
    }

    console.log(`Found student: ${student.name} (${student._id})`);

    // Check if record already exists
    const existingRecord = await AttendanceRecord.findOne({
      student: student._id,
      dayId: targetDayId
    });

    if (existingRecord) {
      console.log(`Attendance record already exists for ${student.name} on ${targetDate} (${targetDayId}).`);
      console.log(`Record Details: type=${existingRecord.attendanceType}, date=${existingRecord.date}`);
      process.exit(0);
    }

    // Insert record
    console.log(`Creating live attendance record for ${student.name} on ${targetDate}...`);
    const newRecord = await AttendanceRecord.create({
      student: student._id,
      dayId: targetDayId,
      attendanceType: 'live',
      date: targetDate,
      markedAt: new Date(`${targetDate}T10:00:00Z`)
    });

    console.log(`Success: Attendance record created successfully!`);
    console.log(`Inserted Record ID: ${newRecord._id}`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed with error:', error);
    process.exit(1);
  }
};

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mern';
console.log(`Connecting to MongoDB at: ${mongoUri}...`);

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected successfully.');
    runSeed();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
