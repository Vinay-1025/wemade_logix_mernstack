export const w4d2Data = {
  dayId: "w4-d2",
  dayTitle: "Day 2: State Management & the useState Hook",
  topics: [
    {
      id: "w4-d2-t1",
      title: "1. Variable vs State: The Rendering Concept",
      customComponent: "StateVsVariableViz",
      explanation: "Standard JS variables store values in memory, but do not trigger updates in the browser's view when mutated. React state variables are tracked by the engine, scheduling re-renders when changed so that the DOM updates.",
      progression: [
        {
          level: "easy",
          title: "Memory vs DOM",
          content: "Mutating a normal variable (e.g. `let count = 5; count++`) updates the system memory reference but leaves the DOM untouched. The UI falls out of sync with actual application values."
        },
        {
          level: "intermediate",
          title: "State Hooks Lifecycle",
          content: "React state registers values with React's scheduling fiber. Changing state causes React to re-run the component function, compare the returning virtual tree, and apply minimal diff modifications to the page DOM."
        },
        {
          level: "advanced",
          title: "Re-rendering Component Tree",
          content: "When state updates, the component and all its nested child components re-render by default. To build high-performance frontends, engineers must structure component states modularly."
        }
      ],
      detailedReference: {
        summary: "React matches interface updates with state variables, re-running component renders to keep the DOM in sync with memory updates.",
        keyConcepts: [
          { term: "Re-rendering", definition: "The process where React re-evaluates a component's JSX to compute the latest virtual representation and updates the DOM." }
        ],
        bestPractices: [
          "Do not mutate state directly (e.g. `state.name = 'Az'`); always invoke the designated setter hook function.",
          "Keep component state local and close to where it is used to avoid unnecessary child re-renders."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `// Demo: Modifying local variable does not update UI. State updates do!
const App = () => {
  let localVal = 0;
  const [stateVal, setStateVal] = React.useState(0);

  const incrementLocal = () => {
    localVal += 1;
    console.log('localVal is now:', localVal); // Updates in memory, but UI stays 0
  };

  const incrementState = () => {
    setStateVal(stateVal + 1); // Triggers re-render, UI updates instantly
  };

  return (
    <div style={{ padding: '16px' }}>
      <p>Local variable: {localVal} (check console logs!)</p>
      <p>React State: {stateVal}</p>
      <button onClick={incrementLocal} style={{ marginRight: '8px' }}>Add Local</button>
      <button onClick={incrementState}>Add State</button>
    </div>
  );
};`
      },
      assessment: "Explain why standard let variables cannot trigger interface renders in React applications."
    },
    {
      id: "w4-d2-t2",
      title: "2. The useState Hook Syntax",
      customComponent: "StateVsVariableViz",
      explanation: "`useState` is a built-in React hook that lets you add state variables to functional components. It returns an array containing the current state value and a setter function to update it.",
      progression: [
        {
          level: "easy",
          title: "Hook Instantiation",
          content: "Initialize state by calling `useState(defaultValue)` (e.g., `const [count, setCount] = useState(0)`). Destructuring names the variable and setter."
        },
        {
          level: "intermediate",
          title: "State Setters",
          content: "Invoke the setter (e.g. `setCount(newCount)`) to request a state update. React schedules the update and triggers a re-render cycle."
        },
        {
          level: "advanced",
          title: "Initial State Functions",
          content: "Pass a function to `useState` for lazy initialization (e.g. `useState(() => loadData())`). React runs this function only once on mount, saving computational resources."
        }
      ],
      detailedReference: {
        summary: "The useState hook returns a stateful value and a dispatch function to update it, triggering re-render pipelines.",
        keyConcepts: [
          { term: "Array Destructuring Hooks", definition: "Using destructuring to unpack the value and setter array returned by the useState function call." }
        ],
        bestPractices: [
          "Follow the naming convention: `const [value, setValue] = useState(initial)`.",
          "Use lazy state initialization functions if reading from localStorage or parsing complex configurations on boot."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  // Declare state with initial boolean
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ padding: '16px' }}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Open'} Dialog
      </button>

      {isOpen && (
        <div style={{ marginTop: '10px', padding: '20px', background: '#e2e8f0', borderRadius: '8px' }}>
          <h4>Secret Workspace Portal</h4>
          <p>This panel rendered conditionally using state!</p>
        </div>
      )}
    </div>
  );
};`
      },
      assessment: "Write the useState initialization line for a state variable representing a user object, defaulting to null."
    },
    {
      id: "w4-d2-t3",
      title: "3. The Functional State Updater Pattern",
      customComponent: "StateVsVariableViz",
      explanation: "When updating state based on its previous value, always pass an updater function to the state setter. This ensures you are working with the most up-to-date state, avoiding bugs caused by React's asynchronous state batching.",
      progression: [
        {
          level: "easy",
          title: "Passing a Callback",
          content: "Instead of calling `setCount(count + 1)`, pass a callback function: `setCount(prevCount => prevCount + 1)`. React executes the callback with the latest state value."
        },
        {
          level: "intermediate",
          title: "State Batching Race Conditions",
          content: "React batches state updates to optimize rendering. Calling `setCount(count + 1)` three times in a single event handler only increments the count by 1 because all calls reference the same stale `count` value."
        },
        {
          level: "advanced",
          title: "Safe Batch Updates",
          content: "Using the functional updater pattern (`setCount(prev => prev + 1)`) allows multiple consecutive updates to run safely within the same rendering cycle."
        }
      ],
      detailedReference: {
        summary: "Functional state updates resolve race conditions by using a queue to ensure state setters run sequentially with fresh values.",
        keyConcepts: [
          { term: "Asynchronous Batching", definition: "React combining multiple state updates into a single re-render cycle to maximize UI rendering performance." }
        ],
        bestPractices: [
          "Always use the functional updater pattern (`setCount(prev => prev + 1)`) when state depends on its previous value.",
          "Avoid using local variables as intermediate states when scheduling consecutive state updates."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [count, setCount] = React.useState(0);

  const incrementTripleStale = () => {
    // Stale updates: all referencing the same count value
    // E.g. if count is 0, this calls setCount(0+1), setCount(0+1), setCount(0+1)
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1); // UI only increments by 1!
  };

  const incrementTripleSafe = () => {
    // Safe updates: each callback receives the latest queued value
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1); // UI increments by 3!
  };

  return (
    <div style={{ padding: '16px' }}>
      <h3>Counter: {count}</h3>
      <button onClick={incrementTripleStale} style={{ marginRight: '8px' }}>Stale Add (+1)</button>
      <button onClick={incrementTripleSafe}>Functional Add (+3)</button>
    </div>
  );
};`
      },
      assessment: "Why does calling setCount(count + 1) twice in the same function only increment the counter by 1?"
    },
    {
      id: "w4-d2-t4",
      title: "4. State Objects & The Spread Operator",
      customComponent: "StateVsVariableViz",
      explanation: "When managing object or array states in React, you must copy the existing collection using the spread operator (`...`) before modifying it. Modifying state properties directly will not trigger a re-render.",
      progression: [
        {
          level: "easy",
          title: "Immutable State Updates",
          content: "React triggers re-renders only when a new object reference is passed to the state setter. Mutating properties on the existing state object will not trigger an update."
        },
        {
          level: "intermediate",
          title: "Spreading State Objects",
          content: "Use the spread operator to shallow copy the existing state object, then overwrite the specific properties you want to update (e.g. `setForm({ ...form, email: value })`)."
        },
        {
          level: "advanced",
          title: "Deep Nesting Updates",
          content: "To update nested object states, you must copy each nested level using the spread operator. To avoid complex nested spreads, keep state structures flat."
        }
      ],
      detailedReference: {
        summary: "State setters require a new object reference to trigger a re-render. Copy state objects using the spread operator before modifying properties.",
        keyConcepts: [
          { term: "Referential Equality", definition: "The comparison check React uses to see if a state reference has changed, triggering a re-render." }
        ],
        bestPractices: [
          "Always copy object and array states using the spread operator before updating properties.",
          "Keep state objects flat to avoid complex, deep spread copy code."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [profile, setProfile] = React.useState({
    name: 'Alex',
    role: 'Student'
  });

  const updateRole = () => {
    // Safe object update: copy properties and overwrite role
    setProfile(prevProfile => ({
      ...prevProfile,
      role: 'Full Stack Engineer'
    }));
  };

  return (
    <div style={{ padding: '16px' }}>
      <h3>Profile Info</h3>
      <p>Name: {profile.name}</p>
      <p>Role: {profile.role}</p>
      <button onClick={updateRole}>Upgrade Role</button>
    </div>
  );
};`
      },
      assessment: "Write a state setter statement that updates the email field of a user state object while preserving all other properties."
    },
    {
      id: "w4-d2-t5",
      title: "5. State Batching & Execution Queues",
      customComponent: "StateVsVariableViz",
      explanation: "React batches state updates to optimize rendering performance, grouping multiple state changes into a single re-render cycle.",
      progression: [
        {
          level: "easy",
          title: "Single Re-render Cycles",
          content: "If you call multiple state setters inside a single click handler, React will wait until the handler finishes executing before performing a single re-render."
        },
        {
          level: "intermediate",
          title: "Batching Event Handlers",
          content: "Batching prevents unnecessary intermediate renders, keeping UI updates smooth and improving rendering performance."
        },
        {
          level: "advanced",
          title: "React 18 Automatic Batching",
          content: "React 18 batches state updates automatically, even inside promises, timeouts, and native event handlers."
        }
      ],
      detailedReference: {
        summary: "Automatic batching groups multiple state updates into a single re-render cycle, optimizing rendering performance.",
        keyConcepts: [
          { term: "Automatic Batching", definition: "A React 18 feature that groups state updates from any scope (timeouts, fetch calls) into a single re-render." }
        ],
        bestPractices: [
          "Group related state updates together to simplify component design.",
          "Trust React's batching engine to optimize re-renders rather than trying to optimize them manually."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [status, setStatus] = React.useState('Idle');
  const [data, setData] = React.useState('');

  const loadData = () => {
    // Both state updates are batched, triggering a single re-render
    setStatus('Loading...');
    setData('Simulating API payload...');
  };

  return (
    <div style={{ padding: '16px' }}>
      <p>Status: {status}</p>
      <p>Payload: {data}</p>
      <button onClick={loadData}>Trigger Batched load</button>
    </div>
  );
};`
      },
      assessment: "What is the primary benefit of React's automatic state update batching?"
    },
    {
      id: "w4-d2-t6",
      title: "6. Assignment Task: Multi-Feature Counter & Theme Sandbox",
      explanation: "Create an interactive counter app that includes increment, decrement, and reset actions, and a theme switcher. The app must manage the counter value and the theme style in state. The count must update safely using the functional updater pattern, and the theme switcher must update the background and text color of the wrapper component.",
      progression: [
        {
          level: "easy",
          title: "Define Counter States",
          content: "Create a count state initialized to 0. Add increment and decrement buttons that update count state."
        },
        {
          level: "intermediate",
          title: "Implement Functional Setters",
          content: "Ensure count setters use the functional updater pattern (`prev => ...`) to update the count value safely."
        },
        {
          level: "advanced",
          title: "Add Visual Theme Switcher",
          content: "Create a theme state variable. Add a button that toggles theme values (e.g. 'light' vs 'dark'), updating wrapper CSS styles dynamically."
        }
      ],
      codeTemplate: {
        html: "",
        css: `/* Sandbox Styles */
.theme-sandbox {
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid #e2e8f0;
}
.theme-sandbox.light {
  background: #f8fafc;
  color: #0f172a;
}
.theme-sandbox.dark {
  background: #0f172a;
  color: #f8fafc;
  border-color: #1e293b;
}
.counter-val {
  font-size: 3rem;
  font-weight: bold;
  margin: 16px 0;
  font-family: monospace;
}
.btn-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}
.action-btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  background: #0ea5e9;
  color: white;
}
.theme-toggle-btn {
  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid #cbd5e1;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: 0.8rem;
}`,
        js: `const App = () => {
  // 1. Declare state for counter and theme
  const [count, setCount] = React.useState(0);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  // 2. Event handlers using functional state updates
  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    setCount(prev => prev - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className={\`theme-sandbox \${isDarkMode ? 'dark' : 'light'}\`}>
      <h3>Wemade Counter Sandbox</h3>
      
      <div className="counter-val">{count}</div>
      
      <div className="btn-row">
        <button onClick={handleDecrement} className="action-btn">Decrement</button>
        <button onClick={handleReset} className="action-btn" style={{ background: '#64748b' }}>Reset</button>
        <button onClick={handleIncrement} className="action-btn">Increment</button>
      </div>

      <button 
        onClick={() => setIsDarkMode(prev => !prev)} 
        className="theme-toggle-btn"
      >
        Switch to {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
};`
      },
      assessment: "Checklist:\n1. Initialize a count state hook and a theme state hook.\n2. Bind functional updaters for increment and decrement actions.\n3. Implement a reset handler resetting count state back to 0.\n4. Connect the theme toggle to update component style wrappers in dark/light layouts."
    },
    {
      id: "w4-d2-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Component states diagram charts, functional setter execution logs, batching trace procedures, and solutions for the theme counter sandbox code.",
        duration: "15 mins",
        resources: [
          "State management presentation slides (PDF)",
          "Theme Counter Solutions (ZIP)"
        ]
      }
    }
  ]
};
