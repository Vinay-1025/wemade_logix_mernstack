import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ArrayMethodsViz = () => {
  const [data, setData] = useState([10, 25, 5, 40, 15]);
  const [method, setMethod] = useState('none');
  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const runMethod = async (type) => {
    setIsProcessing(true);
    setMethod(type);
    setResult(null);
    await new Promise(r => setTimeout(r, 800));

    let res;
    if (type === 'map') res = data.map(n => n * 2);
    if (type === 'filter') res = data.filter(n => n > 20);
    if (type === 'reduce') res = data.reduce((acc, n) => acc + n, 0);

    setResult(res);
    setIsProcessing(false);
  };

  return (
    <div className="array-viz">
      <div className="viz-controls">
        <button className={method === 'map' ? 'active' : ''} onClick={() => runMethod('map')}>.map(n =&gt; n*2)</button>
        <button className={method === 'filter' ? 'active' : ''} onClick={() => runMethod('filter')}>.filter(n =&gt; n&gt;20)</button>
        <button className={method === 'reduce' ? 'active' : ''} onClick={() => runMethod('reduce')}>.reduce((acc, n) =&gt; acc+n)</button>
      </div>

      <div className="array-display">
        <div className="array-row">
          <span className="label">Original:</span>
          <div className="items">
            {data.map((n, i) => <div key={i} className="item">{n}</div>)}
          </div>
        </div>

        <div className="arrow-down">↓</div>

        <div className="array-row result">
          <span className="label">Result:</span>
          <div className="items">
            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Processing...</motion.div>
              ) : result !== null ? (
                Array.isArray(result) ? (
                  result.map((n, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="item result-item"
                    >
                      {n}
                    </motion.div>
                  ))
                ) : (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="item result-item reduce-val">{result}</motion.div>
                )
              ) : (
                <div className="placeholder">Choose a method</div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .array-viz { padding: 20px; color: white; }
        .viz-controls {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }
        .viz-controls button {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--app-border);
          color: var(--app-text);
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-family: monospace;
          transition: all 0.3s;
        }
        .viz-controls button:hover { background: rgba(255,255,255,0.1); }
        .viz-controls button.active {
          background: var(--brand-gradient);
          color: white;
          border-color: transparent;
        }
        .array-display {
          background: #0f172a;
          padding: 30px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .array-row {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .label {
          width: 80px;
          font-size: 0.8rem;
          color: var(--text-neutral);
          text-transform: uppercase;
        }
        .items {
          display: flex;
          gap: 12px;
          min-height: 50px;
          align-items: center;
        }
        .item {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--app-border);
          border-radius: 8px;
          font-weight: bold;
          font-family: monospace;
        }
        .arrow-down {
          margin: 15px 0 15px 100px;
          color: var(--primary-cyan);
          font-size: 1.5rem;
        }
        .result-item {
          background: var(--brand-gradient);
          border-color: transparent;
        }
        .reduce-val {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          font-size: 1.2rem;
          background: #facc15;
          color: #000;
        }
        .placeholder { color: #475569; font-style: italic; }
      `}} />
    </div>
  );
};

export default ArrayMethodsViz;
