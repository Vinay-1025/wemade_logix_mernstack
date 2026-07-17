export const fp26Data = {
  projectId: 26,
  projectCode: "FP-26",
  projectTitle: "Music Streaming & Playlist Curation Service",
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
    "GridFS",
    "Chart.js"
  ],
  overview: "Build an audio catalog supporting playlist creators, favorite tracks, audio player playback controls, and artist bios.",
  problemStatement: [
    "Manual and error-prone tracking of music tracks, albums, and user-curated playlists.",
    "Difficulty in organizing and uploading large audio files alongside cover art media.",
    "Inefficient streaming playback status controls and lack of track recommendations.",
    "Lack of real-time stream metrics and visual charts for artist performance analytics."
  ],
  objectives: [
    "Build a robust and secure MERN stack music streaming and playlist curation application.",
    "Implement isolated dashboard interfaces and access permissions for Admins, Artists, and Listeners.",
    "Ensure strict database schema constraints for album structures, playlist tracking, and track streaming counts.",
    "Deploy the complete working systems to production cloud hosts."
  ],
  roles: {
    "Admin": [
        "Configure global platform categories, music genres, and storage parameters",
        "Audit platform financial systems, artist payout cycles, and activity logs",
        "Monitor server streaming latencies and database scaling limits",
        "Moderate flagged comments, tracks, or user account profiles"
    ],
    "Artist": [
        "Upload audio music files and album cover artwork (using Multer and GridFS)",
        "Create album configurations, edit artist profile bio description",
        "Track stream count statistics and listener demographic metrics using visual charts",
        "Manage publication state (Draft vs. Public) for tracks"
    ],
    "Listener": [
        "Browse and search songs, albums, and artists directories by genres",
        "Create and edit custom personal music playlists",
        "Listen to live streamed audio tracks with integrated player controls",
        "Add favorite tracks to watchlist/collection and write comments on profiles"
    ]
  },
  modules: [
    "Authentication & Member Hub",
    "Music Catalog & Genre Registry",
    "Audio Streaming Engine (GridFS Storage)",
    "Playlist Creator & Favorites Hub",
    "Artist Analytics Dashboard (Charts)"
  ],
  pages: {
    "Public": [
        "Home",
        "Explore Tracks Catalog",
        "Artist Finder Profiles",
        "Login",
        "Register"
    ],
    "Listener": [
        "Dashboard (Recommended songs, recent listening history)",
        "My Playlists & Library",
        "Favorites Watchlist",
        "Account Settings"
    ],
    "Artist": [
        "Dashboard (Total streams, monthly listeners, top songs)",
        "Upload Track Console",
        "Album Builder",
        "Audience Analytics Charts"
    ],
    "Admin": [
        "Dashboard (Platform active nodes, storage size)",
        "Media Auditor Registry",
        "System Settings & Diagnostics"
    ]
  },
  databaseCollections: [
    "Users",
    "Tracks",
    "Albums",
    "Playlists",
    "StreamLogs",
    "ArtistProfiles"
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
      "Responsive Music Player Interface",
      "Form Validation"
    ],
    "backend": [
      "Express",
      "REST APIs (Tracks, Playlists, StreamLogs)",
      "MVC",
      "Middleware (Authentication, Role Check controls)",
      "Error Handling"
    ],
    "database": [
      "MongoDB",
      "Minimum 5 collections",
      "Relationships (Artist -> Albums, Album -> Tracks, User -> Playlists)"
    ],
    "general": [
      "CRUD Operations (Playlists, Tracks)",
      "Search & Filter (tracks by artist, title, genre, popularity)",
      "Dashboard Panels showing audio players and activity metrics",
      "Profile & Audio settings Management",
      "Deployment"
    ]
  },
  bonusFeatures: [
    "GridFS integration for large audio asset storage and buffered streaming",
    "Interactive stream count and listener analytics graphs (using Chart.js)",
    "Printable monthly streaming reports for artists (using PDF-Kit)",
    "Custom playlist image cover uploader (using Multer)",
    "Dark mode workspace optimized for dark screens"
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

export default fp26Data;
