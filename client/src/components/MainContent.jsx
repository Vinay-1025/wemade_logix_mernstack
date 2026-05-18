import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useCourse } from '../context/CourseContext';
import CodeEditor from './CodeEditor';
import { FileEdit, Lightbulb, ClipboardCheck, ArrowUpRight, ArrowLeft, ArrowRight, CheckCircle2, XCircle, ShieldCheck, FileText, Clock, Lock, Unlock, BookOpen, Download, CheckSquare, Key, Laptop, Server, Layers, Globe } from 'lucide-react';
import Day1MernPdf from '../assets/Material/Day1_MERN.pdf';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { courseData } from '../data/mockData';

import NetworkAnimation from './NetworkAnimation';
import FlexboxPlayground from './FlexboxPlayground';
import ResponsiveSimulator from './ResponsiveSimulator';
import GitTerminal from './GitTerminal';
import PlanVisualizer from './PlanVisualizer';
import JSRuntimeViz from './JSRuntimeViz';
import DOMTreeViz from './DOMTreeViz';
import ArrayMethodsViz from './ArrayMethodsViz';
import ScopeHoistingViz from './ScopeHoistingViz';
import PromiseFlowViz from './PromiseFlowViz';
import StorageManagerViz from './StorageManagerViz';
import DataTypeViz from './DataTypeViz';
import LogicFlowViz from './LogicFlowViz';
import OperatorViz from './OperatorViz';
import LoopViz from './LoopViz';
import InputOutputViz from './InputOutputViz';
import CalculatorTaskViz from './CalculatorTaskViz';
import {
  WebFundamentalsVisualizer,
  NetworkTopologySimulator,
  ClientServerSimulator,
  ProtocolVisualizer,
  IPAddressSimulator,
  HTMLStructureSimulator
} from './PrereqVisualizers';
import {
  WebFundamentalsInteractive,
  HTMLStructureInteractive,
  HTMLBoilerplateInteractive,
  HTMLHeadingsInteractive,
  HTMLParagraphsInteractive,
  HTMLFormattingInteractive,
  HTMLEntitiesInteractive,
  HTMLPortfolioInteractive
} from './Day1Visualizers';


const EMPTY_CODE = { html: '', css: '', js: '' };

