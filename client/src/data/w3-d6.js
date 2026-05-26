export const w3d6Data = {
  dayId: "w3-d6",
  dayTitle: "Day 6: React Intro & Virtual DOM",
  topics: [
    {
      id: "w3-d6-t1",
      title: "1. What is React & SPA Architecture?",
      explanation: "React is an open-source JavaScript library developed by Meta for building user interfaces. Traditional websites load a new HTML page on every click. Modern Single Page Applications (SPAs) load a single HTML shell, dynamically swapping content regions using client-side JavaScript to create a fast app-like experience.",
      progression: [
        {
          level: "easy",
          title: "Multi-Page vs Single Page Apps",
          content: "Multi-Page Applications (MPAs) request a full server rebuild and page reload on page jumps. SPAs request data asynchronously and rewrite local DOM elements in-place, making transitions instant."
        },
        {
          level: "intermediate",
          title: "The React Ecosystem",
          content: "React focus is on the View layer of application architecture. It uses declarative programming paradigms, letting you describe *what* the UI should look like for a given state, rather than writing step-by-step imperative DOM update commands."
        },
        {
          level: "advanced",
          title: "SPA Client-side Routing",
          content: "In a React SPA, page routing is handled client-side (e.g., using React Router). When a link is clicked, the router prevents browser reload, matches URL paths, and swaps component nodes dynamically."
        }
      ],
      detailedReference: {
        summary: "React SPAs optimize user experience by executing routing and rendering inside the browser client.",
        keyConcepts: [
          { term: "Single Page Application (SPA)", definition: "A web app architecture loading a single HTML shell and updating layout segments in-place via JS." }
        ],
        bestPractices: [
          "Use declarative code structures to let React manage DOM updates.",
          "Use client-side routing to maintain browser history stacks without triggering full page reloads."
        ]
      },
      codeTemplate: {
        html: `<div id="spa-shell">\n  <nav><a href="#home">Home</a> | <a href="#about">About</a></nav>\n  <main id="app-view">Home Page Content</main>\n</div>`,
        css: "",
        js: `// Conceptual SPA router simulation
window.onhashchange = () => {
  const view = document.getElementById('app-view');
  view.innerText = window.location.hash === '#about' ? 'About Us Content' : 'Home Page Content';
};`
      },
      assessment: "Describe the primary difference between Multi-Page Applications (MPAs) and Single Page Applications (SPAs)."
    },
    {
      id: "w3-d6-t2",
      title: "2. The Virtual DOM & Reconciliation",
      explanation: "Directly modifying the browser DOM (Real DOM) is computationally expensive and slow. React solves this by keeping a lightweight Virtual DOM copy in memory, calculating changes, and updating the Real DOM in batches.",
      progression: [
        {
          level: "easy",
          title: "What is the Virtual DOM?",
          content: "The Virtual DOM is a lightweight JavaScript object representation of the Real DOM tree nodes. It can be written, copied, and read instantly in local memory."
        },
        {
          level: "intermediate",
          title: "The Diffing Algorithm",
          content: "When state variables change, React builds a new Virtual DOM tree and compares it with the previous version to identify exact nodal changes (called Diffing)."
        },
        {
          level: "advanced",
          title: "Reconciliation & Batching",
          content: "Reconciliation is the process of applying Virtual DOM diffs to the Real DOM. React batches these updates together, executing them in a single paint cycle to prevent layout reflow lag."
        }
      ],
      detailedReference: {
        summary: "Virtual DOM reconciliation buffers updates in memory before modifying browser DOM nodes in batches.",
        keyConcepts: [
          { term: "Diffing", definition: "A comparison algorithm that calculates minimum edits required between memory trees." }
        ],
        bestPractices: [
          "Let React manage the DOM; avoid using direct query selectors (`document.getElementById`) to alter elements inside React apps.",
          "Provide unique, static `key` properties to list elements so React's diffing engine can track node identity shifts."
        ]
      },
      codeTemplate: {
        html: `<div id="vdom-sandbox">Real DOM Node</div>`,
        css: "",
        js: `// Conceptual representation of a Virtual DOM Node object:
const virtualNode = {
  type: 'div',
  props: { id: 'vdom-sandbox', className: 'active' },
  children: ['Real DOM Node']
};
console.log('Virtual DOM Representation:', virtualNode);`
      },
      assessment: "Explain why direct modifications of the Real DOM are slower than memory-based Virtual DOM evaluations."
    },
    {
      id: "w3-d6-t3",
      title: "3. JSX Syntax & Formatting Rules",
      explanation: "JSX (JavaScript XML) is a syntax extension that lets you write HTML-like elements directly inside JavaScript code, which compilation tools parse into standard function calls.",
      progression: [
        {
          level: "easy",
          title: "What is JSX?",
          content: "JSX looks like HTML but is converted by compilers (like Babel) into standard `React.createElement()` function calls before running in the browser."
        },
        {
          level: "intermediate",
          title: "JSX Strict Syntax Rules",
          content: "1) All elements must return a single root parent (often using a Fragment `<> ... </>`). 2) All tags must be self-closing (e.g. `<img />`). 3) Use camelCase for attributes (e.g. `className` instead of `class`, `htmlFor` instead of `for`)."
        },
        {
          level: "advanced",
          title: "JavaScript Expressions inside JSX",
          content: "Inject active JS expressions (variables, maps, inline evaluations) directly inside JSX elements by wrapping them in curly braces `{}` (e.g. `<h1>{username.toUpperCase()}</h1>`)."
        }
      ],
      detailedReference: {
        summary: "JSX compiles markup trees into JS objects, enforcing single-root parent wrappers.",
        keyConcepts: [
          { term: "React Fragment (<> </>)", definition: "An empty parent tag wrapper that groups elements without adding redundant nodes to the DOM tree." }
        ],
        bestPractices: [
          "Always close every tag, including self-closing elements like `<br />` and `<input />`.",
          "Use braces `{}` to embed variables or run JavaScript evaluations directly inside layout elements."
        ]
      },
      codeTemplate: {
        html: `<div id="jsx-out"></div>`,
        css: "",
        js: `// Conceptual JSX code (transpiled by Babel):
// const element = <h1 className="title">Hello {name}</h1>;

// Compiles to:
const name = 'Student';
const element = React.createElement('h1', { className: 'title' }, 'Hello ', name);
console.log('Transpiled element object:', element);`
      },
      assessment: "List three syntax differences between raw HTML writing and JSX writing."
    },
    {
      id: "w3-d6-t4",
      title: "4. React Functional Components",
      explanation: "Components are independent, reusable pieces of UI. Modern React uses Functional Components, which are simple JavaScript functions returning JSX templates.",
      progression: [
        {
          level: "easy",
          title: "Declaring Components",
          content: "A React component is a function whose name starts with an uppercase letter and returns a JSX block (e.g. `function MyCard() { return <div>Card</div>; }`)."
        },
        {
          level: "intermediate",
          title: "Instantiation in JSX",
          content: "Instantiate components inside other templates using tag notation (e.g. `<MyCard />` or `<MyCard></MyCard>`)."
        },
        {
          level: "advanced",
          title: "Reusability & Isolation",
          content: "Components act as closed capsules. You can render multiple instances of the same component on a page; each maintains its own independent state variables and lifecycle parameters."
        }
      ],
      detailedReference: {
        summary: "Functional components are uppercase functions returning JSX blocks to define independent UI elements.",
        keyConcepts: [
          { term: "Functional Component", definition: "A PascalCase function returning JSX templates to build reusable layouts." }
        ],
        bestPractices: [
          "Always capitalize component names (e.g. `UserProfile`, not `userProfile`) so React can tell them apart from standard HTML tags.",
          "Keep components focused on a single responsibility; split complex layouts into smaller nested components."
        ]
      },
      codeTemplate: {
        html: `<div id="comp-concept"></div>`,
        css: "",
        js: `// Conceptual Component Blueprint:
function UserCard() {
  return \`
    <div class="user-card">
      <h4>Guest User</h4>
      <p>Status: Offline</p>
    </div>
  \`;
}
document.getElementById('comp-concept').innerHTML = UserCard();`
      },
      assessment: "Why must React component function names always begin with a capital letter?"
    },
    {
      id: "w3-d6-t5",
      title: "5. Component Props Foundations",
      explanation: "Props (Properties) are configuration arguments passed into components from parent layouts, allowing components to render dynamic contents.",
      progression: [
        {
          level: "easy",
          title: "What are Props?",
          content: "Props are read-only inputs passed to components like HTML attributes (e.g. `<UserCard name='Alex' />`)."
        },
        {
          level: "intermediate",
          title: "Reading Props",
          content: "Components receive props as a single unified object parameter. Access them inside the function body: `function UserCard(props) { return <h1>{props.name}</h1>; }`."
        },
        {
          level: "advanced",
          title: "Props Destructuring & Defaults",
          content: "Destructure props directly in the parameter list for clean templates (e.g., `function UserCard({ name, role = 'guest' })`). Props are strictly immutable."
        }
      ],
      detailedReference: {
        summary: "Props provide read-only data inputs to child components, establishing predictable data flows.",
        keyConcepts: [
          { term: "Props Immutability", definition: "A strict rule stating child components must never mutate their incoming props arguments directly." }
        ],
        bestPractices: [
          "Treat props as read-only configuration inputs; do not attempt to rewrite them inside child components.",
          "Provide fallback default values during props destructuring to prevent layout crashes."
        ]
      },
      codeTemplate: {
        html: `<div id="props-concept"></div>`,
        css: "",
        js: `// Conceptual Component reading Props
function WelcomeMessage({ username, course }) {
  return \`<p>Welcome \${username} to the \${course} track!</p>\`;
}

const htmlOut = WelcomeMessage({ username: 'Alex', course: 'React 101' });
document.getElementById('props-concept').innerHTML = htmlOut;`
      },
      assessment: "Describe how data travels from parent components to child components using props."
    },
    {
      id: "w3-d6-t6",
      title: "6. Assignment Task - JSX & Component Mockup Layout",
      customComponent: "JSRuntimeViz",
      explanation: "Create an HTML/CSS layout representing your first functional React component structure. Use class namespaces to represent component boundaries and declare conceptual JS variables representing props to outline components.",
      progression: [
        {
          level: "easy",
          title: "Component HTML Skeleton",
          content: "Build a card container wrapper styled in HTML using a specific class indicating its component name (e.g., `UserProfileCard`)."
        },
        {
          level: "intermediate",
          title: "Props Representation Layout",
          content: "Use class names for inner elements that represent component props (such as `component-prop-name` or `component-prop-bio`)."
        },
        {
          level: "advanced",
          title: "JS Component Function Simulation",
          content: "Write a conceptual JavaScript function simulator that accepts a `props` parameter, logs it, and simulates returning markup."
        }
      ],
      codeTemplate: {
        html: `<div class="react-mockup">
  <h3>React Component Visual Mockup</h3>
  <!-- Component: UserProfileCard (Props: username, role, bio) -->
  <div class="component-card">
    <div class="card-header">
      <h4 class="component-prop-name">Username: Admin User</h4>
      <span class="component-prop-role">Role: Instructor</span>
    </div>
    <p class="component-prop-bio">Bio: Passionate about React, SPA routing, and Virtual DOM rendering.</p>
  </div>
</div>`,
        css: `.react-mockup {
  background: var(--app-card-bg, #1e293b);
  border: 1px solid var(--app-border, #334155);
  padding: 24px;
  border-radius: 12px;
  max-width: 400px;
  color: var(--app-text, #ffffff);
}
.component-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid #00d1d1;
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
}
.component-prop-name { color: #00d1d1; margin: 0; }
.component-prop-role { font-size: 0.8rem; color: #94a3b8; }
.component-prop-bio { font-size: 0.9rem; margin-top: 10px; }`,
        js: `// Purely conceptual JS representing React component structure
function UserProfileCard(props) {
  console.log('Rendering UserProfileCard component with props:', props);
}

UserProfileCard({ username: 'Admin User', role: 'Instructor', bio: 'Passionate about React...' });`
      },
      assessment: "Final Challenge: Build the static mockup of your component. Verify component structures, simulated JS function wrappers, and properties representations."
    },
    {
      id: "w3-d6-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "SPA vs MPA network comparisons, virtual DOM diff tracing checkpoints, JSX translation syntax guides, and solutions for the component mockup task.",
        duration: "15 mins",
        resources: [
          "Student React Intro Lab (PDF)",
          "Component Mockup Solutions (ZIP)"
        ]
      }
    }
  ]
};
