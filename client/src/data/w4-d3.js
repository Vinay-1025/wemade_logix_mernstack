export const w4d3Data = {
  dayId: "w4-d3",
  dayTitle: "Day 3: Conditional Rendering & Lists",
  topics: [
    {
      id: "w4-d3-t1",
      title: "1. Conditional Rendering Patterns",
      customComponent: "ListConditionalViz",
      explanation: "Conditional rendering in React allows you to render different UI elements or components based on certain conditions, using JavaScript operators like `if`, logical `&&`, and the ternary operator `? :`.",
      progression: [
        {
          level: "easy",
          title: "The Logical && Operator",
          content: "Use the `&&` operator to render elements conditionally (e.g. `{isLoggedIn && <Dashboard />}`). If the condition evaluates to false, React ignores the block."
        },
        {
          level: "intermediate",
          title: "The Ternary Operator (? :)",
          content: "Use ternary operators to choose between two different layouts (e.g., `{isLoaded ? <Content /> : <Spinner />}`). This is ideal for toggle states and loading indicators."
        },
        {
          level: "advanced",
          title: "Early Returns",
          content: "Return different JSX structures early at the top of a component function based on certain conditions. This keeps the main render block clean and prevents unnecessary calculations."
        }
      ],
      detailedReference: {
        summary: "Conditional rendering allows you to toggle UI elements dynamically based on state or prop conditions.",
        keyConcepts: [
          { term: "Early Return", definition: "Returning JSX early in a function component, skipping the rest of the render logic." }
        ],
        bestPractices: [
          "Use the logical `&&` operator for simple, single-condition rendering.",
          "Use ternary operators when choosing between two distinct UI elements.",
          "Ensure conditions evaluate to boolean values to avoid rendering numbers like `0` to the DOM."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [isLogged, setIsLogged] = React.useState(false);

  return (
    <div style={{ padding: '16px', textAlign: 'center' }}>
      <h2>Conditional Portal</h2>
      
      {/* Ternary Operator Example */}
      {isLogged ? (
        <div>
          <p style={{ color: '#10b981' }}>Welcome back, Authorized User!</p>
          <button onClick={() => setIsLogged(false)}>Log Out</button>
        </div>
      ) : (
        <div>
          <p style={{ color: '#ef4444' }}>Please log in to continue.</p>
          <button onClick={() => setIsLogged(true)}>Log In</button>
        </div>
      )}

      {/* Logical && Example */}
      {isLogged && (
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '10px' }}>
          Secure session token: active
        </p>
      )}
    </div>
  );
};`
      },
      assessment: "Write a React statement that conditionally renders a <p>Under Construction</p> tag only if the isMaintenance state variable is true."
    },
    {
      id: "w4-d3-t2",
      title: "2. List Rendering & Array.map()",
      customComponent: "ListConditionalViz",
      explanation: "To render lists of items dynamically from an array, use the JavaScript `.map()` method to loop through the array and return a list of JSX elements.",
      progression: [
        {
          level: "easy",
          title: "Mapping Arrays",
          content: "Use `.map()` inside JSX to transform an array of strings or objects into a list of elements (e.g. `{items.map(item => <li>{item}</li>)}`)."
        },
        {
          level: "intermediate",
          title: "Rendering Object Collections",
          content: "Loop through arrays of objects, destructuring properties like IDs and names to display details inside custom component structures."
        },
        {
          level: "advanced",
          title: "Dynamic Grid Rendering",
          content: "Map collections into grid items with CSS styling, creating responsive dashboard grids that adjust to the number of items in the array."
        }
      ],
      detailedReference: {
        summary: "The map method transforms data arrays into lists of JSX components inside render blocks.",
        keyConcepts: [
          { term: "JSX Map Loop", definition: "Using JavaScript's map method inside curly braces to render arrays dynamically." }
        ],
        bestPractices: [
          "Keep list elements clean and self-contained.",
          "Perform calculations on list items outside the map loop to keep renders fast."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'];

  return (
    <div style={{ padding: '16px' }}>
      <h4>Course Skills Covered:</h4>
      <ul>
        {skills.map((skill, index) => (
          <li key={index} style={{ margin: '6px 0', color: '#0ea5e9' }}>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};`
      },
      assessment: "Write a React map statement that loops over a fruits array and returns an <li> tag for each fruit."
    },
    {
      id: "w4-d3-t3",
      title: "3. The Critical Role of 'key' Props",
      customComponent: "ListConditionalViz",
      explanation: "React requires a unique `key` prop on every element in a list. Keys help React identify which items have changed, been added, or been removed, optimizing rendering performance.",
      progression: [
        {
          level: "easy",
          title: "Identifying List Nodes",
          content: "Always assign a unique `key` prop (usually an ID from your data) to the outermost element in your `.map()` loop."
        },
        {
          level: "intermediate",
          title: "The Index Key Anti-pattern",
          content: "Avoid using array indices (`index`) as keys. If the list is re-sorted, filtered, or updated, using indices can cause rendering bugs and state mismatch in list items."
        },
        {
          level: "advanced",
          title: "Virtual DOM Reconciliation",
          content: "React uses keys to match virtual DOM elements with browser DOM elements. Stable, unique keys ensure only modified elements are re-rendered."
        }
      ],
      detailedReference: {
        summary: "Keys help React uniquely identify list items, optimizing updates and preserving component state across list mutations.",
        keyConcepts: [
          { term: "Reconciliation", definition: "The algorithm React uses to compare virtual DOM trees and apply updates to the browser DOM." }
        ],
        bestPractices: [
          "Always use unique, stable IDs (like database IDs) for key props.",
          "Never generate keys dynamically on-the-fly (e.g. `key={Math.random()}`) inside the map loop."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  // Array of objects with stable IDs
  const users = [
    { id: 'usr-01', name: 'Alice' },
    { id: 'usr-02', name: 'Bob' },
    { id: 'usr-03', name: 'Charlie' }
  ];

  return (
    <div style={{ padding: '16px' }}>
      <h4>User Directory:</h4>
      {users.map(user => (
        // Correct key assignment using stable ID
        <div key={user.id} style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
          {user.name} (ID: {user.id})
        </div>
      ))}
    </div>
  );
};`
      },
      assessment: "Explain why using Math.random() as a key prop is bad practice in React list rendering."
    },
    {
      id: "w4-d3-t4",
      title: "4. Filtering Arrays in State",
      customComponent: "ListConditionalViz",
      explanation: "To filter lists dynamically in React, apply the `.filter()` method to your state array inside the render block. This keeps the original state array intact while rendering the filtered list.",
      progression: [
        {
          level: "easy",
          title: "Basic Filtering",
          content: "Use `.filter()` to filter items before mapping them (e.g., `items.filter(item => item.active).map(...)`), updating the list dynamically based on user choices."
        },
        {
          level: "intermediate",
          title: "Derived State",
          content: "Avoid creating duplicate state arrays for filtered results. Instead, compute the filtered list dynamically during rendering based on the active filter state."
        },
        {
          level: "advanced",
          title: "Multi-parameter Filters",
          content: "Combine multiple filter parameters (e.g., search text, categories, sorting orders) to build complex search and filter interfaces."
        }
      ],
      detailedReference: {
        summary: "Compute filtered lists dynamically during render, keeping state flat and avoiding duplicate state variables.",
        keyConcepts: [
          { term: "Derived State", definition: "Values computed dynamically from existing state during rendering, avoiding the need for extra state variables." }
        ],
        bestPractices: [
          "Avoid copying state arrays for filtering; always compute filtered lists dynamically during rendering.",
          "Keep state arrays raw, and apply all filters and transformations during the render cycle."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [filter, setFilter] = React.useState('all');
  const items = [
    { id: 1, text: 'Clean Code', category: 'book' },
    { id: 2, text: 'Keychron K2', category: 'gadget' },
    { id: 3, text: 'Refactoring', category: 'book' }
  ];

  // Derived state: compute filtered list dynamically
  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <div style={{ padding: '16px' }}>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('book')}>Books</button>
        <button onClick={() => setFilter('gadget')}>Gadgets</button>
      </div>

      <ul style={{ marginTop: '12px' }}>
        {filteredItems.map(item => (
          <li key={item.id}>{item.text} ({item.category})</li>
        ))}
      </ul>
    </div>
  );
};`
      },
      assessment: "Write a statement to filter a tasks array, returning only incomplete tasks: tasks.filter(t => ...)."
    },
    {
      id: "w4-d3-t5",
      title: "5. Toggle & Delete List Operations",
      customComponent: "ListConditionalViz",
      explanation: "To update or delete items in a state array, use immutable array methods like `.map()` to update properties or `.filter()` to delete items, passing a new array reference to the state setter.",
      progression: [
        {
          level: "easy",
          title: "Deleting Items",
          content: "To delete an item, call `.filter()` to filter out the item with the matching ID, and pass the new array to the state setter (e.g. `setItems(items.filter(item => item.id !== id))`)."
        },
        {
          level: "intermediate",
          title: "Updating Specific Items",
          content: "To update an item (e.g. toggle completion), call `.map()` to map over the array, copying and modifying the matching item while leaving other items untouched."
        },
        {
          level: "advanced",
          title: "Optimistic UI Updates",
          content: "Update state locally immediately before the server response returns, reverting changes if the API request fails to keep UI interactions fast."
        }
      ],
      detailedReference: {
        summary: "Update state arrays immutably using filter and map, ensuring you pass a new array reference to trigger re-renders.",
        keyConcepts: [
          { term: "Immutability", definition: "Creating copy references instead of modifying original state arrays directly to ensure React detects updates." }
        ],
        bestPractices: [
          "Use `.filter()` to delete items from state arrays safely and immutably.",
          "Use `.map()` to update properties on specific items within state arrays immutably."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [users, setUsers] = React.useState([
    { id: 1, name: 'Alice', active: true },
    { id: 2, name: 'Bob', active: false }
  ]);

  const toggleStatus = (id) => {
    // Immutably update status using map
    setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
  };

  const deleteUser = (id) => {
    // Immutably delete user using filter
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div style={{ padding: '16px' }}>
      {users.map(u => (
        <div key={u.id} style={{ display: 'flex', gap: '12px', margin: '8px 0' }}>
          <span>{u.name} - Status: {u.active ? 'Active' : 'Inactive'}</span>
          <button onClick={() => toggleStatus(u.id)}>Toggle</button>
          <button onClick={() => deleteUser(u.id)} style={{ color: 'red' }}>Delete</button>
        </div>
      ))}
    </div>
  );
};`
      },
      assessment: "Write a state update statement to remove an item with ID 5 from a tasks state array."
    },
    {
      id: "w4-d3-t6",
      title: "6. Assignment Task: Project Tasks & Filters Manager",
      explanation: "Create an interactive task manager. The app must display a list of tasks, allow users to add tasks, toggle task completion, and delete tasks. The app must also include filters (All, Active, Completed) to filter the list dynamically, and apply conditional styling to completed tasks.",
      progression: [
        {
          level: "easy",
          title: "Render Initial Task List",
          content: "Create a tasks state array. Map through the array and render a list of tasks with custom styling."
        },
        {
          level: "intermediate",
          title: "Add, Toggle, & Delete Tasks",
          content: "Add a form to append tasks. Bind toggles to update task completion using `.map()`, and deletion using `.filter()`."
        },
        {
          level: "advanced",
          title: "Implement Task Filters",
          content: "Add filters (All, Active, Completed) to filter the task list dynamically, applying conditional styling to complete tasks."
        }
      ],
      codeTemplate: {
        html: "",
        css: `/* Custom task dashboard layout */
.task-manager {
  max-width: 450px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
  background: #1e293b;
  color: white;
  padding: 24px;
  border-radius: 12px;
}
.task-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}
.task-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0f172a;
  padding: 10px 16px;
  border-radius: 6px;
  border: 1px solid #334155;
}
.task-row.done span {
  text-decoration: line-through;
  color: #64748b;
}
.filter-tabs {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
.tab-btn {
  padding: 6px 12px;
  background: #334155;
  color: #94a3b8;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.tab-btn.active {
  background: #0ea5e9;
  color: white;
}`,
        js: `const App = () => {
  // 1. Declare state for tasks and active filter
  const [tasks, setTasks] = React.useState([
    { id: 1, text: 'Master Props', completed: true },
    { id: 2, text: 'Learn state hooks', completed: false },
    { id: 3, text: 'Implement key mappings', completed: false }
  ]);
  const [inputVal, setInputVal] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('all');

  // 2. Action handlers
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    
    const newTask = {
      id: Date.now(),
      text: inputVal,
      completed: false
    };
    
    setTasks(prev => [...prev, newTask]);
    setInputVal('');
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // 3. Derived State: Filtered tasks
  const filteredTasks = tasks.filter(t => {
    if (activeFilter === 'completed') return t.completed;
    if (activeFilter === 'active') return !t.completed;
    return true;
  });

  return (
    <div className="task-manager">
      <h3>Wemade Task Manager</h3>
      
      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '8px' }}>
        <input 
          type="text" 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="New task..."
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #334155', background: '#0f172a', color: 'white' }}
        />
        <button type="submit" style={{ padding: '8px 16px', background: '#0ea5e9', border: 'none', borderRadius: '4px', color: 'white', fontWeight: 'bold' }}>Add</button>
      </form>

      <div className="filter-tabs">
        <button className={\`tab-btn \${activeFilter === 'all' ? 'active' : ''}\`} onClick={() => setActiveFilter('all')}>All</button>
        <button className={\`tab-btn \${activeFilter === 'active' ? 'active' : ''}\`} onClick={() => setActiveFilter('active')}>Active</button>
        <button className={\`tab-btn \${activeFilter === 'completed' ? 'active' : ''}\`} onClick={() => setActiveFilter('completed')}>Done</button>
      </div>

      <div className="task-list">
        {filteredTasks.map(task => (
          <div key={task.id} className={\`task-row \${task.completed ? 'done' : ''}\`}>
            <span onClick={() => toggleTask(task.id)} style={{ cursor: 'pointer', flex: 1 }}>
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}>
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};`
      },
      assessment: "Checklist:\n1. Initialize tasks and filter states.\n2. Render list items dynamically using `.map()`, assigning unique key props.\n3. Add handlers to append, toggle, and delete tasks in state.\n4. Compute the filtered list dynamically during rendering based on the active filter state."
    },
    {
      id: "w4-d3-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Conditional logic flowcharts, key matching trace guides, array helper references, and solutions for the task manager code.",
        duration: "15 mins",
        resources: [
          "Lists & rendering presentation slides (PDF)",
          "Tasks Manager Solutions (ZIP)"
        ]
      }
    }
  ]
};