const MainContent = () => {
  const { selectedTopic, setSelectedTopic, refreshAssignments, userAssignments } = useCourse();
  const [snackbar, setSnackbar] = useState({ visible: false, message: '', type: 'success' });

  // Microsoft Learn Docs Resources View State
  const [activeResourcesSection, setActiveResourcesSection] = useState('overview');
  const [checkedDiagnosticTargets, setCheckedDiagnosticTargets] = useState({});
  const [tutorGuideUnlocked, setTutorGuideUnlocked] = useState(false);
  const [tutorPasswordInput, setTutorPasswordInput] = useState('');
  const [activePdfPreview, setActivePdfPreview] = useState(null);
  
  // Interactive Overview widgets state
  const [activeProtocolTab, setActiveProtocolTab] = useState('HTTP');
  const [dnsSearchInput, setDnsSearchInput] = useState('google.com');
  const [dnsResolvedIp, setDnsResolvedIp] = useState('142.250.183.14');
  const [htmlActiveDeconstruct, setHtmlActiveDeconstruct] = useState('HYPER');

  useEffect(() => {
    setActiveResourcesSection('overview');
    setTutorGuideUnlocked(false);
    setTutorPasswordInput('');
    setActivePdfPreview(null);
    setActiveProtocolTab('HTTP');
    setDnsSearchInput('google.com');
    setDnsResolvedIp('142.250.183.14');
    setHtmlActiveDeconstruct('HYPER');

    // Dynamic requirements based on the active assignment / topic
    if (selectedTopic?.id === 't8') {
      setRequirements([
        { id: 'semantic', text: 'Use Semantic Layout Tags (<header>, <main>, <footer>)', regex: /<(header|main|footer).*?>/i, met: false },
        { id: 'headings', text: 'Implement at least 3 Heading Levels (H1, H2, H3)', regex: /<h[1-6].*?>.*?<\/h[1-6]>/gi, count: 3, met: false },
        { id: 'paragraphs', text: 'Include at least 2 Paragraph elements (<p>)', regex: /<p.*?>.*?<\/p>/gi, count: 2, met: false },
        { id: 'formatting', text: 'Use at least 2 inline formatting tags (strong, em, code, mark)', regex: /<(strong|em|code|mark).*?>.*?<\/\1>/gi, count: 2, met: false },
        { id: 'entities', text: 'Escape tags or incorporate a copyright symbol (&lt;, &gt;, &copy;)', regex: /(&lt;|&gt;|&copy;|&amp;|&reg;)/i, met: false },
      ]);
    } else if (selectedTopic?.id === 'd2-t7') {
      setRequirements([
        { id: 'links', text: 'Use at least 3 Anchor links with at least one external (target="_blank")', regex: /<a\s+[^>]*?href\s*=\s*['"][^'"]+['"][^>]*?>.*?<\/a>/gi, count: 3, met: false },
        { id: 'image', text: 'Include an <img> with a descriptive alt attribute (min 5 chars)', regex: /<img\s+[^>]*?alt\s*=\s*['"][^'"]{5,}['"][^>]*?>/i, met: false },
        { id: 'audio', text: 'Embed a playable <audio> track with controls enabled', regex: /<audio\s+[^>]*?controls[^>]*?>/i, met: false },
        { id: 'video', text: 'Embed a playable <video> player with controls enabled', regex: /<video\s+[^>]*?controls[^>]*?>/i, met: false },
        { id: 'iframe', text: 'Embed an <iframe> with sandboxing enabled', regex: /<iframe\s+[^>]*?sandbox[^>]*?>/i, met: false },
        { id: 'meta', text: 'Configure at least 4 <meta> configuration tags (charset, viewport, SEO)', regex: /<meta\s+[^>]*?>/gi, count: 4, met: false },
      ]);
    } else if (selectedTopic?.id === 'd3-t7') {
      setRequirements([
        { id: 'lists', text: 'Include at least 1 list (<ul> or <ol>) with at least 2 items', regex: /<(ul|ol).*?>.*?<li.*?>.*?<\/li>.*?<li.*?>.*?<\/li>.*?<\/\1>/is, met: false },
        { id: 'table', text: 'Build a structural <table> to present schedule details', regex: /<table.*?>.*?<\/table>/is, met: false },
        { id: 'colspan', text: 'Use colspan attribute to merge schedule columns', regex: /colspan\s*=\s*['"]\d+['"]/i, met: false },
        { id: 'rowspan', text: 'Use rowspan attribute to merge schedule rows', regex: /rowspan\s*=\s*['"]\d+['"]/i, met: false },
        { id: 'form', text: 'Add a registration <form> wrapper tag', regex: /<form.*?>.*?<\/form>/is, met: false },
        { id: 'inputs', text: 'Implement text, email, and validation attributes (required)', regex: /type=['"](text|email)['"].*?required|required.*?type=['"](text|email)['"]/i, met: false },
        { id: 'selections', text: 'Include checkboxes (<input type="checkbox">) and submit buttons', regex: /type=['"]checkbox['"]/i, met: false },
      ]);
    } else if (selectedTopic?.title?.toLowerCase()?.includes('mini project') || selectedTopic?.title?.toLowerCase()?.includes('assignment task')) {
      setRequirements([
        { id: 'semantic', text: 'Use HTML Semantic layout structure', regex: /<(div|section|main|header|footer).*?>/i, met: false },
        { id: 'headings', text: 'Implement a structured heading system', regex: /<h[1-6].*?>.*?<\/h[1-6]>/i, met: false },
      ]);
    }
  }, [selectedTopic?.id, selectedTopic?.title]);

  const [requirements, setRequirements] = useState([
    { id: 'semantic', text: 'Use Semantic Layout Tags (<header>, <main>, <footer>)', regex: /<(header|main|footer).*?>/i, met: false },
    { id: 'headings', text: 'Implement at least 3 Heading Levels (H1, H2, H3)', regex: /<h[1-6].*?>.*?<\/h[1-6]>/gi, count: 3, met: false },
    { id: 'paragraphs', text: 'Include at least 2 Paragraph elements (<p>)', regex: /<p.*?>.*?<\/p>/gi, count: 2, met: false },
    { id: 'formatting', text: 'Use at least 2 inline formatting tags (strong, em, code, mark)', regex: /<(strong|em|code|mark).*?>.*?<\/\1>/gi, count: 2, met: false },
    { id: 'entities', text: 'Escape tags or incorporate a copyright symbol (&lt;, &gt;, &copy;)', regex: /(&lt;|&gt;|&copy;|&amp;|&reg;)/i, met: false },
  ]);

  const showSnackbar = (message, type = 'success') => {
    setSnackbar({ visible: true, message, type });
    setTimeout(() => setSnackbar(prev => ({ ...prev, visible: false })), 3000);
  };

  const validateCode = useCallback((codeObj) => {
    const html = codeObj?.html || '';
    setRequirements(prevReqs => {
      let changed = false;
      const updated = prevReqs.map(req => {
        let isMet = false;
        if (req.count) {
          const matches = html.match(req.regex);
          isMet = matches && matches.length >= req.count;
        } else {
          isMet = req.regex.test(html);
        }
        if (isMet !== req.met) changed = true;
        return { ...req, met: isMet };
      });
      return changed ? updated : prevReqs;
    });
  }, []);

  const allTopics = courseData.flatMap(week =>
    week.days.flatMap(day => day.topics)
  );

  let currentDayData = null;
  courseData.forEach(week => {
    week.days.forEach(day => {
      if (day.topics.some(t => t.id === selectedTopic?.id)) {
        currentDayData = day;
      }
    });
  });

  const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
  const isTutorOrAdmin = loggedInUser?.role === 'admin' || loggedInUser?.role === 'superadmin';

  const currentIndex = allTopics.findIndex(t => t.id === selectedTopic?.id);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  // Map of custom visualization components
  const CustomVisuals = {
    'NetworkAnimation': <NetworkAnimation />,
    'FlexboxPlayground': <FlexboxPlayground />,
    'ResponsiveSimulator': <ResponsiveSimulator />,
    'GitTerminal': <GitTerminal />,
    'PlanVisualizer': <PlanVisualizer />,
    'JSRuntimeViz': <JSRuntimeViz />,
    'DOMTreeViz': <DOMTreeViz />,
    'ArrayMethodsViz': <ArrayMethodsViz />,
    'ScopeHoistingViz': <ScopeHoistingViz />,
    'PromiseFlowViz': <PromiseFlowViz />,
    'StorageManagerViz': <StorageManagerViz />,
    'DataTypeViz': <DataTypeViz />,
    'LogicFlowViz': <LogicFlowViz />,
    'OperatorViz': <OperatorViz />,
    'LoopViz': <LoopViz />,
    'InputOutputViz': <InputOutputViz />,
    'CalculatorTaskViz': <CalculatorTaskViz />,
    'WebFundamentalsVisualizer': <WebFundamentalsVisualizer />,
    'NetworkProtocolsVisualizer': (() => {
      const topicIdNum = parseInt(selectedTopic?.id?.replace('w1-d0-t', '') || '0');
      if (topicIdNum === 2) {
        return <NetworkTopologySimulator />;
      } else if (topicIdNum === 3) {
        return <ClientServerSimulator />;
      } else if (topicIdNum === 4) {
        return <ProtocolVisualizer />;
      } else if (topicIdNum === 5) {
        return <IPAddressSimulator />;
      } else if (topicIdNum >= 6 && topicIdNum <= 12) {
        return <NetworkTopologySimulator />;
      } else if (topicIdNum === 13) {
        return <ClientServerSimulator />;
      } else if (topicIdNum >= 14 && topicIdNum <= 22) {
        return <ProtocolVisualizer />;
      } else if (topicIdNum >= 23 && topicIdNum <= 26) {
        return <IPAddressSimulator />;
      } else if (topicIdNum === 27 || topicIdNum === 28) {
        return <ProtocolVisualizer />;
      }
      return <ProtocolVisualizer />;
    })(),
    'HTMLBoilerplateVisualizer': <HTMLStructureSimulator />,
    'WebFundamentalsInteractive': <WebFundamentalsInteractive />,
    'HTMLStructureInteractive': <HTMLStructureInteractive />,
    'HTMLBoilerplateInteractive': <HTMLBoilerplateInteractive />,
    'HTMLHeadingsInteractive': <HTMLHeadingsInteractive />,
    'HTMLParagraphsInteractive': <HTMLParagraphsInteractive />,
    'HTMLFormattingInteractive': <HTMLFormattingInteractive />,
    'HTMLEntitiesInteractive': <HTMLEntitiesInteractive />,
    'HTMLPortfolioInteractive': <HTMLPortfolioInteractive />
  };

  if (!selectedTopic) return <div className="main-content">Select a topic to start learning</div>;

  if (selectedTopic.isResources) {
    const dayId = currentDayData?.dayId || 'w1-d0';
    const diagnosticTargets = dayId === 'w1-d0' ? [
      "Explain the differences between a Client and a Server node.",
      "Understand how DNS translates hostnames into numeric IP addresses.",
      "Identify the core syntax structure of a standard HTML boilerplate document.",
      "Explain why HTML Entities like &lt; are mandatory for reserved tags.",
      "Describe how physical tags differ from semantic formatting elements."
    ] : [
      "Construct a valid semantic document structure with header, main, and footer.",
      "Differentiate absolute URL links from relative directory links.",
      "Apply margins, block wraps, and hard line-breaks appropriately.",
      "Demonstrate accessibility features like alt tags on images.",
      "Write comments to annotate development blocks cleanly."
    ];

    const completedCountReal = diagnosticTargets.filter(t => checkedDiagnosticTargets[t]).length;
    const progressPercent = Math.round((completedCountReal / diagnosticTargets.length) * 100);

    const sections = [
      { id: 'overview', title: 'Overview & Objectives', icon: <BookOpen size={16} /> },
    ];

    selectedTopic.tutorMaterial?.resources?.forEach((res, idx) => {
      sections.push({
        id: `deck-${idx}`,
        title: res,
        icon: <FileText size={16} />
      });
    });

    sections.push(
      { id: 'tutor', title: 'Confidential Lesson Plan', icon: <ShieldCheck size={16} /> }
    );

    const renderOverviewIllustration = () => {
      if (dayId === 'w1-d0') {
        return (
          <div className="interactive-illustration-pane">
            <div className="tech-node client-node">
              <div className="tech-node-icon"><Laptop size={24} /></div>
              <span>Client Browser</span>
              <small className="ip-pill">IP: 192.168.1.45</small>
            </div>

            <div className="animated-pipeline">
              <div className="packet packet-request"></div>
              <div className="packet packet-response"></div>
              <div className="pipeline-line"></div>
              <span className="pipeline-label">HTTPS REST Transaction</span>
            </div>

            <div className="tech-node server-node">
              <div className="tech-node-icon"><Server size={24} /></div>
              <span>Web Server</span>
              <small className="ip-pill">IP: 104.244.42.1</small>
            </div>
          </div>
        );
      } else {
        return (
          <div className="interactive-illustration-pane html-dom-pane">
            <div className="dom-node-mock tag-html">
              &lt;html&gt;
              <div className="dom-node-mock tag-head">&lt;head&gt; (Metadata & Title)</div>
              <div className="dom-node-mock tag-body">
                &lt;body&gt; (Visible Elements)
                <div className="dom-node-mock tag-h1">&lt;h1&gt; Heading Title</div>
                <div className="dom-node-mock tag-p">&lt;p&gt; Paragraph Content &lt;/p&gt;</div>
              </div>
            </div>
          </div>
        );
      }
    };

    const isResourceSection = activeResourcesSection.startsWith('deck-');
    let selectedResourceName = '';
    if (isResourceSection) {
      const idx = parseInt(activeResourcesSection.replace('deck-', ''));
      selectedResourceName = selectedTopic.tutorMaterial?.resources?.[idx] || '';
    }

    return (
      <main className="main-content resources-doc-style">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTopic.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="docs-layout-wrapper"
          >

            {/* Header Area */}
            <div className="docs-page-header">
              <div className="doc-meta-badge">SYLLABUS PORTAL</div>
              <h1>{selectedTopic.title}</h1>
              <p className="resources-intro">
                Interactive Microsoft Learn Docs styled curriculum space. Access conceptual models, diagnostic tasks, and private lesson guides directly.
              </p>
            </div>

            {/* Split Grid */}
            <div className="docs-main-container">

              {/* Left Navigation Sidebar */}
              <aside className="docs-nav-sidebar">
                <div className="sidebar-group-title">Table of Contents</div>
                <ul className="sidebar-nav-list">
                  {sections.map((sec) => {
                    const isActive = activeResourcesSection === sec.id;
                    const isRestricted = sec.id === 'tutor' && !isTutorOrAdmin && !tutorGuideUnlocked;

                    return (
                      <li key={sec.id}>
                        <button
                          className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                          onClick={() => setActiveResourcesSection(sec.id)}
                        >
                          <span className="nav-item-icon">{sec.icon}</span>
                          <span className="nav-item-title">{sec.title}</span>
                          {isRestricted && <span className="lock-badge"><Lock size={10} /></span>}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </aside>

              {/* Right Content Pane */}
              <div className="docs-content-pane">

                {activeResourcesSection === 'overview' && (
                  <div className="docs-section-card animate-fade">
                    <div className="docs-section-header">
                      <h2>1. Learning Path & Key Takeaways</h2>
                      <span className="duration-pill"><Clock size={12} /> Prep Time: 15 mins</span>
                    </div>

                    <p className="docs-paragraph">
                      Welcome to your learning resources page. Today's curriculum has been curated to build solid structural Web development foundations. Below is an interactive schema mapping the fundamental concepts covered in today's lectures.
                    </p>

                    <div className="overview-illustration-container">
                      <div className="illustration-header">
                        <div className="circle-dot red"></div>
                        <div className="circle-dot yellow"></div>
                        <div className="circle-dot green"></div>
                        <span className="illustration-title">Core Web Mechanics Blueprint</span>
                      </div>
                      {renderOverviewIllustration()}
                    </div>

                    <div className="objectives-checklist-box">
                      <h3>Core Objectives Breakdown</h3>
                      <div className="objective-cards-grid">
                        <div className="objective-mini-card">
                          <span className="card-num">01</span>
                          <h4>Conceptual Mastery</h4>
                          <p>Analyze how hypermedia files compile inside major parsing architectures.</p>
                        </div>
                        <div className="objective-mini-card">
                          <span className="card-num">02</span>
                          <h4>Grammatical Rules</h4>
                          <p>Adopt precise opening and nesting rules with standards-compliant validations.</p>
                        </div>
                        <div className="objective-mini-card">
                          <span className="card-num">03</span>
                          <h4>Lab Readiness</h4>
                          <p>Ensure your offline environments are active and inspect-enabled.</p>
                        </div>
                      </div>
                    </div>

                    {/* Add Premium Web Fundamentals Syllabus Notes */}
                    <div className="syllabus-notes-container" style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                      
                      {/* Section 1: Web Development Breakdown */}
                      <div className="syllabus-note-block" style={{ borderTop: '1px solid var(--app-border)', paddingTop: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                          <span style={{ background: 'rgba(0, 209, 209, 0.1)', color: 'var(--primary-cyan)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800 }}>CONCEPT 01</span>
                          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>Fundamentals of Web Development</h3>
                        </div>
                        <p className="docs-paragraph" style={{ marginBottom: '20px' }}>
                          Web Development is the process of creating, building, and maintaining websites or web applications that run on the internet. It involves designing the user interface, developing server-side functionality, managing databases, and ensuring smooth communication between different systems.
                        </p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                          <div className="objective-mini-card" style={{ borderLeft: '3px solid var(--primary-cyan)' }}>
                            <h4 style={{ color: 'var(--primary-cyan)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <Laptop size={16} /> Frontend Development
                            </h4>
                            <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                              Focuses on the visual part of a website that users interact with using technologies like HTML, CSS, and JavaScript.
                            </p>
                          </div>
                          
                          <div className="objective-mini-card" style={{ borderLeft: '3px solid #a855f7' }}>
                            <h4 style={{ color: '#a855f7', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <Server size={16} /> Backend Development
                            </h4>
                            <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                              Handles server-side logic, databases, authentication, and APIs using technologies like Node.js, Python, Java, PHP, etc.
                            </p>
                          </div>
                          
                          <div className="objective-mini-card" style={{ borderLeft: '3px solid #10b981' }}>
                            <h4 style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <Layers size={16} /> Full Stack Development
                            </h4>
                            <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                              Combines both frontend and backend development to design, deploy, and scale complete software platforms.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Network & Connection */}
                      <div className="syllabus-note-block" style={{ borderTop: '1px solid var(--app-border)', paddingTop: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                          <span style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800 }}>CONCEPT 02</span>
                          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>Understanding Computer Networks</h3>
                        </div>
                        <p className="docs-paragraph" style={{ marginBottom: '20px' }}>
                          A network literally translates to <strong>“connection”</strong>. In computer science, a Network is a collection of interconnected devices such as computers, servers, mobile phones, and routers that communicate and share resources with each other.
                        </p>

                        <div style={{ background: 'var(--light-secondary)', borderRadius: '12px', border: '1px solid var(--app-border)', padding: '20px', marginBottom: '20px' }}>
                          <h4 style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Globe size={16} /> Classification & Coverage Range Comparison
                          </h4>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                            {[
                              { type: 'PAN', name: 'Personal Area Network', range: '1 to 10 meters', ex: 'Bluetooth, Hotspot', col: '#00d1d1' },
                              { type: 'LAN', name: 'Local Area Network', range: 'Up to 1 kilometer', ex: 'Office Wi-Fi, Computer Lab', col: '#38bdf8' },
                              { type: 'MAN', name: 'Metropolitan Area Network', range: '1 to 50 kilometers', ex: 'City Cable TV, Campus Network', col: '#a855f7' },
                              { type: 'WAN', name: 'Wide Area Network', range: 'Over 50 kilometers', ex: 'Internet, Global Banking', col: '#10b981' }
                            ].map(net => (
                              <div key={net.type} style={{ background: '#0f172a', border: '1px solid var(--app-border)', padding: '16px', borderRadius: '10px' }}>
                                <span style={{ color: net.col, fontWeight: '800', fontSize: '1.1rem', display: 'block', marginBottom: '4px' }}>{net.type}</span>
                                <span style={{ fontSize: '0.75rem', color: 'white', fontWeight: '700', display: 'block', marginBottom: '8px' }}>{net.name}</span>
                                <div style={{ fontSize: '0.7rem', color: '#cbd5e1', marginBottom: '4px' }}>
                                  <strong>Range:</strong> {net.range}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>
                                  <strong>Examples:</strong> {net.ex}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Section 3: The Internet & Protocols Hub */}
                      <div className="syllabus-note-block" style={{ borderTop: '1px solid var(--app-border)', paddingTop: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                          <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800 }}>CONCEPT 03</span>
                          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>The Internet & Communication Protocols</h3>
                        </div>
                        <p className="docs-paragraph" style={{ marginBottom: '20px' }}>
                          The <strong>Internet</strong> is a global network of interconnected computers and devices that communicate using standardized protocols. 
                          A <strong>Protocol</strong> is a strict set of rules and standards defining how data is formatted, transmitted, and validated across a network.
                        </p>

                        <div style={{ background: 'var(--light-secondary)', borderRadius: '12px', border: '1px solid var(--app-border)', padding: '24px' }}>
                          <h4 style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: 'white' }}>Common Protocols in Web Development (Click to Learn)</h4>
                          
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                            {[
                              { id: 'HTTP' },
                              { id: 'HTTPS' },
                              { id: 'TCP' },
                              { id: 'IP' },
                              { id: 'DNS' },
                              { id: 'FTP' },
                              { id: 'SMTP' },
                              { id: 'WebSocket' }
                            ].map(p => (
                              <button 
                                key={p.id}
                                onClick={() => setActiveProtocolTab(p.id)}
                                style={{
                                  padding: '8px 14px',
                                  fontSize: '0.75rem',
                                  fontWeight: '700',
                                  borderRadius: '8px',
                                  border: '1px solid',
                                  borderColor: activeProtocolTab === p.id ? 'var(--primary-cyan)' : 'var(--app-border)',
                                  background: activeProtocolTab === p.id ? 'rgba(0, 209, 209, 0.1)' : '#0f172a',
                                  color: activeProtocolTab === p.id ? 'var(--primary-cyan)' : '#cbd5e1',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                {p.id}
                              </button>
                            ))}
                          </div>

                          <div style={{ background: '#0f172a', border: '1px solid var(--app-border)', padding: '16px', borderRadius: '8px', minHeight: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--primary-cyan)', fontWeight: '800', display: 'block', marginBottom: '6px' }}>
                              {activeProtocolTab} Protocol Details
                            </span>
                            <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                              {[
                                { id: 'HTTP', desc: 'HTTP (HyperText Transfer Protocol) - Used for transferring web pages between client browsers and web servers.' },
                                { id: 'HTTPS', desc: 'HTTPS (HyperText Transfer Protocol Secure) - A secure version of HTTP that encrypts data using SSL/TLS.' },
                                { id: 'TCP', desc: 'TCP (Transmission Control Protocol) - Ensures reliable and ordered delivery of data between systems.' },
                                { id: 'IP', desc: 'IP (Internet Protocol) - Responsible for identifying devices and routing data packets across networks.' },
                                { id: 'DNS', desc: 'DNS (Domain Name System) - Converts domain names into IP addresses.' },
                                { id: 'FTP', desc: 'FTP (File Transfer Protocol) - Used for transferring files between computers and servers.' },
                                { id: 'SMTP', desc: 'SMTP (Simple Mail Transfer Protocol) - Used for sending emails.' },
                                { id: 'WebSocket', desc: 'WebSocket - Enables real-time two-way communication between client and server.' }
                              ].find(item => item.id === activeProtocolTab)?.desc}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Section 4: IP Address & DNS Phonebook Resolution */}
                      <div className="syllabus-note-block" style={{ borderTop: '1px solid var(--app-border)', paddingTop: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                          <span style={{ background: 'rgba(0, 209, 209, 0.1)', color: 'var(--primary-cyan)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800 }}>CONCEPT 04</span>
                          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>IP Addresses & The DNS “Phonebook”</h3>
                        </div>
                        
                        <p className="docs-paragraph" style={{ marginBottom: '20px' }}>
                          An <strong>IP Address</strong> (Internet Protocol Address) is a unique numerical identifier assigned to each device connected to a network. It helps devices identify and communicate with each other. 
                          <strong>DNS</strong> (Domain Name System) translates human-readable domain names into numeric IP addresses that computers can route.
                        </p>

                        <div style={{ background: 'var(--light-secondary)', border: '1px solid var(--app-border)', borderRadius: '12px', padding: '24px' }}>
                          <h4 style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: 'white' }}>Interactive DNS Phonebook Translation Simulator</h4>
                          
                          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', maxWidth: '480px' }}>
                            <select 
                              value={dnsSearchInput}
                              onChange={(e) => {
                                setDnsSearchInput(e.target.value);
                                const ipMap = {
                                  'google.com': '142.250.183.14',
                                  'wikipedia.org': '208.80.154.224',
                                  'github.com': '140.82.113.3',
                                  'wemade.logix': '192.168.1.1'
                                };
                                setDnsResolvedIp(ipMap[e.target.value] || '0.0.0.0');
                              }}
                              style={{
                                flex: 1,
                                padding: '10px 16px',
                                fontSize: '0.85rem',
                                background: '#0f172a',
                                border: '1px solid var(--app-border)',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none'
                              }}
                            >
                              <option value="google.com">google.com</option>
                              <option value="wikipedia.org">wikipedia.org</option>
                              <option value="github.com">github.com</option>
                              <option value="wemade.logix">wemade.logix</option>
                            </select>
                          </div>

                          <div style={{ background: '#0f172a', border: '1px solid var(--app-border)', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justify_content: 'space-between', borderBottom: '1px dashed var(--app-border)', paddingBottom: '10px' }}>
                              <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>1. Domain Target Request:</span>
                              <strong style={{ fontSize: '0.85rem', color: 'var(--primary-cyan)' }}>{dnsSearchInput}</strong>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', justify_content: 'space-between', borderBottom: '1px dashed var(--app-border)', paddingBottom: '10px' }}>
                              <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>2. DNS lookup action:</span>
                              <span style={{ fontSize: '0.75rem', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
                                Translating via DNS "Phonebook"...
                              </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justify_content: 'space-between' }}>
                              <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>3. Resolved Server IP:</span>
                              <strong style={{ fontSize: '0.95rem', color: '#10b981', letterSpacing: '0.5px' }}>{dnsResolvedIp}</strong>
                            </div>
                          </div>
                          
                          <div style={{ marginTop: '16px', display: 'flex', gap: '8px', fontSize: '0.72rem', color: '#94a3b8' }}>
                            <span style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', border: '1px solid var(--app-border)', color: '#cbd5e1' }}>Static IP: Address never changes</span>
                            <span style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', border: '1px solid var(--app-border)', color: '#cbd5e1' }}>Dynamic IP: Changes periodically</span>
                          </div>
                        </div>
                      </div>

                      {/* Section 5: HTML Word Deconstruction */}
                      <div className="syllabus-note-block" style={{ borderTop: '1px solid var(--app-border)', paddingTop: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                          <span style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800 }}>CONCEPT 05</span>
                          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>Deconstructing HTML (HyperText Markup Language)</h3>
                        </div>
                        
                        <p className="docs-paragraph" style={{ marginBottom: '20px' }}>
                          Let's deconstruct the core components of the foundational structural layout standard: <strong>HTML</strong>.
                        </p>

                        <div style={{ background: 'var(--light-secondary)', border: '1px solid var(--app-border)', borderRadius: '12px', padding: '24px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
                            {[
                              { id: 'HYPER', tag: 'H', label: 'HyperText' },
                              { id: 'TEXT', tag: 'T', label: 'Text' },
                              { id: 'MARKUP', tag: 'M', label: 'Markup' },
                              { id: 'LANGUAGE', tag: 'L', label: 'Language' }
                            ].map(btn => (
                              <button
                                key={btn.id}
                                onClick={() => setHtmlActiveDeconstruct(btn.id)}
                                style={{
                                  padding: '16px 8px',
                                  borderRadius: '10px',
                                  border: '1px solid',
                                  borderColor: htmlActiveDeconstruct === btn.id ? '#a855f7' : 'var(--app-border)',
                                  background: htmlActiveDeconstruct === btn.id ? 'rgba(168, 85, 247, 0.1)' : '#0f172a',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                  textAlign: 'center'
                                }}
                              >
                                <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: '900', color: htmlActiveDeconstruct === btn.id ? '#a855f7' : 'white' }}>{btn.tag}</span>
                                <span style={{ display: 'block', fontSize: '0.65rem', color: htmlActiveDeconstruct === btn.id ? '#a855f7' : '#cbd5e1', marginTop: '4px' }}>{btn.label}</span>
                              </button>
                            ))}
                          </div>

                          <div style={{ background: '#0f172a', border: '1px solid var(--app-border)', padding: '20px', borderRadius: '8px' }}>
                            {htmlActiveDeconstruct === 'HYPER' && (
                              <div>
                                <span style={{ fontSize: '0.8rem', color: '#a855f7', fontWeight: '800', display: 'block', marginBottom: '6px' }}>HYPER (More + Fast + Connected)</span>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.6' }}>
                                  <strong>Hyper</strong> means jumping from one page to another quickly. When you click a link on a website and it opens another page — that jumping action is hyper.
                                </p>
                              </div>
                            )}

                            {htmlActiveDeconstruct === 'TEXT' && (
                              <div>
                                <span style={{ fontSize: '0.8rem', color: '#a855f7', fontWeight: '800', display: 'block', marginBottom: '6px' }}>TEXT (Words, Letters, and Characters)</span>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.6' }}>
                                  <strong>Text</strong> means standard alphabetical characters and symbols. Anything typed on a computer — like "Hello", "Welcome", or "About Us" — is text.
                                </p>
                              </div>
                            )}

                            {htmlActiveDeconstruct === 'MARKUP' && (
                              <div>
                                <span style={{ fontSize: '0.8rem', color: '#a855f7', fontWeight: '800', display: 'block', marginBottom: '6px' }}>MARKUP (Tags for Formatting Structure)</span>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.6' }}>
                                  <strong>Markup</strong> means giving special instructions using tags to tell the computer: This is a heading <code style={{ color: '#c084fc', background: 'rgba(168, 85, 247, 0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(168, 85, 247, 0.2)', fontSize: '0.78rem', fontFamily: 'monospace' }}>&lt;h1&gt;</code>, this is a paragraph <code style={{ color: '#c084fc', background: 'rgba(168, 85, 247, 0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(168, 85, 247, 0.2)', fontSize: '0.78rem', fontFamily: 'monospace' }}>&lt;p&gt;</code>, this is an image <code style={{ color: '#c084fc', background: 'rgba(168, 85, 247, 0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(168, 85, 247, 0.2)', fontSize: '0.78rem', fontFamily: 'monospace' }}>&lt;img&gt;</code>, or this is a link <code style={{ color: '#c084fc', background: 'rgba(168, 85, 247, 0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(168, 85, 247, 0.2)', fontSize: '0.78rem', fontFamily: 'monospace' }}>&lt;a&gt;</code>.
                                </p>
                              </div>
                            )}

                            {htmlActiveDeconstruct === 'LANGUAGE' && (
                              <div>
                                <span style={{ fontSize: '0.8rem', color: '#a855f7', fontWeight: '800', display: 'block', marginBottom: '6px' }}>LANGUAGE (Browser Communication standard)</span>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.6' }}>
                                  <strong>Language</strong> means a language used to communicate with the computer. Just like we speak English, Telugu, or Hindi, we use HTML to tell the browser what to show, where to show, and how.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {isResourceSection && (
                  <div className="docs-section-card animate-fade secure-deck-viewport" style={{ padding: '30px 36px' }}>
                    <div className="docs-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--app-border)', paddingBottom: '16px', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="file-format-tag" style={{ background: '#10b981' }}>SECURE PDF</span>
                        <h2 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 700, color: 'var(--app-text)' }}>{selectedResourceName}</h2>
                      </div>
                      <span className="pdf-in-app-badge" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '6px 12px', borderRadius: '20px', fontWeight: '700' }}>
                        <Lock size={12} /> Secure In-App Viewer Only
                      </span>
                    </div>

                    <div className="pdf-paper-page inline-paper-page" style={{ padding: '0', background: 'transparent', color: 'var(--app-text)', boxShadow: 'none' }}>
                      <div className="paper-header" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--app-text-muted)', borderBottom: '1px solid var(--app-border)', paddingBottom: '8px', marginBottom: '24px' }}>
                        <span>Wemade Logix Educational Deck Series</span>
                        <span>Doc-Ref #49821</span>
                      </div>

                      <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 6px 0', color: 'white' }}>{selectedResourceName}</h2>

                      <div className="paper-divider" style={{ height: '1px', background: 'var(--app-border)', margin: '16px 0' }}></div>

                      <div className="paper-section-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <h3 style={{ color: 'white', borderLeft: '3px solid var(--primary-cyan)', paddingLeft: '8px', fontSize: '1.1rem', margin: '20px 0 10px 0', fontWeight: '700' }}>1. Context & Introduction</h3>
                        <p className="docs-paragraph" style={{ margin: 0, fontSize: '0.98rem', lineHeight: '1.6', color: 'var(--app-text-muted)' }}>
                          This document serves as the official educational reference for today's curricular targets. Master standard structural standards and lexical parsing techniques to facilitate frictionless integration with future backend systems.
                        </p>

                        <h3 style={{ color: 'white', borderLeft: '3px solid var(--primary-cyan)', paddingLeft: '8px', fontSize: '1.1rem', margin: '20px 0 10px 0', fontWeight: '700' }}>2. Essential Terminology Matrix</h3>
                        <div className="table-responsive" style={{ overflowX: 'auto', margin: '14px 0' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--app-border)', fontSize: '0.85rem' }}>
                            <thead>
                              <tr style={{ background: 'var(--light-secondary)', textAlign: 'left', borderBottom: '1px solid var(--app-border)' }}>
                                <th style={{ padding: '12px', color: 'white', fontWeight: '700' }}>Term</th>
                                <th style={{ padding: '12px', color: 'white', fontWeight: '700' }}>Definition</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr style={{ borderBottom: '1px solid var(--app-border)' }}>
                                <td style={{ padding: '12px', fontWeight: '700', color: 'var(--primary-cyan)' }}>HyperText</td>
                                <td style={{ padding: '12px', color: 'var(--app-text-muted)' }}>Linked document networks forming hyper-media pipelines across isolated machines.</td>
                              </tr>
                              <tr style={{ borderBottom: '1px solid var(--app-border)' }}>
                                <td style={{ padding: '12px', fontWeight: '700', color: 'var(--primary-cyan)' }}>Markup Language</td>
                                <td style={{ padding: '12px', color: 'var(--app-text-muted)' }}>Syntactical tags mapping string values directly into browser visual models (DOM).</td>
                              </tr>
                              <tr style={{ borderBottom: '1px solid var(--app-border)' }}>
                                <td style={{ padding: '12px', fontWeight: '700', color: 'var(--primary-cyan)' }}>Boilerplate</td>
                                <td style={{ padding: '12px', color: 'var(--app-text-muted)' }}>The minimum grammatical elements required to boot standards-compliant render streams.</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="paper-diagram-mock" style={{ background: '#0f172a', border: '1px solid var(--app-border)', borderRadius: '12px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', margin: '20px 0' }}>
                          <div className="mock-diagram-circle" style={{ background: 'rgba(0, 209, 209, 0.08)', border: '1px solid rgba(0, 209, 209, 0.2)', width: '72px', height: '72px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '800', color: 'var(--primary-cyan)' }}>DOM</div>
                          <span className="arrow-flow" style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-neutral)' }}>→</span>
                          <div className="mock-diagram-circle" style={{ background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.2)', width: '72px', height: '72px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '800', color: '#a855f7' }}>RENDER</div>
                        </div>

                        <h3 style={{ color: 'white', borderLeft: '3px solid var(--primary-cyan)', paddingLeft: '8px', fontSize: '1.1rem', margin: '20px 0 10px 0', fontWeight: '700' }}>3. Practical Labs & Exercises</h3>
                        <p className="docs-paragraph" style={{ margin: 0, fontSize: '0.98rem', lineHeight: '1.6', color: 'var(--app-text-muted)' }}>
                          Construct, compile, and validate offline HTML structures using live debugger inspections. Always check entity escape parameters to guarantee safe glyph rendering under different localization sets.
                        </p>
                      </div>

                      <div className="paper-footer" style={{ marginTop: '30px', borderTop: '1px solid var(--app-border)', paddingTop: '16px', display: 'flex', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--text-neutral)' }}>
                        <span>Secure Learning Platform Courseware • Page 1 of 12</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeResourcesSection === 'diagnostic' && (
                  <div className="docs-section-card animate-fade">
                    <div className="docs-section-header">
                      <h2>3. Knowledge Verification Check</h2>
                      <span className="progress-badge-glow">{progressPercent}% Achieved</span>
                    </div>
                    <p className="docs-paragraph">
                      Verify your command of today's topics by checking off the key learning milestones. Self-evaluate carefully before initiating course checkpoints or quizzes.
                    </p>

                    <div className="diagnostic-progress-container">
                      <div className="progress-label-row">
                        <span>Checklist Completion Status</span>
                        <span>{completedCountReal} of {diagnosticTargets.length} targets</span>
                      </div>
                      <div className="diagnostic-progress-bar-track">
                        <div
                          className="diagnostic-progress-bar-fill"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="diagnostic-checklist-list">
                      {diagnosticTargets.map((target, idx) => {
                        const isChecked = !!checkedDiagnosticTargets[target];
                        return (
                          <div
                            key={idx}
                            className={`diagnostic-checklist-row ${isChecked ? 'active' : ''}`}
                            onClick={() => setCheckedDiagnosticTargets(prev => ({
                              ...prev,
                              [target]: !prev[target]
                            }))}
                          >
                            <div className={`checklist-checkbox ${isChecked ? 'checked' : ''}`}>
                              {isChecked && <span>✓</span>}
                            </div>
                            <span className="checklist-text">{target}</span>
                          </div>
                        );
                      })}
                    </div>

                    {progressPercent === 100 && (
                      <div className="checklist-success-banner">
                        <CheckCircle2 size={24} className="banner-success-icon" />
                        <div>
                          <h4>Day Milestone Completed!</h4>
                          <p>Fantastic! You have answered all diagnostic points and are fully ready to tackle today's lab assignments.</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeResourcesSection === 'tutor' && (
                  <div className="docs-section-card animate-fade" style={{ padding: 0, background: 'transparent', boxShadow: 'none', position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
                    
                    {/* Secure Watermark Overlay */}
                    <div className="secure-watermark-overlay" style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      pointerEvents: 'none',
                      zIndex: 10,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0.10,
                      userSelect: 'none',
                      transform: 'rotate(-25deg)',
                      transformOrigin: 'center center'
                    }}>
                      <img 
                        src="/fav_icon.png" 
                        alt="Watermark Logo" 
                        style={{ 
                          width: '150px', 
                          height: '150px', 
                          marginBottom: '16px',
                          objectFit: 'contain'
                        }} 
                      />
                      <span style={{ 
                        fontSize: '3.2rem', 
                        fontWeight: '900', 
                        letterSpacing: '8px', 
                        color: 'white',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                      }}>
                        CONFIDENTIAL
                      </span>
                    </div>

                    <iframe 
                      src={`${Day1MernPdf}#toolbar=0&navpanes=0&scrollbar=0`} 
                      width="100%" 
                      height="750px" 
                      style={{ border: 'none', borderRadius: '12px', background: 'white', display: 'block' }}
                      title="Instructor Deck Preview"
                    ></iframe>
                  </div>
                )}

              </div>

            </div>

            {/* Navigation Buttons */}
            <div className="navigation-footer">
              {prevTopic ? (
                <button className="nav-btn prev" onClick={() => setSelectedTopic(prevTopic)}>
                  <div className="nav-icon"><ArrowLeft size={20} /></div>
                  <div className="nav-text">
                    <span className="nav-label">Previous Topic</span>
                    <span className="nav-title">{prevTopic.title}</span>
                  </div>
                </button>
              ) : <div />}

              {nextTopic && (
                <button className="nav-btn next" onClick={() => setSelectedTopic(nextTopic)}>
                  <div className="nav-text">
                    <span className="nav-label">Next Topic</span>
                    <span className="nav-title">{nextTopic.title}</span>
                  </div>
                  <div className="nav-icon"><ArrowRight size={20} /></div>
                </button>
              )}
            </div>

            <footer className="content-footer">
              <p>© 2024 MERN Training Platform. Interactive Learning Experience.</p>
            </footer>
          </motion.div>
        </AnimatePresence>

        <style dangerouslySetInnerHTML={{
          __html: `
           /* Microsoft Learn / Docs Page Styles */
           .resources-doc-style {
             padding: 0;
             width: 100%;
             max-width: 100%;
             margin: 0;
           }
           
           /* Custom styled bottom navigation footer */
           .navigation-footer { 
             display: flex; 
             justify-content: space-between; 
             gap: var(--space-4); 
             margin-top: var(--space-8); 
             padding: var(--space-8) 0; 
             border-top: 1px solid var(--app-border); 
           }
           .nav-btn { 
             flex: 1; 
             display: flex; 
             align-items: center; 
             gap: var(--space-4); 
             padding: var(--space-4); 
             background: var(--app-card-bg); 
             border: 1px solid var(--app-border); 
             border-radius: var(--radius-lg); 
             cursor: pointer; 
             transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
             text-align: left; 
             max-width: 380px; 
             position: relative; 
             overflow: hidden; 
           }
           .nav-btn:hover { 
             background: var(--brand-gradient);
             border-color: transparent;
             transform: translateY(-4px); 
             box-shadow: var(--glow);
           }
           .nav-btn:hover .nav-label {
             color: white !important;
           }
           .nav-btn:hover .nav-title {
             color: white !important;
           }
           .nav-btn.next { 
             text-align: right; 
             justify-content: flex-end; 
             margin-left: auto;
           }
           .nav-text { 
             display: flex; 
             flex-direction: column; 
             overflow: hidden; 
             z-index: 1; 
           }
           .nav-label { 
             font-size: 0.7rem; 
             text-transform: uppercase; 
             color: #64748b; 
             font-weight: 700; 
             letter-spacing: 1px; 
             margin-bottom: 4px; 
             transition: color 0.3s; 
           }
           .nav-title { 
             font-size: 0.95rem; 
             font-weight: 600; 
             color: var(--app-text); 
             white-space: nowrap; 
             overflow: hidden; 
             text-overflow: ellipsis; 
             transition: color 0.3s; 
           }
           .nav-icon { 
             width: 48px;
             height: 48px;
             background: rgba(0, 209, 209, 0.1);
             border: 1px solid var(--app-border);
             border-radius: 12px;
             display: flex; 
             align-items: center; 
             justify-content: center; 
             color: var(--primary-cyan);
             flex-shrink: 0; 
             transition: all 0.3s; 
             z-index: 1; 
           }
           .nav-btn:hover .nav-icon {
             background: rgba(255, 255, 255, 0.2) !important;
             color: white !important;
             border-color: transparent !important;
           }
           .content-footer { 
             margin-top: 24px; 
             padding: 24px 0; 
             text-align: center; 
             font-size: 0.8rem; 
             color: #64748b; 
             border-top: 1px solid var(--app-border); 
           }

           @media (max-width: 768px) {
             .navigation-footer { flex-direction: column; gap: 16px; }
             .nav-btn { max-width: none; }
           }

           .docs-layout-wrapper {
             display: flex;
             flex-direction: column;
             gap: 24px;
             padding: 32px 24px;
           }
          .docs-page-header {
            margin-bottom: 8px;
            border-bottom: 1px solid var(--app-border);
            padding-bottom: 20px;
          }
          .doc-meta-badge {
            background: rgba(168, 85, 247, 0.1);
            color: #a855f7;
            border: 1px solid rgba(168, 85, 247, 0.2);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.5px;
            display: inline-block;
            margin-bottom: 10px;
            text-transform: uppercase;
          }
          .docs-page-header h1 {
            font-size: 2.2rem;
            font-weight: 800;
            margin: 0 0 10px 0;
            background: linear-gradient(135deg, var(--app-text) 30%, var(--primary-cyan) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .resources-intro {
            font-size: 1.05rem;
            color: var(--app-text-muted);
            line-height: 1.6;
            margin: 0;
          }

          /* Two column main container */
          .docs-main-container {
            display: grid;
            grid-template-columns: 260px 1fr;
            gap: 32px;
            align-items: start;
          }

          /* Sidebar Styling */
          .docs-nav-sidebar {
            background: var(--app-card-bg);
            border-radius: var(--radius-xl);
            border: 1px solid var(--app-border);
            padding: var(--space-4);
            position: sticky;
            top: 24px;
          }
          .sidebar-group-title {
            font-size: 0.7rem;
            font-weight: 800;
            color: var(--text-neutral);
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 12px;
            padding-left: var(--space-2);
          }
          .sidebar-nav-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .sidebar-nav-item {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 14px;
            border-radius: 10px;
            background: transparent;
            border: 1px solid transparent;
            color: var(--app-text-muted);
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            text-align: left;
            transition: all 0.2s ease;
          }
          .sidebar-nav-item:hover {
            background: var(--light-secondary);
            color: var(--app-text);
          }
          .sidebar-nav-item.active {
            background: rgba(0, 209, 209, 0.08);
            border-color: rgba(0, 209, 209, 0.2);
            color: var(--primary-cyan);
          }
          .nav-item-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.8;
          }
          .nav-item-title {
            flex-grow: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .lock-badge {
            color: var(--text-neutral);
            opacity: 0.6;
            display: flex;
            align-items: center;
          }

          /* Content pane styling */
          .docs-content-pane {
            min-height: 400px;
          }
          .docs-section-card {
            background: var(--app-card-bg);
            border-radius: var(--radius-xl);
            border: 1px solid var(--app-border);
            padding: 32px;
            box-shadow: var(--shadow-md);
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .docs-section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--app-border);
            padding-bottom: 16px;
            margin-bottom: 4px;
            flex-wrap: wrap;
            gap: 12px;
          }
          .docs-section-header h2 {
            margin: 0;
            font-size: 1.45rem;
            font-weight: 700;
            color: var(--app-text);
          }
          .duration-pill {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.8rem;
            font-weight: 700;
            background: rgba(0, 209, 209, 0.06);
            color: var(--primary-cyan);
            padding: 6px 14px;
            border-radius: 20px;
            border: 1px solid rgba(0, 209, 209, 0.12);
          }
          .duration-pill.purple {
            background: rgba(168, 85, 247, 0.06);
            color: #a855f7;
            border-color: rgba(168, 85, 247, 0.12);
          }
          .docs-paragraph {
            font-size: 1.02rem;
            line-height: 1.65;
            color: var(--app-text-muted);
            margin: 0;
          }

          /* Interactive Illustration Node Blueprint */
          .overview-illustration-container {
            background: #0f172a;
            border-radius: var(--radius-lg);
            border: 1px solid rgba(255, 255, 255, 0.05);
            overflow: hidden;
            margin: 10px 0;
            box-shadow: inset 0 0 40px rgba(0, 209, 209, 0.05);
          }
          .illustration-header {
            background: rgba(255, 255, 255, 0.03);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding: 10px 16px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .circle-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
          }
          .circle-dot.red { background: #ef4444; }
          .circle-dot.yellow { background: #f59e0b; }
          .circle-dot.green { background: #10b981; }
          .illustration-title {
            font-family: monospace;
            font-size: 0.75rem;
            color: #64748b;
            margin-left: 8px;
          }
          .interactive-illustration-pane {
            padding: 40px 24px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            min-height: 180px;
            position: relative;
          }
          .tech-node {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: var(--space-4);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            width: 140px;
            transition: all 0.3s ease;
            box-shadow: 0 10px 20px rgba(0,0,0,0.15);
          }
          .tech-node:hover {
            transform: translateY(-4px);
            border-color: var(--primary-cyan);
            box-shadow: 0 15px 25px rgba(0, 209, 209, 0.1);
          }
          .tech-node-icon {
            color: var(--primary-cyan);
            background: rgba(0, 209, 209, 0.1);
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .tech-node span {
            font-size: 0.85rem;
            font-weight: 700;
            color: white;
          }
          .ip-pill {
            font-family: monospace;
            font-size: 0.65rem;
            color: #64748b;
            background: rgba(0,0,0,0.3);
            padding: 2px 6px;
            border-radius: 4px;
          }
          .animated-pipeline {
            flex-grow: 1;
            height: 4px;
            background: rgba(255, 255, 255, 0.05);
            margin: 0 20px;
            position: relative;
            max-width: 260px;
          }
          .pipeline-line {
            width: 100%;
            height: 100%;
            background: var(--brand-gradient);
            opacity: 0.3;
          }
          .packet {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--primary-cyan);
            position: absolute;
            top: -2px;
            box-shadow: 0 0 8px var(--primary-cyan);
          }
          .packet-request {
            animation: packetFlowRight 2.5s infinite linear;
          }
          .packet-response {
            background: #a855f7;
            box-shadow: 0 0 8px #a855f7;
            animation: packetFlowLeft 2.5s infinite linear;
            animation-delay: 1.25s;
          }
          @keyframes packetFlowRight {
            0% { left: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { left: 100%; opacity: 0; }
          }
          @keyframes packetFlowLeft {
            0% { right: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { right: 100%; opacity: 0; }
          }
          .pipeline-label {
            position: absolute;
            bottom: -22px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.65rem;
            font-weight: 600;
            color: #64748b;
            white-space: nowrap;
          }

          /* HTML DOM Illustration Pane */
          .html-dom-pane {
            justify-content: center;
            padding: 30px;
          }
          .dom-node-mock {
            font-family: monospace;
            font-size: 0.8rem;
            color: #a855f7;
            border-left: 2px dashed rgba(168, 85, 247, 0.2);
            padding-left: 16px;
            margin: 4px 0;
            width: 100%;
            max-width: 480px;
          }
          .dom-node-mock.tag-html { color: #f43f5e; border-left: none; }
          .dom-node-mock.tag-head { color: #38bdf8; }
          .dom-node-mock.tag-body { color: #10b981; }
          .dom-node-mock.tag-h1 { color: #f59e0b; }
          .dom-node-mock.tag-p { color: #fb7185; }

          /* Objectives cards */
          .objectives-checklist-box {
            margin-top: 10px;
          }
          .objectives-checklist-box h3 {
            font-size: 1.15rem;
            font-weight: 700;
            margin: 0 0 16px 0;
            color: var(--app-text);
          }
          .objective-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 16px;
          }
          .objective-mini-card {
            background: var(--light-secondary);
            border: 1px solid var(--app-border);
            border-radius: 12px;
            padding: 16px;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
          }
          .objective-mini-card:hover {
            border-color: rgba(0, 209, 209, 0.3);
            transform: translateY(-2px);
          }
          .card-num {
            position: absolute;
            top: -10px;
            right: -5px;
            font-size: 2.5rem;
            font-weight: 900;
            color: rgba(255,255,255,0.02);
            font-family: monospace;
          }
          .objective-mini-card h4 {
            margin: 0 0 6px 0;
            font-size: 0.9rem;
            font-weight: 700;
            color: var(--primary-cyan);
          }
          .objective-mini-card p {
            margin: 0;
            font-size: 0.78rem;
            line-height: 1.5;
            color: var(--text-neutral);
          }

          /* Reference Decks Download View style */
          .reference-decks-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 20px;
            margin-top: 8px;
          }
          .reference-deck-card {
            background: var(--light-secondary);
            border-radius: 16px;
            border: 1px solid var(--app-border);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
          }
          .reference-deck-card:hover {
            border-color: rgba(0, 209, 209, 0.2);
            box-shadow: var(--shadow-sm);
          }
          .deck-card-preview {
            background: #0f172a;
            height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            cursor: pointer;
            overflow: hidden;
            border-bottom: 1px solid var(--app-border);
          }
          .deck-cover-mock {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
            text-align: center;
            padding: 16px;
            width: 100%;
          }
          .deck-format {
            font-size: 0.55rem;
            font-weight: 800;
            background: #ef4444;
            color: white;
            padding: 2px 6px;
            border-radius: 4px;
            letter-spacing: 0.5px;
          }
          .deck-cover-icon {
            color: rgba(255,255,255,0.15);
            transition: all 0.3s ease;
          }
          .deck-title-truncate {
            color: #94a3b8;
            font-size: 0.75rem;
            font-weight: 600;
            max-width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .deck-lines-sim {
            display: flex;
            flex-direction: column;
            gap: 4px;
            width: 60px;
            opacity: 0.2;
          }
          .deck-lines-sim span {
            height: 2px;
            background: white;
            border-radius: 1px;
          }
          .deck-lines-sim span:nth-child(1) { width: 100%; }
          .deck-lines-sim span:nth-child(2) { width: 80%; }
          .deck-lines-sim span:nth-child(3) { width: 50%; }

          .deck-hover-lens {
            position: absolute;
            inset: 0;
            background: rgba(0, 209, 209, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: all 0.25s ease;
          }
          .deck-hover-lens span {
            color: white;
            font-size: 0.85rem;
            font-weight: 700;
            border: 1px solid white;
            padding: 6px 14px;
            border-radius: 20px;
          }
          .deck-card-preview:hover .deck-hover-lens {
            opacity: 1;
          }
          .deck-card-preview:hover .deck-cover-icon {
            transform: scale(1.1);
            color: rgba(255,255,255,0.3);
          }

          .deck-card-info {
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            flex-grow: 1;
          }
          .deck-card-info h4 {
            margin: 0;
            font-size: 0.9rem;
            font-weight: 700;
            line-height: 1.4;
            color: var(--app-text);
            min-height: 38px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .deck-actions-row {
            display: flex;
            gap: 8px;
          }
          .deck-btn {
            flex: 1;
            padding: 8px;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
          }
          .deck-btn.preview-btn {
            background: transparent;
            border: 1px solid var(--app-border);
            color: var(--app-text);
          }
          .deck-btn.preview-btn:hover {
            background: rgba(255,255,255,0.03);
            border-color: var(--text-neutral);
          }
          .deck-btn.download-btn {
            background: var(--brand-gradient);
            border: none;
            color: white;
          }
          .deck-btn.download-btn:hover {
            opacity: 0.9;
            transform: translateY(-1px);
          }

          /* Diagnostic checklist self-evaluation Styles */
          .diagnostic-progress-container {
            background: var(--light-secondary);
            border: 1px solid var(--app-border);
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 8px;
          }
          .progress-label-row {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
            font-weight: 700;
            color: var(--app-text);
            margin-bottom: 10px;
          }
          .diagnostic-progress-bar-track {
            height: 8px;
            background: rgba(255,255,255,0.05);
            border-radius: 4px;
            overflow: hidden;
          }
          .diagnostic-progress-bar-fill {
            height: 100%;
            background: var(--brand-gradient);
            border-radius: 4px;
            box-shadow: 0 0 12px var(--primary-cyan);
            transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .progress-badge-glow {
            font-size: 0.8rem;
            font-weight: 800;
            background: rgba(0, 209, 209, 0.1);
            color: var(--primary-cyan);
            padding: 4px 12px;
            border-radius: 20px;
            box-shadow: 0 0 10px rgba(0, 209, 209, 0.2);
            border: 1px solid rgba(0, 209, 209, 0.2);
          }

          .diagnostic-checklist-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .diagnostic-checklist-row {
            background: var(--light-secondary);
            border: 1px solid var(--app-border);
            border-radius: 12px;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            gap: 16px;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .diagnostic-checklist-row:hover {
            transform: translateX(4px);
            border-color: rgba(0, 209, 209, 0.2);
            background: rgba(255, 255, 255, 0.01);
          }
          .diagnostic-checklist-row.active {
            border-color: rgba(0, 209, 209, 0.3);
            background: rgba(0, 209, 209, 0.02);
          }
          .checklist-checkbox {
            width: 22px;
            height: 22px;
            border-radius: 6px;
            border: 2px solid var(--app-border);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #0f172a;
            font-weight: 900;
            font-size: 0.75rem;
            flex-shrink: 0;
            transition: all 0.2s ease;
          }
          .checklist-checkbox.checked {
            background: var(--primary-cyan);
            border-color: var(--primary-cyan);
            transform: scale(1.05);
          }
          .checklist-text {
            font-size: 0.95rem;
            font-weight: 500;
            color: var(--app-text);
            transition: color 0.2s ease;
          }
          .diagnostic-checklist-row.active .checklist-text {
            color: white;
          }
          .checklist-success-banner {
            display: flex;
            gap: var(--space-4);
            background: rgba(22, 163, 74, 0.05);
            border: 1px solid rgba(22, 163, 74, 0.2);
            border-radius: 16px;
            padding: 20px;
            align-items: flex-start;
            margin-top: 10px;
            animation: slideUp 0.3s ease-out;
          }
          .banner-success-icon {
            color: #4ade80;
            flex-shrink: 0;
            margin-top: 2px;
          }
          .checklist-success-banner h4 {
            margin: 0 0 4px 0;
            font-size: 1rem;
            color: #4ade80;
            font-weight: 700;
          }
          .checklist-success-banner p {
            margin: 0;
            font-size: 0.85rem;
            line-height: 1.5;
            color: var(--text-neutral);
          }

          /* Restricted Gate view styles */
          .instructor-lock-gate {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 30px 10px;
          }
          .gate-lock-icon {
            width: 72px;
            height: 72px;
            background: rgba(239, 68, 68, 0.08);
            border: 1px solid rgba(239, 68, 68, 0.2);
            color: #ef4444;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.15);
            animation: pulseLock 2s infinite;
          }
          @keyframes pulseLock {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
            70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
          }
          .instructor-lock-gate h3 {
            font-size: 1.5rem;
            font-weight: 800;
            margin: 0 0 10px 0;
            color: white;
          }
          .gate-sub {
            max-width: 440px;
            margin-bottom: 24px;
          }
          .credentials-challenge-box {
            background: var(--light-secondary);
            border: 1px solid var(--app-border);
            padding: 24px;
            border-radius: 16px;
            width: 100%;
            max-width: 420px;
            text-align: left;
            box-shadow: var(--shadow-sm);
          }
          .credentials-challenge-box label {
            display: block;
            font-size: 0.75rem;
            font-weight: 800;
            color: var(--text-neutral);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
          }
          .challenge-input-row {
            display: flex;
            gap: 10px;
            margin-bottom: 12px;
          }
          .challenge-input-row input {
            flex-grow: 1;
            background: var(--app-bg);
            border: 1px solid var(--app-border);
            color: white;
            padding: 10px 14px;
            border-radius: 8px;
            font-size: 0.9rem;
          }
          .challenge-input-row input:focus {
            border-color: #ef4444;
            outline: none;
          }
          .challenge-input-row button {
            background: #ef4444;
            color: white;
            border: none;
            padding: 10px 18px;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .challenge-input-row button:hover {
            opacity: 0.9;
          }
          .pass-hint {
            font-size: 0.72rem;
            color: var(--text-neutral);
            display: block;
            margin-top: 6px;
          }

          /* Authorized Instructor View styles */
          .instructor-auth-badge {
            background: rgba(16, 185, 129, 0.08);
            border: 1px solid rgba(16, 185, 129, 0.2);
            color: #10b981;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 750;
            width: fit-content;
            margin-bottom: 16px;
            letter-spacing: 0.5px;
          }
          .confidential-seal-banner {
            background: rgba(239, 68, 68, 0.04);
            border: 1px dashed rgba(239, 68, 68, 0.3);
            border-radius: 12px;
            padding: 12px 18px;
            display: flex;
            flex-direction: column;
            gap: 2px;
            color: #ef4444;
            font-family: monospace;
          }
          .confidential-seal-banner strong {
            font-size: 0.85rem;
            letter-spacing: 1px;
          }
          .confidential-seal-banner span {
            font-size: 0.7rem;
            opacity: 0.8;
          }
          .instructor-clipboard-box {
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-top: 8px;
          }
          .instructor-clipboard-box h3 {
            font-size: 1.1rem;
            font-weight: 700;
            margin: 0;
            color: white;
          }
          .prep-content {
            border-left: 3px solid #a855f7;
            padding-left: var(--space-4);
          }
          .instructor-bullet-checklist h4 {
            font-size: 0.9rem;
            font-weight: 700;
            color: #a855f7;
            margin: 0 0 10px 0;
          }
          .instructor-bullet-checklist ul {
            padding-left: 20px;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .instructor-bullet-checklist li {
            font-size: 0.9rem;
            color: var(--app-text-muted);
            line-height: 1.5;
          }

          /* Simulated PDF reader modal styles */
          .pdf-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(8px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
          }
          .pdf-reader-window {
            background: #1e293b;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 20px;
            width: 100%;
            max-width: 900px;
            height: 90vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 25px 60px rgba(0,0,0,0.5);
          }
          .pdf-reader-header {
            background: #0f172a;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            padding: 16px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .file-format-tag {
            background: #ef4444;
            color: white;
            font-size: 0.6rem;
            font-weight: 900;
            padding: 3px 8px;
            border-radius: 4px;
            letter-spacing: 0.5px;
          }
          .pdf-info-group h3 {
            margin: 0;
            font-size: 1rem;
            font-weight: 700;
            color: white;
          }
          .pdf-actions-group {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .pdf-btn {
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .pdf-btn.download-pdf {
            background: var(--brand-gradient);
            border: none;
            color: white;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .pdf-btn.download-pdf:hover {
            opacity: 0.9;
          }
          .pdf-btn.close-pdf {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            color: #94a3b8;
          }
          .pdf-btn.close-pdf:hover {
            background: rgba(255,255,255,0.1);
            color: white;
          }

          .pdf-reader-workspace {
            display: flex;
            flex-grow: 1;
            overflow: hidden;
            height: calc(100% - 69px);
          }
          .pdf-mini-pages-sidebar {
            width: 120px;
            background: #0f172a;
            border-right: 1px solid rgba(255,255,255,0.08);
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding: 20px 10px;
            overflow-y: auto;
          }
          .mini-page {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            cursor: pointer;
          }
          .page-number {
            font-size: 0.65rem;
            font-weight: 700;
            color: #64748b;
          }
          .mini-page-thumb {
            width: 80px;
            height: 100px;
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
            font-size: 0.65rem;
            font-weight: 600;
            transition: all 0.2s ease;
          }
          .mini-page.active .mini-page-thumb, .mini-page:hover .mini-page-thumb {
            border-color: var(--primary-cyan);
            background: rgba(0, 209, 209, 0.05);
            color: var(--primary-cyan);
          }

          .pdf-main-scroll-pane {
            flex-grow: 1;
            background: #0f172a;
            padding: 30px;
            overflow-y: auto;
            display: flex;
            justify-content: center;
          }
          .pdf-paper-page {
            background: white;
            border-radius: 12px;
            width: 100%;
            max-width: 580px;
            min-height: 800px;
            padding: 40px;
            color: #0f172a;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            display: flex;
            flex-direction: column;
          }
          .paper-header {
            display: flex;
            justify-content: space-between;
            font-family: monospace;
            font-size: 0.65rem;
            color: #64748b;
            margin-bottom: 24px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 8px;
          }
          .pdf-paper-page h2 {
            margin: 0 0 6px 0;
            font-size: 1.5rem;
            font-weight: 800;
            color: #0f172a;
          }
          .paper-author-line {
            font-size: 0.75rem;
            font-weight: 600;
            color: #64748b;
          }
          .paper-divider {
            height: 1px;
            background: #cbd5e1;
            margin: 16px 0;
          }
          .paper-section-body {
            display: flex;
            flex-direction: column;
            gap: 14px;
            flex-grow: 1;
          }
          .paper-section-body h3 {
            font-size: 0.95rem;
            font-weight: 750;
            margin: 12px 0 0 0;
            color: #0f172a;
            border-left: 3px solid var(--primary-cyan);
            padding-left: 8px;
          }
          .paper-section-body p {
            font-size: 0.82rem;
            line-height: 1.6;
            color: #334155;
            margin: 0;
          }
          .paper-section-body ul {
            padding-left: 18px;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .paper-section-body li {
            font-size: 0.8rem;
            color: #334155;
            line-height: 1.5;
          }
          .paper-diagram-mock {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            margin: 10px 0;
          }
          .mock-diagram-circle {
            background: var(--light-secondary);
            border: 1px solid #cbd5e1;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: 800;
            color: #0f172a;
          }
          .arrow-flow {
            font-size: 1rem;
            font-weight: 800;
            color: #64748b;
          }
          .paper-footer {
            margin-top: 30px;
            border-top: 1px solid #e2e8f0;
            padding-top: 12px;
            display: flex;
            justify-content: center;
            font-family: monospace;
            font-size: 0.65rem;
            color: #94a3b8;
          }

          /* General animation helper classes */
          .animate-fade {
            animation: fadeIn 0.35s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* Responsive Breakpoints */
          @media (max-width: 1024px) {
            .docs-main-container {
              grid-template-columns: 200px 1fr;
              gap: 20px;
            }
            .sidebar-nav-item {
              padding: 10px 12px;
              font-size: 0.85rem;
            }
          }

          @media (max-width: 768px) {
            .docs-main-container {
              grid-template-columns: 1fr;
              gap: 24px;
            }
            .docs-nav-sidebar {
              position: static;
              padding: 12px;
            }
            .sidebar-nav-list {
              flex-direction: row;
              overflow-x: auto;
              padding-bottom: 4px;
              scrollbar-width: none;
            }
            .sidebar-nav-list::-webkit-scrollbar {
              display: none;
            }
            .sidebar-nav-item {
              white-space: nowrap;
              width: auto;
            }
            .docs-section-card {
              padding: 20px;
            }
            .docs-page-header h1 {
              font-size: 1.75rem;
            }
            .pdf-modal-overlay {
              padding: 16px;
            }
            .pdf-mini-pages-sidebar {
              display: none;
            }
          }

          @media (max-width: 480px) {
            .docs-layout-wrapper {
              padding: 20px 12px;
            }
            .tech-node {
              width: 100px;
              padding: 10px;
            }
            .tech-node-icon {
              width: 36px;
              height: 36px;
            }
            .tech-node-icon svg {
              width: 18px;
              height: 18px;
            }
            .animated-pipeline {
              margin: 0 10px;
            }
            .pipeline-label {
              font-size: 0.55rem;
            }
            .pdf-reader-window {
              height: 95vh;
            }
            .pdf-paper-page {
              padding: 20px;
            }
            .pdf-main-scroll-pane {
              padding: 12px;
            }
          }
        `}} />
      </main>
    );
  }

  return (
    <main className="main-content">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTopic.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="content-header">
            <span className="topic-tag">Topic</span>
            <h1>{selectedTopic.title}</h1>
          </div>

          <section className="progression-section">
            {selectedTopic.progression ? (
              <div className="steps-container">
                {selectedTopic.progression.map((step, index) => (
                  <motion.div
                    key={index}
                    className={`step-card level-${step.level}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="step-badge">{step.level.toUpperCase()}</div>
                    <h3>{step.title}</h3>
                    <p>{step.content}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <section className="explanation-section">
                <div className="section-title">
                  <Lightbulb size={20} color="var(--primary-cyan)" />
                  <h2>Concept</h2>
                </div>
                <p className="concept-explanation-main">{selectedTopic.explanation}</p>

                {selectedTopic.howItWorks && (
                  <div className="topic-deep-dive-grid">
                    <div className="deep-dive-card works-card">
                      <div className="card-heading">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cpu"><rect width="16" height="16" x="4" y="4" rx="2" /><rect width="6" height="6" x="9" y="9" rx="1" /><path d="M9 1v3" /><path d="M15 1v3" /><path d="M9 20v3" /><path d="M15 20v3" /><path d="M20 9h3" /><path d="M20 15h3" /><path d="M1 9h3" /><path d="M1 15h3" /></svg>
                        <h3>How It Works</h3>
                      </div>
                      <p>{selectedTopic.howItWorks}</p>
                    </div>

                    <div className="deep-dive-card data-card">
                      <div className="card-heading">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-database"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" /></svg>
                        <h3>Data Handling</h3>
                      </div>
                      <p>{selectedTopic.dataHandling}</p>
                    </div>

                    <div className="deep-dive-card missing-card">
                      <div className="card-heading">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                        <h3>What if it was not there?</h3>
                      </div>
                      <p>{selectedTopic.whatIfMissing}</p>
                    </div>

                    <div className="deep-dive-card advantages-card">
                      <div className="card-heading">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle-2"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                        <h3>Advantages</h3>
                      </div>
                      <ul>
                        {selectedTopic.advantages?.map((adv, i) => (
                          <li key={i}>{adv}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="deep-dive-card example-card">
                      <div className="card-heading">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A7 7 0 0 0 4 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
                        <h3>Real-World Example</h3>
                      </div>
                      <p>{selectedTopic.realWorldExample}</p>
                    </div>
                  </div>
                )}
              </section>
            )}
          </section>

          {(selectedTopic.visualization || selectedTopic.customComponent) && 
           !(selectedTopic.title.toLowerCase().includes('mini project') || selectedTopic.title.toLowerCase().includes('assignment task')) && (
            <motion.section
              className="visualization-section"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="section-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                <h2>Interactive Visualization</h2>
              </div>
              <div className="viz-container">
                {selectedTopic.customComponent ? (
                  CustomVisuals[selectedTopic.customComponent]
                ) : (
                  <>
                    <img src={selectedTopic.visualization} alt="Topic Visualization" className="viz-image" />
                    <div className="viz-overlay">
                      <span className="pulsing-dot"></span>
                      <p>Study this visual to understand the core logic</p>
                    </div>
                  </>
                )}
              </div>
            </motion.section>
          )}

          {selectedTopic.title.toLowerCase().includes('mini project') || selectedTopic.title.toLowerCase().includes('assignment task') ? (
            <section className="goal-section card-3d">
              <div className="section-header-row">
                <div className="icon-badge secondary">
                  <Lightbulb size={20} />
                </div>
                <h2>Your Target Goal</h2>
              </div>
              <p className="goal-description">Build a project that looks like this using the concepts you've learned today:</p>
              <div className="goal-preview-container">
                <div className="preview-label">Live Preview of Final Result</div>
                <iframe
                  className="goal-preview-frame"
                  srcDoc={`
                    <html>
                      <head>
                        <style>
                          body { margin: 0; padding: 0; font-family: sans-serif; background: transparent; }
                          ${selectedTopic.codeTemplate?.css || ''}
                        </style>
                      </head>
                      <body>
                        ${selectedTopic.codeTemplate?.html || ''}
                        <script>${selectedTopic.codeTemplate?.js || ''}</script>
                      </body>
                    </html>
                  `}
                  title="Target Goal Preview"
                />
              </div>
            </section>
          ) : selectedTopic.codeTemplate ? (
            <section className="playground-section">
              <div className="section-title">
                <FileEdit size={20} color="var(--primary-cyan)" />
                <h2>Hands-on Playground</h2>
              </div>
              <CodeEditor initialCode={selectedTopic.codeTemplate} />
            </section>
          ) : null}

          {/* Assignment Section - Only show for Mini Projects / Assignment Tasks */}
          {(selectedTopic.title.toLowerCase().includes('mini project') || selectedTopic.title.toLowerCase().includes('assignment task')) && (() => {
            const submittedAssignment = userAssignments?.find(a => a.topicId === selectedTopic.id);
            const hasSubmission = !!submittedAssignment;
            // Only lock if submitted AND status is NOT rejected
            const isLocked = hasSubmission && submittedAssignment.status !== 'rejected';
            const submittedCode = hasSubmission ? JSON.parse(submittedAssignment.code) : EMPTY_CODE;

            return (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mission-control card-3d ${isLocked ? 'locked-mission' : ''}`}
              >
                <div className="mission-header">
                  <div className="mission-title-group">
                    <div className="mission-icon">
                      {isLocked ? <ShieldCheck size={28} color="#16a34a" /> : <ShieldCheck size={28} />}
                    </div>
                    <div>
                      <h2 className="mission-name">
                        {isLocked ? 'Mission Log: ' : 'Mission: '}
                        {selectedTopic.title.split('–')[1] || selectedTopic.title}
                      </h2>
                      <p className="mission-subtitle">
                        {hasSubmission
                          ? `Submission Status: ${submittedAssignment.status.toUpperCase()} (last update: ${new Date(submittedAssignment.createdAt).toLocaleDateString()})`
                          : 'Apply your knowledge to unlock the next level'}
                      </p>
                    </div>
                  </div>
                  <div className="mission-stats">
                    {hasSubmission ? (
                      <div className={`status-badge ${submittedAssignment.status}`}>
                        {submittedAssignment.status.toUpperCase()}
                      </div>
                    ) : (
                      <>
                        <div className="stat-pill">
                          <span className="label">DIFFICULTY</span>
                          <span className="value high">CHALLENGING</span>
                        </div>
                        <div className="stat-pill">
                          <span className="label">EST. TIME</span>
                          <span className="value">25 MIN</span>
                        </div>
                        <div className="stat-pill xp">
                          <span className="label">REWARD</span>
                          <span className="value">+500 XP</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="mission-grid">
                  <div className="mission-requirements">
                    <h3><ClipboardCheck size={18} /> Mission Requirements</h3>
                    <ul className="requirement-list">
                      {requirements.map(req => {
                        const met = isLocked || req.met;
                        return (
                          <li key={req.id} className={met ? 'met' : ''}>
                            <div className={`checkbox ${met ? 'done' : ''}`}></div>
                            <span>{req.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                    {!isLocked && (
                      <div className="pro-tip">
                        <Lightbulb size={16} />
                        <span><strong>Pro Tip:</strong> Use <code>target="_blank"</code> for all external links!</span>
                      </div>
                    )}
                  </div>

                  <div className="mission-terminal">
                    <div className="terminal-header">
                      <div className="dots"><span></span><span></span><span></span></div>
                      <div className="terminal-title">{isLocked ? 'ARCHIVED_MISSION_LOG.html' : 'MISSION_CODE.html'}</div>
                    </div>
                    <div className="assignment-editor-container">
                      <CodeEditor
                        initialCode={submittedCode}
                        tabs={['html']}
                        readOnly={isLocked}
                        onChange={(newCode) => {
                          if (!isLocked) {
                            window.currentAssignmentCode = newCode;
                            validateCode(newCode);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mission-footer">
                  <div className="submission-info">
                    {isLocked ? (
                      <>
                        <CheckCircle2 size={18} color="#16a34a" />
                        <span>This mission is locked. Your submission has been {submittedAssignment.status}.</span>
                      </>
                    ) : (
                      <>
                        <div className={`pulse-dot ${!requirements.every(req => req.met) ? 'warning' : ''}`}></div>
                        <span>
                          {!requirements.every(req => req.met)
                            ? 'Complete all mission requirements in the checklist to enable submission.'
                            : submittedAssignment?.status === 'rejected'
                              ? 'Mission rejected. Review the feedback and relaunch your submission.'
                              : 'Ready for review? Your mission will be evaluated by an instructor.'}
                        </span>
                      </>
                    )}
                  </div>
                  {!isLocked && (
                    <button
                      className="btn btn-primary launch-btn"
                      disabled={!requirements.every(req => req.met)}
                      onClick={async () => {
                        const code = window.currentAssignmentCode || submittedCode;
                        const finalCode = JSON.stringify(code);
                        try {
                          const user = JSON.parse(localStorage.getItem('user'));
                          const token = user?.token;

                          const response = await axios.post('/api/assignments', {
                            topicId: selectedTopic.id,
                            topicTitle: selectedTopic.title,
                            code: finalCode
                          }, {
                            headers: {
                              'Authorization': `Bearer ${token}`
                            }
                          });

                          if (response.status === 201) {
                            showSnackbar('Mission Re-launched Successfully!', 'success');
                            if (typeof refreshAssignments === 'function') {
                              refreshAssignments();
                            }
                          } else {
                            const data = await response.json();
                            showSnackbar(`Launch Error: ${data.message}`, 'error');
                          }
                        } catch (err) {
                          showSnackbar('Failed to launch mission.');
                        }
                      }}
                    >
                      <ArrowUpRight size={18} />
                      {submittedAssignment?.status === 'rejected' ? 'Resubmit Task' : 'Submit Task'}
                    </button>
                  )}
                </div>
              </motion.section>
            );
          })()}

          {/* Snackbar UI */}
          {snackbar.visible && (
            <div className={`snackbar ${snackbar.type}`}>
              {snackbar.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
              <span>{snackbar.message}</span>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="navigation-footer">
            {prevTopic ? (
              <button className="nav-btn prev" onClick={() => setSelectedTopic(prevTopic)}>
                <div className="nav-icon"><ArrowLeft size={20} /></div>
                <div className="nav-text">
                  <span className="nav-label">Previous Topic</span>
                  <span className="nav-title">{prevTopic.title}</span>
                </div>
              </button>
            ) : <div />}

            {nextTopic && (
              <button className="nav-btn next" onClick={() => setSelectedTopic(nextTopic)}>
                <div className="nav-text">
                  <span className="nav-label">Next Topic</span>
                  <span className="nav-title">{nextTopic.title}</span>
                </div>
                <div className="nav-icon"><ArrowRight size={20} /></div>
              </button>
            )}
          </div>

          <footer className="content-footer">
            <p>© 2024 MERN Training Platform. Interactive Learning Experience.</p>
          </footer>
        </motion.div>
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        .content-header { margin-bottom: var(--space-6); }
        .topic-tag { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--primary-cyan); letter-spacing: 1px; margin-bottom: 8px; display: block; }
        .section-title { display: flex; align-items: center; gap: 12px; margin-bottom: var(--space-3); }
        .section-title h2 { margin: 0; font-size: 1.5rem; }
        .goal-section { margin-bottom: var(--space-6); padding: 0; background: transparent; border: none; }
        .goal-description { color: var(--text-neutral); margin-bottom: var(--space-3); font-size: 0.95rem; }
        .goal-preview-container { background: #f8fafc; border-radius: 12px; border: 1px solid var(--light-tertiary); overflow: hidden; margin: 0; }
        .preview-label { background: var(--light-tertiary); padding: 8px 16px; font-size: 0.75rem; font-weight: 700; color: var(--text-neutral); text-transform: uppercase; letter-spacing: 0.5px; }
        .goal-preview-frame { width: 100%; height: 250px; border: none; background: white; display: block; }
        
        /* Tutor Material Styling */
        .tutor-material-section { margin-bottom: var(--space-6); background: rgba(168, 85, 247, 0.05); border: 1px solid rgba(168, 85, 247, 0.2); padding: var(--space-4); border-radius: var(--radius-lg); }
        .tutor-material-section h2 { color: #a855f7; margin: 0; }
        .tutor-content { color: var(--app-text); font-size: 0.95rem; line-height: 1.6; margin-bottom: var(--space-3); }
        .tutor-meta { display: flex; gap: var(--space-3); margin-bottom: var(--space-3); color: var(--text-neutral); font-size: 0.85rem; align-items: center; }
        .tutor-duration { display: flex; align-items: center; gap: 4px; font-weight: 600; }
        .tutor-resources { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .tutor-resources li { display: flex; align-items: center; gap: 8px; color: var(--primary-cyan); font-size: 0.85rem; font-weight: 500; }

        /* Mission Control Styling */
        .mission-control { background: #0f172a; border: 1px solid #1e293b; border-radius: 24px; padding: 32px; color: white; margin-top: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
        .mission-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #1e293b; }
        .mission-title-group { display: flex; gap: 20px; align-items: center; }
        .mission-icon { width: 56px; height: 56px; background: rgba(0, 209, 209, 0.1); color: #00d1d1; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
        .mission-name { font-size: 1.75rem; font-weight: 800; margin: 0; letter-spacing: -0.5px; }
        .mission-subtitle { color: #94a3b8; margin: 4px 0 0; font-size: 0.95rem; }
        
        .mission-stats { display: flex; gap: 12px; }
        .stat-pill { background: #1e293b; padding: 6px 14px; border-radius: 100px; display: flex; flex-direction: column; align-items: center; min-width: 80px; border: 1px solid #334155; }
        .stat-pill .label { font-size: 0.6rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }
        .stat-pill .value { font-size: 0.85rem; font-weight: 700; color: #e2e8f0; }
        .stat-pill .value.high { color: #f59e0b; }
        .stat-pill.xp { background: rgba(0, 209, 209, 0.05); border-color: rgba(0, 209, 209, 0.2); }
        .stat-pill.xp .value { color: #00d1d1; }

        .mission-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 32px; margin-bottom: 32px; }
        .mission-requirements h3 { font-size: 1.1rem; font-weight: 700; display: flex; align-items: center; gap: 10px; margin-bottom: 20px; color: #00d1d1; }
        .requirement-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px; }
        .requirement-list li { display: flex; align-items: center; gap: 12px; font-size: 0.9rem; color: #cbd5e1; transition: all 0.3s ease; }
        .requirement-list li.met { color: #00d1d1; transform: translateX(5px); }
        .checkbox { width: 18px; height: 18px; border: 2px solid #334155; border-radius: 4px; flex-shrink: 0; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .checkbox.done { background: #00d1d1; border-color: #00d1d1; position: relative; transform: scale(1.1); }
        .checkbox.done::after { content: '✓'; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #0f172a; font-weight: 900; }
        
        .pro-tip { margin-top: 24px; padding: 14px; background: rgba(245, 158, 11, 0.05); border-radius: 12px; border: 1px solid rgba(245, 158, 11, 0.1); display: flex; gap: 12px; color: #f59e0b; font-size: 0.85rem; }
        
        .mission-terminal { background: #000; border-radius: 16px; border: 1px solid #1e293b; overflow: hidden; }
        .mission-terminal .editor-container { height: 600px !important; margin: 0 !important; border: none !important; border-radius: 0 !important; box-shadow: none !important; }
        .mission-terminal .editor-main { grid-template-columns: 1fr !important; grid-template-rows: 340px 210px !important; }
        .mission-terminal .code-panel { border-right: none !important; border-bottom: 1px solid #333 !important; }
        .terminal-header { background: #1e293b; padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; }
        .terminal-header .dots { display: flex; gap: 6px; }
        .terminal-header .dots span { width: 8px; height: 8px; border-radius: 50%; background: #334155; }
        .terminal-header .dots span:nth-child(1) { background: #ff5f56; }
        .terminal-header .dots span:nth-child(2) { background: #ffbd2e; }
        .terminal-header .dots span:nth-child(3) { background: #27c93f; }
        .terminal-title { font-family: monospace; font-size: 0.7rem; color: #94a3b8; }
        
        .mission-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 24px; border-top: 1px solid #1e293b; }
        .submission-info { display: flex; align-items: center; gap: 12px; color: #94a3b8; font-size: 0.85rem; }
        .pulse-dot { width: 8px; height: 8px; background: #00d1d1; border-radius: 50%; animation: pulse 2s infinite; }
        .pulse-dot.warning { background: #f59e0b; animation: pulse-warning 2s infinite; }
        @keyframes pulse { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 209, 209, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(0, 209, 209, 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 209, 209, 0); } }
        @keyframes pulse-warning { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); } }
        .launch-btn { padding: 14px 32px; font-weight: 800; border-radius: 12px; letter-spacing: 0.5px; box-shadow: 0 10px 20px rgba(0, 209, 209, 0.2); transition: all 0.2s ease-in-out; }
        .launch-btn:disabled { background: #1e293b !important; color: #475569 !important; border-color: #334155 !important; cursor: not-allowed; box-shadow: none !important; opacity: 0.6; }

        .status-badge { padding: 6px 16px; border-radius: 8px; font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; }
        .status-badge.pending { background: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.2); }
        .status-badge.accepted { background: rgba(22, 163, 74, 0.1); color: #16a34a; border: 1px solid rgba(22, 163, 74, 0.2); }
        .status-badge.rejected { background: rgba(220, 38, 38, 0.1); color: #dc2626; border: 1px solid rgba(220, 38, 38, 0.2); }
        
        .locked-mission { border-color: rgba(22, 163, 74, 0.2); }
        .locked-mission .mission-icon { background: rgba(22, 163, 74, 0.1); }
        
        .explanation-section { margin-bottom: var(--space-8); }
        .playground-section { margin-bottom: var(--space-8); }
        .progression-section { margin-bottom: var(--space-8); }
        .steps-container { display: flex; flex-direction: column; gap: var(--space-4); }
        .step-card { padding: var(--space-4); background: var(--app-card-bg); border-radius: var(--radius-md); border: 1px solid var(--app-border); border-left-width: 4px; border-left-style: solid; border-left-color: var(--primary-cyan); position: relative; overflow: hidden; box-shadow: var(--shadow-sm); }
        .step-card.level-easy { border-left-color: #4ADE80; }
        .step-card.level-intermediate { border-left-color: #FACC15; }
        .step-card.level-advanced { border-left-color: #F87171; }
        .step-badge { position: absolute; top: 12px; right: 12px; font-size: 0.65rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; background: rgba(255,255,255,0.1); color: var(--text-neutral); }
        .visualization-section { margin-bottom: var(--space-8); }
        .viz-container { position: relative; width: 100%; border-radius: var(--radius-lg); overflow: hidden; background: #0f172a; border: 1px solid var(--app-border); box-shadow: 0 0 30px rgba(0,209,209,0.1); }
        .viz-image { width: 100%; height: auto; display: block; object-fit: contain; max-height: 480px; transition: transform 0.5s ease; }
        .viz-container:hover .viz-image { transform: scale(1.02); }
        .viz-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 12px; background: linear-gradient(transparent, rgba(15, 23, 42, 0.9)); display: flex; align-items: center; gap: 10px; color: white; font-size: 0.8rem; }
        .pulsing-dot { width: 8px; height: 8px; background: var(--primary-cyan); border-radius: 50%; box-shadow: 0 0 10px var(--primary-cyan); animation: pulse 1.5s infinite; }
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
        .assessment-section { margin-top: var(--space-8); padding-top: var(--space-8); border-top: 1px solid var(--app-border); }
        .assignment-card { background: white; border-radius: 24px; border: 1px solid var(--app-border); padding: 32px; box-shadow: var(--shadow-md); }
        .assignment-prompt { font-size: 1.1rem; color: var(--text-primary); font-weight: 600; margin-bottom: 24px; line-height: 1.6; }
        .assignment-editor-container { margin-bottom: 24px; border-radius: 16px; overflow: hidden; border: 1px solid #333; }
        .submission-actions { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding-top: 24px; border-top: 1px solid var(--light-tertiary); }
        .submit-assignment-btn { padding: 12px 24px; font-weight: 700; gap: 10px; border-radius: 12px; }
        .submission-note { font-size: 0.85rem; color: var(--text-neutral); margin: 0; }
        
        .snackbar {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          background: #1e1e1e;
          color: white;
          padding: 12px 24px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          z-index: 2000;
          animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .snackbar.success { border-left: 4px solid #16a34a; }
        .snackbar.error { border-left: 4px solid #dc2626; }
        .snackbar span { font-size: 0.9rem; font-weight: 500; }

        .navigation-footer { display: flex; justify-content: space-between; gap: var(--space-4); margin-top: var(--space-8); padding: var(--space-8) 0; border-top: 1px solid var(--app-border); }
        .nav-btn { flex: 1; display: flex; align-items: center; gap: var(--space-4); padding: var(--space-4); background: var(--app-card-bg); border: 1px solid var(--app-border); border-radius: var(--radius-lg); cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); text-align: left; max-width: 380px; position: relative; overflow: hidden; }
        .nav-btn:hover { background: var(--brand-gradient); border-color: transparent; transform: translateY(-4px); box-shadow: var(--glow); }
        .nav-btn:hover .nav-label, .nav-btn:hover .nav-title, .nav-btn:hover .nav-icon { color: white; }
        .nav-btn:hover .nav-icon { background: rgba(255, 255, 255, 0.2); }
        .nav-btn.next { text-align: right; justify-content: flex-end; }
        .nav-text { display: flex; flex-direction: column; overflow: hidden; z-index: 1; }
        .nav-label { font-size: 0.7rem; text-transform: uppercase; color: var(--primary-cyan); font-weight: 700; letter-spacing: 1px; margin-bottom: 4px; transition: color 0.3s; }
        .nav-title { font-size: 1.1rem; font-weight: 600; color: var(--app-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color 0.3s; }
        .nav-icon { width: 48px; height: 48px; background: rgba(0, 209, 209, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primary-cyan); flex-shrink: 0; transition: all 0.3s; z-index: 1; }
        .content-footer { margin-top: var(--space-4); padding: var(--space-4) 0; text-align: center; font-size: 0.8rem; color: var(--text-neutral); border-top: 1px solid var(--app-border); }

        /* Responsive Fixes for Submission Section */
        @media (max-width: 1024px) {
          .mission-grid { grid-template-columns: 1fr; gap: 24px; }
          .mission-control { padding: 24px; }
          .mission-name { font-size: 1.4rem; }
        }

        @media (max-width: 768px) {
          .mission-header { flex-direction: column; gap: 20px; }
          .mission-stats { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
          .stat-pill { min-width: 0; }
          .mission-footer { flex-direction: column; gap: 20px; text-align: center; }
          .submission-info { justify-content: center; }
          .launch-btn { width: 100%; }
          .mission-name { font-size: 1.25rem; }
          .navigation-footer { flex-direction: column; }
          .nav-btn { max-width: none; }
        }

        @media (max-width: 480px) {
          .main-content { padding: 16px; }
          .mission-control { padding: 16px; border-radius: 16px; }
          .mission-icon { width: 40px; height: 40px; }
          .mission-icon svg { width: 20px; height: 20px; }
          .stat-pill { padding: 4px 8px; }
          .stat-pill .label { font-size: 0.5rem; }
          .stat-pill .value { font-size: 0.75rem; }
          .assignment-editor-container { margin: 0 -16px 24px -16px; border-radius: 0; }
        }
      `}} />
    </main>
  );
};

export default MainContent;
