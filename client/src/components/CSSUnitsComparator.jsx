import React, { useState } from 'react';
import { Ruler, HelpCircle, Info, Copy, Check, Grid, Move, Maximize2 } from 'lucide-react';

const CSSUnitsComparator = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [rootFontSize, setRootFontSize] = useState(16); // px
  const [parentFontSize, setParentFontSize] = useState(16); // px
  const [parentWidth, setParentWidth] = useState(450); // px
  const [viewportWidth, setViewportWidth] = useState(700); // px (simulated)

  // Compound em scaling state
  const [nestedEmScale, setNestedEmScale] = useState(1.2); // em multiplier

  // Preset widths to compare
  const pxVal = 160;
  const remVal = 10; // 10rem
  const emVal = 10;  // 10em
  const pctVal = 40;  // 40%
  const vwVal = 25;  // 25vw

  const computedPxWidth = pxVal;
  const computedRemWidth = remVal * rootFontSize;
  const computedEmWidth = emVal * parentFontSize;
  const computedPctWidth = (pctVal / 100) * parentWidth;
  const computedVwWidth = (vwVal / 100) * viewportWidth;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const unitsCode = `/* Comparing units output */
.box-px  { width: 160px; }
.box-rem { width: 10rem; } /* relative to html font-size: ${rootFontSize}px */
.box-em  { width: 10em; }  /* relative to parent font-size: ${parentFontSize}px */
.box-pct  { width: 40%; }   /* relative to parent container width: ${parentWidth}px */
.box-vw  { width: 25vw; }   /* relative to viewport width: ${viewportWidth}px */

/* Compound em scaling issue */
.nested-parent     { font-size: ${nestedEmScale}em; } /* ${(16 * nestedEmScale).toFixed(1)}px */
.nested-child      { font-size: ${nestedEmScale}em; } /* ${(16 * nestedEmScale * nestedEmScale).toFixed(1)}px */
.nested-grandchild { font-size: ${nestedEmScale}em; } /* ${(16 * nestedEmScale * nestedEmScale * nestedEmScale).toFixed(1)}px */`;

  return (
    <div className="units-lab-root">
      <div className="lab-grid">
        
        {/* Controls Column */}
        <div className="control-panel">
          <div className="telemetry-card">
            <div className="card-heading">
              <Ruler className="icon-cyan" size={20} />
              <h4>CSS Sizing Context Engines</h4>
            </div>
            <p className="description">
              Adjust base parameters to see how absolute and relative widths recalculate dynamically in real-time.
            </p>

            <div className="sliders-container bg-panel">
              <h5 className="sub-section-lbl text-primary-cyan">Relative Font Bases</h5>
              
              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Root Font Size (<code>html</code>)</span>
                  <span className="computed-badge text-cyan font-mono">{rootFontSize}px</span>
                </div>
                <input type="range" min="10" max="24" value={rootFontSize} onChange={(e) => setRootFontSize(parseInt(e.target.value))} />
                <span className="field-help">Determines computing base for all <code>rem</code> units.</span>
              </div>

              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Parent element font-size</span>
                  <span className="computed-badge text-purple font-mono">{parentFontSize}px</span>
                </div>
                <input type="range" min="10" max="32" value={parentFontSize} onChange={(e) => setParentFontSize(parseInt(e.target.value))} />
                <span className="field-help">Determines computing base for local child <code>em</code> units.</span>
              </div>
            </div>

            <div className="sliders-container bg-panel">
              <h5 className="sub-section-lbl text-primary-purple">Layout Bounding Contexts</h5>

              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Parent Container Width</span>
                  <span className="computed-badge font-mono">{parentWidth}px</span>
                </div>
                <input type="range" min="200" max="550" value={parentWidth} onChange={(e) => setParentWidth(parseInt(e.target.value))} />
                <span className="field-help">Determines base for children styled with percentages (<code>%</code>).</span>
              </div>

              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Simulated Viewport Width</span>
                  <span className="computed-badge font-mono text-cyan">{viewportWidth}px</span>
                </div>
                <input type="range" min="320" max="1200" value={viewportWidth} onChange={(e) => setViewportWidth(parseInt(e.target.value))} />
                <span className="field-help">Determines computing base for viewport width (<code>vw</code>) rules.</span>
              </div>
            </div>
          </div>

          {/* Compound Scaling Section */}
          <div className="telemetry-card">
            <div className="card-heading">
              <Grid className="icon-purple" size={20} />
              <h4>Compound Sizing Lab (Nested em)</h4>
            </div>
            <p className="description">
              Because <code>em</code> values are calculated from their immediate parent size, nested components multiply. Drag the slider to observe compounds in action.
            </p>

            <div className="compound-sliders bg-panel">
              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Local em multiplier</span>
                  <span className="computed-badge text-purple font-mono">{nestedEmScale}em ({Math.round(nestedEmScale * 100)}%)</span>
                </div>
                <input 
                  type="range" 
                  min="0.8" 
                  max="1.6" 
                  step="0.05"
                  value={nestedEmScale} 
                  onChange={(e) => setNestedEmScale(parseFloat(e.target.value))} 
                />
              </div>

              <div className="compound-graph-tree">
                {/* Root level (16px base) */}
                <div className="nested-box root-box">
                  <span className="box-lbl">HTML Root (16px)</span>
                  
                  {/* Parent em level */}
                  <div className="nested-box parent-box" style={{ fontSize: `${nestedEmScale}em` }}>
                    <span className="box-lbl">Parent ({(nestedEmScale).toFixed(2)}em = {(16 * nestedEmScale).toFixed(1)}px)</span>

                    {/* Child em level */}
                    <div className="nested-box child-box" style={{ fontSize: `${nestedEmScale}em` }}>
                      <span className="box-lbl">Child ({(nestedEmScale * nestedEmScale).toFixed(2)}em = {(16 * nestedEmScale * nestedEmScale).toFixed(1)}px)</span>

                      {/* Grandchild em level */}
                      <div className="nested-box grandchild-box" style={{ fontSize: `${nestedEmScale}em` }}>
                        <span className="box-lbl">Grandchild ({(nestedEmScale * nestedEmScale * nestedEmScale).toFixed(2)}em = {(16 * nestedEmScale * nestedEmScale * nestedEmScale).toFixed(1)}px)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="educational-note" style={{ marginTop: '12px' }}>
                <Info size={14} className="note-icon" />
                <p>Formula: Parent font-size multiplies down the tree. Notice how the grandchild scales rapidly. Using root-relative <code>rem</code> bypasses this compound nesting issue entirely!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Display Frame / Output Column */}
        <div className="preview-panel">
          <div className="telemetry-card comparison-display-card">
            <div className="card-heading header-between">
              <h4>Computed Width Metrics Sandbox</h4>
              <span className="parent-limit font-mono">Bound: {parentWidth}px</span>
            </div>
            <p className="description">
              Displays computed width outcomes of stylesheet rules relative to active root, parent, and viewport dimensions.
            </p>

            <div className="sandbox-wrapper">
              <div className="parent-bounding-container" style={{ width: `${parentWidth}px` }}>
                <div className="container-tag">Parent Container Layout Box ({parentWidth}px)</div>

                {/* PX Row */}
                <div className="visualization-row">
                  <div className="row-metadata">
                    <span>Absolute Pixel: <code>width: 160px</code></span>
                    <strong className="computed-px-val">{computedPxWidth}px</strong>
                  </div>
                  <div className="render-bar bar-px" style={{ width: `${computedPxWidth}px` }}>
                    <Move className="bar-move-icon" size={12} />
                  </div>
                </div>

                {/* REM Row */}
                <div className="visualization-row">
                  <div className="row-metadata">
                    <span>Root-Relative: <code>width: 10rem</code> <span className="math-lbl">(10 × {rootFontSize}px)</span></span>
                    <strong className="computed-px-val text-cyan">{computedRemWidth.toFixed(0)}px</strong>
                  </div>
                  <div className="render-bar bar-rem" style={{ width: `${Math.min(computedRemWidth, parentWidth)}px` }}>
                    {computedRemWidth > parentWidth && <span className="overflow-warning">Exceeds Parent</span>}
                    <Maximize2 className="bar-move-icon" size={12} />
                  </div>
                </div>

                {/* EM Row */}
                <div className="visualization-row">
                  <div className="row-metadata">
                    <span>Local-Relative: <code>width: 10em</code> <span className="math-lbl">(10 × {parentFontSize}px)</span></span>
                    <strong className="computed-px-val text-purple">{computedEmWidth.toFixed(0)}px</strong>
                  </div>
                  <div className="render-bar bar-em" style={{ width: `${Math.min(computedEmWidth, parentWidth)}px` }}>
                    {computedEmWidth > parentWidth && <span className="overflow-warning">Exceeds Parent</span>}
                    <Maximize2 className="bar-move-icon" size={12} />
                  </div>
                </div>

                {/* PCT Row */}
                <div className="visualization-row">
                  <div className="row-metadata">
                    <span>Percentage: <code>width: 40%</code> <span className="math-lbl">(40% of {parentWidth}px)</span></span>
                    <strong className="computed-px-val">{computedPctWidth.toFixed(0)}px</strong>
                  </div>
                  <div className="render-bar bar-pct" style={{ width: `${computedPctWidth}px` }}></div>
                </div>

                {/* VW Row */}
                <div className="visualization-row">
                  <div className="row-metadata">
                    <span>Viewport Width: <code>width: 25vw</code> <span className="math-lbl">(25% of {viewportWidth}px)</span></span>
                    <strong className="computed-px-val text-cyan">{computedVwWidth.toFixed(0)}px</strong>
                  </div>
                  <div className="render-bar bar-vw" style={{ width: `${Math.min(computedVwWidth, parentWidth)}px` }}>
                    {computedVwWidth > parentWidth && <span className="overflow-warning">Exceeds Parent</span>}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="educational-note" style={{ marginTop: '12px' }}>
              <HelpCircle size={14} className="note-icon" />
              <p>Viewport width <code>vw</code> bars will overflow the parent container if the simulated browser width grows larger than the parent component itself.</p>
            </div>
          </div>

          {/* Code block view */}
          <div className="telemetry-card">
            <div className="card-heading header-between">
              <h4>Active CSS Unit Formulas</h4>
              <button className="copy-btn" onClick={() => handleCopy(unitsCode)}>
                {copySuccess ? <Check size={14} className="green-text" /> : <Copy size={14} />}
                <span>{copySuccess ? 'Copied Details!' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="css-pre">
              <code>{unitsCode}</code>
            </pre>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .units-lab-root {
          font-family: 'Outfit', 'Inter', sans-serif;
          color: #f8fafc;
        }

        .lab-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 20px;
        }

        @media (max-width: 900px) {
          .lab-grid {
            grid-template-columns: 1fr;
          }
        }

        .control-panel, .preview-panel {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .telemetry-card {
          background: #131b2e;
          border: 1px solid #1e293b;
          border-radius: 12px;
          padding: 20px;
        }

        .card-heading {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .card-heading.header-between {
          justify-content: space-between;
        }

        .card-heading h4 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .icon-cyan { color: #06b6d4; }
        .icon-purple { color: #a855f7; }
        
        .description {
          font-size: 0.8rem;
          color: #94a3b8;
          line-height: 1.5;
          margin: 0 0 16px 0;
        }

        .bg-panel {
          background: #0b0f19;
          border: 1px solid #1e293b;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 12px;
        }

        .sub-section-lbl {
          font-size: 0.78rem;
          font-weight: 700;
          margin: 0 0 10px 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .text-primary-cyan { color: #06b6d4; }
        .text-primary-purple { color: #a855f7; }

        .slide-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 12px;
        }

        .slide-lbl {
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .flex-lbl-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .computed-badge {
          font-size: 0.75rem;
          font-weight: 700;
        }

        .slide-row input[type="range"] {
          -webkit-appearance: none;
          width: 100%;
          height: 5px;
          border-radius: 100px;
          background: #1e293b;
          outline: none;
        }

        .slide-row input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
        }

        .field-help {
          font-size: 0.65rem;
          color: #64748b;
        }

        /* Nested Compound Sizing Graph */
        .compound-graph-tree {
          background: #060913;
          border: 1px dashed #1e293b;
          border-radius: 6px;
          padding: 16px;
          margin-top: 12px;
        }

        .nested-box {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px;
          padding: 10px;
          margin-top: 6px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .box-lbl {
          font-family: 'Fira Code', monospace;
          font-size: 0.62rem;
          font-weight: 600;
          color: #64748b;
        }

        .root-box {
          background: rgba(255,255,255,0.01);
          border-color: #1e293b;
        }

        .parent-box {
          background: rgba(168, 85, 247, 0.03);
          border-color: rgba(168, 85, 247, 0.25);
        }

        .parent-box > .box-lbl {
          color: #c084fc;
        }

        .child-box {
          background: rgba(168, 85, 247, 0.05);
          border-color: rgba(168, 85, 247, 0.4);
        }

        .child-box > .box-lbl {
          color: #d8b4fe;
        }

        .grandchild-box {
          background: rgba(168, 85, 247, 0.08);
          border-color: rgba(168, 85, 247, 0.6);
        }

        .grandchild-box > .box-lbl {
          color: #f3e8ff;
        }

        /* Bounding Container Sandbox */
        .sandbox-wrapper {
          background: #0b0f19;
          border: 1px solid #1e293b;
          border-radius: 8px;
          padding: 16px;
          min-height: 320px;
          overflow-x: auto;
          display: flex;
          align-items: center;
        }

        .parent-bounding-container {
          background: rgba(255,255,255,0.01);
          border: 2px dashed #334155;
          border-radius: 6px;
          padding: 12px;
          position: relative;
          box-sizing: border-box;
          transition: width 0.2s ease;
        }

        .container-tag {
          font-size: 0.62rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          margin-bottom: 12px;
          border-bottom: 1px solid #1e293b;
          padding-bottom: 4px;
        }

        .visualization-row {
          margin-bottom: 12px;
        }

        .row-metadata {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          color: #94a3b8;
          margin-bottom: 4px;
        }

        .row-metadata code {
          font-family: 'Fira Code', monospace;
          color: #cbd5e1;
        }

        .math-lbl {
          font-size: 0.65rem;
          color: #64748b;
        }

        .computed-px-val {
          font-size: 0.75rem;
          font-weight: 700;
        }

        .render-bar {
          height: 14px;
          border-radius: 3px;
          background: #334155;
          position: relative;
          display: flex;
          align-items: center;
          padding-left: 6px;
          color: #0f172a;
          box-sizing: border-box;
          transition: width 0.2s ease;
        }

        .bar-px { background: #64748b; color: white; }
        .bar-rem { background: #06b6d4; }
        .bar-em { background: #a855f7; }
        .bar-pct { background: #e2e8f0; }
        .bar-vw { background: #06b6d4; border: 1px solid #22d3ee; }

        .bar-move-icon {
          position: absolute;
          right: 4px;
          opacity: 0.6;
        }

        .overflow-warning {
          position: absolute;
          right: 20px;
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #ef4444;
        }

        .parent-limit {
          font-size: 0.75rem;
          background: #1e293b;
          padding: 2px 8px;
          border-radius: 4px;
          color: #94a3b8;
        }

        .educational-note {
          display: flex;
          gap: 8px;
          padding: 10px;
          background: rgba(255,255,255,0.02);
          border-radius: 6px;
          font-size: 0.74rem;
          color: #64748b;
          line-height: 1.4;
        }

        .note-icon {
          color: #06b6d4;
          flex-shrink: 0;
        }

        /* Copy Button and Pre styling */
        .css-pre {
          background: #0b0f19;
          border: 1px solid #1e293b;
          border-radius: 8px;
          padding: 12px;
          overflow-x: auto;
          margin: 0;
        }

        .css-pre code {
          font-family: 'Fira Code', monospace;
          font-size: 0.72rem;
          color: #a7f3d0;
        }

        .copy-btn {
          background: #0f172a;
          border: 1px solid #1e293b;
          padding: 4px 10px;
          border-radius: 6px;
          color: #94a3b8;
          font-size: 0.72rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }

        .copy-btn:hover {
          color: white;
          border-color: #cbd5e1;
        }

        .green-text { color: #10b981; }
        .text-cyan { color: #06b6d4; }
        .text-purple { color: #c084fc; }
      `}} />
    </div>
  );
};

export default CSSUnitsComparator;
