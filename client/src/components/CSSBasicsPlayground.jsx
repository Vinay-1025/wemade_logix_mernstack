import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, Palette, Type, Ruler, Sparkles, 
  HelpCircle, CheckCircle, XCircle, Info, Copy, Check
} from 'lucide-react';

// Specificity calculator helper
const calculateSpecificity = (selector) => {
  let ids = 0;
  let classes = 0; // classes, attributes, pseudo-classes
  let elements = 0; // tags, pseudo-elements

  if (!selector || selector.trim() === '') {
    return { ids: 0, classes: 0, elements: 0 };
  }

  let str = selector.trim();

  // 1. Remove pseudo-elements (double colon) and count them
  const doubleColonPseudoElements = str.match(/::[a-zA-Z0-9_-]+/g);
  if (doubleColonPseudoElements) {
    elements += doubleColonPseudoElements.length;
    doubleColonPseudoElements.forEach(match => {
      str = str.replace(match, ' ');
    });
  }

  // Legacy pseudo-elements
  const legacyPseudo = [/:before/g, /:after/g, /:first-letter/g, /:first-line/g];
  legacyPseudo.forEach(regex => {
    const matches = str.match(regex);
    if (matches) {
      elements += matches.length;
      str = str.replace(regex, ' ');
    }
  });

  // 2. Count IDs
  const idMatches = str.match(/#[a-zA-Z0-9_-]+/g);
  if (idMatches) {
    ids += idMatches.length;
    idMatches.forEach(match => {
      str = str.replace(match, ' ');
    });
  }

  // 3. Count Attributes
  const attrMatches = str.match(/\[[^\]]+\]/g);
  if (attrMatches) {
    classes += attrMatches.length;
    attrMatches.forEach(match => {
      str = str.replace(match, ' ');
    });
  }

  // 4. Count Pseudo-classes (single colon remaining)
  const pseudoClassMatches = str.match(/:[a-zA-Z0-9_-]+(?:\([^)]*\))?/g);
  if (pseudoClassMatches) {
    classes += pseudoClassMatches.length;
    pseudoClassMatches.forEach(match => {
      str = str.replace(match, ' ');
    });
  }

  // 5. Count Classes
  const classMatches = str.match(/\.[a-zA-Z0-9_-]+/g);
  if (classMatches) {
    classes += classMatches.length;
    classMatches.forEach(match => {
      str = str.replace(match, ' ');
    });
  }

  // 6. Count Tags
  str = str.replace(/[>\+~]/g, ' ');
  const tags = str.match(/[a-zA-Z0-9_-]+/g);
  if (tags) {
    const validTags = tags.filter(t => isNaN(t) && t !== 'and' && t !== 'or');
    elements += validTags.length;
  }

  return { ids, classes, elements };
};

// HSL to RGB helper
const hslToRgb = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
};

// RGB to Hex helper
const rgbToHex = (r, g, b) => {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
};

// Relative Luminance calculation for contrast checking
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

