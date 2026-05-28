import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LogicFlowViz = () => {
  const [activeTab, setActiveTab] = useState('ifelse');
  const [val, setVal] = useState(18);

  const renderIfElse = () => (
    <div className="flowchart">
      <div className="flow-node start">Start</div>
      <div className="connector"></div>
      <div className={`flow-node condition ${val >= 18 ? 'pass' : 'fail'}`}>
        <span>age &gt;= 18? ({val})</span>
      </div>
      <div className="flow-branches">
        <div className="branch">
          <div className={`connector angled left ${val >= 18 ? 'highlight' : ''}`}></div>
          <div className={`flow-node result ${val >= 18 ? 'success' : ''}`}>Can Vote ✅</div>
        </div>
        <div className="branch">
          <div className={`connector angled right ${val < 18 ? 'highlight' : ''}`}></div>
          <div className={`flow-node result ${val < 18 ? 'error' : ''}`}>Cannot Vote ❌</div>
        </div>
      </div>
    </div>
  );

  const renderSwitch = () => (
    <div className="switch-machine">
      <div className="machine-header">Switch Case Machine</div>
      <div className="input-tunnel">
        <motion.div 
          key={val}
          className="value-ball"
          initial={{ y: 0, opacity: 0 }}
          animate={{ x: val >= 90 ? -100 : val >= 75 ? 0 : 100, y: 100, opacity: 1 }}
          transition={{ duration: 0.5, ease: "bounceOut" }}
        >
          {val}
        </motion.div>
      </div>
      <div className="buckets">
        <div className={`bucket ${val >= 90 ? 'active' : ''}`}>
          <div className="bucket-label">Case A</div>
          <div className="bucket-body">Excellent</div>
        </div>
        <div className={`bucket ${val >= 75 && val < 90 ? 'active' : ''}`}>
          <div className="bucket-label">Case B</div>
          <div className="bucket-body">Good</div>
        </div>
        <div className={`bucket ${val < 75 ? 'active' : ''}`}>
          <div className="bucket-label">Default</div>
          <div className="bucket-body">Study</div>
        </div>
      </div>
    </div>
  );

  const renderTernary = () => (
    <div className="ternary-machine">
      <div className="t-input-zone">
        <div className="t-val-box">Value: {val}</div>
      </div>
      <div className="t-gate-zone">
        <div className="gate-connector"></div>
        <motion.div 
          className="gate-pivot"
          animate={{ rotate: val >= 18 ? 45 : -45 }}
        >
          <div className="pivot-arm"></div>
        </motion.div>
      </div>
      <div className="t-output-zone">
        <div className={`t-output-box ${val >= 18 ? 'active' : ''}`}>Adult</div>
        <div className={`t-output-box ${val < 18 ? 'active' : ''}`}>Minor</div>
      </div>
      <div className="ternary-code">
        <code>({val} &gt;= 18) ? "Adult" : "Minor"</code>
      </div>
    </div>
  );

  return (
    <div className="logic-viz">
      <div className="viz-tabs">
        <button className={activeTab === 'ifelse' ? 'active' : ''} onClick={() => setActiveTab('ifelse')}>if / else</button>
        <button className={activeTab === 'switch' ? 'active' : ''} onClick={() => setActiveTab('switch')}>switch</button>
        <button className={activeTab === 'ternary' ? 'active' : ''} onClick={() => setActiveTab('ternary')}>ternary</button>
      </div>

      <div className="logic-input">
        <label>Input Value: {val}</label>
        <input type="range" min="0" max="100" value={val} onChange={e => setVal(parseInt(e.target.value))} />
      </div>

      <div className="viz-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'ifelse' && renderIfElse()}
            {activeTab === 'switch' && renderSwitch()}
            {activeTab === 'ternary' && renderTernary()}
          </motion.div>
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .logic-viz { padding: 20px; color: #333; display: flex; flex-direction: column; align-items: center; min-height: 450px; }
        .viz-tabs { display: flex; gap: 10px; margin-bottom: 25px; }
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
        .viz-tabs button.active { background: var(--brand-gradient); color: #333; border-color: transparent; }
        .logic-input { display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 300px; margin-bottom: 40px; text-align: center; }
        
        /* if/else flow */
        .flowchart { display: flex; flex-direction: column; align-items: center; position: relative; }
        .flow-node { padding: 12px 24px; background: rgba(0, 0, 0,0.05); border: 1px solid var(--app-border); border-radius: 8px; font-family: monospace; z-index: 1; }
        .flow-node.start { border-radius: 50px; background: #64748b; font-size: 0.8rem; }
        .flow-node.condition { background: #f8fafc; border-color: var(--primary-cyan); }
        .connector { width: 2px; height: 30px; background: #475569; }
        .flow-branches { display: flex; gap: 40px; }
        .branch { display: flex; flex-direction: column; align-items: center; }
        .connector.angled { width: 40px; height: 30px; border-top: 2px solid #475569; }
        .connector.angled.left { border-left: 2px solid #475569; border-top-left-radius: 8px; margin-right: -40px; }
        .connector.angled.right { border-right: 2px solid #475569; border-top-right-radius: 8px; margin-left: -40px; }
        .connector.highlight { border-color: var(--primary-cyan); }
        .flow-node.result { font-size: 0.8rem; }
        .flow-node.result.success { background: #166534; border-color: #16a34a; }
        .flow-node.result.error { background: #991b1b; border-color: #dc2626; }

        /* switch machine */
        .switch-machine { background: #f8fafc; padding: 20px; border-radius: 20px; border: 1px solid rgba(0, 0, 0,0.1); width: 100%; max-width: 400px; position: relative; }
        .machine-header { font-size: 0.7rem; text-transform: uppercase; color: var(--primary-cyan); text-align: center; margin-bottom: 20px; }
        .input-tunnel { height: 100px; position: relative; border-left: 4px solid #cbd5e1; border-right: 4px solid #cbd5e1; margin: 0 auto; width: 40px; }
        .value-ball { 
          width: 30px; height: 30px; background: var(--brand-gradient); border-radius: 50%; 
          display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: bold;
          position: absolute; left: 5px; top: 0;
        }
        .buckets { display: flex; justify-content: space-between; margin-top: 20px; gap: 10px; }
        .bucket { flex: 1; height: 80px; border: 2px solid #cbd5e1; border-top: none; border-radius: 0 0 15px 15px; position: relative; transition: all 0.3s; padding: 10px; text-align: center; }
        .bucket.active { border-color: #16a34a; background: rgba(74, 222, 128, 0.1); transform: translateY(5px); }
        .bucket-label { font-size: 0.6rem; color: #64748b; margin-bottom: 5px; }
        .bucket-body { font-size: 0.75rem; font-weight: bold; }

        /* ternary gate */
        .ternary-machine { text-align: center; background: #f8fafc; padding: 30px; border-radius: 20px; border: 1px solid rgba(0, 0, 0,0.1); width: 100%; max-width: 400px; }
        .t-val-box { background: var(--brand-gradient); padding: 5px 15px; border-radius: 15px; display: inline-block; font-size: 0.9rem; font-weight: bold; }
        .t-gate-zone { height: 80px; position: relative; display: flex; flex-direction: column; align-items: center; }
        .gate-connector { width: 2px; height: 20px; background: #475569; }
        .gate-pivot { width: 4px; height: 50px; background: #db2777; position: relative; transform-origin: top center; border-radius: 2px; box-shadow: 0 0 10px rgba(244, 114, 182, 0.5); }
        .gate-pivot::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: -3px;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 8px solid #db2777;
        }
        .t-output-zone { display: flex; justify-content: space-around; margin-top: 20px; }
        .t-output-box { padding: 10px 20px; border: 1px solid #cbd5e1; border-radius: 10px; color: #475569; transition: all 0.3s; font-weight: bold; }
        .t-output-box.active { border-color: #16a34a; color: #16a34a; background: rgba(74, 222, 128, 0.1); transform: scale(1.1); }
        .ternary-code { margin-top: 30px; font-family: monospace; color: var(--primary-cyan); font-size: 0.8rem; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px; }
      `}} />
    </div>
  );
};

export default LogicFlowViz;
