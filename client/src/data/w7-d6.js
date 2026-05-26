export const w7d6Data = {
  dayId: "w7-d6",
  dayTitle: "Day 6: MERN Integration & CORS Handshakes",
  topics: [
    {
      id: "w7-d6-t1",
      title: "1. Client-Server Fetch Handshakes & CORS Policy",
      customComponent: "MernIntegrationViz",
      explanation: "Integrating frontend client applications (e.g. running React on port 3000) with backend servers (running Express on port 5000) requires configuring Cross-Origin Resource Sharing (CORS) rules. Otherwise, browsers block API requests by default.",
      progression: [
        {
          level: "easy",
          title: "Browser Origin Policy",
          content: "The Same-Origin Policy restricts scripts on one origin (e.g. localhost:3000) from reading data from another origin (e.g. localhost:5000) unless permitted by the target server."
        },
        {
          level: "intermediate",
          title: "CORS HTTP Headers",
          content: "Backend servers enable cross-origin access by returning the `Access-Control-Allow-Origin` header in API responses, specifying permitted frontend origins."
        },
        {
          level: "advanced",
          title: "Preflight OPTIONS Handshake",
          content: "For complex requests (like POST requests containing JSON bodies), the browser sends an initial HTTP `OPTIONS` preflight request to verify CORS policies before executing the actual request."
        }
      ],
      detailedReference: {
        summary: "Configure CORS middleware in Express servers to allow React client components to query APIs cross-origin.",
        keyConcepts: [
          { term: "CORS", definition: "A browser security mechanism that allows or restricts resource requests from external origins." }
        ],
        bestPractices: [
          "Use the `cors` package middleware to configure cross-origin rules in Express.",
          "Avoid using the `*` wildcard in production; explicitly declare your production client URL."
        ]
      },
      codeTemplate: {
        html: `{}`,
        css: ``,
        js: `const express = require('express');
const cors = require('cors');
const app = express();

// Configure CORS to allow access from local React client
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.get('/api/status', (req, res) => {
  res.status(200).json({ status: 'Integrated' });
});

app.listen(5000);`
      },
      assessment: "Write an Express statement that mounts the CORS middleware to allow requests only from http://localhost:3000."
    },
    {
      id: "w7-d6-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "CORS headers lifecycle slides, preflight options diagrams, MERN deployment models, and integration troubleshooting checklists.",
        duration: "15 mins",
        resources: [
          "MERN Stack Integration presentation (PDF)",
          "Integration Lab Worksheets (PDF)"
        ]
      }
    }
  ]
};
