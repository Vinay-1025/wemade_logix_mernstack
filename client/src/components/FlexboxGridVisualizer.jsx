import React, { useState } from 'react';
import { Sliders, RefreshCw, Copy, Info, Layout, Grid, Eye } from 'lucide-react';

const FlexboxGridVisualizer = () => {
  const [mode, setMode] = useState('flex'); // 'flex' or 'grid'

  // Flexbox Parent States
  const [flexDirection, setFlexDirection] = useState('row');
  const [justifyContent, setJustifyContent] = useState('center');
  const [alignItems, setAlignItems] = useState('center');
  const [flexWrap, setFlexWrap] = useState('nowrap');
  const [flexGap, setFlexGap] = useState(16);

  // Grid Parent States
  const [gridCols, setGridCols] = useState('repeat(3, 1fr)');
  const [justifyItems, setJustifyItems] = useState('stretch');
  const [alignContentItems, setAlignContentItems] = useState('stretch');
  const [gridGap, setGridGap] = useState(16);

  // Children configuration state
  const [selectedChild, setSelectedChild] = useState(1); // 1-indexed
  const [childProps, setChildProps] = useState({
    1: { flexGrow: 0, flexShrink: 1, gridColumn: 'auto', gridRow: 'auto', alignSelf: 'auto' },
    2: { flexGrow: 0, flexShrink: 1, gridColumn: 'auto', gridRow: 'auto', alignSelf: 'auto' },
    3: { flexGrow: 0, flexShrink: 1, gridColumn: 'auto', gridRow: 'auto', alignSelf: 'auto' },
    4: { flexGrow: 0, flexShrink: 1, gridColumn: 'auto', gridRow: 'auto', alignSelf: 'auto' },
    5: { flexGrow: 0, flexShrink: 1, gridColumn: 'auto', gridRow: 'auto', alignSelf: 'auto' },
    6: { flexGrow: 0, flexShrink: 1, gridColumn: 'auto', gridRow: 'auto', alignSelf: 'auto' }
  });

  const [copied, setCopied] = useState(false);

  const resetAll = () => {
    setFlexDirection('row');
    setJustifyContent('center');
    setAlignItems('center');
    setFlexWrap('nowrap');
    setFlexGap(16);

    setGridCols('repeat(3, 1fr)');
    setJustifyItems('stretch');
    setAlignContentItems('stretch');
    setGridGap(16);

    setSelectedChild(1);
    setChildProps({
      1: { flexGrow: 0, flexShrink: 1, gridColumn: 'auto', gridRow: 'auto', alignSelf: 'auto' },
      2: { flexGrow: 0, flexShrink: 1, gridColumn: 'auto', gridRow: 'auto', alignSelf: 'auto' },
      3: { flexGrow: 0, flexShrink: 1, gridColumn: 'auto', gridRow: 'auto', alignSelf: 'auto' },
      4: { flexGrow: 0, flexShrink: 1, gridColumn: 'auto', gridRow: 'auto', alignSelf: 'auto' },
      5: { flexGrow: 0, flexShrink: 1, gridColumn: 'auto', gridRow: 'auto', alignSelf: 'auto' },
      6: { flexGrow: 0, flexShrink: 1, gridColumn: 'auto', gridRow: 'auto', alignSelf: 'auto' }
    });
  };

  const updateChildProp = (propName, val) => {
    setChildProps(prev => ({
      ...prev,
      [selectedChild]: {
        ...prev[selectedChild],
        [propName]: val
      }
    }));
  };

  const getContainerCSS = () => {
    if (mode === 'flex') {
      return `.flex-container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${flexGap}px;
}`;
    } else {
      return `.grid-container {
  display: grid;
  grid-template-columns: ${gridCols};
  justify-items: ${justifyItems};
  align-items: ${alignContentItems};
  gap: ${gridGap}px;
}`;
    }
  };

  const getSelectedChildCSS = () => {
    const props = childProps[selectedChild];
    if (mode === 'flex') {
      return `.flex-item-${selectedChild} {
  flex-grow: ${props.flexGrow};
  flex-shrink: ${props.flexShrink};
  align-self: ${props.alignSelf};
}`;
    } else {
      return `.grid-item-${selectedChild} {
  grid-column: ${props.gridColumn};
  grid-row: ${props.gridRow};
  align-self: ${props.alignSelf};
}`;
    }
  };

  const copyCSS = () => {
    const cssText = `/* Parent Container */\n${getContainerCSS()}\n\n/* Selected Child Element */\n${getSelectedChildCSS()}`;
    navigator.clipboard.writeText(cssText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="layout-visualizer-root">
      {/* Mode Selector Toggle */}
      <div className="mode-toggle-bar">
        <button 
          className={`mode-btn ${mode === 'flex' ? 'active' : ''}`}
          onClick={() => setMode('flex')}
        >
          <Layout size={16} /> Flexbox Mode
        </button>
        <button 
          className={`mode-btn ${mode === 'grid' ? 'active' : ''}`}
          onClick={() => setMode('grid')}
        >
          <Grid size={16} /> CSS Grid Mode
        </button>
      </div>

      <div className="lab-grid">
        {/* Controls Column */}
        <div className="controls-panel">
          <div className="telemetry-card">
            <div className="card-heading">
              <Sliders className="icon-purple" size={20} />
              <h4>Parent Settings ({mode === 'flex' ? 'flex-container' : 'grid-container'})</h4>
            </div>

            {mode === 'flex' ? (
              <div className="bg-panel">
                <div className="control-row">
                  <span className="control-lbl">flex-direction</span>
                  <select 
                    className="select-styled" 
                    value={flexDirection}
                    onChange={(e) => setFlexDirection(e.target.value)}
                  >
                    <option value="row">row</option>
                    <option value="row-reverse">row-reverse</option>
                    <option value="column">column</option>
                    <option value="column-reverse">column-reverse</option>
                  </select>
                </div>
                
                <div className="control-row">
                  <span className="control-lbl">justify-content</span>
                  <select 
                    className="select-styled" 
                    value={justifyContent}
                    onChange={(e) => setJustifyContent(e.target.value)}
                  >
                    <option value="flex-start">flex-start</option>
                    <option value="flex-end">flex-end</option>
                    <option value="center">center</option>
                    <option value="space-between">space-between</option>
                    <option value="space-around">space-around</option>
                    <option value="space-evenly">space-evenly</option>
                  </select>
                </div>

                <div className="control-row">
                  <span className="control-lbl">align-items</span>
                  <select 
                    className="select-styled" 
                    value={alignItems}
                    onChange={(e) => setAlignItems(e.target.value)}
                  >
                    <option value="flex-start">flex-start</option>
                    <option value="flex-end">flex-end</option>
                    <option value="center">center</option>
                    <option value="stretch">stretch</option>
                    <option value="baseline">baseline</option>
                  </select>
                </div>

                <div className="control-row">
                  <span className="control-lbl">flex-wrap</span>
                  <select 
                    className="select-styled" 
                    value={flexWrap}
                    onChange={(e) => setFlexWrap(e.target.value)}
                  >
                    <option value="nowrap">nowrap</option>
                    <option value="wrap">wrap</option>
                    <option value="wrap-reverse">wrap-reverse</option>
                  </select>
                </div>

                <div className="slide-row">
                  <div className="flex-lbl-row">
                    <span className="control-lbl">gap</span>
                    <span className="val-lbl">{flexGap}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="48"
                    step="4"
                    value={flexGap}
                    onChange={(e) => setFlexGap(parseInt(e.target.value))}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-panel">
                <div className="control-row">
                  <span className="control-lbl">grid-template-columns</span>
                  <select 
                    className="select-styled" 
                    value={gridCols}
                    onChange={(e) => setGridCols(e.target.value)}
                  >
                    <option value="repeat(3, 1fr)">repeat(3, 1fr)</option>
                    <option value="1fr 2fr 1fr">1fr 2fr 1fr</option>
                    <option value="150px 1fr">150px 1fr</option>
                    <option value="repeat(auto-fit, minmax(100px, 1fr))">repeat(auto-fit, minmax(100px, 1fr))</option>
                  </select>
                </div>

                <div className="control-row">
                  <span className="control-lbl">justify-items</span>
                  <select 
                    className="select-styled" 
                    value={justifyItems}
                    onChange={(e) => setJustifyItems(e.target.value)}
                  >
                    <option value="stretch">stretch</option>
                    <option value="start">start</option>
                    <option value="end">end</option>
                    <option value="center">center</option>
                  </select>
                </div>

                <div className="control-row">
                  <span className="control-lbl">align-items</span>
                  <select 
                    className="select-styled" 
                    value={alignContentItems}
                    onChange={(e) => setAlignContentItems(e.target.value)}
                  >
                    <option value="stretch">stretch</option>
                    <option value="start">start</option>
                    <option value="end">end</option>
                    <option value="center">center</option>
                  </select>
                </div>

                <div className="slide-row">
                  <div className="flex-lbl-row">
                    <span className="control-lbl">gap</span>
                    <span className="val-lbl">{gridGap}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="48"
                    step="4"
                    value={gridGap}
                    onChange={(e) => setGridGap(parseInt(e.target.value))}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Child Specific Settings */}
          <div className="telemetry-card">
            <div className="card-heading">
              <Sliders className="icon-cyan" size={20} />
              <h4>Child settings (item-{selectedChild})</h4>
            </div>

            <div className="child-selector-grid">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <button
                  key={num}
                  className={`child-pick-btn ${selectedChild === num ? 'active' : ''}`}
                  onClick={() => setSelectedChild(num)}
                >
                  Item {num}
                </button>
              ))}
            </div>

            <div className="bg-panel">
              {mode === 'flex' ? (
                <>
                  <div className="control-row">
                    <span className="control-lbl">flex-grow</span>
                    <select 
                      className="select-styled" 
                      value={childProps[selectedChild].flexGrow}
                      onChange={(e) => updateChildProp('flexGrow', parseInt(e.target.value))}
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>

                  <div className="control-row">
                    <span className="control-lbl">flex-shrink</span>
                    <select 
                      className="select-styled" 
                      value={childProps[selectedChild].flexShrink}
                      onChange={(e) => updateChildProp('flexShrink', parseInt(e.target.value))}
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="control-row">
                    <span className="control-lbl">grid-column</span>
                    <select 
                      className="select-styled" 
                      value={childProps[selectedChild].gridColumn}
                      onChange={(e) => updateChildProp('gridColumn', e.target.value)}
                    >
                      <option value="auto">auto</option>
                      <option value="span 2">span 2</option>
                      <option value="span 3">span 3</option>
                      <option value="1 / 3">1 / 3</option>
                      <option value="2 / 4">2 / 4</option>
                    </select>
                  </div>

                  <div className="control-row">
                    <span className="control-lbl">grid-row</span>
                    <select 
                      className="select-styled" 
                      value={childProps[selectedChild].gridRow}
                      onChange={(e) => updateChildProp('gridRow', e.target.value)}
                    >
                      <option value="auto">auto</option>
                      <option value="span 2">span 2</option>
                      <option value="1 / 3">1 / 3</option>
                    </select>
                  </div>
                </>
              )}

              <div className="control-row">
                <span className="control-lbl">align-self</span>
                <select 
                  className="select-styled" 
                  value={childProps[selectedChild].alignSelf}
                  onChange={(e) => updateChildProp('alignSelf', e.target.value)}
                >
                  <option value="auto">auto</option>
                  <option value="stretch">stretch</option>
                  <option value="center">center</option>
                  <option value="start">start</option>
                  <option value="end">end</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <button className="reset-btn" onClick={resetAll}>
                <RefreshCw size={14} style={{ marginRight: '6px' }} /> Reset
              </button>
              <button className="copy-btn" onClick={copyCSS} style={{ flexGrow: 1 }}>
                <Copy size={14} style={{ marginRight: '6px' }} /> {copied ? 'Copied!' : 'Copy Rules'}
              </button>
            </div>
          </div>
        </div>

        {/* Preview Panel Column */}
        <div className="preview-panel">
          <div className="telemetry-card simulator-card">
            <div className="card-heading">
              <Eye className="icon-cyan" size={20} />
              <h4>Layout Preview Workspace</h4>
            </div>
            <p className="description">
              Observe how the boxes align. Click on any item below to edit its item-specific child styling rules.
            </p>

            <div className="layout-canvas">
              <div 
                className={`layout-container-preview ${mode === 'flex' ? 'flex-preview-box' : 'grid-preview-box'}`}
                style={
                  mode === 'flex' ? {
                    display: 'flex',
                    flexDirection: flexDirection,
                    justifyContent: justifyContent,
                    alignItems: alignItems,
                    flexWrap: flexWrap,
                    gap: `${flexGap}px`,
                  } : {
                    display: 'grid',
                    gridTemplateColumns: gridCols,
                    justifyItems: justifyItems,
                    alignItems: alignContentItems,
                    gap: `${gridGap}px`,
                  }
                }
              >
                {[1, 2, 3, 4, 5, 6].map(num => {
                  const itemProps = childProps[num];
                  const isSelected = selectedChild === num;
                  const itemStyle = mode === 'flex' ? {
                    flexGrow: itemProps.flexGrow,
                    flexShrink: itemProps.flexShrink,
                    alignSelf: itemProps.alignSelf
                  } : {
                    gridColumn: itemProps.gridColumn,
                    gridRow: itemProps.gridRow,
                    alignSelf: itemProps.alignSelf
                  };

                  return (
                    <div
                      key={num}
                      className={`preview-item-box ${isSelected ? 'selected' : ''}`}
                      style={itemStyle}
                      onClick={() => setSelectedChild(num)}
                    >
                      <span className="item-index">{num}</span>
                      {mode === 'flex' && itemProps.flexGrow > 0 && (
                        <span className="item-stat">grow: {itemProps.flexGrow}</span>
                      )}
                      {mode === 'grid' && itemProps.gridColumn !== 'auto' && (
                        <span className="item-stat">col: {itemProps.gridColumn}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Code Viewer Card */}
          <div className="telemetry-card">
            <div className="card-heading">
              <Info className="icon-cyan" size={20} />
              <h4>CSS Declarations</h4>
            </div>
            <pre className="css-pre">
              <code>
                <span className="green-text">{mode === 'flex' ? '.flex-container' : '.grid-container'}</span> {'{\n'}
                {'  '}display: <span className="text-purple">{mode}</span>;{'\n'}
                {mode === 'flex' ? (
                  <>
                    {'  '}flex-direction: <span className="text-cyan">{flexDirection}</span>;{'\n'}
                    {'  '}justify-content: <span className="text-cyan">{justifyContent}</span>;{'\n'}
                    {'  '}align-items: <span className="text-cyan">{alignItems}</span>;{'\n'}
                    {'  '}flex-wrap: <span className="text-cyan">{flexWrap}</span>;{'\n'}
                    {'  '}gap: <span className="text-cyan">{flexGap}px</span>;{'\n'}
                  </>
                ) : (
                  <>
                    {'  '}grid-template-columns: <span className="text-cyan">{gridCols}</span>;{'\n'}
                    {'  '}justify-items: <span className="text-cyan">{justifyItems}</span>;{'\n'}
                    {'  '}align-items: <span className="text-cyan">{alignContentItems}</span>;{'\n'}
                    {'  '}gap: <span className="text-cyan">{gridGap}px</span>;{'\n'}
                  </>
                )}
                {'}\n\n'}
                <span className="green-text">{mode === 'flex' ? `.flex-item-${selectedChild}` : `.grid-item-${selectedChild}`}</span> {'{\n'}
                {mode === 'flex' ? (
                  <>
                    {'  '}flex-grow: <span className="text-cyan">{childProps[selectedChild].flexGrow}</span>;{'\n'}
                    {'  '}flex-shrink: <span className="text-cyan">{childProps[selectedChild].flexShrink}</span>;{'\n'}
                  </>
                ) : (
                  <>
                    {'  '}grid-column: <span className="text-cyan">{childProps[selectedChild].gridColumn}</span>;{'\n'}
                    {'  '}grid-row: <span className="text-cyan">{childProps[selectedChild].gridRow}</span>;{'\n'}
                  </>
                )}
                {'  '}align-self: <span className="text-cyan">{childProps[selectedChild].alignSelf}</span>;{'\n'}
                {'}'}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .layout-visualizer-root {
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
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
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
          grid-template-columns: 1.1fr 1.3fr;
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
          min-width: 140px;
          cursor: pointer;
        }

        .slide-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 12px;
        }

        .flex-lbl-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .val-lbl {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--primary-cyan);
        }

        .slide-row input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 100px;
          background: var(--app-border);
          outline: none;
        }

        .slide-row input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--primary-cyan);
          cursor: pointer;
        }

        .child-selector-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          margin-bottom: 12px;
        }

        .child-pick-btn {
          background: var(--app-bg);
          border: 1px solid var(--app-border);
          color: var(--app-text-muted);
          padding: 8px 4px;
          font-size: 0.78rem;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .child-pick-btn:hover {
          color: var(--primary-cyan);
          border-color: var(--primary-cyan);
        }

        .child-pick-btn.active {
          background: rgba(0, 209, 209, 0.1);
          color: var(--primary-cyan);
          border-color: var(--primary-cyan);
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

        .layout-canvas {
          background: rgba(0, 0, 0, 0.15);
          border: 2px dashed var(--app-border);
          border-radius: 12px;
          padding: 16px;
          min-height: 280px;
          display: flex;
        }

        .layout-container-preview {
          width: 100%;
          min-height: 250px;
          background: rgba(0, 209, 209, 0.02);
          border-radius: 8px;
          padding: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .preview-item-box {
          width: 60px;
          min-height: 60px;
          background: var(--brand-gradient);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          border: 2px solid transparent;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          user-select: none;
          padding: 4px;
        }

        .preview-item-box:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(0, 209, 209, 0.25);
        }

        .preview-item-box.selected {
          border-color: white;
          box-shadow: 0 0 0 3px var(--primary-cyan), 0 6px 20px rgba(0,0,0,0.3);
          transform: scale(1.05);
        }

        .item-index {
          font-size: 1.1rem;
          font-weight: 800;
        }

        .item-stat {
          font-size: 0.58rem;
          opacity: 0.85;
          font-family: monospace;
          margin-top: 2px;
        }

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

export default FlexboxGridVisualizer;
