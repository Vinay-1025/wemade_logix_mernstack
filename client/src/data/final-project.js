export const finalProjectData = {
  dayId: "final-project-day",
  dayTitle: "Final Project: Capstone Milestone",
  topics: [
    {
      id: "final-project-topic",
      title: "MERN Stack Final Capstone Project",
      customComponent: "FinalProjectSubmissionView",
      explanation: "Welcome to your MERN Stack Final Capstone Project! This is the ultimate milestone of your training program. You will build and deploy a comprehensive, real-world full-stack web application demonstrating your proficiency in React, Node.js, Express, and MongoDB.",
      progression: [
        {
          level: "Phase 1: Architecture & Design",
          title: "Schema Design & API Planning",
          content: "Plan your database schemas, define RESTful API endpoints, and sketch your frontend user interfaces. Document your project requirements and set up your Git repository."
        },
        {
          level: "Phase 2: Full-Stack Implementation",
          title: "CRUD Operations & Security",
          content: "Build your backend server, configure MongoDB connections, write Express routes, hash passwords using bcrypt, secure access with JWT, and build responsive frontend React components."
        },
        {
          level: "Phase 3: Deployments & Final Audit",
          title: "Hosting & Production Optimization",
          content: "Deploy your client to Firebase Hosting or Vercel, host your Express server on Render or Heroku, configure production environment variables, and submit your project for review."
        }
      ],
      detailedReference: {
        summary: "The final project is a mandatory milestone reviewed by instructors. Once approved (status is 'accepted'), you will automatically unlock your official WeMade Logix MERN Stack Certificate.",
        keyConcepts: [
          { term: "Full-Stack integration", definition: "Connecting a React client-side SPA with an authenticated Express/MongoDB server." },
          { term: "Deployment models", definition: "Configuring environment variables (like MONGODB_URI, JWT_SECRET) and hosting client and server on remote servers." }
        ],
        bestPractices: [
          "Keep your environment secrets private; never commit your `.env` file to Github.",
          "Write clean, modular code with descriptive variable names and proper error handling.",
          "Ensure your user interface is fully responsive and looks professional on mobile devices."
        ]
      },
      codeTemplate: {
        html: `<!-- Final Project Submission Structure -->
<div id="final-project-root">
  <h2>Capstone Project Submission</h2>
  <p>Submit your GitHub repository link and deployed live hosting link below.</p>
</div>`,
        css: `/* Capstone project custom styles */
#final-project-root {
  padding: 24px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}`,
        js: `// Complete MERN Capstone Project Submission Details
const CapstoneProject = {
  title: "My Final MERN Stack Application",
  githubUrl: "https://github.com/your-username/my-capstone-project",
  liveUrl: "https://my-capstone-project.web.app",
  features: [
    "JWT Authentication & Session Security",
    "MongoDB CRUD Operations & Models",
    "TailwindCSS Custom Dashboard layouts",
    "External API integrations"
  ],
  submittedAt: new Date()
};`
      },
      assessment: "Provide your GitHub repository URL and live application hosting URL inside your code submission fields."
    }
  ]
};
