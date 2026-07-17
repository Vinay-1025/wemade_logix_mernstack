export const fp27Data = {
  projectId: 27,
  projectCode: "FP-27",
  projectTitle: "Issue Tracker & Bug Ticketing Platform",
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
    "Multer",
    "Chart.js",
    "PDF-Kit"
  ],
  overview: "Build a ticketing app tracking issue priorities, assignees, state history status (open/fixed/closed), and logs.",
  problemStatement: [
    "Manual and unorganized tracking of software bugs, issue priorities, and active assignees.",
    "Difficulty in segregating user roles and managing code repository reference accesses.",
    "Inefficient resolution workflows and lack of state history tracking (open, fixed, closed).",
    "Lack of real-time diagnostic logs and visual dashboards for bug resolution timelines."
  ],
  objectives: [
    "Build a robust and secure MERN stack issue tracker and bug ticketing platform.",
    "Implement isolated dashboards and workflows for Admins/Project Leads, Developers, and Reporters.",
    "Ensure strict database schema constraints for issue statuses, project codes, and comment logs.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Configure global project spaces, priority scales, and category tags",
        "Assign team roles and delegate tickets to specific Developer profiles",
        "Audit system diagnostic files and track team bug-fixing performance metrics",
        "Manage global system registries and configurations"
    ],
    "Developer": [
        "Update issue state status pipelines (Open, In Progress, Fixed, Closed) and write code logs",
        "Track assigned bug backlogs and sprint goals",
        "Submit fix descriptions and coordinate resolutions with Reporters",
        "View personal activity log charts and time-to-close metrics"
    ],
    "Reporter": [
        "Submit bug reports with priority tags, reproduction steps, and attachments (using Multer)",
        "Track progress status updates on personally reported issues",
        "Interact with Developers by writing comment logs inside the ticket workspace",
        "Download PDF reports of open project issues"
    ]
  },
  modules: [
    "Authentication & Member Hub",
    "Project Directory (CRUD)",
    "Bug Ticketing Engine",
    "State History & Activity Logger",
    "Resolution Analytics (Charts)"
  ],
  pages: {
    "Public": [
        "Home",
        "System features Tour",
        "Login",
        "Register"
    ],
    "Reporter": [
        "Dashboard (My tickets, open vs. closed count)",
        "Submit Bug Panel (Uploader)",
        "Ticket Details Page",
        "Saved Projects"
    ],
    "Developer": [
        "Dashboard (My task assignments queue, active resolution list)",
        "Task backlog board",
        "Resolution Logs desk",
        "My Performance charts"
    ],
    "Admin": [
        "Dashboard (Sprint velocity, open ticket heatmaps)",
        "Project Settings & Member Roster",
        "Audit diagnostics ledger"
    ]
  },
  databaseCollections: [
    "Users",
    "Projects",
    "Issues",
    "Comments",
    "StateHistoryLogs",
    "Attachments"
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
      "Responsive Kanban/List Issue Dashboard UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Projects, Issues, Comments)",
      "MVC",
      "Middleware (Authentication, Role Check controls)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (Project -> Issues, Issue -> Comments)"
    ],
    "general": [
      "CRUD Operations (Projects, Issues, Comments)",
      "Search & Filter (issues by status, priority, assignee, department)",
      "Dashboard Panels showing bug resolution rates and sprint goals",
      "Profile & Notification settings Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Interactive bug-fixing performance analytics charts (using Chart.js)",
    "Screenshot attachment upload integration (using Multer)",
    "PDF report generator compiling open issues list (using PDF-Kit)",
    "Automated email alerts when tickets are assigned or status changes",
    "Dark mode workspace themes"
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

export default fp27Data;
