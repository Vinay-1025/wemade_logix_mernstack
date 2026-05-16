import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FlexboxPlayground = () => {
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const [alignItems, setAlignItems] = useState('stretch');
  const [flexDirection, setFlexDirection] = useState('row');
  const [gap, setGap] = useState('10px');

  const options = {
    justifyContent: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    alignItems: ['flex-start', 'flex-end', 'center', 'stretch'],
    flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
    gap: ['0px', '10px', '20px', '40px']
  };

  return (
    <div className="flex-playground">
      <div className="controls-panel">
        <div className="control-group">
          <label>justify-content</label>
          <select value={justifyContent} onChange={(e) => setJustifyContent(e.target.value)}>
            {options.justifyContent.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        
        <div className="control-group">
          <label>align-items</label>
          <select value={alignItems} onChange={(e) => setAlignItems(e.target.value)}>
            {options.alignItems.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div className="control-group">
          <label>flex-direction</label>
          <select value={flexDirection} onChange={(e) => setFlexDirection(e.target.value)}>
            {options.flexDirection.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div className="control-group">
          <label>gap</label>
          <select value={gap} onChange={(e) => setGap(e.target.value)}>
            {options.gap.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      <div className="preview-area">
        <motion.div 
          className="flex-container-viz"
          animate={{ justifyContent, alignItems, flexDirection, gap }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {[1, 2, 3].map(id => (
            <div key={id} className="flex-item-viz">
              <span>{id}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .flex-playground {
          background: var(--app-card-bg);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--app-border);
        }
        .controls-panel {
          padding: 20px;
          background: var(--app-sidebar-bg);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          border-bottom: 1px solid var(--app-border);
        }
        .control-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .control-group label {
          font-size: 0.75rem;
          color: var(--primary-cyan);
          font-family: monospace;
          font-weight: bold;
        }
        .control-group select {
          background: var(--app-bg);
          color: var(--app-text);
          border: 1px solid var(--app-border);
          padding: 8px;
          border-radius: 6px;
          font-size: 0.85rem;
        }
        .preview-area {
          padding: 40px;
          min-height: 300px;
          display: flex;
        }
        .flex-container-viz {
          display: flex;
          background: rgba(0, 209, 209, 0.05);
          border: 2px dashed rgba(0, 209, 209, 0.2);
          border-radius: 12px;
          width: 100%;
          min-height: 250px;
        }
        .flex-item-viz {
          width: 60px;
          height: 60px;
          background: var(--brand-gradient);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          flex-shrink: 0;
        }
      `}} />
    </div>
  );
};

export default FlexboxPlayground;
