export const w5d3Data = {
  dayId: "w5-d3",
  dayTitle: "Day 3: Complete React Integration Project",
  topics: [
    {
      id: "w5-d3-t1",
      title: "1. Structuring Clean React Projects",
      customComponent: "MiniProjectIntegrationViz",
      explanation: "Learn how to organize files and folders in professional React codebases, structuring components, hooks, assets, and context providers for scalability and maintainability.",
      progression: [
        {
          level: "easy",
          title: "Modular Files Division",
          content: "Separate reusable UI widgets into their own files under a `components/` folder, importing them into page containers to keep code organized."
        },
        {
          level: "intermediate",
          title: "Scoping Assets and Hooks",
          content: "Store custom hooks in a `hooks/` directory, global configurations in `context/`, static assets in `assets/`, and helper utilities in `utils/`."
        },
        {
          level: "advanced",
          title: "Feature-based Structures",
          content: "Group related components, state hooks, and style assets together by feature (e.g. `features/user-profile/` or `features/task-board/`) in large codebases."
        }
      ],
      detailedReference: {
        summary: "Organize files and folders systematically in React projects, features-division, keeping modules decoupled and easy to test.",
        keyConcepts: [
          { term: "Project Structure", definition: "The file and folder organization scheme used to arrange codebase files systematically." }
        ],
        bestPractices: [
          "Keep components small, focused, and single-purpose.",
          "Use relative imports or alias paths to keep import statements clean."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `// Professional directory structure example:
// src/
// ├── assets/          - Static images, fonts
// ├── components/      - Reusable UI elements (Button, Card)
// ├── context/         - React Context containers (AuthContext)
// ├── hooks/           - Custom React hooks (useFetch)
// ├── pages/           - Main route components (Home, Dashboard)
// ├── App.jsx          - Global routing and providers
// └── main.jsx         - React DOM entry mount point`
      },
      assessment: "Describe the benefits of using a feature-based folder structure over a generic type-based folder structure in large React projects."
    },
    {
      id: "w5-d3-t2",
      title: "2. Combining React Hooks: The Complete Ecosystem",
      customComponent: "MiniProjectIntegrationViz",
      explanation: "Build complex web applications by combining React hooks, using State to store values, Props to pass configuration parameters, Context to share global state, Refs to access DOM nodes, and Effects to sync with external systems.",
      progression: [
        {
          level: "easy",
          title: "State and Props Loops",
          content: "Store state values in parent components, passing variables and update callbacks down to child components as props."
        },
        {
          level: "intermediate",
          title: "Focusing and Syncing DOM",
          content: "Trigger DOM adjustments using refs inside `useEffect` blocks, sync state variables with window dimensions or APIs, and cleanup listeners on unmount."
        },
        {
          level: "advanced",
          title: "Combining Context with Effects",
          content: "Fetch configuration details inside context providers, saving response payloads in global state variables and making them available to all consumers automatically."
        }
      ],
      detailedReference: {
        summary: "Use React hooks together in functional components to manage local state, global context, DOM operations, and side effects.",
        keyConcepts: [
          { term: "React Hooks Ecosystem", definition: "The collection of built-in React hooks (useState, useEffect, useContext, useRef, useMemo) working together." }
        ],
        bestPractices: [
          "Follow the Rules of Hooks: call hooks only at the top level of your component function.",
          "Design clean interfaces between components using props and state."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const AuthContext = React.createContext(null);

const App = () => {
  const [user, setUser] = React.useState({ name: 'Alex' });
  const inputRef = React.useRef(null);

  // Sync effect
  React.useEffect(() => {
    console.log('App loaded for user:', user.name);
    if (inputRef.current) inputRef.current.focus();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div style={{ padding: '16px' }}>
        <input ref={inputRef} type="text" placeholder="Update profile username..." />
        <ProfileDetails />
      </div>
    </AuthContext.Provider>
  );
};

const ProfileDetails = () => {
  const { user } = React.useContext(AuthContext);
  return <h3>User: {user.name}</h3>;
};`
      },
      assessment: "Explain how to focus a text input automatically when a user session changes inside a global context provider."
    },
    {
      id: "w5-d3-t3",
      title: "3. Mini Project: Interactive Collaboration Board",
      customComponent: "MiniProjectIntegrationViz",
      explanation: "Combine all your React skills to build an interactive workspace board application (like Trello or Jira board) featuring theme switching (via Context), dynamic cards addition (using State), auto focus inputs (using Refs), API syncing (using useEffect), and filtered search queries (optimized using useMemo).",
      progression: [
        {
          level: "easy",
          title: "Set up Context and Layout",
          content: "Create a ThemeContext to toggle light/dark modes, and render a responsive layout with a header, search input, and task listing grid."
        },
        {
          level: "intermediate",
          title: "Implement Task Management",
          content: "Manage tasks in state, write callbacks to add and toggle tasks, and use refs to focus the task input automatically on load."
        },
        {
          level: "advanced",
          title: "Add API Sync and Caching",
          content: "Use `useEffect` to fetch default tasks on mount and save tasks to localStorage on updates, and use `useMemo` to filter tasks dynamically based on search queries."
        }
      ],
      codeTemplate: {
        html: "",
        css: `/* Workspace CSS Styles */
.workspace-board {
  max-width: 500px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #334155;
  transition: all 0.3s;
}
.workspace-board.theme-dark {
  background: #0f172a;
  color: white;
  border-color: #1e293b;
}
.workspace-board.theme-light {
  background: #f8fafc;
  color: #0f172a;
  border-color: #cbd5e1;
}
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.input-panel {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  border-radius: 6px;
  margin-bottom: 8px;
  background: rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.05);
}
.theme-light .task-item {
  background: white;
  border: 1px solid #e2e8f0;
}
.task-item.done {
  opacity: 0.6;
  text-decoration: line-through;
}`,
        js: `// 1. Theme Context Definition
const ThemeContext = React.createContext(null);

const App = () => {
  const [theme, setTheme] = React.useState('theme-dark');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <BoardContainer />
    </ThemeContext.Provider>
  );
};

const BoardContainer = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  // 2. State management
  const [tasks, setTasks] = React.useState([
    { id: 1, text: 'Design schemas models', completed: false },
    { id: 2, text: 'Review hooks optimization', completed: true }
  ]);
  const [search, setSearch] = React.useState('');
  const [inputText, setInputText] = React.useState('');

  // 3. Ref to focus input
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 4. useMemo to filter tasks dynamically
  const filteredTasks = React.useMemo(() => {
    return tasks.filter(t => 
      t.text.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    setTasks(prev => [...prev, {
      id: Date.now(),
      text: inputText,
      completed: false
    }]);
    
    setInputText('');
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className={\`workspace-board \${theme}\`}>
      <div className="header-row">
        <h3>Workspace Board</h3>
        <button 
          onClick={() => setTheme(theme === 'theme-dark' ? 'theme-light' : 'theme-dark')}
          style={{ padding: '4px 10px', background: 'transparent', border: '1px solid #334155', color: 'inherit', borderRadius: '4px', cursor: 'pointer' }}
        >
          Theme: {theme === 'theme-dark' ? 'Dark' : 'Light'}
        </button>
      </div>

      <input 
        type="text" 
        placeholder="Filter board cards..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="select-input"
        style={{ width: '100%', marginBottom: '12px' }}
      />

      <form onSubmit={addTask} className="input-panel">
        <input 
          type="text" 
          ref={inputRef}
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="New card task name..."
          className="select-input"
          style={{ flex: 1 }}
        />
        <button type="submit" className="viz-btn cyan-btn" style={{ padding: '8px 16px' }}>Add Card</button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {filteredTasks.map(task => (
          <div key={task.id} className={\`task-item \${task.completed ? 'done' : ''}\`}>
            <span onClick={() => toggleTask(task.id)} style={{ cursor: 'pointer', flex: 1 }}>
              {task.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};`
      },
      assessment: "Checklist:\n1. Declare ThemeContext providing global style toggle variables.\n2. Bind state variables to handle tasks addition and completion.\n3. Wrap search filters inside `useMemo` using query variables as dependencies.\n4. Initialize refs and focus the input element dynamically inside `useEffect` on mount."
    },
    {
      id: "w5-d3-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Hooks synchronization outlines, components folders maps, visual board layouts, and solutions for the collaboration workspace board code.",
        duration: "15 mins",
        resources: [
          "Hooks integration presentation slides (PDF)",
          "Workspace Board Solutions (ZIP)"
        ]
      }
    }
  ]
};
