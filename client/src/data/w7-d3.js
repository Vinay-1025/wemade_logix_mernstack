export const w7d3Data = {
  dayId: "w7-d3",
  dayTitle: "Day 3: Protected Routes & Authorization middleware",
  topics: [
    {
      id: "w7-d3-t1",
      title: "1. Implementing Authentication Guards in Express",
      customComponent: "ProtectedRoutesViz",
      explanation: "A protected route is an endpoint restricted to authenticated users. Express restricts access by inserting an AuthGuard middleware function that inspects headers, validates tokens, and blocks unauthenticated requests.",
      progression: [
        {
          level: "easy",
          title: "Bearer Token Authorization",
          content: "Clients send JWTs in the HTTP `Authorization` request header using the Bearer scheme: `Authorization: Bearer <token_string>`."
        },
        {
          level: "intermediate",
          title: "AuthGuard Verification Flow",
          content: "Write an AuthGuard middleware function to read the Authorization header, extract the token string, verify the signature using `jwt.verify()`, and attach the decoded user ID to the request object (`req.user`)."
        },
        {
          level: "advanced",
          title: "Role-Based Route Access",
          content: "Implement authorization middleware (e.g. `authorize('admin')`) to inspect user roles stored in the token and block users who lack required access rights."
        }
      ],
      detailedReference: {
        summary: "Protect API routes using auth middleware to inspect headers, verify token signatures, and inject user details into requests.",
        keyConcepts: [
          { term: "AuthGuard Middleware", definition: "A middleware function that intercepts requests to check for valid authentication tokens before allowing access to routes." }
        ],
        bestPractices: [
          "Validate that the Authorization header starts with 'Bearer ' before attempting to extract the token.",
          "Use a centralized error handler to return consistent `401 Unauthorized` responses when token verification fails."
        ]
      },
      codeTemplate: {
        html: `{}`,
        css: ``,
        js: `const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const JWT_SECRET = 'wemadeSec';

// 1. AuthGuard Authorization Middleware
const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded.userId; // Inject user details into request
      next(); // Pass control to the route handler
    } catch (err) {
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ error: 'Not authorized, no token provided' });
  }
};

// 2. Map route to auth middleware
app.get('/api/dashboard', protect, (req, res) => {
  res.status(200).json({ message: 'Dashboard access granted!', user: req.user });
});

app.listen(5000);`
      },
      assessment: "Write an Express middleware protect function that verifies a token and returns a 401 response if verification fails."
    },
    {
      id: "w7-d3-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Route authorization slides, authentication header parsing models, custom auth middleware templates, and exercises for protecting endpoints.",
        duration: "15 mins",
        resources: [
          "Protected Routes presentation (PDF)",
          "Middleware Authorization Lab (ZIP)"
        ]
      }
    }
  ]
};
