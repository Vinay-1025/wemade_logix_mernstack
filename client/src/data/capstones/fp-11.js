export const fp11Data = {
  projectId: 11,
  projectCode: "FP-11",
  projectTitle: "Hotel & Resort Booking Engine",
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
  overview: "Build a reservations system checking room category availabilities, promotional discounts, dining options, and guest checks.",
  problemStatement: [
    "Manual and error-prone tracking of hotel room bookings and availability status.",
    "Difficulty in managing guest preferences, room dining selections, and promotional add-on services.",
    "Inefficient check-in and check-out workflows causing long front-desk wait times.",
    "Lack of real-time occupancy statistics and revenue analytics dashboards."
  ],
  objectives: [
    "Build a robust and secure MERN stack hotel and resort booking application.",
    "Implement isolated user experience pipelines for Guests, Staff Managers, and Admins.",
    "Ensure strict database schema constraints for booking dates, occupancy limits, and billing.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Configure global hotel configurations, branch settings, and tax policies",
        "Monitor server performance metrics and database status",
        "Audit platform-wide activity and security logs",
        "Manage corporate account records and system integrations"
    ],
    "Manager": [
        "Manage room inventories, room categories, and daily pricing rules",
        "Approve promotional discount campaigns and dining options lists",
        "Handle guest check-in / check-out overrides and assign rooms",
        "Analyze occupancy dashboards, monthly revenue, and performance charts"
    ],
    "Guest": [
        "Search and filter room availability by date range and guest count",
        "Book hotel suites, select dining plans, and apply promotional codes",
        "Manage reservation schedules, request room changes, or cancel bookings",
        "Download booking receipts and detailed guest check invoices as PDF"
    ]
  },
  modules: [
    "Authentication & Guest Profile Hub",
    "Room Inventory & Availability Controller",
    "Reservation Engine (Booking Pipeline)",
    "Dining & Add-on Services Manager",
    "Guest Billing & Invoice Exporter",
    "Occupancy Analytics (Dashboard Charts)"
  ],
  pages: {
    "Public": [
        "Home",
        "Rooms & Suites Catalog",
        "About & Resort Location Map",
        "Login",
        "Register"
    ],
    "Guest": [
        "Dashboard (My current, upcoming, and past reservations)",
        "Room Booker (Interactive dates & details selector)",
        "Dining & Extras Panel",
        "Receipts & Invoice Center"
    ],
    "Manager": [
        "Dashboard (Occupancy rate gauge, pending check-ins, active stays)",
        "Inventory Manager (Rooms & Rates Editor)",
        "Reception Hub (Check-in/Check-out console)",
        "Revenue & Occupancy Statistics"
    ],
    "Admin": [
        "Dashboard (Platform-wide resort earnings)",
        "Resort Branches & Accounts Controller",
        "Database Diagnostics & Logs Viewer"
    ]
  },
  databaseCollections: [
    "Users",
    "Rooms",
    "Bookings",
    "Services",
    "Invoices",
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
      "Responsive Room Finder UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Rooms, Bookings, Services)",
      "MVC",
      "Middleware (Auth, Manager Role Access)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (User -> Bookings, Room -> Bookings)"
    ],
    "general": [
      "CRUD Operations (Rooms, Bookings)",
      "Search & Filter (rooms by price, capacity, features)",
      "Dashboard Panels showing booking summaries and calendar views",
      "Profile & Dining Preferences Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Interactive occupancy rate and revenue forecast charts (using Chart.js)",
    "Real-time daily room availability checklist updates",
    "PDF Invoice/Receipt generation for guest checks (using PDF-Kit)",
    "Room picture carousel upload module (using Multer)",
    "Dark mode UI toggle for evening front desk staff"
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

export default fp11Data;
