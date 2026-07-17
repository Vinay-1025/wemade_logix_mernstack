export const fp15Data = {
  projectId: 15,
  projectCode: "FP-15",
  projectTitle: "Movie Rating & Cinema Ticketing App",
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
    "PDF-Kit",
    "Stripe API"
  ],
  overview: "Build a showtime browser featuring seat selection grids, movie reviews, genre categories, and promotional codes.",
  problemStatement: [
    "Manual and error-prone tracking of showtimes, room seat capacities, and cinema bookings.",
    "Difficulty in managing real-time seat availability and preventing duplicate seat assignments.",
    "Inefficient verification workflows at cinema entry points for checking visitor tickets.",
    "Absence of visual reporting on cinema occupancies, popular showtimes, and ticket sales revenue."
  ],
  objectives: [
    "Build a robust and secure MERN stack movie ticketing and ratings application.",
    "Implement isolated booking pipelines and dashboards for Customers, Cinema Staff, and Admins.",
    "Ensure strict database schema constraints for seat reservations, showtime timings, and transaction logging.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Configure global cinema parameters, branch details, and tax rules",
        "Monitor server performance metrics and database scalability logs",
        "Audit system access logs and security configurations",
        "Manage system-wide promotional discount codes"
    ],
    "CinemaManager": [
        "Catalog movie releases, genre categories, and details",
        "Configure screen halls, seat layout grids, and showtime schedules",
        "Monitor ticket bookings, seat occupancy rates, and revenue metrics",
        "Handle customer booking exceptions and print manual ticket passes"
    ],
    "Customer": [
        "Browse active movie list, search showtimes, and filter by genre or language",
        "Select specific seats from an interactive hall grid and buy tickets via checkout",
        "Write ratings & reviews for movies and join discussion boards",
        "Download ticket receipts and seat passes with barcode references as PDF"
    ]
  },
  modules: [
    "Authentication & Profile preferences",
    "Movie & Showtime Catalog",
    "Seat Allocation & Booking Engine",
    "Ratings & Review Board",
    "Ticket Billing & PDF Invoice Generator"
  ],
  pages: {
    "Public": [
        "Home (Now Showing & Upcoming movies slider)",
        "Movie Details & Reviews catalog",
        "Showtimes Browser",
        "Login",
        "Register"
    ],
    "Customer": [
        "Dashboard (My purchased ticket cards, watchlist)",
        "Interactive Seat Booker (Seat grid layout selector)",
        "Reviews & Ratings Editor",
        "Account Settings"
    ],
    "CinemaManager": [
        "Dashboard (Occupancy summaries, daily show statuses)",
        "Movie & Showtime Scheduler",
        "Screen Grid Configurator",
        "Sales & Revenue Auditor"
    ],
    "Admin": [
        "Dashboard (Branch earnings, movie popularity indexes)",
        "User Access & Roster Registry",
        "Diagnostics Log"
    ]
  },
  databaseCollections: [
    "Users",
    "Movies",
    "Showtimes",
    "Bookings",
    "Reviews",
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
      "Responsive Cinema Booking UI with Interactive Seat Selection",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Movies, Showtimes, Bookings)",
      "MVC",
      "Middleware (Authentication, Role Check Control)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (Showtime -> Bookings, User -> Reviews)"
    ],
    "general": [
      "CRUD Operations (Movies, Showtimes, Bookings)",
      "Search & Filter (movies by genre, date, timing, screens)",
      "Dashboard Panels showing sales summaries and seat occupancies",
      "Profile & Notification Preferences Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Stripe payment checkout integration for purchasing cinema tickets",
    "Interactive seat layout grid builder for theater screens",
    "Auto-generated PDF tickets with barcodes (using PDF-Kit)",
    "Movie poster uploads and management (using Multer)",
    "Dark mode for cinema dashboard interfaces"
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

export default fp15Data;
