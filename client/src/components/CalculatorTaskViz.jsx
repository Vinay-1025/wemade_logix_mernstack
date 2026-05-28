import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, History, CheckCircle2 } from 'lucide-react';

const CalculatorTaskViz = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(false);

  const calculate = async (op) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    
    if (isNaN(n1) || isNaN(n2)) {
      setError(true);
      setTimeout(() => setError(false), 500);
      return;
    }

    let res;
    switch(op) {
      case '+': res = n1 + n2; break;
      case '-': res = n1 - n2; break;
      case '*': res = n1 * n2; break;
      case '/': res = n1 / n2; break;
    }

    setResult(res);
    setIsSending(true);
    
    // Simulate data travel to log
    await new Promise(r => setTimeout(r, 600));
    
    const logEntry = `${n1} ${op} ${n2} = ${res}`;
    setLogs(prev => [logEntry, ...prev]);
    setIsSending(false);
  };

  return (
    <div className="task-viz">
      <div className="task-header">
        <CheckCircle2 size={20} color="#4ade80" />
        <h3>Objective: Build a calculator that logs history to the console</h3>
      </div>

      <div className="task-grid">
        {/* The Calculator UI */}
        <motion.div 
          className="calc-card"
          animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="calc-display">
            <div className="display-prev">{num1} {num1 && num2 ? '...' : ''}</div>
            <AnimatePresence mode="wait">
              <motion.div 
                key={result}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="display-main"
              >
                {result !== null ? result : num2 || '0'}
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="calc-inputs">
            <div className="input-group">
              <label>Number 1</label>
              <input type="number" value={num1} onChange={e => {setNum1(e.target.value); setResult(null);}} placeholder="10" />
            </div>
            <div className="input-group">
              <label>Number 2</label>
              <input type="number" value={num2} onChange={e => {setNum2(e.target.value); setResult(null);}} placeholder="5" />
            </div>
          </div>

          <div className="calc-operators">
            {['+', '-', '*', '/'].map(op => (
              <motion.button 
                key={op}
                whileTap={{ scale: 0.9 }}
                onClick={() => calculate(op)}
              >
                {op === '*' ? '×' : op === '/' ? '÷' : op}
              </motion.button>
            ))}
          </div>

          {/* Animation Beam */}
          <AnimatePresence>
            {isSending && (
              <motion.div 
                className="data-beam"
                initial={{ left: '50%', top: '50%', opacity: 0, scale: 0 }}
                animate={{ left: '120%', top: '30%', opacity: 1, scale: [1, 1.5, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeIn" }}
              >
                <div className="beam-particle"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* The Console/History Log */}
        <div className="history-card">
          <div className="history-header">
            <History size={16} />
            <span>Calculation History (Log)</span>
          </div>
          <div className="history-body">
            <AnimatePresence>
              {logs.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="history-item"
                >
                  <span className="log-prefix">&gt; console.log:</span>
                  <span className="log-text">{log}</span>
                </motion.div>
              ))}
              {logs.length === 0 && <div className="history-empty">Perform a calculation to see the log...</div>}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .task-viz { padding: 20px; }
        .task-header { display: flex; align-items: center; gap: 10px; margin-bottom: 25px; background: rgba(74, 222, 128, 0.05); padding: 15px; border-radius: 12px; border: 1px solid rgba(74, 222, 128, 0.1); }
        .task-header h3 { margin: 0; font-size: 0.95rem; color: #16a34a; }
        
        .task-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
        
        .calc-card { background: #f1f5f9; border-radius: 20px; padding: 25px; border: 1px solid #cbd5e1; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
        .calc-display { background: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 20px; text-align: right; }
        .display-prev { font-size: 0.75rem; color: #475569; min-height: 1rem; }
        .display-main { font-size: 1.8rem; font-weight: bold; color: #333; font-family: monospace; }
        
        .calc-inputs { display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px; }
        .input-group label { display: block; font-size: 0.65rem; color: #64748b; text-transform: uppercase; margin-bottom: 5px; }
        .input-group input { width: 100%; background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; border-radius: 8px; color: #333; font-size: 0.9rem; }
        
        .calc-operators { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .calc-operators button { background: var(--brand-gradient); border: none; color: #333; padding: 12px; border-radius: 8px; font-size: 1.2rem; cursor: pointer; transition: transform 0.2s; }
        .calc-operators button:hover { transform: scale(1.05); opacity: 0.9; }
        
        /* Data Beam Animation */
        .data-beam {
          position: absolute;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 100;
        }
        .beam-particle {
          width: 15px;
          height: 15px;
          background: #16a34a;
          border-radius: 50%;
          box-shadow: 0 0 20px #16a34a, 0 0 40px #16a34a;
          filter: blur(2px);
        }

        .history-card { background: #e2e8f0; border-radius: 20px; overflow: hidden; border: 1px solid #cbd5e1; display: flex; flex-direction: column; position: relative; }
        .history-header { background: #f1f5f9; padding: 12px 20px; display: flex; align-items: center; gap: 10px; color: #64748b; font-size: 0.8rem; border-bottom: 1px solid #cbd5e1; }
        .history-body { padding: 20px; flex: 1; overflow-y: auto; height: 350px; }
        .history-item { margin-bottom: 10px; font-family: monospace; font-size: 0.85rem; padding-bottom: 8px; border-bottom: 1px solid #1e293b; }
        .log-prefix { color: #475569; margin-right: 8px; }
        .log-text { color: #16a34a; }
        .history-empty { color: #475569; text-align: center; margin-top: 100px; font-style: italic; font-size: 0.85rem; }
      `}} />
    </div>
  );
};

export default CalculatorTaskViz;
