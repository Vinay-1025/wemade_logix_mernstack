export const w2d3Data = {
  dayId: "w2-d3",
  dayTitle: "Day 3: JavaScript Variables & Operators",
  topics: [
    {
      id: "w2-d3-t1",
      title: "1. Introduction to JS Variables",
      customComponent: "DataTypeViz",
      explanation: "Variables are named containers used to store data values. Modern JavaScript uses `const` (for references that will not be reassigned) and `let` (for variables that will change over time).",
      progression: [
        {
          level: "easy",
          title: "Declaring Variables",
          content: "Use `const` by default for variables that shouldn't change, and `let` for variables whose values need to be updated or reassigned later."
        },
        {
          level: "intermediate",
          title: "Block Scope",
          content: "Unlike the old `var` keyword which is function-scoped, `const` and `let` are block-scoped, meaning they only exist within the closest curly braces `{}` in which they are declared."
        },
        {
          level: "advanced",
          title: "Hoisting & The Temporal Dead Zone",
          content: "Variables declared with `var` are hoisted to the top of their scope and initialized as `undefined`. `let` and `const` variables are also hoisted but remain uninitialized in the Temporal Dead Zone (TDZ) until their declaration line is executed."
        }
      ],
      detailedReference: {
        summary: "Variables are memory bindings. Modern block scoping prevents accidental variable leaks.",
        keyConcepts: [
          { term: "Temporal Dead Zone", definition: "The state of a let/const variable between entering scope and its actual line declaration executing." }
        ],
        bestPractices: [
          "Default to using `const` for all variable declarations to make code predictable.",
          "Avoid using the legacy `var` keyword under any circumstances."
        ]
      },
      codeTemplate: {
        html: `<div id="var-out">Check variables...</div>`,
        css: "",
        js: `const course = 'MERN Stack';
let session = 1;
session = 2;
document.getElementById('var-out').innerText = 
  \`Course: \${course}, Session: \${session}\`;`
      },
      assessment: "Explain the difference between let and const keywords."
    },
    {
      id: "w2-d3-t2",
      title: "2. JavaScript Data Types",
      customComponent: "DataTypeViz",
      explanation: "JavaScript is a dynamically typed language, meaning variables can change types. JS categorizes values into Primitive types (stored by value) and Reference types (stored by memory reference).",
      progression: [
        {
          level: "easy",
          title: "Primitives Overview",
          content: "JavaScript contains 7 primitive types: String, Number, Boolean, Null, Undefined, Symbol, and BigInt. Primitives are immutable."
        },
        {
          level: "intermediate",
          title: "Objects & Arrays",
          content: "Reference types (Objects, Arrays, and Functions) store collections of values and properties, referenced by pointers in memory."
        },
        {
          level: "advanced",
          title: "Dynamic Typing",
          content: "Variables are not bound to a single type. You can assign a Number to a variable and later reassign a String to it, though this should be done carefully."
        }
      ],
      detailedReference: {
        summary: "Data types partition memory allocations. Primitives copy by value; Objects copy by memory pointer.",
        keyConcepts: [
          { term: "Reference Pointer", definition: "A memory address pointing to where an object or array is stored, rather than storing the value directly." }
        ],
        bestPractices: [
          "Use the `typeof` operator to verify data types before performing operations on them.",
          "Keep object structures consistent to avoid runtime exceptions."
        ]
      },
      codeTemplate: {
        html: `<div id="type-out"></div>`,
        css: "",
        js: `const score = 100;
const name = "Az";
const isActive = true;
const data = null;

document.getElementById('type-out').innerText = 
  \`Score: \${typeof score}, Name: \${typeof name}, Active: \${typeof isActive}, Data: \${typeof data}\`;`
      },
      assessment: "Why does typeof null return 'object' in JavaScript?"
    },
    {
      id: "w2-d3-t3",
      title: "3. Explicit Type Conversions",
      customComponent: "DataTypeViz",
      explanation: "Implicit type conversion is called Type Coercion (e.g. 5 + '5' evaluates to '55'). Explicit type conversion is casting values intentionally using built-in methods.",
      progression: [
        {
          level: "easy",
          title: "What is Coercion?",
          content: "Coercion is implicit conversion. For example, multiplying a string number `'5' * 2` coerces the string to a number, returning `10`."
        },
        {
          level: "intermediate",
          title: "Casting Strings & Numbers",
          content: "Cast values explicitly using constructors like `Number()`, `String()`, `parseInt()`, or `parseFloat()` to guarantee types."
        },
        {
          level: "advanced",
          title: "Boolean Conversions",
          content: "Cast values using `Boolean(val)`. Falsy values are: `0`, `\"\"` (empty string), `null`, `undefined`, `NaN`, and `false`. All other values are truthy."
        }
      ],
      detailedReference: {
        summary: "Type conversions establish boundary inputs, preventing unexpected string-concatenation errors.",
        keyConcepts: [
          { term: "Coercion", definition: "Automated type casting performed by the JavaScript engine behind the scenes." }
        ],
        bestPractices: [
          "Always perform explicit type conversions when reading values from HTML forms or inputs (which are always read as strings).",
          "Use `isNaN()` to check if a numeric conversion succeeded before doing math."
        ]
      },
      codeTemplate: {
        html: `<div id="conv-out"></div>`,
        css: "",
        js: `const input = "42";
const num = Number(input);
const isTruthy = Boolean(num);
document.getElementById('conv-out').innerText = 
  \`Num: \${num} (\${typeof num}), Truthy: \${isTruthy}\`;`
      },
      assessment: "What is the output of Number('hello') and Boolean('') in JS?"
    },
    {
      id: "w2-d3-t4",
      title: "4. Arithmetic & Logic Operators",
      customComponent: "OperatorViz",
      explanation: "Operators perform mathematical, assignment, and logical operations. Knowing operator precedence guarantees math operations run in the correct order.",
      progression: [
        {
          level: "easy",
          title: "Arithmetic Basics",
          content: "Use arithmetic operators (`+`, `-`, `*`, `/`, `%` modulo, `**` exponentiation) to compute numbers."
        },
        {
          level: "intermediate",
          title: "Assignment Operators",
          content: "Modify and assign variables in one step using assignment shorthand operators (`+=`, `-=`, `*=`, `/=`)."
        },
        {
          level: "advanced",
          title: "Operator Precedence",
          content: "JavaScript resolves operators in order of precedence (multiplication/division before addition/subtraction). Use parentheses `()` to explicitly group operations."
        }
      ],
      detailedReference: {
        summary: "Mathematical expressions evaluate according to order of operations rules.",
        keyConcepts: [
          { term: "Modulo Operator (%)", definition: "Returns the division remainder of two numbers (e.g. 5 % 2 returns 1)." }
        ],
        bestPractices: [
          "Use parentheses to write clean, self-documenting math equations whose order of execution is unambiguous.",
          "Use modulo `% 2 === 0` to check if a number is even."
        ]
      },
      codeTemplate: {
        html: `<div id="op-out"></div>`,
        css: "",
        js: `let score = 10;
score += 5;
const isEven = (score % 2 === 0);
document.getElementById('op-out').innerText = 
  \`Final Score: \${score}, Is Even? \${isEven}\`;`
      },
      assessment: "What is the value of 5 + 3 * 2 in JS, and how do you make it execute addition first?"
    },
    {
      id: "w2-d3-t5",
      title: "5. Logical & Comparison Operators",
      customComponent: "OperatorViz",
      explanation: "Comparison operators check relations, returning booleans. Logical operators combine comparisons to express complex decision trees.",
      progression: [
        {
          level: "easy",
          title: "Comparison Basics",
          content: "Compare values using greater than (`>`), less than (`<`), or equality checks."
        },
        {
          level: "intermediate",
          title: "Strict vs Loose Equality",
          content: "Loose equality (`==`) performs coercion before checking. Strict equality (`===`) checks both value AND data type without coercion. Always prefer `===`."
        },
        {
          level: "advanced",
          title: "Logical Chaining",
          content: "Link conditions using logical AND (`&&`), logical OR (`||`), and invert values using logical NOT (`!`)."
        }
      ],
      detailedReference: {
        summary: "Strict equality prevents coercion bugs, and logical chaining coordinates decision gates.",
        keyConcepts: [
          { term: "Strict Equality", definition: "A comparison check requiring matching types and matching values without automatic type conversion." }
        ],
        bestPractices: [
          "Always use `===` and `!==` instead of `==` and `!=` to avoid type coercion side effects.",
          "Take advantage of short-circuit evaluation in logical expressions for fallbacks (e.g. `const name = input || 'Guest'`)."
        ]
      },
      codeTemplate: {
        html: `<div id="comp-out"></div>`,
        css: "",
        js: `const a = 5;
const b = "5";
const loose = (a == b);
const strict = (a === b);
document.getElementById('comp-out').innerText = 
  \`Loose: \${loose}, Strict: \${strict}\`;`
      },
      assessment: "Explain why 5 === '5' evaluates to false while 5 == '5' evaluates to true."
    },
    {
      id: "w2-d3-t6",
      title: "6. Assignment Task - JavaScript Math & Logic Engine",
      customComponent: "DataTypeViz",
      explanation: "Build a JavaScript calculations engine that collects user inputs, parses strings explicitly into numeric datatypes, evaluates conditions using strict comparison checks, and outputs formatted results.",
      progression: [
        {
          level: "easy",
          title: "Input Parsing & Casting",
          content: "Declare variables to read values from DOM input elements. Cast inputs from text strings into floating-point numbers explicitly."
        },
        {
          level: "intermediate",
          title: "Arithmetic Calculation",
          content: "Execute math calculations (+, -, *, /, and remainder %) based on selected arithmetic operations."
        },
        {
          level: "advanced",
          title: "Strict Comparison Check",
          content: "Evaluate if the outputs fall within specific ranges, applying logical AND (&&) / OR (||) and strict comparisons (===)."
        }
      ],
      codeTemplate: {
        html: `<div class="calc-engine">
  <h3>Wemade Math Engine</h3>
  <input type="text" id="num1" placeholder="Value A">
  <input type="text" id="num2" placeholder="Value B">
  <select id="operation">
    <option value="add">Add</option>
    <option value="sub">Subtract</option>
    <option value="mul">Multiply</option>
    <option value="div">Divide</option>
    <option value="mod">Modulo</option>
  </select>
  <button id="run-calc">Calculate</button>
  <div id="calc-result" class="result-panel">
    <p>Result: <span id="out-val">--</span></p>
    <p>Type: <span id="out-type">--</span></p>
    <p>Is Even: <span id="out-even">--</span></p>
  </div>
</div>`,
        css: `.calc-engine {
  background: var(--app-card-bg, #1e293b);
  border: 1px solid var(--app-border, #334155);
  padding: 24px;
  border-radius: 12px;
  max-width: 400px;
  color: var(--app-text, #ffffff);
}
.result-panel {
  margin-top: 16px;
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
        js: `document.getElementById('run-calc').onclick = () => {
  const inputA = document.getElementById('num1').value;
  const inputB = document.getElementById('num2').value;
  const op = document.getElementById('operation').value;
  
  // Convert types explicitly
  const valA = parseFloat(inputA);
  const valB = parseFloat(inputB);
  
  if (isNaN(valA) || isNaN(valB)) {
    alert('Please enter valid numeric inputs!');
    return;
  }
  
  let result;
  if (op === 'add') result = valA + valB;
  else if (op === 'sub') result = valA - valB;
  else if (op === 'mul') result = valA * valB;
  else if (op === 'div') result = valB !== 0 ? valA / valB : 'Division by zero!';
  else if (op === 'mod') result = valA % valB;
  
  document.getElementById('out-val').innerText = result;
  document.getElementById('out-type').innerText = typeof result;
  
  // Check even/odd strictly
  const isEven = (typeof result === 'number' && result % 2 === 0);
  document.getElementById('out-even').innerText = isEven ? 'Yes' : 'No';
};`
      },
      assessment: "Demonstrate explicit type casting and how strict comparison operators differ from loose operators."
    },
    {
      id: "w2-d3-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Hoisting whiteboard exercises, data types cheatsheets, coercion edge cases, and solutions for the calculations engine code.",
        duration: "15 mins",
        resources: [
          "Student Variables & Operators Lab (PDF)",
          "Calculation Engine Solutions (ZIP)"
        ]
      }
    }
  ]
};
