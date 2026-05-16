import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Palette, MousePointer2 } from 'lucide-react';

const PlanVisualizer = () => {
  const [isWireframe, setIsWireframe] = useState(true);

  return (
    <div className="plan-viz">
      <div className="sim-header">
        <div className="toggle-container" onClick={() => setIsWireframe(!isWireframe)}>
          <div className={`toggle-track ${isWireframe ? 'wire' : 'ui'}`}>
            <div className="toggle-thumb">
              {isWireframe ? <Layout size={12} /> : <Palette size={12} />}
            </div>
          </div>
          <span>{isWireframe ? 'Wireframe Mode' : 'High-Fidelity UI'}</span>
        </div>
      </div>

      <div className="mock-canvas">
        <motion.div 
          className={`site-preview ${isWireframe ? 'wireframe' : 'finished'}`}
          animate={{ filter: isWireframe ? 'grayscale(1)' : 'grayscale(0)' }}
        >
          {/* Header */}
          <div className="p-header">
            <div className="p-logo">PLATFORM</div>
            <div className="p-nav">
              <div className="p-dot"></div>
              <div className="p-dot"></div>
              <div className="p-dot"></div>
            </div>
          </div>

          {/* Hero */}
          <div className="p-hero">
            <div className="p-content">
              <div className="p-badge">NEW COURSE</div>
              <div className="p-title">Master the MERN Stack</div>
              <div className="p-desc">Step-by-step curriculum for modern developers.</div>
              <div className="p-btn">Get Started</div>
            </div>
            <div className="p-image-box">
              <div className="p-abstract-shape"></div>
            </div>
          </div>

          {/* Grid */}
          <div className="p-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-card">
                <div className="p-icon"></div>
                <div className="p-card-title">Module {i}</div>
                <div className="p-card-line"></div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .plan-viz {
          background: var(--app-card-bg);
          border-radius: var(--radius-lg);
          border: 1px solid var(--app-border);
          overflow: hidden;
        }
        .sim-header {
          padding: 15px 20px;
          background: var(--app-sidebar-bg);
          border-bottom: 1px solid var(--app-border);
        }
        .toggle-container {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--app-text);
        }
        .toggle-track {
          width: 48px;
          height: 24px;
          background: #334155;
          border-radius: 100px;
          position: relative;
          transition: 0.3s;
        }
        .toggle-track.ui { background: var(--primary-cyan); }
        .toggle-thumb {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 18px;
          height: 18px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f172a;
          transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .toggle-track.ui .toggle-thumb { left: 27px; }

        .mock-canvas { padding: 40px; background: #0f172a; display: flex; justify-content: center; }
        .site-preview {
          width: 100%;
          max-width: 600px;
          background: white;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        /* Elements */
        .p-header { display: flex; justify-content: space-between; align-items: center; }
        .p-logo { font-weight: 900; color: #1e293b; font-size: 0.9rem; }
        .p-nav { display: flex; gap: 8px; }
        .p-dot { width: 30px; height: 8px; background: #e2e8f0; border-radius: 4px; }
        
        .p-hero { display: flex; gap: 20px; padding: 20px 0; border-bottom: 1px solid #f1f5f9; }
        .p-content { flex: 1; }
        .p-badge { font-size: 0.6rem; font-weight: 800; color: #6366f1; margin-bottom: 8px; }
        .p-title { font-size: 1.5rem; font-weight: 800; color: #1e293b; line-height: 1.1; margin-bottom: 10px; }
        .p-desc { font-size: 0.75rem; color: #64748b; margin-bottom: 15px; }
        .p-btn { display: inline-block; padding: 8px 16px; background: #1e293b; color: white; border-radius: 6px; font-size: 0.7rem; font-weight: bold; }
        
        .p-image-box { flex: 0.8; height: 120px; background: #f8fafc; border-radius: 8px; position: relative; overflow: hidden; }
        .p-abstract-shape {
          position: absolute; width: 100px; height: 100px; background: #00d1d1; 
          border-radius: 50%; right: -20px; bottom: -20px; opacity: 0.2; 
        }

        .p-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
        .p-card { background: #f8fafc; padding: 15px; border-radius: 8px; }
        .p-icon { width: 20px; height: 20px; background: #e2e8f0; border-radius: 4px; margin-bottom: 10px; }
        .p-card-title { font-size: 0.7rem; font-weight: bold; color: #475569; margin-bottom: 6px; }
        .p-card-line { width: 100%; height: 4px; background: #f1f5f9; border-radius: 2px; }

        /* Wireframe Overrides */
        .wireframe * {
          border: 1px dashed rgba(0,0,0,0.2) !important;
          background: transparent !important;
          color: rgba(0,0,0,0.1) !important;
          background-image: none !important;
        }
        .wireframe .p-dot, .wireframe .p-image-box, .wireframe .p-icon, .wireframe .p-card-line {
          border-style: solid;
        }
        .wireframe .p-btn { border-color: #94a3b8; }
      `}} />
    </div>
  );
};

export default PlanVisualizer;
