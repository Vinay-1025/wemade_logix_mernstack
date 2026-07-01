export const fp02Data = {
  projectId: 2,
  projectCode: "FP-02",
  projectTitle: "Healthcare Booking & Consultation Portal",
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
  "WebRTC",
  "Socket.io"
],
  overview: "Build a doctor-patient scheduler featuring live slot booking, video call rooms, and electronic prescription uploads.",
  problemStatement: [
    "Manual and error-prone tracking of Healthcare Booking & Consultation Portal events.",
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
        "Manage clinics & departments",
        "Verify practitioner credentials",
        "Audit system logs",
        "View analytics dashboard"
    ],
    "Practitioner": [
        "Set weekly slots & availability",
        "Conduct virtual video consultations",
        "Write digital prescriptions",
        "Access patient histories"
    ],
    "Patient": [
        "Browse practitioners by specialty",
        "Book slots & pay consultation fee",
        "Join video consultation room",
        "Download prescriptions"
    ]
},
  modules: [
  "Authentication",
  "Practitioner Directory",
  "Appointment Booking",
  "Video Consultation Room",
  "Prescription Builder",
  "Patient Records"
],
  pages: {
    "Public": [
        "Home",
        "Practitioner Finder",
        "Specialties",
        "Login",
        "Register"
    ],
    "Patient": [
        "Dashboard",
        "My Appointments",
        "Medical History",
        "Join Consultation"
    ],
    "Practitioner": [
        "Dashboard",
        "Availability Settings",
        "Upcoming Consultations",
        "Prescribe Panel"
    ],
    "Admin": [
        "Dashboard",
        "Verify Practitioners",
        "System Health Check"
    ]
},
  databaseCollections: [
  "Users",
  "Appointments",
  "Prescriptions",
  "Schedules",
  "MedicalHistories",
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
  "Live Video Room consultation",
  "SMS Appointment Reminders",
  "E-Prescription PDF export",
  "Activity logs",
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
export default fp02Data;
