export const w7d4Data = {
  dayId: "w7-d4",
  dayTitle: "Day 4: Global Express Error Handling Middleware",
  topics: [
    {
      id: "w7-d4-t1",
      title: "1. Global Exception Handlers: Preventing Info Leaks",
      customComponent: "BackendErrorHandlingViz",
      explanation: "By default, Express returns stack traces and internal paths as HTML pages when errors occur. In production, this behavior is a security risk. Centralized error handling middleware intercepts all exceptions globally, logs errors privately, and returns clean, structured JSON messages to clients.",
      progression: [
        {
          level: "easy",
          title: "Express Default Error Page",
          content: "If an error is thrown in a route handler, Express catches it and displays an HTML error page. This default page leaks internal server file structures, which can aid attackers."
        },
        {
          level: "intermediate",
          title: "Custom 4-Argument Middleware",
          content: "Declare global error handling middleware by defining a function with four arguments: `app.use((err, req, res, next) => { ... })`. Express routes all uncaught exceptions to this function automatically."
        },
        {
          level: "advanced",
          title: "Async Error Catching (next)",
          content: "Inside synchronous code, Express catches thrown errors automatically. For asynchronous operations (like DB queries), you must pass errors to `next(err)` explicitly to route them to your error handler."
        }
      ],
      detailedReference: {
        summary: "Build centralized error handling middleware in Express to catch database and server exceptions, preventing data leaks.",
        keyConcepts: [
          { term: "Error Handling Middleware", definition: "A special Express middleware function with 4 arguments used to intercept and handle all application errors." }
        ],
        bestPractices: [
          "Always declare your error handling middleware at the bottom of your middleware stack, after all route definitions.",
          "Hide detailed stack traces from client responses in production by checking `process.env.NODE_ENV`."
        ]
      },
      codeTemplate: {
        html: `{}`,
        css: `NODE_ENV=production`,
        js: `const express = require('express');
const app = express();

app.get('/api/users', (req, res, next) => {
  // Simulate asynchronous database query failure
  setTimeout(() => {
    try {
      throw new Error('Database connection lost');
    } catch (err) {
      next(err); // Pass error to global handler
    }
  }, 100);
});

// Centralized Error-Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

app.listen(5000);`
      },
      assessment: "Write an Express centralized error-handling middleware that returns a JSON message and matches custom status codes."
    },
    {
      id: "w7-d4-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Express exception hierarchy slides, asynchronous route handler patterns, centralized error middleware templates, and debug exercises.",
        duration: "15 mins",
        resources: [
          "Express Error Handling Presentation (PDF)",
          "Error Handler Lab Exercises (ZIP)"
        ]
      }
    }
  ]
};
