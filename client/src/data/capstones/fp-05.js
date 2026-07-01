export const fp05Data = {
  projectId: 5,
  projectCode: "FP-05",
  projectTitle: "Fitness & Workout Planner API",
  difficulty: "Advanced",
  duration: {
    totalDays: 14,
    expectedEffortHours: "40-50",
    objective: "Design, develop, test and deploy a complete advanced MERN Stack application in 2 weeks."
  },
  techStack: [
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "JWT Authentication",
  "Multer",
  "PDF-Kit"
],
  overview: "Build a gym training tracker supporting workout logs, routine scheduling, caloric count trends, and personal record trackers.",
  problemStatement: [
    "Manual and error-prone tracking of Fitness & Workout Planner API events.",
    "Difficulty in coordinating user roles and data access controls.",
    "Inefficient application workflow and status visibility.",
    "Lack of real-time stats and visual dashboard insights."
  ],
  objectives: [
    "Build a robust and secure MERN stack web application.",
    "Implement isolated user experience pipelines for different roles.",
    "Ensure strict database schema constraints and integrity rules.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Manage school settings",
        "Enrol courses & departments",
        "Approve curriculum uploads",
        "Audit academic reports"
    ],
    "Instructor": [
        "Create courses & syllabus content",
        "Upload resources & study guides",
        "Create and grade assignments",
        "View student progress"
    ],
    "Student": [
        "Enrol in courses",
        "Access materials & video assets",
        "Submit assignments & tasks",
        "View grades & feedback"
    ]
},
  modules: [
  "Authentication",
  "Course Catalog",
  "Material Repository",
  "Assignment Manager",
  "Grading Engine",
  "Progress Tracking"
],
  pages: {
    "Public": [
        "Home",
        "Course Finder",
        "Public Syllabus",
        "Login",
        "Register"
    ],
    "Student": [
        "Dashboard",
        "My Courses",
        "Syllabus Path",
        "Assignment Panel"
    ],
    "Instructor": [
        "Dashboard",
        "Course Builder",
        "Submissions Grading",
        "Progress Audit"
    ],
    "Admin": [
        "Dashboard",
        "Enrollment Center",
        "Reports Manager"
    ]
},
  databaseCollections: [
  "Users",
  "Courses",
  "Materials",
  "Assignments",
  "Submissions",
  "Grades"
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
      "Responsive UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs",
      "MVC",
      "Middleware",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships"
    ],
    "general": [
      "CRUD Operations",
      "Search",
      "Filter",
      "Dashboard Panels",
      "Profile Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
  "PDF Certificate generation",
  "Video lecture player integration",
  "Student progress charts",
  "Email notifications",
  "Dark mode"
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
export default fp05Data;
