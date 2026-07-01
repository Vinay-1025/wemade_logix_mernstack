export const fp17Data = {
  projectId: 17,
  projectCode: "FP-17",
  projectTitle: "Virtual Classroom & Document Sharing Space",
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
  "Google Maps API"
],
  overview: "Build a student workspace supporting document uploads, calendar announcements, class boards, and grade sheets.",
  problemStatement: [
    "Manual and error-prone tracking of Virtual Classroom & Document Sharing Space events.",
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
        "Moderate event bookings",
        "Approve tour operators",
        "View sales summaries",
        "Audit backend logs"
    ],
    "Agent": [
        "Create travel package listings",
        "Manage booking calendars",
        "Manage traveler inquiry threads",
        "View earnings reports"
    ],
    "Traveler": [
        "Browse travel tour packages",
        "Book travel packages via checkout",
        "Build custom day schedules",
        "View invoices"
    ]
},
  modules: [
  "Authentication",
  "Travel Gigs",
  "Itinerary Builder",
  "Booking pipelines",
  "Inquiries Support"
],
  pages: {
    "Public": [
        "Home",
        "Tours Catalog",
        "Travel Details",
        "Login",
        "Register"
    ],
    "Traveler": [
        "Dashboard",
        "My Bookings",
        "My Itinerary",
        "Order Invoices"
    ],
    "Agent": [
        "Dashboard",
        "Packages builder",
        "Tours Reservations",
        "Earnings Analytics"
    ],
    "Admin": [
        "Dashboard",
        "Tours approvals",
        "General Configs"
    ]
},
  databaseCollections: [
  "Users",
  "Packages",
  "Bookings",
  "Itineraries",
  "Inquiries",
  "Reviews"
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
  "Stripe Checkout processing",
  "PDF itinerary maps export",
  "Google Maps routes visualizer",
  "Email confirmation booking",
  "Dark mode"
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
export default fp17Data;
