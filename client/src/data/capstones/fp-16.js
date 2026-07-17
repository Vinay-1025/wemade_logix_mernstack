export const fp16Data = {
  projectId: 16,
  projectCode: "FP-16",
  projectTitle: "Event Management & Ticketing Organizer",
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
    "QRCode-Generator",
    "PDF-Kit",
    "Stripe API"
  ],
  overview: "Build an event catalog supporting ticket reservations, check-in QR scan logs, and organizer dashboards.",
  problemStatement: [
    "Manual and error-prone tracking of event lists, ticket allocations, and user check-ins.",
    "Difficulty in coordinating organizer registrations and attendee ticket verification procedures.",
    "Inefficient entry check-in workflows at events leading to security bottlenecks.",
    "Lack of real-time ticket sales metrics and visual attendance statistics for organizers."
  ],
  objectives: [
    "Build a robust and secure MERN stack event ticketing and organization platform.",
    "Implement isolated user experience pipelines for Attendees, Organizers, and Admins.",
    "Ensure strict database schema constraints for booking dates, ticket limits, and entry scan logs.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Manage event organization verification statuses",
        "Oversee platform-wide ticket transaction financial models",
        "Audit access logs and security configurations",
        "Configure global commission rates and categories"
    ],
    "Organizer": [
        "Build public event listings and descriptions",
        "Manage ticket price tiers, deadlines, and coupon codes",
        "Track real-time ticket sales metrics and attendee roster charts",
        "Verify tickets at venue entry using QR code scans"
    ],
    "Attendee": [
        "Browse upcoming local and online events by categories",
        "Book event ticket slots via Stripe checkout",
        "Download ticket PDF with unique verification QR codes",
        "Manage personal reservation history and notifications"
    ]
  },
  modules: [
    "Authentication & Profile manager",
    "Events Directory Catalog",
    "Ticketing & Reservation Engine",
    "QR Check-in & Entry Verification System",
    "Organizer Sales Analytics Dashboard"
  ],
  pages: {
    "Public": [
        "Home (Featured events and trending categories)",
        "Events Catalog Search",
        "Event Details Page",
        "Login",
        "Register"
    ],
    "Attendee": [
        "Dashboard (My upcoming & past events)",
        "My Tickets (QR ticket list)",
        "Order Invoices & Receipts",
        "Account Settings"
    ],
    "Organizer": [
        "Dashboard (Ticket counts, gross sales, attendance rate)",
        "Create & Edit Event Form (Upload banner using Multer)",
        "Sales Reports & Roster Ledger",
        "Ticket Check-in Scanner Console"
    ],
    "Admin": [
        "Dashboard (Platform-wide revenue, popular categories)",
        "Organizer Registries Approval",
        "System Settings & Audits"
    ]
  },
  databaseCollections: [
    "Users",
    "Events",
    "Tickets",
    "Organizations",
    "SalesLogs"
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
      "REST APIs (Events, Tickets, Checkins)",
      "MVC",
      "Middleware (Authentication, Role Check controls)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (Organizer -> Events, Attendee -> Tickets)"
    ],
    "general": [
      "CRUD Operations (Events, Tickets)",
      "Search & Filter (events by date, price range, categories)",
      "Dashboard Panels showing sales summaries and registration lists",
      "Profile & Attendance Preferences Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Stripe checkout integration for secure payment processing",
    "QR Code-based ticket generation and check-in scanner validation",
    "Auto-generated PDF tickets with check-in instructions (using PDF-Kit)",
    "Interactive ticket sales charts",
    "Automated email confirmations with check-in receipts"
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

export default fp16Data;
