export const w4d1Data = {
  dayId: "w4-d1",
  dayTitle: "Day 1: React Props & Component Data Flow",
  topics: [
    {
      id: "w4-d1-t1",
      title: "1. What are Props?",
      customComponent: "PropsFlowViz",
      explanation: "Props (short for properties) are read-only configuration parameters passed from a Parent component down to a Child component. They act as data pipelines enabling modular, reusable visual widgets.",
      progression: [
        {
          level: "easy",
          title: "Parent-to-Child Flow",
          content: "Props flow strictly in one direction (downward). A parent component defines attributes on a child HTML-like tag, which the child receives in a single read-only object argument."
        },
        {
          level: "intermediate",
          title: "Immutable Parameters",
          content: "Props are strictly immutable (read-only). A child component must never modify its own props. Doing so violates React's core pure-component principles and breaks UI state synchronization."
        },
        {
          level: "advanced",
          title: "Dynamic Attributes",
          content: "Props are not limited to static strings. You can pass numbers, arrays, objects, booleans, and complex functions inside curly braces `{}` to satisfy child component configuration schemas."
        }
      ],
      detailedReference: {
        summary: "Props provide a immutable configuration link from parent nodes down to child nodes inside the React virtual DOM tree.",
        keyConcepts: [
          { term: "Unidirectional Data Flow", definition: "The design pattern where data moves down the component hierarchy, preventing child nodes from mutating parent state directly." }
        ],
        bestPractices: [
          "Treat props as pure, read-only parameters; do not attempt to assign values back to them.",
          "Pass descriptive, minimal props rather than dumping huge, unformatted configuration structures."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `// Child component receiving props object
const WelcomeMessage = (props) => {
  return <h2 style={{ color: '#0ea5e9' }}>Hello, {props.username}! Welcome to MERN.</h2>;
};

// Parent component rendering Child and passing props
const App = () => {
  return (
    <div>
      <WelcomeMessage username="Alex" />
      <WelcomeMessage username="Taylor" />
    </div>
  );
};`
      },
      assessment: "Explain why updating a prop's value directly inside a child component is illegal in React."
    },
    {
      id: "w4-d1-t2",
      title: "2. Destructuring Props",
      customComponent: "PropsFlowViz",
      explanation: "Instead of referencing `props.name` and `props.role` repeatedly, modern ES6 destructuring allows developers to unpack properties directly within the component's parameter list.",
      progression: [
        {
          level: "easy",
          title: "Basic Destructuring",
          content: "Unpack parameters directly in the function arguments (e.g. `const Card = ({ name, age }) => ...` instead of `const Card = (props) => ...`)."
        },
        {
          level: "intermediate",
          title: "Local Renaming (Aliasing)",
          content: "Rename properties locally if they conflict with surrounding block names (e.g. `({ title: pageTitle })`) to avoid scope overlaps."
        },
        {
          level: "advanced",
          title: "Nested Destructuring",
          content: "Extract deep attributes directly within function parameters (e.g. `({ user: { details: { name } } })`), keeping render loops concise."
        }
      ],
      detailedReference: {
        summary: "Unpacking the props object inline within function definitions creates self-documenting signatures and cleaner render code.",
        keyConcepts: [
          { term: "Inline Unpacking", definition: "Unpacking properties in the function declaration header to bind variables to local scope immediately." }
        ],
        bestPractices: [
          "Use inline destructuring for clean, readable component method signatures.",
          "Keep nesting depth low; deep destructuring can make code hard to read and debug if parent properties are undefined."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `// Child component with destructured properties
const Badge = ({ label, type }) => {
  return (
    <span style={{ 
      padding: '4px 8px', 
      background: type === 'admin' ? '#ef4444' : '#64748b',
      color: 'white',
      borderRadius: '4px',
      marginRight: '8px'
    }}>
      {label} ({type})
    </span>
  );
};

const App = () => {
  return (
    <div style={{ padding: '16px' }}>
      <Badge label="Az" type="admin" />
      <Badge label="Sam" type="student" />
    </div>
  );
};`
      },
      assessment: "Refactor a component that uses props.title and props.subtitle to use inline parameter destructuring."
    },
    {
      id: "w4-d1-t3",
      title: "3. Default Props & Fallback Parameter Values",
      customComponent: "PropsFlowViz",
      explanation: "Default props provide fallback values to ensure components render correctly even when a parent component fails to specify certain configuration attributes.",
      progression: [
        {
          level: "easy",
          title: "ES6 Default Parameters",
          content: "The standard way to define default props is using ES6 default parameter syntax inside the destructuring brackets (e.g., `({ theme = 'light' }) => ...`)."
        },
        {
          level: "intermediate",
          title: "Safety Net Fallbacks",
          content: "Defaults act as defensive programming safeguards, ensuring components don't crash when optional data fields (like status tags or avatars) are missing."
        },
        {
          level: "advanced",
          title: "Static defaultProps Property",
          content: "Legacy React supports setting defaults via a static class property: `MyComponent.defaultProps = { theme: 'light' }`. ES6 defaults are preferred in modern functional code."
        }
      ],
      detailedReference: {
        summary: "Default parameters define fallback constants, preventing layout crashes when optional configuration keys are omitted by the parent.",
        keyConcepts: [
          { term: "Fallback Defaulting", definition: "Binding default values to parameter keys, which apply only if the passed value is undefined." }
        ],
        bestPractices: [
          "Always define sensible default values for optional configurations (e.g., button sizes, card themes).",
          "Prefer standard ES6 default parameters over the legacy static defaultProps API."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `// Child component with ES6 default parameter fallback
const ThemeButton = ({ text, theme = 'cyan' }) => {
  const buttonStyle = {
    background: theme === 'purple' ? '#8b5cf6' : '#0ea5e9',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    marginRight: '8px'
  };
  return <button style={buttonStyle}>{text}</button>;
};

const App = () => {
  return (
    <div>
      {/* Renders with specified theme */}
      <ThemeButton text="Purple Action" theme="purple" />
      {/* Fallback to default 'cyan' theme */}
      <ThemeButton text="Default Action" />
    </div>
  );
};`
      },
      assessment: "Write a UserAvatar component that uses default parameter fallback to display a placeholder image if no URL prop is passed."
    },
    {
      id: "w4-d1-t4",
      title: "4. Callback Props: Passing Functions Down",
      customComponent: "PropsFlowViz",
      explanation: "To allow children to communicate back to parents, parents pass functions down as props. When a child invokes a callback prop, it triggers state updates in the parent component.",
      progression: [
        {
          level: "easy",
          title: "Event Delegation to Parent",
          content: "Pass an event handler function down (e.g. `onAction={handler}`). When a child button is clicked, it invokes this function to trigger a reaction."
        },
        {
          level: "intermediate",
          title: "Child-to-Parent Communication",
          content: "Use callback parameters to send data back up the hierarchy. The child passes data arguments into the callback, which the parent updates state with."
        },
        {
          level: "advanced",
          title: "Custom Event Contracts",
          content: "Design modular API interfaces for components using specific callback names, decoupling presentation widgets from actual application business logic."
        }
      ],
      detailedReference: {
        summary: "Function props act as triggers, allowing nested child components to send events or data back up to parent components.",
        keyConcepts: [
          { term: "Callback Delegation", definition: "Passing function pointers down as props to allow descendants to trigger logic in ancestor scopes." }
        ],
        bestPractices: [
          "Name callback props using the 'on' prefix (e.g. `onDelete`, `onStatusChange`) to match standard web APIs.",
          "Keep event-handling logic centralized in parent components rather than scattering state changes across children."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `// Child component that invokes callback on click
const AlertButton = ({ message, onTrigger }) => {
  return (
    <button 
      onClick={() => onTrigger(message)}
      style={{ padding: '8px 12px', background: '#f43f5e', color: 'white', border: 'none', borderRadius: '4px' }}
    >
      Click to notify Parent
    </button>
  );
};

const App = () => {
  const handleAlert = (msg) => {
    alert(\`Parent received message: \${msg}\`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <AlertButton message="Save Successful!" onTrigger={handleAlert} />
    </div>
  );
};`
      },
      assessment: "Describe how data can be sent from a Child component back up to its Parent component in React."
    },
    {
      id: "w4-d1-t5",
      title: "5. Static PropTypes Validation",
      customComponent: "PropsFlowViz",
      explanation: "PropTypes is a runtime validation library that check the types of props passed to components, helping catch bugs and invalid data structures early.",
      progression: [
        {
          level: "easy",
          title: "Type Check Declarations",
          content: "Use the `prop-types` library to verify values match specific types (e.g., `MyComponent.propTypes = { name: PropTypes.string }`)."
        },
        {
          level: "intermediate",
          title: "Enforcing Required Fields",
          content: "Append `.isRequired` to flag missing props (e.g. `PropTypes.string.isRequired`). If a parent fails to pass this prop, React prints a warning in the console."
        },
        {
          level: "advanced",
          title: "Complex Prop Schemas",
          content: "Define custom validators, shape validations (`PropTypes.shape({ ... })`), or array type schemas to validate complex nested API response structures."
        }
      ],
      detailedReference: {
        summary: "PropTypes act as runtime schemas, issuing console warning logs during development when invalid data types flow into components.",
        keyConcepts: [
          { term: "Runtime Validation", definition: "A developer tool checking parameter types at execution time to verify interface contracts are satisfied." }
        ],
        bestPractices: [
          "Define PropTypes for key components, especially reusable UI kits, to help document correct component usage.",
          "Clean up or disable prop check libraries in production bundles to avoid unnecessary overhead."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `// Note: In global UMD environments, PropTypes is accessed via global window.PropTypes
// We can use standard ES6 defaults and types checks in this way:

const UserInfo = ({ name, age, isMember }) => {
  return (
    <div style={{ padding: '10px', border: '1px solid #ddd' }}>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Status: {isMember ? 'Premium Member' : 'Standard'}</p>
    </div>
  );
};

// PropTypes declaration
UserInfo.propTypes = {
  name: window.PropTypes?.string?.isRequired,
  age: window.PropTypes?.number,
  isMember: window.PropTypes?.bool
};

const App = () => {
  return (
    <div>
      <UserInfo name="Alex" age={24} isMember={true} />
    </div>
  );
};`
      },
      assessment: "Write a propTypes schema for a ProductCard component that requires a string title, a number price, and an optional description string."
    },
    {
      id: "w4-d1-t6",
      title: "6. Assignment Task: Student Profile Card Dashboard",
      explanation: "Create a student profile card system. You need to write a reusable child component `UserCard` that accepts `name`, `role`, `cohort`, `themeColor`, and `isOnline` props, and applies default fallbacks for missing optional props (like `role` and `themeColor`). Inside the parent `App` component, render multiple instances of `UserCard` with different props.",
      progression: [
        {
          level: "easy",
          title: "Build the UserCard Child",
          content: "Declare a `UserCard` component that destructures props and builds a card layout with basic styles."
        },
        {
          level: "intermediate",
          title: "Define Fallbacks & Styles",
          content: "Assign default parameters for `role` (default: 'Student') and `themeColor` (default: '#0ea5e9'). Render status indicators based on `isOnline`."
        },
        {
          level: "advanced",
          title: "Parent rendering list",
          content: "Render multiple cards in a responsive grid. Pass different props to each card, verifying default values apply correctly where props are missing."
        }
      ],
      codeTemplate: {
        html: "",
        css: `/* Student Custom CSS Styling */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  padding: 16px;
}
.student-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  text-align: center;
  position: relative;
}
.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  top: 12px;
  right: 12px;
}
.status-dot.active { background: #10b981; }
.status-dot.inactive { background: #94a3b8; }`,
        js: `// 1. Create the Child Component UserCard
// Props to support: name, role, cohort, themeColor, isOnline
const UserCard = ({ name, cohort, isOnline, role = 'Student', themeColor = '#0ea5e9' }) => {
  return (
    <div className="student-card" style={{ borderTop: \`4px solid \${themeColor}\` }}>
      <div className={\`status-dot \${isOnline ? 'active' : 'inactive'}\`} />
      <h3 style={{ margin: '8px 0' }}>{name}</h3>
      <p style={{ margin: '4px 0', color: '#64748b', fontSize: '0.85rem' }}>{role}</p>
      <p style={{ margin: '4px 0', color: '#94a3b8', fontSize: '0.75rem' }}>Cohort: {cohort}</p>
    </div>
  );
};

// 2. Render multiple UserCards inside the Parent component
const App = () => {
  return (
    <div>
      <h2 style={{ textAlign: 'center', color: '#0f172a' }}>Classroom Dashboard</h2>
      
      <div className="dashboard-grid">
        {/* Render Card 1 (with all details) */}
        <UserCard 
          name="Alice Dev" 
          role="Mentor" 
          cohort="MERN-04" 
          themeColor="#8b5cf6" 
          isOnline={true} 
        />
        
        {/* Render Card 2 (using default role & themeColor) */}
        <UserCard 
          name="Bob Builder" 
          cohort="MERN-04" 
          isOnline={false} 
        />
        
        {/* Render Card 3 (custom color, default role) */}
        <UserCard 
          name="Charlie Lead" 
          cohort="MERN-03" 
          themeColor="#f43f5e" 
          isOnline={true} 
        />
      </div>
    </div>
  );
};`
      },
      assessment: "Checklist:\n1. Declare `UserCard` child component destructuring incoming props.\n2. Ensure default parameters fallback for `role` and `themeColor` is set.\n3. Render an online status dot indicator using boolean logic.\n4. Render at least three cards in the grid layout, with at least one card testing default props."
    },
    {
      id: "w4-d1-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Parent-child data flow models, props vs local state comparison guidelines, default props checks, and solutions for the student profile grid card code.",
        duration: "15 mins",
        resources: [
          "Props Flow presentation slides (PDF)",
          "Classroom Dashboard Solutions (ZIP)"
        ]
      }
    }
  ]
};
