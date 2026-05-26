export const w6d3Data = {
  dayId: "w6-d3",
  dayTitle: "Day 3: Express.js Routing, Route Params & Query Params",
  topics: [
    {
      id: "w6-d3-t1",
      title: "1. Routing Patterns & Controllers",
      customComponent: "ExpressRoutingViz",
      explanation: "Routing determines how an application responds to client requests for specific endpoints (URLs) and HTTP methods. Controllers handle the business logic executed when a route is matched.",
      progression: [
        {
          level: "easy",
          title: "Declaring Endpoints",
          content: "Define endpoints in Express using route methods like `app.get()`, `app.post()`, or `app.put()`, matching requests to handler functions."
        },
        {
          level: "intermediate",
          title: "Handler Callback arguments",
          content: "Route handlers receive `req` (Request object containing client data) and `res` (Response object used to return headers and body payloads) arguments."
        },
        {
          level: "advanced",
          title: "Express Router separation",
          content: "Use the `express.Router` class to create modular, mountable route handlers, separating routing structures from server files."
        }
      ],
      detailedReference: {
        summary: "Configure Express routing pathways to match HTTP methods and delegate request handling to controller methods.",
        keyConcepts: [
          { term: "Routing", definition: "Matching incoming client request paths and HTTP methods to specific backend controller functions." }
        ],
        bestPractices: [
          "Organize routes by resource (e.g. keep all product routes in a separate `routes/productRoutes.js` file).",
          "Always return a response status code (e.g. 200 OK, 201 Created) along with your data payload."
        ]
      },
      codeTemplate: {
        html: `{}`,
        css: ``,
        js: `const express = require('express');
const app = express();

// Route mapping for root URL
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the MERN API!' });
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});`
      },
      assessment: "Write an Express GET route definition for the endpoint '/api/info' that returns a JSON message."
    },
    {
      id: "w6-d3-t2",
      title: "2. Route Params vs. Query Params",
      customComponent: "ExpressRoutingViz",
      explanation: "Express extracts parameters from request URLs dynamically. Route Parameters (`req.params`) match named segments in the path, while Query Parameters (`req.query`) capture key-value pairs appended after the `?` delimiter.",
      progression: [
        {
          level: "easy",
          title: "Route Params (req.params)",
          content: "Route parameters define dynamic path segments. Declare them with a colon prefix (e.g. `/api/users/:id`). Access values in controllers using `req.params.id`."
        },
        {
          level: "intermediate",
          title: "Query Params (req.query)",
          content: "Query parameters pass optional parameters in request URLs (e.g. `/api/users?role=admin`). Access these key-value pairs in controllers using `req.query.role`."
        },
        {
          level: "advanced",
          title: "Choosing Parameters",
          content: "Use route parameters to define resource identity (e.g., retrieving a specific user). Use query parameters to handle sorting, filtering, searching, or pagination constraints."
        }
      ],
      detailedReference: {
        summary: "Identify when to use route parameters for resource identity vs query parameters for optional filter queries.",
        keyConcepts: [
          { term: "Route Parameter", definition: "A dynamic path segment used to match specific resources (e.g. an ID) in the request URL." }
        ],
        bestPractices: [
          "Use route parameters (`:id`) when searching for specific database documents.",
          "Use query parameters for optional search filters, sorting options, or pagination limits."
        ]
      },
      codeTemplate: {
        html: `{}`,
        css: ``,
        js: `const express = require('express');
const app = express();

// Endpoint matching both route and query parameters
// Request: GET /api/users/101?limit=5
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const limitVal = req.query.limit;

  res.status(200).json({
    userId,
    limit: limitVal || 'none'
  });
});

app.listen(5000);`
      },
      assessment: "Write an Express route that parses a category parameter and matches a limit query variable."
    },
    {
      id: "w6-d3-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Express setup slides, route params vs query params diagrams, router configuration worksheets, and parameter parsing exercises.",
        duration: "15 mins",
        resources: [
          "Express Routing Presentation (PDF)",
          "Parameter Parsing Exercises (ZIP)"
        ]
      }
    }
  ]
};
