import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ShieldAlert, Award, Calendar, ExternalLink, FileText, CheckCircle2, AlertCircle, QrCode, Search, RefreshCw, ChevronDown, ChevronUp, BookOpen, Clock } from 'lucide-react';
import axios from 'axios';
import { Html5QrcodeScanner } from 'html5-qrcode';
import CodeEditor from '../components/CodeEditor';

const VerifyCertificate = () => {
  const { certId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(!!certId);
  const [verification, setVerification] = useState(null);
  const [error, setError] = useState(null);
  const [inputId, setInputId] = useState('');
  const [scanning, setScanning] = useState(false);

  // Collapsible sections state
  const [showAttendanceDetails, setShowAttendanceDetails] = useState(false);
  const [showAssignmentDetails, setShowAssignmentDetails] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const getParsedCode = (codeStr) => {
    try {
      return JSON.parse(codeStr);
    } catch (e) {
      return { html: '<!-- Plain Text Submission -->', css: '', js: '', plain: codeStr };
    }
  };

  useEffect(() => {
    if (!certId) {
      setLoading(false);
      setVerification(null);
      setError(null);
      return;
    }

    const checkVerification = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`/api/auth/verify-certificate/${certId}`);
        setVerification(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Certificate verification failed');
      } finally {
        setLoading(false);
      }
    };

    checkVerification();
  }, [certId]);

  // QR Code Scanner Effect
  useEffect(() => {
    if (scanning) {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 220, height: 220 },
          aspectRatio: 1.0
        },
        false
      );

      const onScanSuccess = (decodedText) => {
        let scannedId = decodedText.trim();
        if (scannedId.includes('/verify-certificate/')) {
          const parts = scannedId.split('/verify-certificate/');
          scannedId = parts[parts.length - 1].trim();
        }

        scannedId = scannedId.replace(/^[/#?]+|[/#?]+$/g, "");

        scanner.clear().catch(err => console.error("Error clearing scanner", err));
        setScanning(false);
        navigate(`/verify-certificate/${scannedId}`);
      };

      const onScanFailure = (error) => {
        // Quietly handle scanner frame errors
      };

      scanner.render(onScanSuccess, onScanFailure);

      return () => {
        scanner.clear().catch(err => console.error("Error clearing scanner on cleanup", err));
      };
    }
  }, [scanning, navigate]);

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (inputId.trim()) {
      let finalId = inputId.trim();
      if (finalId.includes('/verify-certificate/')) {
        const parts = finalId.split('/verify-certificate/');
        finalId = parts[parts.length - 1].trim();
      }
      navigate(`/verify-certificate/${finalId}`);
    }
  };

  const resetVerification = () => {
    setScanning(false);
    setInputId('');
    setShowAttendanceDetails(false);
    setShowAssignmentDetails(false);
    navigate('/verify-certificate');
  };

  // Process details logs if verification succeeded
  const attendanceRecords = verification?.engagement?.attendance || [];
  const assignmentSubmissions = verification?.engagement?.assignments || [];

  const liveAttendanceCount = attendanceRecords.filter(r => r.attendanceType === 'live').length;
  const recordingAttendanceCount = attendanceRecords.filter(r => r.attendanceType === 'recording').length;

  const acceptedAssignmentsCount = assignmentSubmissions.filter(a => a.status === 'accepted').length;
  const pendingAssignmentsCount = assignmentSubmissions.filter(a => a.status === 'pending').length;

  const finalProjectAssignment = assignmentSubmissions.find(a => a.topicId === 'final-project-topic');
  const projectData = finalProjectAssignment ? getParsedCode(finalProjectAssignment.code) : null;

  return (
    <div className="verify-container">
      <div className="verify-background-grid"></div>

      <header className="verify-header">
        <div className="verify-logo">
          <img src="/fav_icon.png" alt="WeMade Logix logo" className="header-logo-img" />
          <span><span className="logo-accent">WeMade</span> Logix</span>
        </div>
        <div className="protocol-badge">
          <ShieldCheck size={14} color="#0047AB" />
          <span>Trust Verification Protocol</span>
        </div>
      </header>

      <main className="verify-card-container">
        {loading ? (
          <div className="verify-card loading-state">
            <div className="spinner"></div>
            <h3>Securing Verification Payload...</h3>
            <p>Querying cryptographic certificate registry on the database...</p>
          </div>
        ) : !certId ? (
          <div className="verify-card portal-state">
            <div className="portal-header-icon">
              <img src="/fav_icon.png" alt="WeMade Logix logo" className="portal-logo-img" />
            </div>

            <h1 className="portal-title">Credential Verification</h1>
            <p className="portal-desc">
              Scan a WeMade Logix student certificate QR code or enter the unique Certificate ID to verify its authenticity.
            </p>

            {scanning ? (
              <div className="scanner-container">
                <div id="qr-reader" className="qr-reader-box"></div>
                <button
                  onClick={() => setScanning(false)}
                  className="action-button-btn secondary-btn cancel-scan-btn"
                >
                  Cancel Scan
                </button>
              </div>
            ) : (
              <div className="portal-actions-wrapper">
                <button
                  onClick={() => setScanning(true)}
                  className="action-button-btn primary-btn scanner-trigger"
                >
                  <QrCode size={18} />
                  <span>Scan Certificate QR</span>
                </button>

                <div className="divider-line">
                  <span>OR</span>
                </div>

                <form onSubmit={handleManualSearch} className="search-form-group">
                  <div className="search-input-wrapper">
                    <Search size={18} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Enter Certificate ID (e.g. WM-studentId-signature)"
                      value={inputId}
                      onChange={(e) => setInputId(e.target.value)}
                      className="search-text-input"
                    />
                  </div>
                  <button type="submit" className="action-button-btn secondary-btn submit-search-btn">
                    Verify ID
                  </button>
                </form>
              </div>
            )}

            <div className="verify-info-footer">
              <p>Trusted & verified cryptographic signature matching registry system.</p>
            </div>
          </div>
        ) : error || !verification?.isValid ? (
          <div className="verify-card error-state">
            <div className="status-icon-badge error">
              <ShieldAlert size={48} color="#ef4444" />
            </div>

            <h1 className="error-title">Verification Refused</h1>
            <div className="error-banner">
              <AlertCircle size={18} />
              <span>{error || verification?.message || 'This certificate has been locked or is invalid.'}</span>
            </div>

            <div className="details-box">
              <p className="details-desc">
                The WeMade Logix cryptographic verification protocol could not validate the integrity of this credential.
              </p>
              <div className="details-row">
                <span className="details-label">Requested ID</span>
                <span className="details-val cert-id-code">{certId}</span>
              </div>
              <div className="details-row">
                <span className="details-label">Status</span>
                <span className="status-badge-failed">UNTRUSTED / LOCKED</span>
              </div>
            </div>

            <p className="contact-help">
              If you believe this is a system error, please contact support at <a href="mailto:support@wemadelogix.com">support@wemadelogix.com</a>
            </p>

            <div className="verify-actions">
              <a href="https://wemade-logix-2026.web.app/" target="_blank" rel="noopener noreferrer" className="action-button-btn link-btn">
                <span>About WeMade Logix</span>
                <ExternalLink size={14} />
              </a>
              <button onClick={resetVerification} className="action-button-btn secondary-btn">
                <RefreshCw size={14} />
                <span>Verify Another</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="verify-card success-state">
            <div className="gold-ribbon-seal">
              <div className="seal-star">🏆</div>
            </div>

            <div className="status-icon-badge success">
              <CheckCircle2 size={48} color="#10b981" />
            </div>

            <span className="trust-stamp">OFFICIAL VERIFIED CREDENTIAL</span>
            <h1 className="success-title">Certificate Validated</h1>

            <div className="success-banner">
              <span>This certificate is trusted and officially issued by WeMade Logix.</span>
            </div>

            <div className="student-profile-info">
              <div className="profile-initial">{verification.student?.name?.charAt(0)}</div>
              <div>
                <h2>{verification.student?.name}</h2>
                <p className="student-email">{verification.student?.email}</p>
              </div>
            </div>

            <div className="verification-details-table">
              <div className="v-row">
                <div className="v-label">
                  <Award size={16} />
                  <span>Program</span>
                </div>
                <div className="v-val highlight">{verification.course}</div>
              </div>
              <div className="v-row">
                <div className="v-label">
                  <Calendar size={16} />
                  <span>Issued Date</span>
                </div>
                <div className="v-val">
                  {new Date(verification.issueDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
              <div className="v-row">
                <div className="v-label">
                  <FileText size={16} />
                  <span>Certificate ID</span>
                </div>
                <div className="v-val cert-id-code">{certId}</div>
              </div>
              <div className="v-row">
                <div className="v-label">
                  <ShieldCheck size={16} />
                  <span>Issuer</span>
                </div>
                <div className="v-val font-semibold text-teal">WeMade Logix Management</div>
              </div>
            </div>

            {/* Attendance Summary & Log Collapsible Section */}
            <div className="collapsible-section">
              <div className="collapsible-header" onClick={() => setShowAttendanceDetails(!showAttendanceDetails)}>
                <h3>
                  <Clock size={16} color="#0047AB" />
                  <span>Attendance & Engagement</span>
                </h3>
                {showAttendanceDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>

              <div className="collapsible-content">
                <div className="engagement-summary-grid">
                  <div className="summary-stat-card">
                    <div className="summary-stat-val">{attendanceRecords.length}</div>
                    <div className="summary-stat-label">Attended</div>
                  </div>
                  <div className="summary-stat-card">
                    <div className="summary-stat-val">{liveAttendanceCount}</div>
                    <div className="summary-stat-label">Live Check-ins</div>
                  </div>
                  <div className="summary-stat-card">
                    <div className="summary-stat-val">{recordingAttendanceCount}</div>
                    <div className="summary-stat-label">Recordings</div>
                  </div>
                </div>

                {showAttendanceDetails && (
                  <div className="collapsible-inner-list">
                    {attendanceRecords.length === 0 ? (
                      <p className="no-engagement-msg">No attendance records found for this student.</p>
                    ) : (
                      attendanceRecords.map((r, index) => (
                        <div className="detail-list-item" key={index}>
                          <div>
                            <span className="detail-day-title">{r.dayId.toUpperCase().replace('-', ' ')}</span>
                            <div className="detail-day-date">Marked via {r.attendanceType}  </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                            <div className="detail-day-date">
                              {r.date ? new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                            </div>
                            <span className={`status-pill accepted`}>
                              {r.attendanceType.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Assignments Summary & Log Collapsible Section */}
            <div className="collapsible-section">
              <div className="collapsible-header" onClick={() => setShowAssignmentDetails(!showAssignmentDetails)}>
                <h3>
                  <BookOpen size={16} color="#0047AB" />
                  <span>Syllabus Work & Assignments</span>
                </h3>
                {showAssignmentDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>

              <div className="collapsible-content">
                <div style={{
                  background: 'rgba(0, 71, 171, 0.04)',
                  border: '1px solid rgba(0, 71, 171, 0.08)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '0.78rem',
                  color: '#0047AB',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '12px'
                }}>
                  <AlertCircle size={14} color="#0047AB" />
                  <span>Click on any assignment to view details & submitted code.</span>
                </div>
                <div className="engagement-summary-grid">
                  <div className="summary-stat-card">
                    <div className="summary-stat-val">{assignmentSubmissions.length}</div>
                    <div className="summary-stat-label">Submitted</div>
                  </div>
                  <div className="summary-stat-card">
                    <div className="summary-stat-val">{acceptedAssignmentsCount}</div>
                    <div className="summary-stat-label">Accepted</div>
                  </div>
                  <div className="summary-stat-card">
                    <div className="summary-stat-val">{pendingAssignmentsCount}</div>
                    <div className="summary-stat-label">Pending</div>
                  </div>
                </div>

                {showAssignmentDetails && (
                  <div className="collapsible-inner-list">
                    {assignmentSubmissions.length === 0 ? (
                      <p className="no-engagement-msg">No assignments submitted yet.</p>
                    ) : (
                      assignmentSubmissions.map((a, index) => (
                        <div
                          className="detail-list-item clickable-row"
                          key={index}
                          onClick={() => setSelectedAssignment(a)}
                          style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                        >
                          <div>
                            <span className="detail-day-title">{a.topicId.toUpperCase().replace('-', ' ')}</span>
                            <div className="detail-day-date">Submitted on {new Date(a.submittedAt || a.createdAt).toLocaleDateString()}</div>
                          </div>
                          <span className={`status-pill ${a.status}`}>
                            {a.status.toUpperCase()}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Final Capstone Project Collapsible Section */}
            {(finalProjectAssignment || verification.capstoneProject) && (
              <div className="collapsible-section">
                <div className="collapsible-header" onClick={() => setShowProjectDetails(!showProjectDetails)}>
                  <h3>
                    <Award size={16} color="#0047AB" />
                    <span>Final Capstone Project Showcase</span>
                  </h3>
                  {showProjectDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                <div className="collapsible-content">
                  {showProjectDetails && (
                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {/* Project Title & Overview */}
                      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', textAlign: 'left' }}>
                        <strong style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                          Project Title
                        </strong>
                        <h4 style={{ margin: '0 0 12px 0', fontSize: '1.05rem', color: '#0f172a', fontWeight: 800 }}>
                          {verification.capstoneProject?.title || projectData?.title || projectData?.projectName || "MERN Stack Application"}
                        </h4>

                        {(projectData?.description || projectData?.plain) && (
                          <>
                            <strong style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
                              Architecture Overview & Summary
                            </strong>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#334155', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                              {projectData.description || projectData.plain}
                            </p>
                          </>
                        )}
                      </div>

                      {/* Deliverables Grid Links */}
                      <div style={{ textAlign: 'left' }}>
                        <strong style={{ display: 'block', fontSize: '0.825rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                          Project Deliverable Artifacts
                        </strong>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '12px',
                        }} className="project-links-grid">
                          {/* GitHub Repository */}
                          {projectData && projectData.githubUrl && (
                            <div className="project-link-card" style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', background: '#ffffff' }}>
                              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>GitHub Code Repository</span>
                              <a href={projectData.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#2563eb', fontWeight: 600, fontSize: '0.825rem', textDecoration: 'underline', wordBreak: 'break-all' }}>
                                <span>Code Repo</span>
                                <ExternalLink size={12} />
                              </a>
                            </div>
                          )}

                          {/* Live Deployment */}
                          {projectData && projectData.liveUrl && (
                            <div className="project-link-card" style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', background: '#ffffff' }}>
                              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Live App URL</span>
                              <a href={projectData.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontWeight: 600, fontSize: '0.825rem', textDecoration: 'underline', wordBreak: 'break-all' }}>
                                <span>Live Application</span>
                                <ExternalLink size={12} />
                              </a>
                            </div>
                          )}

                          {/* Backend API URL */}
                          {projectData && projectData.backendUrl && (
                            <div className="project-link-card" style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', background: '#ffffff' }}>
                              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Backend API Service</span>
                              <a href={projectData.backendUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#4f46e5', fontWeight: 600, fontSize: '0.825rem', textDecoration: 'underline', wordBreak: 'break-all' }}>
                                <span>API Root</span>
                                <ExternalLink size={12} />
                              </a>
                            </div>
                          )}

                          {/* ER Diagram Link */}
                          {projectData && projectData.erDiagramUrl && (
                            <div className="project-link-card" style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', background: '#ffffff' }}>
                              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Database ER Schema</span>
                              <a href={projectData.erDiagramUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#d97706', fontWeight: 600, fontSize: '0.825rem', textDecoration: 'underline', wordBreak: 'break-all' }}>
                                <span>ER Schema Link</span>
                                <ExternalLink size={12} />
                              </a>
                            </div>
                          )}

                          {/* Postman Collection Link */}
                          {projectData && projectData.postmanCollectionUrl && (
                            <div className="project-link-card" style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', background: '#ffffff' }}>
                              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Postman API Collection</span>
                              <a href={projectData.postmanCollectionUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0891b2', fontWeight: 600, fontSize: '0.825rem', textDecoration: 'underline', wordBreak: 'break-all' }}>
                                <span>Postman Specs</span>
                                <ExternalLink size={12} />
                              </a>
                            </div>
                          )}

                          {/* Presentation Link */}
                          {projectData && projectData.presentationUrl && (
                            <div className="project-link-card" style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', background: '#ffffff' }}>
                              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Presentation Deck</span>
                              <a href={projectData.presentationUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#db2777', fontWeight: 600, fontSize: '0.825rem', textDecoration: 'underline', wordBreak: 'break-all' }}>
                                <span>Slides Deck</span>
                                <ExternalLink size={12} />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="integrity-badge" style={{ marginTop: '24px' }}>
              <ShieldCheck size={14} color="#10b981" />
              <span>Cryptographic Signature Matches Registered Records</span>
            </div>

            <div className="verify-actions">
              <a href="https://wemade-logix-2026.web.app/" target="_blank" rel="noopener noreferrer" className="action-button-btn link-btn">
                <span>About WeMade Logix</span>
                <ExternalLink size={14} />
              </a>
              <button onClick={resetVerification} className="action-button-btn secondary-btn">
                <RefreshCw size={14} />
                <span>Verify Another</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {selectedAssignment && (
        <div 
          className="admin-modal-overlay no-print" 
          onClick={() => setSelectedAssignment(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000
          }}
        >
          <div 
            className="admin-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
            border: '1px solid #e2e8f0',
            padding: '24px',
            borderRadius: '16px',
            maxWidth: '750px',
            width: '90%',
            boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '85vh'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
              <div style={{ textAlign: 'left' }}>
                <h2 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, margin: 0 }}>
                  {selectedAssignment.topicId.toUpperCase().replace('-', ' ')}
                </h2>
                <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '4px 0 0 0' }}>
                  Submitted on {new Date(selectedAssignment.submittedAt || selectedAssignment.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className={`status-pill ${selectedAssignment.status}`} style={{ fontSize: '0.7rem' }}>
                {selectedAssignment.status.toUpperCase()}
              </span>
            </div>

            <div style={{ minHeight: '450px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', textAlign: 'left' }}>
              <CodeEditor
                initialCode={getParsedCode(selectedAssignment.code)}
                readOnly={true}
                isBackend={selectedAssignment.topicId.startsWith('w6') || selectedAssignment.topicId.startsWith('w7')}
                isReact={selectedAssignment.topicId.startsWith('w4') || selectedAssignment.topicId.startsWith('w5-d1') || selectedAssignment.topicId.startsWith('w5-d2') || selectedAssignment.topicId.startsWith('w5-d3')}
              />
            </div>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedAssignment(null)}
                className="action-button-btn secondary-btn"
                style={{ width: 'auto', padding: '8px 24px' }}
              >
                Close Code
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="verify-footer">
        <p>© {new Date().getFullYear()} WeMade Logix Inc. All rights reserved. Secure cryptographic signatures protect this credential.</p>
      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
        .verify-container {
          min-height: 100vh;
          background-color: #f8fafc;
          color: #1e293b;
          font-family: 'Inter', -apple-system, sans-serif;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 88px 20px 24px 20px;
          overflow-x: hidden;
        }

        .admin-modal .editor-container {
          height: 480px !important;
          margin: 12px 0 !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 12px !important;
        }

        .admin-modal .preview-panel {
          padding: 8px !important;
          background: #ffffff !important;
        }

        .admin-modal .iframe-container iframe {
          border-radius: 6px !important;
          border: 1px solid #e2e8f0 !important;
        }

        .verify-background-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(0, 71, 171, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 71, 171, 0.02) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none;
          z-index: 0;
        }

        .verify-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: rgba(248, 250, 252, 0.92);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          z-index: 1000;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
        }

        .verify-logo {
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .header-logo-img {
          width: 28px;
          height: 28px;
          object-fit: contain;
        }

        .logo-accent {
          color: #0047AB;
        }

        .protocol-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 71, 171, 0.05);
          border: 1px solid rgba(0, 71, 171, 0.12);
          padding: 5px 12px;
          border-radius: 9999px;
          font-size: 0.72rem;
          color: #0047AB;
          font-weight: 600;
        }

        .verify-card-container {
          width: 100%;
          max-width: 520px;
          z-index: 1;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 10px 0;
        }

        .verify-card {
          width: 100%;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px 20px;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);
          position: relative;
          overflow: hidden;
        }

        .portal-state {
          text-align: center;
        }

        .portal-header-icon {
          width: 64px;
          height: 64px;
          background: rgba(0, 71, 171, 0.04);
          border: 1px solid rgba(0, 71, 171, 0.08);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px auto;
        }

        .portal-logo-img {
          width: 36px;
          height: 36px;
          object-fit: contain;
        }

        .portal-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
          letter-spacing: -0.3px;
        }

        .portal-desc {
          font-size: 0.88rem;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .scanner-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
        }

        .qr-reader-box {
          width: 100%;
          max-width: 380px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          background: #fafafa;
        }

        .cancel-scan-btn {
          width: auto !important;
          padding: 8px 20px !important;
          font-size: 0.85rem !important;
        }

        .portal-actions-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .divider-line {
          display: flex;
          align-items: center;
          text-align: center;
          color: #94a3b8;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .divider-line::before, .divider-line::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #e2e8f0;
        }

        .divider-line span {
          padding: 0 10px;
        }

        .search-form-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .search-input-wrapper {
          position: relative;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .search-text-input {
          width: 100%;
          padding: 11px 12px 11px 40px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.88rem;
          background: #f8fafc;
          outline: none;
          color: #0f172a;
          transition: border-color 0.2s;
        }

        .search-text-input:focus {
          border-color: #0047AB;
          background: #ffffff;
        }

        .verify-info-footer {
          margin-top: 24px;
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 20px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(0, 71, 171, 0.06);
          border-left-color: #0047AB;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .status-icon-badge {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px auto;
        }

        .status-icon-badge.success {
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.15);
        }

        .status-icon-badge.error {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.15);
        }

        .trust-stamp {
          display: block;
          text-align: center;
          font-size: 0.7rem;
          color: #d97706;
          font-weight: 750;
          letter-spacing: 1.5px;
          margin-bottom: 6px;
        }

        .success-title {
          font-size: 1.45rem;
          font-weight: 800;
          text-align: center;
          color: #0f172a;
          margin-bottom: 8px;
          letter-spacing: -0.3px;
        }

        .error-title {
          font-size: 1.45rem;
          font-weight: 800;
          text-align: center;
          color: #ef4444;
          margin-bottom: 8px;
          letter-spacing: -0.3px;
        }

        .success-banner {
          background: rgba(16, 185, 129, 0.05);
          border: 1px solid rgba(16, 185, 129, 0.12);
          color: #047857;
          padding: 10px 14px;
          border-radius: 8px;
          text-align: center;
          font-size: 0.85rem;
          margin-bottom: 20px;
        }

        .error-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: rgba(239, 68, 68, 0.05);
          border: 1px solid rgba(239, 68, 68, 0.12);
          color: #b91c1c;
          padding: 10px 14px;
          border-radius: 8px;
          text-align: center;
          font-size: 0.85rem;
          margin-bottom: 20px;
        }

        .student-profile-info {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 14px;
          border-radius: 10px;
          margin-bottom: 20px;
          text-align: left;
        }

        .profile-initial {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00D1D1 0%, #0047AB 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.15rem;
          font-weight: 700;
          color: white;
        }

        .student-profile-info h2 {
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 1px 0;
        }

        .student-email {
          font-size: 0.8rem;
          color: #64748b;
          margin: 0;
        }

        .verification-details-table {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .v-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 11px 14px;
          border-bottom: 1px solid #e2e8f0;
        }

        .v-row:last-child {
          border-bottom: none;
        }

        .v-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #64748b;
          font-size: 0.8rem;
        }

        .v-val {
          font-size: 0.8rem;
          font-weight: 600;
          color: #0f172a;
          text-align: right;
        }

        .v-val.highlight {
          color: #0047AB;
        }

        .cert-id-code {
          font-family: monospace;
          background: #e2e8f0;
          padding: 1px 6px;
          border-radius: 4px;
          color: #334155 !important;
          font-size: 0.75rem;
        }

        .collapsible-section {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          margin-top: 12px;
          overflow: hidden;
        }

        .collapsible-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          cursor: pointer;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          transition: background 0.2s;
        }

        .collapsible-header:hover {
          background: #f1f5f9;
        }

        .collapsible-header h3 {
          margin: 0;
          font-size: 0.88rem;
          font-weight: 700;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .collapsible-content {
          padding: 12px 16px;
          text-align: left;
        }

        .engagement-summary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 8px;
          margin-bottom: 10px;
        }

        .summary-stat-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 8px 4px;
          border-radius: 6px;
          text-align: center;
        }

        .summary-stat-val {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0047AB;
        }

        .summary-stat-label {
          font-size: 0.68rem;
          color: #64748b;
          margin-top: 2px;
          font-weight: 600;
        }

        .collapsible-inner-list {
          max-height: 200px;
          overflow-y: auto;
          border-top: 1px dashed #e2e8f0;
          padding-top: 8px;
          margin-top: 8px;
        }

        .detail-list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .detail-list-item:last-child {
          border-bottom: none;
        }

        .detail-day-title {
          font-size: 0.78rem;
          font-weight: 600;
          color: #1e293b;
        }

        .detail-day-date {
          font-size: 0.7rem;
          color: #94a3b8;
        }

        .status-pill {
          font-size: 0.68rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 9999px;
        }

        .status-pill.accepted {
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.15);
          color: #047857;
        }

        .status-pill.pending {
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.15);
          color: #b45309;
        }

        .status-pill.rejected {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.15);
          color: #b91c1c;
        }

        .status-pill.live {
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.15);
          color: #047857;
        }

        .status-pill.recording {
          background: rgba(0, 71, 171, 0.08);
          border: 1px solid rgba(0, 71, 171, 0.15);
          color: #0047AB;
        }

        .no-engagement-msg {
          font-size: 0.78rem;
          color: #94a3b8;
          text-align: center;
          padding: 12px 0;
          margin: 0;
        }

        .integrity-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-size: 0.72rem;
          color: #10b981;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .verify-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .action-button-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: linear-gradient(135deg, #0047AB 0%, #00D1D1 100%);
          border: none;
          color: #ffffff;
          padding: 11px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.2s, opacity 0.2s;
          width: 100%;
        }

        .action-button-btn:hover {
          opacity: 0.95;
          transform: translateY(-1px);
        }

        .action-button-btn.secondary-btn {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #334155;
        }

        .action-button-btn.secondary-btn:hover {
          background: #e2e8f0;
        }

        .gold-ribbon-seal {
          position: absolute;
          top: -10px;
          right: 20px;
          width: 40px;
          height: 56px;
          background: linear-gradient(135deg, #d97706 0%, #fbbf24 100%);
          border-radius: 0 0 5px 5px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 6px;
          box-shadow: 0 3px 8px rgba(0,0,0,0.1);
        }

        .seal-star {
          font-size: 1rem;
        }

        .details-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 14px;
          border-radius: 10px;
          margin-bottom: 20px;
          text-align: left;
        }

        .details-desc {
          font-size: 0.8rem;
          color: #64748b;
          margin: 0 0 12px 0;
          line-height: 1.45;
        }

        .details-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .details-row:last-child {
          border-bottom: none;
        }

        .details-label {
          font-size: 0.8rem;
          color: #64748b;
        }

        .details-val {
          font-size: 0.8rem;
          font-weight: 600;
        }

        .status-badge-failed {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.15);
          color: #dc2626;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 750;
        }

        .contact-help {
          text-align: center;
          font-size: 0.75rem;
          color: #64748b;
          margin-bottom: 20px;
          line-height: 1.45;
        }

        .contact-help a {
          color: #0047AB;
          text-decoration: none;
        }

        .verify-footer {
          width: 100%;
          max-width: 520px;
          text-align: center;
          z-index: 1;
          margin-top: 20px;
        }

        .verify-footer p {
          font-size: 0.7rem;
          color: #64748b;
          line-height: 1.45;
        }

        .text-teal {
          color: #0047AB !important;
        }

        .clickable-row {
          padding: 8px 8px !important;
          margin: 0 -8px;
          border-radius: 6px;
        }

        .clickable-row:hover {
          background: #f1f5f9;
        }

        @media (max-width: 480px) {
          .verify-card {
            padding: 20px 16px;
            border-radius: 12px;
          }
          .verify-header {
            flex-direction: row;
            gap: 0;
            justify-content: space-between;
          }
          .success-title, .error-title {
            font-size: 1.3rem;
          }
          .project-links-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
};

export default VerifyCertificate;
