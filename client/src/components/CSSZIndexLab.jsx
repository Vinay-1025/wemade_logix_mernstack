import React, { useState } from 'react';
import { Sliders, RefreshCw, Layers, Info } from 'lucide-react';

const CSSZIndexLab = () => {
  const [zIndexA, setZIndexA] = useState(1);
  const [zIndexB, setZIndexB] = useState(2);
  const [zIndexC, setZIndexC] = useState(3);
  const [isolateParent, setIsolateParent] = useState(false);
  const [view3D, setView3D] = useState(false);

  const resetAll = () => {
    setZIndexA(1);
    setZIndexB(2);
    setZIndexC(3);
    setIsolateParent(false);
    setView3D(false);
  };

  return (
    <div className="z-index-lab-root">
      <div className="lab-grid">
        {/* Controls Column */}
        <div className="controls-panel">
          <div className="telemetry-card">
            <div className="card-heading">
              <Sliders className="icon-purple" size={20} />
              <h4>Stacking Controls</h4>
            </div>
            <p className="description">Adjust z-index values and watch how they stack relative to each other.</p>

            {/* Slider Box A */}
            <div className="bg-panel" style={{ borderLeft: '4px solid #ef4444' }}>
              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl" style={{ fontWeight: '600', color: '#b91c1c' }}>Box A (Red)</span>
                  <span className="val-lbl">{zIndexA}</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="10"
                  value={zIndexA}
                  onChange={(e) => setZIndexA(parseInt(e.target.value))}
                />
              </div>
            </div>

            {/* Slider Box B */}
            <div className="bg-panel" style={{ borderLeft: '4px solid #10b981' }}>
              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl" style={{ fontWeight: '600', color: '#047857' }}>Box B (Green)</span>
                  <span className="val-lbl">{zIndexB}</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="10"
                  value={zIndexB}
                  onChange={(e) => setZIndexB(parseInt(e.target.value))}
                />
              </div>
            </div>

            {/* Slider Box C */}
            <div className="bg-panel" style={{ borderLeft: '4px solid #3b82f6' }}>
              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl" style={{ fontWeight: '600', color: '#1d4ed8' }}>Box C (Blue)</span>
                  <span className="val-lbl">{zIndexC}</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="10"
                  value={zIndexC}
                  onChange={(e) => setZIndexC(parseInt(e.target.value))}
                />
              </div>
            </div>

            {/* Stacking Context Isolation Trigger */}
            <div className="bg-panel isolation-panel">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="slide-lbl" style={{ fontWeight: '600' }}>Isolate Stacking Context</span>
                <input
                  type="checkbox"
                  className="toggle-checkbox"
                  checked={isolateParent}
                  onChange={(e) => setIsolateParent(e.target.checked)}
                />
              </div>
              <p style={{ fontSize: '0.68rem', margin: '4px 0 0 0', color: '#64748b', lineHeight: 1.4 }}>
                {isolateParent
                  ? 'Active: Parent has transform applied. Box A & B are trapped inside. Box C (z-index: 3) will stay on top even if Box A z-index is 10!'
                  : 'Inactive: Boxes stack in a single global stacking context based purely on z-index.'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button className="reset-btn" onClick={resetAll} style={{ flexGrow: 1 }}>
                <RefreshCw size={14} style={{ marginRight: '6px' }} /> Reset
              </button>
              <button className={`view-3d-btn ${view3D ? 'active' : ''}`} onClick={() => setView3D(!view3D)}>
                <Layers size={14} style={{ marginRight: '6px' }} /> {view3D ? 'Flatten 2D' : 'View in 3D'}
              </button>
            </div>
          </div>
        </div>

        {/* Viewport Visualization Column */}
        <div className="preview-panel">
          <div className="telemetry-card preview-card-wrapper">
            <div className="card-heading">
              <Layers className="icon-cyan" size={20} />
              <h4>Dynamic Stacking Preview</h4>
            </div>
            <p className="description">
              Toggle 3D View above to tilt the elements along the Z-depth axis to see isolation gaps.
            </p>

            <div className={`stacking-sandbox-wrapper ${view3D ? 'perspective-view' : ''}`}>
              <div className="stacking-plane">
                {/* FIRST STACKING GROUP: PARENT ONE */}
                <div className={`simulated-parent-group ${isolateParent ? 'trigger-stacking-context' : ''}`}>
                  {isolateParent && <span className="group-label">PARENT STACKING CONTEXT LAYER</span>}

                  {/* BOX A */}
                  <div
                    className="stack-box box-red"
                    style={{
                      zIndex: zIndexA,
                      transform: view3D ? `translateZ(${zIndexA * 15}px)` : 'none'
                    }}
                  >
                    <span className="box-title">Box A</span>
                    <span className="z-val">z-index: {zIndexA}</span>
                    {view3D && zIndexA !== 0 && (
                      <div className="depth-connector" style={{ height: `${zIndexA * 15}px` }}></div>
                    )}
                  </div>

                  {/* BOX B */}
                  <div
                    className="stack-box box-green"
                    style={{
                      zIndex: zIndexB,
                      transform: view3D ? `translateZ(${zIndexB * 15}px)` : 'none'
                    }}
                  >
                    <span className="box-title">Box B</span>
                    <span className="z-val">z-index: {zIndexB}</span>
                    {view3D && zIndexB !== 0 && (
                      <div className="depth-connector" style={{ height: `${zIndexB * 15}px` }}></div>
                    )}
                  </div>
                </div>

                {/* BOX C - SITS OUTSIDE THE CONTEXT */}
                <div
                  className="stack-box box-blue"
                  style={{
                    zIndex: zIndexC,
                    transform: view3D ? `translateZ(${zIndexC * 15}px)` : 'none'
                  }}
                >
                  <span className="box-title">Box C</span>
                  <span className="z-val">z-index: {zIndexC}</span>
                  {view3D && zIndexC !== 0 && (
                    <div className="depth-connector" style={{ height: `${zIndexC * 15}px` }}></div>
                  )}
                </div>
              </div>
            </div>

            {/* Explainer telemetries */}
            <div className="telemetry-card educational-card" style={{ marginTop: '16px', borderLeft: '4px solid #0891b2' }}>
              <div className="card-heading">
                <Info size={16} className="icon-cyan" />
                <h6 style={{ margin: 0, fontWeight: 700 }}>Diagnostics Engine</h6>
              </div>
              <p className="educational-note-text" style={{ fontSize: '0.74rem', color: '#475569', margin: '4px 0 0 0' }}>
                {isolateParent ? (
                  <span>
                    <strong>Isolated:</strong> Box A and B are locked inside their parent context. Because this parent has no explicit z-index, it defaults to standard flow order. Box C rests in the outer global document and floats higher on the stack than the entire Parent group, meaning Box C sits on top of Box A even if you raise Box A's z-index to 10.
                  </span>
                ) : (
                  <span>
                    <strong>Global Stack:</strong> All three boxes share the same stacking context. The overlap order is decided purely by z-index values: 
                    {zIndexA >= zIndexB && zIndexA >= zIndexC ? ' Box A is on top.' : ''}
                    {zIndexB > zIndexA && zIndexB >= zIndexC ? ' Box B is on top.' : ''}
                    {zIndexC > zIndexA && zIndexC > zIndexB ? ' Box C is on top.' : ''}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .z-index-lab-root {
          font-family: 'Outfit', 'Inter', sans-serif;
          color: #1e293b;
        }

        .lab-grid {
          display: grid;
          grid-template-columns: 1.1fr 1.3fr;
          gap: 20px;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .lab-grid {
            grid-template-columns: 1fr;
          }
        }

        .controls-panel, .preview-panel {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .telemetry-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .card-heading {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .card-heading h4 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .icon-purple { color: #7c3aed; }
        .icon-cyan { color: #0891b2; }

        .description {
          font-size: 0.8rem;
          color: #64748b;
          line-height: 1.5;
          margin: 0 0 16px 0;
        }

        .bg-panel {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 12px;
        }

        .panel-section-title {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          display: block;
          margin-bottom: 8px;
          letter-spacing: 0.05em;
        }

        .slide-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .slide-lbl {
          font-size: 0.75rem;
          color: #475569;
        }

        .flex-lbl-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .val-lbl {
          font-size: 0.75rem;
          font-weight: 600;
          color: #0f172a;
        }

        .slide-row input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 5px;
          border-radius: 100px;
          background: #cbd5e1;
          outline: none;
        }

        .slide-row input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #7c3aed;
          cursor: pointer;
        }

        .toggle-checkbox {
          cursor: pointer;
          width: 32px;
          height: 18px;
        }

        .reset-btn {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 6px 12px;
          border-radius: 6px;
          color: #475569;
          font-size: 0.75rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          font-weight: 600;
        }

        .reset-btn:hover {
          color: #0f172a;
          border-color: #94a3b8;
          background: #f8fafc;
        }

        .view-3d-btn {
          background: #7c3aed;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          color: white;
          font-size: 0.75rem;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s;
        }

        .view-3d-btn:hover {
          background: #6d28d9;
        }

        .view-3d-btn.active {
          background: #0891b2;
        }

        .view-3d-btn.active:hover {
          background: #06b6d4;
        }

        /* 3D Stacking Sandbox */
        .stacking-sandbox-wrapper {
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 8px;
          padding: 40px;
          min-height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: visible;
          position: relative;
        }

        .stacking-plane {
          position: relative;
          width: 260px;
          height: 220px;
          transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
          transform-style: preserve-3d;
        }

        .perspective-view .stacking-plane {
          transform: perspective(700px) rotateX(60deg) rotateY(0deg) rotateZ(-35deg);
        }

        /* simulated groups */
        .simulated-parent-group {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
        }

        .simulated-parent-group.trigger-stacking-context {
          /* Creating stacking context visually with bounds */
          border: 2px dashed #cbd5e1;
          background: rgba(0,0,0,0.01);
          border-radius: 8px;
          transform: translateZ(0); /* Stacking context trigger */
        }

        .group-label {
          position: absolute;
          top: -18px;
          left: 0;
          font-size: 0.52rem;
          font-weight: 800;
          color: #94a3b8;
          text-transform: uppercase;
        }

        /* overlapping stack boxes */
        .stack-box {
          position: absolute;
          width: 110px;
          height: 110px;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: white;
          box-shadow: 0 8px 16px rgba(0,0,0,0.08);
          transform-style: preserve-3d;
          transition: transform 0.3s ease, z-index 0.3s ease;
        }

        .box-red {
          background: #ef4444;
          top: 15px;
          left: 15px;
          border: 1px solid #dc2626;
        }

        .box-green {
          background: #10b981;
          top: 55px;
          left: 55px;
          border: 1px solid #059669;
        }

        .box-blue {
          background: #3b82f6;
          top: 95px;
          left: 95px;
          border: 1px solid #2563eb;
        }

        .box-title {
          font-weight: 700;
          font-size: 0.85rem;
          pointer-events: none;
        }

        .z-val {
          font-family: 'Fira Code', monospace;
          font-size: 0.65rem;
          background: rgba(255,255,255,0.2);
          padding: 2px 6px;
          border-radius: 4px;
          align-self: flex-start;
          pointer-events: none;
        }

        /* 3D Depth connector guides */
        .depth-connector {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 2px;
          border-left: 2px dashed rgba(15, 23, 42, 0.4);
          transform: rotateX(-90deg);
          transform-origin: bottom center;
          pointer-events: none;
        }

        .educational-note-text {
          font-size: 0.74rem;
          color: #475569;
          line-height: 1.6;
        }
      `}} />
    </div>
  );
};

export default CSSZIndexLab;
