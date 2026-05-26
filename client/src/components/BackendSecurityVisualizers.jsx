import React, { useState, useEffect } from 'react';
import { 
  Play, RotateCcw, Key, Lock, Terminal, ArrowRight, ShieldCheck,
  Code, Send, Check, X, ShieldAlert, AlertTriangle, FileCode,
  Eye, EyeOff, FileText, Upload, RefreshCw, Layers, Globe
} from 'lucide-react';

/* ==========================================
   1. BcryptEncryptionViz (Day 1)
   ========================================== */
export const BcryptEncryptionViz = () => {
  const [password, setPassword] = useState('secret123');
  const [rounds, setRounds] = useState(10);
  const [salt, setSalt] = useState('');
  const [hash, setHash] = useState('');
  const [latency, setLatency] = useState(0);

  const [comparePassword, setComparePassword] = useState('');
  const [matchResult, setMatchResult] = useState(null);

  const handleHash = () => {
    const start = performance.now();
    
    // Simulate bcrypt work factor delay based on rounds (exponential scale)
    const simulatedDelay = Math.pow(2, rounds - 4) * 2;
    
    setTimeout(() => {
      // Mock salt generation
      const mockSalt = `$2b$${rounds}$${Math.random().toString(36).substring(2, 17)}X9c`;
      // Mock hash generation
      const mockHash = `${mockSalt}dH1o2${Math.random().toString(36).substring(2, 17)}`;
      
      const end = performance.now();
      
      setSalt(mockSalt);
      setHash(mockHash);
      setLatency((end - start + simulatedDelay).toFixed(0));
    }, 100);
  };

  const handleCompare = () => {
    if (!hash) return;
    if (comparePassword === password) {
      setMatchResult(true);
    } else {
      setMatchResult(false);
    }
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <Lock size={16} className="text-cyan" />
        <span>Day 1: Bcrypt Hashing, Salt & Work Factor Calculator</span>
      </div>

      <div className="viz-split-layout">
        {/* Left Panel: Hashing interface */}
        <div className="compare-panel">
          <div className="panel-badge react-badge">Bcrypt Hashing Generator</div>
          <h4>Password Hashing Sandbox</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
            <div className="input-field">
              <label>Plaintext Password:</label>
              <input 
                type="text" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="select-input"
                style={{ width: '100%' }}
              />
            </div>

            <div className="input-field" style={{ marginTop: '6px' }}>
              <label>Salt Rounds (Work Factor: {rounds}):</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="range" 
                  min="4" 
                  max="14" 
                  value={rounds}
                  onChange={e => setRounds(parseInt(e.target.value, 10))}
                  style={{ flex: 1 }}
                />
                <span style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>2^{rounds}</span>
              </div>
            </div>

            <button className="viz-btn cyan-btn" onClick={handleHash} style={{ width: '100%', marginTop: '6px' }}>
              Run bcrypt.hash()
            </button>
          </div>

          {hash && (
            <div className="val-box" style={{ flexDirection: 'column', gap: '4px', marginTop: '12px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Salt: <strong style={{ color: '#a855f7' }}>{salt}</strong></div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>Hash: <strong style={{ color: '#00d1d1' }}>{hash}</strong></div>
              <div style={{ fontSize: '0.65rem', color: '#64748b' }}>CPU Hashing Latency: <strong>{latency} ms</strong></div>
            </div>
          )}
        </div>

        {/* Right Panel: Verification interface */}
        <div className="compare-panel">
          <div className="panel-badge">Bcrypt Verification Console</div>
          <h4>Verify Password Match</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
            <div className="input-field">
              <label>Enter Password to Compare:</label>
              <input 
                type="text" 
                value={comparePassword} 
                onChange={e => setComparePassword(e.target.value)} 
                placeholder="Type password..."
                className="select-input"
                style={{ width: '100%' }}
                disabled={!hash}
              />
            </div>

            <button 
              className="viz-btn" 
              onClick={handleCompare} 
              disabled={!hash}
              style={{ width: '100%', background: '#4f46e5' }}
            >
              Run bcrypt.compare()
            </button>
          </div>

          {matchResult !== null && (
            <div style={{ marginTop: '12px' }}>
              {matchResult ? (
                <div className="alert-success-box" style={{ padding: '8px' }}>
                  <Check size={16} /> <strong>Password Authenticated!</strong> Hashed strings match.
                </div>
              ) : (
                <div className="alert-warning-box" style={{ background: 'rgba(239,68,68,0.06)', borderColor: 'rgba(239,68,68,0.2)', color: '#f87171', padding: '8px' }}>
                  <X size={16} style={{ color: '#f87171' }} /> <strong>Authentication Failed!</strong> Signatures do not match.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


/* ==========================================
   2. JwtSessionsViz (Day 2)
   ========================================== */
export const JwtSessionsViz = () => {
  const [payloadUser, setPayloadUser] = useState('Alex Carter');
  const [payloadRole, setPayloadRole] = useState('mentor');
  const [secretKey, setSecretKey] = useState('wemadeSec123');

  const [jwt, setJwt] = useState({ header: '', payload: '', signature: '' });

  useEffect(() => {
    // Basic base64 mocks to simulate token chunks
    const headerStr = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).replace(/=/g, '');
    const payloadStr = btoa(JSON.stringify({ user: payloadUser, role: payloadRole, exp: 1779212700 })).replace(/=/g, '');
    const signatureStr = btoa(`${headerStr}.${payloadStr}.${secretKey}`).replace(/=/g, '').substring(0, 32);

    setJwt({ header: headerStr, payload: payloadStr, signature: signatureStr });
  }, [payloadUser, payloadRole, secretKey]);

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <Key size={16} className="text-cyan" />
        <span>Day 2: JSON Web Token (JWT) Anatomy & Cryptography</span>
      </div>

      <div className="viz-split-layout">
        {/* Left Side: Payload input */}
        <div className="compare-panel">
          <div className="panel-badge react-badge">JWT Sign Parameters</div>
          <h4>Token Payload Parameters</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            <div className="input-field">
              <label>Payload username:</label>
              <input type="text" value={payloadUser} onChange={e => setPayloadUser(e.target.value)} className="select-input" style={{ width: '100%' }} />
            </div>

            <div className="input-field">
              <label>Payload role:</label>
              <input type="text" value={payloadRole} onChange={e => setPayloadRole(e.target.value)} className="select-input" style={{ width: '100%' }} />
            </div>

            <div className="input-field">
              <label>HMAC Secret Key (Signature key):</label>
              <input type="text" value={secretKey} onChange={e => setSecretKey(e.target.value)} className="select-input" style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        {/* Right Side: Token structure breakdown */}
        <div className="compare-panel" style={{ background: '#090d16' }}>
          <div className="panel-badge">Decoded Token Breakdown</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {/* Header Section */}
            <div style={{ borderLeft: '3px solid #ef4444', paddingLeft: '8px' }}>
              <span style={{ fontSize: '0.65rem', color: '#ef4444', fontWeight: 'bold' }}>HEADER (Algorithm & Type)</span>
              <pre style={{ margin: 0, fontSize: '0.65rem', color: '#cbd5e1', fontFamily: 'monospace' }}>
{`{
  "alg": "HS256",
  "typ": "JWT"
}`}
              </pre>
            </div>

            {/* Payload Section */}
            <div style={{ borderLeft: '3px solid #a855f7', paddingLeft: '8px' }}>
              <span style={{ fontSize: '0.65rem', color: '#a855f7', fontWeight: 'bold' }}>PAYLOAD (Claims / Data)</span>
              <pre style={{ margin: 0, fontSize: '0.65rem', color: '#cbd5e1', fontFamily: 'monospace' }}>
{`{
  "user": "${payloadUser}",
  "role": "${payloadRole}",
  "exp": 1779212700
}`}
              </pre>
            </div>

            {/* Signature Section */}
            <div style={{ borderLeft: '3px solid #00d1d1', paddingLeft: '8px' }}>
              <span style={{ fontSize: '0.65rem', color: '#00d1d1', fontWeight: 'bold' }}>SIGNATURE (Verified key)</span>
              <div style={{ fontSize: '0.65rem', color: '#64748b', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                HMACSHA256( base64(Header) + "." + base64(Payload), "{secretKey}" )
              </div>
            </div>
          </div>

          {/* Encoded JWT string display */}
          <div style={{ marginTop: '16px', borderTop: '1px dashed #334155', paddingTop: '10px' }}>
            <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginBottom: '4px' }}>ENCODED TOKEN STRING:</div>
            <div style={{ fontSize: '0.65rem', fontFamily: 'monospace', wordBreak: 'break-all', lineHeight: '1.4' }}>
              <span style={{ color: '#ef4444' }}>{jwt.header}</span>.
              <span style={{ color: '#a855f7' }}>{jwt.payload}</span>.
              <span style={{ color: '#00d1d1' }}>{jwt.signature}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


/* ==========================================
   3. ProtectedRoutesViz (Day 3)
   ========================================== */
export const ProtectedRoutesViz = () => {
  const [tokenType, setTokenType] = useState('none');
  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('/api/protected/dashboard');

  const handleFetch = () => {
    const newLogs = [];
    newLogs.push(`Incoming Request: GET ${activeTab}`);

    let headers = {};
    if (tokenType === 'valid') {
      headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
      newLogs.push('Headers: { Authorization: "Bearer eyJhbGc..." }');
    } else if (tokenType === 'invalid') {
      headers['Authorization'] = 'Bearer invalidToken_SignatureFailed';
      newLogs.push('Headers: { Authorization: "Bearer invalidTok..." }');
    } else {
      newLogs.push('Headers: {} (No Authorization header)');
    }

    if (activeTab === '/api/public/products') {
      newLogs.push('[Router] Accessing public route dashboard. Skipping auth guard.');
      newLogs.push('Status: 200 OK');
      newLogs.push('Payload: [ { id: 101, title: "Public Product" } ]');
    } else {
      newLogs.push('[Middleware] Accessing protected route. Executing AuthGuard middleware...');
      if (tokenType === 'none') {
        newLogs.push('[Middleware] Access Denied: Authorization header missing.');
        newLogs.push('Status: 401 Unauthorized');
        newLogs.push('Payload: { error: "Access denied. Token missing." }');
      } else if (tokenType === 'invalid') {
        newLogs.push('[Middleware] Access Denied: jwt.verify() threw JsonWebTokenError.');
        newLogs.push('Status: 403 Forbidden');
        newLogs.push('Payload: { error: "Access denied. Invalid signature." }');
      } else {
        newLogs.push('[Middleware] Access Granted: jwt.verify() verified user ID 101.');
        newLogs.push('[Controller] Fetching account details for user ID 101...');
        newLogs.push('Status: 200 OK');
        newLogs.push('Payload: { message: "Welcome to dashboard", secretKey: "MERN_PRO" }');
      }
    }

    setLogs(newLogs);
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <ShieldCheck size={16} className="text-cyan" />
        <span>Day 3: Protected Routes & AuthGuard Middleware sandbox</span>
      </div>

      <div className="viz-split-layout">
        {/* Left Side: Route and token controls */}
        <div className="compare-panel">
          <div className="panel-badge react-badge">Route Authorization Shield</div>
          <h4>Request Route Options</h4>
          
          <div className="control-group" style={{ marginTop: '10px' }}>
            <label>1. Select Route Endpoint:</label>
            <div className="filter-group" style={{ display: 'flex', gap: '6px' }}>
              <button className={activeTab === '/api/public/products' ? 'active' : ''} onClick={() => setActiveTab('/api/public/products')} style={{ flex: 1, fontSize: '0.7rem' }}>
                /api/public/products
              </button>
              <button className={activeTab === '/api/protected/dashboard' ? 'active' : ''} onClick={() => setActiveTab('/api/protected/dashboard')} style={{ flex: 1, fontSize: '0.7rem' }}>
                /api/protected/dashboard
              </button>
            </div>
          </div>

          <div className="control-group" style={{ marginTop: '12px' }}>
            <label>2. Provide Authorization Header:</label>
            <select value={tokenType} onChange={e => setTokenType(e.target.value)} className="select-input">
              <option value="none">No Authorization Header (Unauthenticated)</option>
              <option value="invalid">Invalid Authorization Header (Bad Signature)</option>
              <option value="valid">Valid Authorization Header (Bearer JWT token)</option>
            </select>
          </div>

          <button className="viz-btn cyan-btn" onClick={handleFetch} style={{ width: '100%', marginTop: '16px' }}>
            Send Client API Request
          </button>
        </div>

        {/* Right Side: Execution trace logs */}
        <div className="lifecycle-logs-panel">
          <div className="console-header">
            <Terminal size={14} /> <span>AuthGuard Middleware trace console</span>
          </div>
          <div className="console-body" style={{ minHeight: '230px', background: '#020617', padding: '12px', overflowY: 'auto' }}>
            {logs.length === 0 ? (
              <div className="console-empty">Click "Send Client API Request" to trace auth validation hooks...</div>
            ) : (
              logs.map((log, i) => {
                let color = '#cbd5e1';
                if (log.startsWith('Incoming Request')) color = '#00d1d1';
                else if (log.startsWith('[Middleware]')) color = '#a855f7';
                else if (log.includes('Denied') || log.includes('Unauthorized') || log.includes('Forbidden')) color = '#f87171';
                else if (log.includes('200 OK') || log.includes('Access Granted')) color = '#34d399';
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
   4. BackendErrorHandlingViz (Day 4)
   ========================================== */
export const BackendErrorHandlingViz = () => {
  const [crashType, setCrashType] = useState('syntax');
  const [logs, setLogs] = useState([]);

  const handleCrash = () => {
    const newLogs = [];
    newLogs.push('GET /api/users HTTP/1.1');
    
    if (crashType === 'syntax') {
      newLogs.push('[Server] ReferenceError: dbClient is not defined');
      newLogs.push('=== Express Crash Handler Routing ===');
      newLogs.push('Checking for custom error handling middleware: app.use((err, req, res, next) => { ... })');
      newLogs.push('[Middleware] Intercepted Error: ReferenceError in createUser controller.');
      newLogs.push('Status: 500 Internal Server Error');
      newLogs.push('Response sent: { error: "Internal Server Error. Please contact support." }');
    } else if (crashType === 'db') {
      newLogs.push('[Database] MongooseError: Connection closed on port 27017.');
      newLogs.push('[Middleware] Intercepted Database Error.');
      newLogs.push('Status: 503 Service Unavailable');
      newLogs.push('Response sent: { error: "Database unavailable. Retrying query..." }');
    } else {
      newLogs.push('[Server] Mongoose ValidationError: Email is required.');
      newLogs.push('[Middleware] Intercepted Mongoose ValidationError.');
      newLogs.push('Status: 400 Bad Request');
      newLogs.push('Response sent: { error: "Validation failed: Email field must be filled." }');
    }

    setLogs(newLogs);
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <ShieldAlert size={16} className="text-cyan" />
        <span>Day 4: Backend Centralized Error Handling Middleware</span>
      </div>

      <div className="viz-split-layout">
        {/* Left side controls */}
        <div className="compare-panel">
          <div className="panel-badge react-badge">Central Error Middleware</div>
          <h4>Crash Trigger Options</h4>
          <p className="panel-desc">Express lets you catch all server exceptions globally using a centralized error handler, preventing database credentials leaks.</p>

          <div className="control-group" style={{ marginTop: '12px' }}>
            <label>Select Exception to Trigger:</label>
            <select value={crashType} onChange={e => setCrashType(e.target.value)} className="select-input">
              <option value="syntax">ReferenceError: dbClient not defined</option>
              <option value="db">MongooseError: Connection lost</option>
              <option value="validation">ValidationError: Missing required email field</option>
            </select>
          </div>

          <button className="viz-btn cyan-btn" onClick={handleCrash} style={{ width: '100%', marginTop: '16px' }}>
            Simulate Server Exception
          </button>
        </div>

        {/* Right side logs */}
        <div className="lifecycle-logs-panel">
          <div className="console-header">
            <Terminal size={14} /> <span>Express Error-Handling Tracer</span>
          </div>
          <div className="console-body" style={{ minHeight: '220px', background: '#020617', padding: '12px', overflowY: 'auto' }}>
            {logs.length === 0 ? (
              <div className="console-empty">Click "Simulate Server Exception" to trace error middleware catcher...</div>
            ) : (
              logs.map((log, i) => {
                let color = '#cbd5e1';
                if (log.startsWith('GET')) color = '#00d1d1';
                else if (log.includes('ReferenceError') || log.includes('MongooseError') || log.includes('ValidationError')) color = '#f87171';
                else if (log.includes('Status:')) color = '#ef4444';
                else if (log.includes('Response sent:')) color = '#34d399';
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
   5. FileUploadEnvViz (Day 5)
   ========================================== */
export const FileUploadEnvViz = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [logs, setLogs] = useState([]);

  // Dotenv state
  const [showSecret, setShowSecret] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadStatus('selected');
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setUploadStatus('uploading');
    const newLogs = ['POST /api/profile/upload HTTP/1.1', 'Content-Type: multipart/form-data'];
    
    setTimeout(() => {
      newLogs.push('[Multer] Intercepting multipart stream...');
      newLogs.push(`[Multer] Parsing file: ${selectedFile.name}`);
      newLogs.push(`[Multer] Disk Storage destination: uploads/`);
      newLogs.push(`[Multer] Renaming file: ${Date.now()}_profile.jpg`);
      newLogs.push('[Controller] File upload completed successfully. Updating URL key in user schema.');
      newLogs.push('Status: 200 OK');
      
      setLogs(newLogs);
      setUploadStatus('success');
    }, 1200);

    setLogs(newLogs);
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <Upload size={16} className="text-cyan" />
        <span>Day 5: Multer File Upload & Dotenv Variables Scoping</span>
      </div>

      <div className="viz-control-bar" style={{ justifyContent: 'center' }}>
        <div className="filter-group">
          <button className={activeTab === 'upload' ? 'active' : ''} onClick={() => setActiveTab('upload')}>
            Multer File Upload Simulator
          </button>
          <button className={activeTab === 'dotenv' ? 'active' : ''} onClick={() => setActiveTab('dotenv')}>
            Dotenv Secrets Scoping
          </button>
        </div>
      </div>

      <div className="viz-split-layout">
        {activeTab === 'upload' ? (
          <>
            {/* Left side: Upload form */}
            <div className="compare-panel">
              <div className="panel-badge react-badge">Multer Multipart Parser</div>
              <h4>Mock Profile Image Upload</h4>
              <p className="panel-desc">Multer parses multipart form-data requests, saving file streams to the server file system or memory buffers.</p>

              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange} 
                  id="file-input"
                  style={{ display: 'none' }}
                />
                <label 
                  htmlFor="file-input" 
                  style={{ border: '2px dashed #334155', borderRadius: '8px', padding: '24px', textAlign: 'center', cursor: 'pointer', display: 'block' }}
                >
                  {selectedFile ? selectedFile.name : 'Select or drop mockup image...'}
                </label>

                <button 
                  className="viz-btn cyan-btn" 
                  onClick={handleUpload}
                  disabled={!selectedFile || uploadStatus === 'uploading'}
                  style={{ width: '100%' }}
                >
                  {uploadStatus === 'uploading' ? 'Uploading file stream...' : 'Upload Image'}
                </button>
              </div>
            </div>

            {/* Right side: Upload logs */}
            <div className="lifecycle-logs-panel">
              <div className="console-header">
                <Terminal size={14} /> <span>Multer Server Execution Log</span>
              </div>
              <div className="console-body" style={{ minHeight: '180px', background: '#020617', padding: '12px', overflowY: 'auto' }}>
                {logs.length === 0 ? (
                  <div className="console-empty">Select a file and click upload to trace Multer filesystem handlers...</div>
                ) : (
                  logs.map((log, i) => {
                    let color = '#cbd5e1';
                    if (log.startsWith('POST')) color = '#00d1d1';
                    else if (log.startsWith('[Multer]')) color = '#a855f7';
                    else if (log.includes('success') || log.includes('200 OK')) color = '#34d399';
                    return <div key={i} style={{ color, fontFamily: 'monospace', fontSize: '0.7rem', marginBottom: '4px' }}>{log}</div>;
                  })
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Left side: Dotenv explanation */}
            <div className="compare-panel">
              <div className="panel-badge react-badge">Environment Variables</div>
              <h4>Why use .env files?</h4>
              <p className="panel-desc">Dotenv loads configuration details from a `.env` file into Node's memory (`process.env`), keeping API keys out of your Git history.</p>

              <div style={{ marginTop: '16px', background: '#0f172a', border: '1px solid #1e293b', padding: '10px', borderRadius: '8px' }}>
                <pre style={{ margin: 0, fontSize: '0.65rem', fontFamily: 'monospace' }}>
{`// config/db.js
const connectDB = async () => {
  // Safe: MONGO_URI is loaded from memory
  await mongoose.connect(process.env.MONGO_URI);
};`}
                </pre>
              </div>
            </div>

            {/* Right side: .env file layout with show/hide secrets toggle */}
            <div className="compare-panel" style={{ background: '#090d16' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '6px', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>FILE SYSTEM: .env</span>
                <button 
                  onClick={() => setShowSecret(prev => !prev)}
                  style={{ background: 'transparent', border: 'none', color: '#00d1d1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem' }}
                >
                  {showSecret ? <EyeOff size={12} /> : <Eye size={12} />} {showSecret ? 'Hide keys' : 'Reveal keys'}
                </button>
              </div>

              <pre style={{ margin: 0, fontSize: '0.7rem', color: '#e2e8f0', fontFamily: 'monospace', lineHeight: '1.6' }}>
{`PORT=5000
MONGO_URI=${showSecret ? 'mongodb+srv://admin:mySecretPass123@wemade.cluster.net/production' : '**************************************************************'}
JWT_SECRET=${showSecret ? 'superSecretProductionJWTKeyWord2026' : '**********************************'}`}
              </pre>

              <div className="alert-warning-box" style={{ marginTop: '16px', fontSize: '0.65rem', padding: '6px' }}>
                <AlertTriangle size={12} style={{ marginRight: '4px' }} />
                <span><strong>Security Alert:</strong> Always add <code>.env</code> to your <code>.gitignore</code>! Committing environment files to public repositories leaks database credentials instantly.</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};


/* ==========================================
   6. MernIntegrationViz (Day 6)
   ========================================== */
export const MernIntegrationViz = () => {
  const [corsActive, setCorsActive] = useState(false);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = () => {
    setIsLoading(true);
    const newLogs = [];

    newLogs.push('Client (localhost:3000) requests resources from API (localhost:5000)...');
    newLogs.push('Browser sends CORS preflight OPTIONS request:');
    newLogs.push('   Origin: http://localhost:3000');
    newLogs.push('   Access-Control-Request-Method: GET');

    setTimeout(() => {
      if (!corsActive) {
        newLogs.push('[CORS Guard] Access Blocked: Origin http://localhost:3000 is not allowed by API CORS policies.');
        newLogs.push('[Browser Error] CORS request failed. No Access-Control-Allow-Origin header is present.');
        newLogs.push('[Console] FetchError: Network request blocked by CORS policy.');
      } else {
        newLogs.push('[CORS Guard] Access Allowed: preflight checks passed.');
        newLogs.push('[Server] Responding with CORS headers:');
        newLogs.push('   Access-Control-Allow-Origin: http://localhost:3000');
        newLogs.push('   Access-Control-Allow-Credentials: true');
        newLogs.push('[Client] Fetch Request completed successfully: status 200 OK.');
      }
      setLogs(newLogs);
      setIsLoading(false);
    }, 1200);

    setLogs(newLogs);
  };

  return (
    <div className="react-viz-container">
      <div className="viz-header">
        <Globe size={16} className="text-cyan" />
        <span>Day 6: MERN Integration CORS (Cross-Origin Resource Sharing) Handshake</span>
      </div>

      <div className="viz-split-layout">
        {/* Left Side: CORS Controls */}
        <div className="compare-panel">
          <div className="panel-badge react-badge">CORS Sandbox Policy</div>
          <h4>CORS Sandbox Configurations</h4>
          <p className="panel-desc">By default, browsers block frontends (running on port 3000) from querying backends (running on port 5000) unless CORS header permissions are configured.</p>

          <div className="control-group checkbox" style={{ margin: '16px 0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input 
                type="checkbox" 
                checked={corsActive} 
                onChange={e => setCorsActive(e.target.checked)} 
              />
              Enable CORS middleware in Express server: <code>app.use(cors())</code>
            </label>
          </div>

          <button 
            className="viz-btn cyan-btn" 
            onClick={handleFetch} 
            disabled={isLoading}
            style={{ width: '100%' }}
          >
            {isLoading ? 'Triggering Fetch request...' : 'Fetch backend data'}
          </button>
        </div>

        {/* Right Side: Network trace logs */}
        <div className="lifecycle-logs-panel">
          <div className="console-header">
            <Terminal size={14} /> <span>Browser Developer Console Logs</span>
          </div>
          <div className="console-body" style={{ minHeight: '220px', background: '#020617', padding: '12px', overflowY: 'auto' }}>
            {logs.length === 0 ? (
              <div className="console-empty">Click "Fetch backend data" to trace cross-origin handshakes...</div>
            ) : (
              logs.map((log, i) => {
                let color = '#cbd5e1';
                if (log.startsWith('Client')) color = '#00d1d1';
                else if (log.includes('Blocked') || log.includes('Browser Error') || log.includes('FetchError')) color = '#f87171';
                else if (log.includes('Allowed') || log.includes('completed successfully')) color = '#34d399';
                return <div key={i} style={{ color, fontFamily: 'monospace', fontSize: '0.7rem', marginBottom: '4px' }}>{log}</div>;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
