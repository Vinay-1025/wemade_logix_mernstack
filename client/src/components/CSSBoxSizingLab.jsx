import React, { useState } from 'react';
import { Sliders, RefreshCw, Copy, Info } from 'lucide-react';

const CSSBoxSizingLab = () => {
  const [width, setWidth] = useState(200);
  const [padding, setPadding] = useState(20);
  const [border, setBorder] = useState(6);
  const [borderColor, setBorderColor] = useState('#0891b2');
  const [copied, setCopied] = useState(false);

  const resetAll = () => {
    setWidth(200);
    setPadding(20);
    setBorder(6);
    setBorderColor('#0891b2');
  };

  const copyReset = () => {
    const cssText = `/* Universal Box Sizing Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
}`;
    navigator.clipboard.writeText(cssText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculations
  const contentBoxVisualWidth = width + (padding * 2) + (border * 2);
  const borderBoxVisualWidth = width;

  const contentBoxContentWidth = width;
  const borderBoxContentWidth = Math.max(0, width - (padding * 2) - (border * 2));

  return (
    <div className="box-sizing-lab-root">
      <div className="lab-grid">
        {/* Controls Column */}
        <div className="controls-panel">
          <div className="telemetry-card">
            <div className="card-heading">
              <Sliders className="icon-cyan" size={20} />
              <h4>Sizing Configuration</h4>
            </div>
            <p className="description">Adjust core sizing variables to observe layout boundary drift.</p>

            <div className="bg-panel">
              <span className="panel-section-title text-primary-cyan">Set Width Property</span>
              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Declared Width</span>
                  <span className="val-lbl">{width}px</span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="280"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="bg-panel">
              <span className="panel-section-title text-primary-cyan">Set Padding (All Sides)</span>
              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Padding</span>
                  <span className="val-lbl">{padding}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={padding}
                  onChange={(e) => setPadding(parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="bg-panel">
              <span className="panel-section-title text-primary-cyan">Set Border (All Sides)</span>
              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Border Width</span>
                  <span className="val-lbl">{border}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={border}
                  onChange={(e) => setBorder(parseInt(e.target.value))}
                />
              </div>
              <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="slide-lbl" style={{ flexGrow: 1 }}>Border Color</span>
                <input
                  type="color"
                  className="color-picker"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button className="reset-btn" onClick={resetAll}>
                <RefreshCw size={14} style={{ marginRight: '6px' }} /> Reset
              </button>
              <button className="copy-btn" onClick={copyReset} style={{ flexGrow: 1 }}>
                <Copy size={14} style={{ marginRight: '6px' }} /> {copied ? 'Copied Reset!' : 'Copy Universal Reset'}
              </button>
            </div>
          </div>

          <div className="telemetry-card educational-card">
            <div className="card-heading">
              <Info className="icon-cyan" size={20} />
              <h4>Why Border-Box Wins</h4>
            </div>
            <p className="educational-note-text">
              In responsive layouts, components are styled using percentages (e.g. <code>width: 50%</code>).
              Under the default <code>content-box</code> model, adding any padding or borders makes the component
              larger than 50%, causing elements to wrap and break your grid.
              By resetting elements to <code>border-box</code>, a 50% wide card stays exactly 50% wide,
              absorbing padding and border inputs internally.
            </p>
          </div>
        </div>

        {/* Comparison Render Area */}
        <div className="preview-panel">
          <div className="telemetry-card comparison-card">
            <div className="card-heading">
              <Info className="icon-purple" size={20} />
              <h4>Side-by-Side Sizing Engine Comparison</h4>
            </div>
            <p className="description">
              Dashed guidelines show the boundary delta. The Content-box box grows, while the Border-box box stays locked.
            </p>

            <div className="comparison-sandbox">
              {/* Guidelines Overlay */}
              <div className="guidelines-container" style={{ width: `${width}px` }}>
                <div className="decl-width-line">
                  <span className="line-lbl">Declared: {width}px</span>
                </div>
              </div>

              <div className="sizing-boxes-flex">
                {/* CONTENT BOX CONTAINER */}
                <div className="sizing-column">
                  <span className="mode-tag mode-content">content-box</span>

                  <div className="box-container-wrap">
                    <div
                      className="demo-box content-box-elem"
                      style={{
                        width: `${width}px`,
                        padding: `${padding}px`,
                        border: `${border}px solid ${borderColor}`,
                        boxSizing: 'content-box',
                        height: '140px',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <div className="inner-label">
                        <span className="content-dim-lbl">Content Area: {contentBoxContentWidth}px</span>
                      </div>
                    </div>
                  </div>

                  <div className="math-telemetry">
                    <span className="title">Visual Math:</span>
                    <span className="formula">
                      width + padding(L+R) + border(L+R)
                    </span>
                    <span className="calculation">
                      {width} + {padding * 2} + {border * 2} = <strong>{contentBoxVisualWidth}px</strong>
                    </span>
                  </div>
                </div>

                {/* BORDER BOX CONTAINER */}
                <div className="sizing-column">
                  <span className="mode-tag mode-border">border-box</span>

                  <div className="box-container-wrap">
                    <div
                      className="demo-box border-box-elem"
                      style={{
                        width: `${width}px`,
                        padding: `${padding}px`,
                        border: `${border}px solid ${borderColor}`,
                        boxSizing: 'border-box',
                        height: '140px',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <div className="inner-label">
                        <span className="content-dim-lbl">Content Area: {borderBoxContentWidth}px</span>
                      </div>
                    </div>
                  </div>

                  <div className="math-telemetry">
                    <span className="title">Visual Math:</span>
                    <span className="formula">
                      width property includes padding & border
                    </span>
                    <span className="calculation">
                      Stays locked = <strong>{borderBoxVisualWidth}px</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .box-sizing-lab-root {
          font-family: 'Outfit', 'Inter', sans-serif;
          color: #1e293b;
        }

        .lab-grid {
          display: grid;
          grid-template-columns: 1.15fr 1.25fr;
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

        .icon-cyan { color: #0891b2; }
        .icon-purple { color: #7c3aed; }

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

        .text-primary-cyan { color: #0891b2; }

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
          background: #0891b2;
          cursor: pointer;
        }

        .color-picker {
          border: 1px solid #cbd5e1;
          padding: 2px;
          border-radius: 6px;
          width: 40px;
          height: 28px;
          cursor: pointer;
          background: none;
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
          background: #0891b2;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          color: white;
          font-size: 0.75rem;
          cursor: pointer;
          font-weight: 600;
        }

        .copy-btn:hover {
          background: #06b6d4;
        }

        .educational-card {
          border-left: 4px solid #0891b2;
        }

        .educational-note-text {
          font-size: 0.76rem;
          color: #475569;
          line-height: 1.6;
          margin: 0;
        }

        .educational-note-text code {
          background: #f1f5f9;
          padding: 2px 4px;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          color: #0891b2;
          font-size: 0.72rem;
        }

        /* Comparison Sandbox */
        .comparison-sandbox {
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 8px;
          padding: 24px;
          position: relative;
          min-height: 280px;
        }

        .guidelines-container {
          position: absolute;
          left: 24px;
          top: 0;
          bottom: 0;
          border-right: 2px dashed rgba(124, 58, 237, 0.4);
          pointer-events: none;
          z-index: 1;
        }

        .decl-width-line {
          position: absolute;
          top: 10px;
          right: 0;
          transform: translateX(50%);
          background: #7c3aed;
          color: white;
          font-size: 0.6rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          white-space: nowrap;
        }

        .sizing-boxes-flex {
          display: flex;
          gap: 24px;
          position: relative;
          z-index: 2;
        }

        .sizing-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .mode-tag {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 100px;
          margin-bottom: 16px;
          letter-spacing: 0.05em;
        }

        .mode-content {
          background: #fee2e2;
          color: #ef4444;
        }

        .mode-border {
          background: #dcfce7;
          color: #16a34a;
        }

        .box-container-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height: 180px;
        }

        .demo-box {
          border-radius: 4px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          transition: all 0.15s ease;
        }

        .inner-label {
          background: rgba(8, 145, 178, 0.08);
          border: 1px dashed rgba(8, 145, 178, 0.3);
          padding: 8px;
          border-radius: 4px;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
        }

        .content-dim-lbl {
          font-size: 0.7rem;
          font-weight: 700;
          color: #0891b2;
          font-family: 'Fira Code', monospace;
        }

        .math-telemetry {
          margin-top: 16px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 8px 12px;
          width: 100%;
          text-align: center;
        }

        .math-telemetry .title {
          font-size: 0.65rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          display: block;
        }

        .math-telemetry .formula {
          font-size: 0.6rem;
          color: #94a3b8;
          display: block;
          margin-bottom: 2px;
        }

        .math-telemetry .calculation {
          font-size: 0.78rem;
          font-family: 'Fira Code', monospace;
          color: #0f172a;
        }

        .math-telemetry .calculation strong {
          color: #7c3aed;
        }
      `}} />
    </div>
  );
};

export default CSSBoxSizingLab;
