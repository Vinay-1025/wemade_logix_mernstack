export const fp13Data = {
  projectId: 13,
  projectCode: "FP-13",
  projectTitle: "Social Media & Community Networking Feed",
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
  overview: "Build a micro-blogging platform featuring text feeds, image uploads, post commenting, like toggles, and user follower relationships.",
  problemStatement: [
    "Manual and error-prone tracking of Social Media & Community Networking Feed events.",
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
        "Manage company directories",
        "Configure job boards access",
        "Monitor system audits",
        "Manage configurations"
    ],
    "Recruiter": [
        "Post job vacancies",
        "Browse applicant resumes",
        "Schedule applicant interviews",
        "Update recruitment status"
    ],
    "Candidate": [
        "Manage candidate profile",
        "Upload resume files",
        "Search & apply for jobs",
        "Track application updates"
    ]
},
  modules: [
  "Authentication",
  "Job Openings",
  "Resume Processing",
  "Application Funnel",
  "Interview Scheduler"
],
  pages: {
    "Public": [
        "Home",
        "Job Board",
        "Company Profiles",
        "Login",
        "Register"
    ],
    "Candidate": [
        "Dashboard",
        "My Resume",
        "Job Applications",
        "Interviews"
    ],
    "Recruiter": [
        "Dashboard",
        "Job Postings",
        "Candidate Review",
        "Schedule Panel"
    ],
    "Admin": [
        "Dashboard",
        "Recruiters Directory",
        "Audit Log"
    ]
},
  databaseCollections: [
  "Users",
  "Jobs",
  "Applications",
  "Resumes",
  "Interviews",
  "Companies"
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
  "Resume PDF parser & generator",
  "Interview email notifications",
  "Applicant status pipeline",
  "Dark mode",
  "Activity logs"
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
export default fp13Data;
