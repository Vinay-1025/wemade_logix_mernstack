export const fp10Data = {
  projectCode: "FP-10",
  title: "Smart Home Automation IoT Dashboard",
  explanation: "Build a simulator interface controlling connected light switches, locks, cameras, energy reports, and customizable rule routines.",
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
    summary: "Build a highly scalable MERN stack implementation of a Smart Home Automation IoT Dashboard showing production-ready practices.",
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
    html: `<!-- FP-10 Capstone Client Index -->\n<div id="fp-10-root">\n  <h2>Smart Home Automation IoT Dashboard Workspace</h2>\n  <p>Submission Panel</p>\n</div>`,
    css: `/* FP-10 layout constraints */\n#fp-10-root {\n  padding: 2rem;\n  background: #fafafa;\n  border-radius: 8px;\n}`,
    js: `// FP-10 Handshake initialization\nconst AppInitializer = {\n  name: "Smart Home Automation IoT Dashboard",\n  code: "FP-10",\n  status: "Draft",\n  init() {\n    console.log(this.name + " running...");\n  }\n};`
  },
  assessment: "Verify that your repository contains backend models, route controllers, and frontend React views matching the requirements."
};
