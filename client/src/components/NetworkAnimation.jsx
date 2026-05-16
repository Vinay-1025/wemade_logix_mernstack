import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Laptop, Server, Send, ChevronRight } from 'lucide-react';

const NetworkAnimation = () => {
  const [status, setStatus] = useState('idle'); // idle, sending, processing, returning, done

  const runAnimation = () => {
    setStatus('sending');
    setTimeout(() => setStatus('processing'), 1000);
    setTimeout(() => setStatus('returning'), 2500);
    setTimeout(() => setStatus('done'), 3500);
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div className="network-viz">
      <div className="nodes">
        <div className="node client">
          <Laptop size={32} color={status === 'sending' || status === 'done' ? 'var(--primary-cyan)' : '#94a3b8'} />
          <span>Client</span>
        </div>
        
        <div className="pipe">
          <div className="cable"></div>
          {status === 'sending' && (
            <motion.div 
              className="packet"
              initial={{ left: '0%' }}
              animate={{ left: '100%' }}
              transition={{ duration: 1, ease: "linear" }}
            >
              <Send size={14} color="white" />
            </motion.div>
          )}
          {status === 'returning' && (
            <motion.div 
              className="packet response"
              initial={{ left: '100%' }}
              animate={{ left: '0%' }}
              transition={{ duration: 1, ease: "linear" }}
            >
              <div className="data-chunk">{}</div>
            </motion.div>
          )}
        </div>

        <div className="node server">
          <Server size={32} color={status === 'processing' ? 'var(--primary-cyan)' : '#94a3b8'} />
          <span>Server</span>
        </div>
      </div>

      <div className="status-box">
        <p>Current State: <strong>{status.toUpperCase()}</strong></p>
        <button className="btn btn-primary" onClick={runAnimation} disabled={status !== 'idle'}>
          Simulate Request
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .network-viz {
          padding: 30px;
          background: var(--app-card-bg);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          border: 1px solid var(--app-border);
        }
        .nodes {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 400px;
        }
        .node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: bold;
          color: var(--app-text-muted);
        }
        .pipe {
          position: relative;
          flex: 1;
          height: 4px;
          margin: 0 20px;
        }
        .cable {
          width: 100%;
          height: 100%;
          background: var(--app-border);
          border-radius: 2px;
        }
        .packet {
          position: absolute;
          top: -12px;
          width: 24px;
          height: 24px;
          background: var(--brand-gradient);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px var(--accent-glow);
        }
        .packet.response {
          background: #4ADE80;
          box-shadow: 0 0 15px rgba(74, 222, 128, 0.4);
        }
        .data-chunk {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 1px;
        }
        .status-box {
          text-align: center;
        }
        .status-box p { margin-bottom: 12px; font-size: 0.85rem; color: var(--app-text-muted); }
      `}} />
    </div>
  );
};

export default NetworkAnimation;
