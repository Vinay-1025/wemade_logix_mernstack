import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, HelpCircle, Info, Check, X, Award, GitCommit } from 'lucide-react';

const calculateSpecificity = (selector) => {
  let ids = 0;
  let classes = 0;
  let elements = 0;

  if (!selector || selector.trim() === '') {
    return { ids: 0, classes: 0, elements: 0 };
  }

  let str = selector.trim();

  const doubleColonPseudoElements = str.match(/::[a-zA-Z0-9_-]+/g);
  if (doubleColonPseudoElements) {
    elements += doubleColonPseudoElements.length;
    doubleColonPseudoElements.forEach(match => { str = str.replace(match, ' '); });
  }

  const legacyPseudo = [/:before/g, /:after/g, /:first-letter/g, /:first-line/g];
  legacyPseudo.forEach(regex => {
    const matches = str.match(regex);
    if (matches) {
      elements += matches.length;
      str = str.replace(regex, ' ');
    }
  });

  const idMatches = str.match(/#[a-zA-Z0-9_-]+/g);
  if (idMatches) {
    ids += idMatches.length;
    idMatches.forEach(match => { str = str.replace(match, ' '); });
  }

  const attrMatches = str.match(/\[[^\]]+\]/g);
  if (attrMatches) {
    classes += attrMatches.length;
    attrMatches.forEach(match => { str = str.replace(match, ' '); });
  }

  const pseudoClassMatches = str.match(/:[a-zA-Z0-9_-]+(?:\([^)]*\))?/g);
  if (pseudoClassMatches) {
    classes += pseudoClassMatches.length;
    pseudoClassMatches.forEach(match => { str = str.replace(match, ' '); });
  }

  const classMatches = str.match(/\.[a-zA-Z0-9_-]+/g);
  if (classMatches) {
    classes += classMatches.length;
    classMatches.forEach(match => { str = str.replace(match, ' '); });
  }

  str = str.replace(/[>\+~]/g, ' ');
  const tags = str.match(/[a-zA-Z0-9_-]+/g);
  if (tags) {
    const validTags = tags.filter(t => isNaN(t) && t !== 'and' && t !== 'or');
    elements += validTags.length;
  }

  return { ids, classes, elements };
};

