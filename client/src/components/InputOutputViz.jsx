import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Monitor, MessageSquare } from 'lucide-react';

const InputOutputViz = () => {
  const [logs, setLogs] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptVal, setPromptVal] = useState('');
  const [lastInput, setLastInput] = useState('');

  const handleAlert = () => {
    alert("This is a standard Browser Alert!");
    setLogs(prev => [...prev, 'System: Alert displayed']);
  };

  const handlePrompt = () => {
    setShowPrompt(true);
  };

  const submitPrompt = () => {
    setLastInput(promptVal);
    setLogs(prev => [...prev, `Input received: "${promptVal}"`]);
    setShowPrompt(false);
    setPromptVal('');
  };

  const handleConsole = () => {
    const msg = `Hello at ${new Date().toLocaleTimeString()}`;
    setLogs(prev => [...prev, `console.log: ${msg}`]);
  };

  return (
    <div className="io-viz">
      <div className="io-grid">
        {/* Mock Browser Window */}
        <div className="mock-browser">
          <div className="browser-header">
            <div className="dots"><span></span><span></span><span></span></div>
            <div className="address-bar">localhost:3000</div>
          </div>
          <div className="browser-content">
            <h3>Web Application</h3>
            <p>Interactive Input/Output Demo</p>
            
            <div className="action-buttons">
              <button className="btn btn-primary" onClick={handleAlert}>Trigger alert()</button>
              <button className="btn btn-secondary" onClick={handlePrompt}>Trigger prompt()</button>
              <button className="btn btn-outline" onClick={handleConsole}>Trigger console.log()</button>
            </div>

            {lastInput && (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="input-display">
                Last Input: <strong>{lastInput}</strong>
              </motion.div>
            )}

            <AnimatePresence>
              {showPrompt && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="prompt-overlay"
                >
                  <motion.div 
                    initial={{ y: -50, scale: 0.9 }} 
                    animate={{ y: 0, scale: 1 }}
                    className="prompt-dialog"
                  >
                    <div className="dialog-header">System Prompt</div>
                    <div className="dialog-body">
                      <p>What is your name?</p>
                      <input 
                        type="text" 
                        autoFocus
                        value={promptVal} 
                        onChange={e => setPromptVal(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && submitPrompt()}
                      />
                      <div className="dialog-btns">
                        <button onClick={() => setShowPrompt(false)}>Cancel</button>
                        <button className="primary" onClick={submitPrompt}>OK</button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mock DevTools Console */}
        <div className="mock-console">
          <div className="console-header">
            <Terminal size={14} />
            <span>Developer Tools - Console</span>
          </div>
          <div className="console-body">
            {logs.map((log, i) => (
              <div key={i} className="console-line">
                <span className="prompt-char">&gt;</span>
                <span className="log-msg">{log}</span>
              </div>
            ))}
            {logs.length === 0 && <div className="console-placeholder">Console is empty. Trigger an action above!</div>}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .io-viz { padding: 20px; }
        .io-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        
        .mock-browser { background: #f1f5f9; border-radius: 12px; overflow: hidden; border: 1px solid #cbd5e1; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .browser-header { background: #f8fafc; padding: 10px; display: flex; align-items: center; gap: 15px; }
        .dots { display: flex; gap: 5px; }
        .dots span { width: 8px; height: 8px; border-radius: 50%; background: #475569; }
        .address-bar { background: #f1f5f9; border-radius: 4px; padding: 2px 10px; font-size: 0.6rem; color: #64748b; flex: 1; }
        .browser-content { padding: 30px; text-align: center; position: relative; min-height: 250px; }
        .action-buttons { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
        .input-display { margin-top: 20px; padding: 10px; background: rgba(74, 222, 128, 0.1); border-radius: 8px; color: #16a34a; font-size: 0.9rem; }
        
        .prompt-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 10; }
        .prompt-dialog { background: #fff; color: #cbd5e1; width: 250px; border-radius: 8px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); text-align: left; overflow: hidden; }
        .dialog-header { background: #f1f5f9; padding: 8px 15px; font-size: 0.75rem; font-weight: bold; border-bottom: 1px solid #e2e8f0; }
        .dialog-body { padding: 15px; }
        .dialog-body p { margin: 0 0 10px 0; font-size: 0.85rem; }
        .dialog-body input { width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; margin-bottom: 15px; }
        .dialog-btns { display: flex; justify-content: flex-end; gap: 8px; }
        .dialog-btns button { background: transparent; border: none; font-size: 0.75rem; font-weight: bold; color: #64748b; cursor: pointer; }
        .dialog-btns button.primary { color: #3b82f6; }
        
        .mock-console { background: #e2e8f0; border-radius: 12px; border: 1px solid #cbd5e1; display: flex; flex-direction: column; height: 320px; }
        .console-header { background: #f1f5f9; padding: 8px 15px; font-size: 0.7rem; display: flex; align-items: center; gap: 10px; color: #64748b; border-bottom: 1px solid #cbd5e1; text-transform: uppercase; }
        .console-body { padding: 15px; flex: 1; overflow-y: auto; font-family: monospace; font-size: 0.8rem; }
        .console-line { display: flex; gap: 10px; margin-bottom: 5px; }
        .prompt-char { color: #475569; }
        .log-msg { color: #16a34a; }
        .console-placeholder { color: #475569; text-align: center; margin-top: 50px; font-style: italic; }
      `}} />
    </div>
  );
};

export default InputOutputViz;
