import React, { useState, useEffect } from 'react';
import { 
  Play, RotateCcw, Database, Cpu, Terminal, ArrowRight, 
  Layers, Code, Send, Check, X, ShieldAlert, Globe, Server,
  FileCode, List, File, Settings, AlertTriangle, Info, HelpCircle
} from 'lucide-react';

/* ==========================================
   1. NodeDbConnectionViz (Day 1)
   ========================================== */
export const NodeDbConnectionViz = () => {
  const [mongoUri, setMongoUri] = useState('mongodb+srv://student:pass123@wemade-sandbox.mongodb.net/mern');
  const [ipWhitelisted, setIpWhitelisted] = useState(true);
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('DISCONNECTED');

  const handleConnect = (e) => {
    e.preventDefault();
    setStatus('CONNECTING');
    const newLogs = ['[System] Booting Node.js database connector...'];
    
    setTimeout(() => {
      if (!mongoUri.includes('mongodb+srv://') && !mongoUri.includes('mongodb://')) {
        newLogs.push('[Database] MongooseError: Invalid connection protocol. Must be mongodb+srv or mongodb.');
        newLogs.push('[Database] State: FAILED');
        setStatus('FAILED');
        setLogs(newLogs);
        return;
      }

      if (!ipWhitelisted) {
        newLogs.push('[Database] MongooseServerSelectionError: Connection timed out.');
        newLogs.push('[Database] Reason: Client IP Address not whitelisted on MongoDB Atlas firewall.');
        newLogs.push('[Database] Tip: Log in to Atlas, navigate to Security -> Network Access, and whitelist 0.0.0.0/0.');
        newLogs.push('[Database] State: FAILED');
        setStatus('FAILED');
        setLogs(newLogs);
        return;
      }

      newLogs.push('[Database] Initiating TLS handshake with Atlas cluster...');
      newLogs.push('[Database] Connection established to cloud database: wemade_db');
      newLogs.push('[Database] Mongoose connection state: 1 (CONNECTED)');
      newLogs.push('[System] Express API endpoints ready.');
      setStatus('CONNECTED');
      setLogs(newLogs);
    }, 1200);

    setLogs(newLogs);
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <Database size={16} className="text-cyan" />
        <span>Day 1: Node.js & Mongoose Database Connection Guard</span>
      </div>

      <div className="viz-split-layout">
        {/* Left Side: Setup Controls */}
        <div className="compare-panel">
          <div className="panel-badge react-badge">Mongoose Connection Config</div>
          <h4>Database Connection Settings</h4>
          <p className="panel-desc">Configure Mongoose to connect your Express server to MongoDB Atlas.</p>

          <form onSubmit={handleConnect} className="sandbox-form" style={{ marginTop: '12px' }}>
            <div className="input-field">
              <label>MONGO_URI string (Connection String)</label>
              <input 
                type="text" 
                value={mongoUri} 
                onChange={e => setMongoUri(e.target.value)}
                className="select-input"
                style={{ width: '100%', fontFamily: 'monospace', fontSize: '0.75rem' }}
              />
            </div>

            <div className="control-group checkbox" style={{ margin: '12px 0 6px 0' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input 
                  type="checkbox" 
                  checked={ipWhitelisted} 
                  onChange={e => setIpWhitelisted(e.target.checked)} 
                />
                Simulate IP Whitelist Active (MongoDB Atlas)
              </label>
            </div>

            <button type="submit" className="viz-btn cyan-btn" style={{ width: '100%', marginTop: '8px' }}>
              Test Connection
            </button>
          </form>

          {/* Connection diagram */}
          <div className="connection-flow-diagram" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '12px', background: '#0f172a', borderRadius: '8px', border: '1px solid #1e293b' }}>
            <div style={{ textAlign: 'center' }}>
              <Server size={24} style={{ color: '#00d1d1' }} />
              <div style={{ fontSize: '0.65rem', marginTop: '4px' }}>Node Server</div>
            </div>
            
            <div style={{ flex: 1, height: '2px', background: status === 'CONNECTED' ? '#10b981' : status === 'FAILED' ? '#ef4444' : '#334155', margin: '0 8px', position: 'relative' }}>
              <div className="flow-dot" style={{ display: status === 'CONNECTING' ? 'block' : 'none' }}></div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Database size={24} style={{ color: status === 'CONNECTED' ? '#10b981' : '#64748b' }} />
              <div style={{ fontSize: '0.65rem', marginTop: '4px' }}>MongoDB Atlas</div>
            </div>
          </div>
        </div>

        {/* Right Side: Logs output & Case studies */}
        <div className="lifecycle-logs-panel">
          <div className="console-header">
            <Terminal size={14} /> <span>Server Terminal Output</span>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className={`status-dot ${status.toLowerCase()}`}></span>
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase' }}>{status}</span>
            </div>
          </div>
          <div className="console-body" style={{ minHeight: '160px', maxHeight: '180px', background: '#020617', padding: '12px', overflowY: 'auto' }}>
            {logs.length === 0 ? (
              <div className="console-empty">Click "Test Connection" to startup database handshake logs...</div>
            ) : (
              logs.map((log, i) => {
                let color = '#f1f5f9';
                if (log.startsWith('[Error]') || log.includes('Error:')) color = '#f87171';
                else if (log.startsWith('[Database]')) color = '#a855f7';
                else if (log.includes('established') || log.includes('state: 1')) color = '#34d399';
                return <div key={i} style={{ color, fontFamily: 'monospace', fontSize: '0.7rem', marginBottom: '4px' }}>{log}</div>;
              })
            )}
          </div>

          {/* Case study banner */}
          <div className="alert-warning-box" style={{ marginTop: '10px', fontSize: '0.7rem', padding: '8px' }}>
            <AlertTriangle size={14} style={{ marginRight: '6px' }} />
            <div>
              <strong>Security Case Study:</strong> Never hardcode database passwords in repository files! Always use `.env` environment variables and load them via <code>process.env.MONGO_URI</code>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


/* ==========================================
   2. NodeCoreModulesViz (Day 2)
   ========================================== */
export const NodeCoreModulesViz = () => {
  const [fsMode, setFsMode] = useState('async');
  const [activeFile, setActiveFile] = useState('config.json');
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const mockFiles = {
    'config.json': '{\n  "appName": "MERN Classroom",\n  "version": "1.0.0"\n}',
    'index.js': 'const fs = require(\'fs\');\nconsole.log(\'Reading file...\');',
    'system_logs.log': 'INFO: Connection opened\nWARNING: High memory load detected'
  };

  const handleReadFile = () => {
    setIsLoading(true);
    const newLogs = [];

    if (fsMode === 'sync') {
      newLogs.push('node app.js');
      newLogs.push('[Event Loop] BLOCKING PROCESS STARTED...');
      newLogs.push('[Event Loop] Main thread is frozen. No incoming requests can be accepted.');
      
      // Force delay loop to simulate synchronous execution block
      let count = 0;
      for (let i = 0; i < 500000000; i++) { count += i; }

      newLogs.push(`[FS] File read completed: ${activeFile}`);
      newLogs.push('=== Content Preview ===');
      newLogs.push(mockFiles[activeFile]);
      newLogs.push('[Event Loop] BLOCKING PROCESS ENDED. Thread released.');
      setConsoleOutput(newLogs);
      setIsLoading(false);
    } else {
      newLogs.push('node app.js');
      newLogs.push('[Event Loop] ASYNCHRONOUS NON-BLOCKING READ STARTED...');
      newLogs.push('[Event Loop] Task delegated to libuv worker pool. Main thread is free.');
      newLogs.push('[Event Loop] Incoming HTTP request received and processed (200 OK).');
      
      setTimeout(() => {
        newLogs.push(`[FS] Libuv thread returned file data: ${activeFile}`);
        newLogs.push('=== Content Preview ===');
        newLogs.push(mockFiles[activeFile]);
        newLogs.push('[Event Loop] Asynchronous callback finished.');
        setConsoleOutput(newLogs);
        setIsLoading(false);
      }, 1200);
      
      setConsoleOutput(newLogs);
    }
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <Cpu size={16} className="text-cyan" />
        <span>Day 2: Node.js Core Modules (FS, PATH, HTTP) & Event Loop</span>
      </div>

      <div className="viz-split-layout">
        {/* Left Panel: Files and FS controls */}
        <div className="compare-panel">
          <div className="panel-badge react-badge">FS Core Module Simulator</div>
          <h4>Node Asynchronous vs Synchronous File IO</h4>
          <p className="panel-desc">File operations in Node.js can be run synchronously (blocking) or asynchronously (non-blocking). Learn why sync is dangerous in servers.</p>

          <div className="control-group">
            <label>1. Select File to Read:</label>
            <div style={{ display: 'flex', gap: '6px' }}>
              {Object.keys(mockFiles).map(f => (
                <button 
                  key={f} 
                  className={`viz-btn ${activeFile === f ? 'cyan-btn' : ''}`}
                  onClick={() => setActiveFile(f)}
                  style={{ fontSize: '0.7rem', padding: '4px 8px', background: activeFile === f ? undefined : '#1e293b' }}
                >
                  <File size={12} style={{ marginRight: '4px' }} /> {f}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group" style={{ marginTop: '12px' }}>
            <label>2. Choose FS Method:</label>
            <div className="filter-group" style={{ display: 'flex', gap: '6px' }}>
              <button 
                className={fsMode === 'async' ? 'active' : ''} 
                onClick={() => setFsMode('async')}
                style={{ flex: 1, fontSize: '0.75rem' }}
              >
                fs.readFile (Async Non-Blocking)
              </button>
              <button 
                className={fsMode === 'sync' ? 'active font-red' : ''} 
                onClick={() => setFsMode('sync')}
                style={{ flex: 1, fontSize: '0.75rem' }}
              >
                fs.readFileSync (Sync Blocking)
              </button>
            </div>
          </div>

          <button 
            className="viz-btn cyan-btn" 
            onClick={handleReadFile} 
            disabled={isLoading}
            style={{ width: '100%', marginTop: '12px' }}
          >
            {isLoading ? 'Processing File IO...' : 'Execute fs read operation'}
          </button>
        </div>

        {/* Right Panel: Console output logs */}
        <div className="lifecycle-logs-panel">
          <div className="console-header">
            <Terminal size={14} /> <span>Node Event Loop Console</span>
          </div>
          <div className="console-body" style={{ minHeight: '220px', background: '#020617', padding: '12px', overflowY: 'auto' }}>
            {consoleOutput.length === 0 ? (
              <div className="console-empty">Click "Execute fs read operation" to view execution traces...</div>
            ) : (
              consoleOutput.map((log, i) => {
                let color = '#e2e8f0';
                if (log.includes('BLOCKING PROCESS STARTED') || log.includes('thread is frozen')) color = '#f87171';
                else if (log.includes('NON-BLOCKING') || log.includes('Main thread is free')) color = '#34d399';
                else if (log.includes('node app.js')) color = '#00d1d1';
                else if (log.startsWith('INFO:')) color = '#10b981';
                return <div key={i} style={{ color, fontFamily: 'monospace', fontSize: '0.7rem', marginBottom: '4px' }}>{log}</div>;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


/* ==========================================
   3. ExpressRoutingViz (Day 3)
   ========================================== */
export const ExpressRoutingViz = () => {
  const [reqId, setReqId] = useState('101');
  const [reqCategory, setReqCategory] = useState('books');
  const [reqLimit, setReqLimit] = useState('10');
  
  const [logs, setLogs] = useState([]);

  const handleTestRoute = () => {
    const route = `/api/products/${reqId}/${reqCategory}?limit=${reqLimit}`;
    const newLogs = [];

    newLogs.push(`Incoming GET Request: http://localhost:5000${route}`);
    newLogs.push('[Express Router] Scanning route maps for route pattern: /api/products/:id/:category');
    newLogs.push('[Express Router] Found matching pattern!');
    
    // Parse params and queries
    const params = { id: reqId, category: reqCategory };
    const query = { limit: reqLimit };

    newLogs.push('=== Express Parsing Values ===');
    newLogs.push(`req.params: ${JSON.stringify(params, null, 2)}`);
    newLogs.push(`req.query: ${JSON.stringify(query, null, 2)}`);
    newLogs.push(`[Controller] Fetching product ID ${reqId} in category "${reqCategory}" (Limit: ${reqLimit})...`);
    newLogs.push('Status: 200 OK - Return JSON product detail data.');

    setLogs(newLogs);
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <Layers size={16} className="text-cyan" />
        <span>Day 3: Express Routing, Route Params vs. Query Params</span>
      </div>

      <div className="viz-split-layout">
        {/* Left Side: Parameters input */}
        <div className="compare-panel">
          <div className="panel-badge react-badge">Route & Query Parameters</div>
          <h4>API Route Request Parameter Simulator</h4>
          <p className="panel-desc">Route parameters (`:id`) define database resources, while query parameters (`?limit=10`) handle filters, searches, and limits.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            <div className="input-field">
              <label>Route Parameter: :id (Product Identity)</label>
              <input type="text" value={reqId} onChange={e => setReqId(e.target.value)} className="select-input" style={{ width: '100%' }} />
            </div>

            <div className="input-field">
              <label>Route Parameter: :category (Section Name)</label>
              <input type="text" value={reqCategory} onChange={e => setReqCategory(e.target.value)} className="select-input" style={{ width: '100%' }} />
            </div>

            <div className="input-field">
              <label>Query Parameter: ?limit (Fetch Constraints)</label>
              <input type="text" value={reqLimit} onChange={e => setReqLimit(e.target.value)} className="select-input" style={{ width: '100%' }} />
            </div>
          </div>

          <button className="viz-btn cyan-btn" onClick={handleTestRoute} style={{ width: '100%', marginTop: '16px' }}>
            Send HTTP GET request
          </button>
        </div>

        {/* Right Side: Route parser console */}
        <div className="lifecycle-logs-panel">
          <div className="console-header">
            <Terminal size={14} /> <span>Express Server Route Tracer</span>
          </div>
          <div className="console-body" style={{ minHeight: '230px', background: '#020617', padding: '12px', overflowY: 'auto' }}>
            {logs.length === 0 ? (
              <div className="console-empty">Click "Send HTTP GET request" to trace route parser matching...</div>
            ) : (
              logs.map((log, i) => {
                let color = '#cbd5e1';
                if (log.startsWith('Incoming GET')) color = '#00d1d1';
                else if (log.includes('req.params:') || log.includes('req.query:')) color = '#a855f7';
                else if (log.startsWith('Status:')) color = '#34d399';
                return <div key={i} style={{ color, fontFamily: 'monospace', fontSize: '0.7rem', marginBottom: '4px', whiteSpace: 'pre-wrap' }}>{log}</div>;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


/* ==========================================
   4. BackendCrudOperationsViz (Day 4)
   ========================================== */
export const BackendCrudOperationsViz = () => {
  const [method, setMethod] = useState('GET');
  const [route, setRoute] = useState('/api/products');
  const [reqBody, setReqBody] = useState('{\n  "title": "Express Pro Course",\n  "price": 129\n}');
  
  const [products, setProducts] = useState([
    { id: 101, title: 'Node Course Bundle', price: 99 },
    { id: 102, title: 'Express Core API Pro', price: 149 }
  ]);
  const [logs, setLogs] = useState([]);
  const [response, setResponse] = useState(null);

  const handleSend = () => {
    const newLogs = [];
    newLogs.push(`Incoming Request: ${method} ${route}`);
    
    let status = 200;
    let resData = null;

    if (route !== '/api/products' && !route.startsWith('/api/products/')) {
      newLogs.push(`[Router] Error: Route ${method} ${route} not found.`);
      setLogs(newLogs);
      setResponse({ status: 404, data: { error: 'Route not found' } });
      return;
    }

    if (method === 'GET') {
      newLogs.push('[Controller] Fetching products list from database...');
      resData = products;
      status = 200;
    } else if (method === 'POST') {
      try {
        const bodyObj = JSON.parse(reqBody);
        if (!bodyObj.title || !bodyObj.price) {
          status = 400;
          resData = { error: 'Validation Failed: title and price fields are required' };
          newLogs.push('[Controller] Validation error: Title or Price missing in request body.');
        } else {
          const newProd = { id: Date.now(), title: bodyObj.title, price: bodyObj.price };
          setProducts([...products, newProd]);
          resData = { success: true, message: 'Product created successfully', product: newProd };
          status = 201;
          newLogs.push(`[Controller] Document created in DB: ${bodyObj.title}`);
        }
      } catch (err) {
        status = 400;
        resData = { error: 'Invalid JSON payload body format' };
        newLogs.push('[Controller] JSON parse error: Request body malformed.');
      }
    } else if (method === 'PUT') {
      const match = route.match(/\/api\/products\/(\d+)/);
      if (match) {
        const pId = parseInt(match[1], 10);
        try {
          const bodyObj = JSON.parse(reqBody);
          let productFound = false;
          const updatedProds = products.map(p => {
            if (p.id === pId) {
              productFound = true;
              return { ...p, ...bodyObj };
            }
            return p;
          });
          if (productFound) {
            setProducts(updatedProds);
            resData = { success: true, message: `Product ID ${pId} updated successfully` };
            status = 200;
            newLogs.push(`[Controller] Document updated in DB: ID ${pId}`);
          } else {
            status = 404;
            resData = { error: `Product ID ${pId} not found` };
            newLogs.push(`[Controller] Update error: Product ID ${pId} not found.`);
          }
        } catch (e) {
          status = 400;
          resData = { error: 'Invalid JSON payload' };
        }
      } else {
        status = 400;
        resData = { error: 'Missing product ID in route parameter (e.g. /api/products/101)' };
      }
    } else if (method === 'DELETE') {
      const match = route.match(/\/api\/products\/(\d+)/);
      if (match) {
        const pId = parseInt(match[1], 10);
        const exists = products.some(p => p.id === pId);
        if (exists) {
          setProducts(products.filter(p => p.id !== pId));
          resData = { success: true, message: `Product ID ${pId} deleted successfully` };
          status = 200;
          newLogs.push(`[Controller] Document deleted from DB: ID ${pId}`);
        } else {
          status = 404;
          resData = { error: `Product ID ${pId} not found` };
        }
      } else {
        status = 400;
        resData = { error: 'Missing product ID in route parameter' };
      }
    }

    newLogs.push(`[Server] Responding with status code ${status}`);
    setLogs(newLogs);
    setResponse({ status, data: resData });
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <Globe size={16} className="text-cyan" />
        <span>Day 4: Express API CRUD Sandbox (GET, POST, PUT, DELETE)</span>
      </div>

      <div className="viz-split-layout">
        {/* Left Panel: Request Client Form */}
        <div className="compare-panel">
          <div className="panel-badge react-badge">Postman-like API Client</div>
          <h4>Send API Request</h4>
          
          <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
            <select value={method} onChange={e => setMethod(e.target.value)} className="select-input" style={{ width: '90px' }}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input 
              type="text" 
              value={route} 
              onChange={e => setRoute(e.target.value)}
              className="select-input" 
              style={{ flex: 1 }}
            />
            <button className="viz-btn cyan-btn" onClick={handleSend}><Send size={12} /></button>
          </div>

          {(method === 'POST' || method === 'PUT') && (
            <div className="control-group" style={{ marginTop: '10px' }}>
              <label>Request JSON Body:</label>
              <textarea 
                value={reqBody} 
                onChange={e => setReqBody(e.target.value)}
                className="select-input"
                style={{ width: '100%', height: '70px', fontFamily: 'monospace', fontSize: '0.75rem' }}
              />
            </div>
          )}

          {/* Database table preview */}
          <div className="database-table-box" style={{ marginTop: '16px', background: '#0f172a', padding: '10px', borderRadius: '8px', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem', color: '#64748b', marginBottom: '6px' }}>
              <Database size={10} /> <span>Active database products collection</span>
            </div>
            {products.map(p => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', padding: '4px 0', borderBottom: '1px solid #1e293b' }}>
                <span>ID: {p.id} - <strong>{p.title}</strong></span>
                <span className="text-cyan">${p.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Logs and JSON response payload */}
        <div className="lifecycle-logs-panel">
          <div className="console-header">
            <Terminal size={14} /> <span>Express API Server Logs</span>
            {response && (
              <span className={response.status >= 200 && response.status < 300 ? 'font-green' : 'font-red'} style={{ marginLeft: 'auto', fontSize: '0.7rem', fontWeight: 'bold' }}>
                Status: {response.status}
              </span>
            )}
          </div>
          
          <div className="console-body" style={{ minHeight: '100px', background: '#020617', padding: '12px', overflowY: 'auto' }}>
            {logs.length === 0 ? (
              <div className="console-empty">Send an API request from the client to see server route logs...</div>
            ) : (
              logs.map((log, i) => <div key={i} style={{ color: log.startsWith('Incoming') ? '#00d1d1' : log.includes('Error') ? '#f87171' : '#cbd5e1', fontFamily: 'monospace', fontSize: '0.7rem', marginBottom: '2px' }}>{log}</div>)
            )}
          </div>

          {response && (
            <div className="response-payload-box" style={{ flex: 1, borderTop: '1px solid #1e293b', background: '#030712', padding: '10px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div style={{ fontSize: '0.65rem', color: '#64748b', marginBottom: '4px' }}>RESPONSE JSON BODY:</div>
              <pre style={{ margin: 0, fontSize: '0.65rem', color: '#a7f3d0', fontFamily: 'monospace', overflowY: 'auto', flex: 1, whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(response.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


/* ==========================================
   5. MiddlewarePipelineViz (Day 5)
   ========================================== */
export const MiddlewarePipelineViz = () => {
  const [jsonParserActive, setJsonParserActive] = useState(true);
  const [loggerActive, setLoggerActive] = useState(true);
  const [logs, setLogs] = useState([]);

  const handleTriggerRequest = () => {
    const newLogs = [];
    newLogs.push('POST /api/users HTTP/1.1');
    newLogs.push('Content-Type: application/json');
    newLogs.push('Body: { "username": "alex" }');
    newLogs.push('=== Express Middleware Tunnel ===');

    let requestBodyParsed = false;
    
    // 1. Logger Middleware
    if (loggerActive) {
      newLogs.push('[Middleware] logger: Incoming request: POST /api/users');
    }

    // 2. express.json() Parser Middleware
    if (jsonParserActive) {
      newLogs.push('[Middleware] express.json(): Request body stream parsed from raw buffer to req.body object.');
      requestBodyParsed = true;
    } else {
      newLogs.push('[Middleware] express.json() is INACTIVE. Raw body stream was skipped, req.body is undefined!');
    }

    // 3. Controller Execution
    newLogs.push('[Controller] Running createUser controller...');
    if (requestBodyParsed) {
      newLogs.push('[Controller] req.body value read successfully: { username: "alex" }');
      newLogs.push('Status: 201 Created');
    } else {
      newLogs.push('[Controller] ERROR: TypeError: Cannot read properties of undefined (reading \'username\')');
      newLogs.push('[Server] Server crashed! Request connection dropped (500 Server Error).');
    }

    setLogs(newLogs);
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <Layers size={16} className="text-cyan" />
        <span>Day 5: Express Custom & Builtin Middleware Highways</span>
      </div>

      <div className="viz-split-layout">
        {/* Left Side: Middleware toggle switches */}
        <div className="compare-panel">
          <div className="panel-badge react-badge">Middleware Pipeline Control</div>
          <h4>Configure Middleware Stack</h4>
          <p className="panel-desc">Enable or disable specific middlewares to see how they process requests before reaching controller actions.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            <div className="control-group checkbox">
              <label>
                <input 
                  type="checkbox" 
                  checked={loggerActive} 
                  onChange={e => setLoggerActive(e.target.checked)} 
                />
                Enable Logger Middleware (Log client requests details)
              </label>
            </div>

            <div className="control-group checkbox">
              <label>
                <input 
                  type="checkbox" 
                  checked={jsonParserActive} 
                  onChange={e => setJsonParserActive(e.target.checked)} 
                />
                Enable <code>express.json()</code> Body Parser
              </label>
            </div>
          </div>

          <button className="viz-btn cyan-btn" onClick={handleTriggerRequest} style={{ width: '100%', marginTop: '16px' }}>
            Trigger POST Request
          </button>
        </div>

        {/* Right Side: Pipeline trace console */}
        <div className="lifecycle-logs-panel">
          <div className="console-header">
            <Terminal size={14} /> <span>Express Middleware Pipeline execution trace</span>
          </div>
          <div className="console-body" style={{ minHeight: '230px', background: '#020617', padding: '12px', overflowY: 'auto' }}>
            {logs.length === 0 ? (
              <div className="console-empty">Click "Trigger POST Request" to trace the middleware queue...</div>
            ) : (
              logs.map((log, i) => {
                let color = '#cbd5e1';
                if (log.startsWith('POST')) color = '#00d1d1';
                else if (log.startsWith('[Middleware]')) color = '#a855f7';
                else if (log.includes('ERROR') || log.includes('crashed')) color = '#f87171';
                else if (log.includes('201 Created')) color = '#34d399';
                return <div key={i} style={{ color, fontFamily: 'monospace', fontSize: '0.7rem', marginBottom: '4px' }}>{log}</div>;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


/* ==========================================
   6. MvcArchitectureViz (Day 6)
   ========================================== */
export const MvcArchitectureViz = () => {
  const [activeCodeTab, setActiveCodeTab] = useState('model');

  const fileContents = {
    model: `// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('User', userSchema);`,
    
    route: `// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/userController');

router.get('/', getUsers);
router.post('/', createUser);

module.exports = router;`,

    controller: `// controllers/userController.js
const User = require('../models/User');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsers };`
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <Layers size={16} className="text-cyan" />
        <span>Day 6: Model-View-Controller (MVC) Pattern folder mapping</span>
      </div>

      <div className="viz-split-layout">
        {/* Left Side: MVC Flowchart diagram */}
        <div className="compare-panel">
          <div className="panel-badge react-badge">MVC Directory Architecture</div>
          <h4>MVC Flowchart</h4>
          <p className="panel-desc">MVC separates database models, business logic controllers, and routes to make codebases organized and scalable.</p>

          <div className="mvc-flowchart-box" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            <div 
              className={`flowchart-node ${activeCodeTab === 'route' ? 'active' : ''}`}
              onClick={() => setActiveCodeTab('route')}
              style={{ padding: '8px', border: '1px solid #334155', borderRadius: '6px', cursor: 'pointer', textAlign: 'center', background: activeCodeTab === 'route' ? '#00d1d115' : '#0f172a', borderColor: activeCodeTab === 'route' ? '#00d1d1' : '#334155' }}
            >
              <strong>1. Route Guard (routes/userRoutes.js)</strong>
              <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Maps URLs to Controller methods</div>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>↓</div>

            <div 
              className={`flowchart-node ${activeCodeTab === 'controller' ? 'active' : ''}`}
              onClick={() => setActiveCodeTab('controller')}
              style={{ padding: '8px', border: '1px solid #334155', borderRadius: '6px', cursor: 'pointer', textAlign: 'center', background: activeCodeTab === 'controller' ? '#a855f715' : '#0f172a', borderColor: activeCodeTab === 'controller' ? '#a855f7' : '#334155' }}
            >
              <strong>2. Logic Controller (controllers/userController.js)</strong>
              <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Runs validations & database queries</div>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>↓</div>

            <div 
              className={`flowchart-node ${activeCodeTab === 'model' ? 'active' : ''}`}
              onClick={() => setActiveCodeTab('model')}
              style={{ padding: '8px', border: '1px solid #334155', borderRadius: '6px', cursor: 'pointer', textAlign: 'center', background: activeCodeTab === 'model' ? '#10b98115' : '#0f172a', borderColor: activeCodeTab === 'model' ? '#10b981' : '#334155' }}
            >
              <strong>3. Data Model Schema (models/User.js)</strong>
              <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Defines database collection structure</div>
            </div>
          </div>
        </div>

        {/* Right Side: Code File viewer */}
        <div className="compare-panel" style={{ background: '#090d16' }}>
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #1e293b', paddingBottom: '6px', marginBottom: '10px' }}>
            <button className={`viz-btn ${activeCodeTab === 'route' ? 'cyan-btn' : ''}`} onClick={() => setActiveCodeTab('route')} style={{ fontSize: '0.7rem', padding: '2px 8px' }}>Routes</button>
            <button className={`viz-btn ${activeCodeTab === 'controller' ? 'cyan-btn' : ''}`} onClick={() => setActiveCodeTab('controller')} style={{ fontSize: '0.7rem', padding: '2px 8px' }}>Controllers</button>
            <button className={`viz-btn ${activeCodeTab === 'model' ? 'cyan-btn' : ''}`} onClick={() => setActiveCodeTab('model')} style={{ fontSize: '0.7rem', padding: '2px 8px' }}>Models</button>
          </div>

          <pre style={{ margin: 0, fontSize: '0.65rem', color: '#cbd5e1', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
            {fileContents[activeCodeTab]}
          </pre>
        </div>
      </div>
    </div>
  );
};
