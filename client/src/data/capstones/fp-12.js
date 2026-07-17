export const fp12Data = {
  projectId: 12,
  projectCode: "FP-12",
  projectTitle: "Job Search & Career Recruitment Portal",
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
    "Multer"
  ],
  overview: "Build an employer-candidate matching portal featuring resume builders, application trackers, job filtering, and direct chats.",
  problemStatement: [
    "Manual and fragmented tracking of job applications and candidate status updates.",
    "Difficulty for recruiters in screening resumes, filtering candidates, and organizing hiring pipelines.",
    "Inefficient and delayed communication between hiring managers and potential job seekers.",
    "Lack of real-time recruitment progress reporting and secure payment options for premium featured job postings."
  ],
  objectives: [
    "Build a robust and secure MERN stack job recruitment portal.",
    "Implement isolated, tailored pipelines for Candidates, Recruiter/Employers, and platform Admins.",
    "Ensure strict database schema constraints for resume metadata, application states, and real-time chat logs.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Configure global portal parameters and review flagged postings",
        "Verify corporate employer profiles and audit business access requests",
        "Monitor platform usage metrics and overall subscription financial logs",
        "Audit system activities and database logs"
    ],
    "Employer": [
        "Post job listings with custom tags, requirements, and salary ranges",
        "Filter candidate applications and manage hiring status pipelines (Applied, Screened, Interview, Offered, Rejected)",
        "Search candidate resume directory and initiate direct chat threads",
        "Purchase featured job postings and corporate seat licenses using Stripe"
    ],
    "Candidate": [
        "Browse and search job listings by criteria (salary, location, role, distance)",
        "Build custom profile metrics and upload resume documents",
        "Submit job applications and track hiring pipelines in real-time",
        "Communicate with recruiters via live chat and manage interview notifications"
    ]
  },
  modules: [
    "Authentication & Profile Configurator",
    "Job Board (CRUD & Filters)",
    "Applicant Tracking System (ATS Pipeline)",
    "Live Messaging Engine (Socket.io)",
    "Payment Gateway (Stripe for Premium Job Posts)",
    "Document Storage Hub (Multer for Resume PDFs)"
  ],
  pages: {
    "Public": [
        "Home",
        "Explore Jobs Search Board",
        "Employer Services & Pricing",
        "Login",
        "Register"
    ],
    "Candidate": [
        "Dashboard (Application statuses, recommended jobs, schedules)",
        "Profile & Resume Builder (Upload PDF Resume)",
        "Application Tracker",
        "Chat Workspace (Employer threads)"
    ],
    "Employer": [
        "Dashboard (Active job listings, total applicants, review queues)",
        "Job Post Creator",
        "Applicant Screening Console (Pipeline management)",
        "Chat Workspace (Candidate threads)"
    ],
    "Admin": [
        "Dashboard (User registrations, platform revenue reports)",
        "Employer Registry & Verification Board",
        "Diagnostics & Report Manager"
    ]
  },
  databaseCollections: [
    "Users",
    "Jobs",
    "Applications",
    "Messages",
    "Transactions",
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
      "Responsive Portal UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Jobs, Applications, Chats)",
      "MVC",
      "Middleware (Authentication, Role Verification)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (Employer -> Jobs, Candidate -> Applications)"
    ],
    "general": [
      "CRUD Operations (Job Posts, Applications)",
      "Search & Filter (jobs by department, salary range, job type)",
      "Dashboard Panels showing application metrics and candidate matches",
      "Profile & Notification Preferences Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Live chat and typing updates via Socket.io",
    "Stripe payment integration for posting featured/promoted job cards",
    "PDF Resume data extractor / Candidate profile sheet builder (using Multer)",
    "Email alert notifications when job application status changes",
    "Dark mode dashboard toggle"
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

export default fp12Data;
