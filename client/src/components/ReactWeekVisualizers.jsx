import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, RotateCcw, Sparkles, Layers, Terminal, ChevronRight, 
  User, Mail, Lock, Check, Plus, Trash2, HelpCircle, 
  AlertCircle, RefreshCw, ArrowRight, Search, Globe, Database 
} from 'lucide-react';

/* ==========================================
   1. PropsFlowViz (Day 1 Visualizer)
   ========================================== */
export const PropsFlowViz = () => {
  const [name, setName] = useState('Alex Carter');
  const [role, setRole] = useState('Developer');
  const [themeColor, setThemeColor] = useState('cyan');
  const [isOnline, setIsOnline] = useState(true);

  // Theme maps for styling the child card
  const themeStyles = {
    cyan: { bg: 'linear-gradient(135deg, #0ea5e9, #00d1d1)', border: '#0ea5e9', text: '#00d1d1' },
    purple: { bg: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: '#8b5cf6', text: '#8b5cf6' },
    rose: { bg: 'linear-gradient(135deg, #f43f5e, #ec4899)', border: '#f43f5e', text: '#f43f5e' }
  };

  const currentTheme = themeStyles[themeColor] || themeStyles.cyan;

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <Sparkles size={16} className="text-cyan" />
        <span>Props Flow Visualizer</span>
      </div>

      <div className="viz-split-layout">
        {/* Left: Parent Controls */}
        <div className="viz-control-panel">
          <h4>Parent State Controls</h4>
          <p className="panel-desc">Modify state in the Parent component. These values flow down to the Child component as read-only "props".</p>
          
          <div className="control-group">
            <label>Name Prop:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              maxLength={20}
            />
          </div>

          <div className="control-group">
            <label>Role Prop (Default Prop Fallback if empty):</label>
            <input 
              type="text" 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              placeholder="Defaults to 'Student'"
            />
          </div>

          <div className="control-group">
            <label>Theme Color Prop:</label>
            <div className="theme-selector">
              {['cyan', 'purple', 'rose'].map((t) => (
                <button 
                  key={t}
                  className={`theme-btn ${themeColor === t ? 'active' : ''} theme-${t}`}
                  onClick={() => setThemeColor(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group checkbox">
            <label>
              <input 
                type="checkbox" 
                checked={isOnline} 
                onChange={(e) => setIsOnline(e.target.checked)} 
              />
              isOnline Prop (Boolean)
            </label>
          </div>
        </div>

        {/* Right: Visualization Canvas */}
        <div className="viz-display-canvas">
          {/* Parent Node */}
          <div className="flow-node parent-node">
            <div className="node-title">Parent Component</div>
            <div className="node-state">
              <strong>State variables:</strong>
              <div>username: "{name}"</div>
              <div>role: "{role || '(empty)'}"</div>
              <div>color: "{themeColor}"</div>
              <div>online: {isOnline ? 'true' : 'false'}</div>
            </div>
          </div>

          {/* Flow Arrow */}
          <div className="flow-arrow-container">
            <div className="flow-arrow">
              <span className="arrow-line"></span>
              <ChevronRight className="arrow-head" />
            </div>
            <div className="flow-labels">
              <span className="flow-label">name="{name}"</span>
              {role && <span className="flow-label">role="{role}"</span>}
              <span className="flow-label">themeColor="{themeColor}"</span>
              <span className="flow-label">isOnline={isOnline ? 'true' : 'false'}</span>
            </div>
          </div>

          {/* Child Node */}
          <div className="flow-node child-node">
            <div className="node-title">Child: UserProfileCard</div>
            
            {/* Child Card Render */}
            <div className="user-profile-card" style={{ borderTop: `4px solid ${currentTheme.border}` }}>
              <div className="card-avatar-wrapper">
                <div className="card-avatar" style={{ background: currentTheme.bg }}>
                  {name ? name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className={`status-badge ${isOnline ? 'online' : 'offline'}`}></span>
              </div>
              <div className="card-info">
                <h3>{name || 'Undefined User'}</h3>
                <span className="card-role" style={{ color: currentTheme.text, border: `1px solid ${currentTheme.text}33` }}>
                  {role || 'Student (Default)'}
                </span>
                <p className="card-hint">Props received: read-only immutable parameters.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Generation Panel */}
      <div className="viz-code-panel">
        <div className="tab-title"><Terminal size={14} /> JSX Props Scoping</div>
        <pre className="code-block">
{`// Parent Component
function Dashboard() {
  const [name, setName] = useState("${name}");
  const [role, setRole] = useState("${role}");
  const [theme, setTheme] = useState("${themeColor}");
  const [online, setOnline] = useState(${isOnline});

  return (
    <UserProfileCard 
      name={name} 
      role={role || undefined} // Triggers default prop if empty
      themeColor={theme}
      isOnline={online}
    />
  );
}

// Child Component
function UserProfileCard({ name, role = "Student", themeColor = "cyan", isOnline }) {
  // Read-only values: modifying name or role inside this component is illegal!
  return (
    <div className={"card " + themeColor}>
      <h3>{name}</h3>
      <span className="role">{role}</span>
      <div className={isOnline ? "online-dot" : "offline-dot"} />
    </div>
  );
}`}
        </pre>
      </div>
    </div>
  );
};


/* ==========================================
   2. StateVsVariableViz (Day 2 Visualizer)
   ========================================== */
export const StateVsVariableViz = () => {
  const [stateCount, setStateCount] = useState(0);
  const [renderCount, setRenderCount] = useState(1);
  const [logs, setLogs] = useState([]);
  
  // Ref to store normal let variable
  const variableCountRef = useRef(0);

  const addLog = (text) => {
    setLogs((prev) => [text, ...prev.slice(0, 7)]);
  };

  const handleIncrementVariable = () => {
    variableCountRef.current += 1;
    addLog(`[Local Variable] Incremented variableCount to ${variableCountRef.current} (RAM memory updated)`);
  };

  const handleIncrementState = () => {
    const nextVal = stateCount + 1;
    setStateCount(nextVal);
    setRenderCount(prev => prev + 1);
    addLog(`[React State] Called setStateCount(${nextVal}) -> React schedules re-render`);
  };

  const handleReset = () => {
    variableCountRef.current = 0;
    setStateCount(0);
    setRenderCount(1);
    setLogs([]);
    addLog('[Reset] Clear all values');
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <Layers size={16} className="text-purple" />
        <span>State vs. Local Variable comparison</span>
      </div>

      <div className="viz-split-layout">
        {/* Panel 1: Normal JS variable */}
        <div className="compare-panel normal-var-panel">
          <div className="panel-badge">JavaScript Variable</div>
          <h3>let counter = {variableCountRef.current}</h3>
          <p className="panel-desc">
            Standard javascript variables persist changes in the machine's memory, but mutating them **does not** notify React to update the view.
          </p>
          <div className="val-box">
            <span className="val-label">Displayed in UI:</span>
            <span className="val-number font-red">0</span>
          </div>
          <button className="viz-btn red-btn" onClick={handleIncrementVariable}>
            Increment variable
          </button>
          <div className="render-status">
            Render Status: <span className="status-label idle">Static</span>
          </div>
        </div>

        {/* Panel 2: React State variable */}
        <div className="compare-panel state-var-panel">
          <div className="panel-badge react-badge">React State Hook</div>
          <h3>const [count, setCount] = useState(0)</h3>
          <p className="panel-desc">
            React state variables are hooked into React's virtual DOM engine. Updating state triggers a component re-render, drawing the updated value to the DOM.
          </p>
          <div className="val-box">
            <span className="val-label">Displayed in UI:</span>
            <span className="val-number font-green">{stateCount}</span>
          </div>
          <button className="viz-btn green-btn" onClick={handleIncrementState}>
            Increment state
          </button>
          <div className="render-status">
            Component render count: <span className="status-label active flash-animation">Render #{renderCount}</span>
          </div>
        </div>
      </div>

      {/* Visual Execution Log console */}
      <div className="viz-split-layout logs-and-theory">
        <div className="viz-logs-console">
          <div className="console-header">
            <Terminal size={14} /> <span>Virtual Engine Log</span>
            <button className="clear-btn" onClick={handleReset}><RotateCcw size={12} /></button>
          </div>
          <div className="console-body">
            {logs.length === 0 ? (
              <div className="console-empty">Click buttons above to trigger state and variable changes...</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className={`console-line ${log.includes('React State') ? 'state-line' : log.includes('Variable') ? 'var-line' : 'sys-line'}`}>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="theory-notes">
          <h4>Core Takeaways</h4>
          <ul>
            <li><strong>Variables:</strong> Modifying a standard variable does not trigger a re-render. The UI gets out of sync with actual memory.</li>
            <li><strong>State:</strong> Hook updates schedule a re-render. React executes the component function again with the new state.</li>
            <li><strong>Re-rendering:</strong> This refers to React re-running the component, computing the JSX elements, and applying minimal diffs to the browser DOM.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};


/* ==========================================
   3. ListConditionalViz (Day 3 Visualizer)
   ========================================== */
export const ListConditionalViz = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Study Props & States', category: 'React', completed: true },
    { id: 2, text: 'Build Visual Layout', category: 'Styling', completed: false },
    { id: 3, text: 'Understand Array Mapping', category: 'JS', completed: false }
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');
  const [layoutMode, setLayoutMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [simulateMissingKey, setSimulateMissingKey] = useState(false);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      category: 'React',
      completed: false
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'completed') return t.completed;
    if (filter === 'active') return !t.completed;
    return true;
  });

  const triggerLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <Check size={16} className="text-cyan" />
        <span>Lists & Conditional Rendering Sandbox</span>
      </div>

      {/* Controller bar */}
      <div className="viz-control-bar">
        <form onSubmit={handleAddTask} className="add-task-form">
          <input 
            type="text" 
            placeholder="Add new item..." 
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
          <button type="submit" className="add-btn"><Plus size={16} /></button>
        </form>

        <div className="filter-group">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
          <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Done</button>
        </div>

        <div className="layout-toggle">
          <button className={layoutMode === 'grid' ? 'active' : ''} onClick={() => setLayoutMode('grid')}>Grid View</button>
          <button className={layoutMode === 'list' ? 'active' : ''} onClick={() => setLayoutMode('list')}>Row View</button>
        </div>

        <button className="simulate-btn" onClick={triggerLoading}>
          Simulate Loading State
        </button>
      </div>

      <div className="viz-split-layout">
        {/* Left: Render Output Viewport */}
        <div className="list-viewport">
          <div className="viewport-header">
            <span>Classroom Component Preview</span>
            <div className="viewport-controls">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
          </div>

          <div className="viewport-body">
            {isLoading ? (
              <div className="loading-spinner-state">
                <RefreshCw className="spinner-icon rotate-animation" />
                <p>Loading course data...</p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="empty-state">
                <AlertCircle size={32} className="text-neutral" />
                <p>No items found for the active filters.</p>
              </div>
            ) : (
              <div className={layoutMode === 'grid' ? 'grid-list-view' : 'row-list-view'}>
                <AnimatePresence>
                  {filteredTasks.map((task, index) => (
                    <motion.div 
                      key={simulateMissingKey ? index : task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`task-card-item ${task.completed ? 'completed' : ''}`}
                    >
                      <div className="card-item-left" onClick={() => toggleTask(task.id)}>
                        <div className={`checkbox-circle ${task.completed ? 'checked' : ''}`}>
                          {task.completed && <Check size={12} />}
                        </div>
                        <div className="task-content">
                          <span className="task-text">{task.text}</span>
                          <span className="task-cat">{task.category}</span>
                        </div>
                      </div>
                      <button className="delete-task-btn" onClick={() => deleteTask(task.id)}>
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Right: Technical Explanation & Logic Code */}
        <div className="code-and-debug">
          <div className="debug-key-settings">
            <h4>Conditional & List Logic</h4>
            <div className="control-group checkbox">
              <label>
                <input 
                  type="checkbox" 
                  checked={simulateMissingKey} 
                  onChange={(e) => setSimulateMissingKey(e.target.checked)} 
                />
                <span className="text-warning font-semibold">Simulate Index as Key (Anti-pattern)</span>
              </label>
            </div>
            {simulateMissingKey ? (
              <div className="alert-warning-box">
                <strong>Warning:</strong> Using index as a key disables React's element track optimizer. Rearranging, deleting, or sorting items can cause visual bugs or state mismatch!
              </div>
            ) : (
              <div className="alert-success-box">
                <strong>Correct:</strong> Using item IDs as keys ensures React tracks each DOM node uniquely during lifecycle mutations.
              </div>
            )}
          </div>

          <div className="viz-code-panel mini">
            <div className="tab-title"><Terminal size={12} /> Conditional rendering & lists implementation</div>
            <pre className="code-block text-xs">
{`{/* 1. Conditional loading pattern */}
{isLoading ? (
  <Spinner />
) : tasks.length === 0 ? (
  <EmptyState />
) : (
  // 2. List rendering using Array.map
  <div className="${layoutMode === 'grid' ? 'grid-class' : 'row-class'}">
    {tasks.map((task) => (
      <TaskItem 
        key={${simulateMissingKey ? 'index' : 'task.id'}} 
        task={task} 
      />
    ))}
  </div>
)}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};


/* ==========================================
   4. ControlledFormViz (Day 4 Visualizer)
   ========================================== */
export const ControlledFormViz = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    terms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate form on state updates
  useEffect(() => {
    const newErrors = {};
    if (formData.username && formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters.';
    }
    if (formData.email && !formData.email.includes('@')) {
      newErrors.email = 'Enter a valid email address containing @.';
    }
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    setErrors(newErrors);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setIsSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && formData.username && formData.email && formData.password && formData.terms) {
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
      alert('Please fill out all fields correctly!');
    }
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <Mail size={16} className="text-cyan" />
        <span>Controlled Components & Validations Simulator</span>
      </div>

      <div className="viz-split-layout">
        {/* Left: Controlled Form */}
        <div className="form-sandbox-panel">
          <h4>Controlled User Signup Form</h4>
          
          <form onSubmit={handleSubmit} className="sandbox-form">
            <div className="input-field">
              <label>Username</label>
              <div className="input-wrapper">
                <User size={16} className="input-icon" />
                <input 
                  type="text" 
                  name="username" 
                  value={formData.username} 
                  onChange={handleChange}
                  placeholder="e.g. coder_az"
                />
              </div>
              {errors.username && <span className="error-text">{errors.username}</span>}
            </div>

            <div className="input-field">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={16} className="input-icon" />
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  placeholder="e.g. user@wemade.com"
                />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="input-field">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={16} className="input-icon" />
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                />
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="checkbox-field">
              <label>
                <input 
                  type="checkbox" 
                  name="terms" 
                  checked={formData.terms} 
                  onChange={handleChange}
                />
                <span>I accept the Terms and Conditions</span>
              </label>
            </div>

            <button type="submit" className="submit-form-btn">
              Submit signup
            </button>

            {isSubmitted && (
              <div className="form-success-banner">
                <Check size={16} /> <span>Account created successfully in database!</span>
              </div>
            )}
          </form>
        </div>

        {/* Right: React State Viewer */}
        <div className="state-tracker-panel">
          <h4>React State Monitor</h4>
          <p className="panel-desc">
            As you type, inputs fire `onChange` events to update React state. The input elements fetch their display value back from state (`value={formData.key}`).
          </p>

          <div className="state-tree-viewer">
            <div className="viewer-header">
              <Database size={14} /> <span>State Object (formData)</span>
            </div>
            <pre className="state-json">
{JSON.stringify(formData, null, 2)}
            </pre>
          </div>

          <div className="state-tree-viewer errors-viewer">
            <div className="viewer-header">
              <AlertCircle size={14} className="text-rose" /> <span className="text-rose">Validation Errors (errors)</span>
            </div>
            <pre className="state-json">
{JSON.stringify(errors, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};


/* ==========================================
   5. EffectLifecycleViz (Day 5 Visualizer)
   ========================================== */
export const EffectLifecycleViz = () => {
  const [userId, setUserId] = useState('1');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const refreshIntervalRef = useRef(null);

  const addLog = (text) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${text}`, ...prev.slice(0, 5)]);
  };

  // Effect to simulate data fetching when userId changes
  useEffect(() => {
    addLog(`🟢 effect trigger: ID changed to user #${userId}`);
    setLoading(true);
    setUserData(null);

    // Simulate API fetch delay
    const delay = setTimeout(() => {
      const mockUsers = {
        '1': { name: 'Alice Dev', role: 'Staff Mentor', apiPing: '23ms' },
        '2': { name: 'Bob Architect', role: 'Principal Designer', apiPing: '45ms' },
        '3': { name: 'Charlie lead', role: 'Solutions Consultant', apiPing: '34ms' }
      };
      setUserData(mockUsers[userId] || { name: 'Unknown', role: 'None', apiPing: '0ms' });
      setLoading(false);
      addLog(`✨ API response resolved for user #${userId}`);
    }, 1000);

    // Effect cleanup function
    return () => {
      clearTimeout(delay);
      addLog(`🔴 effect cleanup: cancelled fetch/timers for ID user #${userId}`);
    };
  }, [userId]);

  // Effect to handle auto-refresh interval (demonstrating cleanup logic)
  useEffect(() => {
    if (autoRefresh) {
      addLog('🟢 effect trigger: started background auto-refresh interval (3s)');
      refreshIntervalRef.current = setInterval(() => {
        addLog('🔄 background refresh triggered via setInterval');
      }, 3000);
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
        addLog('🔴 effect cleanup: cleared background refresh interval');
      }
    };
  }, [autoRefresh]);

  const handleReset = () => {
    setLogs([]);
    setUserId('1');
    setAutoRefresh(false);
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <RefreshCw size={16} className="text-purple" />
        <span>useEffect Lifecycle & Dynamic API Simulation</span>
      </div>

      <div className="viz-split-layout">
        {/* Left: Simulated UI controls */}
        <div className="lifecycle-controls">
          <h4>Trigger Lifecycle Events</h4>
          <p className="panel-desc">Changing values or toggling timers triggers React side-effects (`useEffect`).</p>

          <div className="control-group">
            <label>Select User Endpoint (API dependency):</label>
            <select value={userId} onChange={(e) => setUserId(e.target.value)} className="select-input">
              <option value="1">Fetch User #1 (Alice)</option>
              <option value="2">Fetch User #2 (Bob)</option>
              <option value="3">Fetch User #3 (Charlie)</option>
            </select>
          </div>

          <div className="control-group checkbox">
            <label>
              <input 
                type="checkbox" 
                checked={autoRefresh} 
                onChange={(e) => setAutoRefresh(e.target.checked)} 
              />
              Enable Background Auto-Refresh interval
            </label>
          </div>

          {/* User profile card simulation */}
          <div className="api-profile-box">
            <div className="box-header">
              <Globe size={12} /> <span>API Response view</span>
            </div>
            <div className="box-body">
              {loading ? (
                <div className="simulated-loader">
                  <RefreshCw className="spinner-icon rotate-animation" />
                  <span>Fetching /users/{userId} ...</span>
                </div>
              ) : userData ? (
                <div className="simulated-profile">
                  <div className="profile-badge">200 OK</div>
                  <h4>{userData.name}</h4>
                  <p>{userData.role}</p>
                  <span className="ping-time">API latency: {userData.apiPing}</span>
                </div>
              ) : (
                <div className="simulated-empty">Idle. Select a user...</div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Effect Log Console */}
        <div className="lifecycle-logs-panel">
          <div className="console-header">
            <Terminal size={14} /> <span>React Lifecycle Console Log</span>
            <button className="clear-btn" onClick={handleReset}><RotateCcw size={12} /></button>
          </div>
          <div className="console-body flex-col font-mono text-xs">
            {logs.length === 0 ? (
              <div className="console-empty">Logs will record mount, update, fetch and cleanups...</div>
            ) : (
              logs.map((log, index) => {
                let statusClass = 'log-normal';
                if (log.includes('🟢')) statusClass = 'log-success';
                if (log.includes('🔴')) statusClass = 'log-error';
                if (log.includes('🔄')) statusClass = 'log-warning';
                return (
                  <div key={index} className={`log-line ${statusClass}`}>
                    {log}
                  </div>
                );
              })
            )}
          </div>

          <div className="dependency-block">
            <h5>Active Dependency Array:</h5>
            <div className="array-chip">
              {"useEffect(() => { ... }, ["}
              <span className="dependency-var">userId</span>
              {", "}
              <span className="dependency-var">autoRefresh</span>
              {"])"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


/* ==========================================
   6. RouterSimulatorViz (Day 6 Visualizer)
   ========================================== */
export const RouterSimulatorViz = () => {
  const [history, setHistory] = useState(['/']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const currentPath = history[historyIndex] || '/';

  const navigateTo = (path) => {
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(path);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  // Mock viewport renderer based on matching path routes
  const renderRouteElement = () => {
    switch (currentPath) {
      case '/':
        return (
          <div className="route-page home-page">
            <h3>🏠 Welcome to Student Home</h3>
            <p>This is the default element matched at route path <code>"/"</code>.</p>
            <div className="action-box">
              <button onClick={() => navigateTo('/courses')} className="action-btn">
                Browse Courses <ArrowRight size={14} />
              </button>
            </div>
          </div>
        );
      case '/courses':
        return (
          <div className="route-page courses-page">
            <h3>📚 React Training Courses</h3>
            <p>Matched route pattern: <code>"/courses"</code>.</p>
            <div className="courses-grid">
              <div className="course-chip">React props (W4D1)</div>
              <div className="course-chip">useState hooks (W4D2)</div>
              <div className="course-chip">React Router DOM (W4D6)</div>
            </div>
          </div>
        );
      case '/profile':
        return (
          <div className="route-page profile-page">
            <h3>👤 Student Personal Profile</h3>
            <p>Matched route pattern: <code>"/profile"</code>.</p>
            <div className="profile-details-mini">
              <div>Name: Alex Carter</div>
              <div>Cohort: MERN Track 2026</div>
            </div>
          </div>
        );
      default:
        return (
          <div className="route-page not-found-page">
            <h3>⚠️ Route mismatch: 404</h3>
            <p>No route matched path: <code>"{currentPath}"</code>.</p>
            <button onClick={() => navigateTo('/')} className="action-btn">Go home</button>
          </div>
        );
    }
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <Globe size={16} className="text-cyan" />
        <span>Client-Side Routing SPA Simulator</span>
      </div>

      <div className="router-simulator-box">
        {/* Simulated Browser Bar */}
        <div className="browser-bar">
          <div className="browser-navigation-arrows">
            <button className="nav-arrow" onClick={handleBack} disabled={historyIndex === 0}>
              ◀
            </button>
            <button className="nav-arrow" onClick={handleForward} disabled={historyIndex === history.length - 1}>
              ▶
            </button>
            <button className="nav-arrow" onClick={() => setHistory(['/'])} title="Reset browser history">
              🔄
            </button>
          </div>
          <div className="browser-address-input">
            <span className="domain-prefix">https://wemade-logix.app</span>
            <span className="address-path">{currentPath}</span>
          </div>
        </div>

        {/* Browser viewport */}
        <div className="browser-viewport-layout">
          {/* Sidebar */}
          <div className="browser-navbar-aside">
            <div className="navbar-logo">MERN SPA</div>
            <nav className="navbar-links-group">
              <button className={`nav-link ${currentPath === '/' ? 'active' : ''}`} onClick={() => navigateTo('/')}>
                Home Node
              </button>
              <button className={`nav-link ${currentPath === '/courses' ? 'active' : ''}`} onClick={() => navigateTo('/courses')}>
                Courses List
              </button>
              <button className={`nav-link ${currentPath === '/profile' ? 'active' : ''}`} onClick={() => navigateTo('/profile')}>
                My Profile
              </button>
              <button className="nav-link text-red" onClick={() => navigateTo('/broken-route')}>
                404 Test Link
              </button>
            </nav>
          </div>

          {/* Viewer page contents */}
          <div className="browser-viewport-display">
            {renderRouteElement()}
          </div>
        </div>
      </div>

      {/* Simulated routing structure configuration */}
      <div className="routing-code-mapping">
        <h4>Visual Router Switch Schema</h4>
        <div className="router-flow-diagram">
          <div className="flow-element client-request">
            <span>Path: <code>"{currentPath}"</code></span>
          </div>
          <div className="flow-element routes-switch">
            <span>&lt;Routes&gt;</span>
            <div className="routes-case-list">
              <div className={`route-case-line ${currentPath === '/' ? 'active' : ''}`}>
                path="/" =&gt; &lt;Home /&gt; {currentPath === '/' && '🎯 MATCH'}
              </div>
              <div className={`route-case-line ${currentPath === '/courses' ? 'active' : ''}`}>
                path="/courses" =&gt; &lt;Courses /&gt; {currentPath === '/courses' && '🎯 MATCH'}
              </div>
              <div className={`route-case-line ${currentPath === '/profile' ? 'active' : ''}`}>
                path="/profile" =&gt; &lt;Profile /&gt; {currentPath === '/profile' && '🎯 MATCH'}
              </div>
              <div className={`route-case-line ${!['/', '/courses', '/profile'].includes(currentPath) ? 'active' : ''}`}>
                path="*" =&gt; &lt;NotFound /&gt; {!['/', '/courses', '/profile'].includes(currentPath) && '🎯 MATCH (Fallback)'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .react-viz-container {
          background: #1e293b;
          border: 1px solid var(--app-border, #334155);
          border-radius: var(--radius-lg, 12px);
          padding: 20px;
          color: #e2e8f0;
          font-family: inherit;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .viz-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #94a3b8;
          border-bottom: 1px solid #334155;
          padding-bottom: 10px;
        }
        .text-cyan { color: #00d1d1 !important; }
        .text-purple { color: #8b5cf6 !important; }
        .font-red { color: #f43f5e !important; }
        .font-green { color: #10b981 !important; }
        .text-rose { color: #f43f5e; }
        
        .viz-split-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 768px) {
          .viz-split-layout { grid-template-columns: 1fr; }
        }
        
        /* General Panel Styling */
        .viz-control-panel, .viz-display-canvas, .compare-panel, .list-viewport, .code-and-debug, .lifecycle-controls, .lifecycle-logs-panel {
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: var(--radius-md, 8px);
          padding: 16px;
        }
        
        /* Parent Control Styles */
        .viz-control-panel h4, .lifecycle-controls h4, .lifecycle-logs-panel h4, .state-tracker-panel h4 {
          margin-top: 0;
          margin-bottom: 6px;
          font-weight: 600;
          color: #f1f5f9;
        }
        .panel-desc {
          font-size: 0.8rem;
          color: #64748b;
          margin-bottom: 16px;
          line-height: 1.4;
        }
        .control-group {
          margin-bottom: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .control-group label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #94a3b8;
        }
        .control-group input[type="text"], .select-input {
          padding: 8px 12px;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 6px;
          color: white;
          outline: none;
          font-size: 0.85rem;
        }
        .control-group input[type="text"]:focus, .select-input:focus {
          border-color: #00d1d1;
        }
        .theme-selector {
          display: flex;
          gap: 8px;
        }
        .theme-btn {
          flex: 1;
          padding: 6px 12px;
          border: 1px solid #334155;
          background: #1e293b;
          color: #94a3b8;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.75rem;
          text-transform: capitalize;
          transition: all 0.2s;
        }
        .theme-btn.active {
          color: white;
          border-color: transparent;
        }
        .theme-btn.theme-cyan.active { background: #0ea5e9; }
        .theme-btn.theme-purple.active { background: #8b5cf6; }
        .theme-btn.theme-rose.active { background: #f43f5e; }
        
        .control-group.checkbox label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #e2e8f0;
          cursor: pointer;
        }
        
        /* Visualization Canvas & Nodes */
        .viz-display-canvas {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 16px;
          min-height: 250px;
        }
        .flow-node {
          width: 90%;
          border: 1px solid #334155;
          border-radius: 6px;
          padding: 10px 12px;
          font-size: 0.8rem;
          background: #1e293b;
        }
        .node-title {
          font-weight: 700;
          color: #cbd5e1;
          border-bottom: 1px solid #334155;
          padding-bottom: 4px;
          margin-bottom: 6px;
        }
        .node-state {
          color: #94a3b8;
          font-family: monospace;
          line-height: 1.4;
        }
        
        /* Flow Arrow */
        .flow-arrow-container {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 90%;
        }
        .flow-arrow {
          display: flex;
          align-items: center;
          flex: 1;
        }
        .arrow-line {
          height: 2px;
          background: #00d1d1;
          flex: 1;
        }
        .arrow-head {
          color: #00d1d1;
          margin-left: -8px;
        }
        .flow-labels {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 0.7rem;
          color: #94a3b8;
          font-family: monospace;
          min-width: 110px;
        }
        .flow-label {
          background: rgba(0,209,209,0.08);
          border: 1px solid rgba(0,209,209,0.15);
          border-radius: 4px;
          padding: 2px 4px;
          text-align: center;
        }
        
        /* User profile card child */
        .user-profile-card {
          background: #0f172a;
          border-radius: var(--radius-sm, 6px);
          padding: 12px;
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .card-avatar-wrapper {
          position: relative;
        }
        .card-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
          color: white;
        }
        .status-badge {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid #0f172a;
        }
        .status-badge.online { background: #10b981; }
        .status-badge.offline { background: #64748b; }
        .card-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .card-info h3 {
          margin: 0;
          font-size: 0.95rem;
          font-weight: bold;
          color: white;
        }
        .card-role {
          font-size: 0.65rem;
          padding: 1px 6px;
          border-radius: 20px;
          width: fit-content;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .card-hint {
          margin: 0;
          font-size: 0.65rem;
          color: #475569;
        }
        
        /* Code Panel Scoping */
        .viz-code-panel {
          border: 1px solid #334155;
          border-radius: var(--radius-md, 8px);
          background: #090d16;
          overflow: hidden;
        }
        .viz-code-panel.mini {
          margin-top: 12px;
        }
        .viz-code-panel .tab-title {
          background: #111827;
          padding: 8px 12px;
          font-size: 0.75rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 6px;
          color: #94a3b8;
          border-bottom: 1px solid #1f2937;
        }
        .code-block {
          margin: 0;
          padding: 12px;
          overflow-x: auto;
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          color: #cbd5e1;
          line-height: 1.5;
        }
        
        /* State vs Variables comparison styles */
        .compare-panel {
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
        }
        .panel-badge {
          background: #1e293b;
          color: #94a3b8;
          font-size: 0.65rem;
          padding: 4px 8px;
          border-radius: 4px;
          width: fit-content;
          font-weight: 700;
          text-transform: uppercase;
        }
        .panel-badge.react-badge {
          background: rgba(139,92,246,0.15);
          color: #c084fc;
        }
        .compare-panel h3 {
          margin: 0;
          font-size: 1.05rem;
          color: white;
          font-family: monospace;
        }
        .val-box {
          background: rgba(0,0,0,0.2);
          padding: 12px;
          border-radius: 6px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .val-label { font-size: 0.75rem; color: #94a3b8; }
        .val-number { font-size: 1.8rem; font-weight: bold; font-family: monospace; }
        .viz-btn {
          padding: 10px;
          border-radius: 6px;
          border: none;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .viz-btn:hover { opacity: 0.9; }
        .red-btn { background: #ef4444; }
        .green-btn { background: #10b981; }
        
        .render-status { font-size: 0.75rem; color: #64748b; }
        .status-label {
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
        }
        .status-label.idle { background: #334155; color: #cbd5e1; }
        .status-label.active { background: rgba(16,185,129,0.15); color: #34d399; }
        
        .flash-animation {
          animation: flash-green 0.5s ease-out;
        }
        @keyframes flash-green {
          0% { background-color: rgba(16,185,129,0.5); }
          100% { background-color: rgba(16,185,129,0.15); }
        }
        
        /* Logs & Theory notes */
        .logs-and-theory {
          margin-top: 10px;
        }
        .viz-logs-console {
          background: #090d16;
          border: 1px solid #1e293b;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          height: 180px;
        }
        .console-header {
          padding: 6px 12px;
          background: #111827;
          border-bottom: 1px solid #1f2937;
          font-size: 0.7rem;
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #94a3b8;
        }
        .clear-btn {
          background: transparent;
          border: none;
          color: #475569;
          cursor: pointer;
        }
        .clear-btn:hover { color: #cbd5e1; }
        .console-body {
          flex: 1;
          padding: 8px;
          overflow-y: auto;
          font-family: monospace;
          font-size: 0.7rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .console-empty { color: #475569; font-style: italic; text-align: center; margin-top: 30px; }
        .console-line { line-height: 1.3; }
        .state-line { color: #34d399; }
        .var-line { color: #f87171; }
        .sys-line { color: #60a5fa; }
        
        .theory-notes {
          background: rgba(255,255,255,0.02);
          border: 1px dashed #334155;
          border-radius: 8px;
          padding: 16px;
        }
        .theory-notes h4 { margin-top: 0; margin-bottom: 8px; font-size: 0.85rem; color: #f1f5f9; }
        .theory-notes ul { margin: 0; padding-left: 16px; font-size: 0.75rem; color: #94a3b8; display: flex; flex-direction: column; gap: 8px; }
        .theory-notes li strong { color: #cbd5e1; }
        
        /* List render sandbox & control-bar */
        .viz-control-bar {
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }
        .add-task-form {
          display: flex;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 6px;
          overflow: hidden;
          flex: 1;
          min-width: 180px;
        }
        .add-task-form input {
          background: transparent;
          border: none;
          padding: 6px 10px;
          color: white;
          font-size: 0.8rem;
          outline: none;
          flex: 1;
        }
        .add-btn {
          background: #00d1d1;
          border: none;
          color: #0f172a;
          padding: 0 10px;
          cursor: pointer;
        }
        
        .filter-group, .layout-toggle {
          display: flex;
          background: #1e293b;
          padding: 2px;
          border-radius: 6px;
          border: 1px solid #334155;
        }
        .filter-group button, .layout-toggle button {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.75rem;
          padding: 4px 10px;
          cursor: pointer;
          border-radius: 4px;
        }
        .filter-group button.active, .layout-toggle button.active {
          background: #334155;
          color: white;
        }
        
        .simulate-btn {
          background: transparent;
          border: 1px solid #334155;
          color: #94a3b8;
          border-radius: 6px;
          padding: 6px 12px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .simulate-btn:hover { border-color: #00d1d1; color: white; }
        
        /* List Viewport Layout */
        .list-viewport {
          display: flex;
          flex-direction: column;
          height: 280px;
          padding: 0;
          overflow: hidden;
        }
        .viewport-header {
          background: #1e293b;
          padding: 6px 12px;
          border-bottom: 1px solid #334155;
          font-size: 0.7rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #94a3b8;
        }
        .viewport-controls { display: flex; gap: 4px; }
        .viewport-controls .dot { width: 8px; height: 8px; border-radius: 50%; }
        .viewport-controls .dot.red { background: #ef4444; }
        .viewport-controls .dot.yellow { background: #facc15; }
        .viewport-controls .dot.green { background: #10b981; }
        .viewport-body {
          flex: 1;
          padding: 12px;
          overflow-y: auto;
          background: #020617;
        }
        .loading-spinner-state {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          gap: 12px;
          color: #94a3b8;
          font-size: 0.8rem;
        }
        .spinner-icon { color: #00d1d1; }
        .rotate-animation {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .empty-state {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          color: #475569;
          font-size: 0.8rem;
        }
        
        .grid-list-view {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        @media (max-width: 480px) {
          .grid-list-view { grid-template-columns: 1fr; }
        }
        .row-list-view {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .task-card-item {
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 6px;
          padding: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: border-color 0.2s;
        }
        .task-card-item:hover { border-color: #334155; }
        .task-card-item.completed { opacity: 0.6; }
        .card-item-left {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          flex: 1;
        }
        .checkbox-circle {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1.5px solid #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .checkbox-circle.checked {
          background: #10b981;
          border-color: #10b981;
          color: white;
        }
        .task-content { display: flex; flex-direction: column; }
        .task-text { font-size: 0.8rem; color: #f1f5f9; font-weight: 550; }
        .task-card-item.completed .task-text { text-decoration: line-through; color: #64748b; }
        .task-cat { font-size: 0.65rem; color: #64748b; }
        .delete-task-btn {
          background: transparent;
          border: none;
          color: #475569;
          cursor: pointer;
          padding: 4px;
        }
        .delete-task-btn:hover { color: #f43f5e; }
        
        /* Debug elements keys */
        .debug-key-settings h4 { margin-top: 0; margin-bottom: 8px; font-size: 0.85rem; }
        .alert-warning-box {
          background: rgba(245,158,11,0.06);
          border: 1px solid rgba(245,158,11,0.2);
          border-radius: 6px;
          padding: 10px;
          font-size: 0.75rem;
          color: #fbbf24;
          line-height: 1.4;
        }
        .alert-success-box {
          background: rgba(16,185,129,0.06);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 6px;
          padding: 10px;
          font-size: 0.75rem;
          color: #34d399;
          line-height: 1.4;
        }
        
        /* Controlled Signup form sandbox */
        .form-sandbox-panel {
          display: flex;
          flex-direction: column;
        }
        .sandbox-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 10px;
        }
        .input-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .input-field label { font-size: 0.7rem; font-weight: 600; color: #94a3b8; }
        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 10px;
          color: #475569;
        }
        .input-wrapper input {
          width: 100%;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 6px;
          padding: 8px 10px 8px 32px;
          color: white;
          font-size: 0.8rem;
          outline: none;
        }
        .input-wrapper input:focus { border-color: #00d1d1; }
        .error-text { color: #f43f5e; font-size: 0.65rem; margin-top: 2px; }
        
        .checkbox-field label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: #cbd5e1;
          cursor: pointer;
        }
        .submit-form-btn {
          background: #00d1d1;
          color: #0f172a;
          font-weight: bold;
          border: none;
          padding: 10px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
        }
        .form-success-banner {
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 6px;
          color: #34d399;
          font-size: 0.75rem;
          padding: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        /* State Tracker Monitor panel */
        .state-tracker-panel {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .state-tree-viewer {
          border: 1px solid #334155;
          border-radius: 6px;
          background: #090d16;
          overflow: hidden;
        }
        .state-tree-viewer.errors-viewer {
          border-color: rgba(244,63,94,0.3);
        }
        .state-tree-viewer .viewer-header {
          padding: 4px 8px;
          background: #111827;
          border-bottom: 1px solid #1f2937;
          font-size: 0.65rem;
          font-weight: 700;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .state-json {
          margin: 0;
          padding: 8px;
          font-family: monospace;
          font-size: 0.7rem;
          color: #f1f5f9;
        }
        
        /* Lifecycle simulator components */
        .lifecycle-controls {
          display: flex;
          flex-direction: column;
        }
        .api-profile-box {
          margin-top: 16px;
          border: 1px solid #334155;
          border-radius: 6px;
          overflow: hidden;
        }
        .api-profile-box .box-header {
          background: #1e293b;
          padding: 4px 8px;
          font-size: 0.65rem;
          display: flex;
          align-items: center;
          gap: 4px;
          color: #94a3b8;
          border-bottom: 1px solid #334155;
        }
        .api-profile-box .box-body {
          background: #020617;
          min-height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
        }
        .simulated-loader {
          display: flex;
          gap: 8px;
          align-items: center;
          color: #64748b;
          font-size: 0.75rem;
        }
        .simulated-profile {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 100%;
          position: relative;
        }
        .profile-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: rgba(16,185,129,0.15);
          color: #34d399;
          font-size: 0.6rem;
          font-weight: bold;
          padding: 1px 6px;
          border-radius: 10px;
        }
        .simulated-profile h4 { margin: 0; font-size: 0.9rem; color: white; }
        .simulated-profile p { margin: 0; font-size: 0.75rem; color: #94a3b8; }
        .ping-time { font-size: 0.6rem; color: #475569; }
        
        .simulated-empty { color: #475569; font-style: italic; font-size: 0.75rem; }
        
        .lifecycle-logs-panel {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .log-line {
          font-size: 0.7rem;
          border-bottom: 1px solid #1e293b;
          padding-bottom: 4px;
          line-height: 1.4;
        }
        .log-success { color: #34d399; }
        .log-error { color: #f87171; }
        .log-warning { color: #facc15; }
        .log-normal { color: #94a3b8; }
        
        .dependency-block {
          margin-top: auto;
          background: #090d16;
          border: 1px solid #1e293b;
          border-radius: 6px;
          padding: 10px;
        }
        .dependency-block h5 { margin-top: 0; margin-bottom: 6px; font-size: 0.7rem; color: #cbd5e1; }
        .array-chip {
          font-family: monospace;
          font-size: 0.75rem;
          color: #cbd5e1;
        }
        .dependency-var { color: #00d1d1; font-weight: bold; }
        
        /* Router Simulator Box */
        .router-simulator-box {
          border: 1px solid #334155;
          border-radius: 8px;
          background: #020617;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 300px;
        }
        .browser-bar {
          background: #1e293b;
          padding: 8px 12px;
          display: flex;
          gap: 12px;
          align-items: center;
          border-bottom: 1px solid #334155;
        }
        .browser-navigation-arrows {
          display: flex;
          gap: 6px;
        }
        .nav-arrow {
          background: #0f172a;
          border: 1px solid #334155;
          color: #94a3b8;
          border-radius: 4px;
          padding: 2px 6px;
          cursor: pointer;
          font-size: 0.65rem;
        }
        .nav-arrow:disabled { opacity: 0.3; cursor: not-allowed; }
        .browser-address-input {
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 6px;
          padding: 4px 10px;
          flex: 1;
          font-family: monospace;
          font-size: 0.75rem;
          display: flex;
          overflow: hidden;
        }
        .domain-prefix { color: #475569; }
        .address-path { color: #34d399; font-weight: bold; }
        
        .browser-viewport-layout {
          flex: 1;
          display: grid;
          grid-template-columns: 140px 1fr;
          min-height: 0;
        }
        .browser-navbar-aside {
          background: #0f172a;
          border-right: 1px solid #1e293b;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .navbar-logo {
          font-weight: bold;
          font-size: 0.8rem;
          color: #00d1d1;
          letter-spacing: 0.5px;
          border-bottom: 1px dashed #334155;
          padding-bottom: 6px;
        }
        .navbar-links-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .nav-link {
          background: transparent;
          border: none;
          color: #94a3b8;
          text-align: left;
          padding: 6px 8px;
          font-size: 0.7rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .nav-link:hover, .nav-link.active {
          background: #1e293b;
          color: white;
        }
        .nav-link.text-red { color: #f87171; }
        .nav-link.text-red:hover { background: rgba(244,63,94,0.1); }
        
        .browser-viewport-display {
          padding: 16px;
          overflow-y: auto;
          background: #020617;
        }
        .route-page {
          display: flex;
          flex-direction: column;
          gap: 8px;
          height: 100%;
        }
        .route-page h3 { margin: 0; font-size: 0.95rem; color: white; }
        .route-page p { margin: 0; font-size: 0.75rem; color: #94a3b8; line-height: 1.4; }
        .route-page code { background: #1e293b; padding: 2px 4px; border-radius: 4px; color: #00d1d1; font-size: 0.7rem; }
        .action-box { margin-top: auto; }
        .action-btn {
          background: #00d1d1;
          color: #0f172a;
          font-weight: bold;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.75rem;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .courses-grid {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 8px;
        }
        .course-chip {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 6px;
          padding: 6px 10px;
          font-size: 0.7rem;
          color: #cbd5e1;
        }
        .profile-details-mini {
          background: #1e293b;
          padding: 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          color: #94a3b8;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        /* Routing Flow Schema Diagram */
        .routing-code-mapping {
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 8px;
          padding: 12px;
        }
        .routing-code-mapping h4 { margin-top: 0; margin-bottom: 10px; font-size: 0.8rem; color: #f1f5f9; }
        .router-flow-diagram {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        @media (max-width: 480px) {
          .router-flow-diagram { flex-direction: column; align-items: stretch; }
        }
        .flow-element {
          flex: 1;
          border: 1px solid #334155;
          border-radius: 6px;
          background: #1e293b;
          padding: 10px;
          font-size: 0.75rem;
        }
        .flow-element.client-request { border-left: 3px solid #00d1d1; }
        .flow-element.routes-switch { border-left: 3px solid #8b5cf6; }
        .flow-element.routes-switch span { font-weight: bold; color: #c084fc; display: block; margin-bottom: 6px; }
        .routes-case-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-family: monospace;
          font-size: 0.65rem;
        }
        .route-case-line {
          padding: 3px 6px;
          border-radius: 4px;
          color: #475569;
        }
        .route-case-line.active {
          background: rgba(139,92,246,0.1);
          color: #cbd5e1;
          border: 1px solid rgba(139,92,246,0.2);
        }
      `}} />
    </div>
  );
};