const CSSSelectorsLab = () => {
  const [selectorText, setSelectorText] = useState('.title');
  const [selectorError, setSelectorError] = useState(null);
  const [matchedCount, setMatchedCount] = useState(0);
  const [matchedIds, setMatchedIds] = useState([]);
  const previewRef = useRef(null);

  // Challenge game state
  const [challengeStep, setChallengeStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [gameScore, setGameScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const challenges = [
    {
      question: "Which CSS rule has higher specificity to style the headline?",
      selectors: [
        { text: "#featured-card .title", score: "(1, 1, 0)", win: true },
        { text: "div.lab-card h4.title", score: "(0, 2, 2)", win: false },
        { text: "h4.title", score: "(0, 1, 1)", win: false }
      ],
      explanation: "ID selectors always beat class and tag selectors. An ID count of 1 in '#featured-card .title' gives it a score of (1,1,0), which easily overrides (0,2,2) regardless of how many classes or elements are chained."
    },
    {
      question: "Which selector targets only a button element with data-type='primary' inside the card?",
      selectors: [
        { text: ".lab-card button", score: "(0, 1, 2)", win: false },
        { text: ".lab-card button[data-type='primary']", score: "(0, 2, 2)", win: true },
        { text: "button", score: "(0, 0, 1)", win: false }
      ],
      explanation: "Attribute selectors like [data-type='primary'] carry the weight of a class selector. Combined with a class and a tag, '.lab-card button[data-type='primary']' has a specificity score of (0, 2, 2)."
    },
    {
      question: "If we have conflict between these three rules, which one overrides all others?",
      selectors: [
        { text: "div#featured-card ul li.active a", score: "(1, 1, 4)", win: true },
        { text: "div.lab-card ul li a:hover", score: "(0, 2, 4)", win: false },
        { text: "#featured-card a", score: "(1, 0, 1)", win: false }
      ],
      explanation: "Comparing 'div#featured-card ul li.active a' (1, 1, 4) with '#featured-card a' (1, 0, 1): both have 1 ID, but the first has 1 class (active) and 4 elements (div, ul, li, a), making it more specific and thus the winner!"
    }
  ];

  const selectorPresets = [
    { label: 'Tag: h4', selector: 'h4' },
    { label: 'Class: .badge', selector: '.badge' },
    { label: 'ID: #featured-card', selector: '#featured-card' },
    { label: 'Child: div.lab-card > h4', selector: 'div.lab-card > h4' },
    { label: 'Descendant: div.lab-card .highlight', selector: 'div.lab-card .highlight' },
    { label: 'Attribute: button[data-type="primary"]', selector: 'button[data-type="primary"]' },
    { label: 'Tag & Class: li.active', selector: 'li.active' },
    { label: 'Deep Mixed: div.lab-card #featured-card ul li a', selector: 'div.lab-card #featured-card ul li a' }
  ];

  // DOM tree node representation for the interactive layout
  const domNodes = [
    { id: 'featured-card', label: '#featured-card', type: 'div', depth: 0 },
    { id: 'badge', label: '.badge', type: 'div', depth: 1, parent: 'featured-card' },
    { id: 'title', label: '.title', type: 'h4', depth: 1, parent: 'featured-card' },
    { id: 'desc', label: '.desc', type: 'p', depth: 1, parent: 'featured-card' },
    { id: 'highlight', label: '.highlight', type: 'span', depth: 2, parent: 'desc' },
    { id: 'btn-group', label: '.btn-group', type: 'div', depth: 1, parent: 'featured-card' },
    { id: 'btn-primary', label: '[data-type="primary"]', type: 'button', depth: 2, parent: 'btn-group' },
    { id: 'btn-secondary', label: '[data-type="secondary"]', type: 'button', depth: 2, parent: 'btn-group' },
    { id: 'ul-list', label: 'ul', type: 'ul', depth: 1, parent: 'featured-card' },
    { id: 'li-active', label: 'li.active', type: 'li', depth: 2, parent: 'ul-list' },
    { id: 'li-active-a', label: 'a', type: 'a', depth: 3, parent: 'li-active' },
    { id: 'li-normal', label: 'li', type: 'li', depth: 2, parent: 'ul-list' },
    { id: 'li-normal-a', label: 'a', type: 'a', depth: 3, parent: 'li-normal' }
  ];

  useEffect(() => {
    if (!previewRef.current) return;
    
    const allElements = previewRef.current.querySelectorAll('*');
    allElements.forEach(el => el.classList.remove('selector-highlighted'));
    
    if (!selectorText.trim()) {
      setMatchedCount(0);
      setMatchedIds([]);
      setSelectorError(null);
      return;
    }
    
    try {
      let testSelector = selectorText;
      testSelector = testSelector.replace(/:hover/g, '');
      testSelector = testSelector.replace(/:focus/g, '');
      testSelector = testSelector.replace(/:active/g, '');
      
      const matched = previewRef.current.querySelectorAll(testSelector);
      const ids = [];
      matched.forEach(el => {
        el.classList.add('selector-highlighted');
        // Map DOM element to our visual tree ID
        if (el.id === 'featured-card') ids.push('featured-card');
        else if (el.classList.contains('badge')) ids.push('badge');
        else if (el.classList.contains('title')) ids.push('title');
        else if (el.classList.contains('desc')) ids.push('desc');
        else if (el.classList.contains('highlight')) ids.push('highlight');
        else if (el.classList.contains('btn-group')) ids.push('btn-group');
        else if (el.getAttribute('data-type') === 'primary') ids.push('btn-primary');
        else if (el.getAttribute('data-type') === 'secondary') ids.push('btn-secondary');
        else if (el.tagName === 'UL') ids.push('ul-list');
        else if (el.classList.contains('active')) {
          ids.push('li-active');
          if (el.querySelector('a')) ids.push('li-active-a');
        } else if (el.tagName === 'LI') {
          ids.push('li-normal');
          if (el.querySelector('a')) ids.push('li-normal-a');
        }
      });
      
      setMatchedIds(ids);
      setMatchedCount(matched.length);
      setSelectorError(null);
    } catch (err) {
      setSelectorError('Invalid CSS Selector');
      setMatchedCount(0);
      setMatchedIds([]);
    }
  }, [selectorText]);

  const specScore = calculateSpecificity(selectorText);

  const handleAnswerSubmit = (optionIndex) => {
    if (userAnswer !== null) return;
    setUserAnswer(optionIndex);
    const selected = challenges[challengeStep].selectors[optionIndex];
    if (selected.win) {
      setGameScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNextChallenge = () => {
    setUserAnswer(null);
    setShowExplanation(false);
    setChallengeStep(prev => (prev + 1) % challenges.length);
  };

  return (
    <div className="selector-lab-root">
      <div className="lab-grid">
        
        {/* Controls Column */}
        <div className="control-panel">
          <div className="telemetry-card">
            <div className="card-heading">
              <Target className="icon-cyan" size={20} />
              <h4>CSS Selectors & Specificity Lab</h4>
            </div>
            <p className="description">
              Select or write custom selectors. See how browser parses specificity weight scores <code>(ID, Class, Tag)</code> to resolve rule conflicts.
            </p>

            {/* Input Box */}
            <div className="input-field">
              <label htmlFor="custom-css-selector">Live Selector Editor</label>
              <input 
                id="custom-css-selector"
                type="text" 
                value={selectorText}
                onChange={(e) => setSelectorText(e.target.value)}
                placeholder="e.g. div.lab-card h4"
                className={`styled-input ${selectorError ? 'error-border' : ''}`}
              />
              {selectorError && <span className="warning-text">{selectorError}</span>}
            </div>

            {/* Score Grid */}
            <div className="specificity-grid">
              <div className="grid-cell">
                <span className="cell-value">{specScore.ids}</span>
                <span className="cell-lbl">IDs</span>
              </div>
              <div className="grid-cell">
                <span className="cell-value">{specScore.classes}</span>
                <span className="cell-lbl">Classes</span>
              </div>
              <div className="grid-cell">
                <span className="cell-value">{specScore.elements}</span>
                <span className="cell-lbl">Tags</span>
              </div>
              <div className="grid-summary-cell">
                <span className="summary-value">({specScore.ids}, {specScore.classes}, {specScore.elements})</span>
                <span className="summary-lbl">Specificity Score</span>
              </div>
            </div>

            <div className="match-tag-badge">
              <Info size={14} />
              <span>Matches {matchedCount} nodes in both DOM tree and visual preview.</span>
            </div>

            {/* Presets */}
            <div className="presets-box">
              <h5>Click Preset Examples to Load:</h5>
              <div className="preset-grid">
                {selectorPresets.map(preset => (
                  <button 
                    key={preset.label}
                    onClick={() => setSelectorText(preset.selector)}
                    className={`preset-btn-chip ${selectorText === preset.selector ? 'selected' : ''}`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Challenger Game */}
          <div className="telemetry-card game-card">
            <div className="card-heading">
              <Award className="icon-purple" size={20} />
              <h4>Specificity Arena Challenge</h4>
            </div>
            <p className="description">Compare selector priority values. Win points by selecting the rule that will override the others.</p>
            
            <div className="game-box">
              <span className="game-telemetry">Challenge {challengeStep + 1} of {challenges.length} | Score: {gameScore}</span>
              <h5 className="question-text">{challenges[challengeStep].question}</h5>
              
              <div className="options-grid">
                {challenges[challengeStep].selectors.map((sel, idx) => {
                  let statusClass = '';
                  if (userAnswer !== null) {
                    if (sel.win) statusClass = 'correct';
                    else if (userAnswer === idx) statusClass = 'wrong';
                    else statusClass = 'disabled';
                  }

                  return (
                    <button 
                      key={sel.text}
                      onClick={() => handleAnswerSubmit(idx)}
                      className={`option-btn ${statusClass}`}
                      disabled={userAnswer !== null}
                    >
                      <div className="option-info">
                        <span className="option-selector">{sel.text}</span>
                        <span className="option-spec">Weight: {sel.score}</span>
                      </div>
                      {userAnswer !== null && sel.win && <Check size={16} className="pass-text" />}
                      {userAnswer === idx && !sel.win && <X size={16} className="fail-text" />}
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <div className="explanation-bubble">
                  <p>{challenges[challengeStep].explanation}</p>
                  <button onClick={handleNextChallenge} className="next-challenge-btn">
                    Next Challenge
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Outputs Column */}
        <div className="preview-panel">
          {/* Graphical DOM Tree */}
          <div className="telemetry-card dom-tree-card">
            <div className="card-heading">
              <GitCommit className="icon-cyan" size={20} />
              <h4>Interactive DOM Tree Map</h4>
            </div>
            <p className="description">Graphical schema of nodes inside the card. Glowing nodes show active selector matches.</p>

            <div className="tree-container">
              {domNodes.map(node => {
                const isMatched = matchedIds.includes(node.id);
                return (
                  <div 
                    key={node.id} 
                    className={`tree-node ${isMatched ? 'node-matched' : ''}`}
                    style={{ marginLeft: `${node.depth * 24}px` }}
                    onClick={() => {
                      // Construct a reasonable selector for this node
                      if (node.id === 'featured-card') setSelectorText('#featured-card');
                      else if (node.id === 'badge') setSelectorText('#featured-card .badge');
                      else if (node.id === 'title') setSelectorText('.title');
                      else if (node.id === 'desc') setSelectorText('.desc');
                      else if (node.id === 'highlight') setSelectorText('.desc .highlight');
                      else if (node.id === 'btn-group') setSelectorText('.btn-group');
                      else if (node.id === 'btn-primary') setSelectorText('button[data-type="primary"]');
                      else if (node.id === 'btn-secondary') setSelectorText('button[data-type="secondary"]');
                      else if (node.id === 'ul-list') setSelectorText('#featured-card ul');
                      else if (node.id === 'li-active') setSelectorText('li.active');
                      else if (node.id === 'li-active-a') setSelectorText('li.active a');
                      else if (node.id === 'li-normal') setSelectorText('ul li:not(.active)');
                      else if (node.id === 'li-normal-a') setSelectorText('ul li:not(.active) a');
                    }}
                  >
                    <span className="node-type">&lt;{node.type}&gt;</span>
                    <span className="node-label">{node.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Render Preview */}
          <div className="telemetry-card preview-card">
            <div className="card-heading">
              <Target className="icon-cyan" size={20} />
              <h4>Live DOM Render Sandbox</h4>
            </div>
            <p className="description">Live compiled output. Target elements will glow with cyan matching borders.</p>

            <div className="sandbox-wrapper" ref={previewRef}>
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
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .selector-lab-root {
          font-family: 'Outfit', 'Inter', sans-serif;
          color: #f8fafc;
        }

        .lab-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
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

        .card-heading h4 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .icon-cyan { color: #06b6d4; }
        .icon-purple { color: #8b5cf6; }

        .description {
          font-size: 0.8rem;
          color: #94a3b8;
          line-height: 1.5;
          margin: 0 0 16px 0;
        }

        .input-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }

        .input-field label {
          font-size: 0.78rem;
          font-weight: 600;
          color: #94a3b8;
        }

        .styled-input {
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 6px;
          padding: 10px 14px;
          color: #f8fafc;
          font-family: 'Fira Code', monospace;
          font-size: 0.82rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .styled-input:focus {
          border-color: #06b6d4;
        }

        .error-border {
          border-color: #ef4444 !important;
        }

        .warning-text {
          font-size: 0.72rem;
          color: #ef4444;
          margin-top: 4px;
        }

        .specificity-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr) 1.2fr;
          background: #0b0f19;
          border: 1px solid #1e293b;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .grid-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10px;
          border-right: 1px solid #1e293b;
        }

        .cell-value {
          font-size: 1.15rem;
          font-weight: 700;
          color: #06b6d4;
        }

        .cell-lbl {
          font-size: 0.65rem;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
        }

        .grid-summary-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10px;
          background: rgba(6, 182, 212, 0.08);
        }

        .summary-value {
          font-size: 0.95rem;
          font-family: 'Fira Code', monospace;
          font-weight: 700;
          color: #ffffff;
        }

        .summary-lbl {
          font-size: 0.62rem;
          color: #06b6d4;
          font-weight: 700;
          text-transform: uppercase;
        }

        .match-tag-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(6, 182, 212, 0.04);
          border-left: 3px solid #06b6d4;
          border-radius: 4px;
          font-size: 0.75rem;
          color: #e2e8f0;
          margin-bottom: 16px;
        }

        .presets-box h5 {
          font-size: 0.78rem;
          font-weight: 600;
          color: #94a3b8;
          margin: 0 0 8px 0;
        }

        .preset-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .preset-btn-chip {
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

        .preset-btn-chip:hover {
          color: #ffffff;
          border-color: #64748b;
        }

        .preset-btn-chip.selected {
          background: #06b6d4;
          color: #0f172a;
          border-color: transparent;
          font-weight: 600;
        }

        /* Challenger Game Styles */
        .game-box {
          background: #0b0f19;
          border: 1px solid #1e293b;
          border-radius: 8px;
          padding: 14px;
        }

        .game-telemetry {
          font-size: 0.68rem;
          font-weight: 700;
          color: #8b5cf6;
          text-transform: uppercase;
          display: block;
          margin-bottom: 8px;
        }

        .question-text {
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.4;
          margin: 0 0 12px 0;
        }

        .options-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .option-btn {
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 6px;
          padding: 10px 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .option-btn:hover:not(:disabled) {
          border-color: #8b5cf6;
          background: rgba(139, 92, 246, 0.05);
        }

        .option-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .option-selector {
          font-size: 0.8rem;
          font-family: 'Fira Code', monospace;
          color: #ffffff;
        }

        .option-spec {
          font-size: 0.68rem;
          color: #64748b;
        }

        .option-btn.correct {
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.1);
        }

        .option-btn.wrong {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        .option-btn.disabled {
          opacity: 0.5;
        }

        .explanation-bubble {
          margin-top: 14px;
          padding: 10px 12px;
          background: rgba(139, 92, 246, 0.08);
          border-left: 3px solid #8b5cf6;
          border-radius: 4px;
          font-size: 0.78rem;
          color: #cbd5e1;
          line-height: 1.4;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .explanation-bubble p { margin: 0; }

        .next-challenge-btn {
          align-self: flex-end;
          background: #8b5cf6;
          color: white;
          border: none;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .next-challenge-btn:hover {
          background: #7c3aed;
        }

        /* DOM Tree Styles */
        .tree-container {
          background: #0b0f19;
          border: 1px solid #1e293b;
          border-radius: 8px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-height: 250px;
          overflow-y: auto;
        }

        .tree-node {
          padding: 4px 8px;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          font-size: 0.72rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
          border: 1px solid transparent;
          transition: all 0.2s;
        }

        .tree-node:hover {
          background: rgba(255, 255, 255, 0.03);
          border-color: #334155;
        }

        .node-type {
          color: #f43f5e;
        }

        .node-label {
          color: #e2e8f0;
        }

        .tree-node.node-matched {
          background: rgba(6, 182, 212, 0.15) !important;
          border-color: #06b6d4;
          box-shadow: 0 0 8px rgba(6, 182, 212, 0.2);
        }

        /* Sandbox Sandbox Visualizer */
        .sandbox-wrapper {
          background: #0b0f19;
          border: 1px solid #1e293b;
          border-radius: 8px;
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 220px;
        }

        .lab-card {
          background: #ffffff;
          color: #1e293b;
          width: 100%;
          max-width: 290px;
          padding: 14px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border: 1px solid #cbd5e1;
        }

        .lab-card .badge {
          display: inline-block;
          background: #ef4444;
          color: white;
          font-size: 0.62rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 100px;
          margin-bottom: 6px;
        }

        .lab-card h4 {
          font-size: 0.88rem;
          font-weight: 700;
          margin: 0 0 4px 0;
          color: #0f172a;
        }

        .lab-card .desc {
          font-size: 0.75rem;
          color: #475569;
          line-height: 1.4;
          margin: 0 0 10px 0;
        }

        .lab-card .highlight {
          background: #fef08a;
          color: #854d0e;
          padding: 0 2px;
          border-radius: 2px;
          font-weight: 600;
        }

        .lab-card .btn-group {
          display: flex;
          gap: 6px;
          margin-bottom: 10px;
        }

        .lab-card .btn {
          flex: 1;
          padding: 5px;
          font-size: 0.68rem;
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
          padding-left: 14px;
          font-size: 0.68rem;
          color: #475569;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .lab-card li.active a {
          color: #2563eb;
          font-weight: 600;
        }

        .lab-card a {
          color: #475569;
          text-decoration: none;
        }

        /* Matched styling override */
        .selector-highlighted {
          outline: 2px dashed #06b6d4 !important;
          outline-offset: 3px;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.4) !important;
          background-color: rgba(6, 182, 212, 0.08) !important;
        }

        .pass-text { color: #10b981; }
        .fail-text { color: #ef4444; }
      `}} />
    </div>
  );
};

export default CSSSelectorsLab;
