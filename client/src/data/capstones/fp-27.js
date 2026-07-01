export const fp27Data = {
  projectCode: "FP-27",
  title: "Issue Tracker & Bug Ticketing Platform",
  explanation: "Build a ticketing app tracking issue priorities, assignees, state history status (open/fixed/closed), and logs.",
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
    summary: "Build a highly scalable MERN stack implementation of a Issue Tracker & Bug Ticketing Platform showing production-ready practices.",
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
    html: `<!-- FP-27 Capstone Client Index -->\n<div id="fp-27-root">\n  <h2>Issue Tracker & Bug Ticketing Platform Workspace</h2>\n  <p>Submission Panel</p>\n</div>`,
    css: `/* FP-27 layout constraints */\n#fp-27-root {\n  padding: 2rem;\n  background: #fafafa;\n  border-radius: 8px;\n}`,
    js: `// FP-27 Handshake initialization\nconst AppInitializer = {\n  name: "Issue Tracker & Bug Ticketing Platform",\n  code: "FP-27",\n  status: "Draft",\n  init() {\n    console.log(this.name + " running...");\n  }\n};`
  },
  assessment: "Verify that your repository contains backend models, route controllers, and frontend React views matching the requirements."
};
