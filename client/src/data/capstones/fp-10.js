export const fp10Data = {
  projectId: 10,
  projectCode: "FP-10",
  projectTitle: "Smart Home Automation IoT Dashboard",
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
    "Stripe API",
    "QRCode-Generator",
    "Socket.io"
  ],
  overview: "Build a simulator interface controlling connected light switches, locks, cameras, energy reports, and customizable rule routines.",
  problemStatement: [
    "Manual and disconnected control of scattered home appliances and smart IoT devices.",
    "Difficulty in coordinating secure temporary home access permissions for guests and service workers.",
    "Inefficient tracking of real-time electricity consumption and lack of automated schedules.",
    "Absence of historical energy analysis and secure subscription billing for advanced smart security cloud storage."
  ],
  objectives: [
    "Build a robust and secure MERN stack Smart Home IoT simulation and control dashboard.",
    "Implement isolated access levels and controls for Admins, Residents, and temporary Guests.",
    "Ensure strict database schema constraints for device states, routine scheduler rules, and system event logs.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Manage global device catalogs and firmware profiles",
        "Monitor system performance and cloud database scale metrics",
        "Audit access logs and home diagnostic logs",
        "Verify partner manufacturers and subscription finance pipelines"
    ],
    "Resident": [
        "Register and configure smart devices (lights, locks, thermostats)",
        "Build and schedule custom automation routines (rules)",
        "Track energy usage metrics and consumption trends",
        "Generate secure access invitation QR codes for temporary guests"
    ],
    "Guest": [
        "Control permitted smart home devices (e.g., main door locks, lights)",
        "Retrieve temporary active entry QR codes for smart locks",
        "View active permission window and timer status",
        "Manage guest profile information"
    ]
  },
  modules: [
    "Authentication & Profile Preferences",
    "IoT Device Controller Hub",
    "Automation Rules & Routine Scheduler",
    "QR Guest Pass Registry",
    "Energy Usage Analytics Engine",
    "Subscription Checkout Portal (Stripe)"
  ],
  pages: {
    "Public": [
        "Home",
        "Device Catalog & Subscriptions",
        "Login",
        "Register"
    ],
    "Guest": [
        "Dashboard (Allowed device controller)",
        "My Access Key (QR lock pass)",
        "Usage Logs",
        "Access Profile"
    ],
    "Resident": [
        "Dashboard (Real-time device widgets & status feeds)",
        "Device & Routine Configurator",
        "Energy Consumption Charts",
        "Guest Access Invite Panel"
    ],
    "Admin": [
        "Dashboard (Active system hubs, subscription flows)",
        "Global Device Registries",
        "Finance Diagnostics & Audits"
    ]
  },
  databaseCollections: [
    "Users",
    "Devices",
    "Routines",
    "EnergyLogs",
    "GuestAccessKeys",
    "Subscriptions"
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
      "Responsive IoT Panel UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Devices, Routines, AccessKeys)",
      "MVC",
      "Middleware (Authentication, Role Verification)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (Resident -> Devices, Resident -> GuestAccessKeys)"
    ],
    "general": [
      "CRUD Operations (Devices, Routines)",
      "Search & Filter (devices by room, type, connection status)",
      "Dashboard Panels showing energy gauges and live simulator logs",
      "Profile & Security Preferences Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Stripe checkout portal for premium security cloud plans",
    "QR Code-based temporary entry simulator for smart locks",
    "PDF access pass receipt generator",
    "Interactive energy efficiency charts (Socket.io real-time updates)",
    "Email notifications for security trigger warnings"
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

export default fp10Data;
