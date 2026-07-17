export const fp29Data = {
  projectId: 29,
  projectCode: "FP-29",
  projectTitle: "Weather Station & Geospatial Sensor Portal",
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
    "Chart.js",
    "Google Maps API",
    "PDF-Kit"
  ],
  overview: "Build an analytics app parsing weather station metrics, history trends, interactive charts, and local alerts.",
  problemStatement: [
    "Manual and error-prone tracking of weather station coordinates and sensor metrics.",
    "Difficulty in organizing data access controls and coordinating researcher/operator roles.",
    "Inefficient weather alert configurations and lack of status visibility for active sensors.",
    "Lack of real-time geospatial statistics and visual dashboards for meteorological trend analysis."
  ],
  objectives: [
    "Build a robust and secure MERN stack weather station and geospatial sensor portal.",
    "Implement isolated workflow experience pipelines for Researchers, Station Operators, and Admins.",
    "Ensure strict database schema constraints for sensor readings, geospatial coordinates, and reading timelines.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Verify and approve new Weather Station registrations",
        "Configure global warning thresholds and sensor definitions",
        "Monitor server performance metrics, connection logs, and database diagnostics",
        "Audit system access security logs"
    ],
    "Operator": [
        "Create station profile details (coordinates, elevation, station model)",
        "Register active sensor modules (temperature, barometric, anemometer)",
        "Upload raw diagnostic logs and calibration files (using Multer)",
        "Monitor real-time connection status and local power metrics"
    ],
    "Researcher": [
        "Search and filter weather stations using geospatial interactive maps (using Google Maps API)",
        "Access historical sensor metrics datasets and analyze weather trends",
        "Configure custom local warning alerts for specific stations",
        "Generate and download printable weather reports as PDF"
    ]
  },
  modules: [
    "Authentication & Member Hub",
    "Station Directory & Sensor Registry",
    "Reading Logs Collector (Sensor Data)",
    "Geospatial Alerts Engine (Google Maps API)",
    "Weather Analytics Dashboard (Charts)"
  ],
  pages: {
    "Public": [
        "Home",
        "Global Weather Map",
        "About Platform",
        "Login",
        "Register"
    ],
    "Researcher": [
        "Dashboard (My bookmarked stations, recent alerts)",
        "Geospatial Explorer (Interactive maps selector)",
        "Data Analyzer (Graph plotter and metrics comparison)",
        "Alerts Manager"
    ],
    "Operator": [
        "Dashboard (My active stations, sensor health levels)",
        "Station Configurator (Add sensors)",
        "Calibration Logs Desk",
        "Operator Chats"
    ],
    "Admin": [
        "Dashboard (Platform active nodes, storage size)",
        "Verify Stations Registry",
        "System Audit Logs & Settings"
    ]
  },
  databaseCollections: [
    "Users",
    "Stations",
    "Sensors",
    "ReadingLogs",
    "Alerts",
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
      "Responsive Interactive Analytics UI",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Stations, ReadingLogs, Alerts)",
      "MVC",
      "Middleware (Authentication, Operator/Researcher role checks)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (Station -> Sensors, Sensor -> ReadingLogs)"
    ],
    "general": [
      "CRUD Operations (Stations, Sensors, ReadingLogs)",
      "Search & Filter (stations by country, variables measured, connection status)",
      "Dashboard Panels showing dial indicators, gauges, and historical plots",
      "Profile & Measurement unit preferences Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "Interactive Google Maps interface to search and route nearest sensors",
    "Visual trend analysis and comparison graphs (using Chart.js)",
    "Auto-generated weather report summary sheet PDF exporter (using PDF-Kit)",
    "Raw data uploader with Multer validations",
    "Dark mode dashboard themes"
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

export default fp29Data;
