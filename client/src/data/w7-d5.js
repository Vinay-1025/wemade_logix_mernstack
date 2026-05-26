export const w7d5Data = {
  dayId: "w7-d5",
  dayTitle: "Day 5: Multer File Uploads & Dotenv Environment Configuration",
  topics: [
    {
      id: "w7-d5-t1",
      title: "1. Handling File Uploads with Multer Middleware",
      customComponent: "FileUploadEnvViz",
      explanation: "Standard HTTP requests send text payloads. Sending files (like profile photos or PDFs) requires using the `multipart/form-data` encoding scheme. Multer is an Express middleware that parses multipart requests and handles file uploads securely.",
      progression: [
        {
          level: "easy",
          title: "Multipart Form Submissions",
          content: "Use Multer to handle incoming file uploads. Multer extracts files from requests, saving them to a local destination folder and adding details to `req.file`."
        },
        {
          level: "intermediate",
          title: "Configuring Disk Storage",
          content: "Use `multer.diskStorage()` to configure upload directories, control file sizes, and rename files dynamically to prevent filename conflicts."
        },
        {
          level: "advanced",
          title: "File Format Filtering",
          content: "Write fileFilter functions in Multer to reject invalid file types (e.g. blocking file formats that are not JPEG or PNG) and throw validation errors."
        }
      ],
      detailedReference: {
        summary: "Parse file uploads in Express using Multer, configuring disk storage rules and file validation filters.",
        keyConcepts: [
          { term: "Multer", definition: "A Node.js middleware for handling multipart/form-data, used primarily for uploading files." }
        ],
        bestPractices: [
          "Always restrict upload file sizes (e.g. max 2MB) to prevent server storage denial-of-service attacks.",
          "Sanitize filenames before saving uploads to local folders to prevent path traversal security vulnerabilities."
        ]
      },
      codeTemplate: {
        html: `{}`,
        css: ``,
        js: `const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// 1. Configure Multer Disk Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder
  },
  filename: (req, file, cb) => {
    // Unique file name using timestamp
    cb(null, \`\${Date.now()}\${path.extname(file.originalname)}\`);
  }
});

const upload = multer({ storage });

// 2. Map route to single file upload handler
app.post('/api/upload', upload.single('profileImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload a file' });
  }
  res.status(200).json({
    message: 'File uploaded successfully!',
    filePath: req.file.path
  });
});

app.listen(5000);`
      },
      assessment: "Write the Multer configuration statement to upload files to a local directory 'public/assets'."
    },
    {
      id: "w7-d5-t2",
      title: "2. Scoping Secrets with Dotenv",
      customComponent: "FileUploadEnvViz",
      explanation: "The `dotenv` module loads variables from a `.env` file into `process.env` in memory. This separates config settings from application code, protecting sensitive keys in team environments.",
      progression: [
        {
          level: "easy",
          title: "Loading Env Files",
          content: "Load your `.env` file by calling `require('dotenv').config()` at the very top of your entry file (e.g. index.js). Access variables using `process.env.VARIABLE_NAME`."
        },
        {
          level: "intermediate",
          title: "Configuring Fallbacks",
          content: "Always define code fallback values for non-sensitive keys (e.g., `const PORT = process.env.PORT || 5000`) to keep local development running if a `.env` is missing."
        },
        {
          level: "advanced",
          title: "Git Repository Exclusion (.gitignore)",
          content: "Add `.env` to your `.gitignore` file to prevent committing secrets to version control. Create a `.env.example` file containing key names without values to guide teammates."
        }
      ],
      detailedReference: {
        summary: "Protect credentials by storing secret keys in a local .env file, loading them into process.env at runtime.",
        keyConcepts: [
          { term: "dotenv", definition: "A zero-dependency module that loads environment variables from a .env file into process.env in memory." }
        ],
        bestPractices: [
          "Never commit `.env` files to git repositories.",
          "Document required variables in a committed `.env.example` template file."
        ]
      },
      codeTemplate: {
        html: `{}`,
        css: `PORT=5000\nMONGO_URI=mongodb+srv://user:pass@cluster.net/db\nJWT_SECRET=superSecretKey`,
        js: `// Load dotenv configuration at startup
require('dotenv').config();

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

console.log('App Server Configured:');
console.log('Port:', port);
console.log('Database URI loaded:', mongoUri ? 'Yes' : 'No');`
      },
      assessment: "What file must you update to prevent Git from tracking and committing your .env file?"
    },
    {
      id: "w7-d5-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Multipart stream slides, multer upload rules cheat sheets, dotenv configuration maps, and exercises for setting up file paths.",
        duration: "15 mins",
        resources: [
          "File Uploads & Environment Presentation (PDF)",
          "Dotenv Config Exercises (ZIP)"
        ]
      }
    }
  ]
};
