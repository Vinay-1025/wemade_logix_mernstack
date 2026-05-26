export const w6d1Data = {
  dayId: "w6-d1",
  dayTitle: "Day 1: Connecting Node.js to MongoDB with Mongoose",
  topics: [
    {
      id: "w6-d1-t1",
      title: "1. The Node.js Database Connection Pipeline",
      customComponent: "NodeDbConnectionViz",
      explanation: "A backend server acts as a middleman between client requests and raw database storage. Node.js uses drivers (like Mongoose for MongoDB) to connect, open connection pools, and query databases.",
      progression: [
        {
          level: "easy",
          title: "Connection Handshake",
          content: "Connect Node.js to MongoDB using `mongoose.connect(uri)`. Mongoose starts an asynchronous connection loop in the background."
        },
        {
          level: "intermediate",
          title: "Database Connection Pool",
          content: "Mongoose maintains a pool of active database connections (default size: 5-10), reusing them for incoming queries to improve performance."
        },
        {
          level: "advanced",
          title: "Connection Events",
          content: "Monitor connection states using Mongoose event listeners: `mongoose.connection.on('connected', callback)` or `on('error', callback)`."
        }
      ],
      detailedReference: {
        summary: "Initialize Mongoose connections to MongoDB, managing connection pools and monitoring server connection events.",
        keyConcepts: [
          { term: "Connection Pool", definition: "A cache of database connections maintained by the driver, reused to avoid opening new sockets for every query." }
        ],
        bestPractices: [
          "Always handle connection errors asynchronously to prevent your Node server from crashing on launch.",
          "Use environment variables (.env) to store database URIs and passwords securely."
        ]
      },
      codeTemplate: {
        html: `{}`,
        css: `PORT=5000\nMONGO_URI=mongodb+srv://student:pass123@wemade-sandbox.mongodb.net/mern`,
        js: `const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/wemade';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Database connected successfully!'))
  .catch(err => console.error('Database connection error:', err));

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`
      },
      assessment: "Write a Mongoose statement that connects to a database URL stored in process.env.MONGO_URI."
    },
    {
      id: "w6-d1-t2",
      title: "2. Troubleshooting Atlas IP Whitelisting & Failures",
      customComponent: "NodeDbConnectionViz",
      explanation: "A common database connection issue is forgetting to whitelist IP addresses on the database firewall. When this happens, database writes time out, and servers fail to connect.",
      progression: [
        {
          level: "easy",
          title: "IP Whitelisting Concept",
          content: "MongoDB Atlas blocks all incoming connections by default. You must add your server's public IP address to the Network Access whitelist to allow queries."
        },
        {
          level: "intermediate",
          title: "Security Sandbox Whitelist",
          content: "For local development, whitelist `0.0.0.0/0` (allow connections from anywhere) to prevent network blocks when switching Wi-Fi networks."
        },
        {
          level: "advanced",
          title: "Production Whitelisting",
          content: "In production, restrict network access by whitelisting only the specific static IP address of your hosting server (like AWS EC2 or Heroku)."
        }
      ],
      detailedReference: {
        summary: "Troubleshoot database connection errors by whitelisting IP addresses in your MongoDB Atlas cloud dashboard.",
        keyConcepts: [
          { term: "IP Whitelisting", definition: "A firewall security rule that allows database connections only from specific IP addresses." }
        ],
        bestPractices: [
          "Only use the 0.0.0.0/0 wildcard whitelist for local development sandboxes.",
          "Restrict production database access to the specific IP address of your backend server."
        ]
      },
      codeTemplate: {
        html: `{}`,
        css: `MONGO_URI=mongodb+srv://invalid_user:wrong_pass@cluster.mongodb.net/`,
        js: `// Simulated Connection Failure
const mongoose = require('mongoose');

// Invalid credentials will trigger the .catch() error handler
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Success!'))
  .catch(err => {
    console.error('Connection Failed!');
    console.error('Tip: Check your username, password, and IP whitelist in Atlas!');
  });`
      },
      assessment: "What database error occurs when a client tries to connect from an IP address that isn't whitelisted in Atlas?"
    },
    {
      id: "w6-d1-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Express database connection setup slides, Atlas network firewall configurations, mongoose connection states cheat sheet, and troubleshooting exercises.",
        duration: "15 mins",
        resources: [
          "Node to DB connection slides (PDF)",
          "Connection Setup Worksheet (PDF)"
        ]
      }
    }
  ]
};
