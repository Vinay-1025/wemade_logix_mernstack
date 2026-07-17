export const fp22Data = {
  projectId: 22,
  projectCode: "FP-22",
  projectTitle: "Human Resource Management (HRM) System",
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
    "Multer",
    "PDF-Kit"
  ],
  overview: "Build an enterprise portal tracking employee directory records, department structures, leave requests, and payroll updates.",
  problemStatement: [
    "Manual and error-prone tracking of employee details, attendance sheets, and leaves.",
    "Difficulty in organizing company department hierarchies and delegating approval workflows.",
    "Inefficient and delayed payroll computation workflows and payslip generation.",
    "Lack of centralized real-time reports on company headcounts, department costs, and check-in statuses."
  ],
  objectives: [
    "Build a robust and secure MERN stack Human Resource Management (HRM) enterprise portal.",
    "Implement isolated workflows and access layers for Employees, Department Managers, and HR Admins.",
    "Ensure strict database schema constraints for employee directories, timesheets, and payroll balances.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Configure company profile directories, departments, and payroll cycles",
        "Monitor server diagnostics and overall corporate headcount logs",
        "Audit system access registers and payroll disbursement records",
        "Process monthly contractor and salary payouts via Stripe integration"
    ],
    "Manager": [
        "Review and approve department employee leave requests and timesheets",
        "Conduct employee performance reviews and set growth targets",
        "Monitor team attendance metrics and check-in timelines",
        "Manage department shift calendars and team assignments"
    ],
    "Employee": [
        "Check-in/Check-out to log daily work attendance timesheets",
        "Submit leave requests with duration details and cover letters",
        "Download monthly paystub invoices and salary breakdowns as PDF",
        "Update personal profiles, contact numbers, and bank account information"
    ]
  },
  modules: [
    "Authentication & Employee Directory",
    "Leave & Attendance Pipeline",
    "Payroll & Benefit Ledger (Stripe API)",
    "Performance Review Engine",
    "Document Storage Hub (Multer)"
  ],
  pages: {
    "Public": [
        "Home",
        "Portal Solutions Overview",
        "Login",
        "Register"
    ],
    "Employee": [
        "Dashboard (Today's check-in timer, remaining leaves balance)",
        "Leave Requester Ledger",
        "My Paystubs & Salaries",
        "Account Settings"
    ],
    "Manager": [
        "Dashboard (Department headcount, today's absentees list)",
        "Team Leave Approvals",
        "Performance Evaluations Console",
        "Roster Schedules"
    ],
    "Admin": [
        "Dashboard (Company salary overheads, global metrics)",
        "Employee Roster Manager (CRUD profiles)",
        "Payroll Processor (Run salaries)",
        "Diagnostics & Activity Log"
    ]
  },
  databaseCollections: [
    "Users",
    "Departments",
    "LeaveRequests",
    "Timesheets",
    "Paystubs",
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
      "Responsive HRM Dashboard UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Employees, LeaveRequests, Paystubs)",
      "MVC",
      "Middleware (Authentication, Role Check controls)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (User -> LeaveRequests, User -> Paystubs)"
    ],
    "general": [
      "CRUD Operations (Employee details, Leave requests)",
      "Search & Filter (employees by department, status, role)",
      "Dashboard Panels showing attendance calendars and salary budgets",
      "Profile & Document settings Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Stripe payment integration for processing external contractor salaries",
    "Monthly paystub/payslip generator as PDF document (using PDF-Kit)",
    "Interactive payroll budget and attendance charts (using Chart.js)",
    "Automated email triggers when leave requests are approved/rejected",
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

export default fp22Data;