const CSSBasicsPlayground = () => {
  const [activeTab, setActiveTab] = useState('selectors');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // -------------------------------------------------------------
  // TAB 1: SELECTORS LAB STATE
  // -------------------------------------------------------------
  const [selectorText, setSelectorText] = useState('.title');
  const [selectorError, setSelectorError] = useState(null);
  const [matchedCount, setMatchedCount] = useState(0);
  const previewRef = useRef(null);

  const selectorPresets = [
    { label: 'Tag: h4', selector: 'h4' },
    { label: 'Class: .badge', selector: '.badge' },
    { label: 'ID: #featured-card', selector: '#featured-card' },
    { label: 'Child: .lab-card > h4', selector: 'div.lab-card > h4' },
    { label: 'Descendant: .lab-card .highlight', selector: 'div.lab-card .highlight' },
    { label: 'Attribute: [data-type="primary"]', selector: 'button[data-type="primary"]' },
    { label: 'Tag & Class: li.active', selector: 'li.active' },
    { label: 'Mixed Combo: div.lab-card #featured-card ul li a:hover', selector: 'div.lab-card #featured-card ul li a:hover' }
  ];

  useEffect(() => {
    if (!previewRef.current) return;
    
    // Clean up previous highlights
    const allElements = previewRef.current.querySelectorAll('*');
    allElements.forEach(el => el.classList.remove('selector-highlighted'));
    
    if (!selectorText.trim()) {
      setMatchedCount(0);
      setSelectorError(null);
      return;
    }
    
    try {
      // Test selector safety by replacing pseudo-classes that require mouse triggers for querySelector matching
      let testSelector = selectorText;
      // querySelectorAll fails on :hover if cursor is not on it, but we want to highlight what would match
      testSelector = testSelector.replace(/:hover/g, '');
      testSelector = testSelector.replace(/:focus/g, '');
      testSelector = testSelector.replace(/:active/g, '');
      
      const matched = previewRef.current.querySelectorAll(testSelector);
      matched.forEach(el => el.classList.add('selector-highlighted'));
      setMatchedCount(matched.length);
      setSelectorError(null);
    } catch (err) {
      setSelectorError('Invalid CSS Selector syntax');
      setMatchedCount(0);
    }
  }, [selectorText, activeTab]);

  const specScore = calculateSpecificity(selectorText);

  // -------------------------------------------------------------
  // TAB 2: COLORS & CONTRAST STATE
  // -------------------------------------------------------------
  const [textH, setTextH] = useState(220);
  const [textS, setTextS] = useState(90);
  const [textL, setTextL] = useState(98);
  const [bgH, setBgH] = useState(222);
  const [bgS, setBgS] = useState(47);
  const [bgL, setBgL] = useState(11);
  const [fontSizeToggle, setFontSizeToggle] = useState('normal'); // normal, large

  const textRgb = hslToRgb(textH, textS, textL);
  const bgRgb = hslToRgb(bgH, bgS, bgL);
  const contrastRatio = getContrastRatio(textRgb, bgRgb);

  const passesAA_Normal = contrastRatio >= 4.5;
  const passesAA_Large = contrastRatio >= 3.0;
  const passesAAA_Normal = contrastRatio >= 7.0;
  const passesAAA_Large = contrastRatio >= 4.5;

  const colorPresets = [
    { name: 'Sleek Dark Mode (Cyan & Dark Slate)', text: [180, 100, 50], bg: [220, 30, 8] },
    { name: 'Accessible Light (Navy & Cream)', text: [220, 95, 15], bg: [40, 30, 96] },
    { name: 'Vibrant Amber on Indigo', text: [45, 100, 55], bg: [250, 60, 20] },
    { name: 'Failing Contrast Alert', text: [120, 70, 75], bg: [0, 0, 90] }
  ];

  const applyColorPreset = (preset) => {
    setTextH(preset.text[0]);
    setTextS(preset.text[1]);
    setTextL(preset.text[2]);
    setBgH(preset.bg[0]);
    setBgS(preset.bg[1]);
    setBgL(preset.bg[2]);
  };

  // -------------------------------------------------------------
  // TAB 3: TYPOGRAPHY STATE
  // -------------------------------------------------------------
  const [fontFamily, setFontFamily] = useState('sans-serif'); // sans-serif, serif, monospace
  const [fontSizeRem, setFontSizeRem] = useState(1.1); // rem size
  const [fontWeight, setFontWeight] = useState(400);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [letterSpacing, setLetterSpacing] = useState(0); // em unit
  const [textTransform, setTextTransform] = useState('none'); // none, uppercase, capitalize
  const [textDecoration, setTextDecoration] = useState('none');

  const getFontFamilyStyle = () => {
    if (fontFamily === 'serif') return "'Lora', Georgia, serif";
    if (fontFamily === 'monospace') return "'Fira Code', Courier, monospace";
    return "'Outfit', 'Inter', sans-serif";
  };

  const typographyCSS = `font-family: ${getFontFamilyStyle()};
font-size: ${fontSizeRem}rem;
font-weight: ${fontWeight};
line-height: ${lineHeight};
letter-spacing: ${letterSpacing}em;
text-transform: ${textTransform};
text-decoration: ${textDecoration};`;

  // -------------------------------------------------------------
  // TAB 4: UNITS COMPARATOR STATE
  // -------------------------------------------------------------
  const [rootFontSize, setRootFontSize] = useState(16); // px
  const [parentFontSize, setParentFontSize] = useState(16); // px
  const [parentWidth, setParentWidth] = useState(400); // px
  const [viewportWidth, setViewportWidth] = useState(600); // px (simulated)

  // Calculations:
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

  // -------------------------------------------------------------
  // TAB 5: DYNAMIC SHOWCASE CARD CUSTOMIZER
  // -------------------------------------------------------------
  const [themeHue, setThemeHue] = useState(215);
  const [cardRadius, setCardRadius] = useState(1.0); // rem
  const [btnPadding, setBtnPadding] = useState(0.85); // em
  const [hoverScale, setHoverScale] = useState(4); // Y-translation offset
  const [badgeStatus, setBadgeStatus] = useState('sale'); // sale, new, hot

  const cardPrimaryColor = `hsl(${themeHue}, 90%, 50%)`;
  const cardHoverColor = `hsl(${themeHue}, 85%, 40%)`;

  const showcaseCSS = `:root {
  --brand-primary: hsl(${themeHue}, 90%, 50%);
  --brand-hover: hsl(${themeHue}, 85%, 40%);
  --card-radius: ${cardRadius}rem;
  --btn-padding: ${btnPadding}em;
  --hover-y-offset: -${hoverScale}px;
}

.product-card {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: white;
  max-width: 360px;
  border-radius: var(--card-radius);
  border: 1px solid hsl(214, 32%, 91%);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover {
  transform: translateY(var(--hover-y-offset));
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.cta-button {
  background: var(--brand-primary);
  padding: var(--btn-padding) 1.5em;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: background 0.2s;
}

.cta-button:hover {
  background: var(--brand-hover);
}`;

  return (
    <div className="css-lab-container">
      {/* Premium Header */}
      <div className="css-lab-header">
        <div className="header-info">
          <Sparkles className="header-icon animate-pulse" />
          <div>
            <h3>CSS Fundamentals Interactive Lab</h3>
            <p>Master selectors, color contrast validation, font rendering, and fluid unit mathematics in real-time.</p>
          </div>
        </div>
      </div>

      {/* Tabs System */}
      <div className="css-lab-tabs">
        <button 
          className={`tab-btn ${activeTab === 'selectors' ? 'active' : ''}`}
          onClick={() => setActiveTab('selectors')}
        >
          <Target size={16} />
          <span>Selectors Lab</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'colors' ? 'active' : ''}`}
          onClick={() => setActiveTab('colors')}
        >
          <Palette size={16} />
          <span>Colors & Contrast</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'typography' ? 'active' : ''}`}
          onClick={() => setActiveTab('typography')}
        >
          <Type size={16} />
          <span>Typography Explorer</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'units' ? 'active' : ''}`}
          onClick={() => setActiveTab('units')}
        >
          <Ruler size={16} />
          <span>Units Comparator</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'showcase' ? 'active' : ''}`}
          onClick={() => setActiveTab('showcase')}
        >
          <Sparkles size={16} />
          <span>Showcase Builder</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="tab-content-panel">
        <AnimatePresence mode="wait">
          {/* SELECTORS LAB */}
          {activeTab === 'selectors' && (
            <motion.div 
              key="selectors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lab-grid"
            >
              <div className="control-card">
                <h4>1. Interactive Specificity Solver</h4>
                <p className="desc-text">Type any CSS selector to inspect its Specificity Score. The browser resolves overlapping styles by choosing the rule with the highest score.</p>
                
                <div className="input-group">
                  <label htmlFor="selector-input">CSS Selector</label>
                  <input 
                    id="selector-input"
                    type="text" 
                    value={selectorText} 
                    onChange={(e) => setSelectorText(e.target.value)} 
                    placeholder="e.g. div.card h3"
                    className={`selector-input-box ${selectorError ? 'error' : ''}`}
                  />
                  {selectorError && <span className="input-warning">{selectorError}</span>}
                </div>

                {/* Score Dashboard */}
                <div className="specificity-dashboard">
                  <div className="score-cell">
                    <span className="cell-num">{specScore.ids}</span>
                    <span className="cell-label">IDs (A)</span>
                  </div>
                  <div className="score-cell">
                    <span className="cell-num">{specScore.classes}</span>
                    <span className="cell-label">Classes (B)</span>
                  </div>
                  <div className="score-cell">
                    <span className="cell-num">{specScore.elements}</span>
                    <span className="cell-label">Tags (C)</span>
                  </div>
                  <div className="score-bracket">
                    <span className="bracket-score">({specScore.ids}, {specScore.classes}, {specScore.elements})</span>
                    <span className="bracket-title">Total Score</span>
                  </div>
                </div>

                <div className="matched-indicator">
                  <Info size={14} />
                  <span>Matches <strong>{matchedCount}</strong> target nodes in DOM preview below.</span>
                </div>

                {/* Quick Presets */}
                <div className="presets-section">
                  <h5>Click Examples to Test:</h5>
                  <div className="preset-badges">
                    {selectorPresets.map(preset => (
                      <button 
                        key={preset.label} 
                        className={`preset-chip ${selectorText === preset.selector ? 'active' : ''}`}
                        onClick={() => setSelectorText(preset.selector)}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* DOM Preview Output */}
              <div className="preview-card">
                <div className="card-header-bar">
                  <span className="bar-dot green"></span>
                  <span className="bar-dot yellow"></span>
                  <span className="bar-dot red"></span>
                  <span className="bar-title">DOM Node Visualizer</span>
                </div>
                
                <div className="sandbox-viewport" ref={previewRef}>
                  <div className="lab-card" id="featured-card">
                    <div className="badge" data-status="sale">SPECIAL OFFER</div>
                    <h4 className="title">Premium Wireless Headphone</h4>
                    <p className="desc">
                      Experience acoustics with <span className="highlight">deep adaptive bass</span> cancellation on-the-go.
                    </p>
                    <div className="btn-group">
                      <button className="btn" data-type="primary">Buy Now</button>
                      <button className="btn" data-type="secondary">Specs</button>
                    </div>
                    <ul>
                      <li className="active"><a href="#ship">Free Shipping Worldwide</a></li>
                      <li><a href="#warranty">1-Year Full Warranty Support</a></li>
                    </ul>
                  </div>
                </div>

                <div className="educational-note">
                  <HelpCircle size={14} className="note-icon" />
                  <p>Green rings denote matches. Specificity hierarchy resolves conflicts. ID rules score <code>(1, 0, 0)</code> and override infinite classes <code>(0, X, 0)</code>.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* COLORS & CONTRAST */}
          {activeTab === 'colors' && (
            <motion.div 
              key="colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lab-grid"
            >
              <div className="control-card">
                <h4>2. Color & Contrast Accessibility Validator</h4>
                <p className="desc-text">Use HSL channels to select text and background colors. Contrast ratio calculates the math behind WCAG accessibility targets.</p>

                {/* Text Color Controls */}
                <div className="slider-group-box">
                  <h5>Text Color (HSL)</h5>
                  <div className="slider-item">
                    <span className="slider-label">Hue ({textH}°)</span>
                    <input type="range" min="0" max="360" value={textH} onChange={(e) => setTextH(parseInt(e.target.value))} />
                  </div>
                  <div className="slider-item">
                    <span className="slider-label">Saturation ({textS}%)</span>
                    <input type="range" min="0" max="100" value={textS} onChange={(e) => setTextS(parseInt(e.target.value))} />
                  </div>
                  <div className="slider-item">
                    <span className="slider-label">Lightness ({textL}%)</span>
                    <input type="range" min="0" max="100" value={textL} onChange={(e) => setTextL(parseInt(e.target.value))} />
                  </div>
                  <div className="color-value-badge">
                    <span>HEX: {rgbToHex(...textRgb).toUpperCase()}</span>
                    <span>RGB: rgb({textRgb.join(', ')})</span>
                  </div>
                </div>

                {/* Background Color Controls */}
                <div className="slider-group-box">
                  <h5>Background Color (HSL)</h5>
                  <div className="slider-item">
                    <span className="slider-label">Hue ({bgH}°)</span>
                    <input type="range" min="0" max="360" value={bgH} onChange={(e) => setBgH(parseInt(e.target.value))} />
                  </div>
                  <div className="slider-item">
                    <span className="slider-label">Saturation ({bgS}%)</span>
                    <input type="range" min="0" max="100" value={bgS} onChange={(e) => setBgS(parseInt(e.target.value))} />
                  </div>
                  <div className="slider-item">
                    <span className="slider-label">Lightness ({bgL}%)</span>
                    <input type="range" min="0" max="100" value={bgL} onChange={(e) => setBgL(parseInt(e.target.value))} />
                  </div>
                  <div className="color-value-badge">
                    <span>HEX: {rgbToHex(...bgRgb).toUpperCase()}</span>
                    <span>RGB: rgb({bgRgb.join(', ')})</span>
                  </div>
                </div>

                {/* Color Presets */}
                <div className="presets-section">
                  <h5>Contrast presets:</h5>
                  <div className="preset-buttons">
                    {colorPresets.map(preset => (
                      <button 
                        key={preset.name}
                        onClick={() => applyColorPreset(preset)}
                        className="preset-btn-color"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contrast Checker Output */}
              <div className="preview-card">
                <div className="contrast-score-display">
                  <div className="score-circle">
                    <span className="ratio-num">{contrastRatio.toFixed(2)}:1</span>
                    <span className="ratio-title">Contrast Ratio</span>
                  </div>

                  <div className="validation-checks">
                    <div className="check-row">
                      {passesAA_Normal ? <CheckCircle className="pass-icon" size={16} /> : <XCircle className="fail-icon" size={16} />}
                      <span>Level AA Normal Text (Min 4.5:1)</span>
                    </div>
                    <div className="check-row">
                      {passesAA_Large ? <CheckCircle className="pass-icon" size={16} /> : <XCircle className="fail-icon" size={16} />}
                      <span>Level AA Large Text (Min 3.0:1)</span>
                    </div>
                    <div className="check-row">
                      {passesAAA_Normal ? <CheckCircle className="pass-icon" size={16} /> : <XCircle className="fail-icon" size={16} />}
                      <span>Level AAA Normal Text (Min 7.0:1)</span>
                    </div>
                    <div className="check-row">
                      {passesAAA_Large ? <CheckCircle className="pass-icon" size={16} /> : <XCircle className="fail-icon" size={16} />}
                      <span>Level AAA Large Text (Min 4.5:1)</span>
                    </div>
                  </div>
                </div>

                {/* Real-time Render Sample */}
                <div 
                  className="color-render-block"
                  style={{ 
                    backgroundColor: `hsl(${bgH}, ${bgS}%, ${bgL}%)`,
                    color: `hsl(${textH}, ${textS}%, ${textL}%)`
                  }}
                >
                  <span className="sample-badge" style={{ borderColor: `hsl(${textH}, ${textS}%, ${textL}%)` }}>
                    Live Preview Rendering
                  </span>
                  <h4 style={{ fontSize: fontSizeToggle === 'large' ? '24px' : '18px', fontWeight: 'bold' }}>
                    Visual Content Header Block
                  </h4>
                  <p style={{ fontSize: fontSizeToggle === 'large' ? '18px' : '14px', opacity: 0.95, lineHeight: 1.5 }}>
                    This text updates instantaneously in response to the HSL slider positions. Ensure contrast ratios exceed WCAG AA limits to support visual accessibility needs.
                  </p>
                </div>

                <div className="size-selector-bar">
                  <span>Toggle Text Size:</span>
                  <button className={`btn-pill ${fontSizeToggle === 'normal' ? 'active' : ''}`} onClick={() => setFontSizeToggle('normal')}>Normal (14px)</button>
                  <button className={`btn-pill ${fontSizeToggle === 'large' ? 'active' : ''}`} onClick={() => setFontSizeToggle('large')}>Large (18px)</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TYPOGRAPHY EXPLORER */}
          {activeTab === 'typography' && (
            <motion.div 
              key="typography"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lab-grid"
            >
              <div className="control-card">
                <h4>3. CSS Typography Fine-Tuning</h4>
                <p className="desc-text">Examine micro-typography metrics including margins, line-height scaling, letter-spacing properties, and capitalization transformations.</p>

                <div className="slider-group-box">
                  <h5>Font Properties</h5>
                  
                  <div className="input-group">
                    <label htmlFor="font-family-select">Font Family Stack</label>
                    <select 
                      id="font-family-select"
                      value={fontFamily} 
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="select-styled"
                    >
                      <option value="sans-serif">Sans-Serif (Outfit / Inter)</option>
                      <option value="serif">Serif (Lora / Georgia)</option>
                      <option value="monospace">Monospace (Fira Code / Courier)</option>
                    </select>
                  </div>

                  <div className="slider-item">
                    <span className="slider-label">Font Size ({fontSizeRem}rem / {Math.round(fontSizeRem * 16)}px)</span>
                    <input type="range" min="0.8" max="2.5" step="0.05" value={fontSizeRem} onChange={(e) => setFontSizeRem(parseFloat(e.target.value))} />
                  </div>

                  <div className="slider-item">
                    <span className="slider-label">Font Weight ({fontWeight})</span>
                    <input type="range" min="300" max="700" step="100" value={fontWeight} onChange={(e) => setFontWeight(parseInt(e.target.value))} />
                  </div>

                  <div className="slider-item">
                    <span className="slider-label">Line Height ({lineHeight})</span>
                    <input type="range" min="1.0" max="2.2" step="0.05" value={lineHeight} onChange={(e) => setLineHeight(parseFloat(e.target.value))} />
                  </div>

                  <div className="slider-item">
                    <span className="slider-label">Letter Spacing ({letterSpacing}em)</span>
                    <input type="range" min="-0.05" max="0.30" step="0.01" value={letterSpacing} onChange={(e) => setLetterSpacing(parseFloat(e.target.value))} />
                  </div>

                  <div className="input-row">
                    <div className="input-col">
                      <label htmlFor="text-transform-select">Text Transform</label>
                      <select id="text-transform-select" value={textTransform} onChange={(e) => setTextTransform(e.target.value)} className="select-styled">
                        <option value="none">none</option>
                        <option value="uppercase">uppercase</option>
                        <option value="lowercase">lowercase</option>
                        <option value="capitalize">capitalize</option>
                      </select>
                    </div>
                    <div className="input-col">
                      <label htmlFor="text-decoration-select">Text Decoration</label>
                      <select id="text-decoration-select" value={textDecoration} onChange={(e) => setTextDecoration(e.target.value)} className="select-styled">
                        <option value="none">none</option>
                        <option value="underline">underline</option>
                        <option value="line-through">line-through</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Typography Preview & CSS Code Block */}
              <div className="preview-card">
                <div className="card-header-bar">
                  <span className="bar-title">Typography Layout Preview</span>
                </div>

                <div className="typography-sandbox-block">
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    letterSpacing: '0.15em', 
                    color: 'var(--primary-cyan)',
                    textTransform: 'uppercase'
                  }}>
                    Interactive Display
                  </span>
                  <h2 style={{ 
                    fontFamily: getFontFamilyStyle(),
                    fontSize: `${fontSizeRem * 1.5}rem`,
                    fontWeight: fontWeight,
                    lineHeight: lineHeight - 0.2,
                    letterSpacing: `${letterSpacing}em`,
                    textTransform: textTransform,
                    textDecoration: textDecoration,
                    color: 'white',
                    margin: '8px 0 16px 0'
                  }}>
                    Premium Typography Design
                  </h2>
                  <p style={{ 
                    fontFamily: getFontFamilyStyle(),
                    fontSize: `${fontSizeRem}rem`,
                    fontWeight: 300,
                    lineHeight: lineHeight,
                    letterSpacing: `${letterSpacing * 0.5}em`,
                    color: '#94a3b8'
                  }}>
                    Line spacing and letter tracking establish readability grids. Unitless line-height calculations scale automatically with font-size adjustments.
                  </p>
                </div>

                {/* CSS Code Output */}
                <div className="code-output-card">
                  <div className="code-header">
                    <span>Generated CSS Code</span>
                    <button className="copy-btn" onClick={() => handleCopy(typographyCSS)}>
                      {copySuccess ? <Check size={14} className="green-text" /> : <Copy size={14} />}
                      <span>{copySuccess ? 'Copied!' : 'Copy CSS'}</span>
                    </button>
                  </div>
                  <pre className="css-pre">
                    <code>{typographyCSS}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          )}

          {/* UNITS COMPARATOR */}
          {activeTab === 'units' && (
            <motion.div 
              key="units"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lab-grid"
            >
              <div className="control-card">
                <h4>4. Relative & Absolute Units Engine</h4>
                <p className="desc-text">CSS units calculate dimensions relative to their context. Adjust the base contexts below to see how widths scale dynamically in pixels.</p>

                <div className="slider-group-box">
                  <h5>Context Variables</h5>
                  
                  <div className="slider-item">
                    <span className="slider-label">Root Font Size (<code>html</code>) - ({rootFontSize}px)</span>
                    <input type="range" min="10" max="24" value={rootFontSize} onChange={(e) => setRootFontSize(parseInt(e.target.value))} />
                    <span className="slider-helper">Defines base for all <code>rem</code> dimensions.</span>
                  </div>

                  <div className="slider-item">
                    <span className="slider-label">Parent Component Font Size - ({parentFontSize}px)</span>
                    <input type="range" min="10" max="32" value={parentFontSize} onChange={(e) => setParentFontSize(parseInt(e.target.value))} />
                    <span className="slider-helper">Defines base for all local child <code>em</code> units.</span>
                  </div>

                  <div className="slider-item">
                    <span className="slider-label">Parent Container Width - ({parentWidth}px)</span>
                    <input type="range" min="200" max="500" value={parentWidth} onChange={(e) => setParentWidth(parseInt(e.target.value))} />
                    <span className="slider-helper">Defines base for child percentage (<code>%</code>) scales.</span>
                  </div>

                  <div className="slider-item">
                    <span className="slider-label">Simulated Viewport Width - ({viewportWidth}px)</span>
                    <input type="range" min="320" max="1000" value={viewportWidth} onChange={(e) => setViewportWidth(parseInt(e.target.value))} />
                    <span className="slider-helper">Defines base for viewport width (<code>vw</code>) calculations.</span>
                  </div>
                </div>
              </div>

              {/* Units Bar Comparison Grid */}
              <div className="preview-card">
                <h4>Computed Dimensions Comparison</h4>
                <p className="desc-text">Each box represents a defined style sheet value. Drag sliders to watch them recalculate in real-time.</p>

                <div className="parent-bounding-box" style={{ width: `${parentWidth}px` }}>
                  <span className="parent-tag">Parent Container ({parentWidth}px)</span>

                  {/* Absolute px */}
                  <div className="unit-row-item">
                    <div className="unit-label-bar">
                      <span>Absolute Pixel: <code>width: 160px</code></span>
                      <strong className="computed-val">{computedPxWidth.toFixed(0)}px</strong>
                    </div>
                    <div className="unit-visualization-bar px-bar" style={{ width: `${computedPxWidth}px` }}></div>
                  </div>

                  {/* Root Relative rem */}
                  <div className="unit-row-item">
                    <div className="unit-label-bar">
                      <span>Root Relative: <code>width: 10rem</code> <span className="formula">(10 × {rootFontSize}px)</span></span>
                      <strong className="computed-val">{computedRemWidth.toFixed(0)}px</strong>
                    </div>
                    <div className="unit-visualization-bar rem-bar" style={{ width: `${Math.min(computedRemWidth, parentWidth)}px` }}></div>
                  </div>

                  {/* Parent Relative em */}
                  <div className="unit-row-item">
                    <div className="unit-label-bar">
                      <span>Parent Relative: <code>width: 10em</code> <span className="formula">(10 × {parentFontSize}px)</span></span>
                      <strong className="computed-val">{computedEmWidth.toFixed(0)}px</strong>
                    </div>
                    <div className="unit-visualization-bar em-bar" style={{ width: `${Math.min(computedEmWidth, parentWidth)}px` }}></div>
                  </div>

                  {/* Percentage % */}
                  <div className="unit-row-item">
                    <div className="unit-label-bar">
                      <span>Parent Percentage: <code>width: 40%</code> <span className="formula">(40% of {parentWidth}px)</span></span>
                      <strong className="computed-val">{computedPctWidth.toFixed(0)}px</strong>
                    </div>
                    <div className="unit-visualization-bar pct-bar" style={{ width: `${computedPctWidth}px` }}></div>
                  </div>

                  {/* Viewport vw */}
                  <div className="unit-row-item">
                    <div className="unit-label-bar">
                      <span>Viewport Width: <code>width: 25vw</code> <span className="formula">(25% of {viewportWidth}px)</span></span>
                      <strong className="computed-val">{computedVwWidth.toFixed(0)}px</strong>
                    </div>
                    <div className="unit-visualization-bar vw-bar" style={{ width: `${Math.min(computedVwWidth, parentWidth)}px` }}></div>
                  </div>
                </div>

                <div className="educational-note" style={{ marginTop: '20px' }}>
                  <Info size={14} className="note-icon" />
                  <p>When user adjustments zoom local browser font sizes, relative <code>rem</code> blocks expand fluidly to preserve content accessibility. Fixed <code>px</code> values fail to scale.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* SHOWCASE BUILDER */}
          {activeTab === 'showcase' && (
            <motion.div 
              key="showcase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lab-grid"
            >
              <div className="control-card">
                <h4>5. Premium Card CSS Customizer</h4>
                <p className="desc-text">Compose and style a modern, interactive e-commerce product card. Modify variables to build standard component design tokens.</p>

                <div className="slider-group-box">
                  <h5>Component Variables</h5>
                  
                  <div className="slider-item">
                    <span className="slider-label">Brand Primary Hue ({themeHue}°)</span>
                    <input type="range" min="0" max="360" value={themeHue} onChange={(e) => setThemeHue(parseInt(e.target.value))} />
                    <div className="color-preview-swatch" style={{ background: cardPrimaryColor }}></div>
                  </div>

                  <div className="slider-item">
                    <span className="slider-label">Card Border Radius ({cardRadius}rem)</span>
                    <input type="range" min="0" max="2" step="0.125" value={cardRadius} onChange={(e) => setCardRadius(parseFloat(e.target.value))} />
                  </div>

                  <div className="slider-item">
                    <span className="slider-label">Button Padding ({btnPadding}em)</span>
                    <input type="range" min="0.4" max="1.5" step="0.05" value={btnPadding} onChange={(e) => setBtnPadding(parseFloat(e.target.value))} />
                  </div>

                  <div className="slider-item">
                    <span className="slider-label">Hover Y Translation ({-hoverScale}px)</span>
                    <input type="range" min="0" max="12" value={hoverScale} onChange={(e) => setHoverScale(parseInt(e.target.value))} />
                  </div>

                  <div className="input-group">
                    <label htmlFor="badge-status-select">Status Badge</label>
                    <select id="badge-status-select" value={badgeStatus} onChange={(e) => setBadgeStatus(e.target.value)} className="select-styled">
                      <option value="sale">NEW ARRIVAL</option>
                      <option value="hot">HOT DEAL</option>
                      <option value="sold">OUT OF STOCK</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Showcase Card Preview & CSS Block */}
              <div className="preview-card">
                <div className="card-header-bar">
                  <span className="bar-title">Interactive Component Preview</span>
                </div>

                <div className="card-customizer-preview-container">
                  <div 
                    className="showcase-product-card"
                    style={{ 
                      borderRadius: `${cardRadius}rem`,
                      '--hover-y-offset': `-${hoverScale}px`
                    }}
                  >
                    {/* Status Badge */}
                    <div 
                      className="showcase-badge"
                      style={{ 
                        backgroundColor: badgeStatus === 'sold' ? '#64748b' : badgeStatus === 'hot' ? '#f59e0b' : '#ef4444'
                      }}
                    >
                      {badgeStatus === 'sold' ? 'OUT OF STOCK' : badgeStatus === 'hot' ? 'HOT DEAL' : 'NEW ARRIVAL'}
                    </div>

                    <div className="showcase-img-container">
                      <img src="https://picsum.photos/400/300?random=10" alt="Showcase Product" />
                    </div>

                    <div className="showcase-info">
                      <span className="showcase-category" style={{ color: cardPrimaryColor }}>AUDIO PRO</span>
                      <h4 className="showcase-title">SoundLink Pro Headphones</h4>
                      <p className="showcase-desc">Acoustic precision pairing with adaptive sound isolation filters.</p>
                      
                      <div className="showcase-price-row">
                        <span className="showcase-current-price">$249.99</span>
                        <span className="showcase-old-price">$299.99</span>
                      </div>

                      <button 
                        className="showcase-cta-btn"
                        style={{ 
                          backgroundColor: cardPrimaryColor,
                          padding: `${btnPadding}em 1.5em`,
                          '--btn-hover-bg': cardHoverColor
                        }}
                        disabled={badgeStatus === 'sold'}
                      >
                        {badgeStatus === 'sold' ? 'Unavailable' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* CSS Code Output */}
                <div className="code-output-card" style={{ marginTop: '20px' }}>
                  <div className="code-header">
                    <span>Generated CSS Code</span>
                    <button className="copy-btn" onClick={() => handleCopy(showcaseCSS)}>
                      {copySuccess ? <Check size={14} className="green-text" /> : <Copy size={14} />}
                      <span>{copySuccess ? 'Copied!' : 'Copy CSS'}</span>
                    </button>
                  </div>
                  <pre className="css-pre">
                    <code>{showcaseCSS}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .css-lab-container {
          background: #0f172a;
          border-radius: 16px;
          border: 1px solid #1e293b;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
          font-family: 'Outfit', 'Inter', sans-serif;
          color: #f8fafc;
          padding: 0;
          margin-bottom: 24px;
        }

        .css-lab-header {
          padding: 24px;
          background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
          border-bottom: 1px solid #1e293b;
        }

        .header-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-icon {
          color: #06b6d4;
          width: 32px;
          height: 32px;
        }

        .css-lab-header h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 4px 0;
          color: #ffffff;
        }

        .css-lab-header p {
          font-size: 0.85rem;
          color: #94a3b8;
          margin: 0;
        }

        .css-lab-tabs {
          display: flex;
          background: #0b0f19;
          border-bottom: 1px solid #1e293b;
          overflow-x: auto;
        }

        .tab-btn {
          flex: 1;
          min-width: 140px;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: #64748b;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border-bottom: 2px solid transparent;
        }

        .tab-btn:hover {
          color: #94a3b8;
          background: rgba(255, 255, 255, 0.02);
        }

        .tab-btn.active {
          color: #06b6d4;
          border-bottom-color: #06b6d4;
          background: rgba(6, 182, 212, 0.05);
        }

        .tab-content-panel {
          padding: 24px;
        }

        .lab-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        @media (max-width: 900px) {
          .lab-grid {
            grid-template-columns: 1fr;
          }
        }

        .control-card {
          background: #131b2e;
          border: 1px solid #1e293b;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .control-card h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0;
          color: #ffffff;
        }

        .desc-text {
          font-size: 0.85rem;
          color: #94a3b8;
          line-height: 1.5;
          margin: 0;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-group label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #94a3b8;
        }

        .selector-input-box {
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 6px;
          padding: 10px 14px;
          color: #f8fafc;
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
          outline: none;
          transition: border 0.2s;
        }

        .selector-input-box:focus {
          border-color: #06b6d4;
        }

        .selector-input-box.error {
          border-color: #ef4444;
        }

        .input-warning {
          font-size: 0.75rem;
          color: #ef4444;
          margin-top: 4px;
        }

        .specificity-dashboard {
          display: grid;
          grid-template-columns: repeat(3, 1fr) 1.2fr;
          border: 1px solid #1e293b;
          background: #0b0f19;
          border-radius: 8px;
          overflow: hidden;
        }

        .score-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 12px;
          border-right: 1px solid #1e293b;
        }

        .cell-num {
          font-size: 1.25rem;
          font-weight: 700;
          color: #06b6d4;
        }

        .cell-label {
          font-size: 0.65rem;
          color: #64748b;
          font-weight: 600;
          margin-top: 2px;
          text-transform: uppercase;
        }

        .score-bracket {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 12px;
          background: rgba(6, 182, 212, 0.08);
        }

        .bracket-score {
          font-size: 1.1rem;
          font-family: 'Fira Code', monospace;
          font-weight: 700;
          color: #ffffff;
        }

        .bracket-title {
          font-size: 0.65rem;
          color: #06b6d4;
          font-weight: 700;
          margin-top: 2px;
          text-transform: uppercase;
        }

        .matched-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px;
          background: rgba(6, 182, 212, 0.04);
          border-left: 3px solid #06b6d4;
          border-radius: 4px;
          font-size: 0.78rem;
          color: #e2e8f0;
        }

        .presets-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .presets-section h5 {
          font-size: 0.8rem;
          font-weight: 600;
          color: #94a3b8;
          margin: 0;
        }

        .preset-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .preset-chip {
          background: #0f172a;
          border: 1px solid #1e293b;
          padding: 4px 10px;
          border-radius: 100px;
          color: #94a3b8;
          font-size: 0.72rem;
          font-family: 'Fira Code', monospace;
          cursor: pointer;
          transition: all 0.2s;
        }

        .preset-chip:hover {
          color: #ffffff;
          border-color: #64748b;
        }

        .preset-chip.active {
          background: #06b6d4;
          color: #0f172a;
          border-color: transparent;
          font-weight: 600;
        }

        .preview-card {
          background: #131b2e;
          border: 1px solid #1e293b;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .card-header-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          border-bottom: 1px solid #1e293b;
          padding-bottom: 12px;
        }

        .bar-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .bar-dot.green { background: #10b981; }
        .bar-dot.yellow { background: #f59e0b; }
        .bar-dot.red { background: #ef4444; }

        .bar-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: #64748b;
          margin-left: 4px;
          text-transform: uppercase;
        }

        .sandbox-viewport {
          background: #0b0f19;
          border: 1px solid #1e293b;
          border-radius: 8px;
          padding: 24px;
          display: flex;
          justify-content: center;
          min-height: 250px;
          align-items: center;
        }

        .lab-card {
          background: #ffffff;
          color: #1e293b;
          width: 100%;
          max-width: 320px;
          padding: 16px;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border: 1px solid #cbd5e1;
        }

        .lab-card .badge {
          display: inline-block;
          background: #ef4444;
          color: white;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 100px;
          margin-bottom: 8px;
        }

        .lab-card h4 {
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0 0 6px 0;
          color: #0f172a;
        }

        .lab-card .desc {
          font-size: 0.78rem;
          color: #475569;
          line-height: 1.4;
          margin: 0 0 12px 0;
        }

        .lab-card .highlight {
          background: #fef08a;
          color: #854d0e;
          padding: 0 4px;
          border-radius: 2px;
          font-weight: 600;
        }

        .lab-card .btn-group {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }

        .lab-card .btn {
          flex: 1;
          padding: 6px;
          font-size: 0.72rem;
          font-weight: 600;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }

        .lab-card .btn[data-type="primary"] {
          background: #2563eb;
          color: white;
        }

        .lab-card .btn[data-type="secondary"] {
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
        }

        .lab-card ul {
          margin: 0;
          padding-left: 16px;
          font-size: 0.72rem;
          color: #475569;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .lab-card li.active a {
          color: #2563eb;
          font-weight: 600;
        }

        .lab-card a {
          color: #475569;
          text-decoration: none;
        }

        /* Interactive Specificity Outline Glow */
        .selector-highlighted {
          outline: 2px dashed #06b6d4 !important;
          outline-offset: 4px;
          box-shadow: 0 0 12px rgba(6, 182, 212, 0.4) !important;
          background-color: rgba(6, 182, 212, 0.08) !important;
        }

        .educational-note {
          display: flex;
          gap: 8px;
          padding: 10px;
          background: rgba(255,255,255,0.02);
          border-radius: 6px;
          font-size: 0.75rem;
          color: #64748b;
          line-height: 1.4;
        }

        .note-icon {
          color: #06b6d4;
          flex-shrink: 0;
        }

        /* SLIDER SYSTEM */
        .slider-group-box {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #0b0f19;
          border: 1px solid #1e293b;
          border-radius: 8px;
          padding: 14px;
        }

        .slider-group-box h5 {
          font-size: 0.85rem;
          font-weight: 700;
          margin: 0 0 4px 0;
          color: #06b6d4;
          text-transform: uppercase;
        }

        .slider-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .slider-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: #94a3b8;
        }

        .slider-item input[type="range"] {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 100px;
          background: #1e293b;
          outline: none;
        }

        .slider-item input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
          box-shadow: 0 0 6px rgba(6,182,212,0.5);
        }

        .slider-helper {
          font-size: 0.68rem;
          color: #64748b;
        }

        .color-value-badge {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          font-family: 'Fira Code', monospace;
          color: #64748b;
          border-top: 1px solid #1e293b;
          padding-top: 8px;
          margin-top: 4px;
        }

        .preset-buttons {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .preset-btn-color {
          background: #0f172a;
          border: 1px solid #1e293b;
          padding: 6px 12px;
          border-radius: 6px;
          color: #94a3b8;
          font-size: 0.75rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
        }

        .preset-btn-color:hover {
          background: #1e293b;
          color: #ffffff;
        }

        /* CONTRAST DASHBOARD */
        .contrast-score-display {
          display: flex;
          gap: 20px;
          align-items: center;
          background: #0b0f19;
          border: 1px solid #1e293b;
          border-radius: 8px;
          padding: 16px;
        }

        .score-circle {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 3px solid #06b6d4;
          background: rgba(6,182,212,0.05);
          flex-shrink: 0;
        }

        .ratio-num {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
        }

        .ratio-title {
          font-size: 0.58rem;
          color: #06b6d4;
          font-weight: 700;
          text-transform: uppercase;
        }

        .validation-checks {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.78rem;
        }

        .check-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pass-icon { color: #10b981; }
        .fail-icon { color: #ef4444; }

        .color-render-block {
          padding: 24px;
          border-radius: 8px;
          min-height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 12px;
          border: 1px solid #1e293b;
        }

        .sample-badge {
          align-self: flex-start;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          border: 1px solid;
          padding: 2px 8px;
          border-radius: 100px;
          letter-spacing: 0.05em;
        }

        .size-selector-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.8rem;
          color: #94a3b8;
        }

        .btn-pill {
          background: #0b0f19;
          border: 1px solid #1e293b;
          color: #94a3b8;
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-pill.active {
          background: #06b6d4;
          color: #0f172a;
          border-color: transparent;
        }

        /* TYPOGRAPHY */
        .select-styled {
          background: #0f172a;
          border: 1px solid #1e293b;
          color: #f8fafc;
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 0.82rem;
          outline: none;
          font-family: inherit;
        }

        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .input-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .input-col label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #94a3b8;
        }

        .typography-sandbox-block {
          background: #0b0f19;
          border: 1px solid #1e293b;
          border-radius: 8px;
          padding: 24px;
          min-height: 200px;
        }

        .code-output-card {
          border: 1px solid #1e293b;
          border-radius: 8px;
          background: #05070f;
          overflow: hidden;
        }

        .code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: #0d1222;
          border-bottom: 1px solid #1e293b;
          font-size: 0.78rem;
          font-weight: 600;
          color: #64748b;
        }

        .copy-btn {
          background: transparent;
          border: none;
          color: #06b6d4;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          font-weight: 600;
        }

        .copy-btn:hover {
          color: #22d3ee;
        }

        .green-text {
          color: #10b981;
        }

        .css-pre {
          margin: 0;
          padding: 12px;
          overflow-x: auto;
        }

        .css-pre code {
          font-family: 'Fira Code', monospace;
          font-size: 0.8rem;
          color: #38bdf8;
          line-height: 1.4;
        }

        /* UNITS VISUALIZATION */
        .parent-bounding-box {
          background: #0b0f19;
          border: 2px dashed #1e293b;
          border-radius: 8px;
          padding: 16px;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 10px;
          box-sizing: content-box;
        }

        .parent-tag {
          font-size: 0.65rem;
          background: #1e293b;
          color: #94a3b8;
          padding: 2px 6px;
          border-radius: 4px;
          align-self: flex-start;
          font-weight: 600;
        }

        .unit-row-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .unit-label-bar {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .unit-label-bar code {
          color: #ffffff;
        }

        .formula {
          font-size: 0.68rem;
          color: #64748b;
          margin-left: 4px;
        }

        .computed-val {
          color: #06b6d4;
          font-family: 'Fira Code', monospace;
        }

        .unit-visualization-bar {
          height: 10px;
          border-radius: 100px;
          position: relative;
        }

        .px-bar { background: #ef4444; }
        .rem-bar { background: #3b82f6; }
        .em-bar { background: #10b981; }
        .pct-bar { background: #f59e0b; }
        .vw-bar { background: #8b5cf6; }

        /* SHOWCASE CARD CUSTOMIZER */
        .color-preview-swatch {
          width: 100%;
          height: 24px;
          border-radius: 4px;
          border: 1px solid #1e293b;
          margin-top: 4px;
        }

        .card-customizer-preview-container {
          background: #0b0f19;
          border: 1px solid #1e293b;
          border-radius: 8px;
          padding: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .showcase-product-card {
          background: #ffffff;
          width: 100%;
          max-width: 320px;
          border: 1px solid #cbd5e1;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .showcase-product-card:hover {
          transform: translateY(var(--hover-y-offset, -4px));
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
        }

        .showcase-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          color: white;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 100px;
          z-index: 10;
        }

        .showcase-img-container img {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }

        .showcase-info {
          padding: 16px;
          color: #1e293b;
        }

        .showcase-category {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .showcase-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          margin: 4px 0 6px 0;
        }

        .showcase-desc {
          font-size: 0.78rem;
          color: #64748b;
          line-height: 1.4;
          margin: 0 0 14px 0;
        }

        .showcase-price-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 14px;
        }

        .showcase-current-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
        }

        .showcase-old-price {
          font-size: 0.85rem;
          color: #94a3b8;
          text-decoration: line-through;
        }

        .showcase-cta-btn {
          width: 100%;
          color: white;
          border: none;
          font-size: 0.8rem;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .showcase-cta-btn:hover {
          background: var(--btn-hover-bg) !important;
        }

        .showcase-cta-btn:disabled {
          background: #cbd5e1 !important;
          color: #94a3b8;
          cursor: not-allowed;
        }
      `}} />
    </div>
  );
};

export default CSSBasicsPlayground;
