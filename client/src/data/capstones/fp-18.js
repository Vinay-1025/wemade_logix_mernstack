export const fp18Data = {
  projectId: 18,
  projectCode: "FP-18",
  projectTitle: "Vehicle Rental & Fleet Management System",
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
    "Socket.io",
    "Multer",
    "PDF-Kit"
  ],
  overview: "Build a booking app checking rental durations, car categories, insurance options, and vehicle return inspection logs.",
  problemStatement: [
    "Manual and error-prone tracking of vehicle availabilities, rental durations, and return schedules.",
    "Difficulty in organizing vehicle maintenance records and return damage logs.",
    "Inefficient status tracking for active rentals and booking requests.",
    "Lack of centralized real-time statistics on fleet occupancy, usage rates, and revenue."
  ],
  objectives: [
    "Build a robust and secure MERN stack vehicle rental and fleet management system.",
    "Implement isolated workflows and dashboards for Customers, Fleet Managers, and Admins.",
    "Ensure strict database schema constraints for rental periods, pricing structures, and vehicle statuses.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Configure global fleet settings and branch departments",
        "Manage system-wide user credentials and database logs",
        "Monitor server performance metrics and diagnostics reports",
        "Audit platform usage and access security logs"
    ],
    "FleetManager": [
        "Manage vehicle inventory records and catalogs (adding models, categories, pricing)",
        "Approve or reject booking requests and coordinate vehicle allocations",
        "Create vehicle return inspection logs and record maintenance entries",
        "Analyze fleet utilization charts and financial revenue summaries"
    ],
    "Customer": [
        "Browse and filter fleet catalog by vehicle type, capacity, and price",
        "Submit rental booking requests with customizable durations and insurance options",
        "Track rental statuses, pickup instructions, and active bookings",
        "Download booking summary invoices and rental agreements as PDF"
    ]
  },
  modules: [
    "Authentication & Driver Profiles",
    "Fleet Inventory Manager (CRUD)",
    "Booking & Reservation Engine",
    "Vehicle Inspection & Maintenance Ledger",
    "Billing & PDF Invoice Exporter",
    "Fleet Utilization & Analytics (Charts)"
  ],
  pages: {
    "Public": [
        "Home",
        "Fleet Catalog Explorer",
        "Rental Packages & FAQ",
        "Login",
        "Register"
    ],
    "Customer": [
        "Dashboard (My active rentals & booking schedule)",
        "Rental Booking Form (Dates & options)",
        "My Rental Invoices",
        "Account Settings"
    ],
    "FleetManager": [
        "Dashboard (Active stays, maintenance alerts, pending pickups)",
        "Inventory Editor (Add/Edit vehicle details and upload pictures)",
        "Booking Coordinator Queue",
        "Return Inspector Desk (Log mileage, fuel, damage)"
    ],
    "Admin": [
        "Dashboard (Platform-wide revenue, branch analysis)",
        "Fleet & Roster Registry",
        "Diagnostics & Audit Log"
    ]
  },
  databaseCollections: [
    "Users",
    "Vehicles",
    "Bookings",
    "Inspections",
    "MaintenanceLogs",
    "Invoices"
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
      "Responsive Fleet Management Dashboard UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Vehicles, Bookings, Inspections)",
      "MVC",
      "Middleware (Authentication, Role Check Control)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (Vehicle -> Bookings, Booking -> Inspections)"
    ],
    "general": [
      "CRUD Operations (Vehicles, Bookings)",
      "Search & Filter (vehicles by category, availability, location, fuel type)",
      "Dashboard Panels showing fleet distribution and occupancy calendars",
      "Profile & Driver License Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Live fleet reservation updates via WebSockets",
    "Fleet utilization and revenue reports (using Chart.js)",
    "PDF invoice and rental agreement generator (using PDF-Kit)",
    "Vehicle photo upload integration (using Multer)",
    "Dark mode for fleet control panels"
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

export default fp18Data;
