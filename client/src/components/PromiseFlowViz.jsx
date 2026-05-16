import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PromiseFlowViz = () => {
  const [status, setStatus] = useState('idle'); // idle, pending, resolved, rejected

  const startPromise = (outcome) => {
    setStatus('pending');
    setTimeout(() => {
      setStatus(outcome);
    }, 2000);
  };

  const reset = () => setStatus('idle');

  return (
    <div className="promise-viz">
      <div className="viz-controls">
        <button className="btn" onClick={() => startPromise('resolved')} disabled={status !== 'idle'}>Resolve Promise</button>
        <button className="btn btn-danger" onClick={() => startPromise('rejected')} disabled={status !== 'idle'}>Reject Promise</button>
        <button className="btn btn-outline" onClick={reset}>Reset</button>
      </div>

      <div className="promise-track">
        <div className={`status-node ${status}`}>
          <div className="node-icon">
            {status === 'idle' && '?'}
            {status === 'pending' && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>⌛</motion.div>}
            {status === 'resolved' && '✅'}
            {status === 'rejected' && '❌'}
          </div>
          <div className="node-label">{status.toUpperCase()}</div>
        </div>

        <div className="promise-details">
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="detail-text">
                Click a button to start an asynchronous operation.
              </motion.div>
            )}
            {status === 'pending' && (
              <motion.div key="pending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="detail-text">
                Operation in progress... The Promise is currently <strong>Pending</strong>.
              </motion.div>
            )}
            {status === 'resolved' && (
              <motion.div key="resolved" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="detail-text success">
                Success! The Promise was <strong>Fulfilled</strong>. The .then() callback would trigger now.
              </motion.div>
            )}
            {status === 'rejected' && (
              <motion.div key="rejected" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="detail-text error">
                Error! The Promise was <strong>Rejected</strong>. The .catch() block would handle this.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .promise-viz { padding: 20px; color: white; text-align: center; }
        .viz-controls { display: flex; gap: 10px; justify-content: center; margin-bottom: 40px; }
        .promise-track { 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          gap: 20px;
          background: #0f172a;
          padding: 40px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .status-node {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.05);
          border: 4px solid #475569;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .status-node.pending { border-color: var(--primary-cyan); box-shadow: 0 0 20px var(--primary-cyan); }
        .status-node.resolved { border-color: #4ade80; background: rgba(74, 222, 128, 0.1); box-shadow: 0 0 20px #4ade80; }
        .status-node.rejected { border-color: #f87171; background: rgba(248, 113, 113, 0.1); box-shadow: 0 0 20px #f87171; }
        
        .node-icon { font-size: 2rem; margin-bottom: 4px; }
        .node-label { font-size: 0.7rem; font-weight: bold; letter-spacing: 1px; }
        
        .detail-text { font-size: 1rem; color: var(--text-neutral); max-width: 300px; }
        .detail-text.success { color: #4ade80; }
        .detail-text.error { color: #f87171; }
      `}} />
    </div>
  );
};

export default PromiseFlowViz;
