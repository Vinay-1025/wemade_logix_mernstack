export const fp08Data = {
  projectId: 8,
  projectCode: "FP-08",
  projectTitle: "Customer Relationship Management (CRM) Suite",
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
    "Chart.js"
  ],
  overview: "Build a business dashboard managing lead sales pipelines, customer communication timelines, sales reporting, and meeting logs.",
  problemStatement: [
    "Manual and disconnected tracking of customer leads, sales stages, and communications.",
    "Difficulty in delegating customer accounts across sales representatives and tracking their status.",
    "Poor visibility into the sales pipeline stages and customer conversion rates.",
    "Lack of centralized scheduling and logging for client meetings and interactions."
  ],
  objectives: [
    "Build a robust and secure MERN stack CRM dashboard.",
    "Implement isolated access layers for Admins, Sales Managers, and Sales Representatives.",
    "Ensure strict database schema constraints for lead tracking, deal stages, and communication histories.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Configure CRM parameters and custom lead stages",
        "Manage user access, security permissions, and sales team assignments",
        "Audit CRM activity logs and data security compliance",
        "Manage system-wide integrations and settings"
    ],
    "SalesManager": [
        "Monitor the overall deal pipeline and team performance metrics",
        "Assign leads and accounts to Sales Representatives",
        "Review sales targets, revenue reports, and forecast charts",
        "Approve large contract deals and adjustments"
    ],
    "SalesRep": [
        "Manage assigned leads, customer profiles, and contact details",
        "Track client interactions, email logs, and meeting summaries",
        "Update deal stages in the sales pipeline (Kanban view)",
        "Upload client contracts and business documents"
    ]
  },
  modules: [
    "Authentication & Role Management",
    "Lead & Contact Directory",
    "Deal Pipeline (Kanban Board)",
    "Interaction & Meeting Log",
    "Sales Performance Analytics (Charts)",
    "Document & Contract Manager"
  ],
  pages: {
    "Public": [
        "Home",
        "CRM Solution Tour",
        "Request Demo / Pricing",
        "Login",
        "Register"
    ],
    "SalesRep": [
        "Dashboard (My tasks, open leads, and active deals)",
        "Lead Directory (Profiles, notes, and activity history)",
        "Pipeline Board (Drag-and-drop deals)",
        "Meeting & Interaction Scheduler"
    ],
    "SalesManager": [
        "Dashboard (Team metrics, sales velocity, conversion rates)",
        "Lead Assigner & Team Roster",
        "Revenue Reports & Goal Tracker",
        "Audits & System Configuration"
    ]
  },
  databaseCollections: [
    "Users",
    "Leads",
    "Deals",
    "Interactions",
    "Documents",
    "Logs"
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
      "Responsive CRM Dashboard UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Leads, Deals, Activities)",
      "MVC",
      "Middleware (Authentication, Role Verification)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (User -> Leads, Leads -> Deals, Deals -> Interactions)"
    ],
    "general": [
      "CRUD Operations (Leads, Deals, Interactions)",
      "Search & Filter (leads by status, industry, value)",
      "Dashboard Panels showing sales performance charts",
      "Profile & Activity Preferences Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Document & Contract file upload (using Multer)",
    "Interactive drag-and-drop Kanban deal pipeline",
    "Sales revenue forecasting charts (using Chart.js)",
    "Email summaries and automated activity reminder logs",
    "Dark mode dashboard toggle"
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

export default fp08Data;
