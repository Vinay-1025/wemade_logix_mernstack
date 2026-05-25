export const w2d4Data = {
  dayId: "w2-d4",
  dayTitle: "Day 4: JavaScript Control Flow & Loops",
  topics: [
    {
      id: "w2-d4-t1",
      title: "1. Conditional Logic (if/else)",
      customComponent: "LogicFlowViz",
      explanation: "Conditional statements allow your JavaScript programs to execute different blocks of code depending on whether a specific condition is true or false.",
      progression: [
        {
          level: "easy",
          title: "Simple If / Else",
          content: "Use `if` to specify a block of code to run if a condition is true, and `else` for code to run if it is false (e.g. `if (age >= 18) { ... } else { ... }`)."
        },
        {
          level: "intermediate",
          title: "Else If Ladder",
          content: "Use `else if` to check multiple mutually exclusive conditions in sequence, executing the first truthy block."
        },
        {
          level: "advanced",
          title: "Switch Statements",
          content: "Use a `switch` statement when you have many static values to compare against a single variable expression, separating cases with `break` lines to prevent fall-through."
        }
      ],
      detailedReference: {
        summary: "Conditional statements execute code blocks conditionally based on Boolean evaluations.",
        keyConcepts: [
          { term: "Else If Ladder", definition: "A sequence of logical tests evaluated top-to-bottom until a truthy expression is reached." }
        ],
        bestPractices: [
          "Use `if`/`else` for dynamic range checks and logical statements.",
          "Use a `switch` statement when matching a single variable against 4 or more exact constant strings or numbers."
        ]
      },
      codeTemplate: {
        html: `<div id="logic-out"></div>`,
        css: "",
        js: `const hour = new Date().getHours();
let greeting;

if (hour < 12) {
  greeting = "Good morning";
} else if (hour < 18) {
  greeting = "Good afternoon";
} else {
  greeting = "Good evening";
}

document.getElementById('logic-out').innerText = greeting;`
      },
      assessment: "Write an if-else statement that checks if a user is logged in and prints a custom message."
    },
    {
      id: "w2-d4-t2",
      title: "2. The 'for' Loop",
      customComponent: "LoopViz",
      explanation: "Loops are code constructs that repeat a block of code a set number of times. The `for` loop is ideal when you know exactly how many iterations you need beforehand.",
      progression: [
        {
          level: "easy",
          title: "For Loop Structure",
          content: "The `for` loop has three statements: initialization (e.g., `let i = 0`), condition check (`i < 5`), and iterator step (`i++`)."
        },
        {
          level: "intermediate",
          title: "Iterating Sequences",
          content: "Use the loop counter index `i` to access array elements sequentially or execute numerical math series."
        },
        {
          level: "advanced",
          title: "Nested Loops",
          content: "Write a `for` loop inside another `for` loop to inspect multidimensional data, such as a grid coordinate system."
        }
      ],
      detailedReference: {
        summary: "The for loop governs iteration loops using an index counter variable.",
        keyConcepts: [
          { term: "Iteration Counter", definition: "A block-scoped variable that increments/decrements on every loop pass." }
        ],
        bestPractices: [
          "Avoid infinite loops by ensuring your loop condition eventually evaluates to false.",
          "Keep nested loops shallow to prevent rendering performance penalties."
        ]
      },
      codeTemplate: {
        html: `<div id="for-out"></div>`,
        css: "",
        js: `let output = '';
for (let i = 1; i <= 5; i++) {
  output += \`Item #\${i}\\n\`;
}
document.getElementById('for-out').innerText = output;`
      },
      assessment: "Write a for loop that calculates the sum of numbers from 1 to 50."
    },
    {
      id: "w2-d4-t3",
      title: "3. 'while' & 'do-while' Loops",
      customComponent: "LoopViz",
      explanation: "When the exact number of iterations is unknown and depends on runtime state conditions, use `while` or `do-while` loops.",
      progression: [
        {
          level: "easy",
          title: "The while Loop",
          content: "The `while` loop checks the condition first. If it is true, it runs the code block and repeats (e.g. `while (condition) { ... }`)."
        },
        {
          level: "intermediate",
          title: "The do-while Loop",
          content: "Unlike standard loops, `do-while` executes the code block *first*, and *then* checks the condition. This guarantees the block runs at least once."
        },
        {
          level: "advanced",
          title: "Conditional States",
          content: "Use `while` loops when waiting for dynamic actions, such as user inputs, server polling states, or search matches."
        }
      ],
      detailedReference: {
        summary: "While and do-while loops support repetition driven by runtime logic thresholds.",
        keyConcepts: [
          { term: "Do-While Guarantee", definition: "A loop sequence that runs its block at least once before inspecting validation conditions." }
        ],
        bestPractices: [
          "Ensure the loop block alters variables inside the condition test so the loop terminates.",
          "Use `while` when the loop might execute 0 times, and `do-while` when it must run at least once."
        ]
      },
      codeTemplate: {
        html: `<div id="while-out"></div>`,
        css: "",
        js: `let count = 3;
let text = '';
while (count > 0) {
  text += \`Count: \${count}\\n\`;
  count--;
}
document.getElementById('while-out').innerText = text;`
      },
      assessment: "Compare the difference in execution order between a while loop and a do-while loop."
    },
    {
      id: "w2-d4-t4",
      title: "4. Loop Controls (break & continue)",
      customComponent: "LoopViz",
      explanation: "You can control loop execution dynamically from inside the block using the `break` and `continue` keywords.",
      progression: [
        {
          level: "easy",
          title: "Break Keyword",
          content: "The `break` statement exits the loop immediately, skipping any remaining iterations and resuming code execution after the loop block."
        },
        {
          level: "intermediate",
          title: "Continue Keyword",
          content: "The `continue` statement skips the current iteration's remaining code, jumping straight to the next iteration step check."
        },
        {
          level: "advanced",
          title: "Early Termination",
          content: "Use `break` to stop searching an array once a match is found. This is a crucial optimization for large datasets."
        }
      ],
      detailedReference: {
        summary: "Loop control statements alter loop executions dynamically depending on runtime checks.",
        keyConcepts: [
          { term: "Early Termination", definition: "Exiting a loop structure instantly once search metrics are satisfied, preserving cpu resources." }
        ],
        bestPractices: [
          "Use `break` to exit lookup loops early to optimize performance.",
          "Avoid deep layering of `continue` checks, as it can make loop control flows hard to read."
        ]
      },
      codeTemplate: {
        html: `<div id="control-out"></div>`,
        css: "",
        js: `let text = '';
for (let i = 1; i <= 10; i++) {
  if (i === 5) continue; // Skip 5
  if (i === 8) break;    // Stop loop at 8
  text += \`Number \${i}\\n\`;
}
document.getElementById('control-out').innerText = text;`
      },
      assessment: "What happens when the 'continue' keyword is hit in a loop?"
    },
    {
      id: "w2-d4-t5",
      title: "5. Nested Loops & Multi-Dimensional Flows",
      customComponent: "LoopViz",
      explanation: "Nesting loops allows you to walk through grids, coordinates, or matrices by looping columns within rows.",
      progression: [
        {
          level: "easy",
          title: "Nested Structures",
          content: "A nested loop is a loop inside another loop body. The inner loop executes fully for every single pass of the outer loop."
        },
        {
          level: "intermediate",
          title: "Grid Coordinates",
          content: "Use nested loops to print grid tables or visual coordinate points (e.g. coordinates `(x, y)`)."
        },
        {
          level: "advanced",
          title: "Break Labels",
          content: "In advanced setups, use labeled loops to break out of *both* inner and outer loop structures simultaneously from deep nesting."
        }
      ],
      detailedReference: {
        summary: "Multi-dimensional loops repeat operations across matrix structures.",
        keyConcepts: [
          { term: "Labeled Statements", definition: "Syntax tags prefixing loop declarations that let inner control breaks reference outer scopes." }
        ],
        bestPractices: [
          "Keep code complexity low by extraction; if nested logic grows complex, extract the inner block to a helper function.",
          "Be mindful of computational time complexity (O(N^2)) when nesting loops over large arrays."
        ]
      },
      codeTemplate: {
        html: `<div id="grid-out" style="font-family: monospace;"></div>`,
        css: "",
        js: `let gridStr = '';
for (let r = 1; r <= 3; r++) {
  for (let c = 1; c <= 3; c++) {
    gridStr += \`[\${r},\${c}] \`;
  }
  gridStr += '\\n';
}
document.getElementById('grid-out').innerText = gridStr;`
      },
      assessment: "If an outer loop runs 3 times and an inner loop runs 4 times, how many total iterations occur?"
    },
    {
      id: "w2-d4-t6",
      title: "6. Assignment Task - Control Flow & Loop Analyzer",
      customComponent: "LoopViz",
      explanation: "Build a sequence analyzer that takes user inputs, validates numerical thresholds with conditional checks, generates sequences using loops, and applies early termination or skip steps based on the mode selected.",
      progression: [
        {
          level: "easy",
          title: "Limit Validation",
          content: "Add check conditions to verify the limit input is a positive integer before launching loop operations."
        },
        {
          level: "intermediate",
          title: "Sequence Builder Loop",
          content: "Build a `for` loop that runs from 1 to the input limit value, writing matching values into a sequence list."
        },
        {
          level: "advanced",
          title: "Loop Controls Application",
          content: "Implement options to skip odd numbers using `continue`, or break the generation loop early using `break` if values exceed 10."
        }
      ],
      codeTemplate: {
        html: `<div class="loop-engine">
  <h3>Wemade Loop Engine</h3>
  <input type="number" id="limit-input" placeholder="Enter target limit">
  <select id="loop-mode">
    <option value="even">Evens Only (continue)</option>
    <option value="stop-ten">Stop at 10 (break)</option>
  </select>
  <button id="run-loop">Generate Sequence</button>
  <div id="loop-output" class="output-panel">Sequence: --</div>
</div>`,
        css: `.loop-engine {
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
  font-family: monospace;
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
        js: `document.getElementById('run-loop').onclick = () => {
  const limitVal = parseInt(document.getElementById('limit-input').value, 10);
  const mode = document.getElementById('loop-mode').value;
  const out = document.getElementById('loop-output');
  
  if (isNaN(limitVal) || limitVal <= 0) {
    alert('Please enter a valid positive number!');
    return;
  }
  
  let sequence = [];
  
  for (let i = 1; i <= limitVal; i++) {
    if (mode === 'even') {
      if (i % 2 !== 0) {
        continue; // Skip odd numbers
      }
    } else if (mode === 'stop-ten') {
      if (i > 10) {
        break; // Stop loop if exceeds 10
      }
    }
    sequence.push(i);
  }
  
  out.innerText = \`Sequence: \${sequence.join(', ')}\`;
};`
      },
      assessment: "Build the Loop Control playground. Verify how if/else controls, standard loops, and break/continue statements determine outputs."
    },
    {
      id: "w2-d4-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "If/else logic flowchart reviews, loop syntax traces, break/continue comparison diagrams, and solutions for the loop analyzer task.",
        duration: "15 mins",
        resources: [
          "Student Loops & Logic Lab (PDF)",
          "Control Flow Solutions (ZIP)"
        ]
      }
    }
  ]
};
