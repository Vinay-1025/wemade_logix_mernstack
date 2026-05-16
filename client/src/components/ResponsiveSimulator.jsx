import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Tablet, Monitor, Info } from 'lucide-react';

const ResponsiveSimulator = () => {
  const [width, setWidth] = useState(600); // Inner container width

  const breakpoints = [
    { name: 'Mobile', value: 380, icon: <Smartphone size={16} /> },
    { name: 'Tablet', value: 650, icon: <Tablet size={16} /> },
    { name: 'Desktop', value: 900, icon: <Monitor size={16} /> }
  ];

  const getActiveBreakpoint = () => {
    if (width < 450) return 'Mobile';
    if (width < 768) return 'Tablet';
    return 'Desktop';
  };

  return (
    <div className="res-simulator">
      <div className="sim-controls">
        <div className="breakpoint-pills">
          {breakpoints.map(bp => (
            <button 
              key={bp.name}
              className={`pill ${getActiveBreakpoint() === bp.name ? 'active' : ''}`}
              onClick={() => setWidth(bp.value)}
            >
              {bp.icon} {bp.name}
            </button>
          ))}
        </div>
        <div className="slider-box">
          <span>Width: {width}px</span>
          <input 
            type="range" 
            min="320" 
            max="900" 
            value={width} 
            onChange={(e) => setWidth(parseInt(e.target.value))} 
          />
        </div>
      </div>

      <div className="viewport-container">
        <motion.div 
          className="mock-viewport"
          animate={{ width: `${width}px` }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <div className="mock-site">
            <header>Logo <span>Menu</span></header>
            <div className={`mock-grid ${getActiveBreakpoint() === 'Mobile' ? 'stack' : ''}`}>
              <div className="mock-card">Feature 1</div>
              <div className="mock-card">Feature 2</div>
              <div className="mock-card">Feature 3</div>
            </div>
            <div className="mock-text">
              <h4>Current Mode: {getActiveBreakpoint()}</h4>
              <p>Observe how the grid stacks into a single column when the width is low.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .res-simulator {
          background: var(--app-card-bg);
          border-radius: var(--radius-lg);
          border: 1px solid var(--app-border);
          overflow: hidden;
          box-shadow: var(--glow);
        }
        .sim-controls {
          padding: 20px;
          background: var(--app-sidebar-bg);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .breakpoint-pills { display: flex; gap: 8px; }
        .pill {
          padding: 6px 12px;
          border-radius: 100px;
          background: var(--app-bg);
          border: 1px solid var(--app-border);
          color: var(--app-text-muted);
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .pill.active {
          background: var(--brand-gradient);
          color: white;
          border-color: transparent;
        }
        .slider-box { display: flex; flex-direction: column; gap: 4px; font-size: 0.75rem; color: var(--primary-cyan); min-width: 150px; }
        .viewport-container {
          padding: 40px 20px;
          background: #0f172a;
          display: flex;
          justify-content: center;
          overflow: hidden;
        }
        .mock-viewport {
          background: white;
          border-radius: 8px;
          height: 400px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          overflow: hidden;
        }
        .mock-site { padding: 15px; color: #1e293b; height: 100%; display: flex; flex-direction: column; gap: 15px; }
        header { display: flex; justify-content: space-between; font-weight: bold; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; color: var(--primary-blue); }
        .mock-grid { display: flex; gap: 10px; }
        .mock-grid.stack { flex-direction: column; }
        .mock-card { flex: 1; padding: 15px; background: #f1f5f9; border-radius: 6px; font-size: 0.75rem; text-align: center; border: 1px solid #cbd5e1; }
        .mock-text { margin-top: auto; padding: 10px; background: #f8fafc; border-radius: 6px; }
      `}} />
    </div>
  );
};

export default ResponsiveSimulator;
