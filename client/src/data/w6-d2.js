export const w6d2Data = {
  dayId: "w6-d2",
  dayTitle: "Day 2: Node.js Architecture, CommonJS vs ESM & Core Modules",
  topics: [
    {
      id: "w6-d2-t1",
      title: "1. CommonJS vs. ES Modules System",
      customComponent: "NodeCoreModulesViz",
      explanation: "Node.js supports two module systems: CommonJS (the traditional system using `require` and `module.exports`) and ES Modules (ESM, the modern system using `import` and `export`).",
      progression: [
        {
          level: "easy",
          title: "CommonJS (require)",
          content: "CommonJS is Node's default module system. Load files using `const fs = require('fs')` and export components using `module.exports = myFunction`."
        },
        {
          level: "intermediate",
          title: "ES Modules (import)",
          content: "Activate ESM in Node.js by setting `\"type\": \"module\"` in `package.json`. Import modules using `import fs from 'fs'` and export using `export default myFunction`."
        },
        {
          level: "advanced",
          title: "Differences in Scoping",
          content: "CommonJS loads modules synchronously at runtime. ES Modules load modules asynchronously and support static analysis, enabling features like tree-shaking."
        }
      ],
      detailedReference: {
        summary: "Node.js supports both CommonJS (require/exports) and ES Modules (import/export) for modular code design.",
        keyConcepts: [
          { term: "CommonJS", definition: "The default module system in Node.js, where imports are loaded synchronously at runtime." }
        ],
        bestPractices: [
          "Use ES Modules (import/export) for modern Node.js applications.",
          "Do not mix require() and import statements in the same file; choose one module system."
        ]
      },
      codeTemplate: {
        html: `{}`,
        css: ``,
        js: `// CommonJS (require) module syntax
const path = require('path');

const filename = 'server.js';
const absolutePath = path.resolve(filename);

console.log('File Name:', filename);
console.log('Absolute Path:', absolutePath);`
      },
      assessment: "Write the code to export a function calculateTotal using CommonJS module exports."
    },
    {
      id: "w6-d2-t2",
      title: "2. The File System (FS) & Event Loop",
      customComponent: "NodeCoreModulesViz",
      explanation: "The File System (FS) module allows you to interact with files. Node.js uses an event loop to handle file operations asynchronously, preventing operations from blocking the single execution thread.",
      progression: [
        {
          level: "easy",
          title: "Synchronous (Blocking) Code",
          content: "Using methods like `fs.readFileSync()` runs operations synchronously, freezing the server thread until the file read is complete."
        },
        {
          level: "intermediate",
          title: "Asynchronous (Non-Blocking) Code",
          content: "Using asynchronous methods like `fs.readFile()` delegates file operations to libuv background threads, keeping the server free to handle other requests."
        },
        {
          level: "advanced",
          title: "The Libuv Event Loop",
          content: "When an asynchronous operation finishes, libuv adds the callback to the event loop queue, where Node's single thread executes it as soon as it becomes idle."
        }
      ],
      detailedReference: {
        summary: "Use asynchronous, non-blocking FS methods to keep the Node.js event loop free to handle incoming connections.",
        keyConcepts: [
          { term: "Event Loop", definition: "The core Node.js mechanism that schedules and executes asynchronous callbacks, enabling non-blocking I/O." }
        ],
        bestPractices: [
          "Avoid using sync methods like `readFileSync` in server routes, as they block all other client connections.",
          "Use `fs.promises` or async/await to keep your asynchronous file operations clean and readable."
        ]
      },
      codeTemplate: {
        html: `{}`,
        css: ``,
        js: `const fs = require('fs');

// Non-blocking asynchronous file read
fs.readFile('config.json', 'utf8', (err, data) => {
  if (err) {
    console.error('File read error:', err);
    return;
  }
  console.log('File content loaded successfully.');
});
console.log('Continuing execution...'); // Runs BEFORE file read is complete!`
      },
      assessment: "What is the danger of running fs.readFileSync() inside an Express route handler?"
    },
    {
      id: "w6-d2-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "CommonJS vs ESM comparison charts, event loop lifecycle slides, core modules api lists, and asynchronous code exercises.",
        duration: "15 mins",
        resources: [
          "Node.js Architecture Presentation (PDF)",
          "Core Modules Exercises (ZIP)"
        ]
      }
    }
  ]
};
