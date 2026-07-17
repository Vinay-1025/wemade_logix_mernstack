export const fp21Data = {
  projectId: 21,
  projectCode: "FP-21",
  projectTitle: "Cloud File Storage & Encrypted Sharing Portal",
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
    "Google Maps API",
    "Multer",
    "CryptoJS"
  ],
  overview: "Build a files directory supporting folder hierarchies, document previewers, access controls, and sharing link tokens.",
  problemStatement: [
    "Manual and insecure transfer of files and folders over unencrypted channels.",
    "Difficulty in managing hierarchical folder directories and complex file access permissions.",
    "Poor visibility into user storage quotas and real-time account access locations.",
    "Lack of secure payment pipelines for upgrading storage tiers and automated sharing link expiration."
  ],
  objectives: [
    "Build a robust and secure MERN stack cloud storage and encrypted sharing portal.",
    "Implement isolated dashboards and folder access scopes for Admins, Members, and temporary Guests.",
    "Ensure strict database schema constraints for file metadata, access logs, and encrypted key tokens.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Configure global storage limits, user quotas, and billing rates",
        "Monitor server performance, disk usage, and network traffic metrics",
        "Audit system access logs and geographic login distribution",
        "Manage user subscription directories and license records"
    ],
    "Member": [
        "Upload files, manage folder directories, and organize structures (using Multer)",
        "Generate secure time-limited sharing links with passcode protection (using CryptoJS)",
        "Configure granular access scopes (Private, Shared, Public) for documents",
        "Upgrade storage plans securely via Stripe and monitor drive space charts"
    ],
    "Guest": [
        "Browse public or shared directories via shared link tokens",
        "Decrypt and download files by entering security passcode keys",
        "View allowed online document previews inside the browser",
        "Submit feedback and file access requests"
    ]
  },
  modules: [
    "Authentication & Driver profiles",
    "Hierarchical Directory & File Registry",
    "Encryption & Secure Sharing Engine (CryptoJS)",
    "Storage Quota & Billing checkout (Stripe)",
    "Access Map & Activity Security Hub (Google Maps)"
  ],
  pages: {
    "Public": [
        "Home",
        "Pricing Tiers & Security Overview",
        "Shared Link Decryption portal",
        "Login",
        "Register"
    ],
    "Member": [
        "Dashboard (My Drive directory with breadcrumb navigation)",
        "Shared Links Manager (Manage token timers and passwords)",
        "Storage Analytics & Billing Panel",
        "Account Activity Map (Geo-login inspector)"
    ],
    "Admin": [
        "Dashboard (Global space utilization, platform active nodes)",
        "User Registry & Quota Editor",
        "Security Intrusion Audit Logs"
    ]
  },
  databaseCollections: [
    "Users",
    "Folders",
    "Files",
    "ShareTokens",
    "AccessLogs",
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
      "Responsive Directory Explorer UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Folders, Files, ShareTokens)",
      "MVC",
      "Middleware (Authentication, Storage Quota Verification)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (User -> Folders, Folder -> Files)"
    ],
    "general": [
      "CRUD Operations (Folders, Files, ShareTokens)",
      "Search & Filter (files by name, file extension type, size)",
      "Dashboard Panels showing storage percentage gauges and analytics charts",
      "Profile & Security key settings Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Stripe payment integration for custom storage space upgrades",
    "Geographic map displaying download/access locations (using Google Maps API)",
    "Crypto-encrypted share links with password decryption validator",
    "Auto-generated invoice receipt PDF for storage plan purchases",
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

export default fp21Data;
