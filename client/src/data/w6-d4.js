export const w6d4Data = {
  dayId: "w6-d4",
  dayTitle: "Day 4: API CRUD Operations (GET, POST, PUT, DELETE)",
  topics: [
    {
      id: "w6-d4-t1",
      title: "1. The GET & POST Methods",
      customComponent: "BackendCrudOperationsViz",
      explanation: "CRUD represents the four fundamental database operations: Create (POST), Read (GET), Update (PUT), and Delete (DELETE). In Express, route mappings handle these actions using corresponding HTTP methods.",
      progression: [
        {
          level: "easy",
          title: "Implementing GET routes",
          content: "Use `app.get()` to query and return data list resources. Return a standard success status code of `200 OK` along with the JSON payload."
        },
        {
          level: "intermediate",
          title: "Implementing POST routes",
          content: "Use `app.post()` to create new database documents. Read client inputs from `req.body` and return a status code of `201 Created` on success."
        },
        {
          level: "advanced",
          title: "Body Parsing requirement",
          content: "To access POST variables inside `req.body`, you must include parser middleware (e.g. `app.use(express.json())`) before your route declarations. Otherwise, req.body will be undefined."
        }
      ],
      detailedReference: {
        summary: "Build Express GET and POST routes, using body parser middleware to parse incoming request payloads.",
        keyConcepts: [
          { term: "HTTP Method", definition: "Request verbs (like GET, POST) indicating the action the client wants to perform on a resource." }
        ],
        bestPractices: [
          "Use the POST method to create resources, and never send sensitive data in GET URLs.",
          "Validate incoming POST payloads to ensure required fields are present before database insertions."
        ]
      },
      codeTemplate: {
        html: `{\n  "title": "Vite React Pro",\n  "price": 79\n}`,
        css: `PORT=5000`,
        js: `const express = require('express');
const app = express();

// Enable JSON body parser middleware
app.use(express.json());

const products = [
  { id: 101, title: 'Node Course Bundle', price: 99 }
];

// Read operation: GET all products
app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

// Create operation: POST new product
app.post('/api/products', (req, res) => {
  const { title, price } = req.body;
  if (!title || !price) {
    return res.status(400).json({ error: 'Title and price are required' });
  }

  const newProduct = { id: Date.now(), title, price };
  products.push(newProduct);
  
  res.status(201).json(newProduct);
});

app.listen(5000);`
      },
      assessment: "Write an Express POST route handler that parses a name and inserts it into a local array."
    },
    {
      id: "w6-d4-t2",
      title: "2. The PUT & DELETE Methods",
      customComponent: "BackendCrudOperationsViz",
      explanation: "Use the `PUT` method to update existing resources in full or in part, and the `DELETE` method to remove resources from your database.",
      progression: [
        {
          level: "easy",
          title: "Implementing PUT updates",
          content: "Use `app.put('/api/products/:id')` to locate a specific resource by ID, read update values from `req.body`, and modify the record."
        },
        {
          level: "intermediate",
          title: "Implementing DELETE operations",
          content: "Use `app.delete('/api/products/:id')` to locate and remove records from the database. Return a standard success confirmation on success."
        },
        {
          level: "advanced",
          title: "Handling Missing Resources",
          content: "If a target resource is missing during a PUT or DELETE request, return a `404 Not Found` status code and a descriptive error message."
        }
      ],
      detailedReference: {
        summary: "Create PUT and DELETE endpoints in Express to update and delete database documents.",
        keyConcepts: [
          { term: "404 Not Found", definition: "The HTTP status code indicating that the server cannot find the requested resource." }
        ],
        bestPractices: [
          "Always verify that a resource exists before attempting to update or delete it.",
          "Use a unique identifier (like an ObjectID or user ID) in the route path to locate the target document."
        ]
      },
      codeTemplate: {
        html: `{\n  "price": 109\n}`,
        css: ``,
        js: `const express = require('express');
const app = express();
app.use(express.json());

let products = [
  { id: 101, title: 'Node Course Bundle', price: 99 }
];

// Update: PUT modify product
app.put('/api/products/:id', (req, res) => {
  const pId = parseInt(req.params.id, 10);
  const { price } = req.body;
  
  const product = products.find(p => p.id === pId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  product.price = price;
  res.status(200).json({ message: 'Product updated successfully', product });
});

// Delete: DELETE remove product
app.delete('/api/products/:id', (req, res) => {
  const pId = parseInt(req.params.id, 10);
  const exists = products.some(p => p.id === pId);
  
  if (!exists) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products = products.filter(p => p.id !== pId);
  res.status(200).json({ message: 'Product deleted' });
});

app.listen(5000);`
      },
      assessment: "Write an Express DELETE route that filters out a matching element from an array by ID."
    },
    {
      id: "w6-d4-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "CRUD pipeline flowcharts, HTTP response codes cheat sheets, mock DB collections exercises, and route handler solutions.",
        duration: "15 mins",
        resources: [
          "Express CRUD APIs Slides (PDF)",
          "API Tester Worksheets (PDF)"
        ]
      }
    }
  ]
};
