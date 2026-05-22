import React, { useState } from 'react';
import { Sparkles, Sliders, Check, Copy, RefreshCw, Eye, EyeOff, ShieldAlert, Award } from 'lucide-react';

const CSSCardCustomizer = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('variables'); // 'variables' | 'classes'

  // Card customize states
  const [hue, setHue] = useState(220); // 0 - 360
  const [saturation, setSaturation] = useState(95); // 0 - 100
  const [lightness, setLightness] = useState(50); // 0 - 100
  const [radius, setRadius] = useState(1); // rem (0 - 3)
  const [padding, setPadding] = useState(1.5); // rem (0.75 - 2.5)
  const [btnPaddingX, setBtnPaddingX] = useState(1.2); // em (0.5 - 2.5)
  const [btnPaddingY, setBtnPaddingY] = useState(0.75); // em (0.3 - 1.5)
  const [hoverOffset, setHoverOffset] = useState(8); // px (0 - 24)
  const [shadowBlur, setShadowBlur] = useState(25); // px (0 - 50)
  const [shadowColorOpacity, setShadowColorOpacity] = useState(0.15); // opacity (0 - 0.5)

  // Demo state values
  const [isHovered, setIsHovered] = useState(false);
  const [badgeStatus, setBadgeStatus] = useState('new'); // 'new' | 'sale' | 'out-of-stock'

  // Helper: HSL to RGB
  const hslToRgb = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
    return [
      Math.round(255 * f(0)),
      Math.round(255 * f(8)),
      Math.round(255 * f(4))
    ];
  };

  // Helper: Relative Luminance
  const getRelativeLuminance = (r, g, b) => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  // Compute CTA Contrast
  const rgbBg = hslToRgb(hue, saturation, lightness);
  const bgLuminance = getRelativeLuminance(rgbBg[0], rgbBg[1], rgbBg[2]);
  const whiteLuminance = 1.0; // for white text #FFFFFF
  
  const contrastRatio = (Math.max(bgLuminance, whiteLuminance) + 0.05) / 
                        (Math.min(bgLuminance, whiteLuminance) + 0.05);

  const passesAA = contrastRatio >= 4.5;
  const passesAAA = contrastRatio >= 7.0;
  const passesLargeAA = contrastRatio >= 3.0;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleReset = () => {
    setHue(220);
    setSaturation(95);
    setLightness(50);
    setRadius(1);
    setPadding(1.5);
    setBtnPaddingX(1.2);
    setBtnPaddingY(0.75);
    setHoverOffset(8);
    setShadowBlur(25);
    setShadowColorOpacity(0.15);
  };

  // Generate code strings
  const cssVariablesCode = `:root {
  /* Brand Theme Colors */
  --brand-primary: hsl(${hue}, ${saturation}%, ${lightness}%);
  --brand-hover: hsl(${hue}, ${saturation}%, ${Math.max(lightness - 10, 15)}%);
  --brand-light: hsl(${hue}, ${saturation}%, 95%);
  --brand-glow: hsla(${hue}, ${saturation}%, ${lightness}%, 0.35);

  /* Card Layout Metrics */
  --card-bg: #ffffff; /* Light clean background */
  --card-radius: ${radius}rem;
  --card-padding: ${padding}rem;
  --btn-padding-y: ${btnPaddingY}em;
  --btn-padding-x: ${btnPaddingX}em;

  /* Animation & Shadow Tokens */
  --hover-offset: -${hoverOffset}px;
  --shadow-blur: ${shadowBlur}px;
  --shadow-color: hsla(${hue}, ${saturation}%, 10%, ${shadowColorOpacity});
  --card-transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}`;

  const componentStylesCode = `.custom-product-card {
  background: var(--card-bg);
  border-radius: var(--card-radius);
  padding: var(--card-padding);
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 
              0 var(--shadow-blur) calc(var(--shadow-blur) * 1.5) var(--shadow-color);
  transition: var(--card-transition);
  position: relative;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
}

.custom-product-card:hover {
  transform: translateY(var(--hover-offset));
  border-color: var(--brand-primary);
  box-shadow: 0 8px 12px -2px rgba(0,0,0,0.15), 
              0 var(--shadow-blur) calc(var(--shadow-blur) * 2) var(--brand-glow);
}

.cta-button {
  background: var(--brand-primary);
  color: #ffffff; /* White font contrast validated */
  padding: var(--btn-padding-y) var(--btn-padding-x);
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.cta-button:hover {
  background: var(--brand-hover);
}

.cta-button:active {
  transform: scale(0.97);
}`;

  return (
    <div className="card-customizer-root">
      <div className="lab-grid">
        
        {/* Control Panel */}
        <div className="control-panel">
          <div className="telemetry-card">
            <div className="card-heading header-between">
              <div className="flex-align">
                <Sliders className="icon-cyan" size={20} />
                <h4>Card Engine Controller</h4>
              </div>
              <button className="reset-btn" onClick={handleReset}>
                <RefreshCw size={14} />
                <span>Reset Defaults</span>
              </button>
            </div>
            <p className="description">
              Use the sliders to adjust spacing tokens, color values, and hover offsets. Watch the card adapt to CSS property variables in real time.
            </p>

            {/* Colors Section */}
            <div className="sliders-container bg-panel">
              <h5 className="sub-section-lbl text-primary-cyan">Brand Identity System (HSL)</h5>
              
              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Theme Primary Hue</span>
                  <span className="computed-badge text-cyan font-mono">{hue}°</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  value={hue} 
                  onChange={(e) => setHue(parseInt(e.target.value))} 
                />
                <div className="color-strip-preview" style={{
                  background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
                }} />
              </div>

              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Saturation Intensity</span>
                  <span className="computed-badge text-cyan font-mono">{saturation}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={saturation} 
                  onChange={(e) => setSaturation(parseInt(e.target.value))} 
                />
              </div>

              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Lightness Brightness</span>
                  <span className="computed-badge text-cyan font-mono">{lightness}%</span>
                </div>
                <input 
                  type="range" 
                  min="15" 
                  max="85" 
                  value={lightness} 
                  onChange={(e) => setLightness(parseInt(e.target.value))} 
                />
                <span className="field-help">Kept between 15% and 85% to ensure design legibility.</span>
              </div>
            </div>

            {/* Layout Sizing Section */}
            <div className="sliders-container bg-panel">
              <h5 className="sub-section-lbl text-primary-purple">Layout & Dimensions</h5>

              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Card Corner Radius (<code>rem</code>)</span>
                  <span className="computed-badge text-purple font-mono">{radius}rem ({radius * 16}px)</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="3" 
                  step="0.1"
                  value={radius} 
                  onChange={(e) => setRadius(parseFloat(e.target.value))} 
                />
              </div>

              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Card Inner Padding (<code>rem</code>)</span>
                  <span className="computed-badge text-purple font-mono">{padding}rem ({padding * 16}px)</span>
                </div>
                <input 
                  type="range" 
                  min="0.75" 
                  max="2.5" 
                  step="0.05"
                  value={padding} 
                  onChange={(e) => setPadding(parseFloat(e.target.value))} 
                />
              </div>

              <div className="flex-sliders-row">
                <div className="slide-row half-width">
                  <div className="flex-lbl-row">
                    <span className="slide-lbl">Btn Pad X (<code>em</code>)</span>
                    <span className="computed-badge font-mono">{btnPaddingX}em</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="2.5" 
                    step="0.05"
                    value={btnPaddingX} 
                    onChange={(e) => setBtnPaddingX(parseFloat(e.target.value))} 
                  />
                </div>
                <div className="slide-row half-width">
                  <div className="flex-lbl-row">
                    <span className="slide-lbl">Btn Pad Y (<code>em</code>)</span>
                    <span className="computed-badge font-mono">{btnPaddingY}em</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.3" 
                    max="1.5" 
                    step="0.05"
                    value={btnPaddingY} 
                    onChange={(e) => setBtnPaddingY(parseFloat(e.target.value))} 
                  />
                </div>
              </div>
            </div>

            {/* Depth & Interaction Section */}
            <div className="sliders-container bg-panel">
              <h5 className="sub-section-lbl text-primary-gold">Depth & Interactions</h5>

              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Hover Hover-up Offset (<code>px</code>)</span>
                  <span className="computed-badge text-gold font-mono">{hoverOffset}px</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="24" 
                  value={hoverOffset} 
                  onChange={(e) => setHoverOffset(parseInt(e.target.value))} 
                />
              </div>

              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Shadow Blur Dimension</span>
                  <span className="computed-badge text-gold font-mono">{shadowBlur}px</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="50" 
                  value={shadowBlur} 
                  onChange={(e) => setShadowBlur(parseInt(e.target.value))} 
                />
              </div>

              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Shadow Color Opacity</span>
                  <span className="computed-badge text-gold font-mono">{shadowColorOpacity}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="0.5" 
                  step="0.01"
                  value={shadowColorOpacity} 
                  onChange={(e) => setShadowColorOpacity(parseFloat(e.target.value))} 
                />
              </div>
            </div>
          </div>

          {/* WCAG Contrast Ratio Metrics */}
          <div className="telemetry-card contrast-telemetry">
            <div className="card-heading">
              <Award className="icon-gold" size={20} />
              <h4>WCAG Contrast Diagnostics</h4>
            </div>
            
            <div className="contrast-results bg-panel">
              <div className="contrast-ratio-display">
                <div className="ratio-circle" style={{ 
                  borderColor: passesAA ? 'hsl(142, 70%, 45%)' : 'hsl(0, 84%, 60%)',
                  boxShadow: `0 0 15px ${passesAA ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                }}>
                  <span className="ratio-val">{contrastRatio.toFixed(2)}:1</span>
                  <span className="ratio-lbl">Contrast Ratio</span>
                </div>

                <div className="ratio-stats">
                  <div className="stat-checker-row">
                    <span className="stat-lbl">White Text on HSL Background</span>
                    <span className="checker-preview" style={{ 
                      backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                      color: '#ffffff'
                    }}>Aa</span>
                  </div>

                  <div className="check-indicators">
                    <div className="ind-item">
                      <span className={`status-dot ${passesLargeAA ? 'pass' : 'fail'}`} />
                      <span className="ind-lbl">AA Large Text (Min 3:1)</span>
                      <strong className="ind-res">{passesLargeAA ? 'PASS' : 'FAIL'}</strong>
                    </div>
                    <div className="ind-item">
                      <span className={`status-dot ${passesAA ? 'pass' : 'fail'}`} />
                      <span className="ind-lbl">AA Regular Text (Min 4.5:1)</span>
                      <strong className="ind-res">{passesAA ? 'PASS' : 'FAIL'}</strong>
                    </div>
                    <div className="ind-item">
                      <span className={`status-dot ${passesAAA ? 'pass' : 'fail'}`} />
                      <span className="ind-lbl">AAA Highest Grade (Min 7:1)</span>
                      <strong className="ind-res">{passesAAA ? 'PASS' : 'FAIL'}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {!passesAA && (
                <div className="warning-callout">
                  <ShieldAlert size={16} className="warning-icon" />
                  <p>
                    <strong>Accessibility Warning:</strong> Contrast ratio is below 4.5:1. White text is unreadable for visually impaired users on this background. Try decreasing lightness or adjusting saturation to darken the hue.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Display / Output */}
        <div className="preview-panel">
          
          {/* Card Showcase sandbox */}
          <div className="telemetry-card card-sandbox">
            <div className="card-heading header-between">
              <h4>Realtime Render Output</h4>
              <div className="badge-selector">
                <span className="badge-selector-lbl">Badge state:</span>
                <select 
                  value={badgeStatus} 
                  onChange={(e) => setBadgeStatus(e.target.value)}
                  className="badge-selector-dropdown"
                >
                  <option value="new">NEW ARRIVAL</option>
                  <option value="sale">ON SALE</option>
                  <option value="out-of-stock">OUT OF STOCK</option>
                </select>
              </div>
            </div>
            
            <div className="card-preview-sandbox">
              {/* Product card element styled with CSS variables set on wrapper */}
              <div 
                className={`custom-product-card ${isHovered ? 'sim-hover' : ''}`}
                style={{
                  '--brand-primary': `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                  '--brand-hover': `hsl(${hue}, ${saturation}%, ${Math.max(lightness - 10, 15)}%)`,
                  '--brand-light': `hsl(${hue}, ${saturation}%, 95%)`,
                  '--brand-glow': `hsla(${hue}, ${saturation}%, ${lightness}%, 0.35)`,
                  '--card-bg': '#ffffff',
                  '--card-radius': `${radius}rem`,
                  '--card-padding': `${padding}rem`,
                  '--btn-padding-y': `${btnPaddingY}em`,
                  '--btn-padding-x': `${btnPaddingX}em`,
                  '--hover-offset': `-${hoverOffset}px`,
                  '--shadow-blur': `${shadowBlur}px`,
                  '--shadow-color': `hsla(${hue}, ${saturation}%, 10%, ${shadowColorOpacity})`
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                
                {/* Badge using attribute selector style dynamically */}
                <div className="card-badge" data-status={badgeStatus}>
                  {badgeStatus === 'new' && 'NEW ARRIVAL'}
                  {badgeStatus === 'sale' && '20% OFF'}
                  {badgeStatus === 'out-of-stock' && 'SOLD OUT'}
                </div>

                <div className="product-image-container">
                  <img src="https://picsum.photos/400/300?random=1" alt="Showcase Product" />
                  <div className="img-glow-overlay" />
                </div>

                <div className="product-info-wrap">
                  <span className="category-tag">AUDIO LABS SPECIAL</span>
                  <h3 className="card-title">SoundLink Pro Studio</h3>
                  <p className="card-text">
                    Experience pure acoustic bliss with adaptive active noise cancellation, custom HSL styling controls, and comfortable ear cushion metrics.
                  </p>

                  <div className="price-tag-row">
                    <span className="sale-price">$249.99</span>
                    {badgeStatus === 'sale' && <span className="orig-price">$299.99</span>}
                  </div>

                  <button className="cta-button" disabled={badgeStatus === 'out-of-stock'}>
                    {badgeStatus === 'out-of-stock' ? 'Notify Restock' : 'Buy Now'}
                  </button>
                </div>

              </div>
            </div>
            
            <div className="sandbox-indicator-msg">
              <Sparkles size={14} className="icon-cyan" />
              <span>Hover over the card to test animations and variable shadows.</span>
            </div>
          </div>

          {/* Code Export Component */}
          <div className="telemetry-card code-export-card">
            <div className="card-heading header-between">
              <div className="tab-triggers">
                <button 
                  className={`tab-btn ${activeTab === 'variables' ? 'active' : ''}`}
                  onClick={() => setActiveTab('variables')}
                >
                  CSS Custom Variables
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'classes' ? 'active' : ''}`}
                  onClick={() => setActiveTab('classes')}
                >
                  Styles & Rules
                </button>
              </div>
              
              <button 
                className="copy-btn" 
                onClick={() => handleCopy(activeTab === 'variables' ? cssVariablesCode : componentStylesCode)}
              >
                {copySuccess ? <Check size={14} className="green-text" /> : <Copy size={14} />}
                <span>{copySuccess ? 'Copied to Clipboard!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="css-pre">
              <code>{activeTab === 'variables' ? cssVariablesCode : componentStylesCode}</code>
            </pre>
          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .card-customizer-root {
          font-family: 'Outfit', 'Inter', sans-serif;
          color: #1e293b;
        }

        .lab-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 20px;
        }

        @media (max-width: 950px) {
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

        .flex-align {
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

        .sub-section-lbl {
          font-size: 0.78rem;
          font-weight: 700;
          margin: 0 0 12px 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .text-primary-cyan { color: #0891b2; }
        .text-primary-purple { color: #7c3aed; }
        .text-primary-gold { color: #f59e0b; }

        .slide-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 12px;
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

        .color-strip-preview {
          height: 6px;
          border-radius: 3px;
          margin-top: 4px;
          width: 100%;
        }

        .field-help {
          font-size: 0.65rem;
          color: #64748b;
        }

        .flex-sliders-row {
          display: flex;
          gap: 12px;
          margin-top: 6px;
        }

        .half-width {
          width: 50%;
          margin-bottom: 0;
        }

        .reset-btn {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 4px 10px;
          border-radius: 6px;
          color: #475569;
          font-size: 0.72rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }

        .reset-btn:hover {
          color: #0f172a;
          border-color: #94a3b8;
          background: #f8fafc;
        }

        /* WCAG Diagnostics Panel Styles */
        .contrast-telemetry {
          border-color: rgba(245, 158, 11, 0.2);
        }

        .contrast-ratio-display {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        @media (max-width: 480px) {
          .contrast-ratio-display {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        .ratio-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 4px solid;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          background: #ffffff;
          transition: all 0.3s ease;
        }

        .ratio-val {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0f172a;
        }

        .ratio-lbl {
          font-size: 0.55rem;
          text-transform: uppercase;
          color: #64748b;
        }

        .ratio-stats {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-grow: 1;
        }

        .stat-checker-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          font-size: 0.75rem;
          color: #475569;
        }

        .checker-preview {
          padding: 4px 12px;
          font-weight: 700;
          font-size: 0.8rem;
          border-radius: 4px;
          text-align: center;
          transition: all 0.2s ease;
        }

        .check-indicators {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ind-item {
          display: flex;
          align-items: center;
          font-size: 0.72rem;
          color: #475569;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 8px;
          display: inline-block;
        }

        .status-dot.pass { background-color: #10b981; }
        .status-dot.fail { background-color: #ef4444; }

        .ind-lbl {
          flex-grow: 1;
          color: #64748b;
        }

        .ind-res {
          font-family: 'Fira Code', monospace;
          font-weight: 700;
        }

        .warning-callout {
          margin-top: 12px;
          border-top: 1px solid #e2e8f0;
          padding-top: 12px;
          display: flex;
          gap: 8px;
          color: #ef4444;
          font-size: 0.72rem;
          line-height: 1.4;
        }

        .warning-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Realtime Card Sandbox Layout */
        .card-sandbox {
          display: flex;
          flex-direction: column;
        }

        .badge-selector {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .badge-selector-lbl {
          font-size: 0.75rem;
          color: #64748b;
        }

        .badge-selector-dropdown {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          color: #0f172a;
          font-size: 0.7rem;
          padding: 3px 6px;
          outline: none;
          cursor: pointer;
        }

        .card-preview-sandbox {
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 8px;
          padding: 40px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px 0;
          min-height: 400px;
        }

        /* Customized Card Elements styling with CSS Variables */
        .custom-product-card {
          width: 100%;
          max-width: 320px;
          background: var(--card-bg, #ffffff);
          border-radius: var(--card-radius);
          padding: var(--card-padding);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 
                      0 var(--shadow-blur) calc(var(--shadow-blur) * 1.5) var(--shadow-color);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        /* Simulating the card hover state */
        .custom-product-card:hover, .custom-product-card.sim-hover {
          transform: translateY(var(--hover-offset));
          border-color: var(--brand-primary);
          box-shadow: 0 8px 12px -2px rgba(0,0,0,0.15), 
                      0 var(--shadow-blur) calc(var(--shadow-blur) * 2) var(--brand-glow);
        }

        .card-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 4px 10px;
          border-radius: 100px;
          z-index: 10;
          box-shadow: 0 2px 4px rgba(0,0,0,0.25);
          transition: all 0.3s ease;
        }

        .card-badge[data-status="new"] {
          background: var(--brand-primary);
          color: white;
        }

        .card-badge[data-status="sale"] {
          background: #ef4444;
          color: white;
        }

        .card-badge[data-status="out-of-stock"] {
          background: #475569;
          color: #cbd5e1;
        }

        .product-image-container {
          width: 100%;
          height: 180px;
          border-radius: calc(var(--card-radius) * 0.7);
          overflow: hidden;
          position: relative;
          background: #e2e8f0;
        }

        .product-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .custom-product-card:hover .product-image-container img, 
        .custom-product-card.sim-hover .product-image-container img {
          transform: scale(1.08);
        }

        .img-glow-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(255,255,255,0.8), transparent);
          pointer-events: none;
        }

        .product-info-wrap {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .category-tag {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--brand-primary);
          text-transform: uppercase;
        }

        .card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f172a;
          margin: 6px 0 8px 0;
        }

        .card-text {
          font-size: 0.78rem;
          color: #475569;
          line-height: 1.5;
          margin: 0 0 16px 0;
          flex-grow: 1;
        }

        .price-tag-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 16px;
        }

        .sale-price {
          font-size: 1.4rem;
          font-weight: 700;
          color: #0f172a;
        }

        .orig-price {
          font-size: 0.85rem;
          text-decoration: line-through;
          color: #94a3b8;
        }

        .cta-button {
          background: var(--brand-primary);
          color: #ffffff;
          padding: var(--btn-padding-y) var(--btn-padding-x);
          border-radius: 0.5rem;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.1s ease;
          width: 100%;
          font-size: 0.85rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
        }

        .cta-button:hover {
          background: var(--brand-hover);
        }

        .cta-button:active {
          transform: scale(0.97);
        }

        .cta-button:disabled {
          background: #cbd5e1;
          color: #94a3b8;
          cursor: not-allowed;
        }

        .sandbox-indicator-msg {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.72rem;
          color: #64748b;
        }

        /* Export code card custom style */
        .code-export-card {
          display: flex;
          flex-direction: column;
        }

        .tab-triggers {
          display: flex;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 2px;
        }

        .tab-btn {
          background: transparent;
          border: none;
          color: #64748b;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-btn.active {
          background: #ffffff;
          color: #0f172a;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .css-pre {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px;
          overflow-x: auto;
          margin: 0;
          min-height: 240px;
        }

        .css-pre code {
          font-family: 'Fira Code', monospace;
          font-size: 0.72rem;
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
        .text-purple { color: #7c3aed; }
        .text-gold { color: #d97706; }
      `}} />
    </div>
  );
};

export default CSSCardCustomizer;
