import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { 
  Play, RotateCcw, Layout, Code2, Monitor, Terminal, 
  Globe, Send, Cpu, Database, AlertCircle, CheckCircle2 
} from 'lucide-react';

const CodeEditor = ({ 
  initialCode, 
  onChange, 
  tabs = ['html', 'css', 'js'], 
  readOnly = false, 
  isReact = false,
  isBackend = false 
}) => {
  const safeInitialCode = initialCode || { html: '', css: '', js: '' };
  const [code, setCode] = useState(safeInitialCode);
  const [activeTab, setActiveTab] = useState(isReact ? 'js' : isBackend ? 'js' : (tabs[0] || 'html'));
  const [srcDoc, setSrcDoc] = useState('');
  
  const [splitRatio, setSplitRatio] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const containerRef = useRef(null);

  // Backend simulated server states
  const [method, setMethod] = useState('GET');
  const [route, setRoute] = useState('/api/users');
  const [reqBody, setReqBody] = useState('{\n  "name": "Alex Carter",\n  "email": "alex@wemade.com"\n}');
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [responseJson, setResponseJson] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);

  useEffect(() => {
    setCode(initialCode || { html: '', css: '', js: '' });
    if (isReact || isBackend) {
      setActiveTab('js');
    }
  }, [initialCode, isReact, isBackend]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Standard frontend iframe updating logic
  useEffect(() => {
    if (isBackend) return; // Skip iframe updates for backend configs

    const timeout = setTimeout(() => {
      if (isReact) {
        setSrcDoc(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
              <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
              <script src="https://unpkg.com/@babel/standalone/babel.min.js" crossorigin></script>
              <script src="https://unpkg.com/react-router-dom@6.22.3/dist/umd/react-router-dom.production.min.js" crossorigin></script>
              <style>
                ${code.css || ''}
                body {
                  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  padding: 16px;
                  margin: 0;
                  background: #f8fafc;
                  color: #0f172a;
                }
              </style>
              <script>
                window.onerror = function(message, source, lineno, colno, error) {
                  const root = document.getElementById('root');
                  if (root) {
                    root.innerHTML = \`
                      <div style="padding: 16px; background: #fef2f2; border: 1px solid #fee2e2; border-radius: 8px; color: #991b1b; font-family: monospace; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                        <h4 style="margin: 0 0 8px 0; font-weight: 600; color: #dc2626;">Runtime Error</h4>
                        <pre style="margin: 0; white-space: pre-wrap; font-size: 0.85rem; overflow-x: auto;">\${message}</pre>
                      </div>
                    \`;
                  }
                  return false;
                };
              </script>
            </head>
            <body>
              <div id="root"></div>
              ${code.html || ''}

              <script type="text/babel">
                try {
                  const { useState, useEffect, useRef, useMemo, useCallback } = React;
                  if (window.ReactRouterDOM) {
                    window.BrowserRouter = window.ReactRouterDOM.BrowserRouter;
                    window.HashRouter = window.ReactRouterDOM.HashRouter;
                    window.Routes = window.ReactRouterDOM.Routes;
                    window.Route = window.ReactRouterDOM.Route;
                    window.Link = window.ReactRouterDOM.Link;
                    window.useNavigate = window.ReactRouterDOM.useNavigate;
                    window.useParams = window.ReactRouterDOM.useParams;
                    window.useLocation = window.ReactRouterDOM.useLocation;
                  }

                  ${code.js || ''}

                  setTimeout(() => {
                    if (typeof App !== 'undefined' && !document.getElementById('root').innerHTML) {
                      const root = ReactDOM.createRoot(document.getElementById('root'));
                      root.render(<App />);
                    }
                  }, 100);
                } catch (err) {
                  const root = document.getElementById('root');
                  if (root) {
                    root.innerHTML = \`
                      <div style="padding: 16px; background: #fef2f2; border: 1px solid #fee2e2; border-radius: 8px; color: #991b1b; font-family: monospace; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                        <h4 style="margin: 0 0 8px 0; font-weight: 600; color: #dc2626;">Compilation / Initialization Error</h4>
                        <pre style="margin: 0; white-space: pre-wrap; font-size: 0.85rem; overflow-x: auto;">\${err.stack || err.message || err}</pre>
                      </div>
                    \`;
                  }
                }
              </script>
            </body>
          </html>
        `);
      } else {
        setSrcDoc(`
          <html>
            <body>${code.html || ''}</body>
            <style>${code.css || ''}</style>
            <script>${code.js || ''}</script>
          </html>
        `);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [code, isReact, isBackend]);

  // Split view resizer handlers
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      let newRatio;
      
      if (isMobile) {
        newRatio = ((e.clientY - rect.top) / rect.height) * 100;
      } else {
        newRatio = ((e.clientX - rect.left) / rect.width) * 100;
      }
      
      if (newRatio < 10) newRatio = 10;
      if (newRatio > 90) newRatio = 90;
      
      setSplitRatio(newRatio);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isMobile ? 'row-resize' : 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };
  }, [isDragging, isMobile]);

  // Backend simulation trigger
  const handleRunBackend = () => {
    if (!isBackend) return;
    const logs = [];
    logs.push(`[System] Initializing server compilation...`);

    // Parse env file keypairs
    const envVars = {};
    if (code.css) {
      code.css.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts[0] && parts[1]) {
          envVars[parts[0].trim()] = parts[1].trim();
        }
      });
    }

    logs.push(`[System] Loaded configuration parameters: PORT=${envVars.PORT || 5000}`);
    
    // Connect to database checks
    if (code.js.includes('mongoose.connect') || code.js.includes('connectDB')) {
      logs.push('[Database] Opening connection pools...');
      if (code.css && code.css.includes('MONGO_URI')) {
        logs.push('[Database] Connection established to MongoDB Cluster successfully.');
      } else {
        logs.push('[Database] Error: MongoDB URI string not declared in environment config!');
      }
    }

    logs.push(`[Server] Express server listening on port ${envVars.PORT || 5000}`);
    setConsoleLogs(logs);
    setResponseJson(null);
    setResponseStatus(null);
  };

  // Postman HTTP simulator trigger
  const handleSendRequest = () => {
    if (!isBackend) return;
    
    const logs = consoleLogs.length > 0 ? [...consoleLogs] : [];
    if (logs.length === 0) {
      logs.push('[System] Starting mock server on flight...');
      logs.push('[Server] Express server listening on port 5000');
    }
    
    logs.push(`[Client] Sending ${method} http://localhost:5000${route}`);

    // Parse route endpoints
    let routeFound = false;
    let status = 404;
    let resData = { error: `Cannot ${method} ${route}` };

    // Middleware logger simulator
    if (code.js.includes('app.use(logger)') || code.js.includes('app.use((req, res, next)')) {
      logs.push(`[Middleware] logger: ${method} ${route} - ${new Date().toISOString()}`);
    }

    // Protected RouteGuard simulator
    let authenticated = true;
    if (code.js.includes('authGuard') || code.js.includes('protect') || code.js.includes('validateToken') || code.js.includes('jwt')) {
      logs.push('[Middleware] Executing RouteGuard authentication checks...');
      if (route.startsWith('/api/protected') || route.includes('dashboard') || route.includes('admin') || route.includes('profile')) {
        authenticated = false;
        status = 401;
        resData = { error: 'Unauthorized: Access token missing or Bearer header invalid' };
        logs.push('[Middleware] Access Denied: Authentication token missing.');
      }
    }

    if (authenticated) {
      if (method === 'GET') {
        if (route === '/api/users' || route === '/api/products' || route === '/api/dashboard') {
          routeFound = true;
          status = 200;
          if (route === '/api/users') {
            resData = [
              { _id: '60c72b1', name: 'Alice Carter', email: 'alice@wemade.com' },
              { _id: '60c72b2', name: 'Bob Smith', email: 'bob@wemade.com' }
            ];
          } else if (route === '/api/products') {
            resData = [
              { id: 101, title: 'Node Course Bundle', price: 99 },
              { id: 102, title: 'Express Core API Pro', price: 149 }
            ];
          } else {
            resData = { message: 'Welcome to the Protected User Dashboard!', user: 'Staff Mentor' };
          }
        }
      } else if (method === 'POST') {
        if (route === '/api/users' || route === '/api/products' || route === '/api/login' || route === '/api/register') {
          routeFound = true;
          status = 201;
          
          let parsedBody = {};
          try {
            parsedBody = JSON.parse(reqBody);
          } catch(e) {}

          if (route === '/api/login') {
            status = 200;
            resData = { success: true, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjF9.signature' };
          } else {
            resData = { message: 'Document created successfully!', data: parsedBody };
          }
        }
      } else if (method === 'PUT') {
        if (route.startsWith('/api/users/') || route.startsWith('/api/products/')) {
          routeFound = true;
          status = 200;
          let parsedBody = {};
          try { parsedBody = JSON.parse(reqBody); } catch(e) {}
          resData = { message: 'Document updated successfully!', updatedFields: parsedBody };
        }
      } else if (method === 'DELETE') {
        if (route.startsWith('/api/users/') || route.startsWith('/api/products/')) {
          routeFound = true;
          status = 200;
          resData = { message: 'Document deleted successfully!' };
        }
      }
    }

    if (routeFound && authenticated) {
      logs.push(`[Router] Matched route path: ${method} ${route}`);
      logs.push(`[Response] Status ${status} - Response sent to client`);
    } else if (!routeFound && authenticated) {
      logs.push(`[Router] Error: Cannot find route matching path ${method} ${route}`);
      logs.push(`[Response] Status 404 Not Found`);
    }

    setResponseStatus(status);
    setResponseJson(resData);
    setConsoleLogs(logs);
  };

  const handleEditorChange = (value) => {
    const newCode = { ...code, [activeTab]: value };
    setCode(newCode);
    if (onChange) {
      onChange(newCode);
    }
  };

  // Determine Tab Labels dynamically
  const tabLabels = isBackend ? {
    js: 'server.js',
    css: '.env',
    html: 'request.json'
  } : {
    js: 'JS',
    css: 'CSS',
    html: 'HTML'
  };

  const codePanelStyle = isMobile 
    ? { height: `calc(${splitRatio}% - 3px)`, width: '100%' }
    : { width: `calc(${splitRatio}% - 3px)`, height: '100%' };
    
  const previewPanelStyle = isMobile 
    ? { height: `calc(${100 - splitRatio}% - 3px)`, width: '100%' }
    : { width: `calc(${100 - splitRatio}% - 3px)`, height: '100%' };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <div className="tab-group">
          {tabs.includes('js') && (
            <button 
              className={`tab-btn ${activeTab === 'js' ? 'active' : ''}`}
              onClick={() => setActiveTab('js')}
            >
              {tabLabels.js}
            </button>
          )}
          {tabs.includes('css') && (
            <button 
              className={`tab-btn ${activeTab === 'css' ? 'active' : ''}`}
              onClick={() => setActiveTab('css')}
            >
              {tabLabels.css}
            </button>
          )}
          {tabs.includes('html') && (
            <button 
              className={`tab-btn ${activeTab === 'html' ? 'active' : ''}`}
              onClick={() => setActiveTab('html')}
            >
              {tabLabels.html}
            </button>
          )}
        </div>
        <div className="editor-actions">
          <button 
            className="icon-btn" 
            onClick={() => !readOnly && setCode(initialCode)}
            disabled={readOnly}
          >
            <RotateCcw size={16} />
          </button>
          <button 
            className="btn btn-primary" 
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            disabled={readOnly}
            onClick={isBackend ? handleRunBackend : undefined}
          >
            <Play size={14} /> Run Server
          </button>
        </div>
      </div>

      <div className="editor-main" ref={containerRef}>
        <div className="code-panel" style={codePanelStyle}>
          <Editor
            height="100%"
            language={activeTab === 'js' ? 'javascript' : activeTab === 'css' && isBackend ? 'ini' : activeTab === 'html' && isBackend ? 'json' : activeTab}
            theme="vs-dark"
            value={code[activeTab]}
            onChange={(value) => !readOnly && handleEditorChange(value)}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: readOnly,
              automaticLayout: true,
            }}
          />
        </div>
        
        <div 
          className={`resizer ${isDragging ? 'dragging' : ''}`} 
          onMouseDown={() => setIsDragging(true)}
          title="Drag to resize"
        >
          <div className="resizer-handle"></div>
        </div>

        <div className="preview-panel animate-panel" style={previewPanelStyle}>
          {isBackend ? (
            /* Backend Playground API Tester View */
            <div className="backend-console-wrapper" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#020617', color: '#f1f5f9' }}>
              <div className="preview-header" style={{ background: '#0b0f19', borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
                <Globe size={14} className="text-cyan" /> <span>Backend API Client & Sandbox Console</span>
              </div>
              
              {/* Postman-like tester panel */}
              <div className="api-tester-form" style={{ padding: '12px', borderBottom: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <select 
                    value={method} 
                    onChange={e => setMethod(e.target.value)} 
                    className="select-input" 
                    style={{ background: '#1e293b', border: '1px solid #334155', color: 'white', fontSize: '0.8rem', padding: '4px' }}
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                  <input 
                    type="text" 
                    value={route}
                    onChange={e => setRoute(e.target.value)}
                    placeholder="/api/users"
                    className="select-input"
                    style={{ flex: 1, background: '#0f172a', border: '1px solid #334155', color: 'white', padding: '4px 8px', fontSize: '0.8rem' }}
                  />
                  <button className="viz-btn cyan-btn" style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={handleSendRequest}>
                    <Send size={12} /> Send
                  </button>
                </div>

                {/* Body payload input for POST/PUT */}
                {(method === 'POST' || method === 'PUT') && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.7rem', color: '#64748b' }}>Request JSON Body:</label>
                    <textarea 
                      value={reqBody}
                      onChange={e => setReqBody(e.target.value)}
                      className="select-input"
                      style={{ height: '50px', background: '#0f172a', border: '1px solid #334155', color: 'white', fontFamily: 'monospace', fontSize: '0.75rem', padding: '4px' }}
                    />
                  </div>
                )}
              </div>

              {/* API Response Display & Shell Logs */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                {responseStatus && (
                  <div style={{ padding: '10px 12px', background: '#0b0f19', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>API Response Status:</span>
                    <strong className={responseStatus >= 200 && responseStatus < 300 ? 'font-green' : 'font-red'} style={{ fontSize: '0.8rem' }}>
                      {responseStatus} {responseStatus === 200 ? 'OK' : responseStatus === 201 ? 'Created' : responseStatus === 401 ? 'Unauthorized' : 'Not Found'}
                    </strong>
                  </div>
                )}

                {responseJson && (
                  <div style={{ padding: '10px 12px', background: '#030712', borderBottom: '1px solid #1e293b', maxHeight: '140px', overflowY: 'auto' }}>
                    <pre style={{ margin: 0, fontSize: '0.7rem', color: '#a7f3d0', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                      {JSON.stringify(responseJson, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Console output logs */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                  <div style={{ padding: '4px 12px', background: '#090d16', borderBottom: '1px solid #1e293b', color: '#64748b', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Terminal size={12} /> <span>Live Node Console Output</span>
                  </div>
                  <div style={{ flex: 1, padding: '8px 12px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.7rem', display: 'flex', flexDirection: 'column', gap: '4px', background: '#020617' }}>
                    {consoleLogs.length === 0 ? (
                      <div className="console-empty" style={{ color: '#475569', textAlign: 'center', marginTop: '30px' }}>
                        Click "Run Server" above or "Send" an API request to initiate...
                      </div>
                    ) : (
                      consoleLogs.map((log, idx) => {
                        let color = '#94a3b8';
                        if (log.startsWith('[Error]') || log.includes('Error:')) color = '#f87171';
                        else if (log.startsWith('[Database]')) color = '#a855f7';
                        else if (log.startsWith('[System]')) color = '#38bdf8';
                        else if (log.startsWith('[Response]')) color = '#34d399';
                        return (
                          <div key={idx} style={{ color, whiteSpace: 'pre-wrap' }}>
                            {log}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Standard Frontend Iframe Preview */
            <>
              <div className="preview-header">
                <Monitor size={14} /> <span>Live Preview</span>
              </div>
              <div className="iframe-container" style={{ pointerEvents: isDragging ? 'none' : 'auto' }}>
                <iframe
                  srcDoc={srcDoc}
                  title="output"
                  sandbox="allow-scripts"
                  frameBorder="0"
                  width="100%"
                  height="100%"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .editor-container {
          display: flex;
          flex-direction: column;
          height: 600px;
          border: 1px solid var(--app-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #1e1e1e;
          margin: var(--space-4) 0;
          box-shadow: var(--shadow-lg);
        }
        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 16px;
          background: #252526;
          border-bottom: 1px solid #333;
        }
        .tab-group {
          display: flex;
          gap: 4px;
        }
        .tab-btn {
          padding: 6px 16px;
          background: transparent;
          border: none;
          color: #999;
          cursor: pointer;
          font-size: 0.85rem;
          border-radius: var(--radius-sm);
          transition: all 0.2s;
        }
        .tab-btn.active {
          color: white;
          background: #37373d;
        }
        .editor-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .icon-btn {
          background: transparent;
          border: none;
          color: #94A3B8;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .editor-main {
          display: flex;
          flex-direction: row;
          flex: 1;
          min-height: 0;
        }
        .code-panel {
          overflow: hidden;
        }
        .resizer {
          width: 6px;
          background: #333;
          cursor: col-resize;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          z-index: 10;
        }
        .resizer:hover, .resizer.dragging {
          background: var(--primary-cyan);
        }
        .resizer-handle {
          width: 2px;
          height: 24px;
          background: rgba(255,255,255,0.3);
          border-radius: 2px;
        }
        .preview-panel {
          background: white;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .preview-header {
          padding: 6px 12px;
          background: #f1f5f9;
          color: #64748B;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          gap: 6px;
          border-bottom: 1px solid #e2e8f0;
        }
        .iframe-container {
          flex: 1;
          height: 100%;
          min-height: 0;
        }
        @media (max-width: 1024px) {
          .editor-main {
            flex-direction: column;
          }
          .editor-container { height: 850px; }
          .resizer {
            width: 100%;
            height: 6px;
            cursor: row-resize;
          }
          .resizer-handle {
            width: 24px;
            height: 2px;
          }
        }
      `}} />
    </div>
  );
};

export default CodeEditor;
