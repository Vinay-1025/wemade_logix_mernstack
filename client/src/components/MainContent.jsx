import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useCourse } from '../context/CourseContext';
import CodeEditor from './CodeEditor';
import { FileEdit, Lightbulb, ClipboardCheck, ArrowUpRight, ArrowLeft, ArrowRight, CheckCircle2, XCircle, ShieldCheck, FileText, Clock } from 'lucide-react';
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

const EMPTY_CODE = { html: '', css: '', js: '' };

const MainContent = () => {
  const { selectedTopic, setSelectedTopic, refreshAssignments, userAssignments } = useCourse();
  const [snackbar, setSnackbar] = useState({ visible: false, message: '', type: 'success' });
  const [requirements, setRequirements] = useState([
    { id: 'semantic', text: 'Use Semantic Tags (header, main, footer)', regex: /<(header|main|footer).*?>/i, met: false },
    { id: 'headings', text: 'Implement at least 3 levels of Headings', regex: /<h[1-6].*?>.*?<\/h[1-6]>/gi, count: 3, met: false },
    { id: 'image', text: 'Include a Profile Image with Alt text', regex: /<img.*?alt=['"].+?['"].*?>/i, met: false },
    { id: 'list', text: 'Create an Unordered List of Skills', regex: /<ul.*?>.*?<li.*?>.*?<\/li>.*?<\/ul>/is, met: false },
    { id: 'links', text: 'Add Social Links using Anchor tags', regex: /<a.*?href=['"].+?['"].*?>.*?<\/a>/gi, count: 2, met: false },
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
    'CalculatorTaskViz': <CalculatorTaskViz />
  };

  if (!selectedTopic) return <div className="main-content">Select a topic to start learning</div>;

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

          {isTutorOrAdmin && currentDayData?.tutorMaterial && (
            <section className="tutor-material-section card-3d">
              <div className="section-title">
                <FileText size={20} color="#a855f7" />
                <h2>{currentDayData.tutorMaterial.title}</h2>
              </div>
              <p className="tutor-content">{currentDayData.tutorMaterial.content}</p>
              <div className="tutor-meta">
                <span className="tutor-duration"><Clock size={14}/> {currentDayData.tutorMaterial.duration}</span>
              </div>
              {currentDayData.tutorMaterial.resources && (
                <ul className="tutor-resources">
                  {currentDayData.tutorMaterial.resources.map((res, i) => (
                    <li key={i}><ArrowRight size={14}/> {res}</li>
                  ))}
                </ul>
              )}
            </section>
          )}

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
                <p>{selectedTopic.explanation}</p>
              </section>
            )}
          </section>

          {(selectedTopic.visualization || selectedTopic.customComponent) && (
            <motion.section 
              className="visualization-section"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="section-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
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

          {/* Hands-on Playground or Project Goal */}
          {!selectedTopic.title.toLowerCase().includes('mini project') ? (
            <section className="playground-section">
              <div className="section-title">
                <FileEdit size={20} color="var(--primary-cyan)" />
                <h2>Hands-on Playground</h2>
              </div>
              <CodeEditor initialCode={selectedTopic.codeTemplate} />
            </section>
          ) : (
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
                          body { margin: 0; font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 200px; background: transparent; }
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
          )}

          {/* Assignment Section - Only show for Mini Projects */}
          {selectedTopic.title.toLowerCase().includes('mini project') && (() => {
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
                        <div className="pulse-dot"></div>
                        <span>
                          {submittedAssignment?.status === 'rejected' 
                            ? 'Mission rejected. Review the feedback and relaunch your submission.' 
                            : 'Ready for review? Your mission will be evaluated by an instructor.'}
                        </span>
                      </>
                    )}
                  </div>
                  {!isLocked && (
                    <button 
                      className="btn btn-primary launch-btn"
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
                      {submittedAssignment?.status === 'rejected' ? 'Relaunch Mission' : 'Launch Submission'}
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

      <style dangerouslySetInnerHTML={{ __html: `
        .content-header { margin-bottom: var(--space-6); }
        .topic-tag { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--primary-cyan); letter-spacing: 1px; margin-bottom: 8px; display: block; }
        .section-title { display: flex; align-items: center; gap: 12px; margin-bottom: var(--space-3); }
        .section-title h2 { margin: 0; font-size: 1.5rem; }
        .goal-section { margin-bottom: var(--space-8); padding: var(--space-6); background: var(--app-card-bg); border-radius: var(--radius-xl); border: 1px solid var(--app-border); }
        .goal-description { color: var(--text-neutral); margin-bottom: var(--space-4); font-size: 0.95rem; }
        .goal-preview-container { background: #f8fafc; border-radius: 12px; border: 1px solid var(--light-tertiary); overflow: hidden; }
        .preview-label { background: var(--light-tertiary); padding: 8px 16px; font-size: 0.75rem; font-weight: 700; color: var(--text-neutral); text-transform: uppercase; letter-spacing: 0.5px; }
        .goal-preview-frame { width: 100%; height: 250px; border: none; background: white; }
        
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
        @keyframes pulse { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 209, 209, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(0, 209, 209, 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 209, 209, 0); } }
        .launch-btn { padding: 14px 32px; font-weight: 800; border-radius: 12px; letter-spacing: 0.5px; box-shadow: 0 10px 20px rgba(0, 209, 209, 0.2); }

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
