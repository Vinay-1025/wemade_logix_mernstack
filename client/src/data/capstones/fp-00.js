export const fp00Data = {
  projectId: 0,
  projectCode: "FP-00",
  projectTitle: "Campus Placement Management Portal",
  difficulty: "Intermediate",
  duration: {
    totalDays: 14,
    expectedEffortHours: "40-50",
    objective: "Design, develop, test and deploy a complete intermediate MERN Stack application in 2 weeks."
  },
  techStack: [
    "HTML5",
    "CSS3",
    "JavaScript (ES6+)",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "JWT Authentication"
  ],
  overview: "A centralized portal to manage campus placements from company registration to student selection.",
  problemStatement: [
    "Manual placement management through spreadsheets and messaging apps.",
    "Eligibility verification is difficult.",
    "Application tracking is inefficient.",
    "Reporting and analytics are limited."
  ],
  objectives: [
    "Student registration and profile management",
    "Company management",
    "Placement drive management",
    "Eligibility verification",
    "Job applications",
    "Interview scheduling",
    "Placement statistics"
  ],
  roles: {
    "Admin": [
      "Manage users",
      "Manage companies",
      "Manage placement drives",
      "View reports",
      "Manage departments"
    ],
    "PlacementOfficer": [
      "Verify students",
      "Create drives",
      "Publish results",
      "Manage applications",
      "Send notifications"
    ],
    "Recruiter": [
      "Manage company profile",
      "Create job openings",
      "View applicants",
      "Schedule interviews",
      "Update hiring status"
    ],
    "Student": [
      "Manage profile",
      "Upload resume",
      "Apply for jobs",
      "Track applications",
      "View interview schedule"
    ]
  },
  modules: [
    "Authentication",
    "Student Management",
    "Company Management",
    "Placement Drives",
    "Eligibility Checker",
    "Application Management",
    "Interview Management",
    "Dashboards"
  ],
  pages: {
    "Public": [
      "Home",
      "About",
      "Contact",
      "Login",
      "Register"
    ],
    "Student": [
      "Dashboard",
      "Profile",
      "Resume",
      "Available Drives",
      "Applied Jobs",
      "Interviews",
      "Notifications"
    ],
    "Recruiter": [
      "Dashboard",
      "Company",
      "Drives",
      "Applicants",
      "Interviews"
    ],
    "PlacementOfficer": [
      "Dashboard",
      "Students",
      "Companies",
      "Drives",
      "Reports"
    ],
    "Admin": [
      "Dashboard",
      "Users",
      "Reports",
      "Settings"
    ]
  },
  databaseCollections: [
    "Users",
    "Students",
    "Companies",
    "PlacementDrives",
    "Applications",
    "Interviews",
    "Notifications"
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
      "CRUD",
      "Search",
      "Filter",
      "Dashboard",
      "Profile Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Resume upload",
    "Dashboard charts",
    "Email notifications",
    "PDF export",
    "Dark mode",
    "Activity logs"
  ],
  timeline: {
    "day1": "Requirement analysis, workflow understanding, GitHub repository",
    "day2": "Project setup, React, Express, MongoDB configuration",
    "day3": "Authentication with JWT and roles",
    "day4": "Database schema and models",
    "days5to7": "Core CRUD modules",
    "days8to10": "Business workflow implementation",
    "day11": "Dashboard, search, filter, pagination",
    "day12": "Testing, validation, bug fixing",
    "day13": "Deployment",
    "day14": "Documentation, presentation, final submission"
  },
  milestones: [
    {
      "day": 3,
      "deliverable": "Project setup and authentication completed"
    },
    {
      "day": 7,
      "deliverable": "Core CRUD modules completed"
    },
    {
      "day": 10,
      "deliverable": "Business workflow completed"
    },
    {
      "day": 12,
      "deliverable": "Testing and dashboard completed"
    },
    {
      "day": 14,
      "deliverable": "Final deployed project with documentation"
    }
  ],
  submissionChecklist: [
    "GitHub Repository",
    "Frontend URL",
    "Backend URL",
    "README",
    "ER Diagram",
    "Postman Collection",
    "Presentation",
    "Project Demo"
  ],
  evaluation: {
    "UI_UX": 15,
    "React": 15,
    "Backend_APIs": 20,
    "MongoDB": 15,
    "Authentication": 10,
    "CRUD": 10,
    "Search_Filter_Pagination": 5,
    "Validation_ErrorHandling": 5,
    "Documentation_CodeQuality": 5,
    "Demo_Viva": 10,
    "Total": 100
  }
};
export default fp00Data;
