export const w5d1Data = {
  dayId: "w5-d1",
  dayTitle: "Day 1: useRef Hook & useMemo Optimization",
  topics: [
    {
      id: "w5-d1-t1",
      title: "1. The useRef Hook for DOM References",
      customComponent: "RefMemoViz",
      explanation: "The `useRef` hook allows you to reference DOM nodes directly and persist mutable variables across re-renders without triggering UI updates.",
      progression: [
        {
          level: "easy",
          title: "Referencing DOM Elements",
          content: "Bind a ref to an HTML element using the `ref` attribute (e.g. `<input ref={myRef} />`). Once mounted, access the raw DOM element via `myRef.current`."
        },
        {
          level: "intermediate",
          title: "Focusing and Measuring Nodes",
          content: "Use refs to trigger focus events (e.g., `myRef.current.focus()`), clear inputs, or measure element bounds directly without reading state."
        },
        {
          level: "advanced",
          title: "Avoiding Re-renders",
          content: "Updating a ref value does not trigger a component re-render, making it ideal for storing timers, click counters, or previous state values."
        }
      ],
      detailedReference: {
        summary: "useRef provides a direct handle to HTML elements and mutable variables, bypassing the React rendering engine.",
        keyConcepts: [
          { term: "DOM Reference", definition: "A direct pointer to a browser DOM node, allowing manual DOM manipulation in React." }
        ],
        bestPractices: [
          "Use refs for focusing inputs, media controls, or measuring layout sizes.",
          "Do not use refs to manipulate layout values that React should manage via state."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const inputRef = React.useRef(null);

  const handleFocus = () => {
    // Focus the input element directly using ref
    inputRef.current.focus();
  };

  return (
    <div style={{ padding: '16px' }}>
      <input ref={inputRef} type="text" placeholder="Type here..." />
      <button onClick={handleFocus} style={{ marginLeft: '8px' }}>
        Focus Input
      </button>
    </div>
  );
};`
      },
      assessment: "Write the React code to initialize a ref called inputRef and attach it to a text input element."
    },
    {
      id: "w5-d1-t2",
      title: "2. Ref Variables vs. React State",
      customComponent: "RefMemoViz",
      explanation: "While React state triggers a re-render on every update, ref variables persist values in memory silently, keeping the component lifecycle decoupled from updates.",
      progression: [
        {
          level: "easy",
          title: "Value Persistence",
          content: "Store values in `ref.current` to persist them between renders. Unlike local function variables, ref values do not reset when the component re-runs."
        },
        {
          level: "intermediate",
          title: "Silent State Mutates",
          content: "Mutate `ref.current` directly (e.g. `ref.current = newVal`). React will update the reference immediately in memory without rescheduling re-renders."
        },
        {
          level: "advanced",
          title: "Timer and Cleanup Storing",
          content: "Store timeout IDs and intervals inside refs, allowing cleanup functions to access and clear them on unmount without triggering renders."
        }
      ],
      detailedReference: {
        summary: "Refs persist values silently in memory, while state updates trigger immediate UI rendering cycles.",
        keyConcepts: [
          { term: "Silent Update", definition: "Modifying a ref variable in memory without scheduling rendering updates in the Virtual DOM." }
        ],
        bestPractices: [
          "Use refs to store interval and timeout IDs so they are preserved across renders.",
          "Use state variables for values that need to render dynamically on screen."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [renders, setRenders] = React.useState(0);
  const clickCountRef = React.useRef(0);

  const handleRefClick = () => {
    clickCountRef.current += 1;
    console.log('Ref value:', clickCountRef.current); // Increments in memory, UI stays same
  };

  return (
    <div style={{ padding: '16px' }}>
      <p>Ref Click count: {clickCountRef.current} (Check console!)</p>
      <p>State Render count: {renders}</p>
      <button onClick={handleRefClick} style={{ marginRight: '8px' }}>Add Ref count</button>
      <button onClick={() => setRenders(prev => prev + 1)}>Trigger Render</button>
    </div>
  );
};`
      },
      assessment: "Explain the difference in rendering behavior when updating a state variable vs a ref variable."
    },
    {
      id: "w5-d1-t3",
      title: "3. Caching Calculations with useMemo",
      customComponent: "RefMemoViz",
      explanation: "The `useMemo` hook memoizes (caches) the result of a computationally expensive function, skipping calculations during re-renders unless its dependencies change.",
      progression: [
        {
          level: "easy",
          title: "Memoizing Results",
          content: "Wrap expensive calculations in `useMemo` (e.g. `const val = useMemo(() => compute(), [dep])`). React caches the return value."
        },
        {
          level: "intermediate",
          title: "Skipping Re-evaluations",
          content: "If a component re-renders due to unrelated state changes, `useMemo` returns the cached value, skipping the expensive calculation entirely."
        },
        {
          level: "advanced",
          title: "Referential Equality Optimizations",
          content: "Use `useMemo` to cache arrays or objects passed as props to child components, preventing unnecessary child re-renders caused by reference changes."
        }
      ],
      detailedReference: {
        summary: "useMemo caches calculation results, skipping re-evaluations on re-renders unless dependency array values change.",
        keyConcepts: [
          { term: "Memoization", definition: "An optimization technique that caches function results, returning the cached result when the same inputs occur again." }
        ],
        bestPractices: [
          "Use useMemo only for computationally expensive calculations (like sorting large datasets).",
          "Ensure the dependency array contains all variables referenced inside the useMemo callback."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [query, setQuery] = React.useState('');
  const [renders, setRenders] = React.useState(0);

  // Simulated expensive calculation
  const memoizedVal = React.useMemo(() => {
    console.log('Running expensive calculation...');
    return query.toUpperCase();
  }, [query]); // Re-runs only when query state changes

  return (
    <div style={{ padding: '16px' }}>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Query" />
      <p>Result: {memoizedVal}</p>
      <p>Render count: {renders}</p>
      <button onClick={() => setRenders(prev => prev + 1)}>Trigger Render</button>
    </div>
  );
};`
      },
      assessment: "Write a useMemo statement that filters a products array based on a search state variable."
    },
    {
      id: "w5-d1-t4",
      title: "4. Dependency Array Guidelines",
      customComponent: "RefMemoViz",
      explanation: "Just like `useEffect`, hooks like `useMemo` require a dependency array. Skipping dependencies can cause components to use stale values, while incorrect dependencies trigger unnecessary calculations.",
      progression: [
        {
          level: "easy",
          title: "Tracking Dependencies",
          content: "Include every state or prop variable referenced inside the `useMemo` callback in the dependency array."
        },
        {
          level: "intermediate",
          title: "Handling Object Dependencies",
          content: "Avoid using objects directly in dependency arrays, as object references change on every render, triggering recalculations. Destructure properties or use primitives instead."
        },
        {
          level: "advanced",
          title: "Stale Closure Debugging",
          content: "If a dependency is missing, the memoized callback retains reference bindings from the previous render, causing stale closure bugs."
        }
      ],
      detailedReference: {
        summary: "Dependency arrays match current variables with cached states, re-evaluating calculations only when tracked variables change.",
        keyConcepts: [
          { term: "Stale Closure", definition: "A JS closure that references variables from a previous render cycle, leading to outdated state in the UI." }
        ],
        bestPractices: [
          "Double check that all variables referenced in the memoized callback are declared in the dependency array.",
          "Use primitive values in dependency arrays to avoid reference comparison issues."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [multiplier, setMultiplier] = React.useState(2);
  const [number, setNumber] = React.useState(5);

  // Correct dependency array: tracks both multiplier and number
  const product = React.useMemo(() => {
    return number * multiplier;
  }, [number, multiplier]);

  return (
    <div style={{ padding: '16px' }}>
      <p>Result: {product}</p>
      <button onClick={() => setMultiplier(prev => prev + 1)}>Multiplier (+1)</button>
      <button onClick={() => setNumber(prev => prev + 5)}>Number (+5)</button>
    </div>
  );
};`
      },
      assessment: "What is the consequence of omitting a referenced state variable from a useMemo dependency array?"
    },
    {
      id: "w5-d1-t5",
      title: "5. When to Optimize: Cost of Hooks",
      customComponent: "RefMemoViz",
      explanation: "Optimizations have overhead. Overusing `useMemo` or `useCallback` for cheap operations can make your application slower. Learn when to optimize and when to write standard code.",
      progression: [
        {
          level: "easy",
          title: "Overhead Cost",
          content: "React must allocate memory for dependency arrays and run comparison checks on every render. For cheap operations (like adding numbers), the overhead exceeds the optimization benefit."
        },
        {
          level: "intermediate",
          title: "Cheap vs Expensive Checks",
          content: "Only optimize expensive operations, such as sorting large lists (hundreds of rows), complex string parsing, or heavy calculations."
        },
        {
          level: "advanced",
          title: "Referential Equality Cases",
          content: "Use memoization only when child components rely on referential equality (`React.memo`) to skip rendering when props change."
        }
      ],
      detailedReference: {
        summary: "Only optimize computationally expensive operations or referential props, avoiding optimization checks on cheap calculations.",
        keyConcepts: [
          { term: "Optimization Overhead", definition: "The performance cost of executing validation checks and tracking dependencies in React hooks." }
        ],
        bestPractices: [
          "Do not optimize simple string joins or basic math operations.",
          "Measure performance before and after optimization to verify the benefit."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `// Anti-pattern: Optimizing simple operations
// The overhead of useMemo exceeds the cost of joining two strings!
const App = () => {
  const [first, setFirst] = React.useState('Alex');
  const [last, setLast] = React.useState('Carter');

  const fullName = React.useMemo(() => {
    return \`\${first} \${last}\`;
  }, [first, last]); // Too cheap to optimize!

  return <p>{fullName}</p>;
};`
      },
      assessment: "Describe a scenario where using useMemo would be considered an anti-pattern."
    },
    {
      id: "w5-d1-t6",
      title: "6. Assignment Task: Search filter index dashboard",
      explanation: "Create a search portal for a list of course modules. The app must use `useRef` to focus the search input automatically on mount. Use `useMemo` to filter modules dynamically based on the search query, showing whether results are cached or recalculated in real-time. Show the query performance in the UI.",
      progression: [
        {
          level: "easy",
          title: "Focus Input on Mount",
          content: "Use `useRef` and `useEffect` to focus the search input automatically when the component mounts."
        },
        {
          level: "intermediate",
          title: "Implement Memoized Filter",
          content: "Create a list of mock modules. Use `useMemo` to filter modules dynamically based on the search query, avoiding recalculations on unrelated renders."
        },
        {
          level: "advanced",
          title: "Track Performance",
          content: "Add a button to trigger unrelated state updates. Display calculation performance in the UI, demonstrating how useMemo caches results during unrelated re-renders."
        }
      ],
      codeTemplate: {
        html: "",
        css: `/* Custom Dashboard Styles */
.search-dashboard {
  max-width: 450px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
  background: #1e293b;
  color: white;
  padding: 24px;
  border-radius: 12px;
}
.search-input {
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #0f172a;
  color: white;
  margin-bottom: 16px;
  outline: none;
}
.search-input:focus {
  border-color: #00d1d1;
}
.metric-box {
  background: #0f172a;
  padding: 10px 16px;
  border-radius: 6px;
  border: 1px solid #334155;
  font-size: 0.8rem;
  margin-bottom: 16px;
}
.module-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.module-card {
  background: #0f172a;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #334155;
  font-size: 0.85rem;
}`,
        js: `const App = () => {
  // 1. Dataset representing course modules
  const dataset = React.useMemo(() => {
    return [
      'w1-d1: Web Stack Fundamentals & Setup',
      'w1-d2: HTML tags and layout bounds',
      'w2-d1: CSS Grid & Flexbox responsive structures',
      'w3-d1: Advanced OOP Classes & prototype bindings',
      'w4-d1: React props & components data pipelines',
      'w4-d2: State useState setters render triggers',
      'w4-d5: useEffect side effects dynamic APIs',
      'w4-d6: React Router navigation routes SPAs'
    ];
  }, []);

  const [query, setQuery] = React.useState('');
  const [dummyRenderVal, setDummyRenderVal] = React.useState(0);
  
  // 2. Ref to focus input
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 3. useMemo to filter list dynamically
  const filteredModules = React.useMemo(() => {
    console.log('Filtering modules dataset...');
    return dataset.filter(item => 
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, dataset]); // Re-runs only when query updates

  return (
    <div className="search-dashboard">
      <h3>Course Modules Portal</h3>
      
      <input 
        type="text" 
        ref={inputRef}
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="search-input"
        placeholder="Type to search modules..."
      />

      <div className="metric-box">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Search query: <strong>{query || 'All'}</strong></span>
          <span>Filtered: <strong>{filteredModules.length} found</strong></span>
        </div>
      </div>

      <div className="module-list">
        {filteredModules.map((m, idx) => (
          <div key={idx} className="module-card">
            {m}
          </div>
        ))}
      </div>

      <button 
        onClick={() => setDummyRenderVal(prev => prev + 1)}
        className="submit-form-btn"
        style={{ marginTop: '16px', width: '100%', background: '#475569' }}
      >
        Force Unrelated Render ({dummyRenderVal})
      </button>
    </div>
  );
};`
      },
      assessment: "Checklist:\n1. Initialize a search input ref and focus it on mount inside `useEffect`.\n2. Wrap list filtering in `useMemo`, using the search query state as a dependency.\n3. Add a button to trigger unrelated re-renders, verifying that the list filter does not re-evaluate.\n4. Display the filtered list dynamically on screen."
    },
    {
      id: "w5-d1-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "DOM refs focus steps, useMemo caching flowcharts, optimization latency benchmarks, and solutions for the search filter dashboard code.",
        duration: "15 mins",
        resources: [
          "React Optimization presentation slides (PDF)",
          "Search Filter Solutions (ZIP)"
        ]
      }
    }
  ]
};
