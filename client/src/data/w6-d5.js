export const w6d5Data = {
  dayId: "w6-d5",
  dayTitle: "Day 5: Express Middlewares (Custom & Built-in)",
  topics: [
    {
      id: "w6-d5-t1",
      title: "1. What is Middleware & The next() Callback",
      customComponent: "MiddlewarePipelineViz",
      explanation: "Middleware functions are functions that have access to the request object (req), response object (res), and the next middleware function in the application's request-response cycle. They can execute code, modify request and response objects, and end the cycle or pass control using the `next()` callback.",
      progression: [
        {
          level: "easy",
          title: "The Middleware pipeline",
          content: "Express executes middleware functions sequentially in the order they are defined. Each middleware can inspect or modify the request before passing it along."
        },
        {
          level: "intermediate",
          title: "The next() Function",
          content: "To pass control to the next middleware or route handler, call `next()`. If you omit `next()` and do not send a response, the request will hang indefinitely."
        },
        {
          level: "advanced",
          title: "Custom Logger Middleware",
          content: "Write custom middleware to log request details (e.g. method, URL, timestamp) or inspect incoming request headers before routes run."
        }
      ],
      detailedReference: {
        summary: "Use Express middleware to intercept requests, calling next() to pass control down the execution stack.",
        keyConcepts: [
          { term: "Middleware", definition: "A function that runs between receiving a request and sending a response in an Express application." }
        ],
        bestPractices: [
          "Always call `next()` or end the request-response cycle inside your middleware functions.",
          "Place global middleware (like logging or parsing) at the top of your server file, before route definitions."
        ]
      },
      codeTemplate: {
        html: `{}`,
        css: ``,
        js: `const express = require('express');
const app = express();

// Custom logger middleware
const logger = (req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next(); // Pass control to the next handler
};

app.use(logger); // Mount middleware globally

app.get('/api/users', (req, res) => {
  res.status(200).json({ status: 'Success' });
});

app.listen(5000);`
      },
      assessment: "Write a custom Express middleware that logs the string 'Request Received' for every incoming request."
    },
    {
      id: "w6-d5-t2",
      title: "2. Built-in & Third-Party Middlewares",
      customComponent: "MiddlewarePipelineViz",
      explanation: "Express provides built-in middlewares like `express.json()` and `express.static()`. You can also integrate third-party middlewares like `cors` or `morgan` to add common features to your application.",
      progression: [
        {
          level: "easy",
          title: "Body Parsers",
          content: "Use `express.json()` to parse JSON payloads in requests, and `express.urlencoded({ extended: true })` to parse URL-encoded form submissions."
        },
        {
          level: "intermediate",
          title: "Static Files Server",
          content: "Use the `express.static('public')` middleware to serve static assets (like images, CSS, or client-side HTML) directly from a specified folder."
        },
        {
          level: "advanced",
          title: "Third-party Integration (CORS, Morgan)",
          content: "Install and mount third-party middleware: `cors` allows cross-origin requests, while `morgan` provides colored request logging in your terminal."
        }
      ],
      detailedReference: {
        summary: "Mount built-in and third-party middlewares in Express to handle JSON parsing, static files, and CORS settings.",
        keyConcepts: [
          { term: "CORS Middleware", definition: "Middleware that configures HTTP headers to allow cross-origin requests from frontend clients." }
        ],
        bestPractices: [
          "Only serve static folders that contain public assets; never expose your server-side code folder.",
          "Restrict CORS configurations in production to allow requests only from your official frontend domain."
        ]
      },
      codeTemplate: {
        html: `{}`,
        css: ``,
        js: `const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON payloads
app.use(express.static('public')); // Serve static assets

app.get('/api/data', (req, res) => {
  res.status(200).json({ parsedBody: req.body });
});

app.listen(5000);`
      },
      assessment: "Write the Express statements to enable CORS and JSON body parsing globally on your server."
    },
    {
      id: "w6-d5-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Middleware execution pipeline slides, express.json buffer flowcharts, cors configuration settings guides, and middleware exercises.",
        duration: "15 mins",
        resources: [
          "Express Middlewares Presentation (PDF)",
          "Custom Logger Exercises (ZIP)"
        ]
      }
    }
  ]
};
