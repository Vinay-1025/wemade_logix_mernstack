import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MainLayout from '../components/MainLayout';
import axios from 'axios';
import { capstoneRegistry } from '../data/capstones';
import { 
  Laptop, 
  Search, 
  RefreshCw, 
  CheckCircle, 
  Clock, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  User, 
  Database,
  Grid,
  Unlock,
  Lock,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

const CapstonesAdmin = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('allocated'); // 'allocated' or 'unallocated'
  
  // Review Stack States
  const [selectedProject, setSelectedProject] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [gradingLoading, setGradingLoading] = useState(false);
  const [modalTab, setModalTab] = useState('submission'); // 'submission' or 'spec'
  
  // Notification states (Snackbar)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });
  const showSnackbar = (message, type = 'success') => {
    setSnackbar({ open: true, message, type });
    setTimeout(() => setSnackbar(prev => ({ ...prev, open: false })), 4000);
  };

  const fetchCapstoneStatus = async () => {
    if (!currentUser?.token) return;
    setLoading(true);
    try {
      const response = await axios.get('/api/capstone/admin', {
        headers: { 'Authorization': `Bearer ${currentUser.token}` }
      });
      if (response.data?.success) {
        setProjects(response.data.projects);
      }
    } catch (err) {
      console.error('Failed to fetch capstones:', err);
      showSnackbar('Failed to fetch Capstone pool details.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.token) {
      fetchCapstoneStatus();
    }
  }, [currentUser]);

  const handleRelease = async (projectCode) => {
    if (!currentUser?.token) return;
    const confirm = window.confirm(`Are you sure you want to release Capstone Project ${projectCode}? This will remove the student's unique allocation and return the project back to the available pool.`);
    if (!confirm) return;

    try {
      const response = await axios.post('/api/capstone/admin/release', 
        { projectCode },
        { headers: { 'Authorization': `Bearer ${currentUser.token}` } }
      );
      if (response.data?.success) {
        showSnackbar(`Project ${projectCode} released successfully.`, 'success');
        fetchCapstoneStatus();
      }
    } catch (err) {
      console.error('Failed to release capstone:', err);
      showSnackbar(err.response?.data?.message || 'Error releasing Capstone project.', 'error');
    }
  };

  const handleGrade = async (status) => {
    if (!currentUser?.token || !selectedProject?.submission?._id) return;
    setGradingLoading(true);
    try {
      const response = await axios.put(`/api/assignments/${selectedProject.submission._id}`, 
        { status, feedback: feedback.trim() },
        { headers: { 'Authorization': `Bearer ${currentUser.token}` } }
      );
      if (response.data) {
        showSnackbar(`Capstone submission successfully graded as ${status.toUpperCase()}.`, 'success');
        setSelectedProject(null);
        setFeedback('');
        fetchCapstoneStatus();
      }
    } catch (err) {
      console.error('Grading Capstone error:', err);
      showSnackbar('Error submitting review.', 'error');
    } finally {
      setGradingLoading(false);
    }
  };

  const allocatedProjects = projects.filter(p => p.assignedTo);
  const unallocatedProjects = projects.filter(p => !p.assignedTo);

  const filteredAllocated = allocatedProjects.filter(p => {
    const query = searchQuery.toLowerCase();
    return p.projectCode.toLowerCase().includes(query) ||
           p.title.toLowerCase().includes(query) ||
           p.assignedTo.name.toLowerCase().includes(query) ||
           p.assignedTo.email.toLowerCase().includes(query);
  });

  const filteredUnallocated = unallocatedProjects.filter(p => {
    const query = searchQuery.toLowerCase();
    return p.projectCode.toLowerCase().includes(query) ||
           p.title.toLowerCase().includes(query);
  });

  // Helper to parse student links from JSON payload
  const getSubDetails = (codeStr) => {
    try {
      return JSON.parse(codeStr);
    } catch(e) {
      return { githubUrl: '', liveUrl: '', description: codeStr };
    }
  };

  return (
    <MainLayout>
      <div className="capstones-admin-container" style={{
        padding: '40px 30px',
        maxWidth: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
        fontFamily: '"Inter", sans-serif'
      }}>
        {/* Header Block */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '24px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.02)'
        }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
              Capstone Management Center
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
              Audit unique student Capstone allocations, check submission files, and lock/unlock graduation requirements.
            </p>
          </div>
          <button
            onClick={fetchCapstoneStatus}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              color: '#334155'
            }}
          >
            <RefreshCw size={16} className={loading ? 'spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Snackbar Notification */}
        {snackbar.open && (
          <div className={`snackbar-notification ${snackbar.type} card-3d`}>
            {snackbar.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{snackbar.message}</span>
          </div>
        )}

        {!selectedProject ? (
          <>
            {/* Aggregated Metric Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  <span>Total Pool</span>
                  <Database size={16} color="#0047ab" />
                </div>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>{projects.length}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '6px' }}>Configured project templates</div>
              </div>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  <span>Allocated</span>
                  <User size={16} color="#10b981" />
                </div>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#10b981', marginTop: '12px' }}>{allocatedProjects.length}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '6px' }}>Assigned to active students</div>
              </div>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  <span>Available Pool</span>
                  <Grid size={16} color="#3b82f6" />
                </div>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#3b82f6', marginTop: '12px' }}>{unallocatedProjects.length}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '6px' }}>Ready for new student claims</div>
              </div>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  <span>Pending Reviews</span>
                  <Clock size={16} color="#f59e0b" />
                </div>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#f59e0b', marginTop: '12px' }}>
                  {projects.filter(p => p.submission?.status === 'pending').length}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '6px' }}>Submissions awaiting audit</div>
              </div>
            </div>

            {/* Tab switcher and search query container */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '24px'
            }}>
              {/* Tab buttons */}
              <div style={{
                display: 'flex',
                background: '#e2e8f0',
                padding: '4px',
                borderRadius: '12px'
              }}>
                <button
                  onClick={() => setActiveTab('allocated')}
                  style={{
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    background: activeTab === 'allocated' ? '#ffffff' : 'transparent',
                    color: activeTab === 'allocated' ? '#0f172a' : '#64748b',
                    boxShadow: activeTab === 'allocated' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  Allocated Capstones ({allocatedProjects.length})
                </button>
                <button
                  onClick={() => setActiveTab('unallocated')}
                  style={{
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    background: activeTab === 'unallocated' ? '#ffffff' : 'transparent',
                    color: activeTab === 'unallocated' ? '#0f172a' : '#64748b',
                    boxShadow: activeTab === 'unallocated' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  Unallocated Pool ({unallocatedProjects.length})
                </button>
              </div>

              {/* Search Box */}
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '360px'
              }}>
                <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder={activeTab === 'allocated' ? "Search student, email, or code..." : "Search available project code..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 42px',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    background: 'white',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Main tables list */}
            <div style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)',
              overflow: 'hidden'
            }}>
              {loading ? (
                <div style={{ padding: '60px', textAlign: 'center', color: '#64748b', fontStyle: 'italic' }}>
                  Loading capstone pool...
                </div>
              ) : activeTab === 'allocated' ? (
                /* Allocated Projects Table (Checklist Progress Column Removed) */
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Code</th>
                        <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Topic Title</th>
                        <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Assigned Student</th>
                        <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Submission Status</th>
                        <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAllocated.length === 0 ? (
                        <tr>
                          <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' }}>
                            No allocated capstones found.
                          </td>
                        </tr>
                      ) : (
                        filteredAllocated.map((project) => {
                          return (
                            <tr 
                              key={project._id} 
                              onClick={() => { 
                                setSelectedProject(project); 
                                setModalTab(project.submission ? 'submission' : 'spec'); 
                              }}
                              style={{ 
                                borderBottom: '1px solid #f1f5f9', 
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <td style={{ padding: '20px 24px' }}>
                                <span style={{
                                  background: '#eff6ff',
                                  color: '#0047ab',
                                  fontWeight: 700,
                                  fontSize: '0.75rem',
                                  padding: '4px 8px',
                                  borderRadius: '6px'
                                }}>
                                  {project.projectCode}
                                </span>
                              </td>
                              <td style={{ padding: '20px 24px', fontWeight: 600, color: '#1e293b' }}>
                                {project.title}
                              </td>
                              <td style={{ padding: '20px 24px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={{ fontWeight: 700, color: '#334155', fontSize: '0.9rem' }}>{project.assignedTo?.name}</span>
                                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{project.assignedTo?.email}</span>
                                </div>
                              </td>
                              <td style={{ padding: '20px 24px' }}>
                                {(() => {
                                  const sub = project.submission;
                                  if (!sub) return <span style={{ background: '#f1f5f9', color: '#64748b', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>Not Started</span>;
                                  if (sub.status === 'accepted') return <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>Approved</span>;
                                  if (sub.status === 'rejected') return <span style={{ background: '#fee2e2', color: '#991b1b', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>Needs Revision</span>;
                                  return <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>Awaiting Review</span>;
                                })()}
                              </td>
                              <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                  {project.submission && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedProject(project);
                                        setModalTab('submission');
                                      }}
                                      style={{
                                        background: 'linear-gradient(135deg, #0047ab 0%, #002f80 100%)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 14px',
                                        borderRadius: '8px',
                                        fontWeight: 700,
                                        fontSize: '0.8rem',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      Review Code
                                    </button>
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRelease(project.projectCode);
                                    }}
                                    style={{
                                      background: '#fef2f2',
                                      color: '#ef4444',
                                      border: '1px solid #fecaca',
                                      padding: '8px 14px',
                                      borderRadius: '8px',
                                      fontWeight: 700,
                                      fontSize: '0.8rem',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    Release
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Unallocated Pool Card Grid */
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', padding: '30px' }}>
                  {filteredUnallocated.length === 0 ? (
                    <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' }}>
                      No unallocated capstone slots available in the pool.
                    </div>
                  ) : (
                    filteredUnallocated.map((project) => (
                      <div 
                        key={project._id} 
                        style={{
                          border: '1px solid #cbd5e1',
                          borderRadius: '16px',
                          padding: '20px',
                          background: '#fafafa',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px'
                        }}
                      >
                        <div>
                          <span style={{
                            background: '#e0f2fe',
                            color: '#0369a1',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            padding: '4px 8px',
                            borderRadius: '6px'
                          }}>
                            {project.projectCode}
                          </span>
                        </div>
                        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>
                          {project.title}
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                          STATUS: AVAILABLE POOL
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          /* Stack Page Detail View */
          <div style={{
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            {/* Header / Back Action Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #f1f5f9',
              paddingBottom: '20px'
            }}>
              <button
                onClick={() => { setSelectedProject(null); setFeedback(''); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  color: '#334155',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#e2e8f0'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f8fafc'}
              >
                <span>← Back to Capstones list</span>
              </button>

              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{
                  background: '#eff6ff',
                  color: '#0047ab',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  padding: '6px 12px',
                  borderRadius: '8px'
                }}>
                  {selectedProject.projectCode}
                </span>
                <span style={{
                  background: selectedProject.submission?.status === 'accepted' ? '#d1fae5' : selectedProject.submission?.status === 'rejected' ? '#fee2e2' : selectedProject.submission ? '#e0f2fe' : '#f1f5f9',
                  color: selectedProject.submission?.status === 'accepted' ? '#065f46' : selectedProject.submission?.status === 'rejected' ? '#991b1b' : selectedProject.submission ? '#0369a1' : '#64748b',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  padding: '6px 12px',
                  borderRadius: '8px'
                }}>
                  {selectedProject.submission?.status ? selectedProject.submission.status.toUpperCase() : 'NOT STARTED'}
                </span>
              </div>
            </div>

            {/* Title & Profile Detail */}
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0' }}>
                {selectedProject.title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.9rem' }}>
                <User size={16} />
                <span style={{ fontWeight: 700, color: '#334155' }}>{selectedProject.assignedTo?.name}</span>
                <span>({selectedProject.assignedTo?.email})</span>
              </div>
            </div>

            {/* Tab Swapping Header */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', padding: '0 12px', borderRadius: '12px' }}>
              <button
                onClick={() => {
                  if (selectedProject.submission) {
                    setModalTab('submission');
                  }
                }}
                style={{
                  padding: '14px 20px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  background: 'none',
                  border: 'none',
                  borderBottom: modalTab === 'submission' ? '3px solid #0047ab' : '3px solid transparent',
                  color: modalTab === 'submission' ? '#0047ab' : '#64748b',
                  cursor: selectedProject.submission ? 'pointer' : 'not-allowed',
                  opacity: selectedProject.submission ? 1 : 0.5,
                  transition: 'all 0.2s'
                }}
              >
                Submission & Review {selectedProject.submission ? '' : '(No Submission)'}
              </button>
              <button
                onClick={() => setModalTab('spec')}
                style={{
                  padding: '14px 20px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  background: 'none',
                  border: 'none',
                  borderBottom: modalTab === 'spec' ? '3px solid #0047ab' : '3px solid transparent',
                  color: modalTab === 'spec' ? '#0047ab' : '#64748b',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  marginLeft: '12px'
                }}
              >
                Project Spec & Live Progress
              </button>
            </div>

            {/* Page content body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {modalTab === 'submission' ? (
                /* SUBMISSION VIEW */
                selectedProject.submission ? (
                  (() => {
                    const details = getSubDetails(selectedProject.submission.code);
                    const regDetails = capstoneRegistry[selectedProject.projectCode] || {};
                    const compModules = selectedProject.progress?.completedModules || [];
                    const compPages = selectedProject.progress?.completedPages || [];
                    const compCollections = selectedProject.progress?.completedCollections || [];

                    // Calculate total pages
                    let pagesTotal = 0;
                    if (regDetails.pages) {
                      Object.keys(regDetails.pages).forEach(cat => {
                        pagesTotal += regDetails.pages[cat].length;
                      });
                    }

                    // Combined metrics
                    const totalItems = (regDetails.modules?.length || 0) + pagesTotal + (regDetails.databaseCollections?.length || 0);
                    const completedItems = compModules.length + compPages.length + compCollections.length;
                    const percentComplete = totalItems ? Math.round((completedItems / totalItems) * 100) : 0;

                    return (
                      <>
                        {/* URL Deliverables Grid */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                          gap: '16px',
                          background: '#f8fafc',
                          padding: '24px',
                          borderRadius: '16px',
                          border: '1px solid #cbd5e1'
                        }}>
                          <div>
                            <strong style={{ color: '#475569', fontSize: '0.825rem', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.025em' }}>GitHub Code Repository:</strong>
                            <a 
                              href={details.githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: '#0047ab',
                                textDecoration: 'underline',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                wordBreak: 'break-all'
                              }}
                            >
                              {details.githubUrl || 'N/A'}
                              <ExternalLink size={13} />
                            </a>
                          </div>

                          <div>
                            <strong style={{ color: '#475569', fontSize: '0.825rem', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.025em' }}>Live Deployed URL (Frontend):</strong>
                            {details.liveUrl ? (
                              <a 
                                href={details.liveUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  color: '#10b981',
                                  textDecoration: 'underline',
                                  fontWeight: 700,
                                  fontSize: '0.9rem',
                                  wordBreak: 'break-all'
                                }}
                              >
                                {details.liveUrl}
                                <ExternalLink size={13} />
                              </a>
                            ) : (
                              <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.9rem' }}>N/A</span>
                            )}
                          </div>

                          <div>
                            <strong style={{ color: '#475569', fontSize: '0.825rem', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.025em' }}>Backend API URL:</strong>
                            {details.backendUrl ? (
                              <a 
                                href={details.backendUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  color: '#8b5cf6',
                                  textDecoration: 'underline',
                                  fontWeight: 700,
                                  fontSize: '0.9rem',
                                  wordBreak: 'break-all'
                                }}
                              >
                                {details.backendUrl}
                                <ExternalLink size={13} />
                              </a>
                            ) : (
                              <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.9rem' }}>N/A</span>
                            )}
                          </div>

                          <div>
                            <strong style={{ color: '#475569', fontSize: '0.825rem', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.025em' }}>ER Diagram URL:</strong>
                            {details.erDiagramUrl ? (
                              <a 
                                href={details.erDiagramUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  color: '#f59e0b',
                                  textDecoration: 'underline',
                                  fontWeight: 700,
                                  fontSize: '0.9rem',
                                  wordBreak: 'break-all'
                                }}
                              >
                                {details.erDiagramUrl}
                                <ExternalLink size={13} />
                              </a>
                            ) : (
                              <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.9rem' }}>N/A</span>
                            )}
                          </div>

                          <div>
                            <strong style={{ color: '#475569', fontSize: '0.825rem', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.025em' }}>Postman Collection URL:</strong>
                            {details.postmanCollectionUrl ? (
                              <a 
                                href={details.postmanCollectionUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  color: '#ec4899',
                                  textDecoration: 'underline',
                                  fontWeight: 700,
                                  fontSize: '0.9rem',
                                  wordBreak: 'break-all'
                                }}
                              >
                                {details.postmanCollectionUrl}
                                <ExternalLink size={13} />
                              </a>
                            ) : (
                              <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.9rem' }}>N/A</span>
                            )}
                          </div>

                          <div>
                            <strong style={{ color: '#475569', fontSize: '0.825rem', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.025em' }}>Presentation Slides URL:</strong>
                            {details.presentationUrl ? (
                              <a 
                                href={details.presentationUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  color: '#f43f5e',
                                  textDecoration: 'underline',
                                  fontWeight: 700,
                                  fontSize: '0.9rem',
                                  wordBreak: 'break-all'
                                }}
                              >
                                {details.presentationUrl}
                                <ExternalLink size={13} />
                              </a>
                            ) : (
                              <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.9rem' }}>N/A</span>
                            )}
                          </div>
                        </div>

                        {/* Project Description */}
                        <div>
                          <strong style={{ color: '#475569', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>Student Architecture Description:</strong>
                          <p style={{
                            margin: 0,
                            background: '#f8fafc',
                            padding: '20px',
                            borderRadius: '12px',
                            border: '1px solid #cbd5e1',
                            whiteSpace: 'pre-wrap',
                            fontSize: '0.925rem',
                            color: '#334155',
                            lineHeight: '1.6'
                          }}>
                            {details.description || 'No description provided.'}
                          </p>
                        </div>

                        {/* Checklist Progress shown clearly in detailed page stack view */}
                        {regDetails.modules && (
                          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                              <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>
                                Live Checklist Progress Summary
                              </strong>
                              <span style={{ background: '#eff6ff', color: '#0047ab', fontWeight: 800, padding: '4px 10px', borderRadius: '8px', fontSize: '0.825rem' }}>
                                {percentComplete}% Completed ({completedItems}/{totalItems} items)
                              </span>
                            </div>

                            <div style={{ background: '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
                              <div style={{ background: 'linear-gradient(90deg, #0047ab 0%, #3b82f6 100%)', height: '100%', width: `${percentComplete}%`, transition: 'width 0.4s' }}></div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', fontSize: '0.85rem' }}>
                              <div>
                                <h5 style={{ margin: '0 0 8px 0', color: '#0047ab', fontWeight: 800, fontSize: '0.875rem' }}>
                                  Modules ({compModules.length}/{regDetails.modules.length})
                                </h5>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto', background: 'white', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                                  {regDetails.modules.map((m, idx) => {
                                    const checked = compModules.includes(m);
                                    const reason = selectedProject.progress?.uncheckReasons?.[`module:${m}`];
                                    return (
                                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '2px', opacity: checked ? 1 : 0.8 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                          <span style={{ color: checked ? '#10b981' : '#94a3b8', fontWeight: 'bold' }}>{checked ? '✓' : '○'}</span>
                                          <span style={{ textDecoration: checked ? 'line-through' : 'none', color: '#334155' }}>{m}</span>
                                        </div>
                                        {!checked && reason && (
                                          <span style={{ fontSize: '0.7rem', color: '#b45309', background: '#fffbeb', border: '1px dashed #fcd34d', padding: '2px 6px', borderRadius: '4px', marginLeft: '16px', display: 'inline-block', width: 'fit-content' }}>
                                            ⚠️ Reason: "{reason}"
                                          </span>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              <div>
                                <h5 style={{ margin: '0 0 8px 0', color: '#10b981', fontWeight: 800, fontSize: '0.875rem' }}>
                                  DB Collections ({compCollections.length}/{regDetails.databaseCollections.length})
                                </h5>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto', background: 'white', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                                  {regDetails.databaseCollections.map((col, idx) => {
                                    const checked = compCollections.includes(col);
                                    const reason = selectedProject.progress?.uncheckReasons?.[`collection:${col}`];
                                    return (
                                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '2px', opacity: checked ? 1 : 0.8 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                          <span style={{ color: checked ? '#10b981' : '#94a3b8', fontWeight: 'bold' }}>{checked ? '✓' : '○'}</span>
                                          <span style={{ textDecoration: checked ? 'line-through' : 'none', color: '#334155' }}>{col}</span>
                                        </div>
                                        {!checked && reason && (
                                          <span style={{ fontSize: '0.7rem', color: '#b45309', background: '#fffbeb', border: '1px dashed #fcd34d', padding: '2px 6px', borderRadius: '4px', marginLeft: '16px', display: 'inline-block', width: 'fit-content' }}>
                                            ⚠️ Reason: "{reason}"
                                          </span>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                          <label htmlFor="modalFeedback" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <MessageSquare size={16} />
                              <span>Add Review Comments / Tutor Feedback</span>
                            </span>
                          </label>
                          <textarea
                            id="modalFeedback"
                            rows="4"
                            placeholder="Provide detailed feedback on what features were checked, or write revision instructions if rejecting..."
                            value={feedback || selectedProject.submission?.feedback || ''}
                            onChange={(e) => setFeedback(e.target.value)}
                            style={{
                              width: '100%',
                              padding: '14px',
                              borderRadius: '12px',
                              border: '1px solid #cbd5e1',
                              fontSize: '0.9rem',
                              outline: 'none',
                              resize: 'vertical',
                              boxSizing: 'border-box'
                            }}
                          />
                        </div>
                      </>
                    );
                  })()
                ) : (
                  <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
                    <Laptop size={48} style={{ color: '#cbd5e1', marginBottom: '16px' }} />
                    <h4 style={{ margin: '0 0 8px 0', fontWeight: 800, color: '#1e293b' }}>No Submission Yet</h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
                      The student has not submitted this project for review yet. You can inspect their live specifications progress in the <strong>Project Spec</strong> tab!
                    </p>
                  </div>
                )
              ) : (
                /* SPECIFICATIONS VIEW */
                (() => {
                  const regDetails = capstoneRegistry[selectedProject.projectCode] || {};
                  const compModules = selectedProject.progress?.completedModules || [];
                  const compPages = selectedProject.progress?.completedPages || [];
                  const compCollections = selectedProject.progress?.completedCollections || [];

                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      {/* Overview & Problem Statement */}
                      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                        <h4 style={{ margin: '0 0 8px 0', color: '#0f172a', fontWeight: 800, fontSize: '1rem' }}>Project Overview</h4>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: '1.6' }}>{regDetails.overview}</p>
                        
                        {regDetails.problemStatement && (
                          <>
                            <h5 style={{ margin: '18px 0 8px 0', color: '#1e293b', fontWeight: 700, fontSize: '0.9rem' }}>Problem Statement</h5>
                            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.875rem', color: '#475569', lineHeight: '1.6' }}>
                              {regDetails.problemStatement.map((prob, idx) => <li key={idx} style={{ marginBottom: '4px' }}>{prob}</li>)}
                            </ul>
                          </>
                        )}
                      </div>

                      {/* Tech Stack */}
                      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#0f172a', fontWeight: 800, fontSize: '1rem' }}>Tech Stack</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {regDetails.techStack?.map((tech, idx) => (
                            <span key={idx} style={{ background: '#eff6ff', color: '#0047ab', fontWeight: 700, fontSize: '0.75rem', padding: '4px 10px', borderRadius: '12px', border: '1px solid #dbeafe' }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project Objectives */}
                      {regDetails.objectives && (
                        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                          <h4 style={{ margin: '0 0 8px 0', color: '#0f172a', fontWeight: 800, fontSize: '1rem' }}>Project Objectives</h4>
                          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: '#475569', lineHeight: '1.6' }}>
                            {regDetails.objectives.map((obj, idx) => <li key={idx} style={{ marginBottom: '4px' }}>{obj}</li>)}
                          </ul>
                        </div>
                      )}

                      {/* Live Checklist Completion */}
                      {regDetails.modules && (
                        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                          <h4 style={{ margin: '0 0 16px 0', color: '#0f172a', fontWeight: 800, fontSize: '1rem' }}>Live Checklist Completion</h4>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', fontSize: '0.85rem' }}>
                            <div>
                              <h5 style={{ margin: '0 0 8px 0', color: '#0047ab', fontWeight: 800, fontSize: '0.875rem' }}>Modules</h5>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'white', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                                {regDetails.modules.map((m, idx) => {
                                  const checked = compModules.includes(m);
                                  const reason = selectedProject.progress?.uncheckReasons?.[`module:${m}`];
                                  return (
                                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input type="checkbox" checked={checked} disabled style={{ margin: 0, width: '14px', height: '14px' }} />
                                        <span style={{ textDecoration: checked ? 'line-through' : 'none', color: checked ? '#0f172a' : '#64748b', fontWeight: checked ? 600 : 'normal' }}>
                                          {m}
                                        </span>
                                      </div>
                                      {!checked && reason && (
                                        <span style={{ fontSize: '0.7rem', color: '#b45309', background: '#fffbeb', border: '1px dashed #fcd34d', padding: '2px 6px', borderRadius: '4px', marginLeft: '22px', display: 'inline-block', width: 'fit-content' }}>
                                          ⚠️ Reason: "{reason}"
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div>
                              <h5 style={{ margin: '0 0 8px 0', color: '#10b981', fontWeight: 800, fontSize: '0.875rem' }}>DB Collections</h5>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'white', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                                {regDetails.databaseCollections.map((col, idx) => {
                                  const checked = compCollections.includes(col);
                                  const reason = selectedProject.progress?.uncheckReasons?.[`collection:${col}`];
                                  return (
                                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input type="checkbox" checked={checked} disabled style={{ margin: 0, width: '14px', height: '14px' }} />
                                        <span style={{ textDecoration: checked ? 'line-through' : 'none', color: checked ? '#0f172a' : '#64748b', fontWeight: checked ? 600 : 'normal' }}>
                                          {col}
                                        </span>
                                      </div>
                                      {!checked && reason && (
                                        <span style={{ fontSize: '0.7rem', color: '#b45309', background: '#fffbeb', border: '1px dashed #fcd34d', padding: '2px 6px', borderRadius: '4px', marginLeft: '22px', display: 'inline-block', width: 'fit-content' }}>
                                          ⚠️ Reason: "{reason}"
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          <div style={{ marginTop: '20px' }}>
                            <h5 style={{ margin: '0 0 10px 0', color: '#3b82f6', fontWeight: 800, fontSize: '0.875rem' }}>Pages Map</h5>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', background: 'white', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                              {Object.keys(regDetails.pages).map(pGroup => 
                                regDetails.pages[pGroup].map((page, pIdx) => {
                                  const pageKey = `${pGroup}:${page}`;
                                  const checked = compPages.includes(pageKey);
                                  const reason = selectedProject.progress?.uncheckReasons?.[`page:${pageKey}`];
                                  return (
                                    <span 
                                      key={pIdx} 
                                      title={reason ? `⚠️ Uncheck Reason: "${reason}"` : undefined}
                                      style={{ 
                                        fontSize: '0.75rem', 
                                        padding: '4px 8px', 
                                        borderRadius: '6px', 
                                        border: reason 
                                          ? '1.5px dashed #f59e0b' 
                                          : `1px solid ${checked ? '#bbf7d0' : '#cbd5e1'}`, 
                                        background: checked ? '#ecfdf5' : reason ? '#fffbeb' : 'white', 
                                        color: checked ? '#065f46' : reason ? '#b45309' : '#64748b',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontWeight: 600
                                      }}
                                    >
                                      <input type="checkbox" checked={checked} disabled style={{ margin: 0, width: '11px', height: '11px' }} />
                                      <span>{page} ({pGroup})</span>
                                    </span>
                                  );
                                })
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* User Roles */}
                      {regDetails.roles && (
                        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                          <h4 style={{ margin: '0 0 10px 0', color: '#0f172a', fontWeight: 800, fontSize: '1rem' }}>User Roles & Features</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {Object.keys(regDetails.roles).map((role, idx) => (
                              <div key={idx} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 16px' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0047ab', textTransform: 'uppercase' }}>{role}</span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                                  {regDetails.roles[role].map((feat, fIdx) => (
                                    <span key={fIdx} style={{ background: '#f8fafc', color: '#475569', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                                      {feat}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Mandatory Features */}
                      {regDetails.mandatoryFeatures && (
                        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                          <h4 style={{ margin: '0 0 12px 0', color: '#0f172a', fontWeight: 800, fontSize: '1rem' }}>Mandatory Features Specifications</h4>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                            {Object.keys(regDetails.mandatoryFeatures).map((key, idx) => (
                              <div key={idx} style={{ background: 'white', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '10px' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0047ab', textTransform: 'uppercase' }}>{key}</span>
                                <ul style={{ margin: '8px 0 0 0', paddingLeft: '16px', fontSize: '0.8rem', color: '#64748b', lineHeight: '1.5' }}>
                                  {regDetails.mandatoryFeatures[key].map((feat, fIdx) => <li key={fIdx}>{feat}</li>)}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Timeline */}
                      {regDetails.timeline && (
                        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                          <h4 style={{ margin: '0 0 12px 0', color: '#0f172a', fontWeight: 800, fontSize: '1rem' }}>Roadmap & Timeline</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {Object.keys(regDetails.timeline).map((day, idx) => (
                              <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <span style={{ background: '#e2e8f0', color: '#475569', fontWeight: 800, fontSize: '0.7rem', padding: '3px 8px', borderRadius: '6px', minWidth: '70px', textTransform: 'uppercase', textAlign: 'center' }}>
                                  {day}
                                </span>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: '1.5' }}>{regDetails.timeline[day]}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        )}
                      </div>
                    );
                  })()
                )}
              </div>

            {/* Action Bar / Status Grading */}
            <div style={{
              borderTop: '1px solid #f1f5f9',
              paddingTop: '20px',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px'
            }}>
              <button
                onClick={() => { setSelectedProject(null); setFeedback(''); }}
                style={{
                  background: '#f1f5f9',
                  color: '#475569',
                  border: '1px solid #cbd5e1',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Close Details
              </button>
              {modalTab === 'submission' && selectedProject.submission && (
                <>
                  <button
                    disabled={gradingLoading}
                    onClick={() => handleGrade('rejected')}
                    style={{
                      background: '#fee2e2',
                      color: '#ef4444',
                      border: '1px solid #fecaca',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <XCircle size={16} /> Reject / Request Edits
                  </button>
                  <button
                    disabled={gradingLoading}
                    onClick={() => handleGrade('accepted')}
                    style={{
                      background: '#d1fae5',
                      color: '#065f46',
                      border: '1px solid #bbf7d0',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <CheckCircle2 size={16} /> Approve & Unlock
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        /* Premium Floating Snackbar (Right Bottom Corner) */
        .snackbar-notification { 
          position: fixed; 
          bottom: 30px; 
          right: 30px; 
          background: #ffffff; 
          color: #0f172a; 
          padding: 16px 24px; 
          border-radius: 16px; 
          display: flex; 
          align-items: center; 
          gap: 12px; 
          z-index: 100000; 
          font-weight: 700; 
          font-size: 0.925rem; 
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04); 
          border: 1px solid #e2e8f0; 
          animation: snackbarSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
        }
        .snackbar-notification.success { border-left: 4px solid #16a34a; }
        .snackbar-notification.success svg { color: #16a34a; }
        .snackbar-notification.error { border-left: 4px solid #ef4444; }
        .snackbar-notification.error svg { color: #ef4444; }

        @keyframes snackbarSlideIn { 
          0% { transform: translateY(100px) scale(0.9); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        `
      }} />
    </MainLayout>
  );
};

export default CapstonesAdmin;
