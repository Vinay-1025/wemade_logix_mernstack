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
    "Google Maps API",
    "Multer",
    "PDF-Kit"
  ],
  overview: "Build a student workspace supporting document uploads, calendar announcements, class boards, and grade sheets.",
  problemStatement: [
    "Manual and disconnected tracking of student assignments, shared notes, and class materials.",
    "Difficulty in organizing online syllabus documentation and keeping study calendars synchronized.",
    "Inefficient grading workflows and lack of real-time grade visibility for students.",
    "Absence of interactive maps for locating study groups and secure payment processors for premium course fees."
  ],
  objectives: [
    "Build a robust and secure MERN stack virtual classroom and document sharing workspace.",
    "Implement isolated classroom dashboards for Admins, Teachers, and Students.",
    "Ensure strict database schema constraints for study materials, grading records, and submission timetables.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Moderate platform classroom registration bookings",
        "Approve credentialed Teachers and institution profiles",
        "View platform subscription commission summaries and payment logs",
        "Audit system activities and backend security logs"
    ],
    "Teacher": [
        "Create virtual classrooms and custom syllabus structures",
        "Upload lecture resources, assignments, and documents (using Multer)",
        "Manage calendar announcements, event schedules, and student discussion threads",
        "Grade student submissions and analyze class performance metrics"
    ],
    "Student": [
        "Browse and search active classroom subjects by category tags",
        "Book premium classrooms or tutoring slots via Stripe checkout",
        "Download course material PDFs, submit homework, and view private grade sheets",
        "Locate physical study groups and tutor locations on map panels"
    ]
  },
  modules: [
    "Authentication & Member Hub",
    "Classroom Directory & Syllabus Builder",
    "Document Repository & Media Uploader (Multer)",
    "Assignment Submission & Grading Engine",
    "Interactive Map & Tutor Locator (Google Maps)",
    "Course Checkout System (Stripe)"
  ],
  pages: {
    "Public": [
        "Home",
        "Classrooms Catalog",
        "Classroom Features Info",
        "Login",
        "Register"
    ],
    "Student": [
        "Dashboard (My active classes & announcements)",
        "Document Vault (Shared study guides & files)",
        "My Assignments & Grade Sheet",
        "Classroom Board & Q&A Threads"
    ],
    "Teacher": [
        "Dashboard (Student metrics, homework review queue)",
        "Classroom Syllabus Builder",
        "Gradebook Controller (Mark sheets & reports)",
        "Calendar Schedule Planner"
    ],
    "Admin": [
        "Dashboard (Total registrations, platform usage)",
        "Teacher Registry & Class Approvals",
        "Diagnostic logs and system controls"
    ]
  },
  databaseCollections: [
    "Users",
    "Classrooms",
    "Documents",
    "Announcements",
    "Submissions",
    "Grades"
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
      "Responsive Classroom Workspace UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Classrooms, Submissions, Grades)",
      "MVC",
      "Middleware (Authentication, Role Check Control)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (Classroom -> Documents, Student -> Submissions)"
    ],
    "general": [
      "CRUD Operations (Classrooms, Announcements, Submissions)",
      "Search & Filter (classrooms by subject, department, level)",
      "Dashboard Panels showing daily schedules and assignment counters",
      "Profile & Notification settings Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Stripe payment processing for booking premium classes",
    "Report card and grade sheets PDF exporter (using PDF-Kit)",
    "Google Maps integration to visualize local study group locations and routes",
    "Email updates on homework deadlines and grade releases",
    "Dark mode for late-night studying"
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
