export const fp31Data = {
  projectId: 31,
  projectCode: "FP-31",
  projectTitle: "Local Service Directory & Reviews Platform",
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
    "Socket.io",
    "Google Maps API",
    "Multer",
    "PDF-Kit"
  ],
  overview: "Build a local provider search indexing businesses, user rating scores, contact request pipelines, and maps.",
  problemStatement: [
    "Manual and error-prone tracking of local businesses, services, and locations.",
    "Difficulty in organizing user ratings and moderating reviews.",
    "Inefficient communication workflows for requesting service quotes and booking providers.",
    "Lack of real-time stats and visual dashboard insights on listing traffic and customer reviews."
  ],
  objectives: [
    "Build a robust and secure MERN stack local service directory and reviews platform.",
    "Implement isolated workflows and dashboard views for Customers, Service Providers, and Admins.",
    "Ensure strict database schema constraints for business profiles, review details, and quote requests.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Configure global location settings, directory categories, and premium membership tiers",
        "Verify and approve new Service Provider registries",
        "Monitor server performance metrics, query logs, and database diagnostics",
        "Audit system access security logs and moderate flagged reviews"
    ],
    "Provider": [
        "Configure business profile details (services offered, coordinates, pricing, hours)",
        "Manage inbound customer service quote requests and schedule bookings",
        "Track profile view statistics and overall customer rating scores",
        "Reply to client feedback and manage chat conversations"
    ],
    "Customer": [
        "Browse and search service providers using geographic interactive maps",
        "Request custom service quotes and message providers in real-time",
        "Submit reviews and ratings on verified business profiles",
        "Download booking receipts and service quote details as PDF"
    ]
  },
  modules: [
    "Authentication & Member Hub",
    "Service Directory & Listing Builder",
    "Reviews & Ratings Engine",
    "Lead & Quote Request Pipeline",
    "Geospatial Location Finder (Google Maps)"
  ],
  pages: {
    "Public": [
        "Home",
        "Service Directory Map",
        "Provider Details Page (Reviews listing)",
        "Login",
        "Register"
    ],
    "Customer": [
        "Dashboard (My active quote requests, saved providers)",
        "New Quote Requester Form",
        "My Reviews Feed",
        "Chat Desk (Messaging providers)"
    ],
    "Provider": [
        "Dashboard (Profile views, pending quotes count, rating aggregates)",
        "Listing Profile Editor (Upload photos using Multer)",
        "Inbound Quotes Desk",
        "Feedback Responses Console"
    ],
    "Admin": [
        "Dashboard (Total verified listings, transaction volumes)",
        "Provider Verification center",
        "System Audit Logs & Settings"
    ]
  },
  databaseCollections: [
    "Users",
    "Businesses",
    "Reviews",
    "Quotes",
    "Conversations",
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
      "Responsive Directory UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Businesses, Reviews, Quotes)",
      "MVC",
      "Middleware (Authentication, Role Check controls)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (Business -> Reviews, Customer -> Quotes)"
    ],
    "general": [
      "CRUD Operations (Businesses, Reviews, Quotes)",
      "Search & Filter (businesses by service type, location, ratings)",
      "Dashboard Panels showing rating gauges and message lists",
      "Profile & Notification settings Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Stripe payment integration for premium provider memberships",
    "Interactive Google Maps interface to find nearby service providers",
    "Live chat channel between customer and provider via WebSockets",
    "Auto-generated quote summaries and receipts as PDF (using PDF-Kit)",
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

export default fp31Data;
