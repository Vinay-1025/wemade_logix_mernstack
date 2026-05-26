export const w5d2Data = {
  dayId: "w5-d2",
  dayTitle: "Day 2: Context API & Custom Hooks",
  topics: [
    {
      id: "w5-d2-t1",
      title: "1. Understanding Prop-Drilling & Global State",
      customComponent: "ContextCustomHooksViz",
      explanation: "Prop-drilling is the process of passing data through multiple layers of nested child components just to reach a deeply nested component that needs it. This leads to bloated, hard-to-maintain code.",
      progression: [
        {
          level: "easy",
          title: "The Prop-Drilling Problem",
          content: "If a component at the bottom of the tree needs a state value from the top component, you must pass that value as a prop through every intermediate component, even if they don't use it."
        },
        {
          level: "intermediate",
          title: "Maintenance Overhead",
          content: "Prop-drilling makes components tightly coupled. Changing a variable name or data structure requires updating prop declarations in dozens of intermediate files, making refactoring difficult."
        },
        {
          level: "advanced",
          title: "Global State Management",
          content: "Global state solutions (like Context API or Redux) resolve this issue by storing state in a central provider, allowing any component to subscribe and read values directly."
        }
      ],
      detailedReference: {
        summary: "Prop-drilling couples intermediate components tightly. Global state stores values centrally, allowing components to read data directly.",
        keyConcepts: [
          { term: "Prop-Drilling", definition: "Passing props down through multiple component levels to reach a nested component that needs the data." }
        ],
        bestPractices: [
          "Avoid prop-drilling for global configurations like themes, user sessions, or localization settings.",
          "Do not put all component state in global context; keep UI state local to where it is used."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `// Demo: Prop-drilling anti-pattern
// App holds theme state -> passes to Layout -> passes to Card
const App = () => {
  const [theme] = React.useState('dark');
  return <Layout theme={theme} />;
};

const Layout = ({ theme }) => {
  return <ContentGrid theme={theme} />;
};

const ContentGrid = ({ theme }) => {
  return <Card theme={theme} />;
};

const Card = ({ theme }) => {
  return <div style={{ background: theme === 'dark' ? '#333' : '#fff' }}>Card Content</div>;
};`
      },
      assessment: "What is prop-drilling and why is it considered a bad practice in React?"
    },
    {
      id: "w5-d2-t2",
      title: "2. The Context API: createContext & Provider",
      customComponent: "ContextCustomHooksViz",
      explanation: "The Context API provides a way to pass data down the component tree without having to pass props manually at every level. It uses `createContext` to define state, and a `<Context.Provider>` wrapper to share it.",
      progression: [
        {
          level: "easy",
          title: "Creating Context",
          content: "Create context using `createContext(defaultValue)`. This returns an object containing a Provider and a Consumer component."
        },
        {
          level: "intermediate",
          title: "The Context Provider",
          content: "Wrap parent layout components in `<Context.Provider value={state}>`. Any child component nested inside this provider can subscribe and access the `value` directly."
        },
        {
          level: "advanced",
          title: "Provider State Binding",
          content: "Bind React state variables and setters to the provider value object (e.g. `value={{ theme, setTheme }}`). This allows consumers to read state and trigger updates globally."
        }
      ],
      detailedReference: {
        summary: "createContext defines a global state container, and the Provider wrapper shares values down the component tree.",
        keyConcepts: [
          { term: "Context Provider", definition: "A React component that provides state values to all its nested descendant components." }
        ],
        bestPractices: [
          "Place Context Providers at the top of your component hierarchy (e.g. in App.js) to make state available globally.",
          "Keep provider value references stable using useMemo to prevent unnecessary consumer re-renders."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `// 1. Create Context
const ThemeContext = React.createContext('light');

const App = () => {
  // 2. Wrap tree in Provider, passing active state values
  return (
    <ThemeContext.Provider value="dark">
      <Layout />
    </ThemeContext.Provider>
  );
};

const Layout = () => {
  return <ProfileCard />;
};

const ProfileCard = () => {
  // 3. Child subscribes to ThemeContext directly
  return (
    <ThemeContext.Consumer>
      {theme => (
        <div style={{ background: theme === 'dark' ? '#0f172a' : '#f8fafc', color: theme === 'dark' ? 'white' : 'black', padding: '16px' }}>
          Profile Layout Card
        </div>
      )}
    </ThemeContext.Consumer>
  );
};`
      },
      assessment: "Write a React statement that creates a UserContext container with a default value of null."
    },
    {
      id: "w5-d2-t3",
      title: "3. Consuming Context with useContext Hook",
      customComponent: "ContextCustomHooksViz",
      explanation: "The `useContext` hook allows functional components to read values from a Context container directly, avoiding complex nesting and Consumer callback syntax.",
      progression: [
        {
          level: "easy",
          title: "Consuming Global Context",
          content: "Import the hook and your context object, then call `useContext(MyContext)` to read the current context value directly in your functional component."
        },
        {
          level: "intermediate",
          title: "Triggering Global Updates",
          content: "Destructure state setters from context (e.g., `const { theme, setTheme } = useContext(ThemeContext)`), allowing components to update global state from anywhere in the tree."
        },
        {
          level: "advanced",
          title: "Multiple Context Subscriptions",
          content: "Subscribe a single component to multiple contexts (e.g., ThemeContext, UserSessionContext) to render complex, context-driven layouts."
        }
      ],
      detailedReference: {
        summary: "The useContext hook reads values from Context containers directly in functional components, keeping render flows clean.",
        keyConcepts: [
          { term: "useContext Hook", definition: "A React hook that reads the current value of a Context container directly in a functional component." }
        ],
        bestPractices: [
          "Use the useContext hook for clean, readable consumer components.",
          "Keep contexts focused and split (e.g. separate ThemeContext from AuthContext) to prevent unnecessary re-renders."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const ThemeContext = React.createContext(null);

const App = () => {
  const [theme, setTheme] = React.useState('dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Navbar />
    </ThemeContext.Provider>
  );
};

const Navbar = () => {
  // Consume context values directly using hook
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'dark' ? '#333' : '#eee', padding: '10px' }}>
      <span>Theme: {theme}</span>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ marginLeft: '10px' }}>
        Toggle Theme
      </button>
    </div>
  );
};`
      },
      assessment: "Write a React statement to consume values from an AuthContext container using the useContext hook."
    },
    {
      id: "w5-d2-t4",
      title: "4. Designing Custom Hooks",
      customComponent: "ContextCustomHooksViz",
      explanation: "Custom hooks are JavaScript functions whose names start with `use`. They allow you to extract component logic into reusable functions, sharing stateful logic across multiple components.",
      progression: [
        {
          level: "easy",
          title: "Extracting Hook Logic",
          content: "Write a function starting with `use` (e.g. `useToggle`). Call standard React hooks (like `useState`) inside your custom hook to manage state."
        },
        {
          level: "intermediate",
          title: "Returning State and Setters",
          content: "Return state values and setter functions from your custom hook (e.g., `return [value, toggleValue]`) to make them available to components."
        },
        {
          level: "advanced",
          title: "Isolating Side Effects",
          content: "Create custom hooks to handle complex side effects, such as API requests (`useFetch`) or window event listeners (`useWindowSize`), keeping components clean."
        }
      ],
      detailedReference: {
        summary: "Custom hooks isolate reusable stateful logic into clean, standalone helper functions.",
        keyConcepts: [
          { term: "Custom Hook", definition: "A reusable JavaScript function that can call other React hooks to share stateful logic." }
        ],
        bestPractices: [
          "Always start custom hook names with the 'use' prefix (e.g. `useFetch`, `useAuth`).",
          "Ensure custom hooks remain pure and focus on sharing logic rather than UI rendering."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `// Custom hook to toggle boolean states
const useToggle = (initialValue = false) => {
  const [value, setValue] = React.useState(initialValue);
  const toggle = () => setValue(prev => !prev);
  return [value, toggle];
};

const App = () => {
  // Use custom hook in component
  const [isVisible, toggleVisibility] = useToggle(false);

  return (
    <div style={{ padding: '16px' }}>
      <button onClick={toggleVisibility}>
        {isVisible ? 'Hide' : 'Show'} Details
      </button>
      {isVisible && <p>Toggled visibility successfully!</p>}
    </div>
  );
};`
      },
      assessment: "Write a custom hook called useCounter that manages a numeric value and returns increment, decrement, and reset functions."
    },
    {
      id: "w5-d2-t5",
      title: "5. Context Performance & Re-render Cycles",
      customComponent: "ContextCustomHooksViz",
      explanation: "When a context provider's value changes, all components that consume that context re-render automatically. To build performant apps, optimize provider value references.",
      progression: [
        {
          level: "easy",
          title: "Consumer Re-renders",
          content: "Every consumer component re-renders when the context value changes, even if it only uses a property that didn't change."
        },
        {
          level: "intermediate",
          title: "Reference Stability",
          content: "If you pass an object literal directly to the provider (e.g. `value={{ user, theme }}`), a new object is created on every render, triggering consumer updates even if values didn't change."
        },
        {
          level: "advanced",
          title: "Optimizing Providers",
          content: "Use `useMemo` to memoize the provider value object, ensuring context values change only when their dependencies update."
        }
      ],
      detailedReference: {
        summary: "Optimize context provider values using useMemo to prevent unnecessary consumer re-renders caused by reference changes.",
        keyConcepts: [
          { term: "Render Prop Propagation", definition: "The update cycle where React triggers renders in all descendants consuming updated context values." }
        ],
        bestPractices: [
          "Split global state into separate, focused contexts to limit re-renders.",
          "Memoize provider value objects using useMemo to maintain reference stability."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [user, setUser] = React.useState('Alex');
  const [theme, setTheme] = React.useState('dark');

  // Stable value reference prevents unnecessary re-renders
  const providerValue = React.useMemo(() => ({
    user,
    theme,
    setTheme
  }), [user, theme]); // Re-runs only when user or theme updates

  return (
    <ThemeContext.Provider value={providerValue}>
      <Layout />
    </ThemeContext.Provider>
  );
};`
      },
      assessment: "How can you prevent a Context Provider from triggering unnecessary re-renders in consumer components?"
    },
    {
      id: "w5-d2-t6",
      title: "6. Assignment Task: Multi-Theme Dashboard Portal",
      explanation: "Build a multi-theme dashboard portal using the Context API. The app must manage theme selection (light, dark, cyberpunk) in global Context, wrap components in the Provider, and consume values using the `useContext` hook. Additionally, implement a custom hook `useLocalStorage` to persist the selected theme in the browser's storage.",
      progression: [
        {
          level: "easy",
          title: "Create Theme Context",
          content: "Create a ThemeContext container. Set up a Provider that wraps the dashboard layout and manages the active theme in state."
        },
        {
          level: "intermediate",
          title: "Consume Context & Apply Themes",
          content: "Use the `useContext` hook to consume theme values inside dashboard components, applying conditional CSS classes based on the active theme."
        },
        {
          level: "advanced",
          title: "Create useLocalStorage Custom Hook",
          content: "Implement a `useLocalStorage` custom hook to persist the theme state in `localStorage` across page reloads."
        }
      ],
      codeTemplate: {
        html: "",
        css: `/* Dashboard Themes Styles */
.dashboard-box {
  padding: 24px;
  border-radius: 12px;
  transition: all 0.3s ease;
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid #e2e8f0;
}
.dashboard-box.light {
  background: #f8fafc;
  color: #0f172a;
}
.dashboard-box.dark {
  background: #0f172a;
  color: #f8fafc;
  border-color: #1e293b;
}
.dashboard-box.cyberpunk {
  background: #090d16;
  color: #00d1d1;
  border-color: #00d1d1;
  box-shadow: 0 0 10px rgba(0,209,209,0.3);
}
.select-theme {
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  border-radius: 6px;
  background: #1e293b;
  color: white;
  border: 1px solid #334155;
}`,
        js: `// 1. Create Theme Context
const ThemeContext = React.createContext(null);

// 2. Custom Hook to persist state in localStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

// 3. Parent Component providing Context
const App = () => {
  const [theme, setTheme] = useLocalStorage('portal-theme', 'dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <DashboardPanel />
    </ThemeContext.Provider>
  );
};

// 4. Child Component consuming Context
const DashboardPanel = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <div className={\`dashboard-box \${theme}\`}>
      <h3>Wemade Dashboard Portal</h3>
      <p>Theme selection is shared globally via React Context API.</p>
      
      <label>Active Theme Context:</label>
      <select 
        value={theme} 
        onChange={e => setTheme(e.target.value)}
        className="select-theme"
      >
        <option value="light">Light Mode</option>
        <option value="dark">Dark Mode</option>
        <option value="cyberpunk">Cyberpunk Neon Mode</option>
      </select>
    </div>
  );
};`
      },
      assessment: "Checklist:\n1. Create a ThemeContext container using `createContext()`.\n2. Wrap the application tree in the Provider, passing the active theme and setter in value.\n3. Consume the context using the `useContext` hook in child components.\n4. Implement a custom hook `useLocalStorage` to persist the selected theme state."
    },
    {
      id: "w5-d2-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Prop-drilling bypass trees, context rendering updates traces, custom hooks state lifecycles, and solutions for the dashboard portal code.",
        duration: "15 mins",
        resources: [
          "Context API & Hooks presentation slides (PDF)",
          "Dashboard Portal Solutions (ZIP)"
        ]
      }
    }
  ]
};
