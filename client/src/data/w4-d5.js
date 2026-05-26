export const w4d5Data = {
  dayId: "w4-d5",
  dayTitle: "Day 5: Side Effects & the useEffect Hook",
  topics: [
    {
      id: "w4-d5-t1",
      title: "1. What are Side Effects in React?",
      customComponent: "EffectLifecycleViz",
      explanation: "A side effect is any operation that affects something outside the scope of the component function being executed, such as fetching data from an API, setting up timers, manual DOM updates, or subscribing to external events.",
      progression: [
        {
          level: "easy",
          title: "Pure vs Impure Functions",
          content: "React components should be pure functions: they take props and return JSX. Performing operations like fetching data or setting timers directly inside the render flow is impure and causes performance issues."
        },
        {
          level: "intermediate",
          title: "The useEffect Hook",
          content: "React provides the `useEffect` hook to execute side effects safely. It defers effect execution until after the component has rendered to the DOM, keeping rendering fast."
        },
        {
          level: "advanced",
          title: "Synchronizing with External Systems",
          content: "Use `useEffect` to synchronize your component state with external systems, such as database streams, WebSockets, or localStorage APIs."
        }
      ],
      detailedReference: {
        summary: "Use the useEffect hook to handle side effects (APIs, timers) safely outside the main rendering path.",
        keyConcepts: [
          { term: "Side Effect", definition: "Operations that interact with external state outside the scope of the current function component rendering." }
        ],
        bestPractices: [
          "Never write side effects (like fetch calls or event handlers) directly in the component's main rendering path.",
          "Keep side effects isolated and focused in dedicated useEffect hooks."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [count, setCount] = React.useState(0);

  // Synchronize document title with count state (a side effect!)
  React.useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <div style={{ padding: '16px', textAlign: 'center' }}>
      <p>Document Title matches count state!</p>
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment Count ({count})
      </button>
    </div>
  );
};`
      },
      assessment: "Give three examples of operations considered side effects in React applications."
    },
    {
      id: "w4-d5-t2",
      title: "2. The Dependency Array Scoping",
      customComponent: "EffectLifecycleViz",
      explanation: "The second argument of `useEffect` is the dependency array. It controls when the effect runs by specifying the state or prop variables the effect depends on.",
      progression: [
        {
          level: "easy",
          title: "No Dependency Array",
          content: "If you omit the dependency array completely, the effect will run after **every single render** of the component. This is rarely what you want and can cause infinite render loops."
        },
        {
          level: "intermediate",
          title: "Empty Dependency Array ([])",
          content: "Passing an empty dependency array `[]` tells React to run the effect **only once**, immediately after the component mounts. This is ideal for initial API fetches and boot configurations."
        },
        {
          level: "advanced",
          title: "Active Dependency Variables",
          content: "Passing variables in the array (e.g. `[userId]`) tells React to run the effect on mount, and then **only when the specified variables change**."
        }
      ],
      detailedReference: {
        summary: "The dependency array controls effect execution cycles: no array runs on every render, empty array runs on mount, and variable arrays run on changes.",
        keyConcepts: [
          { term: "Dependency Tracking", definition: "React comparing dependency array values to decide if it needs to re-run an effect." }
        ],
        bestPractices: [
          "Always specify a dependency array to avoid infinite rendering loops.",
          "Include all variables referenced inside the effect in the dependency array to prevent stale closure bugs."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [userId, setUserId] = React.useState('1');
  const [log, setLog] = React.useState('');

  React.useEffect(() => {
    // This effect runs only when userId changes
    setLog(prev => prev + \`\\nRunning effect for User #\${userId}...\`);
  }, [userId]); // Dependency array tracks userId

  return (
    <div style={{ padding: '16px' }}>
      <button onClick={() => setUserId('1')} style={{ marginRight: '8px' }}>User 1</button>
      <button onClick={() => setUserId('2')}>User 2</button>
      <pre style={{ marginTop: '12px', background: '#eee', padding: '10px' }}>{log}</pre>
    </div>
  );
};`
      },
      assessment: "What happens if you omit the dependency array in a useEffect hook that calls a state setter?"
    },
    {
      id: "w4-d5-t3",
      title: "3. Component Lifecycle: Mount, Update, Unmount",
      customComponent: "EffectLifecycleViz",
      explanation: "Functional components have a lifecycle: they Mount (are inserted into the DOM), Update (re-render when state/props change), and Unmount (are removed from the DOM).",
      progression: [
        {
          level: "easy",
          title: "Mounting Phase",
          content: "The component mounts when it renders for the first time. Effects with empty dependency arrays `[]` run at the end of this phase."
        },
        {
          level: "intermediate",
          title: "Updating Phase",
          content: "When state or props change, the component re-renders. Effects whose dependencies have changed will run again after the DOM updates."
        },
        {
          level: "advanced",
          title: "Unmounting Phase",
          content: "The component unmounts when it is removed from the screen. React runs cleanup functions at this phase to prevent memory leaks."
        }
      ],
      detailedReference: {
        summary: "useEffect hooks provide a unified API to handle mounting, updating, and unmounting events in functional components.",
        keyConcepts: [
          { term: "Lifecycle Hooks", definition: "The phases a component goes through: Mount, Update, and Unmount." }
        ],
        bestPractices: [
          "Use dedicated effects for unrelated logic to keep code modular and readable.",
          "Perform cleanup operations (like clearing timers) in effects to avoid memory leaks."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [showTimer, setShowTimer] = React.useState(true);

  return (
    <div style={{ padding: '16px' }}>
      <button onClick={() => setShowTimer(!showTimer)}>
        {showTimer ? 'Destroy Timer' : 'Mount Timer'}
      </button>

      {showTimer && <TimerComponent />}
    </div>
  );
};

const TimerComponent = () => {
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    console.log('TimerComponent Mounted');
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Unmount cleanup function
    return () => {
      console.log('TimerComponent Unmounted');
      clearInterval(interval);
    };
  }, []); // Empty array runs on mount, cleanup runs on unmount

  return <p style={{ marginTop: '12px' }}>Seconds elapsed: {seconds}</p>;
};`
      },
      assessment: "In which lifecycle phase does a useEffect cleanup function run?"
    },
    {
      id: "w4-d5-t4",
      title: "4. Fetching Data from REST APIs",
      customComponent: "EffectLifecycleViz",
      explanation: "To fetch data from external APIs in React, make fetch requests inside a `useEffect` hook, store the response in state, and update the UI once the request resolves.",
      progression: [
        {
          level: "easy",
          title: "Basic API Fetching",
          content: "Use standard `fetch()` inside a `useEffect` on mount (`[]`), parse the response JSON, and save the result to state."
        },
        {
          level: "intermediate",
          title: "Handling Loading & Errors",
          content: "Add state variables to track loading (loading spinner) and errors. Show a spinner while the fetch is pending, and error messages if the request fails."
        },
        {
          level: "advanced",
          title: "Dynamic Query Fetches",
          content: "Pass dynamic parameters (like search terms or item IDs) to the dependency array, triggering a new fetch automatically when parameter states change."
        }
      ],
      detailedReference: {
        summary: "Fetch API data inside useEffect hooks, updating state variables to trigger loading and success layouts.",
        keyConcepts: [
          { term: "State-driven Fetching", definition: "Triggering API requests based on state changes, storing response data in state to update the UI." }
        ],
        bestPractices: [
          "Always handle loading and error states to provide a clean user experience.",
          "Use cleanup functions to cancel pending requests when dependencies change or the component unmounts."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Fetch user profiles from JSONPlaceholder dummy API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data.slice(0, 3)); // Limit to first 3 users
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []); // Run fetch once on mount

  if (loading) return <p>Loading user list...</p>;

  return (
    <div style={{ padding: '16px' }}>
      <h4>API Users Profiles:</h4>
      {users.map(u => (
        <div key={u.id} style={{ margin: '8px 0', borderBottom: '1px solid #ccc', paddingBottom: '4px' }}>
          <strong>{u.name}</strong> - Email: {u.email}
        </div>
      ))}
    </div>
  );
};`
      },
      assessment: "Write a useEffect block that fetches data from https://api.com/items only once when the component mounts."
    },
    {
      id: "w4-d5-t5",
      title: "5. Effect Cleanups: Preventing Memory Leaks",
      customComponent: "EffectLifecycleViz",
      explanation: "If your effect sets up subscriptions, intervals, event listeners, or pending fetch requests, you must return a cleanup function to clean them up when the component updates or unmounts, preventing memory leaks.",
      progression: [
        {
          level: "easy",
          title: "Returning a Cleanup Function",
          content: "To define a cleanup, return a callback function from your `useEffect` block (e.g. `return () => { clearInterval(timer); }`)."
        },
        {
          level: "intermediate",
          title: "Clearing Subscriptions & Listeners",
          content: "Ensure all event listeners (`window.addEventListener`) and timers (`setInterval`) set up inside effects are cleared in the cleanup function."
        },
        {
          level: "advanced",
          title: "Cancelling Pending API Fetches",
          content: "Use `AbortController` in your cleanup function to cancel pending network requests if a user navigates away or changes dependencies, saving network bandwidth."
        }
      ],
      detailedReference: {
        summary: "Return cleanup functions to clear timers, listeners, and cancel pending network requests on component updates or unmount.",
        keyConcepts: [
          { term: "AbortController", definition: "A browser API that allows you to cancel pending network requests dynamically." }
        ],
        bestPractices: [
          "Always clean up intervals, timers, and event listeners in the cleanup function.",
          "Use AbortController to cancel pending fetches when dependency states update rapidly."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Add listener on mount
    window.addEventListener('mousemove', handleMove);

    // Cleanup: remove listener on unmount
    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, []); // Run listener once on mount

  return (
    <div style={{ padding: '16px', height: '150px', background: '#f1f5f9' }}>
      <p>Move mouse over preview area:</p>
      <strong>Mouse X: {position.x}, Mouse Y: {position.y}</strong>
    </div>
  );
};`
      },
      assessment: "Why is it important to clear setInterval timers in the useEffect cleanup function?"
    },
    {
      id: "w4-d5-t6",
      title: "6. Assignment Task: API Profiles Search Directory",
      explanation: "Create a user directory search portal. Fetch user profiles from `https://jsonplaceholder.typicode.com/users` inside `useEffect` on mount. Display profiles in a grid, and implement a search filter to filter profiles in real-time. Make sure to handle loading and error states, and clear timers or subscriptions in the cleanup function.",
      progression: [
        {
          level: "easy",
          title: "Fetch Profiles List",
          content: "Fetch user profiles from `https://jsonplaceholder.typicode.com/users` on mount, saving the result to a users state array."
        },
        {
          level: "intermediate",
          title: "Handle Load & Search",
          content: "Show a loading indicator while fetching data. Add a text input to filter profiles dynamically based on username search."
        },
        {
          level: "advanced",
          title: "Cleanups & Refinements",
          content: "Handle fetch errors, display profile details in card elements, and ensure any timers or controllers are cleaned up on unmount."
        }
      ],
      codeTemplate: {
        html: "",
        css: `/* User Directory CSS Layout */
.directory-box {
  max-width: 500px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
  background: #1e293b;
  color: white;
  padding: 24px;
  border-radius: 12px;
}
.search-field {
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #0f172a;
  color: white;
  margin-bottom: 16px;
  outline: none;
}
.search-field:focus {
  border-color: #00d1d1;
}
.profile-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.profile-card {
  background: #0f172a;
  border: 1px solid #334155;
  padding: 12px 16px;
  border-radius: 8px;
}
.profile-card h4 {
  margin: 0 0 4px 0;
  color: #0ea5e9;
}
.profile-card p {
  margin: 2px 0;
  font-size: 0.8rem;
  color: #94a3b8;
}
.loader {
  text-align: center;
  color: #cbd5e1;
  padding: 20px;
}`,
        js: `const App = () => {
  // 1. Declare state variables
  const [users, setUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // 2. Fetch users inside useEffect on mount
  React.useEffect(() => {
    let active = true;
    
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch user directory profiles.');
        }
        return res.json();
      })
      .then(data => {
        if (active) {
          setUsers(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (active) {
          setError(err.message);
          setLoading(false);
        }
      });

    // Cleanup function
    return () => {
      active = false;
    };
  }, []);

  // 3. Derived State: Filtered profiles
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="directory-box">
      <h3>Student Profiles Directory</h3>
      
      <input 
        type="text" 
        className="search-field"
        placeholder="Search profiles by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <div className="loader">Loading student database...</div>}
      
      {error && <div style={{ color: '#f43f5e', textAlign: 'center', padding: '10px' }}>Error: {error}</div>}

      {!loading && !error && (
        <div className="profile-grid">
          {filteredUsers.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#64748b' }}>No profiles match your search query.</div>
          ) : (
            filteredUsers.map(user => (
              <div key={user.id} className="profile-card">
                <h4>{user.name}</h4>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Website: {user.website}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};`
      },
      assessment: "Checklist:\n1. Initialize state variables for users, search term, loading status, and errors.\n2. Fetch profiles from `https://jsonplaceholder.typicode.com/users` inside `useEffect` on mount.\n3. Return a cleanup function inside the effect to prevent memory leaks on unmount.\n4. Render profile cards in a list, using search terms to filter profiles dynamically."
    },
    {
      id: "w4-d5-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Side effects dependency mappings, cleanup routines checklists, loading/error states models, and solutions for the directory search code.",
        duration: "15 mins",
        resources: [
          "Side effects presentation slides (PDF)",
          "Profiles Search Solutions (ZIP)"
        ]
      }
    }
  ]
};
