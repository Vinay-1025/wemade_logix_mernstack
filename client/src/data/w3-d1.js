export const w3d1Data = {
  dayId: "w3-d1",
  dayTitle: "Day 1: JS Objects & ES6 Classes",
  topics: [
    {
      id: "w3-d1-t1",
      title: "1. Advanced Objects & Literals",
      customComponent: "ScopeHoistingViz",
      explanation: "Objects are collections of key-value pairs. Modern JavaScript supports shorthand property notations, dynamic computed property keys, and object references.",
      progression: [
        {
          level: "easy",
          title: "Shorthand Properties",
          content: "If your variable name matches the object key, you can omit the value assignment (e.g. `const user = { name, age }` instead of `{ name: name, age: age }`)."
        },
        {
          level: "intermediate",
          title: "Computed Property Names",
          content: "Use square brackets `[]` inside object declarations to evaluate expressions dynamically as keys (e.g. `const obj = { [dynamicKey]: 'value' }`)."
        },
        {
          level: "advanced",
          title: "Object Pass-by-Reference",
          content: "Objects are stored in memory and assigned by reference pointer. Mutating a copied object modifies the original object unless a shallow or deep copy is created."
        }
      ],
      detailedReference: {
        summary: "Objects store key-value tables and are passed by memory reference pointer rather than literal value.",
        keyConcepts: [
          { term: "Property Shorthand", definition: "Omitting value declarations when assigning object keys that share variable names." }
        ],
        bestPractices: [
          "Use shorthand property names for cleaner, shorter object creation code.",
          "Be mindful of object reference mutations; clone objects before modifying them."
        ]
      },
      codeTemplate: {
        html: `<div id="obj-out"></div>`,
        css: "",
        js: `const username = 'Az';
const role = 'Editor';

// Shorthand notation
const profile = { username, role };

// Computed properties
const keyName = 'status';
const finalProfile = {
  ...profile,
  [keyName]: 'Active'
};

document.getElementById('obj-out').innerText = JSON.stringify(finalProfile);`
      },
      assessment: "Write an object that dynamically defines a key using a variable value."
    },
    {
      id: "w3-d1-t2",
      title: "2. Object & Array Destructuring",
      customComponent: "ScopeHoistingViz",
      explanation: "Destructuring assignment lets you unpack values from arrays or properties from objects directly into distinct variables, reducing nested code.",
      progression: [
        {
          level: "easy",
          title: "Object Destructuring",
          content: "Extract properties by listing keys in braces `{}` (e.g. `const { name, age } = user`). This avoids writing `user.name` and `user.age` repeatedly."
        },
        {
          level: "intermediate",
          title: "Default Values & Aliasing",
          content: "Assign fallback values during destructuring (e.g. `const { role = 'guest' } = user`) or rename variables (e.g. `const { name: fullName } = user`)."
        },
        {
          level: "advanced",
          title: "Array Destructuring",
          content: "Extract array elements by their index position using square brackets `[]` (e.g. `const [first, second] = list`). Skip elements using empty commas."
        }
      ],
      detailedReference: {
        summary: "Destructuring assigns keys/indices directly to local scoped bindings, simplifying property unpacking.",
        keyConcepts: [
          { term: "Property Aliasing", definition: "Renaming an unpacked object property to a different variable name during destructuring." }
        ],
        bestPractices: [
          "Use destructuring at the top of functions to unpack parameters cleanly.",
          "Provide default values during destructuring to prevent reading undefined properties."
        ]
      },
      codeTemplate: {
        html: `<div id="destruct-out"></div>`,
        css: "",
        js: `const student = { name: 'Alex', grades: [85, 90], track: 'MERN' };

// Destructure object with alias and array extraction
const { name: studentName, grades: [gradeA, gradeB], cohort = 2026 } = student;

document.getElementById('destruct-out').innerText = 
  \`Name: \${studentName}, Grades: \${gradeA}, \${gradeB}, Year: \${cohort}\`;`
      },
      assessment: "Destructure the width and height properties from a bounds object: { width: 100, height: 200 }."
    },
    {
      id: "w3-d1-t3",
      title: "3. Spread & Rest Operators (...)",
      customComponent: "ScopeHoistingViz",
      explanation: "The spread operator (`...`) unpacks elements from arrays or properties from objects. The rest operator collects multiple separate arguments into a single array.",
      progression: [
        {
          level: "easy",
          title: "Object & Array Cloning",
          content: "Use spread `...` to copy objects or arrays shallowly (e.g. `const copy = [...original]`). Modifying `copy` won't affect `original` primitive values."
        },
        {
          level: "intermediate",
          title: "Merging Collections",
          content: "Merge multiple arrays or objects in one line (e.g. `const combined = { ...objA, ...objB }`). Conflicting keys will take the value of the last object merged."
        },
        {
          level: "advanced",
          title: "The Rest Parameter",
          content: "Use `...` in function parameters to collect all remaining arguments into a clean array (e.g. `function sum(...nums)`)."
        }
      ],
      detailedReference: {
        summary: "Spread expands collections into comma-separated values, while Rest collapses inputs back into structured arrays.",
        keyConcepts: [
          { term: "Shallow Copy", definition: "Cloning top-level properties of an object or array without copying nested children objects recursively." }
        ],
        bestPractices: [
          "Use the spread operator `[...arr]` or `{ ...obj }` to prevent mutating state values directly in React.",
          "Use the rest operator as the final parameter in a function signature to capture variable argument lists."
        ]
      },
      codeTemplate: {
        html: `<div id="spread-out"></div>`,
        css: "",
        js: `const base = { hp: 100, mp: 50 };
const warriorMod = { hp: 150, armor: 10 };

// Merge objects using spread
const character = { ...base, ...warriorMod };

// Rest parameter
function addScores(...scores) {
  return scores.reduce((total, s) => total + s, 0);
}

document.getElementById('spread-out').innerText = 
  \`Character HP: \${character.hp}, Armor: \${character.armor}, Sum: \${addScores(5, 10, 15)}\`;`
      },
      assessment: "Explain the difference between the spread and rest operators when using the triple-dot (...) syntax."
    },
    {
      id: "w3-d1-t4",
      title: "4. ES6 Classes & Inheritance",
      customComponent: "ScopeHoistingViz",
      explanation: "ES6 classes provide a clean blueprint syntax for writing Object-Oriented code in JavaScript, wrapping properties and methods in a single structure.",
      progression: [
        {
          level: "easy",
          title: "Class Declaration",
          content: "Declare a class using `class ClassName`. Use `constructor()` to define initial properties when creating an instance with the `new` keyword."
        },
        {
          level: "intermediate",
          title: "Class Methods",
          content: "Define behaviors directly inside the class body without the `function` keyword (e.g. `speak() { return 'Hello'; }`). Methods are stored on the class prototype to save memory."
        },
        {
          level: "advanced",
          title: "Inheritance (extends & super)",
          content: "Extend templates using the `extends` keyword (e.g. `class Dog extends Animal`). Invoke the parent class constructor inside the child constructor using `super()`."
        }
      ],
      detailedReference: {
        summary: "ES6 Classes act as syntactic wrappers for prototypical inheritance models, organizing object constructors.",
        keyConcepts: [
          { term: "Constructor Method", definition: "A special function running automatically on instantiation to initialize object attributes." }
        ],
        bestPractices: [
          "Name classes using PascalCase (e.g., `UserAccount`) to differentiate them from basic functions and objects.",
          "Always call `super()` first in a subclass constructor before trying to access the `this` context."
        ]
      },
      codeTemplate: {
        html: `<div id="class-out"></div>`,
        css: "",
        js: `class Device {
  constructor(brand) {
    this.brand = brand;
  }
  turnOn() {
    return \`\${this.brand} is booted.\`;
  }
}

class Phone extends Device {
  constructor(brand, model) {
    super(brand);
    this.model = model;
  }
  describe() {
    return \`\${this.turnOn()} Model: \${this.model}\`;
  }
}

const myPhone = new Phone('Wemade', 'Logix v1');
document.getElementById('class-out').innerText = myPhone.describe();`
      },
      assessment: "Write a Person class with name and age, and extend it to create a Student class that includes a major."
    },
    {
      id: "w3-d1-t5",
      title: "5. Understanding 'this' & Context Binding",
      customComponent: "ScopeHoistingViz",
      explanation: "The `this` keyword refers to the execution context context. Its value is determined dynamically by how a function is called, not where it is defined.",
      progression: [
        {
          level: "easy",
          title: "Global and Object Context",
          content: "In a basic object method, `this` refers to the object itself. In global scopes, it points to the window object (or undefined in strict mode)."
        },
        {
          level: "intermediate",
          title: "Explicit Binding (call, apply, bind)",
          content: "Manually set the `this` context: `call()` executes the function immediately, while `bind()` returns a new function with `this` bound permanently."
        },
        {
          level: "advanced",
          title: "Arrow Function Exception",
          content: "Arrow functions do not have their own `this`. They capture the `this` context of their surrounding lexical scope, which is useful for setting up timers or click handlers."
        }
      ],
      detailedReference: {
        summary: "Execution context rules govern 'this' bindings. Arrow functions retain scoping contexts lexically.",
        keyConcepts: [
          { term: "Lexical binding", definition: "Determining execution contexts based on write-time spatial positions rather than runtime triggers." }
        ],
        bestPractices: [
          "Use arrow functions inside event listeners and timers to avoid manual `.bind(this)` assignments.",
          "Be careful when extracting methods from objects, as doing so breaks standard runtime binding references."
        ]
      },
      codeTemplate: {
        html: `<button id="btn-bind">Click to Bind</button>\n<div id="bind-out"></div>`,
        css: "",
        js: `const user = {
  name: 'Az',
  greet() {
    return \`User: \${this.name}\`;
  }
};

const output = document.getElementById('bind-out');
const button = document.getElementById('btn-bind');

// Extracting method breaks 'this' context unless bound
const unboundGreet = user.greet;
const boundGreet = user.greet.bind(user);

button.onclick = () => {
  output.innerText = \`Unbound: \${unboundGreet()} | Bound: \${boundGreet()}\`;
};`
      },
      assessment: "Explain why calling an extracted object method globally returns undefined for its internal 'this' properties."
    },
    {
      id: "w3-d1-t6",
      title: "6. Assignment Task - OOP Character Builder & Inventory Analyzer",
      customComponent: "ScopeHoistingViz",
      explanation: "Build an interactive character creation system using ES6 classes. The class should take character details in its constructor, destructure attributes to display them, merge default configuration metrics using spreads, and output profiles using context-safe methods.",
      progression: [
        {
          level: "easy",
          title: "Hero Class Creation",
          content: "Declare a Hero class specifying a constructor that stores name, heroClass, and stats objects."
        },
        {
          level: "intermediate",
          title: "Spread Stats & Destructuring",
          content: "Merge baseline class stats (strength, agility) with user choices using the spread operator. Destructure stats internally to format output."
        },
        {
          level: "advanced",
          title: "Context-Safe Methods",
          content: "Write subclass extensions (e.g. Mage) that invoke super constructors. Ensure helper method calls within handlers bind context correctly."
        }
      ],
      codeTemplate: {
        html: `<div class="character-engine">
  <h3>Wemade Character Engine</h3>
  <input type="text" id="char-name" placeholder="Hero Name">
  <input type="text" id="char-class" placeholder="Class (e.g. Warrior, Mage)">
  <button id="create-char">Instantiate Hero</button>
  <div id="char-display" class="output-panel">No Character Created</div>
</div>`,
        css: `.character-engine {
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
        js: `// Define ES6 Class
class Hero {
  constructor(name, heroClass, stats = { hp: 100, mp: 50 }) {
    this.name = name;
    this.heroClass = heroClass;
    this.stats = stats;
  }
  
  describe() {
    // Use object destructuring
    const { hp, mp } = this.stats;
    return \`\${this.name} the \${this.heroClass} (HP: \${hp}, MP: \${mp})\`;
  }
}

document.getElementById('create-char').onclick = () => {
  const nameInput = document.getElementById('char-name').value;
  const classInput = document.getElementById('char-class').value;
  
  if (!nameInput || !classInput) {
    alert('Please fill in character details!');
    return;
  }
  
  // Use spread operator to pass default stats
  const baseStats = { hp: 120, mp: 80 };
  const finalStats = { ...baseStats };
  
  const player = new Hero(nameInput, classInput, finalStats);
  
  // Invoke method that relies on 'this'
  document.getElementById('char-display').innerText = player.describe();
};`
      },
      assessment: "Demonstrate classes syntax, destructuring stats, spreading variables, and binding execution contexts safely."
    },
    {
      id: "w3-d1-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Prototypical scope whiteboarding steps, classes vs factory functions, 'this' context bindings flowcharts, and solutions for the character builder code.",
        duration: "15 mins",
        resources: [
          "Student OOP & Modern features worksheet (PDF)",
          "Character Engine Solutions (ZIP)"
        ]
      }
    }
  ]
};
