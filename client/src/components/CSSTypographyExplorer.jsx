import React, { useState, useEffect } from 'react';
import { Type, HelpCircle, Info, Copy, Check, Sliders, Layers, Grid, FileText } from 'lucide-react';

const CSSTypographyExplorer = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [fontFamily, setFontFamily] = useState('Outfit'); // Outfit, Plus Jakarta Sans, Lora, Fira Code, Playfair Display
  const [fontSizeRem, setFontSizeRem] = useState(1.1); // rem size
  const [fontWeight, setFontWeight] = useState(400);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [letterSpacing, setLetterSpacing] = useState(0); // em unit
  const [textTransform, setTextTransform] = useState('none');
  const [textDecoration, setTextDecoration] = useState('none');
  const [textAlign, setTextAlign] = useState('left');
  const [showGrid, setShowGrid] = useState(false);

  // Modular scale variables
  const [baseSizePx, setBaseSizePx] = useState(16);
  const [scaleRatio, setScaleRatio] = useState(1.618); // Golden Ratio (1.618), Perfect Fourth (1.333), Major Third (1.25)

  // Fluid typography variables
  const [minViewport, setMinViewport] = useState(320);
  const [maxViewport, setMinMaxViewport] = useState(1200);
  const [minFontSize, setMinFontSize] = useState(1.0); // rem
  const [maxFontSize, setMaxFontSize] = useState(2.2); // rem
  const [simulatedViewportWidth, setSimulatedViewportWidth] = useState(600); // simulated width

  // Dynamic Google Font Injection
  useEffect(() => {
    const fontId = 'dynamic-google-fonts';
    let linkElement = document.getElementById(fontId);
    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.id = fontId;
      linkElement.rel = 'stylesheet';
      document.head.appendChild(linkElement);
    }
    linkElement.href = `https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Plus+Jakarta+Sans:wght@300;400;600;700&family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Fira+Code:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap`;
  }, []);

  const getFontFamilyStyle = () => {
    if (fontFamily === 'Lora') return "'Lora', Georgia, serif";
    if (fontFamily === 'Fira Code') return "'Fira Code', 'Fira Mono', monospace";
    if (fontFamily === 'Playfair Display') return "'Playfair Display', Lora, serif";
    if (fontFamily === 'Plus Jakarta Sans') return "'Plus Jakarta Sans', sans-serif";
    return "'Outfit', 'Inter', sans-serif";
  };

  // Modular scale calculations
  const calculateScaleValue = (steps) => {
    return baseSizePx * Math.pow(scaleRatio, steps);
  };

  const scaleItems = [
    { label: 'H1 Header', steps: 3, tag: 'h1' },
    { label: 'H2 Header', steps: 2, tag: 'h2' },
    { label: 'H3 Header', steps: 1, tag: 'h3' },
    { label: 'Body Copy (Base)', steps: 0, tag: 'p' },
    { label: 'Small Print', steps: -1, tag: 'small' }
  ];

  // Fluid typography calculations: clamp calculation generator
  // formula: clamp(minSize, yIntersection + slope * vw, maxSize)
  const generateClampCSS = () => {
    const minSizePx = minFontSize * 16;
    const maxSizePx = maxFontSize * 16;
    const slope = (maxSizePx - minSizePx) / (maxViewport - minViewport);
    const yIntersection = minSizePx - slope * minViewport;
    const slopePercent = (slope * 100).toFixed(4);
    const yIntersectionRem = (yIntersection / 16).toFixed(4);
    return `clamp(${minFontSize}rem, ${yIntersectionRem}rem + ${slopePercent}vw, ${maxFontSize}rem)`;
  };

  const getComputedFluidPx = () => {
    const minSizePx = minFontSize * 16;
    const maxSizePx = maxFontSize * 16;
    if (simulatedViewportWidth <= minViewport) return minSizePx;
    if (simulatedViewportWidth >= maxViewport) return maxSizePx;
    const progress = (simulatedViewportWidth - minViewport) / (maxViewport - minViewport);
    return minSizePx + progress * (maxSizePx - minSizePx);
  };

  const typographyCSS = `/* Custom Typography Rules */
.article-container {
  font-family: ${getFontFamilyStyle()};
  font-size: ${fontSizeRem}rem;
  font-weight: ${fontWeight};
  line-height: ${lineHeight};
  letter-spacing: ${letterSpacing}em;
  text-align: ${textAlign};
  text-transform: ${textTransform};
  text-decoration: ${textDecoration};
}

.fluid-headline {
  font-size: ${generateClampCSS()};
  font-weight: 700;
  line-height: 1.2;
}`;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="typo-lab-root">
      <div className="lab-grid">
        
        {/* Controls Column */}
        <div className="control-panel">
          <div className="telemetry-card">
            <div className="card-heading">
              <Sliders className="icon-cyan" size={20} />
              <h4>CSS Type & Spacing Tokens</h4>
            </div>
            <p className="description">
              Tweak sizing, fallbacks, line leading, and spacing channels to inspect how they influence vertical structures.
            </p>

            <div className="sliders-container bg-panel">
              <h5 className="sub-section-lbl text-primary-cyan">Font Stack & Weight</h5>
              
              <div className="input-field-row">
                <div className="input-field">
                  <label htmlFor="font-family-select">Primary Family Stack</label>
                  <select 
                    id="font-family-select"
                    value={fontFamily} 
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="select-styled"
                  >
                    <option value="Outfit">Outfit (Modern Sans)</option>
                    <option value="Plus Jakarta Sans">Plus Jakarta (Geometric)</option>
                    <option value="Lora">Lora (Elegant Editorial Serif)</option>
                    <option value="Playfair Display">Playfair Display (High Contrast Display)</option>
                    <option value="Fira Code">Fira Code (Technical Monospace)</option>
                  </select>
                </div>
              </div>

              <div className="slide-row">
                <span className="slide-lbl">Font Size ({fontSizeRem}rem / {Math.round(fontSizeRem * 16)}px)</span>
                <input type="range" min="0.8" max="2.5" step="0.05" value={fontSizeRem} onChange={(e) => setFontSizeRem(parseFloat(e.target.value))} />
              </div>

              <div className="slide-row">
                <span className="slide-lbl">Font Weight ({fontWeight})</span>
                <input type="range" min="300" max="900" step="100" value={fontWeight} onChange={(e) => setFontWeight(parseInt(e.target.value))} />
              </div>
            </div>

            <div className="sliders-container bg-panel">
              <h5 className="sub-section-lbl text-primary-purple">Micro-spacing Channels</h5>

              <div className="slide-row">
                <span className="slide-lbl">Line Height / Leading ({lineHeight})</span>
                <input type="range" min="1.0" max="2.2" step="0.05" value={lineHeight} onChange={(e) => setLineHeight(parseFloat(e.target.value))} />
              </div>

              <div className="slide-row">
                <span className="slide-lbl">Letter Spacing / Tracking ({letterSpacing}em)</span>
                <input type="range" min="-0.06" max="0.30" step="0.01" value={letterSpacing} onChange={(e) => setLetterSpacing(parseFloat(e.target.value))} />
              </div>

              <div className="input-fields-row-3">
                <div className="input-field">
                  <label htmlFor="align-select">Alignment</label>
                  <select id="align-select" value={textAlign} onChange={(e) => setTextAlign(e.target.value)} className="select-styled">
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="justify">Justify</option>
                  </select>
                </div>

                <div className="input-field">
                  <label htmlFor="transform-select">Transform</label>
                  <select id="transform-select" value={textTransform} onChange={(e) => setTextTransform(e.target.value)} className="select-styled">
                    <option value="none">None</option>
                    <option value="uppercase">Uppercase</option>
                    <option value="lowercase">Lowercase</option>
                    <option value="capitalize">Capitalize</option>
                  </select>
                </div>

                <div className="input-field">
                  <label htmlFor="decor-select">Decoration</label>
                  <select id="decor-select" value={textDecoration} onChange={(e) => setTextDecoration(e.target.value)} className="select-styled">
                    <option value="none">None</option>
                    <option value="underline">Underline</option>
                    <option value="line-through">Line-through</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Fluid Typography clamp calculator */}
          <div className="telemetry-card">
            <div className="card-heading">
              <Layers className="icon-purple" size={20} />
              <h4>Fluid Typography Generator</h4>
            </div>
            <p className="description">
              Generate a single fluid <code>clamp()</code> rule that transitions text size smoothly across mobile, tablet, and desktop viewports.
            </p>

            <div className="clamp-calculator bg-panel">
              <div className="input-fields-row-2">
                <div className="input-field">
                  <label htmlFor="min-font-size-inp">Min Size (rem)</label>
                  <input id="min-font-size-inp" type="number" step="0.1" min="0.5" max="3" value={minFontSize} onChange={(e) => setMinFontSize(parseFloat(e.target.value) || 1)} className="styled-num-input" />
                </div>
                <div className="input-field">
                  <label htmlFor="max-font-size-inp">Max Size (rem)</label>
                  <input id="max-font-size-inp" type="number" step="0.1" min="1.0" max="6" value={maxFontSize} onChange={(e) => setMaxFontSize(parseFloat(e.target.value) || 2)} className="styled-num-input" />
                </div>
              </div>

              <div className="input-fields-row-2" style={{ marginTop: '8px' }}>
                <div className="input-field">
                  <label htmlFor="min-viewport-inp">Min Viewport (px)</label>
                  <input id="min-viewport-inp" type="number" step="10" min="300" max="800" value={minViewport} onChange={(e) => setMinViewport(parseInt(e.target.value) || 320)} className="styled-num-input" />
                </div>
                <div className="input-field">
                  <label htmlFor="max-viewport-inp">Max Viewport (px)</label>
                  <input id="max-viewport-inp" type="number" step="10" min="800" max="2000" value={maxViewport} onChange={(e) => setMinMaxViewport(parseInt(e.target.value) || 1200)} className="styled-num-input" />
                </div>
              </div>

              <div className="viewport-tester-slider" style={{ marginTop: '12px', borderTop: '1px solid #1e293b', paddingTop: '10px' }}>
                <div className="slide-row">
                  <div className="flex-lbl-row">
                    <span className="slide-lbl">Simulated Viewport Width ({simulatedViewportWidth}px)</span>
                    <span className="computed-badge font-mono text-cyan">{getComputedFluidPx().toFixed(1)}px</span>
                  </div>
                  <input type="range" min="320" max="1400" value={simulatedViewportWidth} onChange={(e) => setSimulatedViewportWidth(parseInt(e.target.value))} />
                </div>
              </div>

              <div className="generated-code-box">
                <span className="code-lbl">CSS Rule:</span>
                <code className="code-snippet">{generateClampCSS()}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Column */}
        <div className="preview-panel">
          {/* Main Visualizer Render Area */}
          <div className="telemetry-card preview-card-box">
            <div className="card-heading header-between">
              <div className="flex-gap-8">
                <Grid className="icon-cyan" size={20} />
                <h4>Baseline Grid Sandbox</h4>
              </div>
              <button 
                className={`grid-toggle-btn ${showGrid ? 'active' : ''}`}
                onClick={() => setShowGrid(!showGrid)}
              >
                Toggle Vertical Grid Lines
              </button>
            </div>
            <p className="description">
              Live text rendering displaying your typography styling. Turn on baseline grid lines to test the vertical layout rhythm.
            </p>

            <div className="sandbox-wrapper">
              <div 
                className="rendered-typography-container"
                style={{
                  fontFamily: getFontFamilyStyle(),
                  fontSize: `${fontSizeRem}rem`,
                  fontWeight: fontWeight,
                  lineHeight: lineHeight,
                  letterSpacing: `${letterSpacing}em`,
                  textAlign: textAlign,
                  textTransform: textTransform,
                  textDecoration: textDecoration,
                  backgroundImage: showGrid ? 'linear-gradient(#06b6d418 1px, transparent 1px)' : 'none',
                  backgroundSize: showGrid ? `100% ${lineHeight * fontSizeRem * 16}px` : 'auto'
                }}
              >
                <span className="visualizer-headline" style={{ fontSize: generateClampCSS(), display: 'block', fontWeight: '700', lineHeight: '1.2', marginBottom: '12px' }}>
                  Fluid Title Block
                </span>
                <p style={{ margin: '0 0 14px 0' }}>
                  Vertical rhythm measures the alignment of headlines, body blocks, and paragraph spaces along a repetitive vertical grid. Standardizing line heights using unitless decimals is key.
                </p>
                <p style={{ margin: '0' }}>
                  Adjust typography sliders on the left. The clamp engine dynamically interpolates typography sizes as you stretch the viewport width parameters.
                </p>
              </div>
            </div>
          </div>

          {/* Modular scale calculator */}
          <div className="telemetry-card">
            <div className="card-heading">
              <Type className="icon-cyan" size={20} />
              <h4>Modular Type Scaling Scales</h4>
            </div>
            <p className="description">
              Computed hierarchy of text elements based on a mathematical ratio factor.
            </p>

            <div className="scale-configuration bg-panel">
              <div className="input-fields-row-2">
                <div className="input-field">
                  <label htmlFor="base-size-px-inp">Base Body Size (px)</label>
                  <input id="base-size-px-inp" type="number" min="8" max="32" value={baseSizePx} onChange={(e) => setBaseSizePx(parseInt(e.target.value) || 16)} className="styled-num-input" />
                </div>
                <div className="input-field">
                  <label htmlFor="ratio-select">Scale Factor / Ratio</label>
                  <select id="ratio-select" value={scaleRatio} onChange={(e) => setScaleRatio(parseFloat(e.target.value))} className="select-styled">
                    <option value="1.618">Golden Ratio (1.618)</option>
                    <option value="1.414">Augmented Fourth (1.414)</option>
                    <option value="1.333">Perfect Fourth (1.333)</option>
                    <option value="1.25">Major Third (1.250)</option>
                    <option value="1.125">Major Second (1.125)</option>
                  </select>
                </div>
              </div>

              <div className="scale-results-table">
                {scaleItems.map((item, index) => {
                  const valPx = calculateScaleValue(item.steps);
                  const valRem = valPx / 16;
                  return (
                    <div key={index} className="scale-table-row">
                      <div className="meta-info">
                        <span className="lbl">{item.label}</span>
                        <code className="math-lbl">{item.steps === 0 ? 'Base' : `${baseSizePx} × ${scaleRatio.toFixed(3)}^${item.steps}`}</code>
                      </div>
                      <div className="computed-values">
                        <span className="px-val font-mono">{valPx.toFixed(1)}px</span>
                        <span className="rem-val font-mono text-cyan">{valRem.toFixed(2)}rem</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Generated CSS Block */}
          <div className="telemetry-card">
            <div className="card-heading header-between">
              <h4>Generated Style Declarations</h4>
              <button className="copy-btn" onClick={() => handleCopy(typographyCSS)}>
                {copySuccess ? <Check size={14} className="green-text" /> : <Copy size={14} />}
                <span>{copySuccess ? 'Copied Code!' : 'Copy Rules'}</span>
              </button>
            </div>
            <pre className="css-pre">
              <code>{typographyCSS}</code>
            </pre>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .typo-lab-root {
          font-family: 'Outfit', 'Inter', sans-serif;
          color: #1e293b;
        }

        .lab-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
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
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
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

        .flex-gap-8 {
          display: flex;
          align-items: center;
          gap: 8px;
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

        .sub-section-lbl {
          font-size: 0.78rem;
          font-weight: 700;
          margin: 0 0 10px 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .text-primary-cyan { color: #0891b2; }
        .text-primary-purple { color: #7c3aed; }

        .slide-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 10px;
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

        .computed-badge {
          font-size: 0.75rem;
          font-weight: 700;
        }

        .slide-row input[type="range"] {
          -webkit-appearance: none;
          width: 100%;
          height: 5px;
          border-radius: 100px;
          background: #cbd5e1;
          outline: none;
        }

        .slide-row input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #0891b2;
          cursor: pointer;
        }

        .input-field-row {
          margin-bottom: 10px;
        }

        .input-fields-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .input-fields-row-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-top: 10px;
        }

        .input-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .input-field label {
          font-size: 0.72rem;
          color: #475569;
          font-weight: 600;
          text-transform: uppercase;
        }

        .select-styled {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #0f172a;
          font-size: 0.78rem;
          padding: 6px 10px;
          border-radius: 6px;
          outline: none;
          width: 100%;
        }

        .styled-num-input {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #0f172a;
          font-size: 0.8rem;
          padding: 6px 10px;
          border-radius: 6px;
          outline: none;
        }

        .grid-toggle-btn {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #475569;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .grid-toggle-btn.active {
          background: #0891b2;
          color: #ffffff;
          border-color: transparent;
        }

        /* Viewport Resizer & Render */
        .sandbox-wrapper {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px;
          min-height: 250px;
          overflow: hidden;
        }

        .rendered-typography-container {
          color: #0f172a;
          border-radius: 6px;
          padding: 16px;
          border: 1px solid rgba(0, 0, 0, 0.03);
          transition: background-size 0.2s;
        }

        /* Modular Scale Results */
        .scale-results-table {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 12px;
        }

        .scale-table-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 10px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
        }

        .meta-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .meta-info .lbl {
          font-size: 0.78rem;
          font-weight: 700;
          color: #0f172a;
        }

        .meta-info .math-lbl {
          font-size: 0.65rem;
          color: #64748b;
        }

        .computed-values {
          display: flex;
          gap: 12px;
        }

        .computed-values .px-val {
          font-size: 0.8rem;
          color: #64748b;
        }

        .computed-values .rem-val {
          font-size: 0.8rem;
          font-weight: 700;
        }

        /* Fluid generator styles */
        .generated-code-box {
          margin-top: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .generated-code-box .code-lbl {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #7c3aed;
        }

        .generated-code-box .code-snippet {
          font-family: 'Fira Code', monospace;
          font-size: 0.75rem;
          color: #0f172a;
          word-break: break-all;
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

        .copy-btn {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 4px 10px;
          border-radius: 6px;
          color: #475569;
          font-size: 0.72rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }

        .copy-btn:hover {
          color: #0f172a;
          border-color: #94a3b8;
          background: #f8fafc;
        }

        .green-text { color: #10b981; }
        .text-cyan { color: #0891b2; }
      `}} />
    </div>
  );
};

export default CSSTypographyExplorer;
