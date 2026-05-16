import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScopeHoistingViz = () => {
  const [phase, setPhase] = useState('memory'); // memory, execution
  const [variables, setVariables] = useState([
    { name: 'v1', type: 'var', value: 'undefined', hoisted: true },
    { name: 'l1', type: 'let', value: '<TDZ>', hoisted: false },
    { name: 'f1', type: 'func', value: 'ƒ code...', hoisted: true }
  ]);

  const togglePhase = () => {
    setPhase(prev => prev === 'memory' ? 'execution' : 'memory');
    if (phase === 'memory') {
      setVariables(prev => prev.map(v => ({
        ...v,
        value: v.name === 'v1' ? '10' : v.name === 'l1' ? '20' : v.value
      })));
    } else {
      setVariables([
        { name: 'v1', type: 'var', value: 'undefined', hoisted: true },
        { name: 'l1', type: 'let', value: '<TDZ>', hoisted: false },
        { name: 'f1', type: 'func', value: 'ƒ code...', hoisted: true }
      ]);
    }
  };

  return (
    <div className="scope-viz">
      <div className="viz-controls">
        <button className="btn btn-primary" onClick={togglePhase}>
          Switch to {phase === 'memory' ? 'Execution Phase' : 'Memory Phase'}
        </button>
      </div>

      <div className="memory-grid">
        <div className="env-record">
          <h4>Environment Record ({phase === 'memory' ? 'Creation' : 'Execution'})</h4>
          <div className="var-list">
            <AnimatePresence>
              {variables.map((v) => (
                <motion.div 
                  key={v.name} 
                  className={`var-item ${v.hoisted ? 'hoisted' : ''}`}
                  layout
                >
                  <span className="var-type">{v.type}</span>
                  <span className="var-name">{v.name}</span>
                  <span className="var-sep">:</span>
                  <motion.span 
                    key={v.value}
                    initial={{ scale: 1.5, color: '#facc15' }}
                    animate={{ scale: 1, color: '#fff' }}
                    className="var-value"
                  >
                    {v.value}
                  </motion.span>
                  {phase === 'memory' && v.hoisted && <span className="hoist-tag">Hoisted!</span>}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="code-sync">
          <h4>Source Code</h4>
          <pre>
{`var v1 = 10;
let l1 = 20;

function f1() {
  console.log("Hello");
}`}
          </pre>
          <div className="phase-explanation">
            {phase === 'memory' 
              ? "Creation Phase: Engine allocates memory. 'var' is initialized as undefined. 'let' is hoisted but stays in the Temporal Dead Zone (TDZ)."
              : "Execution Phase: Engine runs code line-by-line and assigns actual values to the variables."}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scope-viz { padding: 20px; color: white; }
        .memory-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
        .env-record { 
          background: rgba(15, 23, 42, 0.8); 
          padding: 20px; 
          border-radius: 12px; 
          border: 1px solid var(--primary-cyan);
          box-shadow: 0 0 20px rgba(0, 209, 209, 0.1);
        }
        .env-record h4 { margin-top: 0; color: var(--primary-cyan); }
        .var-list { display: flex; flex-direction: column; gap: 12px; }
        .var-item { 
          display: flex; 
          align-items: center; 
          gap: 10px; 
          padding: 8px 12px; 
          background: rgba(255,255,255,0.05); 
          border-radius: 6px;
          font-family: monospace;
          position: relative;
        }
        .var-item.hoisted { border-left: 3px solid #facc15; }
        .var-type { color: #f472b6; font-weight: bold; }
        .var-name { color: #4ade80; }
        .var-value { color: #fff; }
        .hoist-tag { 
          position: absolute; 
          right: 10px; 
          font-size: 0.6rem; 
          background: #facc15; 
          color: #000; 
          padding: 2px 4px; 
          border-radius: 3px; 
          font-weight: bold;
        }
        .code-sync pre { 
          background: #0f172a; 
          padding: 15px; 
          border-radius: 8px; 
          font-size: 0.85rem;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .phase-explanation { 
          margin-top: 15px; 
          font-size: 0.85rem; 
          color: var(--text-neutral); 
          line-height: 1.5;
          padding: 10px;
          background: rgba(0, 209, 209, 0.05);
          border-radius: 6px;
        }
      `}} />
    </div>
  );
};

export default ScopeHoistingViz;
