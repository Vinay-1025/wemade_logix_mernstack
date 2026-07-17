export const fp30Data = {
  projectId: 30,
  projectCode: "FP-30",
  projectTitle: "Gym Membership & Schedule Booking System",
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
    "Stripe API",
    "PDF-Kit",
    "Multer"
  ],
  overview: "Build a club manager app scheduling class times, tracking member attendance, billing status, and training calendars.",
  problemStatement: [
    "Manual and error-prone tracking of gym memberships, pricing schemes, and schedule slots.",
    "Difficulty in preventing class overbookings and managing trainer workloads.",
    "Inefficient check-in mechanisms and lack of status visibility for active membership tiers.",
    "Lack of real-time statistics and visual dashboards for monthly gym revenues and member attendance trends."
  ],
  objectives: [
    "Build a robust and secure MERN stack gym membership and schedule booking system.",
    "Implement isolated dashboard portals and layouts for Members, Trainers, and Admins.",
    "Ensure strict database schema constraints for membership dates, slot capacities, and invoice logs.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Configure global gym settings, branches, and membership prices",
        "Manage trainer accounts, profile registries, and database updates",
        "Audit system transaction flows, payment escrows, and access logs",
        "Monitor server performance metrics and diagnostics reports"
    ],
    "Trainer": [
        "Create fitness class schedules and assign training calendars",
        "Record student class attendance check-ins and log sessions",
        "Track client progress and view class enrollment statistics using charts",
        "Manage personal profile biography and operational slot lists"
    ],
    "Member": [
        "Browse and search gym classes by type, trainer, and schedule times",
        "Book class reservation slots and choose membership subscription tiers",
        "Pay gym invoices and membership dues securely via Stripe checkout",
        "Download personal membership pass sheets and bill receipts as PDF"
    ]
  },
  modules: [
    "Authentication & Member Roster",
    "Membership & Billing Engine (Stripe API)",
    "Class Scheduler & Booking Pipeline",
    "Attendance & Training Logs Collector",
    "Gym Analytics Dashboard (Charts)"
  ],
  pages: {
    "Public": [
        "Home",
        "Gym Classes Catalog",
        "Membership Plans Overview",
        "Login",
        "Register"
    ],
    "Member": [
        "Dashboard (My booked classes calendar, upcoming timers)",
        "Class Booking Form (Select dates & times)",
        "My Invoices & Billing Desk",
        "Account Settings"
    ],
    "Trainer": [
        "Dashboard (Today's roster, active class capacities)",
        "Class Builder Console",
        "Attendance Logger Desk",
        "Trainee Progress Reports"
    ],
    "Admin": [
        "Dashboard (Total gym revenue, active membership counters)",
        "Trainer Roster Manager",
        "Diagnostics & System Audit Log"
    ]
  },
  databaseCollections: [
    "Users",
    "Memberships",
    "Classes",
    "Bookings",
    "AttendanceLogs",
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
      "Responsive Gym Management Dashboard UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Classes, Bookings, Memberships)",
      "MVC",
      "Middleware (Authentication, Role Check controls)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (Class -> Bookings, User -> Memberships)"
    ],
    "general": [
      "CRUD Operations (Classes, Bookings)",
      "Search & Filter (classes by time, category, trainer)",
      "Dashboard Panels showing booking slots calendars and check-in checklists",
      "Profile & Wellness preference settings",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Stripe checkout integration for membership purchases and bookings",
    "Interactive member attendance and class enrollment charts (using Chart.js)",
    "Auto-generated membership pass and invoice card as PDF (using PDF-Kit)",
    "Profile avatar uploader (using Multer)",
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

export default fp30Data;
