import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, Server, Database, Globe, Lock, Unlock, ArrowRight, Play, 
  RefreshCw, Terminal, Eye, Code, FileText, CheckCircle2, AlertCircle, 
  Sparkles, HelpCircle, Layers, ZoomIn, Volume2, ShieldCheck, ChevronRight,
  Smartphone, FileCode, Heading, HelpCircle as HelpIcon, FileEdit
} from 'lucide-react';

// ============================================================================
// 1. THE FUNDAMENTALS OF WEB DEVELOPMENT INTERACTIVE VISUALIZER
// ============================================================================
export const WebFundamentalsInteractive = () => {
  const [protocol, setProtocol] = useState('https'); // 'http' | 'https'
  const [dnsResolved, setDnsResolved] = useState(false);
  const [animState, setAnimState] = useState('idle'); // 'idle' | 'dns' | 'request' | 'server' | 'database' | 'response' | 'done'
  const [logs, setLogs] = useState([]);

  const addLog = (text, type = 'info') => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString().split(' ')[0], text, type }]);
  };

  const startSimulation = async () => {
    setLogs([]);
    setAnimState('dns');
    addLog('Client: Initiating connection to "wemadelogix.com"...');
    
    // Step 1: DNS Resolution
    await new Promise(r => setTimeout(r, 1200));
    setDnsResolved(true);
    addLog('DNS Server: Looked up "wemadelogix.com" -> Resolved to static IP: 104.244.42.1', 'success');
    
    // Step 2: Connection / Request
    setAnimState('request');
    addLog(`Client: Packing HTTP GET Request headers (Security: ${protocol.toUpperCase()})...`);
    if (protocol === 'https') {
      addLog('Client: Establishing TLS Handshake. Exchanging cryptographic keys...', 'secure');
    } else {
      addLog('Client: WARNING - Sending plain unencrypted text request!', 'warning');
    }

    // Step 3: Server Parsing
    await new Promise(r => setTimeout(r, 1600));
    setAnimState('server');
    addLog('Server (104.244.42.1): Received request packet. Parsing GET routing variables...');
    
    // Step 4: Database Query
    await new Promise(r => setTimeout(r, 1400));
    setAnimState('database');
    addLog('Server: Querying MongoDB Database for requested page content nodes...');
    
    // Step 5: Response
    await new Promise(r => setTimeout(r, 1400));
    setAnimState('response');
    if (protocol === 'https') {
      addLog('Server: Encrypted payload with Symmetric Key. Dispatching ciphertext...', 'secure');
    } else {
      addLog('Server: Dispatching plain-text HTML stream...', 'warning');
    }

    // Done
    await new Promise(r => setTimeout(r, 1400));
    setAnimState('done');
    addLog('Client: Payload received. Compiling DOM Tree. RENDER SUCCESS!', 'success');
  };

  const resetSim = () => {
    setAnimState('idle');
    setDnsResolved(false);
    setLogs([]);
  };

  return (
    <div className="day1-viz-card">
      <div className="viz-header-row">
        <span className="viz-badge cyan">Interactive Sandbox</span>
        <h3>Request-Response & Protocol Pipeline</h3>
      </div>
      <p className="viz-subtitle">See how clients, DNS servers, web servers, and databases communicate securely across the web.</p>

      {/* Connection Mode Selection */}
      <div className="mode-toggle-bar">
        <button 
          className={`mode-btn ${protocol === 'https' ? 'active https' : ''}`}
          onClick={() => { setProtocol('https'); resetSim(); }}
        >
          <Lock size={14} /> HTTPS (Secure SSL/TLS)
        </button>
        <button 
          className={`mode-btn ${protocol === 'http' ? 'active http' : ''}`}
          onClick={() => { setProtocol('http'); resetSim(); }}
        >
          <Unlock size={14} /> HTTP (Insecure Plaintext)
        </button>
      </div>

      <div className="network-diagram-container">
        {/* Pipeline Nodes */}
        <div className="nodes-rail">
          {/* Client node */}
          <div className={`node-item client ${animState === 'request' || animState === 'done' ? 'pulse-blue' : ''}`}>
            <div className="node-icon-wrapper">
              <Monitor size={24} />
            </div>
            <span className="node-name">Browser (Client)</span>
            <span className="node-ip">IP: 192.168.1.15</span>
          </div>

          {/* DNS Node */}
          <div className={`node-item dns ${animState === 'dns' ? 'pulse-yellow' : ''} ${dnsResolved ? 'resolved' : ''}`}>
            <div className="node-icon-wrapper">
              <Globe size={20} />
            </div>
            <span className="node-name">DNS Resolver</span>
            <span className="node-ip">IP: 8.8.8.8</span>
          </div>

          {/* Server Node */}
          <div className={`node-item server ${animState === 'server' || animState === 'response' ? 'pulse-purple' : ''}`}>
            <div className="node-icon-wrapper">
              <Server size={24} />
            </div>
            <span className="node-name">Web Server</span>
            <span className="node-ip">IP: 104.244.42.1</span>
          </div>

          {/* DB Node */}
          <div className={`node-item db ${animState === 'database' ? 'pulse-green' : ''}`}>
            <div className="node-icon-wrapper">
              <Database size={24} />
            </div>
            <span className="node-name">MongoDB Atlas</span>
            <span className="node-ip">Cluster Port: 27017</span>
          </div>
        </div>

        {/* Laser paths & animations */}
        <div className="laser-grid-overlay">
          {animState === 'dns' && (
            <motion.div 
              initial={{ left: '12%', top: '35%' }}
              animate={{ left: '38%', top: '35%' }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="pulse-laser dns-laser"
            />
          )}
          {animState === 'request' && (
            <motion.div 
              initial={{ left: '12%', top: '35%' }}
              animate={{ left: '62%', top: '35%' }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className={`pulse-laser request-laser ${protocol}`}
            >
              {protocol === 'https' ? <Lock size={10} color="#a855f7" /> : <Unlock size={10} color="#f87171" />}
            </motion.div>
          )}
          {animState === 'database' && (
            <motion.div 
              initial={{ left: '62%', top: '35%' }}
              animate={{ left: '88%', top: '35%' }}
              transition={{ duration: 1, repeat: Infinity }}
              className="pulse-laser db-laser"
            />
          )}
          {animState === 'response' && (
            <motion.div 
              initial={{ left: '62%', top: '35%' }}
              animate={{ left: '12%', top: '35%' }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className={`pulse-laser response-laser ${protocol}`}
            >
              {protocol === 'https' ? <Lock size={10} color="#a855f7" /> : <Unlock size={10} color="#f87171" />}
            </motion.div>
          )}
        </div>
      </div>

      <div className="interactive-console-grid">
        <div className="console-panel">
          <div className="console-header-bar">
            <Terminal size={14} />
            <span>Interactive Terminal Tracing</span>
          </div>
          <div className="console-logs-screen">
            {logs.length === 0 ? (
              <div className="empty-logs">
                <Play size={16} />
                <span>Click "Launch Fetch Pipeline" to watch TCP/IP packets exchange live!</span>
              </div>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className={`log-line ${log.type}`}>
                  <span className="log-time">[{log.time}]</span>
                  <span className="log-text">{log.text}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="explanation-bubble card-3d">
          <h4>Protocol Sandbox Insights</h4>
          <p>
            {animState === 'idle' && 'Select HTTP or HTTPS. HTTPS secures the pipeline by scrambling text payload elements using TLS keys.'}
            {animState === 'dns' && 'The browser queries the Domain Name System to look up the friendly domain string and match it to a numerical IP address.'}
            {animState === 'request' && protocol === 'https' && 'Secure handshake completed! Request headers and body parameters are cryptographically secured inside ciphertext envelopes.'}
            {animState === 'request' && protocol === 'http' && 'WARNING: A network sniffer on the route can intercept your plain text packets, capturing passwords and form elements easily!'}
            {animState === 'server' && 'The server processes headers, matches routes, and determines if it needs static HTML structures or database queries.'}
            {animState === 'database' && 'MongoDB reads collections from server hard disks and returns clean document streams back to the parent application.'}
            {animState === 'response' && 'The server compiles documents back into network envelopes and dispatches it over TCP packets to the browser.'}
            {animState === 'done' && 'DOM Tree compiling finished. CSS and scripts loaded correctly. Your visual layout is fully interactive.'}
          </p>
          <button 
            className="action-btn-trigger" 
            onClick={animState === 'done' ? resetSim : startSimulation}
            disabled={animState !== 'idle' && animState !== 'done'}
          >
            {animState === 'done' ? <RefreshCw size={14} /> : <Play size={14} />}
            {animState === 'done' ? 'Reset Simulation' : 'Launch Fetch Pipeline'}
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .day1-viz-card { background: #0f172a; border: 1px solid #1e293b; border-radius: 20px; padding: 24px; color: white; margin-top: 15px; }
        .viz-header-row { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
        .viz-badge { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; padding: 4px 10px; border-radius: 6px; letter-spacing: 0.5px; }
        .viz-badge.cyan { background: rgba(6, 182, 212, 0.1); color: #22d3ee; border: 1px solid rgba(6, 182, 212, 0.2); }
        .viz-badge.orange { background: rgba(249, 115, 22, 0.1); color: #fb923c; border: 1px solid rgba(249, 115, 22, 0.2); }
        .viz-badge.purple { background: rgba(168, 85, 247, 0.1); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.2); }
        .viz-badge.green { background: rgba(34, 197, 94, 0.1); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.2); }
        .viz-subtitle { font-size: 0.85rem; color: #94a3b8; margin: 0 0 20px 0; }
        .mode-toggle-bar { display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 1px solid #1e293b; padding-bottom: 16px; }
        .mode-btn { background: #1e293b; color: #94a3b8; border: 1px solid #334155; padding: 8px 16px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; gap: 6px; font-weight: 600; font-size: 0.85rem; transition: all 0.3s; }
        .mode-btn.active.https { background: rgba(168, 85, 247, 0.15); color: #c084fc; border-color: #a855f7; }
        .mode-btn.active.http { background: rgba(248, 113, 113, 0.15); color: #f87171; border-color: #ef4444; }
        
        .network-diagram-container { position: relative; padding: 20px 10px; background: rgba(0,0,0,0.2); border-radius: 12px; border: 1px solid #1e293b; margin-bottom: 24px; overflow: hidden; }
        .nodes-rail { display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 2; }
        .node-item { display: flex; flex-direction: column; align-items: center; width: 110px; text-align: center; }
        .node-icon-wrapper { width: 50px; height: 50px; background: #1e293b; border: 2px solid #334155; border-radius: 14px; display: flex; align-items: center; justify-content: center; color: #94a3b8; margin-bottom: 8px; transition: all 0.3s; }
        .node-name { font-size: 0.8rem; font-weight: 700; color: #f1f5f9; }
        .node-ip { font-size: 0.65rem; color: #64748b; font-family: monospace; margin-top: 2px; }
        
        /* Pulses */
        .pulse-blue .node-icon-wrapper { border-color: #3b82f6; color: #3b82f6; box-shadow: 0 0 15px rgba(59, 130, 246, 0.3); }
        .pulse-yellow .node-icon-wrapper { border-color: #eab308; color: #eab308; box-shadow: 0 0 15px rgba(234, 179, 8, 0.3); }
        .pulse-purple .node-icon-wrapper { border-color: #a855f7; color: #a855f7; box-shadow: 0 0 15px rgba(168, 85, 247, 0.3); }
        .pulse-green .node-icon-wrapper { border-color: #22c55e; color: #22c55e; box-shadow: 0 0 15px rgba(34, 197, 94, 0.3); }
        .node-item.resolved .node-icon-wrapper { border-color: #10b981; color: #10b981; }

        /* Lasers */
        .laser-grid-overlay { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
        .pulse-laser { position: absolute; width: 24px; height: 24px; border-radius: 50%; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; }
        .dns-laser { background: rgba(234, 179, 8, 0.2); border: 1px solid #eab308; box-shadow: 0 0 10px #eab308; }
        .request-laser.https { background: rgba(168, 85, 247, 0.2); border: 1px solid #a855f7; box-shadow: 0 0 10px #a855f7; }
        .request-laser.http { background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; box-shadow: 0 0 10px #ef4444; }
        .db-laser { background: rgba(34, 197, 94, 0.2); border: 1px solid #22c55e; box-shadow: 0 0 10px #22c55e; }
        .response-laser.https { background: rgba(168, 85, 247, 0.2); border: 1px solid #a855f7; box-shadow: 0 0 10px #a855f7; }
        .response-laser.http { background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; box-shadow: 0 0 10px #ef4444; }

        .interactive-console-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; }
        .console-panel { background: #000; border-radius: 12px; border: 1px solid #1e293b; overflow: hidden; display: flex; flex-direction: column; height: 220px; }
        .console-header-bar { background: #1e293b; padding: 8px 12px; display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: #94a3b8; font-family: monospace; border-bottom: 1px solid #334155; }
        .console-logs-screen { padding: 12px; overflow-y: auto; flex: 1; font-family: monospace; font-size: 0.75rem; display: flex; flex-direction: column; gap: 6px; }
        .empty-logs { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #64748b; text-align: center; gap: 8px; font-family: system-ui; }
        
        .log-line { display: flex; gap: 8px; line-height: 1.4; }
        .log-time { color: #64748b; }
        .log-line.info { color: #e2e8f0; }
        .log-line.success { color: #4ade80; }
        .log-line.warning { color: #f87171; }
        .log-line.secure { color: #c084fc; }

        .explanation-bubble { background: #1e293b; border: 1px solid #334155; padding: 20px; border-radius: 12px; display: flex; flex-direction: column; justify-content: space-between; }
        .explanation-bubble h4 { margin: 0 0 8px 0; font-size: 0.95rem; color: #22d3ee; }
        .explanation-bubble p { margin: 0 0 16px 0; font-size: 0.8rem; color: #cbd5e1; line-height: 1.5; }
        .action-btn-trigger { background: var(--brand-gradient, linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)); border: none; color: white; padding: 10px 20px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 700; font-size: 0.85rem; box-shadow: 0 4px 12px rgba(6, 182, 212, 0.2); }
        .action-btn-trigger:disabled { opacity: 0.5; cursor: not-allowed; }
        
        @media(max-width: 768px) {
          .interactive-console-grid { grid-template-columns: 1fr; }
          .node-item { width: 70px; }
          .node-name { font-size: 0.65rem; }
          .node-ip { display: none; }
        }
      `}} />
    </div>
  );
};

// ============================================================================
// 2. STRUCTURE (DOM TREE & NESTING RULES) VISUALIZER
// ============================================================================
export const HTMLStructureInteractive = () => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState('body');

  const nodesInfo = {
    html: {
      tag: '<html>',
      name: 'Root Node',
      desc: 'The absolute top-level ancestor element of every HTML document. It wraps all page contents.',
      nesting: 'Can only contain one <head> followed immediately by one <body>.',
      boxModel: 'Block Element (Defines root viewport coordinate system)'
    },
    head: {
      tag: '<head>',
      name: 'Brain / Metadata Container',
      desc: 'Hosts machine-readable parameters. It keeps structural styles, character encodings, titles, and SEO keywords.',
      nesting: 'Must reside inside <html>. Invisible to users.',
      boxModel: 'Non-rendering element (Zero dimensions on page)'
    },
    body: {
      tag: '<body>',
      name: 'Visible Content Canvas',
      desc: 'The visual housing frame. Everything placed here renders directly on screen for the reader.',
      nesting: 'Can contain headers, blocks, sections, text nodes, and scripts.',
      boxModel: 'Block Element (Covers 100% viewport width by default)'
    },
    header: {
      tag: '<header>',
      name: 'Semantic Page Header',
      desc: 'Defines introductory contents, page title anchors, navigation panels, or branding logos.',
      nesting: 'Placed inside <body>. Cannot be nested inside footer or another header.',
      boxModel: 'Block Element (Stacks vertically, breaks line before/after)'
    },
    h1: {
      tag: '<h1>',
      name: 'Primary Title Anchor',
      desc: 'The core heading. Vital for organic search crawlers to index document topic.',
      nesting: 'Must have written content inside. Nesting other blocks inside headings is invalid!',
      boxModel: 'Block Element (Bold, high default margins)'
    },
    main: {
      tag: '<main>',
      name: 'Primary Content Frame',
      desc: 'Contains the primary core payload of the document. Helps screen readers skip straight to page contents.',
      nesting: 'Must be a unique node in the document. Cannot contain sidebars or global navigation.',
      boxModel: 'Block Element (Spans structural body bounds)'
    },
    section: {
      tag: '<section>',
      name: 'Document Subject Section',
      desc: 'Represents a standalone section of a page that shares a single topic.',
      nesting: 'Should ideally begin with a heading element (h2-h6) to describe the section.',
      boxModel: 'Block Element (Creates visual block stacking)'
    },
    p: {
      tag: '<p>',
      name: 'Text Paragraph Box',
      desc: 'Wraps continuous copy sentences. Automatically introduces vertical margins to separate text blocks.',
      nesting: 'Can contain text strings, links, images, and visual highlights. Cannot contain block-level divs!',
      boxModel: 'Block Element (Auto wraps text to parent bounds)'
    },
    a: {
      tag: '<a>',
      name: 'HyperText Link (Anchor)',
      desc: 'The essential hyperlink tag linking the page to another server or file address using the "href" attribute.',
      nesting: 'Can contain inline text, formatting tags, or images. Can be clicked to navigate.',
      boxModel: 'Inline Element (Does NOT start a new line. Sits side-by-side with text)'
    }
  };

  const handleNodeSelect = (nodeId) => {
    setSelectedNode(nodeId);
  };

  return (
    <div className="day1-viz-card">
      <div className="viz-header-row">
        <span className="viz-badge orange">Nesting & Nesting Rules</span>
        <h3>DOM Hierarchy outliner & Layout Sandbox</h3>
      </div>
      <p className="viz-subtitle">Hover or click elements in the DOM structural tree to see how block and inline layouts render inside the browser canvas.</p>

      <div className="structure-workbench-grid">
        {/* DOM Outliner Tree */}
        <div className="tree-explorer-panel">
          <h4 className="panel-title-label"><Layers size={14} /> DOM Node Hierarchy</h4>
          
          <div className="tree-scroller">
            <div 
              className={`tree-node root-html ${selectedNode === 'html' ? 'active' : ''} ${hoveredNode === 'html' ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredNode('html')}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => handleNodeSelect('html')}
            >
              <ChevronRight size={12} /> &lt;html&gt;
            </div>

            <div className="tree-nest-indent level-1">
              <div 
                className={`tree-node node-head ${selectedNode === 'head' ? 'active' : ''} ${hoveredNode === 'head' ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredNode('head')}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleNodeSelect('head')}
              >
                &lt;head&gt; <span className="helper-label">(Invisible metadata)</span>
              </div>

              <div 
                className={`tree-node node-body ${selectedNode === 'body' ? 'active' : ''} ${hoveredNode === 'body' ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredNode('body')}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleNodeSelect('body')}
              >
                <ChevronRight size={12} /> &lt;body&gt;
              </div>

              <div className="tree-nest-indent level-2 border-cyan">
                {/* Header */}
                <div 
                  className={`tree-node node-header ${selectedNode === 'header' ? 'active' : ''} ${hoveredNode === 'header' ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredNode('header')}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => handleNodeSelect('header')}
                >
                  <ChevronRight size={12} /> &lt;header&gt;
                </div>
                
                <div className="tree-nest-indent level-3 border-orange">
                  <div 
                    className={`tree-node node-h1 ${selectedNode === 'h1' ? 'active' : ''} ${hoveredNode === 'h1' ? 'hovered' : ''}`}
                    onMouseEnter={() => setHoveredNode('h1')}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => handleNodeSelect('h1')}
                  >
                    &lt;h1&gt; "Jane Developer"
                  </div>
                </div>

                {/* Main */}
                <div 
                  className={`tree-node node-main ${selectedNode === 'main' ? 'active' : ''} ${hoveredNode === 'main' ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredNode('main')}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => handleNodeSelect('main')}
                >
                  <ChevronRight size={12} /> &lt;main&gt;
                </div>

                <div className="tree-nest-indent level-3 border-orange">
                  <div 
                    className={`tree-node node-section ${selectedNode === 'section' ? 'active' : ''} ${hoveredNode === 'section' ? 'hovered' : ''}`}
                    onMouseEnter={() => setHoveredNode('section')}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => handleNodeSelect('section')}
                  >
                    <ChevronRight size={12} /> &lt;section&gt;
                  </div>

                  <div className="tree-nest-indent level-4 border-purple">
                    <div 
                      className={`tree-node node-p ${selectedNode === 'p' ? 'active' : ''} ${hoveredNode === 'p' ? 'hovered' : ''}`}
                      onMouseEnter={() => setHoveredNode('p')}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={() => handleNodeSelect('p')}
                    >
                      <ChevronRight size={12} /> &lt;p&gt; "Hello! Contact me"
                    </div>

                    <div className="tree-nest-indent level-5 border-yellow">
                      <div 
                        className={`tree-node node-a ${selectedNode === 'a' ? 'active' : ''} ${hoveredNode === 'a' ? 'hovered' : ''}`}
                        onMouseEnter={() => setHoveredNode('a')}
                        onMouseLeave={() => setHoveredNode(null)}
                        onClick={() => handleNodeSelect('a')}
                      >
                        &lt;a href="..."&gt; "LinkedIn"
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Live Canvas & Layout details */}
        <div className="canvas-details-layout">
          {/* Live browser mock */}
          <div className="browser-preview-canvas">
            <div className="browser-tab-bar">
              <span className="window-dots"><span></span><span></span><span></span></span>
              <div className="browser-url-strip"><Globe size={10} /> localhost:3000</div>
            </div>
            
            <div className="mock-render-area">
              {selectedNode === 'head' ? (
                <div className="head-invisible-indicator">
                  <AlertCircle size={18} color="#eab308" />
                  <span>The &lt;head&gt; container is completely invisible in the layout canvas!</span>
                </div>
              ) : (
                <div className={`canvas-body-mock ${selectedNode === 'body' ? 'active-highlight' : ''}`}>
                  <div className={`canvas-header-mock ${selectedNode === 'header' ? 'active-highlight' : ''}`}>
                    <h1 className={`canvas-h1-mock ${selectedNode === 'h1' ? 'active-highlight' : ''}`}>Jane Developer</h1>
                  </div>
                  
                  <div className={`canvas-main-mock ${selectedNode === 'main' ? 'active-highlight' : ''}`}>
                    <div className={`canvas-section-mock ${selectedNode === 'section' ? 'active-highlight' : ''}`}>
                      <p className={`canvas-p-mock ${selectedNode === 'p' ? 'active-highlight' : ''}`}>
                        Hello! Contact me on my {' '}
                        <span className={`canvas-a-mock ${selectedNode === 'a' ? 'active-highlight' : ''}`}>LinkedIn</span> profile.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Node detailed card */}
          <div className="tag-details-bubble card-3d">
            <div className="details-header-row">
              <code>{nodesInfo[selectedNode].tag}</code>
              <span className="display-name">{nodesInfo[selectedNode].name}</span>
            </div>
            <p className="tag-desc"><strong>What it is:</strong> {nodesInfo[selectedNode].desc}</p>
            <p className="tag-rules"><strong>Nesting Rules:</strong> {nodesInfo[selectedNode].nesting}</p>
            <div className="tag-behavior-pill">
              <Layers size={12} />
              <span>Layout type: <strong>{nodesInfo[selectedNode].boxModel}</strong></span>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .structure-workbench-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 20px; }
        .tree-explorer-panel { background: #000; border-radius: 12px; border: 1px solid #1e293b; padding: 16px; display: flex; flex-direction: column; max-height: 420px; overflow-y: auto; }
        .panel-title-label { margin: 0 0 12px 0; font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; font-family: monospace; display: flex; align-items: center; gap: 6px; }
        .tree-scroller { display: flex; flex-direction: column; gap: 4px; font-family: monospace; font-size: 0.8rem; }
        .tree-node { padding: 6px 10px; border-radius: 6px; cursor: pointer; color: #cbd5e1; display: flex; align-items: center; gap: 4px; transition: all 0.2s; }
        .tree-node:hover, .tree-node.hovered { background: rgba(255,255,255,0.05); color: white; }
        .tree-node.active { background: rgba(249, 115, 22, 0.15); color: #fb923c; border: 1px solid rgba(249, 115, 22, 0.3); }
        .tree-node.active .helper-label { color: rgba(249,146,60,0.7); }
        
        .tree-nest-indent { border-left: 1px dashed #334155; margin-left: 12px; padding-left: 12px; display: flex; flex-direction: column; gap: 4px; margin-top: 2px; }
        .tree-nest-indent.border-cyan { border-left-color: rgba(6, 182, 212, 0.3); }
        .tree-nest-indent.border-orange { border-left-color: rgba(249, 115, 22, 0.3); }
        .tree-nest-indent.border-purple { border-left-color: rgba(168, 85, 247, 0.3); }
        .tree-nest-indent.border-yellow { border-left-color: rgba(234, 179, 8, 0.3); }

        .helper-label { color: #64748b; font-size: 0.7rem; font-style: italic; }
        
        .canvas-details-layout { display: flex; flex-direction: column; gap: 16px; }
        .browser-preview-canvas { background: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid #334155; }
        .browser-tab-bar { background: #0f172a; padding: 6px 12px; display: flex; align-items: center; gap: 16px; border-bottom: 1px solid #334155; }
        .window-dots { display: flex; gap: 4px; }
        .window-dots span { width: 6px; height: 6px; border-radius: 50%; background: #334155; }
        .window-dots span:nth-child(1) { background: #ff5f56; }
        .window-dots span:nth-child(2) { background: #ffbd2e; }
        .window-dots span:nth-child(3) { background: #27c93f; }
        .browser-url-strip { background: #1e293b; color: #94a3b8; border-radius: 6px; padding: 3px 12px; font-size: 0.65rem; font-family: monospace; display: flex; align-items: center; gap: 6px; width: 60%; }
        
        .mock-render-area { padding: 20px; background: white; color: #000; min-height: 140px; display: flex; align-items: center; justify-content: center; }
        .head-invisible-indicator { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 0.8rem; color: #854d0e; background: #fef9c3; border: 1px solid #fef08a; padding: 12px; border-radius: 8px; }
        .canvas-body-mock { width: 100%; border: 2px solid transparent; border-radius: 6px; padding: 8px; background: #fff; transition: border-color 0.3s; }
        .canvas-header-mock { border: 2px dashed transparent; border-radius: 4px; padding: 4px; margin-bottom: 6px; transition: border-color 0.3s; }
        .canvas-h1-mock { font-size: 1.2rem; font-weight: 800; color: #0f172a; margin: 0; border: 2px solid transparent; padding: 2px; border-radius: 2px; }
        .canvas-main-mock { border: 2px dashed transparent; border-radius: 4px; padding: 4px; transition: border-color 0.3s; }
        .canvas-section-mock { border: 2px dashed transparent; border-radius: 4px; padding: 4px; transition: border-color 0.3s; }
        .canvas-p-mock { font-size: 0.8rem; color: #475569; margin: 0; line-height: 1.4; border: 2px solid transparent; padding: 2px; border-radius: 2px; }
        .canvas-a-mock { color: #2563eb; text-decoration: underline; font-weight: 700; border: 2px solid transparent; padding: 1px 2px; border-radius: 2px; }

        .active-highlight { border-color: #fb923c !important; background: rgba(251, 146, 60, 0.08) !important; box-shadow: 0 0 10px rgba(251, 146, 60, 0.1); }
        
        .tag-details-bubble { background: #1e293b; border: 1px solid #334155; padding: 16px; border-radius: 12px; display: flex; flex-direction: column; gap: 8px; }
        .details-header-row { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #334155; padding-bottom: 8px; }
        .details-header-row code { font-size: 0.95rem; color: #fb923c; font-weight: bold; }
        .display-name { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.5px; }
        .tag-desc, .tag-rules { font-size: 0.8rem; color: #cbd5e1; margin: 0; line-height: 1.5; }
        .tag-behavior-pill { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: #fb923c; background: rgba(251, 146, 60, 0.05); padding: 6px 12px; border-radius: 8px; border: 1px solid rgba(251, 146, 60, 0.1); width: fit-content; }
        
        @media(max-width: 768px) {
          .structure-workbench-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};

// ============================================================================
// 3. BOILERPLATE (CODE INTERACTIVE DEBUGGER) VISUALIZER
// ============================================================================
export const HTMLBoilerplateInteractive = () => {
  const [selectedLine, setSelectedLine] = useState(1);
  const [viewMode, setViewMode] = useState('correct'); // 'correct' | 'charset_broken' | 'viewport_broken'

  const linesInfo = {
    1: {
      title: '<!DOCTYPE html>',
      desc: 'Instructs browser rendering engines that this document is modern HTML5. Bypasses buggy historical standards.',
      missing: 'QUIRKS MODE ACTIVE: The browser uses layout rules from the late 90s. Box widths, paddings, and forms render incorrectly.',
    },
    2: {
      title: '<html lang="en">',
      desc: 'The root container. The "lang" attribute instructs search engines and automated screen-readers that content translates to English.',
      missing: 'ACCESSIBILITY COLLAPSE: Screen reader software fails to detect pronunciation rules, spelling syllables incorrectly for visually impaired users.',
    },
    3: {
      title: '<head>',
      desc: 'Holds invisible machine-readable parameter nodes. Standard site styles, scripts, and responsive variables are loaded here.',
      missing: 'ZERO STYLING: Stylesheets, fonts, and icons completely fail to parse. Webpage falls back to plain unstyled raw times-new-roman text.',
    },
    4: {
      title: '<meta charset="UTF-8">',
      desc: 'Declares global character encoding standard (UTF-8). Supports rendering letters, icons, accents, and emojis from all human languages.',
      missing: 'FONT CORRUPTION: Special symbols, quote marks, and accents are translated into corrupt corrupted garbage blocks (e.g. "CafÃ©" instead of "Café").',
    },
    5: {
      title: '<meta name="viewport" ...>',
      desc: 'Defines responsive mobile viewport rules. Sets device width bounds and locks default zoom levels (scale: 1.0) so content fits phone frames.',
      missing: 'MICROSCOPIC TEXT: Mobile screens render the site at a massive virtual 980px desktop grid width. Text and links look tiny and require pinch-zooming.',
    },
    6: {
      title: '<title>My Portfolio</title>',
      desc: 'Declares browser tab display titles and index bookmarks. Core parameter used by Google Search algorithms to categorize link searches.',
      missing: 'GENERIC SEARCH LABELS: Tab bar falls back to the literal path string ("index.html"). Dilutes organic Search Engine optimization.',
    },
    7: {
      title: '</head>',
      desc: 'Closes metadata header block, allowing the browser compiler to proceed to loading visual body markup structures.',
      missing: 'PARSER CONFUSION: Parser leaks metadata codes directly into visual layouts, displaying head scripting instructions as text blocks.',
    },
    8: {
      title: '<body>',
      desc: 'The visual wrapper block. Every heading, link, card, image, and interactive component must sit here to render.',
      missing: 'BLANK VIEWPORT: Browsers ignore all visual elements. Layout canvases are completely bypassed.',
    }
  };

  const getBrowserOutput = () => {
    if (viewMode === 'charset_broken') {
      return (
        <div style={{ color: '#000', padding: '10px', fontFamily: 'sans-serif' }}>
          <h2 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#dc2626' }}>Broken Unicode Encoding</h2>
          <p style={{ margin: 0, fontSize: '12px' }}>Welcome to my CafÃ©! Cost: Â£15.00 for a crÃ¨me brÃ»lÃ©e. Â© 2026</p>
        </div>
      );
    }
    if (viewMode === 'viewport_broken') {
      return (
        <div style={{ color: '#000', padding: '6px', fontFamily: 'sans-serif', textAlign: 'center', background: '#f8fafc', height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '7px', color: '#64748b', textTransform: 'uppercase', fontWeight: 800 }}>Desktop scaled mock (Pinch zoom required!)</span>
          <div style={{ transform: 'scale(0.35)', transformOrigin: 'center center', width: '280%', border: '1px solid #cbd5e1', padding: '10px', background: '#fff' }}>
            <h1 style={{ fontSize: '24px', margin: '0 0 8px 0' }}>Portfolio Title</h1>
            <p style={{ fontSize: '14px' }}>This text is microscopically small on mobile viewports since scale configuration is missing.</p>
          </div>
        </div>
      );
    }
    return (
      <div style={{ color: '#000', padding: '10px', fontFamily: 'sans-serif' }}>
        <h2 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#22c55e' }}>Perfect Mobile Rendering</h2>
        <p style={{ margin: 0, fontSize: '12px' }}>Welcome to my Café! Cost: £15.00 for a crème brûlée. © 2026</p>
      </div>
    );
  };

  return (
    <div className="day1-viz-card">
      <div className="viz-header-row">
        <span className="viz-badge purple">Core Templates</span>
        <h3>Interactive Boilerplate Debugger</h3>
      </div>
      <p className="viz-subtitle">Click lines of the core template below to trace what each tags handles, and simulate standard viewport or charset failures.</p>

      <div className="boilerplate-grid">
        {/* Code editor */}
        <div className="code-viewer-panel">
          <div className="terminal-header">
            <span className="dots"><span></span><span></span><span></span></span>
            <span className="t-label">index.html</span>
          </div>

          <div className="lines-rail-code">
            {[
              { num: 1, code: '<!DOCTYPE html>' },
              { num: 2, code: '<html lang="en">' },
              { num: 3, code: '  <head>' },
              { num: 4, code: '    <meta charset="UTF-8">' },
              { num: 5, code: '    <meta name="viewport" content="width=device-width, initial-scale=1.0">' },
              { num: 6, code: '    <title>My Portfolio</title>' },
              { num: 7, code: '  </head>' },
              { num: 8, code: '  <body>' },
              { num: 9, code: '    <h1>My Portfolio Title</h1>' },
              { num: 10, code: '  </body>' },
              { num: 11, code: '</html>' }
            ].map(item => {
              const mappedLine = item.num <= 8 ? item.num : null;
              const isSelectable = mappedLine !== null;
              const isSelected = isSelectable && selectedLine === mappedLine;

              return (
                <div 
                  key={item.num} 
                  className={`code-line-item ${isSelectable ? 'selectable' : ''} ${isSelected ? 'active-line' : ''}`}
                  onClick={() => isSelectable && setSelectedLine(mappedLine)}
                >
                  <span className="line-number">{item.num}</span>
                  <code className="code-string">{item.code}</code>
                </div>
              );
            })}
          </div>
        </div>

        {/* Explainers & Browser simulator */}
        <div className="explainers-simulator-column">
          {/* Debug info */}
          <div className="debug-card-info">
            <h4>{linesInfo[selectedLine].title} <span className="helper-label">Line {selectedLine} Selected</span></h4>
            <p><strong>Primary Function:</strong> {linesInfo[selectedLine].desc}</p>
            <div className="failure-notice-box">
              <AlertCircle size={14} color="#f87171" className="flex-shrink-0" />
              <span><strong>If Deleted:</strong> {linesInfo[selectedLine].missing}</span>
            </div>
          </div>

          {/* Browser simulator */}
          <div className="simulator-output-box card-3d">
            <div className="sim-header">
              <span className="bullet-indicator" />
              <span>Simulate rendering configurations</span>
            </div>
            
            <div className="sim-mode-toggles">
              <button className={viewMode === 'correct' ? 'active' : ''} onClick={() => setViewMode('correct')}>Normal (Valid Boilerplate)</button>
              <button className={viewMode === 'charset_broken' ? 'active alert' : ''} onClick={() => setViewMode('charset_broken')}>Missing Charset</button>
              <button className={viewMode === 'viewport_broken' ? 'active alert' : ''} onClick={() => setViewMode('viewport_broken')}>Missing Viewport</button>
            </div>

            <div className="rendered-pane-mock">
              {getBrowserOutput()}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .boilerplate-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 20px; }
        .code-viewer-panel { background: #000; border-radius: 12px; border: 1px solid #1e293b; overflow: hidden; display: flex; flex-direction: column; }
        .terminal-header { background: #1e293b; padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; }
        .t-label { font-size: 0.7rem; color: #94a3b8; font-family: monospace; }
        .lines-rail-code { padding: 12px 6px; display: flex; flex-direction: column; font-family: monospace; font-size: 0.8rem; }
        .code-line-item { display: flex; gap: 12px; padding: 4px 6px; border-radius: 4px; transition: all 0.2s; }
        .code-line-item.selectable { cursor: pointer; }
        .code-line-item.selectable:hover { background: rgba(255,255,255,0.03); }
        .code-line-item.active-line { background: rgba(168, 85, 247, 0.15) !important; border-left: 3px solid #a855f7; }
        .line-number { color: #475569; width: 20px; text-align: right; user-select: none; }
        .code-string { color: #f1f5f9; white-space: pre; }
        
        .explainers-simulator-column { display: flex; flex-direction: column; gap: 16px; }
        .debug-card-info { background: #1e293b; border: 1px solid #334155; padding: 16px; border-radius: 12px; }
        .debug-card-info h4 { margin: 0 0 8px 0; font-size: 0.95rem; color: #c084fc; display: flex; justify-content: space-between; align-items: center; }
        .debug-card-info p { margin: 0 0 12px 0; font-size: 0.8rem; color: #cbd5e1; line-height: 1.5; }
        .failure-notice-box { display: flex; gap: 10px; background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.15); padding: 10px; border-radius: 8px; color: #f87171; font-size: 0.75rem; line-height: 1.4; }
        
        .simulator-output-box { background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 14px; display: flex; flex-direction: column; gap: 10px; }
        .sim-header { display: flex; align-items: center; gap: 6px; font-size: 0.7rem; color: #94a3b8; text-transform: uppercase; font-family: monospace; }
        .bullet-indicator { width: 6px; height: 6px; border-radius: 50%; background: #10b981; }
        .sim-mode-toggles { display: flex; gap: 6px; flex-wrap: wrap; }
        .sim-mode-toggles button { background: #1e293b; border: 1px solid #334155; padding: 6px 12px; border-radius: 8px; font-size: 0.75rem; color: #94a3b8; cursor: pointer; transition: all 0.2s; }
        .sim-mode-toggles button.active { background: #22c55e; color: white; border-color: transparent; }
        .sim-mode-toggles button.active.alert { background: #ef4444; }
        
        .rendered-pane-mock { background: white; border-radius: 8px; overflow: hidden; border: 1px solid #cbd5e1; min-height: 80px; display: flex; align-items: center; }
        
        @media(max-width: 768px) {
          .boilerplate-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};

// ============================================================================
// 4. HEADINGS (VISUAL OUTLINE TREE) VISUALIZER
// ============================================================================
export const HTMLHeadingsInteractive = () => {
  const [headings, setHeadings] = useState([
    { id: '1', level: 'h1', text: 'My Dev Portfolio' },
    { id: '2', level: 'h2', text: 'Core Arsenal (Skills)' },
    { id: '3', level: 'h3', text: 'Frontend Proficiencies' },
    { id: '4', level: 'h3', text: 'Database Engines' },
    { id: '5', level: 'h2', text: 'Mission Logs (Projects)' }
  ]);

  const headingSizes = {
    h1: '24px',
    h2: '18px',
    h3: '14px',
    h4: '12px',
    h5: '10px',
    h6: '9px'
  };

  const handleLevelChange = (index, newLevel) => {
    setHeadings(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], level: newLevel };
      return copy;
    });
  };

  // Analyze outline accessibility
  const checkAccessibility = () => {
    let prevLevelNum = 0;
    let alerts = [];
    let hasH1 = false;
    let h1Count = 0;

    headings.forEach((h, idx) => {
      const currLevelNum = parseInt(h.level.replace('h', ''));
      
      if (currLevelNum === 1) {
        hasH1 = true;
        h1Count++;
      }

      if (idx === 0 && currLevelNum !== 1) {
        alerts.push('Rule Violation: Document outline must start with an <h1> tag to index primary topic.');
      }

      if (prevLevelNum > 0 && currLevelNum - prevLevelNum > 1) {
        alerts.push(`Skipped level warning: Jumped from H${prevLevelNum} straight to H${currLevelNum} at item "${h.text}". Assistive screen readers get confused.`);
      }

      prevLevelNum = currLevelNum;
    });

    if (h1Count > 1) {
      alerts.push('SEO Warning: Multiple <h1> elements detected. While technically valid in HTML5, having more than one <h1> dilutes SEO keywords.');
    }

    return {
      score: Math.max(0, 100 - (alerts.length * 20)),
      alerts: alerts.length > 0 ? alerts : ['Outline structure is perfectly semantic and 100% accessible!']
    };
  };

  const analysis = checkAccessibility();

  return (
    <div className="day1-viz-card">
      <div className="viz-header-row">
        <span className="viz-badge green">Accessibility & SEO</span>
        <h3>Heading Outline Tree Outliner</h3>
      </div>
      <p className="viz-subtitle">Change levels (H1-H6) in the interactive panel to see how it affects search indexers and screen reader outlines.</p>

      <div className="headings-grid-split">
        {/* Editor controls */}
        <div className="heading-controllers-card">
          <div className="card-heading-header">
            <Heading size={16} />
            <span>Interactive Outline Outline</span>
          </div>

          <div className="heading-lines-list">
            {headings.map((h, idx) => (
              <div key={h.id} className="heading-editor-row">
                <select 
                  value={h.level} 
                  onChange={(e) => handleLevelChange(idx, e.target.value)}
                  className="level-select-pill"
                >
                  {['h1','h2','h3','h4','h5','h6'].map(lvl => <option key={lvl} value={lvl}>{lvl.toUpperCase()}</option>)}
                </select>
                
                <input 
                  type="text"
                  value={h.text}
                  onChange={(e) => {
                    const val = e.target.value;
                    setHeadings(prev => {
                      const copy = [...prev];
                      copy[idx] = { ...copy[idx], text: val };
                      return copy;
                    });
                  }}
                  className="heading-text-input"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Browser rendering & SEO Analyzer */}
        <div className="headings-audit-canvas">
          {/* Mock Browser rendered view */}
          <div className="browser-preview-canvas">
            <div className="browser-tab-bar">
              <span className="window-dots"><span></span><span></span><span></span></span>
              <div className="browser-url-strip">localhost:3000/portfolio</div>
            </div>
            
            <div className="mock-render-area headings-render-box">
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', alignSelf: 'flex-start' }}>
                {headings.map(h => (
                  <div 
                    key={h.id} 
                    style={{ 
                      fontSize: headingSizes[h.level], 
                      fontWeight: 700, 
                      color: h.level === 'h1' ? '#0f172a' : h.level === 'h2' ? '#1e293b' : '#475569',
                      borderBottom: h.level === 'h1' ? '1px solid #e2e8f0' : 'none',
                      paddingBottom: h.level === 'h1' ? '4px' : '0',
                      lineHeight: 1.2
                    }}
                  >
                    {h.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Audit report */}
          <div className="audit-report-card card-3d">
            <div className="audit-metrics-row">
              <span className="audit-label">Accessibility & SEO Audit:</span>
              <span className={`score-badge ${analysis.score >= 80 ? 'good' : 'bad'}`}>{analysis.score}%</span>
            </div>

            <div className="audit-warnings-screen">
              {analysis.alerts.map((msg, idx) => (
                <div key={idx} className={`warning-item-row ${analysis.score === 100 ? 'perfect' : 'violated'}`}>
                  {analysis.score === 100 ? <CheckCircle2 size={12} color="#10b981" /> : <AlertCircle size={12} color="#ef4444" />}
                  <span>{msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .headings-grid-split { display: grid; grid-template-columns: 1fr 1.2fr; gap: 20px; }
        .heading-controllers-card { background: #000; border-radius: 12px; border: 1px solid #1e293b; padding: 16px; }
        .card-heading-header { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; font-family: monospace; margin-bottom: 16px; border-bottom: 1px solid #1e293b; padding-bottom: 8px; }
        
        .heading-lines-list { display: flex; flex-direction: column; gap: 10px; }
        .heading-editor-row { display: flex; gap: 10px; align-items: center; background: rgba(255,255,255,0.02); padding: 8px; border-radius: 8px; border: 1px solid #1e293b; }
        .level-select-pill { background: #1e293b; color: #fb923c; border: 1px solid #334155; padding: 4px 8px; border-radius: 6px; font-weight: 700; font-family: monospace; font-size: 0.8rem; cursor: pointer; }
        .heading-text-input { background: transparent; border: none; color: white; font-size: 0.85rem; flex: 1; outline: none; }
        .heading-text-input:focus { border-bottom: 1px solid #fb923c; }

        .headings-audit-canvas { display: flex; flex-direction: column; gap: 16px; }
        .headings-render-box { min-height: 180px; align-items: flex-start; justify-content: flex-start; overflow-y: auto; max-height: 220px; }
        
        .audit-report-card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 16px; }
        .audit-metrics-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #334155; padding-bottom: 8px; }
        .audit-label { font-size: 0.8rem; font-weight: 700; color: #cbd5e1; }
        .score-badge { font-weight: 800; font-size: 0.95rem; font-family: monospace; padding: 2px 8px; border-radius: 6px; }
        .score-badge.good { background: rgba(16, 185, 129, 0.15); color: #10b981; }
        .score-badge.bad { background: rgba(239, 68, 68, 0.15); color: #f87171; }
        
        .audit-warnings-screen { display: flex; flex-direction: column; gap: 8px; max-height: 100px; overflow-y: auto; }
        .warning-item-row { display: flex; gap: 8px; font-size: 0.75rem; line-height: 1.4; align-items: flex-start; }
        .warning-item-row.perfect { color: #10b981; }
        .warning-item-row.violated { color: #f87171; }
        
        @media(max-width: 768px) {
          .headings-grid-split { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};

// ============================================================================
// 5. PARAGRAPHS (SPACING & WRAPPING SLIDER) VISUALIZER
// ============================================================================
export const HTMLParagraphsInteractive = () => {
  const [viewportWidth, setViewportWidth] = useState(100); // percentage (50% to 100%)
  const [showSpacingBounds, setShowSpacingBounds] = useState(false);
  const [markupMode, setMarkupMode] = useState('paragraphs'); // 'paragraphs' | 'br_tags' | 'raw_text'

  const paragraphCodeTemplates = {
    paragraphs: `<p>First paragraph wraps standard sentences.</p>\n<p>Second paragraph stays separated by default margins.</p>`,
    br_tags: `First text segment.<br><br>Second text segment split manually by breaks.`,
    raw_text: `First text segment written here.
Second text segment written immediately below.`
  };

  const getPaneOutput = () => {
    if (markupMode === 'paragraphs') {
      return (
        <div style={{ width: '100%' }}>
          <p style={{ 
            margin: '1em 0', 
            border: showSpacingBounds ? '1px dashed #ef4444' : 'none',
            background: showSpacingBounds ? 'rgba(239, 68, 68, 0.05)' : 'transparent',
            padding: showSpacingBounds ? '4px' : '0',
            fontSize: '12px',
            color: '#1e293b'
          }}>
            This is paragraph number one. Browsers automatically allocate vertical margin separation to guarantee reader readability.
          </p>
          <p style={{ 
            margin: '1em 0', 
            border: showSpacingBounds ? '1px dashed #ef4444' : 'none',
            background: showSpacingBounds ? 'rgba(239, 68, 68, 0.05)' : 'transparent',
            padding: showSpacingBounds ? '4px' : '0',
            fontSize: '12px',
            color: '#1e293b'
          }}>
            This is paragraph number two. It sits neatly underneath because block elements automatically stack vertically.
          </p>
        </div>
      );
    }

    if (markupMode === 'br_tags') {
      return (
        <div style={{ width: '100%', fontSize: '12px', color: '#1e293b', lineHeight: 1.4 }}>
          This is line one. <br />
          This is line two under a single break. <br /><br />
          This text is pushed down by double breaks. <span style={{ color: '#eab308', fontWeight: 700 }}>Note: assistive screen readers treat breaks as spelling spaces, NOT idea changes!</span>
        </div>
      );
    }

    return (
      <div style={{ width: '100%', fontSize: '12px', color: '#1e293b', lineHeight: 1.4 }}>
        This is section one written on code line 1.
        This is section two written on code line 2.
        Notice how the browser collapses all whitespace and wraps them as a single continuous line block!
      </div>
    );
  };

  return (
    <div className="day1-viz-card">
      <div className="viz-header-row">
        <span className="viz-badge cyan">Block vs Inline</span>
        <h3>Paragraph Line-Wrapping & Spacing laboratory</h3>
      </div>
      <p className="viz-subtitle">Adjust viewport widths or toggle margins to trace how paragraphs automatically handle word wrapping and vertical block alignment.</p>

      {/* Spacing Controls */}
      <div className="paragraphs-control-bar">
        <div className="slider-group">
          <label>Simulate viewport width ({viewportWidth}%):</label>
          <input 
            type="range"
            min="45"
            max="100"
            value={viewportWidth}
            onChange={(e) => setViewportWidth(parseInt(e.target.value))}
            className="viewport-slider"
          />
        </div>

        <button 
          className={`toggle-btn spacing-btn ${showSpacingBounds ? 'active' : ''}`}
          onClick={() => setShowSpacingBounds(!showSpacingBounds)}
        >
          <Eye size={12} /> {showSpacingBounds ? 'Hide Hidden Margins' : 'Show Default Margins (1em)'}
        </button>
      </div>

      <div className="paragraphs-workbench-grid">
        {/* Code representation */}
        <div className="p-code-console">
          <div className="console-header-bar">
            <Code size={14} />
            <span>Developer Code Input</span>
          </div>
          
          <div className="p-mode-buttons">
            <button className={markupMode === 'paragraphs' ? 'active' : ''} onClick={() => setMarkupMode('paragraphs')}>Use &lt;p&gt; tags</button>
            <button className={markupMode === 'br_tags' ? 'active' : ''} onClick={() => setMarkupMode('br_tags')}>Use &lt;br&gt; breaks</button>
            <button className={markupMode === 'raw_text' ? 'active' : ''} onClick={() => setMarkupMode('raw_text')}>Raw carriage returns</button>
          </div>

          <pre className="p-code-snippet"><code>{paragraphCodeTemplates[markupMode]}</code></pre>
        </div>

        {/* Browser simulator */}
        <div className="p-browser-simulator">
          <div className="browser-preview-canvas">
            <div className="browser-tab-bar">
              <span className="window-dots"><span></span><span></span><span></span></span>
              <div className="browser-url-strip">localhost:3000/wrapping</div>
            </div>
            
            <div className="mock-render-area p-render-canvas" style={{ padding: '16px' }}>
              <div 
                style={{ 
                  width: `${viewportWidth}%`, 
                  background: '#f8fafc', 
                  border: '1px solid #cbd5e1', 
                  padding: '10px', 
                  borderRadius: '6px', 
                  transition: 'width 0.3s ease',
                  boxSizing: 'border-box'
                }}
              >
                {getPaneOutput()}
              </div>
            </div>
          </div>

          {/* Insights bubble */}
          <div className="p-insights-box card-3d">
            <div className="insights-header-row">
              <Sparkles size={12} color="#fb923c" />
              <span>Browser layout insight</span>
            </div>
            <p>
              {markupMode === 'paragraphs' && 'The browser instantiates a separate block box for each <p> element, injecting a vertical margin of 1em. This maintains breathing room and is excellent for cognitive accessibility.'}
              {markupMode === 'br_tags' && 'Using <br> breaks forces newlines but does not change text block boundaries. Using multiple breaks for structural spacing is a bad layout habit; use CSS margins instead!'}
              {markupMode === 'raw_text' && 'HTML parsing engines ignore standard carriage returns and extra spaces. Everything collapses into a single continuous stream of letters until a block tag instructs it otherwise.'}
            </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .paragraphs-control-bar { display: flex; gap: 20px; align-items: center; justify-content: space-between; margin-bottom: 20px; background: rgba(255,255,255,0.02); padding: 12px 16px; border-radius: 10px; border: 1px solid #1e293b; }
        .slider-group { display: flex; align-items: center; gap: 12px; font-size: 0.8rem; color: #cbd5e1; flex: 1; }
        .viewport-slider { flex: 1; accent-color: #06b6d4; cursor: pointer; }
        
        .paragraphs-workbench-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 20px; }
        .p-code-console { background: #000; border-radius: 12px; border: 1px solid #1e293b; overflow: hidden; display: flex; flex-direction: column; }
        .p-mode-buttons { display: flex; border-bottom: 1px solid #1e293b; }
        .p-mode-buttons button { flex: 1; background: #0f172a; border: none; border-right: 1px solid #1e293b; color: #64748b; padding: 8px; font-size: 0.75rem; cursor: pointer; font-weight: 600; transition: all 0.2s; }
        .p-mode-buttons button:last-child { border-right: none; }
        .p-mode-buttons button.active { background: #1e293b; color: #22d3ee; }
        
        .p-code-snippet { padding: 16px; margin: 0; font-family: monospace; font-size: 0.75rem; color: #a855f7; white-space: pre-wrap; line-height: 1.5; }
        
        .p-browser-simulator { display: flex; flex-direction: column; gap: 16px; }
        .p-render-canvas { min-height: 180px; align-items: flex-start; justify-content: flex-start; }
        
        .p-insights-box { background: #1e293b; border: 1px solid #334155; padding: 14px; border-radius: 12px; }
        .insights-header-row { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 700; color: #fb923c; margin-bottom: 6px; }
        .p-insights-box p { margin: 0; font-size: 0.8rem; color: #cbd5e1; line-height: 1.5; }
        
        @media(max-width: 768px) {
          .paragraphs-workbench-grid { grid-template-columns: 1fr; }
          .paragraphs-control-bar { flex-direction: column; gap: 12px; }
          .slider-group { width: 100%; }
        }
      `}} />
    </div>
  );
};

// ============================================================================
// 6. FORMATTING (ACCESSIBILITY SCREEN-READER AUDIBLE) VISUALIZER
// ============================================================================
export const HTMLFormattingInteractive = () => {
  const [selectedTag, setSelectedTag] = useState('strong');
  const [audibleText, setAudibleText] = useState('Critical system update!');
  const [isReading, setIsReading] = useState(false);

  const formatDictionary = {
    strong: {
      code: '<strong>',
      type: 'Semantic Bold',
      desc: 'Applies strong visual bolding weight AND tags content with maximum linguistic priority. Screen readers read this text with heavy structural emphasis.',
      accessibility: 'EXCELLENT: Critical information is flagged for readers using speech engines (volume and voice-tone amplification).',
      sample: (txt) => <span>Highlight this <strong>{txt}</strong> message.</span>
    },
    b: {
      code: '<b>',
      type: 'Stylistic Bold',
      desc: 'Applies visual bolding weight ONLY. It carries zero document priority or semantic values. Excellent for styling keywords but ignored by assistive engines.',
      accessibility: 'POOR: Speech readers ignore this element. Visually impaired users fail to notice the emphasis difference.',
      sample: (txt) => <span>Highlight this <b>{txt}</b> message.</span>
    },
    em: {
      code: '<em>',
      type: 'Semantic Italic',
      desc: 'Applies standard italics styling and indicates emphasis parameters. Screen readers read em nodes with an altered pitch or stress tone.',
      accessibility: 'EXCELLENT: Conveys grammatical stress tone changes perfectly for accessibility software.',
      sample: (txt) => <span>Highlight this <em>{txt}</em> message.</span>
    },
    i: {
      code: '<i>',
      type: 'Stylistic Italic',
      desc: 'Applies visual italics ONLY. Used for botanical terms, foreign phrases, or titles, but lacks any semantic emphasis values.',
      accessibility: 'POOR: speech devices ignore formatting entirely, reading it in a flat standard tone.',
      sample: (txt) => <span>Highlight this <i>{txt}</i> message.</span>
    },
    mark: {
      code: '<mark>',
      type: 'Yellow Highlight',
      desc: 'Injects a bright yellow bounding background around keywords to represent high relevance, resembling a physical highlighter marker.',
      accessibility: 'FAIR: Highlights visual reading focus, but requires specific aria attributes for maximum screen reader parsing.',
      sample: (txt) => <span>Highlight this <mark>{txt}</mark> message.</span>
    },
    code: {
      code: '<code>',
      type: 'Code Text Element',
      desc: 'Forces words into a clean monospaced font family. Excellent for detailing keyboard shortcuts, inline variables, or terminal scripts.',
      accessibility: 'FAIR: Directs reading focus and informs speech devices to spell out letters individually if needed.',
      sample: (txt) => <span>Highlight this <code>{txt}</code> message.</span>
    }
  };

  const triggerScreenReader = () => {
    setIsReading(true);
    setTimeout(() => setIsReading(false), 2400);
  };

  const getAudibleSpeechString = () => {
    if (selectedTag === 'strong') {
      return `[Speech Engine Profile: Volume elevated +20%, pitch drop: heavy structural emphasis] "${audibleText}"`;
    }
    if (selectedTag === 'em') {
      return `[Speech Engine Profile: Pitch altered, stressed grammatical intonation] "${audibleText}"`;
    }
    if (selectedTag === 'b' || selectedTag === 'i') {
      return `[Speech Engine Profile: FLAT STANDARD READING - Zero priority detected] "${audibleText}"`;
    }
    if (selectedTag === 'mark') {
      return `[Speech Engine Profile: Informs user that word is highlighted] "${audibleText}"`;
    }
    if (selectedTag === 'code') {
      return `[Speech Engine Profile: Font family altered, reading characters monospaced] "${audibleText}"`;
    }
    return `"${audibleText}"`;
  };

  return (
    <div className="day1-viz-card">
      <div className="viz-header-row">
        <span className="viz-badge purple">Semantic Markup</span>
        <h3>Formatting & Screen-Reader Audible simulator</h3>
      </div>
      <p className="viz-subtitle">See how text formatting tags behave under the hood. In addition to visual changes, semantic tags trigger screen-reader variations.</p>

      <div className="formatting-interactive-grid">
        {/* Selection sidebar */}
        <div className="f-controllers-panel">
          <h4 className="panel-title-label"><Code size={14} /> Formatting tags</h4>
          
          <div className="tags-pill-list">
            {Object.keys(formatDictionary).map(tKey => (
              <button 
                key={tKey} 
                className={`tag-btn-selector ${selectedTag === tKey ? 'active' : ''}`}
                onClick={() => setSelectedTag(tKey)}
              >
                <code>{formatDictionary[tKey].code}</code>
                <span className="type-desc-lbl">{formatDictionary[tKey].type}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Simulation Output pane */}
        <div className="f-simulation-canvas">
          {/* Browser view */}
          <div className="browser-preview-canvas">
            <div className="browser-tab-bar">
              <span className="window-dots"><span></span><span></span><span></span></span>
              <div className="browser-url-strip">localhost:3000/formatting</div>
            </div>
            
            <div className="mock-render-area f-rendered-box">
              <div className="sandbox-input-row-plain inline-input-grid">
                <label>Change word:</label>
                <input 
                  type="text" 
                  value={audibleText} 
                  onChange={(e) => setAudibleText(e.target.value)}
                  className="inline-word-editor"
                />
              </div>

              <div className="rendered-formatting-sample">
                {formatDictionary[selectedTag].sample(audibleText)}
              </div>
            </div>
          </div>

          {/* Screen reader simulator */}
          <div className="screen-reader-simulation-card card-3d">
            <div className="sr-header-bar">
              <div className="voice-active-indicator">
                <span className={`pulse-sr-dot ${isReading ? 'active' : ''}`} />
                <span>Screen-Reader Speech Output</span>
              </div>
              
              <button className="read-button-trigger" onClick={triggerScreenReader} disabled={isReading}>
                <Volume2 size={12} /> {isReading ? 'Speaking...' : 'Read Aloud'}
              </button>
            </div>

            <div className="speech-box-screen">
              {isReading ? (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="speech-text"
                >
                  {getAudibleSpeechString()}
                </motion.span>
              ) : (
                <span className="empty-speech-lbl">Click "Read Aloud" to simulate auditory accessibility rendering.</span>
              )}
            </div>

            <div className="tag-details-box mt-3">
              <p><strong>Tag Goal:</strong> {formatDictionary[selectedTag].desc}</p>
              <div className={`rating-strip ${selectedTag === 'strong' || selectedTag === 'em' ? 'excellent' : 'fair'}`}>
                <ShieldCheck size={14} />
                <span>Accessibility value: <strong>{formatDictionary[selectedTag].accessibility}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .formatting-interactive-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 20px; }
        .f-controllers-panel { background: #000; border-radius: 12px; border: 1px solid #1e293b; padding: 16px; }
        .tags-pill-list { display: flex; flex-direction: column; gap: 8px; }
        
        .tag-btn-selector { display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02); border: 1px solid #1e293b; padding: 10px 14px; border-radius: 8px; text-align: left; cursor: pointer; transition: all 0.2s; }
        .tag-btn-selector:hover { background: rgba(255,255,255,0.04); }
        .tag-btn-selector.active { background: rgba(168, 85, 247, 0.15); border-color: #a855f7; }
        .tag-btn-selector.active code { color: #c084fc; }
        
        .tag-btn-selector code { font-size: 0.9rem; color: #94a3b8; font-weight: 700; font-family: monospace; }
        .type-desc-lbl { font-size: 0.75rem; color: #64748b; font-weight: 500; }
        
        .f-simulation-canvas { display: flex; flex-direction: column; gap: 16px; }
        .f-rendered-box { flex-direction: column; align-items: flex-start; justify-content: space-between; min-height: 120px; padding: 12px; }
        .inline-input-grid { display: flex; gap: 10px; align-items: center; font-size: 0.75rem; color: #64748b; font-weight: 700; width: 100%; border-bottom: 1px dashed #cbd5e1; padding-bottom: 6px; }
        .inline-word-editor { background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 8px; color: #000; font-size: 0.75rem; outline: none; }
        .rendered-formatting-sample { font-size: 0.9rem; color: #1e293b; margin: 12px 0 6px 0; }
        
        .screen-reader-simulation-card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 16px; }
        .sr-header-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #334155; padding-bottom: 8px; }
        .voice-active-indicator { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: #cbd5e1; font-weight: 700; }
        
        .pulse-sr-dot { width: 6px; height: 6px; border-radius: 50%; background: #64748b; }
        .pulse-sr-dot.active { background: #a855f7; box-shadow: 0 0 10px #a855f7; animation: blink 1s infinite; }
        @keyframes blink { 50% { opacity: 0.3; } }
        
        .read-button-trigger { background: #a855f7; color: white; border: none; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px; }
        .read-button-trigger:disabled { background: #475569; cursor: not-allowed; }
        
        .speech-box-screen { background: #000; padding: 12px; border-radius: 8px; border: 1px solid #334155; font-family: monospace; font-size: 0.75rem; min-height: 50px; display: flex; align-items: center; }
        .speech-text { color: #a855f7; line-height: 1.4; }
        .empty-speech-lbl { color: #64748b; }
        
        .tag-details-box p { margin: 0 0 8px 0; font-size: 0.8rem; color: #cbd5e1; line-height: 1.4; }
        .rating-strip { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; padding: 6px 12px; border-radius: 8px; border: 1px solid transparent; width: fit-content; }
        .rating-strip.excellent { background: rgba(16, 185, 129, 0.05); color: #10b981; border-color: rgba(16, 185, 129, 0.1); }
        .rating-strip.fair { background: rgba(245, 158, 11, 0.05); color: #fb923c; border-color: rgba(245, 158, 11, 0.1); }
        
        @media(max-width: 768px) {
          .formatting-interactive-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};

// ============================================================================
// 7. ENTITIES (CHARACTER ESCAPING LAB) VISUALIZER
// ============================================================================
export const HTMLEntitiesInteractive = () => {
  const [escapeMode, setEscapeMode] = useState('escaped'); // 'escaped' | 'unescaped'
  const [activePreset, setActivePreset] = useState('lt');

  const presets = {
    lt: {
      char: '<',
      entity: '&lt;',
      name: 'Less-Than Sign',
      desc: 'Used to escape brackets. Typing raw "<" confuses HTML parsers, making them think a new structural tag is opening.',
      brokenCode: '<p>This is < 5 text</p>',
      escapedCode: '<p>This is &lt; 5 text</p>'
    },
    gt: {
      char: '>',
      entity: '&gt;',
      name: 'Greater-Than Sign',
      desc: 'Escapes standard closing brackets inside paragraph blocks.',
      brokenCode: '<p>Formula: x > y</p>',
      escapedCode: '<p>Formula: x &gt; y</p>'
    },
    amp: {
      char: '&',
      entity: '&amp;',
      name: 'Ampersand Sign',
      desc: 'Crucial for clean validation. The ampersand represents the structural trigger for entities; using it raw can corrupt URLs or query strings.',
      brokenCode: '<p>Fish & Chips</p>',
      escapedCode: '<p>Fish &amp; Chips</p>'
    },
    copy: {
      char: '©',
      entity: '&copy;',
      name: 'Copyright Symbol',
      desc: 'Renders the official copyright glyph cleanly, regardless of historical server character-set configurations.',
      brokenCode: '<p>Copyright 2026</p>',
      escapedCode: '<p>Copyright &copy; 2026</p>'
    },
    reg: {
      char: '®',
      entity: '&reg;',
      name: 'Registered Trademark',
      desc: 'Compiles the official circular superscript registered logo cleanly.',
      brokenCode: '<p>Brand Logo</p>',
      escapedCode: '<p>Brand Logo &reg;</p>'
    }
  };

  const getCompilationOutput = () => {
    const cur = presets[activePreset];
    if (escapeMode === 'escaped') {
      return (
        <div style={{ color: '#000', padding: '12px', fontFamily: 'sans-serif' }}>
          <span style={{ fontSize: '10px', color: '#10b981', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '4px' }}>Browser output: SAFE PARSE</span>
          <p style={{ margin: 0, fontSize: '13px', color: '#1e293b' }}>
            {activePreset === 'lt' && 'This is < 5 text'}
            {activePreset === 'gt' && 'Formula: x > y'}
            {activePreset === 'amp' && 'Fish & Chips'}
            {activePreset === 'copy' && 'Copyright © 2026'}
            {activePreset === 'reg' && 'Brand Logo ®'}
          </p>
        </div>
      );
    }

    // Unescaped / Broken mode
    return (
      <div style={{ color: '#000', padding: '12px', fontFamily: 'sans-serif' }}>
        <span style={{ fontSize: '10px', color: '#ef4444', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '4px' }}>Browser output: PARSER COMPILER ERROR / CONGESTION</span>
        {activePreset === 'lt' ? (
          <p style={{ margin: 0, fontSize: '13px', color: '#dc2626', background: '#fee2e2', padding: '6px', borderRadius: '4px' }}>
            ⚠️ Error: Browser compiled "&lt; 5 text&lt;/p&gt;" as an invalid tag named "&lt; 5". Text after bracket disappears!
          </p>
        ) : (
          <p style={{ margin: 0, fontSize: '13px', color: '#eab308', background: '#fef9c3', padding: '6px', borderRadius: '4px' }}>
            ⚠️ Formatting caution: Plain character symbol resolved without character sets. Text could show as corrupted glyph blocks ("ï¿½") on older servers.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="day1-viz-card">
      <div className="viz-header-row">
        <span className="viz-badge green">Markup Escape</span>
        <h3>HTML Entities & Escape Laboratory</h3>
      </div>
      <p className="viz-subtitle">Trace why special symbols must be escaped. See how unescaped brackets break browser compilers while entity codes parse perfectly.</p>

      <div className="entities-workbench-grid">
        {/* Preset Selector */}
        <div className="entities-presets-card">
          <div className="card-heading-header">
            <Code size={14} />
            <span>Character Entity Presets</span>
          </div>

          <div className="presets-vertical-rail">
            {Object.keys(presets).map(pKey => (
              <button 
                key={pKey} 
                className={`preset-btn-selector ${activePreset === pKey ? 'active' : ''}`}
                onClick={() => setActivePreset(pKey)}
              >
                <span className="glyph-char">{presets[pKey].char}</span>
                <div className="preset-meta">
                  <span className="name">{presets[pKey].name}</span>
                  <code>{presets[pKey].entity}</code>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Decoder Workspace */}
        <div className="entities-sandbox-canvas">
          {/* Controls toggle */}
          <div className="escape-mode-toggles">
            <button 
              className={`mode-btn escaped-btn ${escapeMode === 'escaped' ? 'active' : ''}`}
              onClick={() => setEscapeMode('escaped')}
            >
              <CheckCircle2 size={12} /> Escaped Code ({presets[activePreset].entity})
            </button>
            <button 
              className={`mode-btn unescaped-btn ${escapeMode === 'unescaped' ? 'active' : ''}`}
              onClick={() => setEscapeMode('unescaped')}
            >
              <AlertCircle size={12} /> Raw Unescaped ({presets[activePreset].char})
            </button>
          </div>

          {/* Code block preview */}
          <div className="p-code-console">
            <div className="console-header-bar">
              <FileCode size={14} />
              <span>Parsed DOM HTML Code</span>
            </div>
            <pre className="p-code-snippet entities-snippet">
              <code>
                {escapeMode === 'escaped' ? presets[activePreset].escapedCode : presets[activePreset].brokenCode}
              </code>
            </pre>
          </div>

          {/* Browser compilation */}
          <div className="browser-preview-canvas">
            <div className="browser-tab-bar">
              <span className="window-dots"><span></span><span></span><span></span></span>
              <div className="browser-url-strip">localhost:3000/escaping</div>
            </div>
            
            <div className="mock-render-area entities-rendered-pane">
              {getCompilationOutput()}
            </div>
          </div>

          {/* Explainer card */}
          <div className="entities-explainer-card card-3d">
            <p><strong>How it parses:</strong> {presets[activePreset].desc}</p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .entities-workbench-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 20px; }
        .entities-presets-card { background: #000; border-radius: 12px; border: 1px solid #1e293b; padding: 16px; }
        
        .presets-vertical-rail { display: flex; flex-direction: column; gap: 8px; }
        .preset-btn-selector { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.02); border: 1px solid #1e293b; padding: 10px; border-radius: 8px; text-align: left; cursor: pointer; transition: all 0.2s; }
        .preset-btn-selector:hover { background: rgba(255,255,255,0.04); }
        .preset-btn-selector.active { background: rgba(34, 197, 94, 0.1); border-color: #22c55e; }
        .preset-btn-selector.active .glyph-char { background: #22c55e; color: black; }
        
        .glyph-char { width: 34px; height: 34px; border-radius: 6px; background: #1e293b; color: #cbd5e1; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; font-weight: 800; font-family: monospace; }
        .preset-meta { display: flex; flex-direction: column; gap: 2px; }
        .preset-meta .name { font-size: 0.75rem; font-weight: 700; color: #f1f5f9; }
        .preset-meta code { font-size: 0.7rem; color: #94a3b8; }
        
        .entities-sandbox-canvas { display: flex; flex-direction: column; gap: 16px; }
        .escape-mode-toggles { display: flex; gap: 10px; }
        
        .escape-mode-toggles .mode-btn { flex: 1; border: 1px solid #334155; border-radius: 8px; padding: 8px; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s; }
        .escape-mode-toggles .mode-btn.escaped-btn.active { background: rgba(34, 197, 94, 0.15); color: #4ade80; border-color: #22c55e; }
        .escape-mode-toggles .mode-btn.unescaped-btn.active { background: rgba(239, 68, 68, 0.15); color: #f87171; border-color: #ef4444; }
        
        .entities-snippet { color: #22d3ee; }
        .entities-rendered-pane { min-height: 80px; align-items: center; justify-content: flex-start; }
        
        .entities-explainer-card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 14px; }
        .entities-explainer-card p { margin: 0; font-size: 0.8rem; color: #cbd5e1; line-height: 1.5; }
        
        @media(max-width: 768px) {
          .entities-workbench-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};

// ============================================================================
// 8. MINI PROJECT: PERSONAL PORTFOLIO INTERACTIVE BUILDER
// ============================================================================
export const HTMLPortfolioInteractive = () => {
  const [activeTheme, setActiveTheme] = useState('modern'); // 'modern' | 'glassmorphism' | 'cyberpunk' | 'terminal'
  const [hasHeader, setHasHeader] = useState(true);
  const [hasMain, setHasMain] = useState(true);
  const [hasFooter, setHasFooter] = useState(true);
  const [name, setName] = useState('Jane Developer');
  const [role, setRole] = useState('Full Stack Engineer');
  const [imageSrc, setImageSrc] = useState('https://picsum.photos/120/120?random=1');
  const [imageAlt, setImageAlt] = useState('Jane Developer Headshot');
  const [skills, setSkills] = useState(['Semantic Layouts', 'Responsive CSS', 'React UI', 'API Nodes']);
  const [newSkill, setNewSkill] = useState('');
  const [links, setLinks] = useState([
    { label: 'GitHub Forge', url: 'https://github.com' },
    { label: 'LinkedIn Node', url: 'https://linkedin.com' }
  ]);
  const [showCode, setShowCode] = useState(false);

  // Requirements auditor
  const reqs = [
    { id: 'semantic', text: 'Semantic Tag Outline (<header>, <main>, <footer>)', met: hasHeader && hasMain && hasFooter },
    { id: 'headings', text: '3 Heading Levels (H1: Title, H2: Section, H3: Role)', met: name.length > 0 && role.length > 0 && hasHeader },
    { id: 'image', text: 'Avatar Image with descriptive alt text', met: imageSrc.length > 0 && imageAlt.trim().length > 5 },
    { id: 'list', text: 'Skills List (3+ items inside <ul>)', met: skills.length >= 3 },
    { id: 'links', text: '2 Social Anchors with target="_blank"', met: links.length >= 2 && links.every(l => l.label.trim() !== '' && l.url.trim() !== '') }
  ];

  const metCount = reqs.filter(r => r.met).length;
  const progressPercent = Math.round((metCount / reqs.length) * 100);

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (idx) => {
    setSkills(prev => prev.filter((_, i) => i !== idx));
  };

  const getGeneratedHTML = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} | Dev Portfolio</title>
</head>
<body>

  ${hasHeader ? `<header>
    <h1>${name}</h1>
    <h3>${role}</h3>
  </header>` : '<!-- <header> missing -->'}

  ${hasMain ? `<main>
    <section>
      <h2>About Me</h2>
      <p>Crafting responsive, clean, and highly semantical applications.</p>
      ${imageSrc ? `<img src="${imageSrc}" alt="${imageAlt}">` : '<!-- Profile Image missing -->'}
    </section>

    <section>
      <h2>Technical Arsenal</h2>
      <ul>
        ${skills.map(s => `<li>${s}</li>`).join('\n        ')}
      </ul>
    </section>

    <section>
      <h2>Digital Footprints</h2>
      ${links.map(l => `<a href="${l.url}" target="_blank">${l.label}</a>`).join('\n      ')}
    </section>
  </main>` : '<!-- <main> missing -->'}

  ${hasFooter ? `<footer>
    <p>&copy; ${new Date().getFullYear()} ${name}. Secure Node.</p>
  </footer>` : '<!-- <footer> missing -->'}

</body>
</html>`;
  };

  return (
    <div className="day1-viz-card portfolio-builder-root">
      <div className="viz-header-row">
        <span className="viz-badge purple">Project Blueprint Sandbox</span>
        <h3>Interactive Personal Portfolio Builder</h3>
      </div>
      <p className="viz-subtitle">Assemble structural tags, fill details, and select stylesheets to visually review standard MERN Day 1 requirements.</p>

      {/* Progress tracker bar */}
      <div className="builder-progress-panel">
        <div className="progress-label-row">
          <span>Target Requirements Completed</span>
          <span className="progress-pct">{metCount} of {reqs.length} ({progressPercent}%)</span>
        </div>
        <div className="progress-rail">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="portfolio-builder-grid">
        {/* Left Side: Controller panel */}
        <div className="builder-controls-card">
          <div className="card-heading-header">
            <Layers size={14} />
            <span>Document Outline & Content Controls</span>
          </div>

          <div className="controls-scrollable">
            {/* Theme picker */}
            <div className="control-section">
              <label className="section-label">Select CSS Theme Style:</label>
              <div className="theme-toggle-strip">
                <button className={`theme-btn modern ${activeTheme === 'modern' ? 'active' : ''}`} onClick={() => setActiveTheme('modern')}>Minimal Slate</button>
                <button className={`theme-btn glass ${activeTheme === 'glassmorphism' ? 'active' : ''}`} onClick={() => setActiveTheme('glassmorphism')}>Glassmorphism</button>
                <button className={`theme-btn cyberpunk ${activeTheme === 'cyberpunk' ? 'active' : ''}`} onClick={() => setActiveTheme('cyberpunk')}>Cyberpunk</button>
                <button className={`theme-btn terminal ${activeTheme === 'terminal' ? 'active' : ''}`} onClick={() => setActiveTheme('terminal')}>Green Terminal</button>
              </div>
            </div>

            {/* Semantic Layout Toggles */}
            <div className="control-section">
              <label className="section-label">Semantic Structural Outline:</label>
              <div className="toggles-row">
                <label className="toggle-item-lbl">
                  <input type="checkbox" checked={hasHeader} onChange={() => setHasHeader(!hasHeader)} />
                  <span>&lt;header&gt; tag</span>
                </label>
                <label className="toggle-item-lbl">
                  <input type="checkbox" checked={hasMain} onChange={() => setHasMain(!hasMain)} />
                  <span>&lt;main&gt; tag</span>
                </label>
                <label className="toggle-item-lbl">
                  <input type="checkbox" checked={hasFooter} onChange={() => setHasFooter(!hasFooter)} />
                  <span>&lt;footer&gt; tag</span>
                </label>
              </div>
            </div>

            {/* Header elements input */}
            <div className="control-section">
              <label className="section-label">Branding & Bio Details:</label>
              <div className="input-fields-group">
                <div className="input-row">
                  <span className="input-tag">&lt;h1&gt;</span>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
                </div>
                <div className="input-row">
                  <span className="input-tag">&lt;h3&gt;</span>
                  <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Your Profession" />
                </div>
              </div>
            </div>

            {/* Image Elements */}
            <div className="control-section">
              <label className="section-label">Avatar Image Embed:</label>
              <div className="input-fields-group">
                <div className="input-row">
                  <span className="input-tag">src</span>
                  <input type="text" value={imageSrc} onChange={(e) => setImageSrc(e.target.value)} placeholder="Avatar URL" />
                </div>
                <div className="input-row">
                  <span className="input-tag">alt</span>
                  <input type="text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} placeholder="Accessibility description (min 6 chars)" />
                </div>
              </div>
            </div>

            {/* Skills lists builder */}
            <div className="control-section">
              <label className="section-label">Unordered Skills Builder (&lt;ul&gt; &lt;li&gt;):</label>
              <form onSubmit={addSkill} className="skills-inline-form">
                <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add new skill..." />
                <button type="submit">Add Item</button>
              </form>
              <div className="skills-pills-wrap">
                {skills.map((s, idx) => (
                  <span key={idx} className="skill-item-pill">
                    {s}
                    <button className="del-btn" onClick={() => removeSkill(idx)}>×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Links Editor */}
            <div className="control-section">
              <label className="section-label">Social Links (&lt;a target="_blank"&gt;):</label>
              <div className="links-editor-list">
                {links.map((lnk, idx) => (
                  <div key={idx} className="link-edit-row">
                    <input 
                      type="text" 
                      value={lnk.label} 
                      onChange={(e) => {
                        const val = e.target.value;
                        setLinks(prev => {
                          const cp = [...prev];
                          cp[idx] = { ...cp[idx], label: val };
                          return cp;
                        });
                      }}
                      placeholder="Label" 
                    />
                    <input 
                      type="text" 
                      value={lnk.url} 
                      onChange={(e) => {
                        const val = e.target.value;
                        setLinks(prev => {
                          const cp = [...prev];
                          cp[idx] = { ...cp[idx], url: val };
                          return cp;
                        });
                      }}
                      placeholder="URL Address" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Live preview and inspector */}
        <div className="builder-render-inspector-column">
          {/* Render Area */}
          <div className="browser-preview-canvas portfolio-preview-container">
              <div className="browser-tab-bar">
                <span className="window-dots"><span></span><span></span><span></span></span>
                <div className="browser-url-strip"><Globe size={10} /> {name.toLowerCase().replace(/\s+/g, '')}.github.io</div>
              </div>

              <div className={`mock-render-area portfolio-render-box theme-${activeTheme}`}>
                <div className="portfolio-preview-body">
                  {/* Header */}
                  {hasHeader ? (
                    <header className="theme-header">
                      <h1 className="theme-h1">{name || 'Unnamed Developer'}</h1>
                      <h3 className="theme-h3">{role || 'Web Developer'}</h3>
                    </header>
                  ) : (
                    <div className="tag-omitted-banner">&lt;header&gt; Block Omitted</div>
                  )}

                  {/* Main */}
                  {hasMain ? (
                    <main className="theme-main">
                      <section className="theme-section">
                        <h2 className="theme-h2">About Me</h2>
                        <div className="about-wrapper-row">
                          <p className="theme-p">Crafting responsive, clean, and highly semantical applications using modern browser architectures.</p>
                          {imageSrc ? (
                            <img className="theme-img" src={imageSrc} alt={imageAlt} onError={(e) => { e.target.style.display = 'none'; }} />
                          ) : null}
                        </div>
                      </section>

                      <section className="theme-section">
                        <h2 className="theme-h2">Technical Arsenal</h2>
                        <ul className="theme-ul">
                          {skills.map((s, idx) => (
                            <li key={idx} className="theme-li">{s}</li>
                          ))}
                        </ul>
                      </section>

                      <section className="theme-section">
                        <h2 className="theme-h2">Digital Footprints</h2>
                        <div className="theme-links-row">
                          {links.map((l, idx) => (
                            <span key={idx} className="theme-a">{l.label}</span>
                          ))}
                        </div>
                      </section>
                    </main>
                  ) : (
                    <div className="tag-omitted-banner">&lt;main&gt; Content Canvas Omitted</div>
                  )}

                  {/* Footer */}
                  {hasFooter ? (
                    <footer className="theme-footer">
                      <p className="theme-p-footer">&copy; {new Date().getFullYear()} {name || 'Developer'}. Crafted semantically.</p>
                    </footer>
                  ) : (
                    <div className="tag-omitted-banner">&lt;footer&gt; Block Omitted</div>
                  )}
                </div>
              </div>
            </div>

          {/* Real-time structural checks */}
          <div className="audit-checklist-card card-3d">
            <h4 className="checklist-title"><ShieldCheck size={14} color="#22c55e" /> Semantic Audit Logs</h4>
            <div className="checks-vertical-rail">
              {reqs.map((r) => (
                <div key={r.id} className={`check-card-item ${r.met ? 'pass' : 'fail'}`}>
                  <div className={`check-icon-circle ${r.met ? 'pass' : 'fail'}`} />
                  <span className="check-text">{r.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .portfolio-builder-root { border-color: rgba(168, 85, 247, 0.3); }
        .builder-progress-panel { background: rgba(0,0,0,0.2); padding: 12px 16px; border-radius: 10px; border: 1px solid #1e293b; margin-bottom: 20px; }
        .progress-label-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #cbd5e1; font-weight: 700; margin-bottom: 6px; }
        .progress-pct { color: #fb923c; font-family: monospace; }
        .progress-rail { height: 6px; background: #1e293b; border-radius: 10px; overflow: hidden; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #c084fc 0%, #fb923c 100%); transition: width 0.4s ease; }
        
        .portfolio-builder-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 20px; }
        .builder-controls-card { background: #000; border-radius: 12px; border: 1px solid #1e293b; padding: 16px; max-height: 520px; display: flex; flex-direction: column; }
        .controls-scrollable { overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 16px; padding-right: 4px; }
        
        .control-section { background: rgba(255,255,255,0.01); border: 1px solid #1e293b; border-radius: 10px; padding: 12px; }
        .section-label { font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px; display: block; }
        
        .theme-toggle-strip { display: flex; gap: 6px; flex-wrap: wrap; }
        .theme-btn { background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 5px 10px; font-size: 0.7rem; color: #cbd5e1; cursor: pointer; transition: all 0.2s; }
        .theme-btn.active { background: #fb923c; color: black; border-color: transparent; font-weight: bold; }
        
        .toggles-row { display: flex; gap: 12px; flex-wrap: wrap; }
        .toggle-item-lbl { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: #cbd5e1; cursor: pointer; }
        .toggle-item-lbl input { accent-color: #a855f7; cursor: pointer; }
        
        .input-fields-group { display: flex; flex-direction: column; gap: 6px; }
        .input-row { display: flex; align-items: center; background: #1e293b; border: 1px solid #334155; border-radius: 6px; overflow: hidden; }
        .input-tag { background: #0f172a; padding: 6px 10px; font-family: monospace; font-size: 0.7rem; color: #fb923c; border-right: 1px solid #334155; width: 65px; text-align: center; }
        .input-row input { background: transparent; border: none; padding: 6px 12px; color: white; font-size: 0.8rem; flex: 1; outline: none; }
        
        .skills-inline-form { display: flex; gap: 6px; margin-bottom: 8px; }
        .skills-inline-form input { background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 6px 12px; color: white; font-size: 0.8rem; flex: 1; outline: none; }
        .skills-inline-form button { background: #fb923c; border: none; color: black; padding: 0 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; }
        .skills-pills-wrap { display: flex; flex-wrap: wrap; gap: 6px; }
        .skill-item-pill { display: flex; align-items: center; gap: 6px; background: rgba(251, 146, 60, 0.1); border: 1px solid rgba(251, 146, 60, 0.2); color: #fb923c; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 100px; }
        .skill-item-pill .del-btn { background: transparent; border: none; color: #ef4444; font-size: 0.95rem; cursor: pointer; font-weight: bold; padding: 0; line-height: 1; }
        
        .links-editor-list { display: flex; flex-direction: column; gap: 6px; }
        .link-edit-row { display: flex; gap: 6px; }
        .link-edit-row input { background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 6px; color: white; font-size: 0.75rem; flex: 1; outline: none; }
        
        .builder-render-inspector-column { display: flex; flex-direction: column; gap: 16px; }
        .preview-inspector-toggles { display: flex; gap: 8px; border-bottom: 1px solid #1e293b; padding-bottom: 10px; }
        .preview-inspector-toggles button { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 6px 14px; font-size: 0.75rem; color: #cbd5e1; cursor: pointer; display: flex; align-items: center; gap: 6px; }
        .preview-inspector-toggles button.active { background: #a855f7; color: white; border-color: transparent; font-weight: bold; }
        
        .portfolio-preview-container { border-radius: 12px; overflow: hidden; border: 1px solid #1e293b; }
        .portfolio-render-box { min-height: 280px; max-height: 340px; overflow-y: auto; padding: 0; align-items: flex-start; justify-content: flex-start; display: block; }
        .portfolio-preview-body { padding: 20px; min-height: 100%; box-sizing: border-box; }
        
        .tag-omitted-banner { background: #fee2e2; border: 1px dashed #ef4444; color: #dc2626; font-size: 0.7rem; font-family: monospace; text-align: center; padding: 6px; border-radius: 4px; margin-bottom: 12px; font-weight: 700; }
        
        /* Previews Themes Styles */
        /* 1. Theme Modern Minimalist */
        .theme-modern { background: #f8fafc; color: #0f172a; font-family: 'Outfit', sans-serif; }
        .theme-modern .theme-header { border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 16px; }
        .theme-modern .theme-h1 { font-size: 1.4rem; font-weight: 800; margin: 0; color: #0f172a; }
        .theme-modern .theme-h3 { font-size: 0.85rem; font-weight: 600; color: #64748b; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 0.5px; }
        .theme-modern .theme-section { margin-bottom: 16px; }
        .theme-modern .theme-h2 { font-size: 0.95rem; font-weight: 700; color: #0f172a; border-left: 3px solid #3b82f6; padding-left: 8px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px; }
        .theme-modern .about-wrapper-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
        .theme-modern .theme-p { font-size: 0.8rem; color: #475569; margin: 0; line-height: 1.5; }
        .theme-modern .theme-img { width: 44px; height: 44px; border-radius: 50%; border: 1px solid #e2e8f0; object-fit: cover; }
        .theme-modern .theme-ul { margin: 0; padding-left: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
        .theme-modern .theme-li { font-size: 0.75rem; color: #475569; }
        .theme-modern .theme-links-row { display: flex; gap: 12px; }
        .theme-modern .theme-a { font-size: 0.75rem; color: #3b82f6; font-weight: 700; text-decoration: underline; }
        .theme-modern .theme-footer { border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: 20px; }
        .theme-modern .theme-p-footer { font-size: 0.65rem; color: #94a3b8; text-align: center; margin: 0; }
        
        /* 2. Theme Cyberpunk */
        .theme-cyberpunk { background: #05050a; color: #00ffcc; font-family: 'Courier New', monospace; border: 2px solid #ff0055; position: relative; }
        .theme-cyberpunk::before { content: 'SYSTEM SECURE'; position: absolute; top: 4px; right: 8px; font-size: 0.5rem; color: #ff0055; font-weight: 900; }
        .theme-cyberpunk .theme-header { border-bottom: 2px dashed #ff0055; padding-bottom: 8px; margin-bottom: 12px; }
        .theme-cyberpunk .theme-h1 { font-size: 1.25rem; font-weight: bold; color: #fff; text-shadow: 0 0 8px #ff0055; margin: 0; text-transform: uppercase; }
        .theme-cyberpunk .theme-h3 { font-size: 0.75rem; color: #00ffcc; margin: 2px 0 0 0; font-weight: bold; }
        .theme-cyberpunk .theme-section { margin-bottom: 14px; background: rgba(255,0,85,0.05); padding: 8px; border: 1px solid rgba(255,0,85,0.15); }
        .theme-cyberpunk .theme-h2 { font-size: 0.85rem; font-weight: bold; color: #ff0055; margin: 0 0 6px 0; text-transform: uppercase; }
        .theme-cyberpunk .about-wrapper-row { display: flex; justify-content: space-between; gap: 8px; }
        .theme-cyberpunk .theme-p { font-size: 0.75rem; color: #00ffcc; margin: 0; line-height: 1.4; }
        .theme-cyberpunk .theme-img { width: 40px; height: 40px; border-radius: 4px; border: 2px solid #00ffcc; filter: grayscale(1) contrast(1.2); }
        .theme-cyberpunk .theme-ul { margin: 0; padding-left: 14px; list-style-type: square; }
        .theme-cyberpunk .theme-li { font-size: 0.75rem; color: #00ffcc; }
        .theme-cyberpunk .theme-links-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .theme-cyberpunk .theme-a { font-size: 0.75rem; color: #fff; background: #ff0055; padding: 2px 6px; font-weight: bold; text-decoration: none; border-radius: 2px; }
        .theme-cyberpunk .theme-footer { border-top: 1px dashed #ff0055; padding-top: 6px; margin-top: 16px; }
        .theme-cyberpunk .theme-p-footer { font-size: 0.6rem; color: rgba(0,255,204,0.5); text-align: center; margin: 0; }

        /* 3. Theme Glassmorphism */
        .theme-glassmorphism { background: linear-gradient(135deg, #4f46e5 0%, #a855f7 100%); color: white; font-family: 'Inter', sans-serif; }
        .theme-glassmorphism .portfolio-preview-body { display: flex; flex-direction: column; gap: 10px; }
        .theme-glassmorphism .theme-header, .theme-glassmorphism .theme-section, .theme-glassmorphism .theme-footer { background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255,255,255,0.15); backdrop-filter: blur(10px); border-radius: 10px; padding: 12px; }
        .theme-glassmorphism .theme-h1 { font-size: 1.15rem; font-weight: 800; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.15); }
        .theme-glassmorphism .theme-h3 { font-size: 0.75rem; font-weight: 500; color: rgba(255,255,255,0.8); margin: 2px 0 0 0; }
        .theme-glassmorphism .theme-h2 { font-size: 0.85rem; font-weight: 700; color: #fb923c; margin: 0 0 6px 0; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px; }
        .theme-glassmorphism .about-wrapper-row { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
        .theme-glassmorphism .theme-p { font-size: 0.75rem; color: rgba(255,255,255,0.9); margin: 0; line-height: 1.4; }
        .theme-glassmorphism .theme-img { width: 38px; height: 38px; border-radius: 8px; border: 1.5px solid rgba(255,255,255,0.3); }
        .theme-glassmorphism .theme-ul { margin: 0; padding-left: 14px; }
        .theme-glassmorphism .theme-li { font-size: 0.75rem; color: rgba(255,255,255,0.9); }
        .theme-glassmorphism .theme-links-row { display: flex; gap: 8px; }
        .theme-glassmorphism .theme-a { font-size: 0.7rem; color: white; background: rgba(255,255,255,0.2); padding: 3px 8px; border-radius: 6px; font-weight: 600; border: 1px solid rgba(255,255,255,0.1); }
        .theme-glassmorphism .theme-p-footer { font-size: 0.6rem; color: rgba(255,255,255,0.7); text-align: center; margin: 0; }

        /* 4. Theme Green Terminal */
        .theme-terminal { background: #000; color: #00ff00; font-family: 'Consolas', monospace; }
        .theme-terminal .theme-header { border: 1px solid #00ff00; padding: 10px; margin-bottom: 12px; }
        .theme-terminal .theme-h1 { font-size: 1.2rem; font-weight: bold; margin: 0; text-transform: uppercase; }
        .theme-terminal .theme-h1::after { content: '_'; animation: blink-c 1s infinite; }
        @keyframes blink-c { 50% { opacity: 0; } }
        .theme-terminal .theme-h3 { font-size: 0.75rem; color: #00ff00; margin: 2px 0 0 0; opacity: 0.8; }
        .theme-terminal .theme-section { border: 1px solid #00ff00; padding: 10px; margin-bottom: 12px; }
        .theme-terminal .theme-h2 { font-size: 0.85rem; font-weight: bold; margin: 0 0 6px 0; text-transform: uppercase; border-bottom: 1px solid #00ff00; padding-bottom: 2px; }
        .theme-terminal .about-wrapper-row { display: flex; justify-content: space-between; gap: 8px; }
        .theme-terminal .theme-p { font-size: 0.75rem; color: #00ff00; margin: 0; line-height: 1.4; }
        .theme-terminal .theme-img { width: 38px; height: 38px; border: 1px solid #00ff00; filter: brightness(0.8) contrast(1.5) grayscale(1); image-rendering: pixelated; }
        .theme-terminal .theme-ul { margin: 0; padding-left: 14px; }
        .theme-terminal .theme-li { font-size: 0.75rem; color: #00ff00; }
        .theme-terminal .theme-li::before { content: '> '; }
        .theme-terminal .theme-links-row { display: flex; gap: 12px; }
        .theme-terminal .theme-a { font-size: 0.75rem; color: #00ff00; font-weight: bold; border: 1px solid #00ff00; padding: 2px 8px; text-decoration: none; }
        .theme-terminal .theme-footer { border: 1px solid #00ff00; padding: 6px; margin-top: 12px; }
        .theme-terminal .theme-p-footer { font-size: 0.6rem; color: #00ff00; text-align: center; margin: 0; }
        
        .portfolio-html-panel { max-height: 380px; }
        .generated-pre { padding: 12px; margin: 0; overflow: auto; max-height: 320px; font-size: 0.75rem; color: #4ade80; }
        
        .audit-checklist-card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 14px; }
        .checklist-title { font-size: 0.8rem; font-weight: 700; color: #cbd5e1; display: flex; align-items: center; gap: 8px; margin: 0 0 10px 0; text-transform: uppercase; border-bottom: 1px solid #334155; padding-bottom: 6px; }
        .checks-vertical-rail { display: flex; flex-direction: column; gap: 6px; }
        .check-card-item { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 8px; border: 1px solid transparent; font-size: 0.75rem; }
        .check-card-item.pass { background: rgba(16, 185, 129, 0.05); border-color: rgba(16, 185, 129, 0.1); color: #4ade80; }
        .check-card-item.fail { background: rgba(239, 68, 68, 0.05); border-color: rgba(239, 68, 68, 0.1); color: #f87171; }
        
        .check-icon-circle { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .check-icon-circle.pass { background: #10b981; box-shadow: 0 0 6px #10b981; }
        .check-icon-circle.fail { background: #ef4444; box-shadow: 0 0 6px #ef4444; }
        .check-text { font-weight: 600; }
        
        @media(max-width: 1024px) {
          .portfolio-builder-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};

