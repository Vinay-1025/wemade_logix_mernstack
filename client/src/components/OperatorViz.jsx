import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OperatorViz = () => {
  const [valA, setValA] = useState(10);
  const [valB, setValB] = useState(5);
  const [activeCat, setActiveCat] = useState('arithmetic');

  const categories = {
    arithmetic: [
      { op: '+', name: 'Addition', calc: (a, b) => a + b },
      { op: '-', name: 'Subtraction', calc: (a, b) => a - b },
      { op: '*', name: 'Multiplication', calc: (a, b) => a * b },
      { op: '/', name: 'Division', calc: (a, b) => (a / b).toFixed(2) },
      { op: '%', name: 'Remainder', calc: (a, b) => a % b }
    ],
    comparison: [
      { op: '==', name: 'Equal', calc: (a, b) => (a == b).toString() },
      { op: '===', name: 'Strict Equal', calc: (a, b) => (a === b).toString() },
      { op: '>', name: 'Greater Than', calc: (a, b) => (a > b).toString() },
      { op: '<', name: 'Less Than', calc: (a, b) => (a < b).toString() },
      { op: '!=', name: 'Not Equal', calc: (a, b) => (a != b).toString() }
    ],
    logical: [
      { op: '&&', name: 'AND', calc: (a, b) => (a > 0 && b > 0).toString(), desc: '(A>0 && B>0)' },
      { op: '||', name: 'OR', calc: (a, b) => (a > 0 || b > 0).toString(), desc: '(A>0 || B>0)' },
      { op: '!', name: 'NOT', calc: (a, b) => (!(a > 0)).toString(), desc: '!(A>0)' }
    ]
  };

  return (
    <div className="operator-viz">
      <div className="input-row">
        <div className="input-group">
          <label>Variable A</label>
          <input type="number" value={valA} onChange={e => setValA(parseInt(e.target.value) || 0)} />
        </div>
        <div className="input-group">
          <label>Variable B</label>
          <input type="number" value={valB} onChange={e => setValB(parseInt(e.target.value) || 0)} />
        </div>
      </div>

      <div className="viz-tabs">
        {Object.keys(categories).map(cat => (
          <button 
            key={cat} 
            className={activeCat === cat ? 'active' : ''} 
            onClick={() => setActiveCat(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="results-grid">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid-container"
          >
            {categories[activeCat].map((item) => (
              <div key={item.op} className="op-card">
                <div className="op-header">
                  <span className="op-symbol">{item.op}</span>
                  <span className="op-name">{item.name}</span>
                </div>
                <div className="op-expr">
                  {item.desc ? item.desc : `${valA} ${item.op} ${valB}`}
                </div>
                <div className={`op-result ${item.calc(valA, valB) === 'true' ? 'truthy' : item.calc(valA, valB) === 'false' ? 'falsy' : ''}`}>
                  Result: {item.calc(valA, valB)}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .operator-viz { padding: 20px; color: #333; background: #ffffff; width: 100%; height: 100%; min-height: 400px; box-sizing: border-box; }
        .input-row { display: flex; gap: 20px; justify-content: center; margin-bottom: 20px; }
        .input-group { display: flex; flex-direction: column; gap: 5px; }
        .input-group label { font-size: 0.75rem; color: var(--text-neutral); text-transform: uppercase; }
        .input-group input { 
          background: #f8fafc; 
          border: 1px solid var(--app-border); 
          color: #333; 
          padding: 8px; 
          border-radius: 6px; 
          width: 80px;
          text-align: center;
        }
        .viz-tabs { display: flex; gap: 10px; justify-content: center; margin-bottom: 30px; }
        .viz-tabs button {
          background: transparent;
          border: 1px solid var(--app-border);
          color: var(--text-neutral);
          padding: 6px 15px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.75rem;
          transition: all 0.3s;
        }
        .viz-tabs button.active {
          background: var(--brand-gradient);
          color: #333;
          border-color: transparent;
          box-shadow: var(--glow);
        }
        .grid-container { 
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); 
          gap: 15px; 
         align-items: stretch; justify-items: center; }
        .op-card {
          background: rgba(0, 0, 0,0.03);
          border: 1px solid rgba(0, 0, 0,0.05);
          padding: 15px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .op-header { display: flex; align-items: center; gap: 10px; }
        .op-symbol { 
          width: 32px; 
          height: 32px; 
          background: rgba(0, 209, 209, 0.1); 
          color: var(--primary-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-family: monospace;
          font-weight: bold;
        }
        .op-name { font-size: 0.8rem; font-weight: 600; }
        .op-expr { font-family: monospace; font-size: 0.75rem; color: var(--text-neutral); }
        .op-result { font-size: 0.85rem; font-weight: bold; margin-top: auto; }
        .op-result.truthy { color: #16a34a; }
        .op-result.falsy { color: #dc2626; }
      `}} />
    </div>
  );
};

export default OperatorViz;
