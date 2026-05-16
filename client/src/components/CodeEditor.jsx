import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Layout, Code2, Monitor } from 'lucide-react';

const CodeEditor = ({ initialCode, onChange, tabs = ['html', 'css', 'js'], readOnly = false }) => {
  const [code, setCode] = useState(initialCode);
  const [activeTab, setActiveTab] = useState(tabs[0] || 'html');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

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

  const handleEditorChange = (value) => {
    const newCode = { ...code, [activeTab]: value };
    setCode(newCode);
    if (onChange) {
      onChange(newCode);
    }
  };

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

      <div className="editor-main">
        <div className="code-panel">
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
        
        <div className="preview-panel">
          <div className="preview-header">
            <Monitor size={14} /> <span>Live Preview</span>
          </div>
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

      <style dangerouslySetInnerHTML={{ __html: `
        .editor-container {
          display: flex;
          flex-direction: column;
          height: 500px;
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
          display: grid;
          grid-template-columns: 1fr 1fr;
          flex: 1;
          min-height: 0;
        }
        .code-panel {
          border-right: 1px solid #333;
        }
        .preview-panel {
          background: white;
          display: flex;
          flex-direction: column;
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
        @media (max-width: 1024px) {
          .editor-main {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr;
          }
          .editor-container { height: 700px; }
        }
        @media (max-width: 480px) {
          .editor-container { height: 500px; margin: 0; border-radius: 0; }
          .tab-btn { padding: 6px 10px; font-size: 0.75rem; }
          .editor-header { padding: 6px 10px; }
        }
      `}} />
    </div>
  );
};

export default CodeEditor;
