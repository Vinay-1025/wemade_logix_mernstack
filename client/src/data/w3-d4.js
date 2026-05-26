export const w3d4Data = { // Wait, make sure we export w3d4Data! Yes, I must name it w3d4Data.
  dayId: "w3-d4",
  dayTitle: "Day 4: Asynchronous JS & Promises",
  topics: [
    {
      id: "w3-d4-t1",
      title: "1. Blocking vs Asynchronous Code",
      customComponent: "PromiseFlowViz",
      explanation: "JavaScript is single-threaded, meaning it executes one command at a time. To prevent long tasks (like network calls) from freezing the UI, JS delegates async tasks to background web APIs.",
      progression: [
        {
          level: "easy",
          title: "The Call Stack",
          content: "Synchronous functions are loaded onto the Call Stack. Each function executes line-by-line. If a function takes too long, it blocks subsequent code from running."
        },
        {
          level: "intermediate",
          title: "Web APIs & Timers",
          content: "Asynchronous tasks (e.g. `setTimeout`) are offloaded to browser Web APIs, running in the background while the main stack continues executing."
        },
        {
          level: "advanced",
          title: "The Event Loop & Task Queue",
          content: "When background Web API tasks finish, their callback functions are placed in the Callback Queue. The Event Loop continually monitors the Call Stack; once the stack is empty, it pushes waiting callbacks onto the stack for execution."
        }
      ],
      detailedReference: {
        summary: "The single-threaded JS runtime uses the Event Loop to handle non-blocking asynchronous events.",
        keyConcepts: [
          { term: "Event Loop", definition: "A monitor mechanism pushing task callbacks onto call stacks once the main thread is idle." }
        ],
        bestPractices: [
          "Never execute CPU-intensive tasks directly in UI loops; offload calculations where possible.",
          "Use zero-delay timers (`setTimeout(fn, 0)`) to defer non-critical rendering steps."
        ]
      },
      codeTemplate: {
        html: `<div id="sync-out">Running...</div>`,
        css: "",
        js: `console.log('1. Start');
setTimeout(() => {
  console.log('3. Deferred Callback');
}, 1000);
console.log('2. End');

document.getElementById('sync-out').innerText = 'Check browser log order!';`
      },
      assessment: "Explain why setTimeout(fn, 0) does not execute the function immediately."
    },
    {
      id: "w3-d4-t2",
      title: "2. Creating and Resolving Promises",
      customComponent: "PromiseFlowViz",
      explanation: "A Promise is an object representing the eventual completion (or failure) of an asynchronous operation, serving as a placeholder for a future value.",
      progression: [
        {
          level: "easy",
          title: "Promise States",
          content: "Promises start in a `pending` state and eventually transition to either `fulfilled` (success) or `rejected` (failure). Once settled, their state is locked."
        },
        {
          level: "intermediate",
          title: "new Promise Constructor",
          content: "Instantiate a promise using `new Promise((resolve, reject) => { ... })`. Invoke `resolve(val)` on success, or `reject(err)` on failure."
        },
        {
          level: "advanced",
          title: "Promise Chaining",
          content: "Consume promise outcomes using `.then(val => { ... })` for successful resolutions and `.catch(err => { ... })` to capture thrown errors."
        }
      ],
      detailedReference: {
        summary: "Promises represent values that are not yet available, supporting clean asynchronous flow control.",
        keyConcepts: [
          { term: "Settled Promise", definition: "A promise that has transitioned to either the resolved or rejected state." }
        ],
        bestPractices: [
          "Always handle rejections using `.catch()` to prevent uncaught runtime promise errors.",
          "Return values in `.then()` blocks to maintain chain references."
        ]
      },
      codeTemplate: {
        html: `<div id="promise-out">Processing...</div>`,
        css: "",
        js: `const fetchJob = new Promise((resolve, reject) => {
  const success = true;
  setTimeout(() => {
    if (success) resolve('Data loaded!');
    else reject(new Error('Fetch failed'));
  }, 1000);
});

fetchJob
  .then(val => document.getElementById('promise-out').innerText = val)
  .catch(err => document.getElementById('promise-out').innerText = err.message);`
      },
      assessment: "Describe the three possible states of a Promise."
    },
    {
      id: "w3-d4-t3",
      title: "3. Asynchronous Async / Await Syntax",
      customComponent: "PromiseFlowViz",
      explanation: "Async/Await provides a clean wrapper syntax that lets you write promise-based asynchronous code that reads like synchronous code.",
      progression: [
        {
          level: "easy",
          title: "The async Keyword",
          content: "Prepend the `async` keyword to any function definition. An `async` function automatically wraps its return value in a resolved Promise."
        },
        {
          level: "intermediate",
          title: "The await Keyword",
          content: "Use the `await` keyword inside `async` functions to pause code execution until a promise resolves, returning the resolved value directly."
        },
        {
          level: "advanced",
          title: "Sequential vs Parallel await",
          content: "Awaiting multiple promises sequentially can cause slow load times. Optimize by running promises in parallel using `Promise.all([p1, p2])`."
        }
      ],
      detailedReference: {
        summary: "Async/await provides clean syntax to handle asynchronous operations without nested .then() chains.",
        keyConcepts: [
          { term: "async function", definition: "A function that always returns a promise and allows using the await keyword inside its body." }
        ],
        bestPractices: [
          "Always place `await` statements inside `async` functions to prevent syntax errors.",
          "Use `Promise.all` when fetching multiple independent resources to execute requests in parallel."
        ]
      },
      codeTemplate: {
        html: `<div id="async-out">Waiting...</div>`,
        css: "",
        js: `const getReport = () => new Promise(res => setTimeout(() => res('Financial Report'), 1000));

async function renderData() {
  const report = await getReport(); // Pauses here until resolved!
  document.getElementById('async-out').innerText = \`Loaded: \${report}\`;
}

renderData();`
      },
      assessment: "Explain how async/await syntax improves code readability compared to standard Promise chaining."
    },
    {
      id: "w3-d4-t4",
      title: "4. Async Error Handling (try / catch)",
      customComponent: "PromiseFlowViz",
      explanation: "Because async/await pauses execution, standard `.catch()` handlers are replaced with native `try...catch` blocks to capture exceptions gracefully.",
      progression: [
        {
          level: "easy",
          title: "Try / Catch Syntax",
          content: "Wrap your `await` operations inside a `try` block. If any awaited promise rejects, execution jumps straight to the `catch` block."
        },
        {
          level: "intermediate",
          title: "Handling network fails",
          content: "Capture server downs or invalid inputs inside `catch (err)` to update user displays with human-readable error messages."
        },
        {
          level: "advanced",
          title: "Finally Cleanups",
          content: "Use the `finally` block to run cleanup code (such as turning off loading spinners) regardless of whether the operation succeeded or failed."
        }
      ],
      detailedReference: {
        summary: "Try/catch/finally blocks handle runtime exceptions inside async functions.",
        keyConcepts: [
          { term: "Finally block", definition: "A block that executes after the try and catch blocks finish, regardless of the outcome." }
        ],
        bestPractices: [
          "Always handle potential errors when making network calls to prevent unhandled promise rejections.",
          "Use the `finally` block to toggle loading spinner states off."
        ]
      },
      codeTemplate: {
        html: `<div id="status-box">Fetching...</div>`,
        css: "",
        js: `const unreliableTask = () => new Promise((_, rej) => setTimeout(() => rej(new Error('Server offline')), 1000));

async function execute() {
  const box = document.getElementById('status-box');
  try {
    await unreliableTask();
  } catch (err) {
    box.innerText = \`Failed: \${err.message}\`;
  } finally {
    console.log('Cleanup completed.');
  }
}

execute();`
      },
      assessment: "Demonstrate a try/catch block handling a rejected promise."
    },
    {
      id: "w3-d4-t5",
      title: "5. Sequential vs Parallel execution",
      customComponent: "PromiseFlowViz",
      explanation: "Executing multiple promises sequentially takes the sum of their delay times. Executing them in parallel using `Promise.all` processes tasks concurrently.",
      progression: [
        {
          level: "easy",
          title: "Sequential Awaits",
          content: "Awaiting tasks one by one causes subsequent requests to wait, creating a performance bottleneck."
        },
        {
          level: "intermediate",
          title: "Promise.all API",
          content: "Pass an array of promises to `Promise.all()`. It runs them in parallel and returns a single promise resolving to an array of results."
        },
        {
          level: "advanced",
          title: "Promise.all Rejection",
          content: "If *any* promise inside `Promise.all` rejects, the entire aggregate rejects immediately, ignoring all other resolved values."
        }
      ],
      detailedReference: {
        summary: "Promise concurrency methods control timing behaviors when managing multiple asynchronous jobs.",
        keyConcepts: [
          { term: "Parallel Processing", definition: "Triggering multiple async calls simultaneously rather than waiting for each to finish in sequence." }
        ],
        bestPractices: [
          "Use `Promise.all` when calling multiple independent API resources to maximize page speed.",
          "Use `Promise.allSettled` if you want to inspect outcomes even if some individual requests fail."
        ]
      },
      codeTemplate: {
        html: `<div id="parallel-out">Ready...</div>`,
        css: "",
        js: `const taskA = () => new Promise(res => setTimeout(() => res('A'), 800));
const taskB = () => new Promise(res => setTimeout(() => res('B'), 500));

async function run() {
  const start = Date.now();
  // Runs concurrently
  const results = await Promise.all([taskA(), taskB()]);
  const duration = Date.now() - start;
  document.getElementById('parallel-out').innerText = 
    \`Results: \${results.join(', ')} (took \${duration}ms)\`;
}

run();`
      },
      assessment: "Explain when you would choose sequential await statements over Promise.all."
    },
    {
      id: "w3-d4-t6",
      title: "6. Assignment Task - Delayed Task Scheduler",
      customComponent: "PromiseFlowViz",
      explanation: "Build an interactive Task Scheduler. Create a Promise-based waiting helper, execute scheduler operations using async/await, handle errors with try/catch checks, and update the status UI.",
      progression: [
        {
          level: "easy",
          title: "Delay Helper Promise",
          content: "Declare a helper function `wait(seconds)` that returns a `new Promise` that resolves after the specified delay."
        },
        {
          level: "intermediate",
          title: "Async Scheduler Handler",
          content: "Bind click handlers to buttons. Declare an `async` handler that reads delay inputs and executes the `wait` helper using `await`."
        },
        {
          level: "advanced",
          title: "Error Capture & UI Update",
          content: "Wrap awaits inside `try...catch` blocks to catch invalid or negative inputs, displaying scheduling stages and completion messages in the status panel."
        }
      ],
      codeTemplate: {
        html: `<div class="scheduler">
  <h3>Wemade Task Scheduler</h3>
  <input type="text" id="task-name" placeholder="Enter task name">
  <input type="number" id="task-delay" placeholder="Delay (seconds)">
  <button id="schedule-btn">Schedule Task</button>
  <div id="scheduler-status" class="output-panel">No active task</div>
</div>`,
        css: `.scheduler {
  background: var(--app-card-bg, #1e293b);
  border: 1px solid var(--app-border, #334155);
  padding: 24px;
  border-radius: 12px;
  max-width: 400px;
  color: var(--app-text, #ffffff);
}
.output-panel {
  margin-top: 15px;
  background: rgba(0,0,0,0.15);
  padding: 12px;
  border-radius: 6px;
}
input, button {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid var(--app-border, #334155);
  background: var(--app-bg, #0f172a);
  color: var(--app-text, #ffffff);
}
button {
  background: var(--primary-cyan, #00d1d1);
  color: #0f172a;
  font-weight: 600;
  cursor: pointer;
}`,
        js: `// Create a Promise-based delay helper
function wait(seconds) {
  return new Promise((resolve, reject) => {
    if (seconds < 0) {
      reject(new Error('Delay cannot be negative'));
    }
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

document.getElementById('schedule-btn').onclick = async () => {
  const taskName = document.getElementById('task-name').value;
  const delayVal = parseFloat(document.getElementById('task-delay').value);
  const status = document.getElementById('scheduler-status');
  
  if (!taskName || isNaN(delayVal)) {
    alert('Please fill in task details!');
    return;
  }
  
  status.innerText = \`Scheduling "\${taskName}" for \${delayVal}s delay...\`;
  
  try {
    // Consume Promise using await
    await wait(delayVal);
    status.innerText = \`Task Completed: "\${taskName}" resolved successfully!\`;
  } catch (err) {
    status.innerText = \`Task Failed: \${err.message}\`;
  }
};`
      },
      assessment: "Verify promise-based delays, await integrations, error bounds checks, and status reporting updates."
    },
    {
      id: "w3-d4-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Event loop trace flows, call stack diagrams, try/catch checklists, and task scheduler solutions.",
        duration: "15 mins",
        resources: [
          "Student Asynchronous JS Lab (PDF)",
          "Delayed Scheduler Solutions (ZIP)"
        ]
      }
    }
  ]
};

