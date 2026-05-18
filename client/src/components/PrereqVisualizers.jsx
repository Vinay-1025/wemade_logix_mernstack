import React, { useState, useEffect } from 'react';
import { useCourse } from '../context/CourseContext';
import { 
  Globe, Server, Database, ArrowRight, Play, Cpu, ShieldCheck, 
  Terminal, Lock, Unlock, Wifi, RefreshCw, Send, HelpCircle,
  Eye, FileText, Code2, Monitor, AlertCircle, CheckCircle2,
  Smartphone, HardDrive, Mail, Laptop, Link2, FileCode, CheckSquare,
  Volume2
} from 'lucide-react';

// ===================================================
// 1. WEB FUNDAMENTALS (Topics 1-5 Custom Visualizers)
// ===================================================

export const WebFundamentalsVisualizer = () => {
  const { selectedTopic } = useCourse();

  // Dynamically route each prerequisite topic (1-5) to its unique interactive visualizer
  switch (selectedTopic?.id) {
    case 'w1-d0-t1':
      return <IntroductionToWebVisualizer />;
    case 'w1-d0-t2':
      return <TypesOfWebVisualizer />;
    case 'w1-d0-t3':
      return <FrontendTriadSandbox />;
    case 'w1-d0-t4':
      return <BackendAPIWorkbench />;
    case 'w1-d0-t5':
      return <FullStackTracer />;
    default:
      return <IntroductionToWebVisualizer />;
  }
};

