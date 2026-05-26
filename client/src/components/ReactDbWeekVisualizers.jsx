import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, RotateCcw, Sparkles, Layers, Terminal, ChevronRight, 
  User, Mail, Lock, Check, Plus, Trash2, HelpCircle, 
  AlertCircle, RefreshCw, ArrowRight, Search, Globe, Database,
  Settings, Key, Eye, HelpCircle as HelpIcon, ShieldAlert,
  Code, BookOpen, Layers2, FileCode, CheckSquare
} from 'lucide-react';

/* ==========================================
   1. RefMemoViz (Day 1 Visualizer)
   ========================================== */
export const RefMemoViz = () => {
  // useRef state
  const [stateCount, setStateCount] = useState(0);
  const [dummyRender, setDummyRender] = useState(false);
  const countRef = useRef(0);
  const textInputRef = useRef(null);

  // useMemo state
  const [searchQuery, setSearchQuery] = useState('');
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);
  const [computationTime, setComputationTime] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);

  // Focus input handler
  const focusInput = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
      textInputRef.current.style.borderColor = '#00d1d1';
      setTimeout(() => {
        if (textInputRef.current) textInputRef.current.style.borderColor = '#334155';
      }, 1000);
    }
  };

  const handleRefIncrement = () => {
    countRef.current += 1;
    // Note: We don't trigger state render here!
  };

  const handleForceRender = () => {
    setDummyRender(prev => !prev);
  };

  // Generate 5000 items for calculation
  const mockDataset = useMemo(() => {
    const list = [];
    for (let i = 1; i <= 5000; i++) {
      list.push(`course-topic-react-mern-stack-module-${i}`);
    }
    return list;
  }, []);

  // CPU Intensive computation filter simulation
  const performHeavySearch = (query) => {
    const start = performance.now();
    // Intentionally introduce lag to simulate heavy computation
    let sum = 0;
    for (let i = 0; i < 2000000; i++) {
      sum += Math.sqrt(i);
    }
    const filtered = mockDataset.filter(item => item.toLowerCase().includes(query.toLowerCase()));
    const end = performance.now();
    return { list: filtered.slice(0, 5), time: (end - start).toFixed(1) };
  };

  // Memoized search
  const memoizedResults = useMemo(() => {
    if (!useMemoEnabled) return null;
    return performHeavySearch(searchQuery);
  }, [searchQuery, useMemoEnabled, mockDataset]);

  // Non-memoized search (runs on every single render)
  const nonMemoizedResults = !useMemoEnabled ? performHeavySearch(searchQuery) : null;

  const activeResults = useMemoEnabled ? memoizedResults : nonMemoizedResults;

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <Layers size={16} className="text-cyan" />
        <span>useRef & useMemo Optimization Playground</span>
      </div>

      <div className="viz-split-layout">
        {/* Left Panel: useRef Sandbox */}
        <div className="compare-panel">
          <div className="panel-badge react-badge">useRef Hook (DOM & Persistence)</div>
          <h4>Persistent Reference Sandbox</h4>
          <p className="panel-desc">useRef stores mutable values that **do not** trigger re-renders when updated. It also references direct HTML DOM elements.</p>
          
          <div className="control-group">
            <label>1. Manipulate DOM Nodes directly:</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                ref={textInputRef} 
                placeholder="Click focus button..." 
                className="select-input" 
                style={{ flex: 1 }}
              />
              <button className="viz-btn cyan-btn" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={focusInput}>
                Focus Node
              </button>
            </div>
          </div>

          <div className="control-group" style={{ marginTop: '16px' }}>
            <label>2. Ref Value vs State value:</label>
            <div className="val-box" style={{ flexDirection: 'column', gap: '8px', alignItems: 'stretch' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span>countRef.current (RAM variable):</span>
                <strong className="font-red">{countRef.current}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span>stateCount (Triggers Render):</span>
                <strong className="font-green">{stateCount}</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button className="viz-btn red-btn" style={{ flex: 1 }} onClick={handleRefIncrement}>
              Add countRef (+1)
            </button>
            <button className="viz-btn green-btn" style={{ flex: 1 }} onClick={() => setStateCount(prev => prev + 1)}>
              Add stateCount (+1)
            </button>
          </div>
          <button className="viz-btn" style={{ width: '100%', marginTop: '8px', background: '#334155' }} onClick={handleForceRender}>
            Force Re-render UI (Catch up Ref)
          </button>
        </div>

        {/* Right Panel: useMemo Performance Simulator */}
        <div className="compare-panel">
          <div className="panel-badge">useMemo Hook (Cache Memoization)</div>
          <h4>Memoized Computation Analyzer</h4>
          <p className="panel-desc">useMemo caches heavy calculations, skipping recalculations during unrelated re-renders unless dependency arrays change.</p>

          <div className="control-group">
            <label>Search 5,000 Mock Records:</label>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: '#64748b' }} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type filter search terms..."
                className="select-input"
                style={{ paddingLeft: '32px', width: '100%' }}
              />
            </div>
          </div>

          <div className="control-group checkbox" style={{ margin: '12px 0' }}>
            <label>
              <input 
                type="checkbox" 
                checked={useMemoEnabled} 
                onChange={(e) => setUseMemoEnabled(e.target.checked)} 
              />
              Enable useMemo caching optimizer
            </label>
          </div>

          <div className="val-box" style={{ background: useMemoEnabled ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.06)', border: `1px solid ${useMemoEnabled ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.85rem' }}>
              <span>Calculation latency:</span>
              <strong className={useMemoEnabled ? 'font-green' : 'font-red'}>
                {activeResults?.time} ms ({useMemoEnabled ? 'Cached' : 'Recalculated'})
              </strong>
            </div>
          </div>

          <div className="control-group" style={{ marginTop: '16px' }}>
            <label>Click Unrelated State (forces re-render):</label>
            <button className="viz-btn" style={{ background: '#4f46e5' }} onClick={() => setUnrelatedState(prev => prev + 1)}>
              Unrelated State triggers render ({unrelatedState})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


