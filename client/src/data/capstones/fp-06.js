export const fp06Data = {
  projectId: 6,
  projectCode: "FP-06",
  projectTitle: "Online Learning Management System (LMS)",
  difficulty: "Intermediate",
  duration: {
    totalDays: 14,
    expectedEffortHours: "40-50",
    objective: "Design, develop, test and deploy a complete intermediate MERN Stack application in 2 weeks."
  },
  techStack: [
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "JWT Authentication",
    "Chart.js",
    "Multer",
    "PDF-Kit"
  ],
  overview: "Build a course hub supporting student enrollment pipelines, video lectures, submission reviews, and certificate auto-generation.",
  problemStatement: [
    "Manual and error-prone tracking of student course enrollments, progress, and grades.",
    "Difficulty in organizing and distributing video lectures, study materials, and assignments.",
    "Inefficient review workflows for instructors evaluating assignment submissions.",
    "Lack of automated progress statistics and digital completion certificates."
  ],
  objectives: [
    "Build a robust and secure MERN stack web application.",
    "Implement isolated user experience pipelines for different roles.",
    "Ensure strict database schema constraints and integrity rules.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Manage global school settings and department categories",
        "Create courses, assign instructors, and manage enrollment limits",
        "Monitor platform-wide analytics, system performance, and access logs",
        "Manage and audit student certifications and platform compliance"
    ],
    "Instructor": [
        "Create courses, design syllabus structures, and upload content",
        "Upload resources, study guides, and video lecture assets",
        "Create assignments, set deadlines, and grade student submissions",
        "View detailed analytics on student enrollment, engagement, and performance"
    ],
    "Student": [
        "Search, browse, and enroll in available courses",
        "Access course materials, read documentation, and watch video lectures",
        "Submit assignments, track progress, and review grades",
        "Download automatically generated completion certificates as PDF"
    ]
  },
  modules: [
    "Authentication & Profile Management",
    "Course Catalog & Syllabus Builder",
    "Material Repository (Video & Document Host)",
    "Assignment & Submission Engine",
    "Grading & Performance Analytics",
    "Certification & PDF Generator"
  ],
  pages: {
    "Public": [
        "Home",
        "Course Finder & Details",
        "Pricing & About",
        "Login",
        "Register"
    ],
    "Student": [
        "Dashboard (Active courses, deadlines, and recent grades)",
        "My Courses (Enrolled curriculum view)",
        "Syllabus Path & Lesson Viewer (Video/Doc player)",
        "Assignment & Submission Panel"
    ],
    "Instructor": [
        "Dashboard (Student metrics, course feedback, pending reviews)",
        "Course & Syllabus Builder",
        "Submissions Grading Console",
        "Performance & Gradebook Audit"
    ],
    "Admin": [
        "Dashboard (Platform-wide active users, popular courses)",
        "Enrollment & User Access Center",
        "Report Manager & Audit Logs"
    ]
  },
  databaseCollections: [
    "Users",
    "Courses",
    "Materials",
    "Assignments",
    "Submissions",
    "Certificates"
  ],
  mandatoryFeatures: {
    "authentication": [
      "Register",
      "Login",
      "JWT",
      "Password Hashing"
    ],
    "frontend": [
      "React",
      "React Router",
      "Responsive Course Portal UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Courses, Assignments, Submissions)",
      "MVC",
      "Middleware (Auth, Student/Instructor Role Control)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (User -> Enrolled Courses, Course -> Assignments)"
    ],
    "general": [
      "CRUD Operations (Courses, Assignments, User Profiles)",
      "Search & Filter (by category, instructor, level)",
      "Dashboard Panels showing learning stats & progress metrics",
      "Profile & Avatar Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Auto-generated PDF certificates on course completion (using PDF-Kit)",
    "Integrated video lecture player (HTML5 / Cloudinary)",
    "Student progress tracking charts (using Chart.js)",
    "Email notifications for new assignments or graded submissions",
    "Dark mode for course viewer"
  ],
  submissionChecklist: [
    "GitHub Repository",
    "Frontend URL",
    "Backend URL",
    "README",
    "ER Diagram",
    "Postman Collection",
    "Presentation"
  ]
};

export default fp06Data;
