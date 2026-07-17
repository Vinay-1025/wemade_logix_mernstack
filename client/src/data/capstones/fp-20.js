export const fp20Data = {
  projectId: 20,
  projectCode: "FP-20",
  projectTitle: "Real Estate Listing & Broker Connection Hub",
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
    "Multer",
    "GridFS",
    "Google Maps API",
    "PDF-Kit"
  ],
  overview: "Build a property search app featuring filters for pricing, location, dimensions, and broker connection forms.",
  problemStatement: [
    "Manual and error-prone tracking of real estate listings, pricing updates, and agent delegations.",
    "Difficulty in organizing property media galleries, layout floor plans, and video tours.",
    "Inefficient communication channels between interested buyers and real estate brokers.",
    "Lack of visual real-time reporting on property listing engagement and broker inquiries."
  ],
  objectives: [
    "Build a robust and secure MERN stack real estate listing portal and connection hub.",
    "Implement isolated workflow experience pipelines for Buyers/Renters, Brokers/Agents, and Admins.",
    "Ensure strict database schema constraints for property records, broker contacts, and connection inquiries.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Configure global location settings, area tags, and listing parameters",
        "Verify and approve Broker/Agent license registrations",
        "Audit system connection inquiries, database access, and activity logs",
        "Manage platform listings and report moderations"
    ],
    "Broker": [
        "Create property listings (pricing, dimensions, location tags)",
        "Upload high-resolution property photos, floor plans, and video tours (using Multer and GridFS)",
        "Manage customer viewing schedules and inbound inquiry forms",
        "Analyze property listing engagement charts and visitor counts"
    ],
    "Buyer": [
        "Search and filter property listings by location, price, dimensions, and amenities",
        "View locations on interactive map boards and request broker callback connections",
        "Schedule property viewing slots and save favorite listings",
        "Download PDF property brochures and detail sheets"
    ]
  },
  modules: [
    "Authentication & User Profiles",
    "Property Finder & Catalog (Search & Filters)",
    "Media Gallery Registry (GridFS Storage)",
    "Broker Connection & Callback Engine",
    "Listing Analytics & Engagement reports"
  ],
  pages: {
    "Public": [
        "Home (Featured properties showcase)",
        "Property Catalog Browser",
        "Property Details Page",
        "Login",
        "Register"
    ],
    "Buyer": [
        "Dashboard (My inquiries, saved listings, and viewing schedules)",
        "Interactive Property Map",
        "Inquiry History ledger",
        "Account Settings"
    ],
    "Broker": [
        "Dashboard (Active listing metrics, inbound connection requests)",
        "Property Publisher Form (Upload floorplans/photos)",
        "Client Inquiries Desk",
        "Engagement Graphs"
    ],
    "Admin": [
        "Dashboard (Platform active users, popular locations)",
        "Broker Verification center",
        "Listing Audits & Diagnostics Log"
    ]
  },
  databaseCollections: [
    "Users",
    "Properties",
    "Inquiries",
    "BrokerProfiles",
    "SavedListings",
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
      "Responsive Real Estate UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Properties, Inquiries, Profiles)",
      "MVC",
      "Middleware (Authentication, Broker Role checks)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (Broker -> Properties, Buyer -> Inquiries)"
    ],
    "general": [
      "CRUD Operations (Properties, Inquiries)",
      "Search & Filter (properties by location, price, dimensions, category)",
      "Dashboard Panels showing property metrics and callback logs",
      "Profile & Notification settings Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Interactive Google Maps search for property location routes",
    "Large file photo & video upload registry (using GridFS and Multer)",
    "Auto-generated PDF property brochures and price details",
    "Real-time broker callback email triggers",
    "Dark mode workspace options"
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

export default fp20Data;
