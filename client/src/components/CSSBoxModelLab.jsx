import React, { useState } from 'react';
import { Sliders, RefreshCw, Copy, Info } from 'lucide-react';

const CSSBoxModelLab = () => {
  const [padding, setPadding] = useState({ top: 16, right: 16, bottom: 16, left: 16 });
  const [margin, setMargin] = useState({ top: 20, right: 20, bottom: 20, left: 20 });
  const [border, setBorder] = useState({ top: 4, right: 4, bottom: 4, left: 4 });
  const [boxSize, setBoxSize] = useState({ width: 220, height: 120 });
  const [borderColor, setBorderColor] = useState('#7c3aed');
  const [borderStyle, setBorderStyle] = useState('solid');
  const [marginCollapse, setMarginCollapse] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);

  const resetAll = () => {
    setPadding({ top: 16, right: 16, bottom: 16, left: 16 });
    setMargin({ top: 20, right: 20, bottom: 20, left: 20 });
    setBorder({ top: 4, right: 4, bottom: 4, left: 4 });
    setBoxSize({ width: 220, height: 120 });
    setBorderStyle('solid');
    setBorderColor('#7c3aed');
    setMarginCollapse(false);
  };

  const copyCSS = () => {
    const cssText = `.custom-box {
  width: ${boxSize.width}px;
  height: ${boxSize.height}px;
  padding: ${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;
  border-width: ${border.top}px ${border.right}px ${border.bottom}px ${border.left}px;
  border-style: ${borderStyle};
  border-color: ${borderColor};
  margin: ${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px;
}`;
    navigator.clipboard.writeText(cssText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Math for total computed width/height (assuming content-box sizing)
  const totalWidth = boxSize.width + padding.left + padding.right + border.left + border.right;
  const totalHeight = boxSize.height + padding.top + padding.bottom + border.top + border.bottom;

  return (
    <div className="box-model-lab-root">
      <div className="lab-grid">
        {/* Controls Column */}
        <div className="controls-panel">
          <div className="telemetry-card">
            <div className="card-heading">
              <Sliders className="icon-purple" size={20} />
              <h4>Box Dimensions & Spacing</h4>
            </div>
            <p className="description">Adjust sliders to shape content, padding, border, and margin parameters.</p>

            {/* Content Size */}
            <div className="bg-panel">
              <span className="panel-section-title text-primary-purple">Content Size (px)</span>
              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Width</span>
                  <span className="val-lbl">{boxSize.width}px</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="300"
                  value={boxSize.width}
                  onChange={(e) => setBoxSize({ ...boxSize, width: parseInt(e.target.value) })}
                />
              </div>
              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Height</span>
                  <span className="val-lbl">{boxSize.height}px</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="200"
                  value={boxSize.height}
                  onChange={(e) => setBoxSize({ ...boxSize, height: parseInt(e.target.value) })}
                />
              </div>
            </div>

            {/* Padding Controls */}
            <div className="bg-panel">
              <span className="panel-section-title text-primary-cyan">Padding (px)</span>
              <div className="dimensions-grid">
                {['top', 'right', 'bottom', 'left'].map((dir) => (
                  <div key={`pad-${dir}`} className="dim-input">
                    <span className="dim-lbl">{dir}</span>
                    <input
                      type="number"
                      min="0"
                      max="60"
                      value={padding[dir]}
                      onChange={(e) => setPadding({ ...padding, [dir]: Math.max(0, parseInt(e.target.value) || 0) })}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Border Controls */}
            <div className="bg-panel">
              <span className="panel-section-title text-primary-gold">Border (px)</span>
              <div className="dimensions-grid">
                {['top', 'right', 'bottom', 'left'].map((dir) => (
                  <div key={`bor-${dir}`} className="dim-input">
                    <span className="dim-lbl">{dir}</span>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={border[dir]}
                      onChange={(e) => setBorder({ ...border, [dir]: Math.max(0, parseInt(e.target.value) || 0) })}
                    />
                  </div>
                ))}
              </div>
              <div className="border-style-row" style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                <select
                  className="select-styled"
                  value={borderStyle}
                  onChange={(e) => setBorderStyle(e.target.value)}
                  style={{ flex: 1 }}
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                  <option value="double">Double</option>
                </select>
                <input
                  type="color"
                  className="color-picker"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                />
              </div>
            </div>

            {/* Margin Controls */}
            <div className="bg-panel">
              <span className="panel-section-title" style={{ color: '#ea580c' }}>Margin (px)</span>
              <div className="dimensions-grid">
                {['top', 'right', 'bottom', 'left'].map((dir) => (
                  <div key={`mar-${dir}`} className="dim-input">
                    <span className="dim-lbl">{dir}</span>
                    <input
                      type="number"
                      min="0"
                      max="60"
                      value={margin[dir]}
                      onChange={(e) => setMargin({ ...margin, [dir]: Math.max(0, parseInt(e.target.value) || 0) })}
                    />
                  </div>
                ))}
              </div>
            </div>

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
        </div>

        {/* Viewport Visualization Column */}
        <div className="preview-panel">
          {/* Interactive Concentric Diagram */}
          <div className="telemetry-card map-card">
            <div className="card-heading">
              <Info className="icon-purple" size={20} />
              <h4>Visual Box Model Diagram</h4>
            </div>
            <p className="description">Hover parts of the diagram to isolate details. Values update in real-time.</p>

            <div className="concentric-container">
              {/* MARGIN LAYER */}
              <div
                className={`concentric-layer margin-layer ${hoveredSection === 'margin' ? 'highlighted' : ''}`}
                onMouseEnter={() => setHoveredSection('margin')}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div className="layer-title">MARGIN</div>
                <div className="dir-indicator val-top">{margin.top}</div>
                <div className="dir-indicator val-right">{margin.right}</div>
                <div className="dir-indicator val-bottom">{margin.bottom}</div>
                <div className="dir-indicator val-left">{margin.left}</div>

                {/* BORDER LAYER */}
                <div
                  className={`concentric-layer border-layer ${hoveredSection === 'border' ? 'highlighted' : ''}`}
                  onMouseEnter={() => setHoveredSection('border')}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <div className="layer-title">BORDER</div>
                  <div className="dir-indicator val-top">{border.top}</div>
                  <div className="dir-indicator val-right">{border.right}</div>
                  <div className="dir-indicator val-bottom">{border.bottom}</div>
                  <div className="dir-indicator val-left">{border.left}</div>

                  {/* PADDING LAYER */}
                  <div
                    className={`concentric-layer padding-layer ${hoveredSection === 'padding' ? 'highlighted' : ''}`}
                    onMouseEnter={() => setHoveredSection('padding')}
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    <div className="layer-title">PADDING</div>
                    <div className="dir-indicator val-top">{padding.top}</div>
                    <div className="dir-indicator val-right">{padding.right}</div>
                    <div className="dir-indicator val-bottom">{padding.bottom}</div>
                    <div className="dir-indicator val-left">{padding.left}</div>

                    {/* CONTENT LAYER */}
                    <div
                      className={`concentric-layer content-layer ${hoveredSection === 'content' ? 'highlighted' : ''}`}
                      onMouseEnter={() => setHoveredSection('content')}
                      onMouseLeave={() => setHoveredSection(null)}
                    >
                      <div className="layer-title">CONTENT</div>
                      <div className="content-dimensions">
                        {boxSize.width} × {boxSize.height}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="computed-metrics">
              <div className="metric-col">
                <span className="lbl">Computed Width</span>
                <span className="val">{totalWidth}px</span>
                <span className="formula">
                  {boxSize.width}w + {padding.left + padding.right}p + {border.left + border.right}b
                </span>
              </div>
              <div className="metric-col">
                <span className="lbl">Computed Height</span>
                <span className="val">{totalHeight}px</span>
                <span className="formula">
                  {boxSize.height}h + {padding.top + padding.bottom}p + {border.top + border.bottom}b
                </span>
              </div>
            </div>
          </div>

          {/* Sandbox Live Render */}
          <div className="telemetry-card preview-card">
            <div className="card-heading">
              <Info className="icon-cyan" size={20} />
              <h4>Live Box Sandbox (Light Theme Only)</h4>
            </div>
            <p className="description">Dynamic preview showing margins, borders, and paddings applied to a realistic web card.</p>

            <div className="sandbox-wrapper">
              <div className="margin-boundary-box" style={{
                paddingTop: `${margin.top}px`,
                paddingRight: `${margin.right}px`,
                paddingBottom: `${margin.bottom}px`,
                paddingLeft: `${margin.left}px`,
              }}>
                <div
                  className="preview-element"
                  style={{
                    width: `${boxSize.width}px`,
                    height: `${boxSize.height}px`,
                    paddingTop: `${padding.top}px`,
                    paddingRight: `${padding.right}px`,
                    paddingBottom: `${padding.bottom}px`,
                    paddingLeft: `${padding.left}px`,
                    borderTop: `${border.top}px ${borderStyle} ${borderColor}`,
                    borderRight: `${border.right}px ${borderStyle} ${borderColor}`,
                    borderBottom: `${border.bottom}px ${borderStyle} ${borderColor}`,
                    borderLeft: `${border.left}px ${borderStyle} ${borderColor}`,
                    boxSizing: 'content-box',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div className="box-inner-content">
                    <span className="tag">Preview Card</span>
                    <h5>Visual Container</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Output */}
          <div className="telemetry-card">
            <div className="card-heading">
              <Info className="icon-cyan" size={20} />
              <h4>Generated Stylesheet</h4>
            </div>
            <pre className="css-pre">
              <code>
                <span className="green-text">.custom-box</span> {'{\n'}
                {'  '}width: <span className="text-cyan">{boxSize.width}px</span>;{'\n'}
                {'  '}height: <span className="text-cyan">{boxSize.height}px</span>;{'\n'}
                {'  '}padding: <span className="text-cyan">{padding.top}px {padding.right}px {padding.bottom}px {padding.left}px</span>;{'\n'}
                {'  '}border-width: <span className="text-cyan">{border.top}px {border.right}px {border.bottom}px {border.left}px</span>;{'\n'}
                {'  '}border-style: <span className="text-purple">{borderStyle}</span>;{'\n'}
                {'  '}border-color: <span className="text-purple">{borderColor}</span>;{'\n'}
                {'  '}margin: <span className="text-cyan">{margin.top}px {margin.right}px {margin.bottom}px {margin.left}px</span>;{'\n'}
                {'}'}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .box-model-lab-root {
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
        .icon-gold { color: #f59e0b; }

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
        .text-primary-gold { color: #f59e0b; }

        .slide-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 10px;
        }

        .slide-row:last-child {
          margin-bottom: 0;
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

        .dimensions-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }

        .dim-input {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: center;
        }

        .dim-lbl {
          font-size: 0.6rem;
          text-transform: uppercase;
          font-weight: 600;
          color: #64748b;
        }

        .dim-input input {
          width: 100%;
          text-align: center;
          padding: 6px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          font-size: 0.8rem;
          color: #0f172a;
          background: #ffffff;
          outline: none;
        }

        .dim-input input:focus {
          border-color: #7c3aed;
        }

        .select-styled {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #0f172a;
          font-size: 0.78rem;
          padding: 6px 10px;
          border-radius: 6px;
          outline: none;
        }

        .color-picker {
          border: 1px solid #cbd5e1;
          padding: 2px;
          border-radius: 6px;
          width: 40px;
          height: 30px;
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

        /* Concentric Box Model Diagram */
        .concentric-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 24px 0;
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 8px;
          min-height: 260px;
          position: relative;
        }

        .concentric-layer {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          position: relative;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }

        .layer-title {
          position: absolute;
          top: 4px;
          left: 6px;
          font-size: 0.55rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: rgba(15,23,42,0.4);
          pointer-events: none;
        }

        .dir-indicator {
          position: absolute;
          font-size: 0.65rem;
          font-weight: 700;
          color: #0f172a;
          pointer-events: none;
        }

        .val-top { top: 3px; left: 50%; transform: translateX(-50%); }
        .val-right { right: 6px; top: 50%; transform: translateY(-50%); }
        .val-bottom { bottom: 3px; left: 50%; transform: translateX(-50%); }
        .val-left { left: 6px; top: 50%; transform: translateY(-50%); }

        .margin-layer {
          width: 86%;
          max-width: 380px;
          height: 200px;
          background: rgba(234, 88, 12, 0.08);
          border: 2px dashed #ea580c;
        }
        .margin-layer.highlighted {
          background: rgba(234, 88, 12, 0.15);
          box-shadow: 0 0 8px rgba(234, 88, 12, 0.3);
        }

        .border-layer {
          width: calc(100% - 44px);
          height: calc(100% - 44px);
          background: rgba(245, 158, 11, 0.1);
          border: 2px solid #f59e0b;
        }
        .border-layer.highlighted {
          background: rgba(245, 158, 11, 0.25);
          box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
        }

        .padding-layer {
          width: calc(100% - 32px);
          height: calc(100% - 32px);
          background: rgba(16, 185, 129, 0.08);
          border: 2px dashed #10b981;
        }
        .padding-layer.highlighted {
          background: rgba(16, 185, 129, 0.2);
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
        }

        .content-layer {
          width: calc(100% - 48px);
          height: calc(100% - 48px);
          background: rgba(8, 145, 178, 0.12);
          border: 2px solid #0891b2;
        }
        .content-layer.highlighted {
          background: rgba(8, 145, 178, 0.25);
          box-shadow: 0 0 8px rgba(8, 145, 178, 0.4);
        }

        .content-dimensions {
          font-family: 'Fira Code', monospace;
          font-size: 0.72rem;
          font-weight: 700;
          color: #0891b2;
        }

        .computed-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 14px;
        }

        .metric-col {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 10px;
          text-align: center;
        }

        .metric-col .lbl {
          font-size: 0.65rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          display: block;
        }

        .metric-col .val {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0f172a;
          display: block;
          margin: 2px 0;
        }

        .metric-col .formula {
          font-size: 0.62rem;
          font-family: 'Fira Code', monospace;
          color: #94a3b8;
        }

        /* Sandbox Sandbox Visualizer */
        .sandbox-wrapper {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: auto;
          min-height: 250px;
        }

        .margin-boundary-box {
          border: 1px dashed rgba(234, 88, 12, 0.4);
          background: rgba(234, 88, 12, 0.03);
          box-sizing: content-box;
          transition: all 0.15s ease;
        }

        .preview-element {
          background-color: #ffffff;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .box-inner-content {
          pointer-events: none;
        }

        .box-inner-content .tag {
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #7c3aed;
          background: rgba(124, 58, 237, 0.08);
          padding: 2px 6px;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 4px;
        }

        .box-inner-content h5 {
          font-size: 0.85rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        /* Code Block styles */
        .css-pre {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px;
          overflow-x: auto;
          margin: 0;
        }

        .css-pre code {
          font-family: 'Fira Code', monospace;
          font-size: 0.75rem;
          color: #0f766e;
        }

        .green-text { color: #0f766e; font-weight: 600; }
        .text-cyan { color: #0891b2; }
        .text-purple { color: #7c3aed; }
      `}} />
    </div>
  );
};

export default CSSBoxModelLab;
