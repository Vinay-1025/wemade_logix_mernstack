import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const JSRuntimeViz = () => {
  const [callStack, setCallStack] = useState([]);
  const [webAPIs, setWebAPIs] = useState([]);
  const [callbackQueue, setCallbackQueue] = useState([]);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const runSimulation = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setCallStack([]);
    setWebAPIs([]);
    setCallbackQueue([]);
    setConsoleLogs([]);

    const steps = [
      { type: 'stack', val: 'main()', log: 'Program started' },
      { type: 'stack', val: 'console.log("Start")', log: 'Start' },
      { type: 'log', val: 'Start' },
      { type: 'pop', val: 'console.log("Start")' },
      { type: 'stack', val: 'setTimeout(cb, 1000)', log: 'Scheduling timer...' },
      { type: 'api', val: 'Timer (1s)', log: 'API starts timer' },
      { type: 'pop', val: 'setTimeout(cb, 1000)' },
      { type: 'stack', val: 'console.log("End")', log: 'End' },
      { type: 'log', val: 'End' },
      { type: 'pop', val: 'console.log("End")' },
      { type: 'pop', val: 'main()', log: 'Stack is empty' },
      { type: 'api-done', val: 'Timer (1s)', log: 'Timer finished' },
      { type: 'queue', val: 'cb()', log: 'Callback added to queue' },
      { type: 'event-loop', val: 'cb()', log: 'Event Loop moving cb to stack' },
      { type: 'stack', val: 'cb()', log: 'Executing callback' },
      { type: 'log', val: 'Callback Executed!' },
      { type: 'pop', val: 'cb()' },
    ];

    for (const step of steps) {
      await new Promise(r => setTimeout(r, 1000));
      
      if (step.type === 'stack') setCallStack(prev => [...prev, step.val]);
      if (step.type === 'pop') setCallStack(prev => prev.filter(x => x !== step.val));
      if (step.type === 'api') setWebAPIs(prev => [...prev, step.val]);
      if (step.type === 'api-done') setWebAPIs(prev => prev.filter(x => x !== step.val));
      if (step.type === 'queue') setCallbackQueue(prev => [...prev, step.val]);
      if (step.type === 'event-loop') setCallbackQueue(prev => prev.filter(x => x !== step.val));
      if (step.type === 'log') setConsoleLogs(prev => [...prev, step.val]);
    }
    setIsRunning(false);
  };

  return (
    <div className="runtime-viz">
      <div className="viz-controls">
        <button className="btn btn-primary" onClick={runSimulation} disabled={isRunning}>
          {isRunning ? 'Simulating...' : 'Run Async Simulation'}
        </button>
      </div>

      <div className="runtime-grid">
        <div className="runtime-box">
          <h4>Call Stack</h4>
          <div className="stack-container">
            <AnimatePresence>
              {callStack.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  className="stack-item"
                >
                  {item}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="runtime-box">
          <h4>Web APIs</h4>
          <div className="api-container">
            {webAPIs.map((item, i) => (
              <motion.div key={i} className="api-item" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity }}>
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="runtime-box">
          <h4>Callback Queue</h4>
          <div className="queue-container">
            {callbackQueue.map((item, i) => (
              <motion.div key={i} className="queue-item" layoutId={item}>
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="runtime-box">
          <h4>Console</h4>
          <div className="console-display">
            {consoleLogs.map((log, i) => (
              <div key={i} className="console-line">&gt; {log}</div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .runtime-viz { padding: 20px; color: #333; background: #ffffff; width: 100%; height: 100%; min-height: 400px; box-sizing: border-box; }
        .runtime-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 20px;
        }
        .runtime-box {
          background: rgba(0, 0, 0,0.05);
          border: 1px solid rgba(0, 0, 0,0.1);
          border-radius: 12px;
          padding: 15px;
          min-height: 150px;
        }
        .runtime-box h4 { margin-top: 0; color: var(--primary-cyan); font-size: 0.9rem; text-transform: uppercase; }
        .stack-container, .api-container, .queue-container {
          display: flex;
          flex-direction: column-reverse;
          gap: 8px;
        }
        .stack-item, .api-item, .queue-item {
          padding: 8px 12px;
          background: var(--brand-gradient);
          border-radius: 6px;
          font-size: 0.8rem;
          font-family: monospace;
        }
        .api-item { background: #facc15; color: #000; }
        .queue-item { background: #16a34a; color: #000; }
        .console-display {
          font-family: monospace;
          font-size: 0.8rem;
          color: #16a34a;
        }
      `}} />
    </div>
  );
};

export default JSRuntimeViz;
