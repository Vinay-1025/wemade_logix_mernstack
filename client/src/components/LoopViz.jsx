import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Box } from 'lucide-react';

const LoopViz = () => {
  const [activeTab, setActiveTab] = useState('for');
  const [iterations, setIterations] = useState(5);
  const [breakAt, setBreakAt] = useState(10);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [isLooping, setIsLooping] = useState(false);
  const [output, setOutput] = useState([]);

  const runLoop = async () => {
    if (isLooping) return;
    setIsLooping(true);
    setCurrentIdx(-1);
    setOutput([]);

    if (activeTab === 'for') {
      for (let i = 0; i < iterations; i++) {
        setCurrentIdx(i);
        if (i === breakAt) {
          setOutput(prev => [...prev, `🛑 Break at ${i}`]);
          break;
        }
        await new Promise(r => setTimeout(r, 600));
        setOutput(prev => [...prev, `Item ${i} processed`]);
      }
    } else if (activeTab === 'while') {
      let i = 0;
      while (i < iterations) {
        setCurrentIdx(i);
        if (i === breakAt) {
          setOutput(prev => [...prev, `🛑 Break at ${i}`]);
          break;
        }
        await new Promise(r => setTimeout(r, 600));
        setOutput(prev => [...prev, `Item ${i} processed`]);
        i++;
      }
    } else if (activeTab === 'dowhile') {
      let i = 0;
      do {
        setCurrentIdx(i);
        if (i === breakAt) {
          setOutput(prev => [...prev, `🛑 Break at ${i}`]);
          break;
        }
        await new Promise(r => setTimeout(r, 600));
        setOutput(prev => [...prev, `Item ${i} processed`]);
        i++;
      } while (i < iterations);
    }

    setCurrentIdx(-1);
    setIsLooping(false);
  };

  const reset = () => {
    setCurrentIdx(-1);
    setOutput([]);
    setIsLooping(false);
  };

  return (
    <div className="loop-viz">
      <div className="viz-tabs">
        <button className={activeTab === 'for' ? 'active' : ''} onClick={() => setActiveTab('for')}>for</button>
        <button className={activeTab === 'while' ? 'active' : ''} onClick={() => setActiveTab('while')}>while</button>
        <button className={activeTab === 'dowhile' ? 'active' : ''} onClick={() => setActiveTab('dowhile')}>do-while</button>
      </div>

      <div className="loop-controls">
        <div className="input-group">
          <label>Iterations: {iterations}</label>
          <input type="range" min="1" max="10" value={iterations} onChange={e => setIterations(parseInt(e.target.value))} disabled={isLooping} />
        </div>
        <div className="input-group">
          <label>Break At (Index): {breakAt >= iterations ? 'None' : breakAt}</label>
          <input type="range" min="0" max="10" value={breakAt} onChange={e => setBreakAt(parseInt(e.target.value))} disabled={isLooping} />
        </div>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={runLoop} disabled={isLooping}>Run</button>
          <button className="btn btn-outline" onClick={reset} disabled={isLooping}>Reset</button>
        </div>
      </div>

      <div className="loop-factory">
        <div className="conveyor-belt">
          <div className="belt-line"></div>
          <div className="factory-items">
            {Array.from({ length: iterations }).map((_, i) => (
              <motion.div 
                key={i} 
                className={`factory-item ${currentIdx === i ? 'active' : ''} ${i < output.length && !output[i]?.includes('Break') ? 'done' : ''} ${output.some(o => o.includes(`Break at ${i}`)) ? 'broken' : ''}`}
                animate={currentIdx === i ? { scale: 1.2, y: -10 } : { scale: 1, y: 0 }}
              >
                <Box size={24} />
                <span className="item-idx">{i}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="loop-split-view">
          <div className="code-pane">
            <pre>
{activeTab === 'for' && `for (let i = 0; i < ${iterations}; i++) {
  if (i === ${breakAt}) break;
  console.log(i);
}`}
{activeTab === 'while' && `let i = 0;
while (i < ${iterations}) {
  if (i === ${breakAt}) break;
  console.log(i);
  i++;
}`}
{activeTab === 'dowhile' && `let i = 0;
do {
  if (i === ${breakAt}) break;
  console.log(i);
  i++;
} while (i < ${iterations});`}
            </pre>
          </div>
          <div className="output-pane">
            <div className="pane-header">Console Output</div>
            <div className="output-content">
              {output.map((line, i) => (
                <div key={i} className="output-line">&gt; {line}</div>
              ))}
            </div>
          </div>
        </div>
      </div>


      <style dangerouslySetInnerHTML={{ __html: `
        .loop-viz { padding: 20px; color: #333; display: flex; flex-direction: column; gap: 20px; }
        .loop-controls { display: flex; align-items: flex-end; gap: 20px; justify-content: center; }
        .input-group { display: flex; flex-direction: column; gap: 5px; }
        .input-group label { font-size: 0.65rem; color: #64748b; text-transform: uppercase; }
        .input-group input { background: #f8fafc; border: 1px solid #cbd5e1; color: #333; padding: 5px; border-radius: 4px; width: 80px; }
        
        .viz-tabs { display: flex; gap: 10px; justify-content: center; }
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
        
        .loop-factory { 
          background: #f8fafc; 
          padding: 20px; 
          border-radius: 20px; 
          border: 1px solid rgba(0, 0, 0,0.1);
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        
        .conveyor-belt { position: relative; padding: 15px 0; border-bottom: 2px solid #1e293b; }
        .factory-items { display: flex; gap: 10px; justify-content: center; }
        .factory-item { 
          width: 40px; height: 40px; background: rgba(0, 0, 0,0.05); border: 1px solid #475569; 
          border-radius: 8px; display: flex; align-items: center; justify-content: center; position: relative; color: #64748b;
          transition: all 0.3s;
        }
        .factory-item.active { border-color: var(--primary-cyan); color: var(--primary-cyan); box-shadow: 0 0 15px var(--primary-cyan); }
        .factory-item.done { border-color: #16a34a; color: #16a34a; background: rgba(74, 222, 128, 0.1); }
        .factory-item.broken { border-color: #dc2626; color: #dc2626; background: rgba(248, 113, 113, 0.1); }
        .item-idx { position: absolute; top: -18px; font-size: 0.6rem; font-family: monospace; }
        
        .loop-split-view { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #cbd5e1; border-radius: 12px; overflow: hidden; border: 1px solid #cbd5e1; }
        .code-pane, .output-pane { background: #e2e8f0; padding: 20px; min-height: 180px; }
        .pane-header { font-size: 0.6rem; text-transform: uppercase; color: #475569; margin-bottom: 10px; letter-spacing: 1px; }
        .code-pane pre { margin: 0; color: var(--primary-cyan); font-size: 0.8rem; font-family: monospace; line-height: 1.5; }
        .output-content { font-family: monospace; font-size: 0.8rem; }
        .output-line { color: #16a34a; margin-bottom: 4px; }
        .btn-group { display: flex; gap: 10px; }
      `}} />
    </div>
  );
};

export default LoopViz;
