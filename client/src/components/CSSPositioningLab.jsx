import React, { useState, useRef, useEffect } from 'react';
import { Sliders, RefreshCw, Copy, Info } from 'lucide-react';

const CSSPositioningLab = () => {
  const [positionMode, setPositionMode] = useState('relative');
  const [offsets, setOffsets] = useState({ top: 15, right: 0, bottom: 0, left: 20 });
  const [activeOffsets, setActiveOffsets] = useState({ top: true, right: false, bottom: false, left: true });
  const [positionedParent, setPositionedParent] = useState(true);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);

  const resetAll = () => {
    setPositionMode('relative');
    setOffsets({ top: 15, right: 0, bottom: 0, left: 20 });
    setActiveOffsets({ top: true, right: false, bottom: false, left: true });
    setPositionedParent(true);
  };

  const copyCSS = () => {
    const cssParts = [`position: ${positionMode};`];
    if (positionMode !== 'static') {
      if (activeOffsets.top) cssParts.push(`top: ${offsets.top}px;`);
      if (activeOffsets.right) cssParts.push(`right: ${offsets.right}px;`);
      if (activeOffsets.bottom) cssParts.push(`bottom: ${offsets.bottom}px;`);
      if (activeOffsets.left) cssParts.push(`left: ${offsets.left}px;`);
    }
    const cssText = `.positioned-element {
  ${cssParts.join('\n  ')}
}`;
    navigator.clipboard.writeText(cssText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Explanation strings based on selected position
  const getExplanation = () => {
    switch (positionMode) {
      case 'static':
        return 'Standard document flow. Offset properties (top, right, bottom, left) have no effect. Element stacks naturally.';
      case 'relative':
        return 'Stays in normal flow. Offset shifts it relative to its original position. The space it originally occupied remains reserved.';
      case 'absolute':
        return 'Removed from document flow. Anchored to the closest positioned ancestor (indicated by the outer dashed border). Offsets position it within that coordinate space.';
      case 'fixed':
        return 'Removed from flow. Pinned directly to the viewport (or in this case, the simulated phone screen). Scrolling does not move it.';
      case 'sticky':
        return 'Hybrid flow. Acts relative until it hits the threshold (e.g. top: 10px), then pins dynamically within its parent container as you scroll.';
      default:
        return '';
    }
  };

  // Build the target element style object
  const getTargetStyle = () => {
    const style = {
      position: positionMode,
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      transition: 'position 0.15s ease'
    };

    if (positionMode !== 'static') {
      if (activeOffsets.top) style.top = `${offsets.top}px`;
      if (activeOffsets.right) style.right = `${offsets.right}px`;
      if (activeOffsets.bottom) style.bottom = `${offsets.bottom}px`;
      if (activeOffsets.left) style.left = `${offsets.left}px`;
    }

    return style;
  };

  return (
    <div className="positioning-lab-root">
      <div className="lab-grid">
        {/* Controls Column */}
        <div className="controls-panel">
          <div className="telemetry-card">
            <div className="card-heading">
              <Sliders className="icon-purple" size={20} />
              <h4>Positioning Engine</h4>
            </div>
            <p className="description">Switch modes and offsets to test element containment dynamics.</p>

            {/* Position Select */}
            <div className="bg-panel">
              <span className="panel-section-title text-primary-purple">Position Mode</span>
              <div className="button-group">
                {['static', 'relative', 'absolute', 'fixed', 'sticky'].map((mode) => (
                  <button
                    key={mode}
                    className={`mode-btn ${positionMode === mode ? 'active' : ''}`}
                    onClick={() => {
                      setPositionMode(mode);
                      // Set logical defaults when changing mode to keep visualization clean
                      if (mode === 'sticky') {
                        setOffsets({ top: 10, right: 0, bottom: 0, left: 0 });
                        setActiveOffsets({ top: true, right: false, bottom: false, left: false });
                      } else if (mode === 'fixed') {
                        setOffsets({ top: 20, right: 0, bottom: 0, left: 20 });
                        setActiveOffsets({ top: true, right: false, bottom: false, left: true });
                      } else if (mode === 'static') {
                        setActiveOffsets({ top: false, right: false, bottom: false, left: false });
                      } else {
                        setOffsets({ top: 15, right: 0, bottom: 0, left: 20 });
                        setActiveOffsets({ top: true, right: false, bottom: false, left: true });
                      }
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Positioned Parent (only relevant for Absolute) */}
            {positionMode === 'absolute' && (
              <div className="bg-panel parent-containment-toggle">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="slide-lbl" style={{ fontWeight: '600' }}>Positioned Parent (relative)</span>
                  <input
                    type="checkbox"
                    className="toggle-checkbox"
                    checked={positionedParent}
                    onChange={(e) => setPositionedParent(e.target.checked)}
                  />
                </div>
                <p className="toggle-explanation" style={{ fontSize: '0.68rem', margin: '4px 0 0 0', color: '#64748b' }}>
                  {positionedParent
                    ? 'Parent is positioned (relative). Absolute element anchors to parent.'
                    : 'Parent is static. Absolute element jumps up to container viewport bounds.'}
                </p>
              </div>
            )}

            {/* Offsets (Disabled for static) */}
            {positionMode !== 'static' && (
              <div className="bg-panel">
                <span className="panel-section-title text-primary-purple">Offset Modifiers</span>
                {['top', 'right', 'bottom', 'left'].map((dir) => (
                  <div key={`offset-${dir}`} className="offset-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="checkbox"
                      checked={activeOffsets[dir]}
                      onChange={(e) => setActiveOffsets({ ...activeOffsets, [dir]: e.target.checked })}
                      style={{ cursor: 'pointer' }}
                    />
                    <span className="slide-lbl" style={{ width: '40px', textTransform: 'capitalize' }}>{dir}</span>
                    <input
                      type="range"
                      min="-50"
                      max="150"
                      value={offsets[dir]}
                      disabled={!activeOffsets[dir]}
                      onChange={(e) => setOffsets({ ...offsets, [dir]: parseInt(e.target.value) })}
                      style={{ flexGrow: 1 }}
                    />
                    <span className="val-lbl" style={{ width: '40px', textRight: 'true', fontSize: '0.72rem' }}>
                      {activeOffsets[dir] ? `${offsets[dir]}px` : 'auto'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button className="reset-btn" onClick={resetAll}>
                <RefreshCw size={14} style={{ marginRight: '6px' }} /> Reset
              </button>
              <button className="copy-btn" onClick={copyCSS} style={{ flexGrow: 1 }}>
                <Copy size={14} style={{ marginRight: '6px' }} /> {copied ? 'Copied!' : 'Copy CSS'}
              </button>
            </div>
          </div>

          <div className="telemetry-card info-card">
            <div className="card-heading">
              <Info className="icon-purple" size={18} />
              <h5 style={{ margin: 0, fontWeight: 700 }}>Telemetry Insights</h5>
            </div>
            <p className="insights-text">{getExplanation()}</p>
          </div>
        </div>

        {/* Viewport Simulation Column */}
        <div className="preview-panel">
          <div className="telemetry-card simulator-card">
            <div className="card-heading">
              <Info className="icon-cyan" size={20} />
              <h4>Simulated Viewport Layout (Scroll inside)</h4>
            </div>
            <p className="description">
              Observe how elements flow or lock under scroll. Green items represent normal static flow elements.
            </p>

            <div className="simulator-phone-wrapper">
              <div className="phone-screen-body" ref={containerRef}>
                {/* Scroll Container */}
                <div className="scrollable-document-flow">
                  {/* Title and Top spacer */}
                  <div className="doc-section doc-header">
                    <h6>Document Header</h6>
                    <p style={{ margin: 0 }}>Scroll down to test sticky/fixed anchors</p>
                  </div>

                  {/* Positioning Parent Container Box */}
                  <div className={`simulated-parent-container ${positionedParent && positionMode === 'absolute' ? 'parent-relative' : ''}`}>
                    <span className="parent-label">SIMULATED CONTAINING BLOCK</span>
                    
                    {/* Dummy sibling 1 */}
                    <div className="sibling-box">
                      <span className="box-tag">Static Flow</span>
                      <p>Sibling Box A</p>
                    </div>

                    {/* Original placeholder shadow box (only visible when shifted in relative position) */}
                    {positionMode === 'relative' && (
                      <div className="original-place-placeholder">
                        <span>Original Position</span>
                      </div>
                    )}

                    {/* TARGET ELEMENT UNDER TEST */}
                    <div className="positioned-target" style={getTargetStyle()}>
                      <span className="target-tag">{positionMode.toUpperCase()}</span>
                      <h6>Target Box B</h6>
                      {positionMode !== 'static' && (
                        <div className="offset-debug-telemetry">
                          {activeOffsets.top && `t:${offsets.top}px `}
                          {activeOffsets.left && `l:${offsets.left}px `}
                          {activeOffsets.right && `r:${offsets.right}px `}
                          {activeOffsets.bottom && `b:${offsets.bottom}px `}
                        </div>
                      )}
                    </div>

                    {/* Dummy sibling 2 */}
                    <div className="sibling-box">
                      <span className="box-tag">Static Flow</span>
                      <p>Sibling Box C</p>
                    </div>
                  </div>

                  {/* Long content to enable scrolling */}
                  <div className="doc-section scroll-filler">
                    <h6>Scroll Content Section</h6>
                    <p>This paragraph adds visual scroll depth. Scroll up and down to observe Sticky pinning boundaries and Viewport Fixed tracking.</p>
                  </div>

                  <div className="doc-section scroll-filler secondary-filler">
                    <h6>Footer Sandbox Ends</h6>
                    <p>Static flow concludes here.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .positioning-lab-root {
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

        .text-primary-purple { color: #7c3aed; }
        .text-primary-cyan { color: #0891b2; }

        .button-group {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }

        .mode-btn {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 6px 4px;
          border-radius: 6px;
          color: #475569;
          font-size: 0.72rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          text-transform: capitalize;
        }

        .mode-btn:hover {
          color: #0f172a;
          background: #f8fafc;
          border-color: #94a3b8;
        }

        .mode-btn.active {
          background: #7c3aed;
          color: white;
          border-color: transparent;
        }

        .toggle-checkbox {
          cursor: pointer;
          width: 32px;
          height: 18px;
        }

        .slide-lbl {
          font-size: 0.75rem;
          color: #475569;
        }

        .val-lbl {
          font-weight: 600;
          color: #0f172a;
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

        .copy-btn {
          background: #7c3aed;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          color: white;
          font-size: 0.75rem;
          cursor: pointer;
          font-weight: 600;
        }

        .copy-btn:hover {
          background: #6d28d9;
        }

        .info-card {
          border-left: 4px solid #7c3aed;
        }

        .insights-text {
          font-size: 0.76rem;
          color: #475569;
          line-height: 1.6;
          margin: 0;
        }

        /* Viewport Phone Simulator */
        .simulator-phone-wrapper {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 16px;
          padding: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .phone-screen-body {
          width: 100%;
          max-width: 340px;
          height: 380px;
          background: #ffffff;
          border: 4px solid #334155;
          border-radius: 12px;
          overflow-y: auto;
          position: relative;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
          scrollbar-width: thin;
        }

        .scrollable-document-flow {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .doc-section {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 12px;
          font-size: 0.7rem;
        }

        .doc-section h6 {
          font-size: 0.75rem;
          font-weight: 700;
          margin: 0 0 4px 0;
          color: #334155;
        }

        .doc-header {
          background: #ecfdf5;
          border-color: #a7f3d0;
          color: #065f46;
          text-align: center;
        }

        .simulated-parent-container {
          border: 2px dashed #e2e8f0;
          padding: 14px;
          border-radius: 8px;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #f8fafc;
          min-height: 200px;
        }

        .simulated-parent-container.parent-relative {
          border-color: #0891b2;
          background: rgba(8, 145, 178, 0.02);
        }

        .parent-label {
          position: absolute;
          top: -8px;
          left: 10px;
          font-size: 0.55rem;
          font-weight: 800;
          background: #ffffff;
          padding: 0 4px;
          color: #94a3b8;
          border-radius: 2px;
        }

        .simulated-parent-container.parent-relative > .parent-label {
          color: #0891b2;
        }

        .sibling-box {
          background: #dcfce7;
          border: 1px solid #bbf7d0;
          border-radius: 6px;
          padding: 10px;
          font-size: 0.7rem;
          color: #15803d;
        }

        .box-tag {
          font-size: 0.55rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #16a34a;
          margin-bottom: 2px;
          display: block;
        }

        .original-place-placeholder {
          height: 64px;
          border: 1px dashed #cbd5e1;
          background: #f1f5f9;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          color: #94a3b8;
          pointer-events: none;
        }

        .positioned-target {
          height: 64px;
          border-radius: 6px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 5;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        }

        .positioned-target h6 {
          font-size: 0.75rem;
          font-weight: 700;
          margin: 0;
          color: #ffffff;
        }

        .target-tag {
          font-size: 0.58rem;
          font-weight: 800;
          background: rgba(255,255,255,0.25);
          color: #ffffff;
          padding: 1px 4px;
          border-radius: 3px;
          align-self: flex-start;
          margin-bottom: 2px;
        }

        .offset-debug-telemetry {
          font-size: 0.58rem;
          font-family: 'Fira Code', monospace;
          color: rgba(255,255,255,0.9);
          margin-top: 2px;
        }

        .scroll-filler {
          height: 180px;
          background: #f8fafc;
          border-style: dotted;
        }

        .secondary-filler {
          height: 120px;
          background: #f1f5f9;
        }
      `}} />
    </div>
  );
};

export default CSSPositioningLab;
