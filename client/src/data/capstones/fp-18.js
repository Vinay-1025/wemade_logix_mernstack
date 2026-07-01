export const fp18Data = {
  projectCode: "FP-18",
  title: "Vehicle Rental & Fleet Management System",
  explanation: "Build a booking app checking rental durations, car categories, insurance options, and vehicle return inspection logs.",
  progression: [
    {
      level: "Phase 1: Architecture & Design",
      title: "Database Schemas & API Endpoints",
      content: "Map out the REST API endpoints and define database schemas for your application modules."
    },
    {
      level: "Phase 2: Core Development",
      title: "Frontend Components & Business Logic",
      content: "Build responsive React components and hook them up to your backend servers with state verification."
    },
    {
      level: "Phase 3: Production Release",
      title: "Security Auditing & Deployed Server Hosting",
      content: "Secure passwords using bcrypt, configure JWT authorization, and deploy to staging environments."
    }
  ],
  detailedReference: {
    summary: "Build a highly scalable MERN stack implementation of a Vehicle Rental & Fleet Management System showing production-ready practices.",
    keyConcepts: [
      { term: "Schema Integrity", definition: "Enforcing validation constraints on your MongoDB collection layouts." },
      { term: "User Isolation", definition: "Ensuring users can only query, modify, or delete their own custom data documents." }
    ],
    bestPractices: [
      "Secure sensitive API operations using custom express validation middleware.",
      "Manage component states in React to keep rendering speed high and responsive."
    ]
  },
  codeTemplate: {
    html: `<!-- FP-18 Capstone Client Index -->\n<div id="fp-18-root">\n  <h2>Vehicle Rental & Fleet Management System Workspace</h2>\n  <p>Submission Panel</p>\n</div>`,
    css: `/* FP-18 layout constraints */\n#fp-18-root {\n  padding: 2rem;\n  background: #fafafa;\n  border-radius: 8px;\n}`,
    js: `// FP-18 Handshake initialization\nconst AppInitializer = {\n  name: "Vehicle Rental & Fleet Management System",\n  code: "FP-18",\n  status: "Draft",\n  init() {\n    console.log(this.name + " running...");\n  }\n};`
  },
  assessment: "Verify that your repository contains backend models, route controllers, and frontend React views matching the requirements."
};
