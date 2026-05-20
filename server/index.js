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

// Basic Route
app.get('/', (req, res) => {
  res.send('FluenC API is running...');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
