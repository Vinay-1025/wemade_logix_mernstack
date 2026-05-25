import React, { useState } from 'react';
import { Sliders, RefreshCw, Copy, Info, Play, Eye } from 'lucide-react';

const CSSAnimationsPlayground = () => {
  const [activeTab, setActiveTab] = useState('transition'); // 'transition' or 'animation'

  // Transition States
  const [transProp, setTransProp] = useState('all');
  const [transDuration, setTransDuration] = useState('0.5s');
  const [transTiming, setTransTiming] = useState('ease-in-out');

  // Animation States
  const [animPreset, setAnimPreset] = useState('bounce');
  const [animDuration, setAnimDuration] = useState('1s');
  const [animTiming, setAnimTiming] = useState('ease');
  const [animIteration, setAnimIteration] = useState('infinite');
  const [animDirection, setAnimDirection] = useState('normal');
  const [animPlaying, setAnimPlaying] = useState(true);

  const [copied, setCopied] = useState(false);

  const triggerAnimation = () => {
    setAnimPlaying(false);
    setTimeout(() => setAnimPlaying(true), 50);
  };

  const getTransitionCSS = () => {
    return `.transition-box {
  background-color: var(--brand-primary);
  border-radius: 8px;
  transform: scale(1);
  transition-property: ${transProp};
  transition-duration: ${transDuration};
  transition-timing-function: ${transTiming};
}

.transition-box:hover {
  background-color: var(--primary-cyan);
  border-radius: 50%;
  transform: scale(1.25) rotate(45deg);
}`;
  };

  const getAnimationCSS = () => {
    const keyframes = {
      bounce: `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
}`,
      spin: `@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`,
      pulse: `@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
}`,
      slide: `@keyframes slide {
  0% { transform: translateX(-40px); }
  50% { transform: translateX(40px); }
  100% { transform: translateX(-40px); }
}`
    };

    return `.animated-box {
  animation-name: ${animPreset};
  animation-duration: ${animDuration};
  animation-timing-function: ${animTiming};
  animation-iteration-count: ${animIteration};
  animation-direction: ${animDirection};
  animation-play-state: ${animPlaying ? 'running' : 'paused'};
}

${keyframes[animPreset] || ''}`;
  };

  const copyCSS = () => {
    const cssText = activeTab === 'transition' ? getTransitionCSS() : getAnimationCSS();
    navigator.clipboard.writeText(cssText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="anim-playground-root">
      <div className="mode-toggle-bar">
        <button 
          className={`mode-btn ${activeTab === 'transition' ? 'active' : ''}`}
          onClick={() => setActiveTab('transition')}
        >
          CSS Transitions
        </button>
        <button 
          className={`mode-btn ${activeTab === 'animation' ? 'active' : ''}`}
          onClick={() => setActiveTab('animation')}
        >
          CSS Keyframe Animations
        </button>
      </div>

      <div className="lab-grid">
        {/* Controls Column */}
        <div className="controls-panel">
          <div className="telemetry-card">
            <div className="card-heading">
              <Sliders className="icon-purple" size={20} />
              <h4>{activeTab === 'transition' ? 'Transition Settings' : 'Keyframe Settings'}</h4>
            </div>

            {activeTab === 'transition' ? (
              <div className="bg-panel">
                <div className="control-row">
                  <span className="control-lbl">transition-property</span>
                  <select 
                    className="select-styled" 
                    value={transProp}
                    onChange={(e) => setTransProp(e.target.value)}
                  >
                    <option value="all">all</option>
                    <option value="background-color">background-color</option>
                    <option value="transform">transform</option>
                    <option value="border-radius">border-radius</option>
                  </select>
                </div>

                <div className="control-row">
                  <span className="control-lbl">transition-duration</span>
                  <select 
                    className="select-styled" 
                    value={transDuration}
                    onChange={(e) => setTransDuration(e.target.value)}
                  >
                    <option value="0.2s">0.2s (Fast)</option>
                    <option value="0.5s">0.5s (Medium)</option>
                    <option value="1s">1.0s (Slow)</option>
                    <option value="2.0s">2.0s (Very Slow)</option>
                  </select>
                </div>

                <div className="control-row">
                  <span className="control-lbl">transition-timing-function</span>
                  <select 
                    className="select-styled" 
                    value={transTiming}
                    onChange={(e) => setTransTiming(e.target.value)}
                  >
                    <option value="ease">ease</option>
                    <option value="linear">linear</option>
                    <option value="ease-in">ease-in</option>
                    <option value="ease-out">ease-out</option>
                    <option value="ease-in-out">ease-in-out</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="bg-panel">
                <div className="control-row">
                  <span className="control-lbl">animation-name</span>
                  <select 
                    className="select-styled" 
                    value={animPreset}
                    onChange={(e) => setAnimPreset(e.target.value)}
                  >
                    <option value="bounce">bounce</option>
                    <option value="spin">spin</option>
                    <option value="pulse">pulse</option>
                    <option value="slide">slide</option>
                  </select>
                </div>

                <div className="control-row">
                  <span className="control-lbl">animation-duration</span>
                  <select 
                    className="select-styled" 
                    value={animDuration}
                    onChange={(e) => setAnimDuration(e.target.value)}
                  >
                    <option value="0.5s">0.5s</option>
                    <option value="1s">1s</option>
                    <option value="2s">2s</option>
                    <option value="4s">4s</option>
                  </select>
                </div>

                <div className="control-row">
                  <span className="control-lbl">animation-timing-function</span>
                  <select 
                    className="select-styled" 
                    value={animTiming}
                    onChange={(e) => setAnimTiming(e.target.value)}
                  >
                    <option value="ease">ease</option>
                    <option value="linear">linear</option>
                    <option value="ease-in-out">ease-in-out</option>
                  </select>
                </div>

                <div className="control-row">
                  <span className="control-lbl">animation-iteration-count</span>
                  <select 
                    className="select-styled" 
                    value={animIteration}
                    onChange={(e) => setAnimIteration(e.target.value)}
                  >
                    <option value="infinite">infinite</option>
                    <option value="1">1</option>
                    <option value="3">3</option>
                  </select>
                </div>

                <div className="control-row">
                  <span className="control-lbl">animation-direction</span>
                  <select 
                    className="select-styled" 
                    value={animDirection}
                    onChange={(e) => setAnimDirection(e.target.value)}
                  >
                    <option value="normal">normal</option>
                    <option value="alternate">alternate</option>
                    <option value="reverse">reverse</option>
                  </select>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              {activeTab === 'animation' && (
                <button className="reset-btn" onClick={triggerAnimation}>
                  <Play size={14} style={{ marginRight: '6px' }} /> Re-trigger
                </button>
              )}
              <button className="copy-btn" onClick={copyCSS} style={{ flexGrow: 1 }}>
                <Copy size={14} style={{ marginRight: '6px' }} /> {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>
        </div>

        {/* Viewport Simulation Column */}
        <div className="preview-panel">
          <div className="telemetry-card simulator-card">
            <div className="card-heading">
              <Eye className="icon-cyan" size={20} />
              <h4>Preview Workspace</h4>
            </div>
            <p className="description">
              {activeTab === 'transition' 
                ? 'Hover your mouse cursor over the card container below to trigger the transitions.'
                : 'Watch the keyframe animation cycle run. Toggle settings to see variations.'
              }
            </p>

            <div className="anim-canvas">
              {activeTab === 'transition' ? (
                <div 
                  className="interactive-transition-card"
                  style={{
                    transitionProperty: transProp,
                    transitionDuration: transDuration,
                    transitionTimingFunction: transTiming
                  }}
                >
                  <span className="card-txt">HOVER ME</span>
                </div>
              ) : (
                <div 
                  className={`interactive-animation-card ${animPlaying ? `anim-${animPreset}` : ''}`}
                  style={{
                    animationDuration: animDuration,
                    animationTimingFunction: animTiming,
                    animationIterationCount: animIteration,
                    animationDirection: animDirection,
                  }}
                >
                  <span className="card-txt">ANIMATED</span>
                </div>
              )}
            </div>
          </div>

          {/* Generated Code */}
          <div className="telemetry-card">
            <div className="card-heading">
              <Info className="icon-cyan" size={20} />
              <h4>CSS Output</h4>
            </div>
            <pre className="css-pre">
              <code>
                {activeTab === 'transition' ? (
                  <>
                    <span className="green-text">.transition-card</span> {'{\n'}
                    {'  '}background-color: <span className="text-cyan">hsl(220, 95%, 50%)</span>;{'\n'}
                    {'  '}border-radius: <span className="text-cyan">8px</span>;{'\n'}
                    {'  '}transform: <span className="text-cyan">scale(1)</span>;{'\n'}
                    {'  '}transition-property: <span className="text-purple">{transProp}</span>;{'\n'}
                    {'  '}transition-duration: <span className="text-purple">{transDuration}</span>;{'\n'}
                    {'  '}transition-timing-function: <span className="text-purple">{transTiming}</span>;{'\n'}
                    {'}\n\n'}
                    <span className="green-text">.transition-card:hover</span> {'{\n'}
                    {'  '}background-color: <span className="text-cyan">hsl(180, 100%, 41%)</span>;{'\n'}
                    {'  '}border-radius: <span className="text-cyan">50%</span>;{'\n'}
                    {'  '}transform: <span className="text-cyan">scale(1.2) rotate(45deg)</span>;{'\n'}
                    {'}'}
                  </>
                ) : (
                  <>
                    <span className="green-text">.animated-card</span> {'{\n'}
                    {'  '}animation-name: <span className="text-purple">{animPreset}</span>;{'\n'}
                    {'  '}animation-duration: <span className="text-purple">{animDuration}</span>;{'\n'}
                    {'  '}animation-timing-function: <span className="text-purple">{animTiming}</span>;{'\n'}
                    {'  '}animation-iteration-count: <span className="text-purple">{animIteration}</span>;{'\n'}
                    {'  '}animation-direction: <span className="text-purple">{animDirection}</span>;{'\n'}
                    {'}\n\n'}
                    <span className="green-text">@keyframes {animPreset}</span> {'{\n'}
                    {animPreset === 'bounce' && (
                      <>
                        {'  '}0%, 100% {'{'} transform: translateY(0); {'}\n'}
                        {'  '}50% {'{'} transform: translateY(-30px); {'}\n'}
                      </>
                    )}
                    {animPreset === 'spin' && (
                      <>
                        {'  '}0% {'{'} transform: rotate(0deg); {'}\n'}
                        {'  '}100% {'{'} transform: rotate(360deg); {'}\n'}
                      </>
                    )}
                    {animPreset === 'pulse' && (
                      <>
                        {'  '}0%, 100% {'{'} transform: scale(1); opacity: 1; {'}\n'}
                        {'  '}50% {'{'} transform: scale(1.15); opacity: 0.8; {'}\n'}
                      </>
                    )}
                    {animPreset === 'slide' && (
                      <>
                        {'  '}0% {'{'} transform: translateX(-40px); {'}\n'}
                        {'  '}50% {'{'} transform: translateX(40px); {'}\n'}
                        {'  '}100% {'{'} transform: translateX(-40px); {'}\n'}
                      </>
                    )}
                    {'}'}
                  </>
                )}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .anim-playground-root {
          font-family: 'Outfit', 'Inter', sans-serif;
          color: var(--app-text);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .mode-toggle-bar {
          display: flex;
          gap: 12px;
          border-bottom: 2px solid var(--app-border);
          padding-bottom: 12px;
        }

        .mode-btn {
          flex: 1;
          background: var(--app-sidebar-bg);
          border: 1px solid var(--app-border);
          color: var(--app-text-muted);
          padding: 12px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }

        .mode-btn:hover {
          background: rgba(0, 209, 209, 0.05);
          color: var(--primary-cyan);
          border-color: var(--primary-cyan);
        }

        .mode-btn.active {
          background: var(--primary-cyan);
          color: #0f172a;
          border-color: var(--primary-cyan);
        }

        .lab-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          align-items: start;
        }

        @media (max-width: 900px) {
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
          background: var(--app-card-bg);
          border: 1px solid var(--app-border);
          border-radius: 12px;
          padding: 20px;
          box-shadow: var(--shadow-sm);
        }

        .card-heading {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .card-heading h4 {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--app-text);
          margin: 0;
        }

        .icon-purple { color: #a78bfa; }
        .icon-cyan { color: var(--primary-cyan); }

        .description {
          font-size: 0.8rem;
          color: var(--app-text-muted);
          line-height: 1.5;
          margin: 0 0 16px 0;
        }

        .bg-panel {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--app-border);
          border-radius: 8px;
          padding: 14px;
        }

        .control-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .control-lbl {
          font-size: 0.78rem;
          color: var(--app-text-muted);
          font-family: monospace;
        }

        .select-styled {
          background: var(--app-bg);
          border: 1px solid var(--app-border);
          color: var(--app-text);
          font-size: 0.8rem;
          padding: 6px 12px;
          border-radius: 6px;
          outline: none;
          min-width: 145px;
          cursor: pointer;
        }

        .reset-btn {
          background: transparent;
          border: 1px solid var(--app-border);
          padding: 8px 12px;
          border-radius: 6px;
          color: var(--app-text-muted);
          font-size: 0.75rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .reset-btn:hover {
          color: var(--app-text);
          border-color: var(--app-text-muted);
        }

        .copy-btn {
          background: var(--primary-cyan);
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          color: #0f172a;
          font-size: 0.75rem;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .copy-btn:hover {
          opacity: 0.9;
        }

        .anim-canvas {
          background: rgba(0, 0, 0, 0.15);
          border: 2px dashed var(--app-border);
          border-radius: 12px;
          padding: 16px;
          min-height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .interactive-transition-card {
          width: 100px;
          height: 100px;
          background-color: var(--brand-primary, #3b82f6);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.25);
          transform: scale(1) rotate(0deg);
        }

        .interactive-transition-card:hover {
          background-color: var(--primary-cyan, #06b6d4);
          border-radius: 50%;
          transform: scale(1.2) rotate(45deg);
        }

        .interactive-animation-card {
          width: 100px;
          height: 100px;
          background-color: var(--brand-hover, #1d4ed8);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          box-shadow: 0 4px 15px rgba(0,0,0,0.25);
        }

        .card-txt {
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          font-weight: 800;
        }

        /* Preconfigured animation keyframes */
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.8; }
        }

        @keyframes slide {
          0% { transform: translateX(-40px); }
          50% { transform: translateX(40px); }
          100% { transform: translateX(-40px); }
        }

        .anim-bounce { animation-name: bounce; }
        .anim-spin { animation-name: spin; }
        .anim-pulse { animation-name: pulse; }
        .anim-slide { animation-name: slide; }

        .css-pre {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid var(--app-border);
          border-radius: 8px;
          padding: 12px;
          overflow-x: auto;
          margin: 0;
        }

        .css-pre code {
          font-family: 'Fira Code', monospace;
          font-size: 0.75rem;
        }

        .green-text { color: var(--primary-cyan); font-weight: 600; }
        .text-cyan { color: #38bdf8; }
        .text-purple { color: #c084fc; }
      `}} />
    </div>
  );
};

export default CSSAnimationsPlayground;
