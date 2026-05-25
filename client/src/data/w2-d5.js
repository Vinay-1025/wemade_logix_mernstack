export const w2d5Data = {
  dayId: "w2-d5",
  dayTitle: "Day 5: Functions, Expressions & Callbacks",
  topics: [
    {
      id: "w2-d5-t1",
      title: "1. Function Declarations & Expressions",
      customComponent: "ScopeHoistingViz",
      explanation: "Functions are reusable blocks of logic. JavaScript supports Function Declarations (which are hoisted) and Function Expressions (which are stored inside variables and not hoisted).",
      progression: [
        {
          level: "easy",
          title: "Function Declarations",
          content: "Declare a function using the `function` keyword (e.g. `function greet(name) { return 'Hello ' + name; }`). These can be called *before* they are defined in the file because of hoisting."
        },
        {
          level: "intermediate",
          title: "Function Expressions",
          content: "Define a function and assign it to a variable (e.g. `const greet = function(name) { ... }`). These functions are not hoisted, preventing them from being executed before their definition line."
        },
        {
          level: "advanced",
          title: "Arguments & Parameters",
          content: "Define default parameter values in the declaration (e.g. `function greet(name = 'Guest')`). Use the rest parameter `...args` to collect an arbitrary list of arguments into an array."
        }
      ],
      detailedReference: {
        summary: "Declarations establish hoisted functional names. Expressions treat functions as first-class object assignments.",
        keyConcepts: [
          { term: "Hoisting Declarations", definition: "JavaScript engine parsing that relocates function declarations to the top of their scope before run execution." }
        ],
        bestPractices: [
          "Use function expressions (`const foo = ...`) to prevent accidental hoisting side effects.",
          "Set default parameter values to avoid undefined checks in function bodies."
        ]
      },
      codeTemplate: {
        html: `<div id="func-out"></div>`,
        css: "",
        js: `// Function Declaration (Hoisted)
const res1 = add(5, 10);

function add(a, b) {
  return a + b;
}

// Function Expression (Not Hoisted)
const multiply = function(a, b) {
  return a * b;
};

const res2 = multiply(5, 10);

document.getElementById('func-out').innerText = 
  \`Sum: \${res1}, Product: \${res2}\`;`
      },
      assessment: "What happens if you try to call a function expression before declaring it?"
    },
    {
      id: "w2-d5-t2",
      title: "2. Arrow Functions Syntax & Context",
      customComponent: "ScopeHoistingViz",
      explanation: "Arrow functions (`=>`) provide a shorter, cleaner syntax for writing functions. They also handle the execution context context (`this`) lexically.",
      progression: [
        {
          level: "easy",
          title: "Arrow Syntax",
          content: "Convert standard expressions by removing the function keyword and placing an arrow between parameters and braces (e.g., `const greet = (name) => { return 'Hello ' + name; }`)."
        },
        {
          level: "intermediate",
          title: "Implicit Returns",
          content: "If the arrow function contains only a single expression, omit the curly braces and the `return` keyword to return the value implicitly (e.g., `const add = (a, b) => a + b`)."
        },
        {
          level: "advanced",
          title: "Lexical 'this'",
          content: "Unlike standard functions, arrow functions do not bind their own `this` context. Instead, they capture the `this` value of their enclosing lexical scope, which is crucial when writing event triggers or timer callbacks."
        }
      ],
      detailedReference: {
        summary: "Arrow functions simplify syntax and capture execution contexts lexically, avoiding bind bindings.",
        keyConcepts: [
          { term: "Implicit Return", definition: "A single-line arrow function returning its computed output expression without braces or return keywords." }
        ],
        bestPractices: [
          "Use arrow functions for lightweight utility expressions and inline callback handlers.",
          "Do not use arrow functions as object methods where you need to reference the object's instance via `this`."
        ]
      },
      codeTemplate: {
        html: `<div id="arrow-out"></div>`,
        css: "",
        js: `const doubleVal = x => x * 2; // Implicit return
const greetUser = (name, role) => {
  return \`User: \${name}, Role: \${role}\`; // Explicit return
};

document.getElementById('arrow-out').innerText = 
  \`Double: \${doubleVal(10)}, \${greetUser('Az', 'Admin')}\`;`
      },
      assessment: "Convert the following function to an arrow function: function square(n) { return n * n; }."
    },
    {
      id: "w2-d5-t3",
      title: "3. Scope, Closures & Lexical Environments",
      customComponent: "ScopeHoistingViz",
      explanation: "Lexical Scope dictates variable access rules depending on where variables are declared. Closures occur when nested inner functions retain access to their outer scopes even after the outer functions finish running.",
      progression: [
        {
          level: "easy",
          title: "Lexical Scope Rules",
          content: "Functions have access to variables declared in their own block, their parent scopes, and the global environment."
        },
        {
          level: "intermediate",
          title: "What is a Closure?",
          content: "A closure gives an inner function access to its outer function's scope variables. It 'remembers' the environment in which it was created."
        },
        {
          level: "advanced",
          title: "State Encapsulation",
          content: "Use closures to create private variables that cannot be accessed directly from the global scope, protecting variable states from accidental modification."
        }
      ],
      detailedReference: {
        summary: "Closures preserve scope references across execution lifecycles, enabling private state variables.",
        keyConcepts: [
          { term: "Closure State", definition: "Preserving outer variable memory references inside nested scopes after parent frames exit." }
        ],
        bestPractices: [
          "Use closures to encapsulate state variables when writing custom counters, cache helpers, or modules.",
          "Be mindful of memory leaks; nullify unused references held by active closures."
        ]
      },
      codeTemplate: {
        html: `<button id="btn-count">Count: 0</button>`,
        css: "",
        js: `function createCounter() {
  let count = 0; // Private state variable
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();

document.getElementById('btn-count').onclick = () => {
  const currentCount = counter();
  document.getElementById('btn-count').innerText = \`Count: \${currentCount}\`;
};`
      },
      assessment: "Explain how closures can keep variables from being modified by global scope statements."
    },
    {
      id: "w2-d5-t4",
      title: "4. Callback Functions & Higher-Order Design",
      customComponent: "JSRuntimeViz",
      explanation: "JavaScript treats functions as first-class citizens. Higher-Order Functions are functions that accept callback functions as arguments or return functions as outputs.",
      progression: [
        {
          level: "easy",
          title: "What is a Callback?",
          content: "A callback function is a function passed to another function as an argument, intended to be executed (called back) later."
        },
        {
          level: "intermediate",
          title: "Executing Callbacks",
          content: "Verify that a parameter is a function using `typeof callback === 'function'` before invoking it, passing parameters as arguments."
        },
        {
          level: "advanced",
          title: "Asynchronous Callbacks",
          content: "Callbacks are essential for executing asynchronous tasks, such as reacting to user click events or running timer logic (`setTimeout` or `setInterval`)."
        }
      ],
      detailedReference: {
        summary: "Callbacks are functions injected into execution paths to deferred actions.",
        keyConcepts: [
          { term: "First-Class Citizen", definition: "A language design where functions are treated as variables: assigned, passed, and returned." }
        ],
        bestPractices: [
          "Pass anonymous arrow functions for clean inline callback definitions.",
          "Check validation parameters (`typeof fn === 'function'`) to prevent crash attempts."
        ]
      },
      codeTemplate: {
        html: `<div id="cb-out">Waiting...</div>`,
        css: "",
        js: `function delayGreeting(name, callback) {
  setTimeout(() => {
    const greeting = \`Hello, \${name}!\`;
    if (typeof callback === 'function') {
      callback(greeting);
    }
  }, 1000);
}

delayGreeting('Student', (msg) => {
  document.getElementById('cb-out').innerText = msg;
});`
      },
      assessment: "Define a function 'calculate' that takes numbers and a callback function to compute them."
    },
    {
      id: "w2-d5-t5",
      title: "5. Labeled & Callback-driven Architectures",
      customComponent: "JSRuntimeViz",
      explanation: "Higher-order functional designs decouple core processing logic from presentation or side-effect outcomes, letting you customize code actions dynamically.",
      progression: [
        {
          level: "easy",
          title: "Decoupled Architectures",
          content: "Write reusable logic that does calculations, and inject formatting outcomes using callback functions."
        },
        {
          level: "intermediate",
          title: "Chainable Transformations",
          content: "Pass multiple callbacks or run operations sequentially to pipeline transformations on raw datasets."
        },
        {
          level: "advanced",
          title: "Anonymous Callbacks vs Bindings",
          content: "Understand when to declare callbacks inline (which creates lightweight closures) vs using pre-defined named functional references to optimize memory performance."
        }
      ],
      detailedReference: {
        summary: "Decoupled logic maps data states across formatting callbacks, enhancing utility reuse.",
        keyConcepts: [
          { term: "Functional Decoupling", definition: "Separating main operational logic flows from UI formatting routines." }
        ],
        bestPractices: [
          "Use anonymous callbacks for single-use operations.",
          "Extract callbacks to named functions if they contain complex logic or are repeated across the codebase."
        ]
      },
      codeTemplate: {
        html: `<div id="decouple-out"></div>`,
        css: "",
        js: `const convertCase = (str, formatter) => formatter(str);

const uppercaseFormatter = s => s.toUpperCase();
const reverseFormatter = s => s.split('').reverse().join('');

const val = convertCase('Wemade Logix', uppercaseFormatter);
const val2 = convertCase('Wemade Logix', reverseFormatter);

document.getElementById('decouple-out').innerText = \`Format 1: \${val}\\nFormat 2: \${val2}\`;`
      },
      assessment: "Write a function 'runTask' that logs starting, executes a callback, and then logs completion."
    },
    {
      id: "w2-d5-t6",
      title: "6. Assignment Task – Callback-based String Formatter",
      customComponent: "ScopeHoistingViz",
      explanation: "Build an interactive Callback Formatter. Create a functional entry point that takes text input and processes it using callback arguments to convert casing or reverse strings, writing results to the page.",
      progression: [
        {
          level: "easy",
          title: "Function Architecture",
          content: "Declare a standard helper function `processString(text, callback)` that validates parameters and calls the callback argument on the text value."
        },
        {
          level: "intermediate",
          title: "Transformation Expressions",
          content: "Write arrow function variables to handle string formatting outcomes (uppercase, lowercase, and string reversing)."
        },
        {
          level: "advanced",
          title: "Click Handlers & Callbacks Integration",
          content: "Register event listeners on action buttons. Gather text inputs, execute the higher-order wrapper passing appropriate callbacks, and render the output."
        }
      ],
      codeTemplate: {
        html: `<div class="callback-engine">
  <h3>Wemade Formatter</h3>
  <input type="text" id="text-input" placeholder="Enter text string">
  <select id="format-op">
    <option value="upper">UPPERCASE (callback)</option>
    <option value="lower">lowercase (callback)</option>
    <option value="reverse">Reverse (callback)</option>
  </select>
  <button id="run-format">Apply Format</button>
  <div id="format-output" class="output-panel">Output: --</div>
</div>`,
        css: `.callback-engine {
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
input, select, button {
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
        js: `// Function Declaration
function processString(input, formatCallback) {
  if (typeof formatCallback === 'function') {
    return formatCallback(input);
  }
  return input;
}

// Function Expression (Arrow function)
const reverseStr = (str) => str.split('').reverse().join('');

document.getElementById('run-format').onclick = () => {
  const textVal = document.getElementById('text-input').value;
  const op = document.getElementById('format-op').value;
  const out = document.getElementById('format-output');
  
  if (!textVal) {
    alert('Please enter some text!');
    return;
  }
  
  let formattedResult = '';
  
  if (op === 'upper') {
    formattedResult = processString(textVal, (s) => s.toUpperCase());
  } else if (op === 'lower') {
    formattedResult = processString(textVal, (s) => s.toLowerCase());
  } else if (op === 'reverse') {
    formattedResult = processString(textVal, reverseStr);
  }
  
  out.innerText = \`Output: \${formattedResult}\`;
};`
      },
      assessment: "Final Challenge: Build the string formatter. Demonstrate functions, arrows, and callback passing techniques."
    },
    {
      id: "w2-d5-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Call stack whiteboard maps, closures scopes tracing checkpoints, arrow syntax mapping exercises, and solutions for the callbacks formatter.",
        duration: "15 mins",
        resources: [
          "Student Functions & Callbacks Lab (PDF)",
          "Callbacks Formatter Solutions (ZIP)"
        ]
      }
    }
  ]
};
