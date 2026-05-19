import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Layout, Code2, Monitor } from 'lucide-react';

const CodeEditor = ({ initialCode, onChange, tabs = ['html', 'css', 'js'], readOnly = false }) => {
  const safeInitialCode = initialCode || { html: '', css: '', js: '' };
  const [code, setCode] = useState(safeInitialCode);
  const [activeTab, setActiveTab] = useState(tabs[0] || 'html');
  const [srcDoc, setSrcDoc] = useState('');
  
  const [splitRatio, setSplitRatio] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const containerRef = useRef(null);

  useEffect(() => {
    setCode(initialCode || { html: '', css: '', js: '' });
  }, [initialCode]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${code.html || ''}</body>
          <style>${code.css || ''}</style>
          <script>${code.js || ''}</script>
        </html>
      `);
    }, 500);

    return () => clearTimeout(timeout);
  }, [code]);

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

  const handleEditorChange = (value) => {
    const newCode = { ...code, [activeTab]: value };
    setCode(newCode);
    if (onChange) {
      onChange(newCode);
    }
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
          {tabs.includes('html') && (
            <button 
              className={`tab-btn ${activeTab === 'html' ? 'active' : ''}`}
              onClick={() => setActiveTab('html')}
            >
              HTML
            </button>
          )}
          {tabs.includes('css') && (
            <button 
              className={`tab-btn ${activeTab === 'css' ? 'active' : ''}`}
              onClick={() => setActiveTab('css')}
            >
              CSS
            </button>
          )}
          {tabs.includes('js') && (
            <button 
              className={`tab-btn ${activeTab === 'js' ? 'active' : ''}`}
              onClick={() => setActiveTab('js')}
            >
              JS
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
          >
            <Play size={14} /> Run
          </button>
        </div>
      </div>

      <div className="editor-main" ref={containerRef}>
        <div className="code-panel" style={codePanelStyle}>
          <Editor
            height="100%"
            language={activeTab === 'js' ? 'javascript' : activeTab}
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

        <div className="preview-panel" style={previewPanelStyle}>
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
          .editor-container { height: 800px; }
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
        @media (max-width: 480px) {
          .editor-container { height: 600px; margin: 0; border-radius: 0; }
          .tab-btn { padding: 6px 10px; font-size: 0.75rem; }
          .editor-header { padding: 6px 10px; }
        }
      `}} />
    </div>
  );
};

export default CodeEditor;