// ---------------------------------------------------
// Topic 1: Introduction to Web Development
// ---------------------------------------------------
const IntroductionToWebVisualizer = () => {
  const [status, setStatus] = useState('idle'); // 'idle' | 'dns' | 'sending' | 'server' | 'response' | 'rendering'
  const [logs, setLogs] = useState([]);
  const [clicks, setClicks] = useState(0);

  const addLog = (text) => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), text }]);
  };

  const startPipeline = () => {
    if (status !== 'idle') return;
    setStatus('dns');
    setLogs([]);
    addLog('Browser: Triggered page request for mywebsite.com');
    
    setTimeout(() => {
      setStatus('sending');
      addLog('DNS Resolver: Resolved mywebsite.com to 104.244.42.1');
      addLog('Browser: Establishes secure HTTPS link and transmits packets...');
    }, 1200);

    setTimeout(() => {
      setStatus('server');
      addLog('Gateway Router: Forwarded request through WAN network nodes');
      addLog('Express Server: Request received, loading static page template...');
    }, 2600);

    setTimeout(() => {
      setStatus('response');
      addLog('Express Server: Packaging HTML/CSS/JS payload, sending back 200 OK');
    }, 3800);

    setTimeout(() => {
      setStatus('rendering');
      addLog('Browser: Compiling DOM tree & applying CSS layout constraints...');
    }, 4800);

    setTimeout(() => {
      setStatus('idle');
      addLog('Browser: Render complete! Interactive client-side loop is active.');
    }, 5800);
  };

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light blue">Interactive Request Flow</span>
        <h3>How the Web Works: Browser ⇄ Server Pipeline</h3>
      </div>
      
      {/* Visual Pipeline Layout */}
      <div className="pipeline-container">
        {/* Browser Node */}
        <div className={`pipeline-node-box browser ${status === 'dns' || status === 'sending' || status === 'rendering' ? 'glow-blue' : ''}`}>
          <div className="node-box-header"><Monitor size={14} /> Client Browser</div>
          <div className="browser-frame-mock">
            <div className="browser-address-bar">
              <span className="https-lock"><Lock size={8} /></span>
              <input type="text" readOnly value="https://mywebsite.com" />
            </div>
            <div className="browser-content-pane">
              {status === 'rendering' || (status === 'idle' && logs.length > 0) ? (
                <div className="mock-render-page animate-fade">
                  <h4>My Portfolio Site</h4>
                  <p>Welcome! Loaded in 120ms.</p>
                  <button className="preview-btn-click" onClick={() => setClicks(c => c + 1)}>
                    Likes: {clicks}
                  </button>
                </div>
              ) : (
                <div className="mock-render-placeholder">
                  {status === 'idle' ? 'No active page session' : <div className="spinner-mini" />}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Network Cable Links */}
        <div className="network-cable-connector">
          <div className={`data-packet-laser ${status === 'sending' ? 'to-server' : ''} ${status === 'response' ? 'to-client' : ''}`} />
          {status === 'dns' && <div className="dns-lookup-bubble animate-pulse">DNS: 104.244.42.1</div>}
        </div>

        {/* Server & DB Center */}
        <div className={`pipeline-node-box server ${status === 'server' || status === 'response' ? 'glow-indigo' : ''}`}>
          <div className="node-box-header"><Server size={14} /> Web Server</div>
          <div className="server-hardware-mock">
            <div className="server-led-strip">
              <div className={`led-dot ${status === 'server' ? 'active-green' : ''}`} />
              <div className={`led-dot ${status === 'response' ? 'active-blue' : ''}`} />
              <div className="led-dot" />
            </div>
            <div className="server-specs-list">
              <span>Port: 443 (HTTPS)</span>
              <span>Express Engine</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controller Desk */}
      <div className="controls-and-logs-grid mt-4">
        <div className="pipeline-controls-panel">
          <p className="panel-desc-para text-xs">Trigger a mock HTTP GET cycle and track how data transfers through network cables and servers.</p>
          <button className="btn-action-primary" onClick={startPipeline} disabled={status !== 'idle'}>
            <Play size={14} /> {status === 'idle' ? 'Send HTTP GET Request' : 'Transmission Active...'}
          </button>
        </div>
        <div className="console-panel-light">
          <span className="panel-title">Network Trace logs</span>
          <div className="logs-screen-small">
            {logs.length === 0 ? (
              <div className="empty-logs py-4">
                <Terminal size={16} />
                <span>Click Send Request to trace HTTP lifecycle</span>
              </div>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className="log-line">
                  <span className="time">[{log.time}]</span> {log.text}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------
// Topic 2: Types of Web Development
// ---------------------------------------------------
const TypesOfWebVisualizer = () => {
  const [activeRole, setActiveRole] = useState('frontend'); // 'frontend' | 'backend' | 'fullstack'
  const [selectedTask, setSelectedTask] = useState(null);

  const roleDetails = {
    frontend: {
      title: "Frontend Engineer",
      skills: [
        { name: "UI/UX Fidelity", val: 95 },
        { name: "State Management", val: 85 },
        { name: "DOM & Core JS", val: 90 },
        { name: "Server API Integration", val: 75 }
      ],
      tools: ["React", "HTML5", "CSS3 / Sass", "TailwindCSS", "Redux", "Vite"],
      tasks: [
        {
          name: "Design responsive login view",
          code: `// React Frontend Component
import React, { useState } from 'react';
import axios from 'axios';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    alert('Logged in successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <input type="email" onChange={e => setEmail(e.target.value)} />
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Sign In</button>
    </form>
  );
};`
        },
        {
          name: "Configure dark-mode styles",
          code: `/* CSS Variables & Dark Mode Styling */
:root {
  --bg-primary: #ffffff;
  --text-primary: #1e293b;
}

[data-theme='dark'] {
  --bg-primary: #0f172a;
  --text-primary: #f8fafc;
}

.profile-card {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background 0.3s ease;
}`
        }
      ]
    },
    backend: {
      title: "Backend Engineer",
      skills: [
        { name: "API Architecture", val: 95 },
        { name: "Database Schema Design", val: 90 },
        { name: "Security & Encryption", val: 85 },
        { name: "Scalability / Caching", val: 80 }
      ],
      tools: ["Node.js", "Express", "MongoDB / Mongoose", "PostgreSQL", "JWT Auth", "Docker"],
      tasks: [
        {
          name: "Create register API endpoint",
          code: `// Node.js & Express Controller
import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Hash password securely before database write
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
      username,
      email,
      passwordHash: hashedPassword
    });
    
    res.status(201).json({ success: true, userId: newUser._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});`
        },
        {
          name: "Add authentication middleware",
          code: `// JSON Web Token Auth Validator
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Auth token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};`
        }
      ]
    },
    fullstack: {
      title: "Full Stack Architect",
      skills: [
        { name: "E2E Architecture", val: 95 },
        { name: "System Orchestration", val: 90 },
        { name: "Database Optimization", val: 85 },
        { name: "DevOps & CI/CD", val: 80 }
      ],
      tools: ["MERN Stack", "Next.js", "Prisma", "AWS / Firebase", "GraphQL", "Nginx"],
      tasks: [
        {
          name: "Connect frontend client with server API",
          code: `// Complete MERN Pipeline Connection (client/src/api.js)
import axios from 'ajax';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

// Automatically inject JWT bearer token into every outbound request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

export default api;`
        },
        {
          name: "Design complete User Mongo Schema",
          code: `// Mongoose User Document Schema (server/models/User.js)
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student', 'tutor'], default: 'student' }
}, {
  timestamps: true
});

export const User = mongoose.model('User', userSchema);`
        }
      ]
    }
  };

  const details = roleDetails[activeRole];

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light violet">Stack Roles & Matrices</span>
        <h3>Types of Web Development: Roles Explorer</h3>
      </div>

      <div className="role-selector-tab-row">
        <button className={`tab-btn-pill ${activeRole === 'frontend' ? 'active' : ''}`} onClick={() => { setActiveRole('frontend'); setSelectedTask(null); }}>
          Frontend Dev
        </button>
        <button className={`tab-btn-pill ${activeRole === 'backend' ? 'active' : ''}`} onClick={() => { setActiveRole('backend'); setSelectedTask(null); }}>
          Backend Dev
        </button>
        <button className={`tab-btn-pill ${activeRole === 'fullstack' ? 'active' : ''}`} onClick={() => { setActiveRole('fullstack'); setSelectedTask(null); }}>
          Full Stack Dev
        </button>
      </div>

      <div className="prereq-grid-split">
        {/* Left details pane */}
        <div className="role-dashboard-pane">
          <h4>{details.title} Overview</h4>
          
          <div className="skills-meter-list mt-3">
            {details.skills.map((skill, idx) => (
              <div key={idx} className="skill-meter-item">
                <div className="skill-label-row">
                  <span>{skill.name}</span>
                  <strong>{skill.val}%</strong>
                </div>
                <div className="skill-bar-outer">
                  <div className="skill-bar-fill" style={{ width: `${skill.val}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="tools-badges-cluster mt-3">
            <strong>Typical Stack Tools:</strong>
            <div className="tag-row flex-wrap mt-1">
              {details.tools.map((t, idx) => (
                <span key={idx} className="pill blue">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right sandbox / tasks pane */}
        <div className="role-tasks-pane">
          <strong>Daily Tasks & Deliverables:</strong>
          <p className="info-helper-para text-xs">Click a task below to view actual code snippets written in this role:</p>
          <div className="tasks-triggers-list mt-2">
            {details.tasks.map((task, idx) => (
              <button 
                key={idx} 
                className={`task-trigger-btn ${selectedTask?.name === task.name ? 'active' : ''}`}
                onClick={() => setSelectedTask(task)}
              >
                <Code2 size={12} /> {task.name}
              </button>
            ))}
          </div>

          {selectedTask ? (
            <div className="mock-code-block mt-3 animate-fade">
              <span className="code-block-header">{selectedTask.name}</span>
              <pre className="code-pre">
                <code>{selectedTask.code}</code>
              </pre>
            </div>
          ) : (
            <div className="select-task-placeholder mt-3">
              <HelpCircle size={20} />
              <span>Select a task above to trace real development files</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------
// Topic 3: Frontend Development
// ---------------------------------------------------
const FrontendTriadSandbox = () => {
  const [htmlEnabled, setHtmlEnabled] = useState(true);
  const [cssEnabled, setCssEnabled] = useState(true);
  const [jsEnabled, setJsEnabled] = useState(true);
  const [likes, setLikes] = useState(42);
  const [isFollowed, setIsFollowed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const triggerJsAction = (action, callback) => {
    if (!jsEnabled) {
      setAlertMsg("⚠️ JavaScript Engine is Disabled! Event handlers are not registered, so dynamic interactions are completely ignored.");
      setTimeout(() => setAlertMsg(''), 4000);
      return;
    }
    callback();
  };

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light orange">Frontend Sandbox</span>
        <h3>The HTML, CSS & JS Triad Interactive Lab</h3>
      </div>

      <div className="prereq-grid-split">
        {/* Toggle Panel Left */}
        <div className="triad-controls-panel">
          <p className="info-helper-para mb-3">Toggle checkboxes to isolate what each language contributes to browser UI compilation.</p>
          
          <div className="toggle-switch-wrapper">
            <label className="toggle-switch-item">
              <input type="checkbox" checked={htmlEnabled} onChange={() => setHtmlEnabled(!htmlEnabled)} />
              <span className="toggle-label orange">HTML (Structure Skeleton)</span>
            </label>
            <label className="toggle-switch-item">
              <input type="checkbox" checked={cssEnabled} disabled={!htmlEnabled} onChange={() => setCssEnabled(!cssEnabled)} />
              <span className="toggle-label blue">CSS (Visual Layout & Styling)</span>
            </label>
            <label className="toggle-switch-item">
              <input type="checkbox" checked={jsEnabled} disabled={!htmlEnabled} onChange={() => setJsEnabled(!jsEnabled)} />
              <span className="toggle-label yellow">JavaScript (Dynamic Action Logic)</span>
            </label>
          </div>

          <div className="triad-explanation-box mt-3 text-xs">
            {htmlEnabled && !cssEnabled && !jsEnabled && (
              <span className="text-orange">Only HTML elements are parsed into the DOM tree. Standard browser styling (serif, vertical listing) renders raw and un-styled.</span>
            )}
            {htmlEnabled && cssEnabled && !jsEnabled && (
              <span className="text-blue">CSS parses the styles and aligns the visual elements beautifully, but the card remains completely static and unresponsive to clicks.</span>
            )}
            {htmlEnabled && cssEnabled && jsEnabled && (
              <span className="text-green">All layers active! HTML shapes structure, CSS designs presentation, and JS binds click listeners for full web app dynamics.</span>
            )}
            {!htmlEnabled && (
              <span className="text-red">Without HTML, the DOM tree remains empty. There is absolutely no layout for CSS or JS to query and modify!</span>
            )}
          </div>
        </div>

        {/* Sandbox Browser Frame Right */}
        <div className="triad-sandbox-browser">
          <div className="browser-header-mock">
            <span className="browser-circle red" />
            <span className="browser-circle yellow" />
            <span className="browser-circle green" />
            <span className="browser-title-url">Sandbox DOM Compiler</span>
          </div>

          <div className="sandbox-canvas-panel">
            {alertMsg && (
              <div className="js-error-alert animate-fade">
                <AlertCircle size={14} />
                <span>{alertMsg}</span>
              </div>
            )}

            {!htmlEnabled ? (
              <div className="empty-dom-state">
                <Monitor size={24} color="#94a3b8" />
                <strong>DOM Tree Empty</strong>
                <span>No HTML element blocks loaded</span>
              </div>
            ) : !cssEnabled ? (
              // Raw Unstyled HTML representation
              <div className="raw-unstyled-html-pane">
                <h1>Vinay Sharma</h1>
                <p>Full Stack MERN Developer</p>
                <p>Location: Delhi, India</p>
                <div>
                  <button onClick={() => triggerJsAction('like', () => setLikes(l => l + 1))}>
                    Like ({likes})
                  </button>
                  <button onClick={() => triggerJsAction('follow', () => setIsFollowed(!isFollowed))}>
                    {isFollowed ? 'Unfollow' : 'Follow'}
                  </button>
                  <button onClick={() => triggerJsAction('theme', () => setDarkMode(!darkMode))}>
                    Toggle Theme
                  </button>
                </div>
                <hr />
                <a href="#more">View raw portfolio text files...</a>
              </div>
            ) : (
              // Styled Modern Component
              <div className={`premium-rendered-card-outer ${darkMode ? 'dark-card-theme' : 'light-card-theme'}`}>
                <div className="glass-profile-avatar-wrap">
                  <div className="avatar-glass-circle">VS</div>
                </div>
                <div className="card-info-cluster">
                  <h4 className="card-profile-name">Vinay Sharma</h4>
                  <span className="card-profile-title">Full Stack MERN Developer</span>
                  <div className="location-row text-xs"><Globe size={10} /> Delhi, India</div>
                </div>
                
                <div className="card-action-bar-row">
                  <button 
                    className="card-mini-btn like-btn" 
                    onClick={() => triggerJsAction('like', () => setLikes(l => l + 1))}
                  >
                    ❤️ {likes} Likes
                  </button>
                  <button 
                    className={`card-mini-btn follow-btn ${isFollowed ? 'following' : ''}`}
                    onClick={() => triggerJsAction('follow', () => setIsFollowed(!isFollowed))}
                  >
                    {isFollowed ? <CheckCircle2 size={10} /> : <Play size={10} />}
                    {isFollowed ? 'Following' : 'Follow'}
                  </button>
                  <button 
                    className="card-mini-btn theme-btn"
                    onClick={() => triggerJsAction('theme', () => setDarkMode(!darkMode))}
                  >
                    💡
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------
// Topic 4: Backend Development
// ---------------------------------------------------
const BackendAPIWorkbench = () => {
  const [method, setMethod] = useState('POST'); // 'GET' | 'POST'
  const [username, setUsername] = useState('VinayDev');
  const [email, setEmail] = useState('vinay@logix.com');
  const [status, setStatus] = useState('idle'); // 'idle' | 'validating' | 'hashing' | 'saving' | 'done'
  const [logs, setLogs] = useState([]);
  const [dbUsers, setDbUsers] = useState([
    { _id: "usr_01", username: "AzCoder", email: "az@wemadelogix.com", passwordHash: "$2b$10$w1e2m3a4d5e6l7o8g9i10x1", createdAt: "2026-05-18T12:00:00.000Z" }
  ]);

  const addLog = (text) => setLogs(p => [...p, text]);

  const triggerAPI = async () => {
    if (status !== 'idle') return;
    setLogs([]);
    
    if (method === 'GET') {
      setStatus('validating');
      addLog('Server: Initiating GET request handler for /api/users');
      
      setTimeout(() => {
        setStatus('saving');
        addLog('Server: Resolving authorization JWT session token...');
        addLog('MongoDB: Querying cluster collection: `users.find({})`...');
      }, 1000);

      setTimeout(() => {
        setStatus('done');
        addLog('MongoDB: Read query successful! Returned ' + dbUsers.length + ' documents.');
        addLog('Server: Responded with status 200 OK & User payload stream.');
        setStatus('idle');
      }, 2400);
    } 
    
    else {
      if (!username.trim() || !email.trim()) {
        addLog('Error: Validation failed. Fields `username` and `email` are mandatory.');
        return;
      }
      
      setStatus('validating');
      addLog('Server: POST request received at /api/users');
      addLog(`Payload: { username: "${username}", email: "${email}", password: "password123" }`);
      addLog('Server: Validating payload variables (pattern verification)...');

      setTimeout(() => {
        setStatus('hashing');
        addLog('Server: Input sanitized. Initiating cryptography package...');
        addLog('Server: bcrypt.hash("password123", 10) called.');
      }, 1000);

      setTimeout(() => {
        setStatus('saving');
        const hash = '$2b$10$hashedSalted' + Math.random().toString(36).substring(2, 12);
        addLog(`Server: Generated cryptographic digest: ${hash}`);
        addLog('MongoDB: Running database command `users.insertOne({...})`');
      }, 2200);

      setTimeout(() => {
        const hash = '$2b$10$hashedSalted' + Math.random().toString(36).substring(2, 12);
        const newUser = {
          _id: "usr_" + Math.floor(Math.random() * 900 + 100),
          username,
          email,
          passwordHash: hash,
          createdAt: new Date().toISOString()
        };
        setDbUsers(prev => [newUser, ...prev]);
        setStatus('done');
        addLog('MongoDB: Write successful. Record saved.');
        addLog('Server: Responded status 201 Created and JSON auth payload.');
        setStatus('idle');
      }, 3400);
    }
  };

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light green">Backend Engine Lab</span>
        <h3>Database & API Engine Visualizer</h3>
      </div>

      <div className="backend-workbench-grid">
        {/* Left: Input Desk */}
        <div className="workbench-panel flex-column">
          <strong>REST API Request Client</strong>
          
          <div className="method-pill-selector mt-2">
            <button className={`method-btn ${method === 'POST' ? 'active-post' : ''}`} onClick={() => setMethod('POST')}>POST</button>
            <button className={`method-btn ${method === 'GET' ? 'active-get' : ''}`} onClick={() => setMethod('GET')}>GET</button>
          </div>

          <div className="api-url-bar mt-2">
            <span className="url-method-label">{method}</span>
            <input type="text" readOnly value="/api/users" />
          </div>

          {method === 'POST' ? (
            <div className="form-group-cluster mt-2">
              <div className="form-field-item text-xs">
                <label>Username:</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} disabled={status !== 'idle'} />
              </div>
              <div className="form-field-item text-xs mt-1">
                <label>Email Address:</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={status !== 'idle'} />
              </div>
            </div>
          ) : (
            <div className="form-group-cluster mt-2 text-xs text-neutral py-3 text-center">
              <span>Read API requires no body fields. Reads current database data.</span>
            </div>
          )}

          <button className={`btn-action-primary mt-3 ${method === 'GET' ? 'green' : ''}`} onClick={triggerAPI} disabled={status !== 'idle'}>
            <Send size={12} /> {status === 'idle' ? 'Send Request' : 'Processing API...'}
          </button>
        </div>

        {/* Middle: Server Processing Console */}
        <div className="console-panel-light flex-column">
          <span className="panel-title">Server Console logs</span>
          <div className="logs-screen-small flex-grow text-xs">
            {logs.length === 0 ? (
              <div className="empty-logs py-4">
                <Cpu size={16} />
                <span>Submit a request to execute server routines</span>
              </div>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className="log-line-item">{log}</div>
              ))
            )}
          </div>
        </div>

        {/* Right: Mock Database */}
        <div className="mock-db-panel flex-column">
          <strong>MongoDB Atlas Cluster</strong>
          <span className="text-xs text-neutral">Collection: <span className="text-indigo text-bold">users</span></span>
          
          <div className="db-records-list-wrapper mt-2">
            {dbUsers.map((user) => (
              <div key={user._id} className="db-user-document-card animate-fade">
                <div className="document-header">
                  <Database size={10} color="#059669" />
                  <strong>Document: {user._id}</strong>
                </div>
                <div className="document-body text-xxs">
                  <div><span className="lbl">username:</span> "{user.username}"</div>
                  <div><span className="lbl">email:</span> "{user.email}"</div>
                  <div className="hash-wrap"><span className="lbl">passwordHash:</span> <span className="hash-val" title={user.passwordHash}>{user.passwordHash.substring(0, 18)}...</span></div>
                  <div><span className="lbl">createdAt:</span> <span className="time-val">{new Date(user.createdAt).toLocaleTimeString()}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------
// Topic 5: Full Stack Development
// ---------------------------------------------------
const FullStackTracer = () => {
  const [activeStep, setActiveStep] = useState(0); // 0: idle, 1: React, 2: Express, 3: MongoDB, 4: DB Success, 5: UI Compile
  const [postText, setPostText] = useState('Learning MERN Stack with Vinay! ⚡');
  const [posts, setPosts] = useState([
    { id: 1, text: "React Frontend is connected with Express API routing!", author: "Admin", time: "15:00" }
  ]);

  const runMernTransaction = () => {
    if (activeStep !== 0) return;
    if (!postText.trim()) return;

    setActiveStep(1);

    setTimeout(() => {
      setActiveStep(2);
    }, 1500);

    setTimeout(() => {
      setActiveStep(3);
    }, 3000);

    setTimeout(() => {
      setActiveStep(4);
    }, 4500);

    setTimeout(() => {
      setActiveStep(5);
      const newPost = {
        id: Date.now(),
        text: postText,
        author: "Student",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setPosts(prev => [newPost, ...prev]);
    }, 6000);

    setTimeout(() => {
      setActiveStep(0);
      setPostText('');
    }, 7500);
  };

  const getStepDescription = () => {
    switch (activeStep) {
      case 1:
        return {
          title: "Tier 1: React State & Axios Event",
          desc: "The button click updates React State to loading. An asynchronous HTTP POST request is formatted and transmitted across networks by the client engine."
        };
      case 2:
        return {
          title: "Tier 2: Express Routing & Middleware",
          desc: "The HTTP POST request lands on the Express server port. Middleware validates the user Session JWT, parses variables, and routes them to the post controller."
        };
      case 3:
        return {
          title: "Tier 3: MongoDB Database Write Query",
          desc: "The post controller models the payload via a Mongoose Schema. MongoDB executes the command, allocating memory sectors to save the new document."
        };
      case 4:
        return {
          title: "Tier 4: Server Database Response",
          desc: "MongoDB logs the write successfully and returns a positive write-result. Express packages this success into a clean 200 OK JSON status code response."
        };
      case 5:
        return {
          title: "Tier 5: React Virtual DOM Re-render",
          desc: "React receives the JSON response. The client component state changes, triggering a fast Virtual DOM diff and refreshing the browser screen with the new post item!"
        };
      default:
        return {
          title: "Full MERN Transaction Pipeline Idle",
          desc: "Compose an announcement post below and launch the MERN stack transaction tracer to see exactly how data cascades through the full architecture."
        };
    }
  };

  const stepMeta = getStepDescription();

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light blue">MERN Transaction Tracer</span>
        <h3>End-to-End fullstack Architecture Pipeline</h3>
      </div>

      {/* Tiers Visualizer Map */}
      <div className="fullstack-flow-map">
        <div className={`flow-tier-box ${activeStep === 1 || activeStep === 5 ? 'active-glow' : ''}`}>
          <Monitor size={18} />
          <strong>1. React Client</strong>
          <span className="text-xxs">State & DOM Skeletons</span>
        </div>
        
        <div className="flow-connector-wire">
          <div className={`wire-pulse-laser ${activeStep === 1 ? 'move-right' : ''} ${activeStep === 4 ? 'move-left' : ''}`} />
        </div>

        <div className={`flow-tier-box ${activeStep === 2 || activeStep === 4 ? 'active-glow' : ''}`}>
          <Server size={18} />
          <strong>2. Express API Server</strong>
          <span className="text-xxs">Controllers & Auth Rules</span>
        </div>

        <div className="flow-connector-wire">
          <div className={`wire-pulse-laser ${activeStep === 2 ? 'move-right' : ''} ${activeStep === 3 ? 'move-left' : ''}`} />
        </div>

        <div className={`flow-tier-box ${activeStep === 3 ? 'active-glow' : ''}`}>
          <Database size={18} />
          <strong>3. MongoDB Cluster</strong>
          <span className="text-xxs">BSON Storage Sheets</span>
        </div>
      </div>

      <div className="prereq-grid-split mt-4">
        {/* Action Panel Left */}
        <div className="transaction-controls-desk flex-column">
          <strong>Announcement Editor</strong>
          
          <div className="form-field-item text-xs mt-2">
            <textarea 
              rows="2"
              value={postText}
              onChange={e => setPostText(e.target.value)}
              placeholder="Write a message to sync through the MERN stack..."
              disabled={activeStep !== 0}
            />
          </div>

          <button className="btn-action-primary mt-2" onClick={runMernTransaction} disabled={activeStep !== 0 || !postText.trim()}>
            <Play size={12} /> {activeStep === 0 ? 'Sync Transaction' : 'Transaction Running...'}
          </button>

          {/* Rendered output inside client */}
          <div className="live-rendered-wall-announcements mt-3">
            <span className="title-announcements text-xxs">Live Announcements Wall</span>
            <div className="posts-inner-wrapper">
              {posts.map(p => (
                <div key={p.id} className="wall-post-card animate-fade">
                  <div className="post-meta-line text-xxs">
                    <strong>{p.author}</strong> <span className="time-val">{p.time}</span>
                  </div>
                  <p className="post-text-p text-xs">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trace Analysis Right */}
        <div className="transaction-trace-analysis-panel flex-column">
          <strong>Pipeline Status Check</strong>
          
          <div className={`analysis-details-box mt-2 ${activeStep > 0 ? 'glowing-step-border' : ''}`}>
            <h5>{stepMeta.title}</h5>
            <p className="step-desc-p mt-1">{stepMeta.desc}</p>
          </div>

          <div className="transaction-progress-bar-wrap mt-3">
            <div className="progress-bar-outer">
              <div className="progress-bar-inner-fill" style={{ width: `${(activeStep / 5) * 100}%` }} />
            </div>
            <div className="step-tracker-nums text-xxs mt-1">
              <span className={activeStep >= 1 ? 'text-indigo' : ''}>Client (1)</span>
              <span className={activeStep >= 2 ? 'text-indigo' : ''}>Router (2)</span>
              <span className={activeStep >= 3 ? 'text-indigo' : ''}>DB (3)</span>
              <span className={activeStep >= 4 ? 'text-indigo' : ''}>Response (4)</span>
              <span className={activeStep >= 5 ? 'text-indigo' : ''}>Update (5)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===================================================
// 2. NETWORK TOPOLOGY SIMULATOR (Topics 6-12)
// ===================================================
export const NetworkTopologySimulator = () => {
  const { selectedTopic } = useCourse();
  const [topology, setTopology] = useState('lan'); // 'pan' | 'lan' | 'man' | 'wan' | 'internet'
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    if (selectedTopic?.id === 'w1-d0-t8') setTopology('pan');
    else if (selectedTopic?.id === 'w1-d0-t9') setTopology('lan');
    else if (selectedTopic?.id === 'w1-d0-t10') setTopology('man');
    else if (selectedTopic?.id === 'w1-d0-t11') setTopology('wan');
    else if (selectedTopic?.id === 'w1-d0-t12') setTopology('internet');
    else setTopology('lan');
  }, [selectedTopic]);

  const triggerPing = () => {
    setIsTransmitting(true);
    setPulseKey(prev => prev + 1);
    setTimeout(() => setIsTransmitting(false), 2000);
  };

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light green">Network Topologies Explorer</span>
        <h3>Interactive Geographical Map</h3>
      </div>

      <div className="prereq-grid-split">
        {/* Visual Map */}
        <div className="topology-sandbox-frame">
          {topology === 'pan' && (
            <div className="pan-scene animate-fade">
              <div className="pan-node main-device"><Smartphone size={24} color="var(--primary-blue)" /><span>Smartphone</span></div>
              <div className="wave-container">
                <div className={`ping-wave ${isTransmitting ? 'animating' : ''}`} key={pulseKey} />
              </div>
              <div className="pan-node peripheral"><Wifi size={20} color="#a855f7" /><span>Wireless Bud</span></div>
              <span className="scene-label">Personal Bluetooth Space (~10m)</span>
            </div>
          )}

          {topology === 'lan' && (
            <div className="lan-scene animate-fade">
              <div className="central-hub"><Wifi size={24} color="var(--primary-cyan)" /><span>Router</span></div>
              <div className="lan-nodes">
                <div className="lan-node"><Laptop size={14} /><span>Laptop</span></div>
                <div className="lan-node"><HardDrive size={14} /><span>Server</span></div>
                <div className="lan-node"><Monitor size={14} /><span>Desktop</span></div>
              </div>
              {isTransmitting && <div className="lan-broadcast-pulse" key={pulseKey} />}
              <span className="scene-label">Local Building Subnet (High-speed LAN)</span>
            </div>
          )}

          {topology === 'man' && (
            <div className="man-scene animate-fade">
              <div className="man-city-ring">
                <div className="city-node"><Server size={14} /><span>Office LAN A</span></div>
                <div className="city-node"><Server size={14} /><span>Office LAN B</span></div>
                <div className="city-node"><Server size={14} /><span>Office LAN C</span></div>
              </div>
              <div className={`fiber-ring-laser ${isTransmitting ? 'animating' : ''}`} key={pulseKey} />
              <span className="scene-label">Metropolitan Fiber Network (City-wide Hub)</span>
            </div>
          )}

          {topology === 'wan' && (
            <div className="wan-scene animate-fade">
              <div className="continent-node us">🇺🇸<span>New York Server</span></div>
              <div className="ocean-wire-line">
                <div className={`submarine-packet ${isTransmitting ? 'animating' : ''}`} key={pulseKey} />
              </div>
              <div className="continent-node jp">🇯🇵<span>Tokyo Client</span></div>
              <span className="scene-label">Trans-Oceanic Submarine Cables (WAN Range)</span>
            </div>
          )}

          {topology === 'internet' && (
            <div className="internet-scene animate-fade">
              <div className="internet-mesh">
                <div className="mesh-node"><Globe size={16} /></div>
                <div className="mesh-node"><Server size={16} /></div>
                <div className="mesh-node"><Cpu size={16} /></div>
                <div className="mesh-node"><Wifi size={16} /></div>
              </div>
              <span className="scene-label">Global Decentralized Mesh (The Internet)</span>
            </div>
          )}
        </div>

        {/* Info panel & trigger */}
        <div className="stack-controls">
          <div className="btn-group-toggle flex-wrap">
            <button className={`toggle-btn ${topology === 'pan' ? 'active' : ''}`} onClick={() => setTopology('pan')}>PAN</button>
            <button className={`toggle-btn ${topology === 'lan' ? 'active' : ''}`} onClick={() => setTopology('lan')}>LAN</button>
            <button className={`toggle-btn ${topology === 'man' ? 'active' : ''}`} onClick={() => setTopology('man')}>MAN</button>
            <button className={`toggle-btn ${topology === 'wan' ? 'active' : ''}`} onClick={() => setTopology('wan')}>WAN</button>
            <button className={`toggle-btn ${topology === 'internet' ? 'active' : ''}`} onClick={() => setTopology('internet')}>Internet</button>
          </div>

          <div className="topology-details-card">
            <h4>How it Routes Data</h4>
            <p>
              {topology === 'pan' && 'Uses short-range, direct wireless pairing (Bluetooth, Zigbee). Packets transmit straight between master and client nodes.'}
              {topology === 'lan' && 'Uses MAC Address broadcasting and Ethernet/Wi-Fi switches. Packages data directly within a shared local subnet router.'}
              {topology === 'man' && 'Binds distant company sites together using local ISP high-speed dark fiber optic rings spanning across city municipal lines.'}
              {topology === 'wan' && 'Routes TCP packets globally across major undersea cabling arrays and complex BGP dynamic routing gateway loops.'}
              {topology === 'internet' && 'A massive mesh of autonomous systems sharing routing standards (TCP/IP) to deliver packets via multiple dynamic paths.'}
            </p>
          </div>

          <button className="btn-action-primary green" onClick={triggerPing} disabled={isTransmitting}>
            <Wifi size={14} />
            {isTransmitting ? 'Broadcasting...' : 'Simulate Ping Transmission'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ===================================================
// 3. CLIENT SERVER ARCHITECTURE SIMULATOR (Topic 13)
// ===================================================
export const ClientServerSimulator = () => {
  const [query, setQuery] = useState('Find flight details');
  const [activeStep, setActiveStep] = useState(0); // 0: idle, 1: req_headers, 2: transit, 3: server, 4: db, 5: response, 6: done
  const [consoleLogs, setConsoleLogs] = useState([]);

  const addLog = (msg) => setConsoleLogs(prev => [...prev, msg]);

  const startSimulation = () => {
    setActiveStep(1);
    setConsoleLogs([]);
    addLog(`Client: Wrapping request payload ("${query}")...`);
    
    setTimeout(() => {
      setActiveStep(2);
      addLog('Network: Routing TCP segments via IP nodes...');
    }, 1000);

    setTimeout(() => {
      setActiveStep(3);
      addLog('Server: Parsing API routes & loading databases...');
    }, 2000);

    setTimeout(() => {
      setActiveStep(4);
      addLog('Database: Selecting matched records from MongoDB...');
    }, 3000);

    setTimeout(() => {
      setActiveStep(5);
      addLog('Server: Formulating HTML page and JSON headers...');
    }, 4000);

    setTimeout(() => {
      setActiveStep(6);
      addLog('Client: Dynamic DOM tree compiled successfully!');
    }, 5000);
  };

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light blue">Client-Server Sandbox</span>
        <h3>Request-Response lifecycle Simulator</h3>
      </div>

      <div className="clientserver-pipeline">
        {/* Nodes */}
        <div className="pipeline-nodes">
          <div className={`pipe-node ${activeStep === 1 || activeStep === 6 ? 'active' : ''}`}>
            <Monitor size={22} />
            <span>Browser Client</span>
          </div>
          <div className={`pipe-bridge ${activeStep === 2 ? 'active' : ''}`} />
          <div className={`pipe-node ${activeStep === 3 || activeStep === 5 ? 'active' : ''}`}>
            <Server size={22} />
            <span>App Server</span>
          </div>
          <div className={`pipe-bridge ${activeStep === 4 ? 'active' : ''}`} />
          <div className={`pipe-node ${activeStep === 4 ? 'active' : ''}`}>
            <Database size={22} />
            <span>MongoDB</span>
          </div>
        </div>

        {/* Control Desk */}
        <div className="prereq-grid-split mt-4">
          <div className="sandbox-panel">
            <div className="input-field-group">
              <label>Enter Client Payload Query:</label>
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={activeStep > 0 && activeStep < 6}
                placeholder="Type dynamic search query..."
              />
            </div>
            <button className="btn-action-primary" onClick={activeStep === 6 ? () => setActiveStep(0) : startSimulation} disabled={activeStep > 0 && activeStep < 6}>
              {activeStep === 6 ? 'Clear Pipeline' : 'Initiate Fetch Request'}
            </button>
          </div>

          <div className="console-panel-light">
            <span className="panel-title">Trace Stream logs</span>
            <div className="logs-screen-small">
              {consoleLogs.length === 0 ? (
                <div className="empty-logs text-center py-4">
                  <Play size={18} />
                  <span>Execute Fetch to watch data flow stages</span>
                </div>
              ) : (
                consoleLogs.map((log, i) => <div key={i} className="log-line-item">{log}</div>)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===================================================
// 4. NETWORK PROTOCOLS WORKBENCH (Topics 14-22)
// ===================================================
export const ProtocolVisualizer = () => {
  const { selectedTopic } = useCourse();
  const [proto, setProto] = useState('http');
  const [step, setStep] = useState(0); // 0: idle, 1: connecting, 2: connected, 3: completed/secure
  const [logs, setLogs] = useState([]);
  const [wsMsg, setWsMsg] = useState('');
  const [wsHistory, setWsHistory] = useState([]);

  useEffect(() => {
    if (selectedTopic?.id === 'w1-d0-t15') setProto('http');
    else if (selectedTopic?.id === 'w1-d0-t16') setProto('https');
    else if (selectedTopic?.id === 'w1-d0-t17') setProto('tcp');
    else if (selectedTopic?.id === 'w1-d0-t18') setProto('ip');
    else if (selectedTopic?.id === 'w1-d0-t19' || selectedTopic?.id === 'w1-d0-t27' || selectedTopic?.id === 'w1-d0-t28') setProto('dns');
    else if (selectedTopic?.id === 'w1-d0-t20') setProto('ftp');
    else if (selectedTopic?.id === 'w1-d0-t21') setProto('smtp');
    else if (selectedTopic?.id === 'w1-d0-t22') setProto('ws');
  }, [selectedTopic]);

  const addLog = (t) => setLogs(p => [...p, t]);

  const runProtocol = () => {
    setLogs([]);
    setStep(1);
    setWsHistory([]);

    if (proto === 'http') {
      addLog('> Opening standard TCP Socket (Port 80)...');
      setTimeout(() => {
        setStep(2);
        addLog('GET /index.html HTTP/1.1');
        addLog('Host: wemadelogix.com');
      }, 1000);
      setTimeout(() => {
        setStep(3);
        addLog('HTTP/1.1 200 OK');
        addLog('[PLAIN TEXT RESPONSE]: <html><body>MERN Stack</body></html>');
      }, 2200);
    } 
    
    else if (proto === 'https') {
      addLog('> Opening secure SSL/TLS Socket (Port 443)...');
      setTimeout(() => {
        setStep(2);
        addLog('> Exchanging cryptographic public keys...');
        addLog('> Certificate validated via Trusted CA Root.');
      }, 1000);
      setTimeout(() => {
        setStep(3);
        addLog('⚡ Cryptographic Symmetric cipher tunnel active!');
        addLog('[ENCRYPTED PAYLOAD]: c4a18ea78bf2d1e01aef');
      }, 2200);
    } 
    
    else if (proto === 'tcp') {
      addLog('> Client sends SYN packet to establish link...');
      setTimeout(() => {
        setStep(2);
        addLog('> Server replies with SYN-ACK packet back...');
      }, 1000);
      setTimeout(() => {
        setStep(3);
        addLog('> Client returns final ACK. Connection established! (3-way handshake done)');
      }, 2200);
    }

    else if (proto === 'ip') {
      addLog('> Wrapping payload segment into IP packet envelope...');
      setTimeout(() => {
        setStep(2);
        addLog('Stamped Headers: [Src: 192.168.1.10 | Dest: 104.22.84.14 | TTL: 64]');
      }, 1000);
      setTimeout(() => {
        setStep(3);
        addLog('IP Envelope routed successfully over local gateway gateways!');
      }, 2200);
    }

    else if (proto === 'dns') {
      addLog('> Resolving domain brand wemadelogix.com...');
      setTimeout(() => {
        setStep(2);
        addLog('Resolver queries root -> queries TLD (.com) -> queries authoritative...');
      }, 1000);
      setTimeout(() => {
        setStep(3);
        addLog('Resolved: wemadelogix.com mapped to Static IP -> 104.244.42.1');
      }, 2200);
    }

    else if (proto === 'ftp') {
      addLog('> Logging into FTP server on Port 21 (Command Channel)...');
      setTimeout(() => {
        setStep(2);
        addLog('> Uploading document profile.pdf on Port 20 (Data Channel)...');
      }, 1000);
      setTimeout(() => {
        setStep(3);
        addLog('100% Upload Complete. Binary stream saved.');
      }, 2200);
    }

    else if (proto === 'smtp') {
      addLog('> SMTP handshaking: HELO client.com...');
      setTimeout(() => {
        setStep(2);
        addLog('MAIL FROM:<admin@wemadelogix.com> | RCPT TO:<user@gmail.com>');
      }, 1000);
      setTimeout(() => {
        setStep(3);
        addLog('Message queued and sent to SMTP recipient gateway!');
      }, 2200);
    }

    else if (proto === 'ws') {
      addLog('> Upgrading HTTP loop: Connection: Upgrade...');
      setTimeout(() => {
        setStep(2);
        addLog('HTTP/1.1 101 Switching Protocols');
        addLog('⚡ Bidirectional TCP WebSocket tunnel open!');
      }, 1000);
    }
  };

  const sendWsMessage = (e) => {
    e.preventDefault();
    if (!wsMsg.trim()) return;
    setWsHistory(prev => [...prev, { from: 'client', text: wsMsg }]);
    const cur = wsMsg;
    setWsMsg('');
    setTimeout(() => {
      setWsHistory(prev => [...prev, { from: 'server', text: `Echo Frame: Received "${cur}" instantly!` }]);
    }, 800);
  };

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light blue">Protocol Workbench</span>
        <h3>Real-time Transmission Sandbox</h3>
      </div>

      <div className="prereq-grid-split">
        {/* Visual Workbench display */}
        <div className="protocol-workbench-display">
          <div className="transmission-nodes">
            <div className="t-node active"><Monitor size={18} /><span>Browser</span></div>
            <div className="transmission-bridge">
              <div className={`bridge-glow-dot ${step === 1 ? 'moving' : ''}`} />
            </div>
            <div className={`t-node ${step >= 2 ? 'active' : ''}`}>
              {proto === 'https' && step === 3 ? <Lock size={18} color="#a855f7" /> : <Server size={18} />}
              <span>{proto === 'dns' ? 'DNS Server' : 'App Server'}</span>
            </div>
          </div>

          <div className="protocol-envelope-visual mt-4">
            {proto === 'http' && <span className="envelope-tag plaintext">HTTP GET Plaintext</span>}
            {proto === 'https' && <span className="envelope-tag secure">{step === 3 ? <Lock size={12}/> : <Unlock size={12}/>} HTTPS SSL/TLS</span>}
            {proto === 'tcp' && <span className="envelope-tag tcp">TCP Segment (Handshake)</span>}
            {proto === 'ws' && <span className="envelope-tag ws">WS Bidirectional Frame</span>}
          </div>
        </div>

        {/* Control desk */}
        <div className="stack-controls">
          <div className="btn-group-toggle flex-wrap">
            <button className={`toggle-btn ${proto === 'http' ? 'active' : ''}`} onClick={() => { setProto('http'); setStep(0); setLogs([]); }}>HTTP</button>
            <button className={`toggle-btn ${proto === 'https' ? 'active' : ''}`} onClick={() => { setProto('https'); setStep(0); setLogs([]); }}>HTTPS</button>
            <button className={`toggle-btn ${proto === 'tcp' ? 'active' : ''}`} onClick={() => { setProto('tcp'); setStep(0); setLogs([]); }}>TCP</button>
            <button className={`toggle-btn ${proto === 'ws' ? 'active' : ''}`} onClick={() => { setProto('ws'); setStep(0); setLogs([]); }}>WebSockets</button>
            <button className={`toggle-btn ${proto === 'dns' ? 'active' : ''}`} onClick={() => { setProto('dns'); setStep(0); setLogs([]); }}>DNS</button>
            <button className={`toggle-btn ${proto === 'ftp' ? 'active' : ''}`} onClick={() => { setProto('ftp'); setStep(0); setLogs([]); }}>FTP</button>
            <button className={`toggle-btn ${proto === 'smtp' ? 'active' : ''}`} onClick={() => { setProto('smtp'); setStep(0); setLogs([]); }}>SMTP</button>
          </div>

          <div className="console-panel-light">
            <span className="panel-title">Packet logs</span>
            <div className="logs-screen-small">
              {proto === 'ws' && step >= 2 ? (
                <div className="ws-inline-chat">
                  <div className="chat-rail">
                    {wsHistory.map((w, idx) => (
                      <div key={idx} className={`chat-line ${w.from}`}>
                        <strong>{w.from}:</strong> {w.text}
                      </div>
                    ))}
                  </div>
                  <form onSubmit={sendWsMessage} className="chat-input-row">
                    <input 
                      type="text" 
                      placeholder="Type instant frame..." 
                      value={wsMsg} 
                      onChange={(e) => setWsMsg(e.target.value)}
                    />
                    <button type="submit"><Send size={12} /></button>
                  </form>
                </div>
              ) : logs.length === 0 ? (
                <div className="empty-logs">
                  <Cpu size={18} />
                  <span>Click Simulate to watch socket packets</span>
                </div>
              ) : (
                logs.map((log, i) => <div key={i} className="log-line-item">{log}</div>)
              )}
            </div>
          </div>

          {!(proto === 'ws' && step >= 2) && (
            <button className="btn-action-primary" onClick={runProtocol}>
              <RefreshCw size={14} /> Simulate Socket Exchange
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ===================================================
// 5. IP ADDRESS ALLOCATOR (Topics 23-26)
// ===================================================
export const IPAddressSimulator = () => {
  const { selectedTopic } = useCourse();
  const [allocationMode, setAllocationMode] = useState('dynamic'); // 'static' | 'dynamic'
  const [currentIP, setCurrentIP] = useState('192.168.1.42');
  const [allocationLogs, setAllocationLogs] = useState([]);

  useEffect(() => {
    if (selectedTopic?.id === 'w1-d0-t25') setAllocationMode('static');
    else if (selectedTopic?.id === 'w1-d0-t26') setAllocationMode('dynamic');
  }, [selectedTopic]);

  const addLog = (m) => setAllocationLogs(prev => [...prev, m]);

  const requestDHCP = () => {
    setAllocationLogs([]);
    addLog('> Broadcasting DHCP DISCOVER frame to local subnet...');
    
    setTimeout(() => {
      addLog('> Gateway replies: DHCP OFFER (IP: 192.168.1.' + Math.floor(Math.random() * 200 + 10) + ')...');
    }, 800);

    setTimeout(() => {
      addLog('> Device accepts: DHCP REQUEST lease payload...');
    }, 1600);

    setTimeout(() => {
      const randIP = '192.168.1.' + Math.floor(Math.random() * 200 + 10);
      setCurrentIP(randIP);
      addLog('⚡ Dynamic DHCP lease ACK completed successfully!');
      addLog('> Assigned temporary IP: ' + randIP);
    }, 2400);
  };

  const saveStaticIP = (e) => {
    e.preventDefault();
    const val = e.target.elements.staticIpInput.value;
    if (!val) return;
    setCurrentIP(val);
    setAllocationLogs([]);
    addLog('> Administrative override: Hard-binding local adapter.');
    addLog(`⚡ Permanently bound to Static IP: ${val}`);
  };

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light violet">IP Allocation System</span>
        <h3>Static vs Dynamic Address sandbox</h3>
      </div>

      <div className="prereq-grid-split">
        {/* Router Display */}
        <div className="ip-allocator-display">
          <div className="allocated-node-card">
            <Laptop size={32} color="var(--primary-blue)" />
            <h4>Target Device</h4>
            <div className="ip-address-plate">{currentIP}</div>
            <span className="allocation-type-badge">{allocationMode.toUpperCase()} ALLOCATION</span>
          </div>
        </div>

        {/* Control desk */}
        <div className="stack-controls">
          <div className="btn-group-toggle">
            <button className={`toggle-btn ${allocationMode === 'dynamic' ? 'active' : ''}`} onClick={() => { setAllocationMode('dynamic'); setCurrentIP('192.168.1.42'); setAllocationLogs([]); }}>Dynamic IP (DHCP)</button>
            <button className={`toggle-btn ${allocationMode === 'static' ? 'active' : ''}`} onClick={() => { setAllocationMode('static'); setCurrentIP('10.0.1.200'); setAllocationLogs([]); }}>Static IP</button>
          </div>

          <div className="console-panel-light">
            <span className="panel-title">DHCP/Static binding trace</span>
            <div className="logs-screen-small">
              {allocationLogs.length === 0 ? (
                <div className="empty-logs py-4 text-center">
                  <Play size={18} />
                  <span>Configure IP or request DHCP lease</span>
                </div>
              ) : (
                allocationLogs.map((log, idx) => <div key={idx} className="log-line-item">{log}</div>)
              )}
            </div>
          </div>

          {allocationMode === 'dynamic' ? (
            <button className="btn-action-primary" onClick={requestDHCP}>
              <RefreshCw size={14} /> Request DHCP Dynamic Lease
            </button>
          ) : (
            <form onSubmit={saveStaticIP} className="static-ip-input-row">
              <input 
                type="text" 
                name="staticIpInput" 
                defaultValue="10.0.1.200" 
                placeholder="Assign static IP..."
              />
              <button type="submit">Bind IP</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// ===================================================
// 6. HTML MARKUP STRUCT LAB (Topics 29-41)
// ===================================================
export const HTMLStructureSimulator = () => {
  const { selectedTopic } = useCourse();

  // Dedicated visual style rules injected into standard workspace presentation
  const customStyles = (
    <style dangerouslySetInnerHTML={{ __html: `
      .prereq-viz-card {
        border-radius: var(--radius-xl);
        box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        transition: all 0.3s ease;
      }
      .flex-column { display: flex; flex-direction: column; }
      .text-xs { font-size: 0.75rem; }
      .text-xxs { font-size: 0.65rem; }
      .font-mono { font-family: monospace; }
      .font-bold { font-weight: 700; }
      .font-extrabold { font-weight: 800; }
      .bg-orange { background: #fff7ed; }
      .text-orange { color: #ea580c; }
      .text-green { color: #059669; }
      .text-red-500 { color: #ef4444; }
      .w-full { width: 100%; }
      .gap-3 { gap: 12px; }
      .gap-4 { gap: 16px; }
      .mt-2 { margin-top: 8px; }
      .mt-3 { margin-top: 12px; }
      .my-3 { margin-top: 12px; margin-bottom: 12px; }
      .py-2 { padding-top: 8px; padding-bottom: 8px; }
      .pb-1 { padding-bottom: 4px; }
      .p-2 { padding: 8px; }
      .p-3 { padding: 12px; }
      .p-4 { padding: 16px; }
      .rounded { border-radius: 4px; }
      .rounded-lg { border-radius: 8px; }
      .rounded-xl { border-radius: 12px; }
      .border { border: 1px solid #e2e8f0; }
      .border-b { border-bottom: 1px solid #e2e8f0; }
      .bg-slate-50 { background-color: #f8fafc; }
      .border-slate-100 { border-color: #f1f5f9; }
      .border-slate-200 { border-color: #e2e8f0; }
      .bg-white { background-color: #ffffff; }
      .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05); }
      .animate-fade { animation: fadeIn 0.4s ease-out; }
      .animate-pulse { animation: pulseSlow 2s infinite ease-in-out; }
      .flex-grow { flex-grow: 1; }
      .items-center { align-items: center; }
      .justify-center { justify-content: center; }
      .min-h-\\[220px\\] { min-height: 220px; }
      .min-h-\\[160px\\] { min-height: 160px; }
      .tracking-widest { letter-spacing: 0.1em; }
      .cursor-pointer { cursor: pointer; }
      .scale-110 { transform: scale(1.05); }
      .border-orange-200 { border-color: #fed7aa; }
      .bg-orange-50 { background-color: #fff7ed; }
      .border-blue-200 { border-color: #bfdbfe; }
      .bg-blue-50 { background-color: #eff6ff; }
      .border-purple-200 { border-color: #e9d5ff; }
      .bg-purple-50 { background-color: #faf5ff; }
      .border-emerald-200 { border-color: #a7f3d0; }
      .bg-emerald-50 { background-color: #ecfdf5; }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulseSlow {
        0%, 100% { opacity: 0.7; }
        50% { opacity: 1; }
      }
      
      /* Visual flow line for HyperText page linkage */
      .packet-laser-dot {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #3b82f6;
        box-shadow: 0 0 8px #3b82f6;
      }
      .packet-laser-dot.path-a-b {
        animation: travelAB 1.5s forwards ease-in-out;
      }
      @keyframes travelAB {
        0% { left: 10%; top: 30%; }
        50% { left: 50%; top: 15%; }
        100% { left: 90%; top: 30%; }
      }
      
      /* Comment X-ray lens styles */
      .xray-canvas {
        position: relative;
        overflow: hidden;
      }
      .xray-lens {
        position: absolute;
        inset: 0;
        background: rgba(16, 185, 129, 0.05);
        border: 2px solid #10b981;
        pointer-events: none;
        box-shadow: inset 0 0 20px rgba(16, 185, 129, 0.2);
        animation: glowLens 2s infinite alternate;
      }
      @keyframes glowLens {
        from { border-color: #10b981; }
        to { border-color: #34d399; }
      }
      .comment-tag-card {
        background: rgba(16, 185, 129, 0.95);
        color: white;
        font-family: monospace;
        font-size: 0.65rem;
        padding: 4px 8px;
        border-radius: 4px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        position: absolute;
        z-index: 10;
        animation: slideInComment 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
      }
      @keyframes slideInComment {
        from { transform: scale(0.7) translateY(-10px); opacity: 0; }
        to { transform: scale(1) translateY(0); opacity: 1; }
      }
      
      /* Soundwave volume indicators */
      .speech-soundwave {
        display: flex;
        align-items: center;
        gap: 3px;
        height: 40px;
        width: 120px;
        justify-content: center;
      }
      .soundwave-bar {
        width: 4px;
        background: #cbd5e1;
        border-radius: 2px;
        transition: all 0.2s ease;
      }
      .soundwave-bar.speaking {
        background: #8b5cf6;
        animation: speechPulse 0.5s infinite alternate;
      }
      .soundwave-bar.speaking.strong-emphasis {
        background: #ec4899;
        animation: speechEmphasisPulse 0.3s infinite alternate;
      }
      
      @keyframes speechPulse {
        from { height: 6px; }
        to { height: 28px; }
      }
      @keyframes speechEmphasisPulse {
        from { height: 10px; }
        to { height: 42px; }
      }
      
      /* Grid elements custom spacings */
      .grid-layout-center {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .tag-annotator-btn {
        background: #f1f5f9;
        border: 1px solid #cbd5e1;
        color: #334155;
        font-size: 0.75rem;
        font-weight: 700;
        padding: 5px 10px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .tag-annotator-btn:hover {
        background: #e2e8f0;
      }
      .tag-annotator-btn.active-orange {
        background: #ea580c;
        border-color: #ea580c;
        color: white;
      }
      .tag-annotator-btn.active-blue {
        background: #2563eb;
        border-color: #2563eb;
        color: white;
      }
      .tag-annotator-btn.active-purple {
        background: #7c3aed;
        border-color: #7c3aed;
        color: white;
      }
      
      /* Mobile sandbox mockup */
      .virtual-mobile-mockup {
        width: 100%;
        max-width: 240px;
        background: #0f172a;
        border: 8px solid #1e293b;
        border-radius: 30px;
        aspect-ratio: 9/16;
        overflow: hidden;
        position: relative;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      }
      .mobile-camera-notch {
        width: 60px;
        height: 14px;
        background: #1e293b;
        border-radius: 0 0 10px 10px;
        margin: 0 auto;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
      }
      .mobile-content-screen {
        height: 100%;
        background: #f8fafc;
        overflow-y: auto;
        padding: 20px 10px 10px;
        font-family: sans-serif;
      }
    `}} />
  );

  // Router dispatcher
  const renderSubVisualizer = () => {
    switch (selectedTopic?.id) {
      case 'w1-d0-t29':
        return <IntroductionToHTMLVisualizer />;
      case 'w1-d0-t30':
        return <MeaningOfHTMLVisualizer />;
      case 'w1-d0-t31':
        return <WhatIsHyperTextVisualizer />;
      case 'w1-d0-t32':
        return <WhatIsTextVisualizer />;
      case 'w1-d0-t33':
        return <WhatIsMarkupVisualizer />;
      case 'w1-d0-t34':
        return <WhatIsLanguageVisualizer />;
      case 'w1-d0-t35':
        return <StructureOfHTMLDocumentVisualizer />;
      case 'w1-d0-t36':
        return <BoilerplateCodeVisualizer />;
      case 'w1-d0-t37':
        return <HeadingsVisualizer />;
      case 'w1-d0-t38':
        return <ParagraphsVisualizer />;
      case 'w1-d0-t39':
        return <FormattingTagsVisualizer />;
      case 'w1-d0-t40':
        return <HTMLCommentsVisualizer />;
      case 'w1-d0-t41':
        return <HTMLEntitiesVisualizer />;
      default:
        return <StructureOfHTMLDocumentVisualizer />;
    }
  };

  return (
    <>
      {customStyles}
      {renderSubVisualizer()}
    </>
  );
};

// ---------------------------------------------------
// 29. Introduction to HTML Custom Visualizer
// ---------------------------------------------------
const IntroductionToHTMLVisualizer = () => {
  const [isHTML, setIsHTML] = useState(false);
  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light orange">Intro to HTML</span>
        <h3>Web Pages: Flat Stream vs Document Object Model</h3>
      </div>
      
      <div className="prereq-grid-split">
        <div className="flex-column gap-3">
          <p className="text-xs text-neutral">Toggle the engine compiler mode to witness how raw character lines sent by servers transform into fully structured document trees mapped on the display.</p>
          <div className="btn-group-toggle">
            <button className={`toggle-btn w-full ${!isHTML ? 'active' : ''}`} onClick={() => setIsHTML(false)}>
              Raw Character Stream (1989)
            </button>
            <button className={`toggle-btn w-full ${isHTML ? 'active' : ''}`} onClick={() => setIsHTML(true)}>
              Parsed HTML DOM (Modern)
            </button>
          </div>
          <div className="info-helper-para text-xs mt-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
            {!isHTML ? (
              <span className="text-orange font-bold">⚠️ Pre-HTML Era: The computer maps files sequentially. The lack of standard presentation tags forces the client to list characters in flat, continuous monospace strings.</span>
            ) : (
              <span className="text-green font-bold">⚡ Semantic Era: HTML annotates paragraphs and headers. Browsers compile the characters into active DOM node boxes with independent sizing coordinates.</span>
            )}
          </div>
        </div>

        <div className="console-panel-light flex-column relative min-h-[220px]">
          <span className="panel-title">{isHTML ? 'Browser compiled canvas' : 'ASCII character sequence'}</span>
          <div className="flex-grow flex items-center justify-center p-3">
            {!isHTML ? (
              <pre className="text-xs font-mono text-slate-500 overflow-x-auto w-full leading-relaxed animate-pulse">
                {`01001000 01010100 01001101 01001100\n[SERVER_STREAM]: WELCOME TO FLUEN C\nThis is a flat ASCII message stream without any markup tags.\nAll text aligns sequentially since the browser has no coordinate structures.`}
              </pre>
            ) : (
              <div className="w-full bg-white border border-slate-200 rounded-lg p-4 shadow-sm animate-fade">
                <h1 className="text-blue-600 font-bold border-b pb-1 text-lg">WELCOME TO FLUEN C</h1>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                  This is a parsed <strong className="text-purple-600 font-bold">HTML paragraph</strong> with structured tags.
                </p>
                <div className="mt-3 text-xxs bg-emerald-50 text-emerald-700 px-2 py-1 rounded inline-block font-mono border border-emerald-200">
                  DOM: HTMLHeadingElement ➔ HTMLParagraphElement
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------
// 30. Meaning of HTML Custom Visualizer
// ---------------------------------------------------
const MeaningOfHTMLVisualizer = () => {
  const [activeSegment, setActiveSegment] = useState('H');
  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light orange">Meaning of HTML</span>
        <h3>Linguistic Decryption of HTML Presentation</h3>
      </div>
      
      <div className="text-center my-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex justify-center gap-4 text-3xl font-extrabold tracking-widest font-mono">
          <span className={`cursor-pointer px-3 py-1 rounded-lg transition-all duration-300 ${activeSegment === 'H' ? 'bg-orange text-orange scale-110 shadow-sm' : 'text-slate-400'}`} onClick={() => setActiveSegment('H')}>H</span>
          <span className={`cursor-pointer px-3 py-1 rounded-lg transition-all duration-300 ${activeSegment === 'T' ? 'bg-blue-50 text-blue-600 scale-110 shadow-sm' : 'text-slate-400'}`} onClick={() => setActiveSegment('T')}>T</span>
          <span className={`cursor-pointer px-3 py-1 rounded-lg transition-all duration-300 ${activeSegment === 'M' ? 'bg-purple-50 text-purple-600 scale-110 shadow-sm' : 'text-slate-400'}`} onClick={() => setActiveSegment('M')}>M</span>
          <span className={`cursor-pointer px-3 py-1 rounded-lg transition-all duration-300 ${activeSegment === 'L' ? 'bg-emerald-50 text-emerald-600 scale-110 shadow-sm' : 'text-slate-400'}`} onClick={() => setActiveSegment('L')}>L</span>
        </div>
        <div className="text-xxs text-neutral mt-2">Click each segment character to decode the layout layer</div>
      </div>

      <div className="bg-white border rounded-xl p-4 min-h-[160px] flex flex-col justify-between">
        {activeSegment === 'H' && (
          <div className="animate-fade">
            <h4 className="text-orange font-bold text-sm">Hyper- (Interactive Document Linkage)</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">"Hyper" denotes active jumping across coordinates. In standard web platforms, it refers to the nonlinear access of digital files via interactive pointers called hyperlinks.</p>
            <div className="mt-3 bg-orange-50 text-orange border border-orange-200 rounded p-2 text-xxs font-mono">
              Concept: Non-sequential document traversal (W3C standard)
            </div>
          </div>
        )}
        {activeSegment === 'T' && (
          <div className="animate-fade">
            <h4 className="text-blue-600 font-bold text-sm">-Text (Readable Content Payload)</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">"Text" is the human-readable alphanumeric characters containing the literal knowledge messages and assets inside the document.</p>
            <div className="mt-3 bg-blue-50 text-blue-600 border border-blue-200 rounded p-2 text-xxs font-mono">
              Concept: ASCII / UTF-8 character string blocks
            </div>
          </div>
        )}
        {activeSegment === 'M' && (
          <div className="animate-fade">
            <h4 className="text-purple-600 font-bold text-sm">-Markup (Structural Node Annotation)</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">"Markup" denotes annotation tags that wrap standard texts. These tell browser renderers how to shape paragraphs, margins, headings, and images.</p>
            <div className="mt-3 bg-purple-50 text-purple-600 border border-purple-200 rounded p-2 text-xxs font-mono">
              Concept: Parenthesis Tag Trees: &lt;tag&gt;content&lt;/tag&gt;
            </div>
          </div>
        )}
        {activeSegment === 'L' && (
          <div className="animate-fade">
            <h4 className="text-emerald-600 font-bold text-sm">-Language (Presentation Grammar Code)</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">"Language" represents the globally uniform grammatical rules of syntax, tags, and parameters understood by every web browser rendering engine in existence.</p>
            <div className="mt-3 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded p-2 text-xxs font-mono">
              Concept: Presentation Syntax (non-imperative/declarative)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------
// 31. What is HyperText? Custom Visualizer
// ---------------------------------------------------
const WhatIsHyperTextVisualizer = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [transitState, setTransitState] = useState('idle'); // 'idle' | 'transiting'

  const navigateTo = (page) => {
    if (page === activeTab || transitState === 'transiting') return;
    setTransitState('transiting');
    setTimeout(() => {
      setActiveTab(page);
      setTransitState('idle');
    }, 1500);
  };

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light blue">HyperText Explorer</span>
        <h3>Interactive Non-Linear Document Mapping</h3>
      </div>

      <div className="prereq-grid-split">
        <div className="flex-column gap-3">
          <p className="text-xs text-neutral">Hypertext acts as a network mesh linking isolated text files. Click on the code links below to trigger an instant packet traversal and load the target file!</p>
          <div className="flex-column gap-2 bg-slate-50 p-3 rounded-lg border">
            <span className="text-xxs font-bold text-slate-500">File Directory Map:</span>
            <button className={`toggle-btn text-left ${activeTab === 'home' ? 'active' : ''}`} onClick={() => navigateTo('home')}>
              📂 index.html (Home File)
            </button>
            <button className={`toggle-btn text-left ${activeTab === 'about' ? 'active' : ''}`} onClick={() => navigateTo('about')}>
              📂 about.html (About File)
            </button>
            <button className={`toggle-btn text-left ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => navigateTo('contact')}>
              📂 contact.html (Contact File)
            </button>
          </div>
        </div>

        <div className="console-panel-light flex-column relative min-h-[220px]">
          <span className="panel-title">Active Document: {activeTab === 'home' ? 'index.html' : activeTab === 'about' ? 'about.html' : 'contact.html'}</span>
          <div className="flex-grow flex items-center justify-center p-3 relative">
            {transitState === 'transiting' && (
              <div className="packet-laser-dot path-a-b" />
            )}
            
            <div className="w-full bg-white border border-slate-200 rounded-lg p-4 shadow-sm animate-fade min-h-[140px] flex flex-col justify-between">
              {activeTab === 'home' && (
                <div>
                  <h4 className="text-blue-600 font-bold text-sm">index.html (FluenC Portal)</h4>
                  <p className="text-xxs text-slate-500 mt-1">Welcome to our homepage dashboard! We use anchor tag pointers to establish links.</p>
                  <div className="mt-3">
                    <button className="tag-annotator-btn active-blue text-xxs" onClick={() => navigateTo('about')}>
                      &lt;a href="about.html"&gt;Read Team Bio &rarr;&lt;/a&gt;
                    </button>
                  </div>
                </div>
              )}
              {activeTab === 'about' && (
                <div>
                  <h4 className="text-purple-600 font-bold text-sm">about.html (Team Bios)</h4>
                  <p className="text-xxs text-slate-500 mt-1">Meet the expert developer squad building modular, enterprise MERN stacks.</p>
                  <div className="mt-3 flex gap-2">
                    <button className="tag-annotator-btn active-purple text-xxs" onClick={() => navigateTo('home')}>
                      &lt;a href="index.html"&gt;Back Home&lt;/a&gt;
                    </button>
                    <button className="tag-annotator-btn active-blue text-xxs" onClick={() => navigateTo('contact')}>
                      &lt;a href="contact.html"&gt;Get in touch&lt;/a&gt;
                    </button>
                  </div>
                </div>
              )}
              {activeTab === 'contact' && (
                <div>
                  <h4 className="text-emerald-600 font-bold text-sm">contact.html (Inquiry Desk)</h4>
                  <p className="text-xxs text-slate-500 mt-1">Ready to start? Fill our contact form and get paired with code guides.</p>
                  <div className="mt-3">
                    <button className="tag-annotator-btn active-orange text-xxs" onClick={() => navigateTo('home')}>
                      &lt;a href="index.html"&gt;Return to Start&lt;/a&gt;
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------
// 32. What is Text? Custom Visualizer
// ---------------------------------------------------
const WhatIsTextVisualizer = () => {
  const [inputText, setInputText] = useState('HTML');
  
  // Calculate ASCII and Binary values
  const getRepresentations = () => {
    return Array.from(inputText).map(char => {
      const ascii = char.charCodeAt(0);
      const binary = ascii.toString(2).padStart(8, '0');
      return { char, ascii, binary };
    });
  };

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light orange">What is Text?</span>
        <h3>Character-to-Binary Presentation Sandbox</h3>
      </div>

      <div className="prereq-grid-split">
        <div className="flex-column gap-3">
          <p className="text-xs text-neutral">Alphanumeric text inside HTML elements represents pure character payload streams. Type below to see how standard characters are compiled into binary blocks!</p>
          <div className="sandbox-input-row-plain">
            <label>Update Payload String:</label>
            <input 
              type="text" 
              maxLength="8"
              value={inputText} 
              onChange={(e) => setInputText(e.target.value || '')}
              placeholder="Type short word..."
            />
          </div>
        </div>

        <div className="console-panel-light flex-column min-h-[220px]">
          <span className="panel-title">Character stream parser</span>
          <div className="flex-grow flex flex-col justify-around p-2 text-xxs font-mono overflow-y-auto">
            {inputText.length === 0 ? (
              <span className="text-slate-400 text-center py-4">Terminal empty. Enter text characters...</span>
            ) : (
              getRepresentations().map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-slate-200 pb-1 mt-1">
                  <span className="font-extrabold text-blue-600 text-sm bg-blue-50 px-2 py-0.5 rounded">'{item.char}'</span>
                  <span className="text-neutral">ASCII: <strong className="text-slate-700">{item.ascii}</strong></span>
                  <span className="text-slate-500">Binary: <strong className="text-emerald-600">{item.binary}</strong></span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------
// 33. What is Markup? Custom Visualizer
// ---------------------------------------------------
const WhatIsMarkupVisualizer = () => {
  const [markupMode, setMarkupMode] = useState('raw'); // 'raw' | 'heading' | 'bold' | 'paragraph'

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light orange">What is Markup?</span>
        <h3>The Annotation & Syntax Highlight Lab</h3>
      </div>

      <div className="prereq-grid-split">
        <div className="flex-column gap-3">
          <p className="text-xs text-neutral">Markup means wrapping plain text characters in tags to instruct the browser how to render the presentation. Click a button below to apply standard markup annotations.</p>
          
          <div className="flex-column gap-2">
            <button className={`tag-annotator-btn ${markupMode === 'raw' ? 'active-orange' : ''}`} onClick={() => setMarkupMode('raw')}>
              Plain Text (Unwrapped)
            </button>
            <button className={`tag-annotator-btn ${markupMode === 'heading' ? 'active-blue' : ''}`} onClick={() => setMarkupMode('heading')}>
              Apply Heading Annotation &lt;h1&gt;
            </button>
            <button className={`tag-annotator-btn ${markupMode === 'bold' ? 'active-purple' : ''}`} onClick={() => setMarkupMode('bold')}>
              Apply Bold Annotation &lt;strong&gt;
            </button>
            <button className={`tag-annotator-btn ${markupMode === 'paragraph' ? 'active-orange' : ''}`} onClick={() => setMarkupMode('paragraph')}>
              Apply Paragraph &lt;p&gt;
            </button>
          </div>
        </div>

        <div className="console-panel-light flex-column min-h-[220px]">
          <span className="panel-title">Compiler Engine Trace</span>
          <div className="flex-grow flex flex-col justify-between p-2">
            
            {/* Tag Code Block */}
            <div className="bg-slate-900 text-slate-300 rounded p-3 font-mono text-xxs border border-slate-800">
              <span className="text-slate-500 font-bold block mb-1">Code File Content:</span>
              {markupMode === 'raw' && <span>FluenC learning hub</span>}
              {markupMode === 'heading' && <span><strong className="text-orange font-bold">&lt;h1&gt;</strong>FluenC learning hub<strong className="text-orange font-bold">&lt;/h1&gt;</strong></span>}
              {markupMode === 'bold' && <span>FluenC <strong className="text-orange font-bold">&lt;strong&gt;</strong>learning hub<strong className="text-orange font-bold">&lt;/strong&gt;</strong></span>}
              {markupMode === 'paragraph' && <span><strong className="text-orange font-bold">&lt;p&gt;</strong>FluenC learning hub<strong className="text-orange font-bold">&lt;/p&gt;</strong></span>}
            </div>

            {/* Compiled Display Output */}
            <div className="border border-slate-200 rounded-lg p-3 bg-white min-h-[70px] flex items-center shadow-sm">
              {markupMode === 'raw' && <span className="text-xs text-slate-800 font-mono">FluenC learning hub</span>}
              {markupMode === 'heading' && <h1 className="text-lg font-extrabold text-blue-600 m-0 w-full border-b pb-1">FluenC learning hub</h1>}
              {markupMode === 'bold' && <span className="text-xs text-slate-700">FluenC <strong className="font-extrabold text-purple-600">learning hub</strong></span>}
              {markupMode === 'paragraph' && <p className="text-xs text-slate-600 m-0 leading-relaxed border-l-2 border-orange pl-2">FluenC learning hub</p>}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------
// 34. What is Language? Custom Visualizer
// ---------------------------------------------------
const WhatIsLanguageVisualizer = () => {
  const [nestedRule, setNestedRule] = useState('valid'); // 'valid' | 'broken'

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light orange">What is Language?</span>
        <h3>Standard Tag Grammar & Nesting Validator</h3>
      </div>

      <div className="prereq-grid-split">
        <div className="flex-column gap-3">
          <p className="text-xs text-neutral">As a standardized layout language, HTML mandates strict rules for nested element coordinates. Check how browser compiling engines parse nesting anomalies.</p>
          <div className="btn-group-toggle">
            <button className={`toggle-btn w-full ${nestedRule === 'valid' ? 'active' : ''}`} onClick={() => setNestedRule('valid')}>
              Perfect Nested Nesting (Valid)
            </button>
            <button className={`toggle-btn w-full ${nestedRule === 'broken' ? 'active' : ''}`} onClick={() => setNestedRule('broken')}>
              Overlapping Tags (Error)
            </button>
          </div>
          <div className="info-helper-para text-xs mt-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
            {nestedRule === 'valid' ? (
              <span className="text-green font-bold">⚡ Grammatically Correct: Opening tags map symmetrically. Children fit 100% inside parent bounds, allowing fast parsing.</span>
            ) : (
              <span className="text-red-500 font-bold">⚠️ Illegal Nesting: Overlapping sequences corrupt the tokenizer matrix. The DOM parser triggers a fallback logic routine to guess the layout intent.</span>
            )}
          </div>
        </div>

        <div className="console-panel-light flex-column min-h-[220px]">
          <span className="panel-title">Browser DOM Nesting Tree</span>
          <div className="flex-grow flex flex-col justify-center items-center p-2 font-mono text-xs">
            {nestedRule === 'valid' ? (
              <div className="w-full bg-emerald-50 text-emerald-800 border border-emerald-200 rounded p-3 leading-relaxed flex flex-col gap-2">
                <span>🟢 PARSER STATUS: 200 OK</span>
                <div className="pl-2 border-l border-emerald-300">
                  <span>&lt;p&gt; (Paragraph Node)</span>
                  <div className="pl-3 border-l border-emerald-300">
                    <span>&lt;strong&gt; (Bold Child)</span>
                    <div className="pl-4 text-slate-600">"Success!"</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full bg-red-50 text-red-800 border border-red-200 rounded p-3 leading-relaxed flex flex-col gap-2">
                <span>🔴 PARSER WARNING: DOM AUTO-REPAIR ACTIVE</span>
                <div className="pl-2 border-l border-red-300">
                  <span>&lt;p&gt; (Paragraph Node)</span>
                  <div className="pl-3 text-amber-600 font-bold">&lt;strong&gt; (Orphan child close)</div>
                </div>
                <span className="text-xxs text-red-500">Error: Closing tag &lt;/p&gt; received before closing nested &lt;/strong&gt; tag.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------
// 35. Structure of HTML Document Custom Visualizer
// ---------------------------------------------------
const StructureOfHTMLDocumentVisualizer = () => {
  const [activeLayer, setActiveLayer] = useState('body');

  const layers = {
    doctype: {
      code: '<!DOCTYPE html>',
      purpose: 'Enforces standard web rendering mode, preventing quirks mode layout errors.',
      color: '#ea580c'
    },
    html: {
      code: '<html lang="en">',
      purpose: 'The root container node that defines the layout language constraints.',
      color: '#2563eb'
    },
    head: {
      code: '<head> ... </head>',
      purpose: 'Invisible head block. Stores metadata tags, charsets, titles, and styles.',
      color: '#7c3aed'
    },
    body: {
      code: '<body> ... </body>',
      purpose: 'Visible canvas region. Houses all headings, lists, cards, and interactive buttons.',
      color: '#059669'
    }
  };

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light orange">HTML Structural Laboratory</span>
        <h3>Dynamic Skeleton Node Layer Explorer</h3>
      </div>

      <div className="prereq-grid-split">
        
        {/* Layer selector */}
        <div className="flex-column gap-2 justify-center">
          <p className="text-xs text-neutral mb-2">Click on different structural tags of the boilerplate skeleton file to trace how browser compilers group metadata vs body canvas structures.</p>
          {Object.keys(layers).map((key) => (
            <button 
              key={key} 
              className={`tag-annotator-btn text-left ${activeLayer === key ? 'active-blue' : ''}`}
              onClick={() => setActiveLayer(key)}
            >
              <code>{layers[key].code}</code>
            </button>
          ))}
        </div>

        {/* Dynamic Display Panel */}
        <div className="console-panel-light flex-column min-h-[220px] justify-between">
          <span className="panel-title">Layer Anatomy check</span>
          <div className="flex-grow flex flex-col justify-center p-2">
            <h4 style={{ color: layers[activeLayer].color }} className="font-bold text-sm">
              {activeLayer.toUpperCase()} Layer
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {layers[activeLayer].purpose}
            </p>
          </div>
          <div className="border border-slate-200 rounded-lg p-2 bg-slate-900 text-xxs font-mono text-slate-400 mt-2">
            <span>Compiled Scope bounds:</span>
            <pre className="m-0 mt-1" style={{ color: layers[activeLayer].color }}>
              {activeLayer === 'doctype' && `[Document Standard Rendering Enabled]`}
              {activeLayer === 'html' && `<html lang="en">\n  ...\n</html>`}
              {activeLayer === 'head' && `<head>\n  <meta charset="UTF-8"/>\n  <title>FluenC</title>\n</head>`}
              {activeLayer === 'body' && `<body>\n  <h1>Welcome!</h1>\n  <p>Rendered Canvas</p>\n</body>`}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
};

// ---------------------------------------------------
// 36. Boilerplate Code Custom Visualizer
// ---------------------------------------------------
const BoilerplateCodeVisualizer = () => {
  const steps = [
    { id: 1, label: '<!DOCTYPE html>', code: '<!DOCTYPE html>' },
    { id: 2, label: '<html lang="en">', code: '<html lang="en">' },
    { id: 3, label: '<head>', code: '  <head>' },
    { id: 4, label: '<meta charset="UTF-8">', code: '    <meta charset="UTF-8">' },
    { id: 5, label: '<meta name="viewport">', code: '    <meta name="viewport" content="width=device-width, initial-scale=1.0">' },
    { id: 6, label: '<body>', code: '  <body>' }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const clickTag = (stepId) => {
    const nextExpected = currentStep + 1;
    if (stepId === nextExpected) {
      setCurrentStep(nextExpected);
      setErrorMsg('');
    } else {
      setErrorMsg('⚠️ Incorrect assembly sequence! Boilerplates require rigid compile orders.');
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  const resetAssembly = () => {
    setCurrentStep(0);
    setErrorMsg('');
  };

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light orange">Boilerplate Sandbox</span>
        <h3>Interactive Document Assembly Line</h3>
      </div>

      <div className="prereq-grid-split">
        
        {/* Assembly Blocks */}
        <div className="flex-column gap-3">
          <p className="text-xs text-neutral">Assemble a valid HTML5 responsive template in order. Click the code snippets in the correct sequence to boot up the virtual device.</p>
          
          <div className="grid grid-cols-2 gap-2">
            {steps.map((s) => (
              <button 
                key={s.id} 
                disabled={currentStep >= s.id}
                className={`toggle-btn text-xs font-mono py-2 ${currentStep >= s.id ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : ''}`}
                onClick={() => clickTag(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>

          {errorMsg && <div className="text-xxs text-red-500 font-bold animate-pulse">{errorMsg}</div>}

          {currentStep === 6 ? (
            <button className="btn-action-primary green text-xs mt-2" onClick={resetAssembly}>
              <RefreshCw size={12} /> Re-assemble Skeleton
            </button>
          ) : (
            <div className="text-xxs text-slate-500 mt-2">Assembly Progress: {currentStep}/6 completed</div>
          )}
        </div>

        {/* Simulated Mobile Frame on Success */}
        <div className="grid-layout-center">
          {currentStep === 6 ? (
            <div className="virtual-mobile-mockup animate-fade">
              <div className="mobile-camera-notch" />
              <div className="mobile-content-screen flex-column justify-between">
                <div>
                  <span className="text-xxs font-bold text-slate-400 block tracking-widest uppercase">System Status</span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1 border-b pb-1">Boilerplate Active ⚡</h4>
                  <p className="text-xxs text-slate-500 mt-2 leading-relaxed">Viewport width bound: <strong className="text-blue-600">device-width</strong>. Accent letters compile safely using standard <strong className="text-purple-600">UTF-8</strong> profiles.</p>
                </div>
                <div className="bg-emerald-50 text-emerald-800 text-xxs font-mono rounded p-2 text-center border border-emerald-200">
                  📱 Mobile Simulator Online
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 min-h-[220px] font-mono text-xxs text-slate-500 flex flex-col justify-between">
              <div>
                <span className="text-slate-500 font-bold block mb-1">// Standard Boilerplate Editor</span>
                {steps.slice(0, currentStep).map((s) => (
                  <div key={s.id} className="text-slate-300">{s.code}</div>
                ))}
                {currentStep < 6 && <div className="text-emerald-500 animate-pulse mt-1">_ [click next block]</div>}
              </div>
              <span className="text-xxs text-slate-600 text-center">Incomplete setup. Mobile canvas offline.</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

// ---------------------------------------------------
// 37. Headings Custom Visualizer
// ---------------------------------------------------
const HeadingsVisualizer = () => {
  const [headingLevel, setHeadingLevel] = useState(1); // 1 to 6
  
  const seoWeights = {
    1: { weight: '100%', role: 'Main Title (One per document)', desc: 'Indicates the primary, central topic. Carries maximum search ranking index stature.' },
    2: { weight: '80%', role: 'Major Sub-section Headings', desc: 'Indicates primary subdivisions of the text contents.' },
    3: { weight: '60%', role: 'Subsection features', desc: 'Subgroups of features inside second-tier sections.' },
    4: { weight: '45%', role: 'Minor subsections', desc: 'Detailed coordinate segment headers.' },
    5: { weight: '30%', role: 'Segment labels', desc: 'Low weight, specific outline segment tags.' },
    6: { weight: '15%', role: 'Micro details', desc: 'Minimal ranking weight. Sized similar to standard text.' }
  };

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light orange">Heading Hierarchy</span>
        <h3>Rank & Search Crawler Weight Simulator</h3>
      </div>

      <div className="prereq-grid-split">
        <div className="flex-column gap-3">
          <p className="text-xs text-neutral">Headings establish semantic hierarchy. Slide below to update tag ranks and check their visual scale and crawlers priority weights.</p>
          
          <div className="flex-column gap-1 bg-slate-50 p-3 rounded-lg border">
            <span className="text-xxs font-bold text-slate-500">Active Heading Tag: &lt;h{headingLevel}&gt;</span>
            <input 
              type="range" 
              min="1" 
              max="6" 
              value={headingLevel} 
              onChange={(e) => setHeadingLevel(parseInt(e.target.value))}
              className="w-full my-2"
            />
            <div className="flex justify-between text-xxs text-slate-400 font-bold px-1">
              <span>H1</span>
              <span>H2</span>
              <span>H3</span>
              <span>H4</span>
              <span>H5</span>
              <span>H6</span>
            </div>
          </div>

          <div className="tag-details-card m-0">
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-xs text-slate-800">SEO Weight Stature:</span>
              <strong className="text-sm text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{seoWeights[headingLevel].weight}</strong>
            </div>
            <p className="text-xxs text-slate-500 mt-2 font-bold">{seoWeights[headingLevel].role}</p>
            <p className="text-xxs text-slate-600 mt-1 leading-relaxed">{seoWeights[headingLevel].desc}</p>
          </div>
        </div>

        <div className="console-panel-light flex-column min-h-[220px] justify-between">
          <span className="panel-title">Browser Viewport</span>
          <div className="flex-grow flex items-center justify-center p-3 bg-white border border-slate-200 rounded-lg min-h-[100px]">
            {headingLevel === 1 && <h1 className="text-xl font-extrabold text-slate-900 m-0 w-full text-center">FluenC MERN Curriculum</h1>}
            {headingLevel === 2 && <h2 className="text-lg font-bold text-slate-800 m-0 w-full text-center">Day 0 Prerequisites</h2>}
            {headingLevel === 3 && <h3 className="text-md font-semibold text-slate-700 m-0 w-full text-center">Topic 37: Semantic Headings</h3>}
            {headingLevel === 4 && <h4 className="text-sm font-semibold text-slate-600 m-0 w-full text-center">Subsection detail outline</h4>}
            {headingLevel === 5 && <h5 className="text-xs font-semibold text-slate-500 m-0 w-full text-center">Segment coordinate tags</h5>}
            {headingLevel === 6 && <h6 className="text-xxs font-semibold text-slate-400 m-0 w-full text-center">Micro outline text</h6>}
          </div>
          <div className="bg-slate-900 text-xxs font-mono text-emerald-400 rounded p-2 text-center border border-slate-800 mt-2">
            🤖 Googlebot: Registered node &lt;h{headingLevel}&gt; with weight index {seoWeights[headingLevel].weight}
          </div>
        </div>

      </div>
    </div>
  );
};

// ---------------------------------------------------
// 38. Paragraphs Custom Visualizer
// ---------------------------------------------------
const ParagraphsVisualizer = () => {
  const [marginsActive, setMarginsActive] = useState(true);
  const [containerWidth, setContainerWidth] = useState(100); // 50 to 100 percent

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light orange">Paragraph Layout</span>
        <h3>Text-Wrapping & Box Margin Simulator</h3>
      </div>

      <div className="prereq-grid-split">
        <div className="flex-column gap-3">
          <p className="text-xs text-neutral">Paragraph elements wrap lines dynamically to fit container boundaries and apply vertical margin separations comfort to reading.</p>
          
          <div className="flex-column gap-2 bg-slate-50 p-3 rounded-lg border">
            <button className={`toggle-btn text-xs ${marginsActive ? 'active' : ''}`} onClick={() => setMarginsActive(!marginsActive)}>
              {marginsActive ? 'Disable Default Margins (1em)' : 'Enable Default Margins (1em)'}
            </button>
            
            <div className="flex-column gap-1 mt-2">
              <span className="text-xxs font-bold text-slate-500">Container Width: {containerWidth}%</span>
              <input 
                type="range" 
                min="40" 
                max="100" 
                value={containerWidth} 
                onChange={(e) => setContainerWidth(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="console-panel-light flex-column min-h-[220px] justify-between">
          <span className="panel-title">Compiled Flow Layout</span>
          <div className="flex-grow flex flex-col justify-center p-2 bg-white border border-slate-200 rounded-lg min-h-[140px] overflow-x-hidden">
            <div style={{ width: `${containerWidth}%`, transition: 'width 0.3s ease' }} className="border border-dashed border-slate-300 p-2">
              
              <p 
                style={{ margin: marginsActive ? '12px 0' : '0px' }} 
                className="text-xxs text-slate-600 leading-relaxed bg-blue-50/50 p-1 border-l border-blue-400"
              >
                First Paragraph Node. The browser computes wrapping coordinates, squeezing texts beautifully without overflowing layout bounds.
              </p>
              
              <p 
                style={{ margin: marginsActive ? '12px 0' : '0px' }} 
                className="text-xxs text-slate-600 leading-relaxed bg-purple-50/50 p-1 border-l border-purple-400"
              >
                Second Paragraph Node. Natural layout flow stack positions this block with symmetric distance buffers.
              </p>

            </div>
          </div>
          <span className="text-xxs text-slate-500 text-center mt-2 font-mono">
            {marginsActive ? '✅ Margins active (yellow spacing gaps render)' : '⚠️ Margins disabled (text blocks compress)'}
          </span>
        </div>

      </div>
    </div>
  );
};

// ---------------------------------------------------
// 39. Formatting Tags Custom Visualizer
// ---------------------------------------------------
const FormattingTagsVisualizer = () => {
  const [activeMode, setActiveMode] = useState('semantic'); // 'visual' | 'semantic'
  const [isSpeaking, setIsSpeaking] = useState(false);

  const triggerSpeechSim = () => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    setTimeout(() => setIsSpeaking(false), 3000);
  };

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light orange">Formatting Tags</span>
        <h3>Semantic Emphasis vs Physical Styling Inspector</h3>
      </div>

      <div className="prereq-grid-split">
        <div className="flex-column gap-3">
          <p className="text-xs text-neutral">Physical tags like &lt;b&gt; and &lt;i&gt; apply visual styles. Semantic tags like &lt;strong&gt; and &lt;em&gt; add auditive pitch importance for screen-readers.</p>
          
          <div className="btn-group-toggle">
            <button className={`toggle-btn w-full ${activeMode === 'visual' ? 'active' : ''}`} onClick={() => setActiveMode('visual')}>
              Physical tags (&lt;b&gt; / &lt;i&gt;)
            </button>
            <button className={`toggle-btn w-full ${activeMode === 'semantic' ? 'active' : ''}`} onClick={() => setActiveMode('semantic')}>
              Semantic tags (&lt;strong&gt; / &lt;em&gt;)
            </button>
          </div>

          <div className="info-helper-para text-xs mt-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
            {activeMode === 'visual' ? (
              <span className="text-orange font-bold">⚠️ Physical Focus: Browser applies standard bold weight but screen readers ignore priority weights, reading monotone.</span>
            ) : (
              <span className="text-green font-bold">⚡ Semantic Focus: Applies bold weight and writes high structural tags into the accessibility tree. Screen readers spike volumes!</span>
            )}
          </div>
        </div>

        <div className="console-panel-light flex-column min-h-[220px] justify-between">
          <span className="panel-title">Screen Reader Waveform</span>
          
          {/* Waveform graphic */}
          <div className="flex-grow flex items-center justify-center p-3">
            <div className="speech-soundwave">
              <div className={`soundwave-bar ${isSpeaking ? 'speaking' : ''}`} style={{ animationDelay: '0.1s' }} />
              <div className={`soundwave-bar ${isSpeaking ? 'speaking' : ''}`} style={{ animationDelay: '0.2s' }} />
              <div className={`soundwave-bar ${isSpeaking ? 'speaking' : ''}`} style={{ animationDelay: '0.3s' }} />
              <div className={`soundwave-bar ${isSpeaking ? 'speaking' : ''} ${activeMode === 'semantic' ? 'strong-emphasis' : ''}`} style={{ animationDelay: '0.4s' }} />
              <div className={`soundwave-bar ${isSpeaking ? 'speaking' : ''} ${activeMode === 'semantic' ? 'strong-emphasis' : ''}`} style={{ animationDelay: '0.5s' }} />
              <div className={`soundwave-bar ${isSpeaking ? 'speaking' : ''}`} style={{ animationDelay: '0.6s' }} />
              <div className={`soundwave-bar ${isSpeaking ? 'speaking' : ''}`} style={{ animationDelay: '0.7s' }} />
            </div>
          </div>

          <button className="btn-action-primary text-xs" onClick={triggerSpeechSim} disabled={isSpeaking}>
            <Volume2 size={12} /> {isSpeaking ? 'Reading text segment...' : 'Simulate Screen Reader Voice'}
          </button>
        </div>

      </div>
    </div>
  );
};

// ---------------------------------------------------
// 40. HTML Comments Custom Visualizer
// ---------------------------------------------------
const HTMLCommentsVisualizer = () => {
  const [xrayActive, setXrayActive] = useState(false);

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light orange">HTML Comments</span>
        <h3>Developer X-Ray Comment Scanner</h3>
      </div>

      <div className="prereq-grid-split">
        <div className="flex-column gap-3">
          <p className="text-xs text-neutral">Comments wrapped in standard tags are completely skipped by DOM rendering engines, keeping output clean while documenting code templates.</p>
          
          <button className={`toggle-btn text-xs ${xrayActive ? 'active' : ''}`} onClick={() => setXrayActive(!xrayActive)}>
            {xrayActive ? 'Disable Developer X-Ray Lens' : 'Enable Developer X-Ray Lens'}
          </button>
          
          <div className="info-helper-para text-xs mt-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
            {xrayActive ? (
              <span className="text-green font-bold">🟢 X-Ray Lens Active: The compiler isolates tags and floats invisible comment blocks over their respective layout coordinate points.</span>
            ) : (
              <span className="text-slate-500 font-bold">🔘 Normal Browser view: Standard users only see visual headings and text cards. Code comments remain completely hidden.</span>
            )}
          </div>
        </div>

        {/* X-ray Viewport */}
        <div className="console-panel-light flex-column min-h-[220px] relative xray-canvas">
          <span className="panel-title">Simulated browser frame</span>
          {xrayActive && <div className="xray-lens" />}
          
          <div className="flex-grow flex flex-col justify-around p-3 bg-white border border-slate-200 rounded-lg min-h-[140px] relative">
            
            {/* Visual Node */}
            <div className="border border-slate-200 rounded p-2">
              <h4 className="text-xs font-bold text-slate-800 m-0">Student Profile Widget</h4>
              <span className="text-xxs text-slate-500">VS Sharma</span>
              {xrayActive && (
                <div className="comment-tag-card" style={{ top: '-10px', right: '10px' }}>
                  &lt;!-- Main user profile widgets --&gt;
                </div>
              )}
            </div>

            {/* Visual Node */}
            <div className="border border-slate-200 rounded p-2 mt-2">
              <button className="tag-annotator-btn active-blue text-xxs w-full">Apply changes</button>
              {xrayActive && (
                <div className="comment-tag-card" style={{ bottom: '-10px', left: '10px' }}>
                  &lt;!-- Trigger action click handler --&gt;
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

// ---------------------------------------------------
// 41. HTML Entities Custom Visualizer
// ---------------------------------------------------
const HTMLEntitiesVisualizer = () => {
  const [inputText, setInputText] = useState('Type <tag> ©');

  const escapeText = (text) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/©/g, '&copy;')
      .replace(/®/g, '&reg;');
  };

  return (
    <div className="prereq-viz-card light-theme-sandbox">
      <div className="prereq-viz-header">
        <span className="badge-light orange">HTML Entities</span>
        <h3>Escape Code Sandbox & Real-time Translator</h3>
      </div>

      <div className="prereq-grid-split">
        <div className="flex-column gap-3">
          <p className="text-xs text-neutral">Reserved glyphs like less-than or copy tags confuse the browser compiler. Escaping them in code guarantees safe presentation renders.</p>
          
          <div className="sandbox-input-row-plain">
            <label>Type Special Symbols (&lt;, &gt;, ©, ®):</label>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type with special chars..."
            />
          </div>
        </div>

        {/* Translation panels */}
        <div className="console-panel-light flex-column min-h-[220px] justify-between">
          <span className="panel-title">Character Entity Map</span>
          <div className="flex-grow flex flex-col gap-2 p-2">
            
            {/* Escaped code */}
            <div className="bg-slate-900 text-slate-300 rounded p-3 font-mono text-xxs border border-slate-800">
              <span className="text-slate-500 font-bold block mb-1">Escaped HTML Source:</span>
              <span className="text-emerald-400 font-bold">{escapeText(inputText)}</span>
            </div>

            {/* Compiled View */}
            <div className="border border-slate-200 rounded-lg p-3 bg-white min-h-[60px] flex flex-col justify-center shadow-sm">
              <span className="text-xxs font-bold text-slate-400 block mb-1">Compiled browser preview:</span>
              <span className="text-xs text-slate-800 font-semibold">{inputText}</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