/* ==========================================
   2. ContextCustomHooksViz (Day 2 Visualizer)
   ========================================== */
export const ContextCustomHooksViz = () => {
  const [theme, setTheme] = useState('cyberpunk');
  const [user, setUser] = useState({ name: 'Alex Carter', email: 'alex@wemade.com', role: 'Staff Mentor' });
  const [logs, setLogs] = useState([]);

  // Theme styling definitions
  const themeStyles = {
    cyberpunk: { bg: '#090d16', border: '#00d1d1', text: '#00d1d1', cardBg: '#0f172a' },
    light: { bg: '#f8fafc', border: '#cbd5e1', text: '#0f172a', cardBg: '#ffffff' },
    dark: { bg: '#0f172a', border: '#1e293b', text: '#f8fafc', cardBg: '#1e293b' }
  };

  const currentTheme = themeStyles[theme] || themeStyles.cyberpunk;

  const logHook = (text) => {
    setLogs(prev => [`[CustomHook] ${text}`, ...prev.slice(0, 5)]);
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <Sparkles size={16} className="text-purple" />
        <span>Context API & Custom Hooks Scoping</span>
      </div>

      <div className="viz-split-layout">
        {/* Left Side: Context Visualizer Component Tree */}
        <div className="compare-panel">
          <div className="panel-badge react-badge">Context Provider API</div>
          <h4>Theme & User Context Tree</h4>
          <p className="panel-desc">Context allows data to bypass intermeditary components, avoiding prop-drilling down the hierarchy.</p>
          
          <div className="control-group">
            <label>Select Global Theme Context:</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)} className="select-input">
              <option value="cyberpunk">Cyberpunk Neon Theme</option>
              <option value="dark">Standard Dark Theme</option>
              <option value="light">Standard Light Theme</option>
            </select>
          </div>

          {/* Component Hierarchy tree mapping */}
          <div className="context-tree-map">
            <div className="tree-node root-node active">
              <span>App Component (Provides ThemeContext: "{theme}")</span>
            </div>
            
            <div className="tree-branch-connector">↓</div>
            
            <div className="tree-row-skipped">
              <div className="tree-node skipped">
                <span>Layout (No theme prop)</span>
              </div>
              <div className="tree-node skipped">
                <span>ContentGrid (No theme prop)</span>
              </div>
            </div>

            <div className="prop-drill-bypass-lines">
              <span className="bypass-label font-green">Bypassing prop-drilling!</span>
              <div className="dotted-arrow"></div>
            </div>

            <div className="tree-branch-connector">↓</div>

            <div className="tree-node consumer-node" style={{ background: currentTheme.bg, border: `1px solid ${currentTheme.border}`, color: currentTheme.text }}>
              <strong style={{ display: 'block', fontSize: '0.8rem', borderBottom: `1px dashed ${currentTheme.border}33`, paddingBottom: '4px', marginBottom: '6px' }}>
                UserProfileCard (Consumes Context)
              </strong>
              <div style={{ fontSize: '0.75rem' }}>
                <div>Name: {user.name}</div>
                <div>Role: {user.role}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Custom Hooks Visualizer */}
        <div className="compare-panel">
          <div className="panel-badge">Custom React Hooks</div>
          <h4>useWindowSize Custom Hook simulator</h4>
          <p className="panel-desc">Custom hooks isolate reusable logic (like listeners or fetch handlers) into clean, standalone functions.</p>

          <div className="custom-hook-display-box" style={{ background: '#020617', padding: '16px', borderRadius: '8px', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00d1d1', fontSize: '0.85rem', fontWeight: 'bold' }}>
              <Code size={14} /> <span>useWindowSize()</span>
            </div>
            
            <div className="screen-resolution-box" style={{ marginTop: '12px', border: '1px dashed #334155', padding: '12px', textAlign: 'center', borderRadius: '6px' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Screen width/height state</div>
              <strong style={{ fontSize: '1.4rem', fontFamily: 'monospace' }}>1280px x 720px</strong>
            </div>

            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <button className="viz-btn" style={{ background: '#1e293b', fontSize: '0.75rem' }} onClick={() => logHook('Resize detected: width -> 1024px')}>
                Resize to Tablet
              </button>
              <button className="viz-btn" style={{ background: '#1e293b', fontSize: '0.75rem' }} onClick={() => logHook('Resize detected: width -> 480px')}>
                Resize to Mobile
              </button>
            </div>
          </div>

          <div className="viz-logs-console" style={{ height: '110px', marginTop: '10px' }}>
            <div className="console-header">
              <Terminal size={12} /> <span>Custom Hook Event log</span>
            </div>
            <div className="console-body" style={{ fontSize: '0.65rem' }}>
              {logs.length === 0 ? (
                <div className="console-empty">Click buttons above to trigger custom hook state logs...</div>
              ) : (
                logs.map((log, index) => <div key={index} className="sys-line">{log}</div>)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


/* ==========================================
   3. MiniProjectIntegrationViz (Day 3 Visualizer)
   ========================================== */
export const MiniProjectIntegrationViz = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review Context Schemas', completed: true },
    { id: 2, text: 'Master Mongoose Models', completed: false }
  ]);
  const [inputText, setInputText] = useState('');
  const [themeMode, setThemeMode] = useState('dark');
  const inputFieldRef = useRef(null);

  const addTask = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: inputText, completed: false }]);
    setInputText('');
    if (inputFieldRef.current) inputFieldRef.current.focus();
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <CheckSquare size={16} className="text-cyan" />
        <span>Day 3: React Complete Integration Dashboard</span>
      </div>

      <div className={`integration-portal-box theme-${themeMode}`} style={{
        background: themeMode === 'dark' ? '#0f172a' : '#f8fafc',
        color: themeMode === 'dark' ? 'white' : '#0f172a',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #334155'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4>Collab Workspace Portal (Integrated App)</h4>
          <button 
            className="theme-toggle-btn" 
            style={{ color: 'inherit', borderColor: '#334155' }}
            onClick={() => setThemeMode(prev => prev === 'dark' ? 'light' : 'dark')}
          >
            Toggle Theme Context ({themeMode})
          </button>
        </div>

        <form onSubmit={addTask} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input 
            type="text" 
            ref={inputFieldRef}
            placeholder="Focus input ref and type..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="select-input"
            style={{ flex: 1, background: themeMode === 'dark' ? '#1e293b' : 'white', color: themeMode === 'dark' ? 'white' : '#0f172a' }}
          />
          <button type="submit" className="viz-btn cyan-btn" style={{ padding: '8px 16px' }}>Add Card</button>
        </form>

        <div className="row-list-view">
          {tasks.map(t => (
            <div key={t.id} className="task-row" style={{ background: themeMode === 'dark' ? '#020617' : '#f1f5f9', borderColor: '#334155' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flex: 1 }}>
                <input type="checkbox" checked={t.completed} onChange={() => toggleTask(t.id)} />
                <span style={{ textDecoration: t.completed ? 'line-through' : 'none', fontSize: '0.8rem' }}>{t.text}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


/* ==========================================
   4. NoSqlCollectionsViz (Day 4 Visualizer)
   ========================================== */
export const NoSqlCollectionsViz = () => {
  const [activeSchemaMode, setActiveSchemaMode] = useState('nosql');
  const [documents, setDocuments] = useState([
    {
      _id: '60c72b2f9b1d',
      username: 'alex_coder',
      email: 'alex@wemade.com',
      profile: { firstName: 'Alex', age: 24 }
    },
    {
      _id: '60c72b5f9b1d',
      username: 'sam_admin',
      email: 'sam@admin.org',
      role: 'superadmin',
      ipWhitelisted: '192.168.1.1'
    }
  ]);

  const [newKey, setNewKey] = useState('');
  const [newVal, setNewVal] = useState('');

  const handleAddFieldToFirstDoc = () => {
    if (!newKey.trim() || !newVal.trim()) return;
    setDocuments(documents.map((doc, idx) => 
      idx === 0 ? { ...doc, [newKey]: newVal } : doc
    ));
    setNewKey('');
    setNewVal('');
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <Database size={16} className="text-cyan" />
        <span>MongoDB Collections vs. SQL Tables</span>
      </div>

      <div className="viz-control-bar" style={{ justifyContent: 'center' }}>
        <div className="filter-group">
          <button className={activeSchemaMode === 'sql' ? 'active' : ''} onClick={() => setActiveSchemaMode('sql')}>
            Relational SQL Table Layout
          </button>
          <button className={activeSchemaMode === 'nosql' ? 'active' : ''} onClick={() => setActiveSchemaMode('nosql')}>
            NoSQL MongoDB Document Collection
          </button>
        </div>
      </div>

      <div className="viz-split-layout">
        {/* Render SQL database format */}
        {activeSchemaMode === 'sql' ? (
          <div className="compare-panel" style={{ gridColumn: 'span 2' }}>
            <div className="panel-badge">SQL Table Structure (Rigid Schema)</div>
            <table className="sql-mock-table" style={{ width: '100%', marginTop: '10px', fontSize: '0.8rem', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#1e293b', borderBottom: '2px solid #334155' }}>
                  <th style={{ padding: '8px' }}>ID (INT)</th>
                  <th style={{ padding: '8px' }}>username (VARCHAR)</th>
                  <th style={{ padding: '8px' }}>email (VARCHAR)</th>
                  <th style={{ padding: '8px' }}>role (VARCHAR)</th>
                  <th style={{ padding: '8px' }}>ipWhitelisted (VARCHAR)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '8px', fontFamily: 'monospace' }}>1</td>
                  <td style={{ padding: '8px' }}>alex_coder</td>
                  <td style={{ padding: '8px' }}>alex@wemade.com</td>
                  <td style={{ padding: '8px', color: '#64748b' }}>NULL</td>
                  <td style={{ padding: '8px', color: '#64748b' }}>NULL</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '8px', fontFamily: 'monospace' }}>2</td>
                  <td style={{ padding: '8px' }}>sam_admin</td>
                  <td style={{ padding: '8px' }}>sam@admin.org</td>
                  <td style={{ padding: '8px' }}>superadmin</td>
                  <td style={{ padding: '8px' }}>192.168.1.1</td>
                </tr>
              </tbody>
            </table>
            <p className="panel-desc" style={{ marginTop: '16px' }}>
              ⚠️ **Note:** In SQL, all rows must share the exact same columns. Storing optional or dynamic properties requires nullable columns (`NULL`), leading to sparse, inefficient database tables.
            </p>
          </div>
        ) : (
          /* Render NoSQL MongoDB database format */
          <>
            <div className="compare-panel">
              <div className="panel-badge react-badge">MongoDB Collection (JSON Documents)</div>
              <h4>Collection: users</h4>
              <p className="panel-desc">MongoDB stores records as dynamic, flexible JSON-like documents. Each document can contain completely different fields.</p>

              <div className="control-group">
                <label>Add Custom Key-value Field to Document #1:</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input type="text" placeholder="Key (e.g. status)" value={newKey} onChange={e => setNewKey(e.target.value)} className="select-input" style={{ width: '40%' }} />
                  <input type="text" placeholder="Value (e.g. active)" value={newVal} onChange={e => setNewVal(e.target.value)} className="select-input" style={{ width: '40%' }} />
                  <button className="viz-btn cyan-btn" onClick={handleAddFieldToFirstDoc} style={{ flex: 1, padding: '4px' }}><Plus size={14} /></button>
                </div>
              </div>
            </div>

            <div className="compare-panel" style={{ background: '#090d16' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px dashed #334155', paddingBottom: '6px', marginBottom: '10px' }}>
                <Terminal size={12} /> <span>MongoDB Users Documents List</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {documents.map((doc, idx) => (
                  <div key={doc._id} style={{ background: '#0f172a', borderLeft: `3px solid ${idx === 0 ? '#00d1d1' : '#a855f7'}`, padding: '10px', borderRadius: '6px' }}>
                    <pre style={{ margin: 0, fontSize: '0.7rem', color: '#cbd5e1', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
{JSON.stringify(doc, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .sql-mock-table th, .sql-mock-table td {
          border: 1px solid #334155;
        }
      `}} />
    </div>
  );
};


/* ==========================================
   5. CrudOperationsViz (Day 5 Visualizer)
   ========================================== */
export const CrudOperationsViz = () => {
  const [dbData, setDbData] = useState([
    { _id: '60c72b1', name: 'Alice', role: 'Student', score: 85 },
    { _id: '60c72b2', name: 'Bob', role: 'Mentor', score: 92 }
  ]);
  const [shellLogs, setShellLogs] = useState([]);

  const runCommand = (commandType) => {
    let output = '';
    let newDb = [...dbData];

    if (commandType === 'insert') {
      const newDoc = { _id: '60c72b' + (dbData.length + 1), name: 'Charlie', role: 'Student', score: 88 };
      newDb.push(newDoc);
      output = `db.users.insertOne({ name: "Charlie", role: "Student", score: 88 })
{
  "acknowledged": true,
  "insertedId": "${newDoc._id}"
}`;
    } else if (commandType === 'update') {
      newDb = dbData.map(doc => doc.name === 'Alice' ? { ...doc, score: 95 } : doc);
      output = `db.users.updateOne({ name: "Alice" }, { $set: { score: 95 } })
{
  "acknowledged": true,
  "matchedCount": 1,
  "modifiedCount": 1
}`;
    } else if (commandType === 'delete') {
      newDb = dbData.filter(doc => doc.name !== 'Bob');
      output = `db.users.deleteOne({ name: "Bob" })
{
  "acknowledged": true,
  "deletedCount": 1
}`;
    }

    setDbData(newDb);
    setShellLogs(prev => [output, ...prev.slice(0, 3)]);
  };

  const handleClear = () => {
    setDbData([
      { _id: '60c72b1', name: 'Alice', role: 'Student', score: 85 },
      { _id: '60c72b2', name: 'Bob', role: 'Mentor', score: 92 }
    ]);
    setShellLogs([]);
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <Terminal size={16} className="text-cyan" />
        <span>Simulated MongoDB CRUD shell console</span>
      </div>

      <div className="viz-control-bar" style={{ display: 'flex', gap: '8px' }}>
        <button className="viz-btn cyan-btn" style={{ fontSize: '0.8rem', padding: '6px 12px' }} onClick={() => runCommand('insert')}>
          Insert doc (insertOne)
        </button>
        <button className="viz-btn" style={{ background: '#a855f7', color: 'white', fontSize: '0.8rem', padding: '6px 12px' }} onClick={() => runCommand('update')}>
          Update Score (updateOne)
        </button>
        <button className="viz-btn red-btn" style={{ fontSize: '0.8rem', padding: '6px 12px' }} onClick={() => runCommand('delete')}>
          Delete Bob (deleteOne)
        </button>
        <button className="viz-btn" style={{ background: '#334155', fontSize: '0.8rem', padding: '6px 12px' }} onClick={handleClear}>
          Reset Database
        </button>
      </div>

      <div className="viz-split-layout">
        {/* Left Side: Mock database records */}
        <div className="compare-panel">
          <div className="panel-badge react-badge">MongoDB Users Collection</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            {dbData.map(doc => (
              <div key={doc._id} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', padding: '10px' }}>
                <pre style={{ margin: 0, fontSize: '0.7rem', color: '#cbd5e1', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
{JSON.stringify(doc, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Shell console logs */}
        <div className="lifecycle-logs-panel">
          <div className="console-header">
            <Terminal size={14} /> <span>MongoDB Terminal Shell Output</span>
          </div>
          <div className="console-body" style={{ background: '#020617', padding: '12px', minHeight: '220px', fontFamily: 'monospace', fontSize: '0.7rem' }}>
            {shellLogs.length === 0 ? (
              <div className="console-empty">Click CRUD query buttons above to run shell queries...</div>
            ) : (
              shellLogs.map((log, index) => (
                <div key={index} className="log-line" style={{ borderBottom: '1px dashed #1e293b', paddingBottom: '8px', marginBottom: '8px' }}>
                  <div className="text-cyan" style={{ marginBottom: '4px' }}>&gt; {log.split('\n')[0]}</div>
                  <pre style={{ margin: 0, color: '#a7f3d0', fontFamily: 'monospace' }}>{log.split('\n').slice(1).join('\n')}</pre>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


/* ==========================================
   6. SchemaModelsViz (Day 6 Visualizer)
   ========================================== */
export const SchemaModelsViz = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [ageInput, setAgeInput] = useState('');
  
  const [validationResult, setValidationResult] = useState(null);

  const handleValidateDocument = (e) => {
    e.preventDefault();
    const errors = [];

    // Mongoose constraints simulation
    if (!usernameInput.trim()) {
      errors.push('Path `username` is required.');
    } else if (usernameInput.length < 3) {
      errors.push('Path `username` (`' + usernameInput + '`) is shorter than the minimum allowed length (3).');
    }

    if (!emailInput.trim()) {
      errors.push('Path `email` is required.');
    } else if (!emailInput.includes('@')) {
      errors.push('Validator failed for path `email` with value `' + emailInput + '`.');
    }

    if (ageInput !== '') {
      const parsedAge = parseInt(ageInput, 10);
      if (isNaN(parsedAge) || parsedAge < 18) {
        errors.push('Path `age` (' + ageInput + ') is less than minimum allowed value (18).');
      }
    }

    if (errors.length > 0) {
      setValidationResult({ success: false, errors });
    } else {
      setValidationResult({ success: true });
    }
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <FileCode size={16} className="text-cyan" />
        <span>Mongoose Schema validation Compiler</span>
      </div>

      <div className="viz-split-layout">
        {/* Left Side: Code schema specification */}
        <div className="compare-panel" style={{ background: '#090d16' }}>
          <div className="panel-badge react-badge">Mongoose Schema Blueprint</div>
          <pre className="code-block" style={{ fontSize: '0.7rem', padding: '8px', border: 'none' }}>
{`const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [3, 'Username too short']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/@/, 'Please fill a valid email']
  },
  age: {
    type: Number,
    min: [18, 'Age must be at least 18']
  }
});

const User = mongoose.model('User', userSchema);`}
          </pre>
        </div>

        {/* Right Side: Document insertion & validator checks */}
        <div className="compare-panel">
          <div className="panel-badge">Verify Collection Document</div>
          <h4 style={{ margin: '8px 0 4px 0' }}>Insert Document Form</h4>
          
          <form onSubmit={handleValidateDocument} className="sandbox-form" style={{ marginTop: '10px' }}>
            <div className="input-field">
              <label>username (String, minlength: 3)</label>
              <input type="text" value={usernameInput} onChange={e => setUsernameInput(e.target.value)} placeholder="e.g. coder_az" className="select-input" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: 'white', padding: '6px' }} />
            </div>

            <div className="input-field" style={{ marginTop: '8px' }}>
              <label>email (String, match: /@/)</label>
              <input type="text" value={emailInput} onChange={e => setEmailInput(e.target.value)} placeholder="e.g. user@wemade.com" className="select-input" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: 'white', padding: '6px' }} />
            </div>

            <div className="input-field" style={{ marginTop: '8px' }}>
              <label>age (Number, min: 18)</label>
              <input type="number" value={ageInput} onChange={e => setAgeInput(e.target.value)} placeholder="e.g. 21" className="select-input" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: 'white', padding: '6px' }} />
            </div>

            <button type="submit" className="submit-form-btn" style={{ marginTop: '12px', width: '100%' }}>
              Compile & Save to Mongoose Model
            </button>
          </form>

          {/* Validation Feedback box */}
          {validationResult && (
            <div style={{ marginTop: '12px' }}>
              {validationResult.success ? (
                <div className="alert-success-box" style={{ padding: '10px' }}>
                  <Check size={16} /> <strong>Mongoose Validation Success!</strong> User model instance created successfully.
                </div>
              ) : (
                <div className="alert-warning-box" style={{ background: 'rgba(239,68,68,0.06)', borderColor: 'rgba(239,68,68,0.2)', color: '#f87171', padding: '10px' }}>
                  <ShieldAlert size={16} style={{ color: '#f87171', marginRight: '6px' }} />
                  <strong>ValidationError: User validation failed</strong>
                  <ul style={{ margin: '6px 0 0 0', paddingLeft: '16px', fontSize: '0.7rem' }}>
                    {validationResult.errors.map((err, i) => <li key={i}>{err}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
