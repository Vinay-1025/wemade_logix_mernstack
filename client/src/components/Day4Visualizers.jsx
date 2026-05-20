import React, { useState } from 'react';
import { Eye, Volume2, Info, AlertCircle, CheckCircle2, Layout, BookOpen, Compass, FileText, ArrowRight } from 'lucide-react';

// 1. Semantic Layout Visualizer
export const SemanticLayoutVisualizer = () => {
  const [hoveredSection, setHoveredSection] = useState(null);
  const [activeLayout, setActiveLayout] = useState('semantic'); // 'semantic' | 'generic'

  const sectionsInfo = {
    header: {
      title: '<header>',
      desc: 'Defines introductory content or a set of navigational links. Usually contains a logo, search field, or heading elements.',
      seo: 'Landmark role tells search engines this is the introductory hub of the site.'
    },
    nav: {
      title: '<nav>',
      desc: 'Defines a set of navigation links. Designed specifically for primary site-wide navigation lists.',
      seo: 'Helps search engines map the architecture of your site quickly.'
    },
    main: {
      title: '<main>',
      desc: 'Defines the dominant content of the document. Must contain content that is unique to that document.',
      seo: 'Signals the exact keyword-rich core content area to crawler bots.'
    },
    article: {
      title: '<article>',
      desc: 'Defines self-contained composition in a document, page, application, or site. Suitable for blog posts, news, forum threads.',
      seo: 'Marks content as independently distributable/syndicated.'
    },
    section: {
      title: '<section>',
      desc: 'Defines a thematic grouping of content, typically with a heading. Used when there is no more specific element to represent it.',
      seo: 'Groups related content blocks together for better semantic density.'
    },
    aside: {
      title: '<aside>',
      desc: 'Defines content aside from the main page flow (like a sidebar, ads, or quote banners).',
      seo: 'Signals secondary content, helping crawlers focus on main elements.'
    },
    footer: {
      title: '<footer>',
      desc: 'Defines a footer for a document or section. Contains authorship, copyright, contact, site map.',
      seo: 'Identifies closing metadata information for proper licensing.'
    }
  };

  return (
    <div style={{ color: 'white', background: '#0f172a', borderRadius: '12px', border: '1px solid var(--app-border)', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h4 style={{ margin: 0, color: 'var(--primary-cyan)', fontSize: '1.1rem', fontWeight: 700 }}>Semantic Layout Explorer</h4>
          <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>Compare semantic HTML structures vs generic div containers.</p>
        </div>

        {/* Toggle Mode */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '8px' }}>
          <button
            onClick={() => setActiveLayout('semantic')}
            style={{
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              background: activeLayout === 'semantic' ? 'var(--primary-cyan)' : 'transparent',
              color: activeLayout === 'semantic' ? '#0f172a' : '#94a3b8',
              transition: 'all 0.2s'
            }}
          >
            Semantic Layout
          </button>
          <button
            onClick={() => setActiveLayout('generic')}
            style={{
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              background: activeLayout === 'generic' ? '#ec4899' : 'transparent',
              color: activeLayout === 'generic' ? 'white' : '#94a3b8',
              transition: 'all 0.2s'
            }}
          >
            Generic &lt;div&gt; soup
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        
        {/* Visual Mockup */}
        <div style={{ background: '#090d16', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
          <span style={{ fontSize: '0.65rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>BROWSER RENDER SCHEMATIC:</span>
          
          {/* Header */}
          <div
            onMouseEnter={() => setHoveredSection('header')}
            onMouseLeave={() => setHoveredSection(null)}
            style={{
              border: '1px dashed',
              borderColor: hoveredSection === 'header' ? 'var(--primary-cyan)' : 'rgba(255,255,255,0.15)',
              background: hoveredSection === 'header' ? 'rgba(0, 209, 209, 0.08)' : 'rgba(255,255,255,0.02)',
              borderRadius: '6px',
              padding: '10px',
              textAlign: 'center',
              cursor: 'help',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 'bold', color: activeLayout === 'semantic' ? 'var(--primary-cyan)' : '#cbd5e1' }}>
              {activeLayout === 'semantic' ? '<header>' : '<div class="header">'}
            </span>
          </div>

          {/* Nav */}
          <div
            onMouseEnter={() => setHoveredSection('nav')}
            onMouseLeave={() => setHoveredSection(null)}
            style={{
              border: '1px dashed',
              borderColor: hoveredSection === 'nav' ? 'var(--primary-cyan)' : 'rgba(255,255,255,0.15)',
              background: hoveredSection === 'nav' ? 'rgba(0, 209, 209, 0.08)' : 'rgba(255,255,255,0.02)',
              borderRadius: '6px',
              padding: '8px',
              textAlign: 'center',
              cursor: 'help',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 'bold', color: activeLayout === 'semantic' ? 'var(--primary-cyan)' : '#cbd5e1' }}>
              {activeLayout === 'semantic' ? '<nav>' : '<div class="navbar">'}
            </span>
          </div>

          {/* Main Grid Wrapper */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px' }}>
            
            {/* Main content area */}
            <div
              onMouseEnter={() => setHoveredSection('main')}
              onMouseLeave={() => setHoveredSection(null)}
              style={{
                border: '1px dashed',
                borderColor: hoveredSection === 'main' ? 'var(--primary-cyan)' : 'rgba(255,255,255,0.15)',
                background: hoveredSection === 'main' ? 'rgba(0, 209, 209, 0.08)' : 'rgba(255,255,255,0.02)',
                borderRadius: '6px',
                padding: '12px',
                minHeight: '140px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                cursor: 'help',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 'bold', color: activeLayout === 'semantic' ? 'var(--primary-cyan)' : '#cbd5e1' }}>
                {activeLayout === 'semantic' ? '<main>' : '<div class="main-content">'}
              </span>

              {/* Nested Section */}
              <div
                onMouseEnter={(e) => { e.stopPropagation(); setHoveredSection('section'); }}
                onMouseLeave={() => setHoveredSection('main')}
                style={{
                  border: '1px dashed',
                  borderColor: hoveredSection === 'section' ? '#a855f7' : 'rgba(255,255,255,0.1)',
                  background: hoveredSection === 'section' ? 'rgba(168, 85, 247, 0.08)' : 'rgba(255,255,255,0.02)',
                  borderRadius: '4px',
                  padding: '8px',
                  cursor: 'help',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: activeLayout === 'semantic' ? '#c084fc' : '#94a3b8' }}>
                  {activeLayout === 'semantic' ? '<section>' : '<div class="block-section">'}
                </span>

                {/* Nested Article */}
                <div
                  onMouseEnter={(e) => { e.stopPropagation(); setHoveredSection('article'); }}
                  onMouseLeave={() => setHoveredSection('section')}
                  style={{
                    border: '1px dashed',
                    borderColor: hoveredSection === 'article' ? '#eab308' : 'rgba(255,255,255,0.08)',
                    background: hoveredSection === 'article' ? 'rgba(234, 179, 8, 0.08)' : 'rgba(255,255,255,0.02)',
                    borderRadius: '4px',
                    padding: '6px',
                    marginTop: '6px',
                    cursor: 'help',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: activeLayout === 'semantic' ? '#fde047' : '#94a3b8' }}>
                    {activeLayout === 'semantic' ? '<article>' : '<div class="post-item">'}
                  </span>
                </div>
              </div>
            </div>

            {/* Sidebar Aside */}
            <div
              onMouseEnter={() => setHoveredSection('aside')}
              onMouseLeave={() => setHoveredSection(null)}
              style={{
                border: '1px dashed',
                borderColor: hoveredSection === 'aside' ? 'var(--primary-cyan)' : 'rgba(255,255,255,0.15)',
                background: hoveredSection === 'aside' ? 'rgba(0, 209, 209, 0.08)' : 'rgba(255,255,255,0.02)',
                borderRadius: '6px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                cursor: 'help',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 'bold', color: activeLayout === 'semantic' ? 'var(--primary-cyan)' : '#cbd5e1' }}>
                {activeLayout === 'semantic' ? '<aside>' : '<div class="sidebar">'}
              </span>
            </div>

          </div>

          {/* Footer */}
          <div
            onMouseEnter={() => setHoveredSection('footer')}
            onMouseLeave={() => setHoveredSection(null)}
            style={{
              border: '1px dashed',
              borderColor: hoveredSection === 'footer' ? 'var(--primary-cyan)' : 'rgba(255,255,255,0.15)',
              background: hoveredSection === 'footer' ? 'rgba(0, 209, 209, 0.08)' : 'rgba(255,255,255,0.02)',
              borderRadius: '6px',
              padding: '10px',
              textAlign: 'center',
              cursor: 'help',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 'bold', color: activeLayout === 'semantic' ? 'var(--primary-cyan)' : '#cbd5e1' }}>
              {activeLayout === 'semantic' ? '<footer>' : '<div class="footer">'}
            </span>
          </div>
        </div>

        {/* Informative Side Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {hoveredSection ? (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layout size={18} color="var(--primary-cyan)" />
                <h5 style={{ margin: 0, fontSize: '1rem', color: 'white', fontFamily: 'monospace' }}>
                  {sectionsInfo[hoveredSection].title}
                </h5>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                {sectionsInfo[hoveredSection].desc}
              </p>
              
              <div style={{ display: 'flex', gap: '8px', background: 'rgba(0, 209, 209, 0.04)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(0, 209, 209, 0.15)' }}>
                <Info size={14} color="var(--primary-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.75rem', color: '#a5f3fc', lineHeight: '1.4' }}>
                  <strong>SEO/A11y Benefit:</strong> {sectionsInfo[hoveredSection].seo}
                </span>
              </div>
            </div>
          ) : (
            <div style={{ border: '1px dashed rgba(255,255,255,0.1)', padding: '24px', borderRadius: '10px', textAlign: 'center', color: '#64748b' }}>
              <Compass size={32} style={{ marginBottom: '10px', opacity: 0.5 }} />
              <p style={{ margin: 0, fontSize: '0.85rem' }}>Hover over any block in the schematic mockup to reveal its semantic guidelines and SEO value.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

// 2. Accessibility (a11y) Screen Reader Simulator
export const AccessibilityVisualizer = () => {
  const [activeSpeech, setActiveSpeech] = useState(null); // null | 'inaccessible' | 'accessible'
  const [isPlaying, setIsPlaying] = useState(false);

  const simulateSpeech = (type) => {
    setActiveSpeech(type);
    setIsPlaying(true);
    setTimeout(() => {
      setIsPlaying(false);
    }, 6000);
  };

  return (
    <div style={{ color: 'white', background: '#0f172a', borderRadius: '12px', border: '1px solid var(--app-border)', padding: '24px' }}>
      <h4 style={{ margin: 0, color: 'var(--primary-cyan)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>Screen Reader Speech Simulator</h4>
      <p style={{ margin: '0 0 20px 0', fontSize: '0.8rem', color: '#94a3b8' }}>Discover how blind and visually impaired users hear and interact with your code structure.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        
        {/* Left Side: Bad Accessibility Code */}
        <div style={{ background: 'rgba(239, 68, 68, 0.02)', border: '1px solid rgba(239, 68, 68, 0.15)', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={18} color="#ef4444" />
            <h5 style={{ margin: 0, fontSize: '0.9rem', color: '#fca5a5' }}>Bad Accessibility Code</h5>
          </div>

          <pre style={{ margin: 0, background: '#090d16', padding: '12px', borderRadius: '6px', fontSize: '0.72rem', color: '#fca5a5', fontFamily: 'monospace', overflowX: 'auto' }}>
{`<img src="profile_photo.jpg">
<div class="submit-btn" onclick="send()">
  Submit Profile
</div>`}
          </pre>

          <button
            onClick={() => simulateSpeech('inaccessible')}
            disabled={isPlaying}
            style={{
              padding: '10px 14px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              cursor: isPlaying ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: isPlaying ? 0.6 : 1
            }}
          >
            <Volume2 size={16} /> Listen like a Screen Reader
          </button>
        </div>

        {/* Right Side: Accessible Code */}
        <div style={{ background: 'rgba(16, 185, 129, 0.02)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} color="#10b981" />
            <h5 style={{ margin: 0, fontSize: '0.9rem', color: '#a7f3d0' }}>Accessible &amp; Semantic Code</h5>
          </div>

          <pre style={{ margin: 0, background: '#090d16', padding: '12px', borderRadius: '6px', fontSize: '0.72rem', color: '#a7f3d0', fontFamily: 'monospace', overflowX: 'auto' }}>
{`<img src="profile_photo.jpg" alt="Student smiling avatar">
<button type="submit" aria-label="Submit profile details">
  Submit Profile
</button>`}
          </pre>

          <button
            onClick={() => simulateSpeech('accessible')}
            disabled={isPlaying}
            style={{
              padding: '10px 14px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              cursor: isPlaying ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: isPlaying ? 0.6 : 1
            }}
          >
            <Volume2 size={16} /> Listen like a Screen Reader
          </button>
        </div>

      </div>

      {/* Screen Reader Audio Display Output */}
      {activeSpeech && (
        <div style={{ marginTop: '20px', background: '#090d16', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ width: '8px', height: '8px', background: isPlaying ? '#10b981' : '#64748b', borderRadius: '50%', boxShadow: isPlaying ? '0 0 10px #10b981' : 'none' }}></div>
          <div>
            <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '800', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              SCREEN READER AUDIO TRANSCRIPT:
            </span>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#a5f3fc', fontFamily: 'monospace', fontStyle: 'italic', lineHeight: '1.4' }}>
              {activeSpeech === 'inaccessible' ? (
                <span>
                  "Graphic... p r o f i l e _ p h o t o dot j p g. Submit Profile... group. (Warning: Element is not focusable via Keyboard TAB keys. Unlabeled layout div.)"
                </span>
              ) : (
                <span>
                  "Image: Student smiling avatar. Button: Submit profile details. Focusable: Yes, click to trigger send profile form action."
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// 3. Heading Structure Outline Visualizer
export const StructureVisualizer = () => {
  const [outlineMode, setOutlineMode] = useState('correct'); // 'correct' | 'incorrect'

  return (
    <div style={{ color: 'white', background: '#0f172a', borderRadius: '12px', border: '1px solid var(--app-border)', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h4 style={{ margin: 0, color: 'var(--primary-cyan)', fontSize: '1.1rem', fontWeight: 700 }}>Heading Structure Outline Analyzer</h4>
          <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>Maintain heading hierarchies. Never skip a level (e.g. H1 to H3) as it breaks screen reader index tables.</p>
        </div>

        {/* Outline Toggle */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '8px' }}>
          <button
            onClick={() => setOutlineMode('correct')}
            style={{
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              background: outlineMode === 'correct' ? '#10b981' : 'transparent',
              color: 'white',
              transition: 'all 0.2s'
            }}
          >
            Correct Nesting
          </button>
          <button
            onClick={() => setOutlineMode('incorrect')}
            style={{
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              background: outlineMode === 'incorrect' ? '#ef4444' : 'transparent',
              color: 'white',
              transition: 'all 0.2s'
            }}
          >
            Incorrect (Broken Outline)
          </button>
        </div>
      </div>

      <div style={{ background: '#090d16', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '20px' }}>
        
        {outlineMode === 'correct' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '0.8rem', fontWeight: 800, marginBottom: '4px' }}>
              <CheckCircle2 size={16} /> VALID SEO & ACCESSIBILITY NESTED TREE
            </div>
            
            {/* Outline Tree nodes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ padding: '8px 12px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>&lt;h1&gt;</span> Course Syllabus Overview
              </div>
              
              <div style={{ padding: '8px 12px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.8rem', marginLeft: '24px' }}>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>&lt;h2&gt;</span> Week 1 Foundations
              </div>

              <div style={{ padding: '8px 12px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.8rem', marginLeft: '48px' }}>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>&lt;h3&gt;</span> Day 1 Intro to HTML
              </div>

              <div style={{ padding: '8px 12px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.8rem', marginLeft: '48px' }}>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>&lt;h3&gt;</span> Day 2 Media & Tags
              </div>

              <div style={{ padding: '8px 12px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.8rem', marginLeft: '24px' }}>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>&lt;h2&gt;</span> Week 2 Backend Development
              </div>
            </div>

            <div style={{ background: 'rgba(16,185,129,0.03)', border: '1px solid rgba(16,185,129,0.15)', padding: '12px', borderRadius: '6px', fontSize: '0.78rem', color: '#a7f3d0', marginTop: '10px' }}>
              <strong>Outline Analysis:</strong> Complete sequential flow. Heading levels are changed strictly one level at a time. Crawlers and assistive technologies can build a table of contents to let keyboard users jump to subsections smoothly.
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '0.8rem', fontWeight: 800, marginBottom: '4px' }}>
              <AlertCircle size={16} /> ACCESSIBILITY LEVEL BREAK DETECTED
            </div>
            
            {/* Outline Tree nodes with errors */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>&lt;h1&gt;</span> Course Syllabus Overview
              </div>
              
              <div style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.8rem', marginLeft: '48px', borderLeft: '4px solid #ef4444' }}>
                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>&lt;h3&gt;</span> Day 1 Intro to HTML <span style={{ float: 'right', fontSize: '0.7rem', color: '#f87171', background: 'rgba(239,68,68,0.2)', padding: '2px 6px', borderRadius: '4px' }}>Error: Skipped H2!</span>
              </div>

              <div style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.8rem', marginLeft: '72px', borderLeft: '4px solid #ef4444' }}>
                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>&lt;h4&gt;</span> Topics covered <span style={{ float: 'right', fontSize: '0.7rem', color: '#f87171', background: 'rgba(239,68,68,0.2)', padding: '2px 6px', borderRadius: '4px' }}>Nesting level ok</span>
              </div>

              <div style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.8rem', marginLeft: '24px' }}>
                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>&lt;h2&gt;</span> Week 2 Backend Development
              </div>
            </div>

            <div style={{ background: 'rgba(239,68,68,0.03)', border: '1px solid rgba(239,68,68,0.15)', padding: '12px', borderRadius: '6px', fontSize: '0.78rem', color: '#fca5a5', marginTop: '10px' }}>
              <strong>Outline Analysis:</strong> The document skips from an <code>&lt;h1&gt;</code> directly to an <code>&lt;h3&gt;</code>. Assitive screen reading utilities will fail to parse the page structure correctly, rendering a disjointed navigation tree map for users.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
