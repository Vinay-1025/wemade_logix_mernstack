import React, { useState } from 'react';
import { Palette, Eye, CheckCircle, XCircle, Info, RefreshCw } from 'lucide-react';

const hslToRgb = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
};

const rgbToHex = (r, g, b) => {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
};

const getRelativeLuminance = (r, g, b) => {
  const rs = r / 255;
  const gs = g / 255;
  const bs = b / 255;
  const rLin = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
  const gLin = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
  const bLin = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);
  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
};

const getContrastRatio = (color1, color2) => {
  const lum1 = getRelativeLuminance(...color1);
  const lum2 = getRelativeLuminance(...color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

const CSSColorsPlayground = () => {
  const [textH, setTextH] = useState(210);
  const [textS, setTextS] = useState(90);
  const [textL, setTextL] = useState(98);

  const [bgH, setBgH] = useState(222);
  const [bgS, setBgS] = useState(47);
  const [bgL, setBgL] = useState(11);

  const [colorBlindFilter, setColorBlindFilter] = useState('none'); // none, protanopia, deuteranopia, tritanopia, monochromacy
  const [activePaletteTab, setActivePaletteTab] = useState('analogous');

  const textRgb = hslToRgb(textH, textS, textL);
  const bgRgb = hslToRgb(bgH, bgS, bgL);
  const contrastRatio = getContrastRatio(textRgb, bgRgb);

  // WCAG Compliance thresholds
  const passesAA_Normal = contrastRatio >= 4.5;
  const passesAA_Large = contrastRatio >= 3.0;
  const passesAAA_Normal = contrastRatio >= 7.0;
  const passesAAA_Large = contrastRatio >= 4.5;

  // Harmonious Palette Math
  const getComplementary = () => {
    const compH = (textH + 180) % 360;
    return [compH, textS, textL];
  };

  const getAnalogous = () => {
    const leftH = (textH - 30 + 360) % 360;
    const rightH = (textH + 30) % 360;
    return [
      [leftH, textS, textL],
      [rightH, textS, textL]
    ];
  };

  const getTriadic = () => {
    const t1H = (textH + 120) % 360;
    const t2H = (textH + 240) % 360;
    return [
      [t1H, textS, textL],
      [t2H, textS, textL]
    ];
  };

  const applyColorFromHSL = (h, s, l, type) => {
    if (type === 'text') {
      setTextH(h);
      setTextS(s);
      setTextL(l);
    } else {
      setBgH(h);
      setBgS(s);
      setBgL(l);
    }
  };

  return (
    <div className="color-lab-root">
      {/* SVG Filters for simulating Color Blindness */}
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0,     0, 0
                                                 0.558, 0.442, 0,     0, 0
                                                 0,     0.242, 0.758, 0, 0
                                                 0,     0,     0,     1, 0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0,   0, 0
                                                 0.7,   0.3,   0,   0, 0
                                                 0,     0.3,   0.7, 0, 0
                                                 0,     0,     0,   1, 0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95, 0.05,  0,     0, 0
                                                 0,    0.433, 0.567, 0, 0
                                                 0,    0.475, 0.525, 0, 0
                                                 0,    0,     0,     1, 0" />
          </filter>
        </defs>
      </svg>

      <div className="lab-grid">
        {/* Controls */}
        <div className="control-panel">
          <div className="telemetry-card">
            <div className="card-heading">
              <Palette className="icon-cyan" size={20} />
              <h4>CSS Colors & Lightness Channels</h4>
            </div>
            <p className="description">Adjust color parameters using Hue-Saturation-Lightness (HSL). Compare dynamic text contrast outputs against background surfaces.</p>

            {/* Text Color Controls */}
            <div className="sliders-container bg-panel">
              <h5 className="sub-section-lbl text-primary-cyan">Text HSL Channels</h5>
              <div className="slide-row">
                <span className="slide-lbl">Hue ({textH}°)</span>
                <input type="range" min="0" max="360" value={textH} onChange={(e) => setTextH(parseInt(e.target.value))} />
              </div>
              <div className="slide-row">
                <span className="slide-lbl">Sat ({textS}%)</span>
                <input type="range" min="0" max="100" value={textS} onChange={(e) => setTextS(parseInt(e.target.value))} />
              </div>
              <div className="slide-row">
                <span className="slide-lbl">Light ({textL}%)</span>
                <input type="range" min="0" max="100" value={textL} onChange={(e) => setTextL(parseInt(e.target.value))} />
              </div>
              <div className="channels-readout">
                <span>HEX: {rgbToHex(...textRgb).toUpperCase()}</span>
                <span>RGB: rgb({textRgb.join(', ')})</span>
              </div>
            </div>

            {/* Background Controls */}
            <div className="sliders-container bg-panel">
              <h5 className="sub-section-lbl text-primary-purple">Background HSL Channels</h5>
              <div className="slide-row">
                <span className="slide-lbl">Hue ({bgH}°)</span>
                <input type="range" min="0" max="360" value={bgH} onChange={(e) => setBgH(parseInt(e.target.value))} />
              </div>
              <div className="slide-row">
                <span className="slide-lbl">Sat ({bgS}%)</span>
                <input type="range" min="0" max="100" value={bgS} onChange={(e) => setBgS(parseInt(e.target.value))} />
              </div>
              <div className="slide-row">
                <span className="slide-lbl">Light ({bgL}%)</span>
                <input type="range" min="0" max="100" value={bgL} onChange={(e) => setBgL(parseInt(e.target.value))} />
              </div>
              <div className="channels-readout">
                <span>HEX: {rgbToHex(...bgRgb).toUpperCase()}</span>
                <span>RGB: rgb({bgRgb.join(', ')})</span>
              </div>
            </div>

            {/* Quick Swap */}
            <button 
              className="swap-btn"
              onClick={() => {
                const tempH = textH, tempS = textS, tempL = textL;
                setTextH(bgH); setTextS(bgS); setTextL(bgL);
                setBgH(tempH); setBgS(tempS); setBgL(tempL);
              }}
            >
              <RefreshCw size={14} />
              <span>Swap Text & Background Colors</span>
            </button>
          </div>

          {/* Color Schemes */}
          <div className="telemetry-card">
            <div className="card-heading">
              <Palette className="icon-cyan" size={20} />
              <h4>Harmonious Color Generation</h4>
            </div>
            <p className="description">Mathematically computed sets based on the active text color. Select any shade to apply.</p>

            <div className="scheme-tabs">
              <button className={`scheme-tab ${activePaletteTab === 'analogous' ? 'active' : ''}`} onClick={() => setActivePaletteTab('analogous')}>Analogous</button>
              <button className={`scheme-tab ${activePaletteTab === 'complementary' ? 'active' : ''}`} onClick={() => setActivePaletteTab('complementary')}>Complementary</button>
              <button className={`scheme-tab ${activePaletteTab === 'triadic' ? 'active' : ''}`} onClick={() => setActivePaletteTab('triadic')}>Triadic</button>
            </div>

            <div className="scheme-output-swatches">
              {activePaletteTab === 'analogous' && (
                <div className="swatches-row">
                  {getAnalogous().map((hsl, i) => {
                    const rgb = hslToRgb(...hsl);
                    const hex = rgbToHex(...rgb);
                    return (
                      <div key={i} className="swatch-card">
                        <div className="swatch-color" style={{ background: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)` }}></div>
                        <span className="swatch-hex">{hex.toUpperCase()}</span>
                        <div className="swatch-actions">
                          <button onClick={() => applyColorFromHSL(hsl[0], hsl[1], hsl[2], 'text')}>Set Text</button>
                          <button onClick={() => applyColorFromHSL(hsl[0], hsl[1], hsl[2], 'bg')}>Set BG</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {activePaletteTab === 'complementary' && (
                <div className="swatches-row">
                  {(() => {
                    const hsl = getComplementary();
                    const rgb = hslToRgb(...hsl);
                    const hex = rgbToHex(...rgb);
                    return (
                      <div className="swatch-card">
                        <div className="swatch-color" style={{ background: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)` }}></div>
                        <span className="swatch-hex">{hex.toUpperCase()}</span>
                        <div className="swatch-actions">
                          <button onClick={() => applyColorFromHSL(hsl[0], hsl[1], hsl[2], 'text')}>Set Text</button>
                          <button onClick={() => applyColorFromHSL(hsl[0], hsl[1], hsl[2], 'bg')}>Set BG</button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {activePaletteTab === 'triadic' && (
                <div className="swatches-row">
                  {getTriadic().map((hsl, i) => {
                    const rgb = hslToRgb(...hsl);
                    const hex = rgbToHex(...rgb);
                    return (
                      <div key={i} className="swatch-card">
                        <div className="swatch-color" style={{ background: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)` }}></div>
                        <span className="swatch-hex">{hex.toUpperCase()}</span>
                        <div className="swatch-actions">
                          <button onClick={() => applyColorFromHSL(hsl[0], hsl[1], hsl[2], 'text')}>Set Text</button>
                          <button onClick={() => applyColorFromHSL(hsl[0], hsl[1], hsl[2], 'bg')}>Set BG</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Display Frame / Output */}
        <div className="preview-panel">
          {/* Validation Metrics */}
          <div className="telemetry-card metrics-card">
            <div className="contrast-dashboard">
              <div className="circular-ratio-score">
                <span className="ratio-score-txt">{contrastRatio.toFixed(2)}:1</span>
                <span className="ratio-score-lbl">Contrast Ratio</span>
              </div>
              <div className="conformance-bulletin">
                <div className="bullet-row">
                  {passesAA_Normal ? <CheckCircle size={15} className="text-green" /> : <XCircle size={15} className="text-red" />}
                  <span>WCAG AA Normal Text (Min 4.5:1)</span>
                </div>
                <div className="bullet-row">
                  {passesAA_Large ? <CheckCircle size={15} className="text-green" /> : <XCircle size={15} className="text-red" />}
                  <span>WCAG AA Large Text (Min 3.0:1)</span>
                </div>
                <div className="bullet-row">
                  {passesAAA_Normal ? <CheckCircle size={15} className="text-green" /> : <XCircle size={15} className="text-red" />}
                  <span>WCAG AAA Normal Text (Min 7.0:1)</span>
                </div>
                <div className="bullet-row">
                  {passesAAA_Large ? <CheckCircle size={15} className="text-green" /> : <XCircle size={15} className="text-red" />}
                  <span>WCAG AAA Large Text (Min 4.5:1)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Color Blindness Simulator & Preview Sandbox */}
          <div className="telemetry-card sandbox-container">
            <div className="card-heading">
              <Eye className="icon-cyan" size={20} />
              <h4>Color Vision Simulator</h4>
            </div>
            
            {/* Filter Pills */}
            <div className="filter-pill-row">
              <button className={`filter-btn ${colorBlindFilter === 'none' ? 'active' : ''}`} onClick={() => setColorBlindFilter('none')}>Trichromacy (Default)</button>
              <button className={`filter-btn ${colorBlindFilter === 'protanopia' ? 'active' : ''}`} onClick={() => setColorBlindFilter('protanopia')}>Protanopia (Red-Blind)</button>
              <button className={`filter-btn ${colorBlindFilter === 'deuteranopia' ? 'active' : ''}`} onClick={() => setColorBlindFilter('deuteranopia')}>Deuteranopia (Green-Blind)</button>
              <button className={`filter-btn ${colorBlindFilter === 'tritanopia' ? 'active' : ''}`} onClick={() => setColorBlindFilter('tritanopia')}>Tritanopia (Blue-Blind)</button>
              <button className={`filter-btn ${colorBlindFilter === 'monochromacy' ? 'active' : ''}`} onClick={() => setColorBlindFilter('monochromacy')}>Achromatopsia (Gray)</button>
            </div>

            {/* Sandbox Container */}
            <div 
              className="render-canvas"
              style={{
                backgroundColor: `hsl(${bgH}, ${bgS}%, ${bgL}%)`,
                color: `hsl(${textH}, ${textS}%, ${textL}%)`,
                filter: colorBlindFilter === 'protanopia' ? 'url(#protanopia)' :
                        colorBlindFilter === 'deuteranopia' ? 'url(#deuteranopia)' :
                        colorBlindFilter === 'tritanopia' ? 'url(#tritanopia)' :
                        colorBlindFilter === 'monochromacy' ? 'grayscale(100%)' : 'none'
              }}
            >
              <span className="canvas-badge" style={{ borderColor: `hsl(${textH}, ${textS}%, ${textL}%)` }}>
                Accessibility Sandbox Render
              </span>
              <h3>Premium Typography Headline</h3>
              <p>
                This visual block responds instantly to your adjustments. Users suffering from color vision deficiencies will experience layouts as simulated via the filters bar. Maintain high luminance contrast ratios to build inclusive portals.
              </p>
            </div>
            <div className="educational-note" style={{ marginTop: '12px' }}>
              <Info size={14} className="note-icon" />
              <p>WCAG accessibility mandates minimum contrast ratios to enable low-vision readability. Avoid placing text color variables with small relative luminance separations.</p>
            </div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .color-lab-root {
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

        .card-heading h4 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

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
          margin-bottom: 8px;
        }

        .slide-lbl {
          font-size: 0.75rem;
          color: #475569;
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

        .channels-readout {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          font-family: 'Fira Code', monospace;
          color: #64748b;
          border-top: 1px solid #e2e8f0;
          padding-top: 6px;
          margin-top: 6px;
        }

        .swap-btn {
          width: 100%;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 8px 12px;
          border-radius: 6px;
          color: #475569;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s;
        }

        .swap-btn:hover {
          background: #f8fafc;
          border-color: #94a3b8;
          color: #0f172a;
        }

        /* Harmonious Swatches */
        .scheme-tabs {
          display: flex;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .scheme-tab {
          flex: 1;
          background: transparent;
          border: none;
          color: #64748b;
          padding: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .scheme-tab.active {
          color: #0891b2;
          background: rgba(6, 182, 212, 0.08);
        }

        .scheme-output-swatches {
          min-height: 80px;
        }

        .swatches-row {
          display: flex;
          gap: 8px;
        }

        .swatch-card {
          flex: 1;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .swatch-color {
          width: 100%;
          height: 35px;
          border-radius: 4px;
        }

        .swatch-hex {
          font-size: 0.65rem;
          font-family: 'Fira Code', monospace;
          color: #475569;
        }

        .swatch-actions {
          display: flex;
          gap: 4px;
          width: 100%;
        }

        .swatch-actions button {
          flex: 1;
          background: #f1f5f9;
          border: none;
          color: #475569;
          font-size: 0.6rem;
          font-weight: 600;
          padding: 3px 0;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .swatch-actions button:hover {
          background: #0891b2;
          color: #ffffff;
        }

        /* Contrast Score Display */
        .metrics-card {
          padding: 16px;
        }

        .contrast-dashboard {
          display: flex;
          align-items: center;
          gap: 24px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 16px;
        }

        .circular-ratio-score {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 85px;
          height: 85px;
          border-radius: 50%;
          border: 3px solid #0891b2;
          background: rgba(6,182,212,0.04);
          flex-shrink: 0;
        }

        .ratio-score-txt {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0f172a;
        }

        .ratio-score-lbl {
          font-size: 0.58rem;
          color: #0891b2;
          font-weight: 700;
          text-transform: uppercase;
        }

        .conformance-bulletin {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.76rem;
        }

        .bullet-row {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #475569;
        }

        .text-green { color: #10b981; }
        .text-red { color: #ef4444; }

        /* Vision Simulator Frame */
        .filter-pill-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 12px;
        }

        .filter-btn {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #475569;
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          color: #0f172a;
          border-color: #64748b;
          background: #f8fafc;
        }

        .filter-btn.active {
          background: #0891b2;
          color: #ffffff;
          border-color: transparent;
        }

        .render-canvas {
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          min-height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 10px;
        }

        .canvas-badge {
          align-self: flex-start;
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          border: 1px solid;
          padding: 1px 6px;
          border-radius: 4px;
        }

        .render-canvas h3 {
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0;
        }

        .render-canvas p {
          font-size: 0.78rem;
          line-height: 1.4;
          margin: 0;
          opacity: 0.95;
        }

        .educational-note {
          display: flex;
          gap: 8px;
          padding: 10px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 0.74rem;
          color: #64748b;
          line-height: 1.4;
        }

        .note-icon {
          color: #0891b2;
          flex-shrink: 0;
        }
      `}} />
    </div>
  );
};

export default CSSColorsPlayground;
