export const fp03Data = {
  projectId: 3,
  projectCode: "FP-03",
  projectTitle: "Real-Time Collaborative Project Board",
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
  "React-Draggable",
  "Socket.io"
],
  overview: "Build a Trello clone with live WebSocket board updates, drag-and-drop cards, and role-based board permissions.",
  problemStatement: [
    "Manual and error-prone tracking of Real-Time Collaborative Project Board events.",
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
        "Manage corporate workspaces",
        "Configure organization access rules",
        "Monitor activity logs",
        "Oversee system integrations"
    ],
    "Manager": [
        "Create projects & workspaces",
        "Assign tasks & set due dates",
        "Invite team members",
        "Review project reports"
    ],
    "Member": [
        "View assigned tasks",
        "Drag and drop tasks on Kanban boards",
        "Update task progress",
        "Add comments & attachments"
    ]
},
  modules: [
  "Authentication",
  "Workspace Configurator",
  "Kanban Task Boards",
  "Progress Analytics",
  "Comment & Notification Hub"
],
  pages: {
    "Public": [
        "Home",
        "Features Overview",
        "Login",
        "Register"
    ],
    "Member": [
        "Dashboard",
        "My Workspaces",
        "Task Details",
        "Profile Settings"
    ],
    "Manager": [
        "Workspace Settings",
        "Project Reports",
        "Team Directory"
    ],
    "Admin": [
        "Dashboard",
        "Organization Logs",
        "Billing System"
    ]
},
  databaseCollections: [
  "Users",
  "Workspaces",
  "Projects",
  "Tasks",
  "Comments",
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
      "CRUD Operations",
      "Search",
      "Filter",
      "Dashboard Panels",
      "Profile Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
  "Drag-and-Drop board lanes",
  "Live board updates via WebSockets",
  "CSV Task Export",
  "Email due-date reminders",
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
export default fp03Data;
