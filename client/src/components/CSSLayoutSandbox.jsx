import React, { useState } from 'react';
import { Sliders, RefreshCw, Copy, Info, Check, Eye } from 'lucide-react';

const CSSLayoutSandbox = () => {
  const [modalPadding, setModalPadding] = useState(20);
  const [modalBorderWidth, setModalBorderWidth] = useState(2);
  const [modalBorderColor, setModalBorderColor] = useState('#cbd5e1');
  const [closeBtnTop, setCloseBtnTop] = useState(16);
  const [closeBtnRight, setCloseBtnRight] = useState(16);
  const [stickyHeader, setStickyHeader] = useState(true);
  const [boxSizingMode, setBoxSizingMode] = useState('border-box');
  const [backdropZIndex, setBackdropZIndex] = useState(10);
  const [modalZIndex, setModalZIndex] = useState(20);
  const [showModal, setShowModal] = useState(true);
  const [copied, setCopied] = useState(false);

  const resetAll = () => {
    setModalPadding(20);
    setModalBorderWidth(2);
    setModalBorderColor('#cbd5e1');
    setCloseBtnTop(16);
    setCloseBtnRight(16);
    setStickyHeader(true);
    setBoxSizingMode('border-box');
    setBackdropZIndex(10);
    setModalZIndex(20);
    setShowModal(true);
  };

  const copyCSS = () => {
    const cssText = `/* Backdrop Overlay */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  z-index: ${backdropZIndex};
}

/* Modal Viewport Card */
.modal-card {
  position: relative;
  z-index: ${modalZIndex};
  box-sizing: ${boxSizingMode};
  width: 90%;
  max-width: 480px;
  padding: ${modalPadding}px;
  border: ${modalBorderWidth}px solid ${modalBorderColor};
  background: #ffffff;
  border-radius: 12px;
}

/* Absolute Close Button */
.close-btn {
  position: absolute;
  top: ${closeBtnTop}px;
  right: ${closeBtnRight}px;
}

/* Sticky Modal Header */
.modal-header {
  position: ${stickyHeader ? 'sticky' : 'relative'};
  top: 0;
  background: #ffffff;
  z-index: 5;
}`;
    navigator.clipboard.writeText(cssText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="layout-sandbox-root">
      <div className="lab-grid">
        {/* Controls Column */}
        <div className="controls-panel">
          <div className="telemetry-card">
            <div className="card-heading">
              <Sliders className="icon-purple" size={20} />
              <h4>Layout Properties</h4>
            </div>
            <p className="description">Edit box and positioning variables to assemble the overlay modal component.</p>

            {/* Box Spacing */}
            <div className="bg-panel">
              <span className="panel-section-title text-primary-purple">Modal Box Geometry</span>
              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Modal Padding</span>
                  <span className="val-lbl">{modalPadding}px</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="40"
                  value={modalPadding}
                  onChange={(e) => setModalPadding(parseInt(e.target.value))}
                />
              </div>
              <div className="slide-row" style={{ marginTop: '8px' }}>
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Border Width</span>
                  <span className="val-lbl">{modalBorderWidth}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={modalBorderWidth}
                  onChange={(e) => setModalBorderWidth(parseInt(e.target.value))}
                />
              </div>
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="slide-lbl">Border Color</span>
                <input
                  type="color"
                  className="color-picker"
                  value={modalBorderColor}
                  onChange={(e) => setModalBorderColor(e.target.value)}
                />
              </div>
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="slide-lbl">Box Sizing Model</span>
                <select
                  className="select-styled"
                  value={boxSizingMode}
                  onChange={(e) => setBoxSizingMode(e.target.value)}
                >
                  <option value="border-box">border-box</option>
                  <option value="content-box">content-box</option>
                </select>
              </div>
            </div>

            {/* Absolute positioning */}
            <div className="bg-panel">
              <span className="panel-section-title text-primary-cyan">Absolute Offsets (Close Button)</span>
              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Top</span>
                  <span className="val-lbl">{closeBtnTop}px</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="32"
                  value={closeBtnTop}
                  onChange={(e) => setCloseBtnTop(parseInt(e.target.value))}
                />
              </div>
              <div className="slide-row" style={{ marginTop: '8px' }}>
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Right</span>
                  <span className="val-lbl">{closeBtnRight}px</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="32"
                  value={closeBtnRight}
                  onChange={(e) => setCloseBtnRight(parseInt(e.target.value))}
                />
              </div>
            </div>

            {/* Sticky Positioning & Z Index */}
            <div className="bg-panel">
              <span className="panel-section-title text-primary-gold">Sticky Header & Layers</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className="slide-lbl" style={{ fontWeight: '600' }}>Sticky Header (top: 0)</span>
                <input
                  type="checkbox"
                  className="toggle-checkbox"
                  checked={stickyHeader}
                  onChange={(e) => setStickyHeader(e.target.checked)}
                />
              </div>
              <div className="slide-row">
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Backdrop z-index</span>
                  <span className="val-lbl">{backdropZIndex}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={backdropZIndex}
                  onChange={(e) => setBackdropZIndex(parseInt(e.target.value))}
                />
              </div>
              <div className="slide-row" style={{ marginTop: '8px' }}>
                <div className="flex-lbl-row">
                  <span className="slide-lbl">Modal Card z-index</span>
                  <span className="val-lbl">{modalZIndex}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={modalZIndex}
                  onChange={(e) => setModalZIndex(parseInt(e.target.value))}
                />
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button className="reset-btn" onClick={resetAll}>
                <RefreshCw size={14} style={{ marginRight: '6px' }} /> Reset
              </button>
              <button className="copy-btn" onClick={copyCSS} style={{ flexGrow: 1 }}>
                <Copy size={14} style={{ marginRight: '6px' }} /> {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>
        </div>

        {/* Viewport Simulation Column */}
        <div className="preview-panel">
          <div className="telemetry-card simulator-card">
            <div className="card-heading" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye className="icon-cyan" size={20} />
                <h4>Modal Preview Workspace</h4>
              </div>
              <button
                className="toggle-modal-trigger"
                onClick={() => setShowModal(!showModal)}
              >
                {showModal ? 'Close Modal' : 'Open Modal'}
              </button>
            </div>
            <p className="description">
              Simulated page viewport layout (light-themed only). Use the toggle trigger to open/close the dynamic overlay view.
            </p>

            <div className="simulated-viewport-frame">
              {/* Underlying Base Page Content */}
              <div className="background-base-page">
                <header className="page-header-mock">
                  <h5>Dashboard Overview</h5>
                </header>
                <div className="page-grid-mock">
                  <div className="mock-grid-item">Analytics</div>
                  <div className="mock-grid-item">Live Spacing</div>
                  <div className="mock-grid-item">Coordinates</div>
                </div>
                <p style={{ fontSize: '0.72rem', color: '#64748b', margin: '16px 0 0 0' }}>
                  If the backdrop layer z-index is higher than the modal z-index, the backdrop will overlap the modal card and block access.
                </p>
              </div>

              {/* OVERLAY BackDrop & MODAL WINDOW */}
              {showModal && (
                <div className="modal-viewport-overlay">
                  {/* Backdrop Layer */}
                  <div
                    className="backdrop-element"
                    style={{ zIndex: backdropZIndex }}
                    onClick={() => setShowModal(false)}
                  >
                    <span className="backdrop-tag">Backdrop (z-index: {backdropZIndex})</span>
                  </div>

                  {/* Modal Card Element */}
                  <div
                    className="modal-card-element"
                    style={{
                      zIndex: modalZIndex,
                      boxSizing: boxSizingMode,
                      padding: `${modalPadding}px`,
                      border: `${modalBorderWidth}px solid ${modalBorderColor}`,
                      backgroundColor: '#ffffff'
                    }}
                  >
                    {/* Absolute Close Tag */}
                    <button
                      className="absolute-close-btn"
                      style={{
                        top: `${closeBtnTop}px`,
                        right: `${closeBtnRight}px`
                      }}
                      onClick={() => setShowModal(false)}
                    >
                      &times;
                    </button>

                    {/* Scrollable container with sticky header */}
                    <div className="modal-inner-scrollable-body">
                      <header
                        className="modal-header-section"
                        style={{
                          position: stickyHeader ? 'sticky' : 'relative',
                          borderBottom: '1px solid #e2e8f0',
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <h6 style={{ margin: 0, fontSize: '0.88rem', fontWeight: '800', color: '#0f172a' }}>
                          Sticky Modal Header
                        </h6>
                        <span className="sticky-tag" style={{ display: stickyHeader ? 'inline-block' : 'none' }}>
                          STICKY (top: 0)
                        </span>
                      </header>

                      <div className="modal-content-scroller">
                        <span className="badge-tag">Assignment Task Details</span>
                        <p style={{ margin: '8px 0 0 0', fontSize: '0.72rem', color: '#475569', lineHeight: 1.5 }}>
                          This widget combines multiple core styling mechanics:
                        </p>
                        <ul style={{ paddingLeft: '16px', margin: '6px 0', fontSize: '0.7rem', color: '#64748b' }}>
                          <li><strong>Fixed backdrop:</strong> Anchored overlay at fixed coordinates.</li>
                          <li><strong>Relative boundary:</strong> Modal wrapper creates absolute positioning scopes.</li>
                          <li><strong>Absolute Close:</strong> Offsets close button away from corners.</li>
                          <li><strong>Sticky titles:</strong> Locks header bounds inside body scroll events.</li>
                          <li><strong>Z-Index Sorting:</strong> Resolves overlap collisions securely.</li>
                        </ul>
                        <p style={{ fontSize: '0.68rem', color: '#94a3b8', margin: '8px 0 0 0' }}>
                          Scroll down to view mock telemetry outputs inside this container...
                        </p>
                        <div className="filler-text-spacing" style={{ height: '100px', background: '#f8fafc', borderRadius: '4px', marginTop: '10px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem', color: '#94a3b8' }}>
                          Inner Scroll Depth
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Diagnostic Alert */}
            {showModal && backdropZIndex >= modalZIndex && (
              <div className="warning-overlay-alert">
                <Info size={16} className="icon-red" />
                <span>
                  <strong>Z-Index Alert:</strong> The backdrop z-index ({backdropZIndex}) is greater than or equal to the modal card z-index ({modalZIndex}). In a real web page, the backdrop would render on top of the modal window, preventing click interactions!
                </span>
              </div>
            )}
          </div>

          {/* Generated Code */}
          <div className="telemetry-card">
            <div className="card-heading">
              <Info className="icon-cyan" size={20} />
              <h4>Copyable CSS Rules</h4>
            </div>
            <pre className="css-pre">
              <code>
                <span className="green-text">.modal-backdrop</span> {'{\n'}
                {'  '}position: <span className="text-purple">fixed</span>;{'\n'}
                {'  '}inset: <span className="text-cyan">0</span>;{'\n'}
                {'  '}background: <span className="text-cyan">rgba(15, 23, 42, 0.5)</span>;{'\n'}
                {'  '}z-index: <span className="text-cyan">{backdropZIndex}</span>;{'\n'}
                {'}\n\n'}
                <span className="green-text">.modal-card</span> {'{\n'}
                {'  '}position: <span className="text-purple">relative</span>;{'\n'}
                {'  '}z-index: <span className="text-cyan">{modalZIndex}</span>;{'\n'}
                {'  '}box-sizing: <span className="text-purple">{boxSizingMode}</span>;{'\n'}
                {'  '}padding: <span className="text-cyan">{modalPadding}px</span>;{'\n'}
                {'  '}border: <span className="text-cyan">{modalBorderWidth}px solid {modalBorderColor}</span>;{'\n'}
                {'}\n\n'}
                <span className="green-text">.close-btn</span> {'{\n'}
                {'  '}position: <span className="text-purple">absolute</span>;{'\n'}
                {'  '}top: <span className="text-cyan">{closeBtnTop}px</span>;{'\n'}
                {'  '}right: <span className="text-cyan">{closeBtnRight}px</span>;{'\n'}
                {'}\n\n'}
                <span className="green-text">.modal-header</span> {'{\n'}
                {'  '}position: <span className="text-purple">{stickyHeader ? 'sticky' : 'relative'}</span>;{'\n'}
                {'  '}top: <span className="text-cyan">0</span>;{'\n'}
                {'}'}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .layout-sandbox-root {
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

        .icon-purple { color: #7c3aed; }
        .icon-cyan { color: #0891b2; }
        .icon-gold { color: #f59e0b; }
        .icon-red { color: #ef4444; }

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
          background: #7c3aed;
          cursor: pointer;
        }

        .toggle-checkbox {
          cursor: pointer;
          width: 32px;
          height: 18px;
        }

        .select-styled {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #0f172a;
          font-size: 0.72rem;
          padding: 4px 8px;
          border-radius: 6px;
          outline: none;
        }

        .color-picker {
          border: 1px solid #cbd5e1;
          padding: 2px;
          border-radius: 6px;
          width: 36px;
          height: 26px;
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

        .toggle-modal-trigger {
          background: #0891b2;
          color: white;
          border: none;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          cursor: pointer;
        }

        .toggle-modal-trigger:hover {
          background: #06b6d4;
        }

        /* Phone Screen Simulating Viewport */
        .simulated-viewport-frame {
          position: relative;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          height: 320px;
          overflow: hidden; /* Clips the fixed modal inside */
        }

        .background-base-page {
          padding: 16px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .page-header-mock {
          background: #e2e8f0;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 12px;
        }

        .page-header-mock h5 {
          margin: 0;
          font-size: 0.8rem;
          color: #334155;
          font-weight: 700;
        }

        .page-grid-mock {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .mock-grid-item {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 16px 8px;
          text-align: center;
          font-size: 0.65rem;
          font-weight: 600;
          color: #94a3b8;
          border-radius: 4px;
        }

        /* Modal viewport overlays */
        .modal-viewport-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 15;
        }

        .backdrop-element {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.45);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 8px;
        }

        .backdrop-tag {
          font-size: 0.55rem;
          color: rgba(255,255,255,0.7);
          font-weight: 700;
          background: rgba(0,0,0,0.4);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .modal-card-element {
          position: relative;
          width: 84%;
          max-height: 80%;
          border-radius: 8px;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .absolute-close-btn {
          position: absolute;
          z-index: 10;
          border: none;
          background: rgba(15,23,42,0.06);
          color: #334155;
          font-size: 1.15rem;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .absolute-close-btn:hover {
          background: rgba(15,23,42,0.12);
        }

        .modal-inner-scrollable-body {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow-y: auto;
        }

        .modal-header-section {
          padding: 8px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .sticky-tag {
          font-size: 0.52rem;
          font-weight: 800;
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
          padding: 2px 4px;
          border-radius: 3px;
        }

        .modal-content-scroller {
          flex-grow: 1;
        }

        .badge-tag {
          font-size: 0.58rem;
          font-weight: 700;
          color: #0891b2;
          background: rgba(8,145,178,0.08);
          padding: 2px 6px;
          border-radius: 4px;
          display: inline-block;
        }

        .warning-overlay-alert {
          margin-top: 12px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          padding: 10px;
          display: flex;
          gap: 8px;
          font-size: 0.72rem;
          color: #b91c1c;
          line-height: 1.4;
        }

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
          font-size: 0.72rem;
          color: #0f766e;
        }

        .green-text { color: #0f766e; font-weight: 600; }
        .text-cyan { color: #0891b2; }
        .text-purple { color: #7c3aed; }
      `}} />
    </div>
  );
};

export default CSSLayoutSandbox;
