export const w6d6Data = {
  dayId: "w6-d6",
  dayTitle: "Day 6: Model-View-Controller (MVC) Architectural Pattern",
  topics: [
    {
      id: "w6-d6-t1",
      title: "1. The MVC Design Pattern: Separation of Concerns",
      customComponent: "MvcArchitectureViz",
      explanation: "Model-View-Controller (MVC) is an architectural pattern that separates an application into three main logical components: the Model (database schemas), the View (client UI/JSON payloads), and the Controller (business logic). This separation makes codebases modular, testable, and easier to scale.",
      progression: [
        {
          level: "easy",
          title: "Separation of Concerns",
          content: "Instead of writing all server logic in a single index.js file, split your code: models define data structure, controllers contain business logic, and routes map URLs to actions."
        },
        {
          level: "intermediate",
          title: "Controller Handlers",
          content: "Controllers are exported functions that receive request payloads, query database models, and return JSON responses to clients."
        },
        {
          level: "advanced",
          title: "Decoupled Scalability",
          content: "By decoupling route definitions from business logic, you can easily change database engines (e.g. switching from MongoDB to PostgreSQL) or update API endpoints without breaking your core application logic."
        }
      ],
      detailedReference: {
        summary: "Organize Node/Express applications using the MVC pattern to separate database schemas, routes, and business logic.",
        keyConcepts: [
          { term: "MVC Pattern", definition: "A software design pattern that separates application data, user interface, and control logic." }
        ],
        bestPractices: [
          "Keep routes files lightweight; they should only map endpoint paths to controller actions.",
          "Write all database queries and validation checks inside controllers or service helper files."
        ]
      },
      codeTemplate: {
        html: `{}`,
        css: ``,
        js: `// Example structure: Decoupled Controllers
// File: controllers/userController.js
const User = {
  find: () => [{ id: 1, name: 'Alex' }] // Mock Model query
};

const getUsers = async (req, res) => {
  try {
    const data = User.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// File: routes/userRoutes.js
// const express = require('express');
// const router = express.Router();
// router.get('/', getUsers);
// module.exports = router;`
      },
      assessment: "Explain the main responsibility of a Controller in the MVC architectural pattern."
    },
    {
      id: "w6-d6-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "MVC folder tree slides, data flow diagrams, route controllers binding worksheets, and exercises for refactoring monolithic servers.",
        duration: "15 mins",
        resources: [
          "MVC Architecture presentation (PDF)",
          "Refactoring Monolith Lab (ZIP)"
        ]
      }
    }
  ]
};
