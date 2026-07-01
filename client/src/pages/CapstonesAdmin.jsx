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
  AlertCircle,
  ChevronLeft,
  ChevronRight
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
  const [releaseConfirmId, setReleaseConfirmId] = useState(null);
  const [loadingFreshProject, setLoadingFreshProject] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Notification states (Snackbar)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });
  const showSnackbar = (message, type = 'success') => {
    setSnackbar({ open: true, message, type });
    setTimeout(() => setSnackbar(prev => ({ ...prev, open: false })), 4000);
  };

  const getPaginationRange = (currPage, totPages) => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totPages; i++) {
      if (i === 1 || i === totPages || (i >= currPage - delta && i <= currPage + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
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

  const fetchFreshProjectDetails = async (project) => {
    if (!currentUser?.token || !project?.assignedTo?._id) return;
    setLoadingFreshProject(true);
    try {
      const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
      const { data } = await axios.get(`/api/capstone/my?studentId=${project.assignedTo._id}`, config);
      if (data?.success && data.project) {
        setSelectedProject(data.project);
        setCapstoneList(prevList => 
          prevList.map(item => item._id === data.project._id ? data.project : item)
        );
      }
    } catch (e) {
      console.error("Error fetching fresh capstone details:", e);
    } finally {
      setLoadingFreshProject(false);
    }
  };

  useEffect(() => {
    if (currentUser?.token) {
      fetchCapstoneStatus();
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedProject && selectedProject.assignedTo) {
      fetchFreshProjectDetails(selectedProject);
    }
  }, [modalTab]);

  const handleRelease = async (projectCode) => {
    if (!currentUser?.token) return;

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

  // Reset page when criteria changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab, itemsPerPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const totalAllocatedPages = Math.ceil(filteredAllocated.length / itemsPerPage);
  const totalUnallocatedPages = Math.ceil(filteredUnallocated.length / itemsPerPage);

  const paginatedAllocated = filteredAllocated.slice(indexOfFirstItem, indexOfLastItem);
  const paginatedUnallocated = filteredUnallocated.slice(indexOfFirstItem, indexOfLastItem);

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

              {/* Controls Group: Search Box & Rows Per Page Dropdown */}
              <div style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                flexWrap: 'wrap',
                width: '100%',
                maxWidth: '520px',
                justifyContent: 'flex-end'
              }}>
                {/* Search Box */}
                <div style={{
                  position: 'relative',
                  flex: 1,
                  minWidth: '240px'
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

                {/* Rows Per Page Dropdown */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'white',
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  padding: '0 16px',
                  height: '45px',
                  boxSizing: 'border-box'
                }}>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: '#475569',
                      cursor: 'pointer',
                      height: '100%'
                    }}
                  >
                    <option value={10}>10 Rows</option>
                    <option value={20}>20 Rows</option>
                    <option value={50}>50 Rows</option>
                  </select>
                </div>
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
                        paginatedAllocated.map((project) => {
                          return (
                            <tr 
                              key={project._id} 
                              onClick={() => { 
                                setSelectedProject(project); 
                                setModalTab(project.submission ? 'submission' : 'spec'); 
                                fetchFreshProjectDetails(project);
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
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', position: 'relative' }}>
                                  {project.submission && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setReleaseConfirmId(null);
                                        setSelectedProject(project);
                                        setModalTab('submission');
                                        fetchFreshProjectDetails(project);
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
                                      setReleaseConfirmId(releaseConfirmId === project._id ? null : project._id);
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

                                  {releaseConfirmId === project._id && (
                                    <div 
                                      onClick={(e) => e.stopPropagation()}
                                      style={{
                                        position: 'absolute',
                                        right: '0',
                                        top: '100%',
                                        marginTop: '8px',
                                        background: 'white',
                                        border: '1px solid #cbd5e1',
                                        borderRadius: '12px',
                                        padding: '12px 16px',
                                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                                        zIndex: 10,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px',
                                        minWidth: '220px',
                                        textAlign: 'left'
                                      }}
                                    >
                                      <span style={{ fontSize: '0.8rem', color: '#1e293b', fontWeight: 600, whiteSpace: 'normal', lineHeight: '1.4' }}>
                                        Release Capstone Project? This clears student progress.
                                      </span>
                                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                        <button 
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setReleaseConfirmId(null);
                                          }}
                                          style={{
                                            padding: '6px 12px',
                                            borderRadius: '6px',
                                            border: '1px solid #cbd5e1',
                                            background: '#f8fafc',
                                            color: '#64748b',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            cursor: 'pointer'
                                          }}
                                        >
                                          No
                                        </button>
                                        <button 
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setReleaseConfirmId(null);
                                            handleRelease(project.projectCode);
                                          }}
                                          style={{
                                            padding: '6px 12px',
                                            borderRadius: '6px',
                                            border: 'none',
                                            background: '#ef4444',
                                            color: 'white',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            cursor: 'pointer'
                                          }}
                                        >
                                          Yes, Release
                                        </button>
                                      </div>
                                    </div>
                                  )}
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
                     paginatedUnallocated.map((project) => (
                      <div 
                        key={project._id} 
                        onClick={() => {
                          setSelectedProject(project);
                          setModalTab('spec');
                        }}
                        style={{
                          border: '1px solid #cbd5e1',
                          borderRadius: '16px',
                          padding: '20px',
                          background: '#fafafa',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#0047ab';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,71,171,0.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#cbd5e1';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
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

              {/* Pagination Controls */}
              {((activeTab === 'allocated' && filteredAllocated.length > 0) || 
                (activeTab === 'unallocated' && filteredUnallocated.length > 0)) && (
                <div className="audit-pagination" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px 24px',
                  background: '#f8fafc',
                  borderTop: '1px solid #e2e8f0',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}>
                  <div className="pagination-info" style={{ fontSize: '0.9rem', color: '#64748b' }}>
                    Showing <span style={{ fontWeight: 700, color: '#0f172a' }}>
                      {indexOfFirstItem + 1}
                    </span> to <span style={{ fontWeight: 700, color: '#0f172a' }}>
                      {Math.min(indexOfLastItem, activeTab === 'allocated' ? filteredAllocated.length : filteredUnallocated.length)}
                    </span> of <span style={{ fontWeight: 700, color: '#0f172a' }}>
                      {activeTab === 'allocated' ? filteredAllocated.length : filteredUnallocated.length}
                    </span> records
                  </div>

                  {((activeTab === 'allocated' && totalAllocatedPages > 1) || 
                    (activeTab === 'unallocated' && totalUnallocatedPages > 1)) && (
                    <div className="page-navigation" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <button 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="page-btn"
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <div className="page-numbers" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        {getPaginationRange(currentPage, activeTab === 'allocated' ? totalAllocatedPages : totalUnallocatedPages).map((p, idx) => (
                          p === '...' ? (
                            <span key={`dots-${idx}`} className="pagination-dots" style={{ padding: '0 8px', color: '#94a3b8' }}>...</span>
                          ) : (
                            <button
                              key={p}
                              onClick={() => setCurrentPage(p)}
                              className={`page-btn ${currentPage === p ? 'active' : ''}`}
                            >
                              {p}
                            </button>
                          )
                        ))}
                      </div>

                      <button 
                        disabled={currentPage === (activeTab === 'allocated' ? totalAllocatedPages : totalUnallocatedPages)}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="page-btn"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
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
                  background: !selectedProject.assignedTo 
                    ? '#eff6ff'
                    : selectedProject.submission?.status === 'accepted' 
                      ? '#d1fae5' 
                      : selectedProject.submission?.status === 'rejected' 
                        ? '#fee2e2' 
                        : selectedProject.submission 
                          ? '#e0f2fe' 
                          : '#f1f5f9',
                  color: !selectedProject.assignedTo
                    ? '#0047ab'
                    : selectedProject.submission?.status === 'accepted' 
                      ? '#065f46' 
                      : selectedProject.submission?.status === 'rejected' 
                        ? '#991b1b' 
                        : selectedProject.submission 
                          ? '#0369a1' 
                          : '#64748b',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  padding: '6px 12px',
                  borderRadius: '8px'
                }}>
                  {!selectedProject.assignedTo
                    ? 'AVAILABLE POOL'
                    : selectedProject.submission?.status 
                      ? selectedProject.submission.status.toUpperCase() 
                      : 'NOT STARTED'}
                </span>
              </div>
            </div>

            {/* Title & Profile Detail */}
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                {selectedProject.title}
                {loadingFreshProject && (
                  <span className="spinner-mini" style={{ width: '18px', height: '18px', border: '2px solid rgba(0,71,171,0.1)', borderTopColor: '#0047ab', borderRadius: '50%', display: 'inline-block' }} />
                )}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.9rem' }}>
                {selectedProject.assignedTo ? (
                  <>
                    <User size={16} />
                    <span style={{ fontWeight: 700, color: '#334155' }}>{selectedProject.assignedTo?.name}</span>
                    <span>({selectedProject.assignedTo?.email})</span>
                  </>
                ) : (
                  <>
                    <Database size={16} color="#0047ab" />
                    <span style={{ fontWeight: 700, color: '#475569' }}>Unassigned (Available Template Pool)</span>
                  </>
                )}
              </div>
            </div>

            {selectedProject.assignedTo && (
               <div style={{
                 display: 'flex',
                 borderBottom: '1px solid #e2e8f0',
                 background: '#f8fafc',
                 padding: '0 12px',
                 borderRadius: '12px',
                 overflowX: 'auto',
                 flexWrap: 'nowrap',
                 WebkitOverflowScrolling: 'touch',
                 scrollbarWidth: 'none',
                 msOverflowStyle: 'none'
               }}>
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
                   cursor: 'pointer',
                   transition: 'all 0.2s',
                   flexShrink: 0
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
                   marginLeft: '12px',
                   flexShrink: 0
                 }}
               >
                 Project Spec & Live Progress
               </button>
               <button
                 onClick={() => setModalTab('planner')}
                 style={{
                   padding: '14px 20px',
                   fontSize: '0.9rem',
                   fontWeight: 700,
                   background: 'none',
                   border: 'none',
                   borderBottom: modalTab === 'planner' ? '3px solid #0047ab' : '3px solid transparent',
                   color: modalTab === 'planner' ? '#0047ab' : '#64748b',
                   cursor: 'pointer',
                   transition: 'all 0.2s',
                   marginLeft: '12px',
                   flexShrink: 0
                 }}
               >
                 Sprint Planner
               </button>
               <button
                 onClick={() => setModalTab('timesheet')}
                 style={{
                   padding: '14px 20px',
                   fontSize: '0.9rem',
                   fontWeight: 700,
                   background: 'none',
                   border: 'none',
                   borderBottom: modalTab === 'timesheet' ? '3px solid #0047ab' : '3px solid transparent',
                   color: modalTab === 'timesheet' ? '#0047ab' : '#64748b',
                   cursor: 'pointer',
                   transition: 'all 0.2s',
                   marginLeft: '12px',
                   flexShrink: 0
                 }}
               >
                 Work Timesheet
               </button>
               <button
                 onClick={() => setModalTab('custom')}
                 style={{
                   padding: '14px 20px',
                   fontSize: '0.9rem',
                   fontWeight: 700,
                   background: 'none',
                   border: 'none',
                   borderBottom: modalTab === 'custom' ? '3px solid #0047ab' : '3px solid transparent',
                   color: modalTab === 'custom' ? '#0047ab' : '#64748b',
                   cursor: 'pointer',
                   transition: 'all 0.2s',
                   marginLeft: '12px',
                   flexShrink: 0
                 }}
               >
                 Custom Tasks
               </button>
             </div>
            )}

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

                        {/* Submission View: Custom Checklist */}
                        {(() => {
                          const checklist = selectedProject.progress?.customChecklist || [];
                          if (checklist.length === 0) return null;
                          return (
                            <div style={{ marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                              <h5 style={{ margin: '0 0 10px 0', color: '#d97706', fontWeight: 800, fontSize: '0.875rem' }}>
                                Custom Sub-Tasks Progress ({checklist.filter(c => c.completed).length}/{checklist.length})
                              </h5>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
                                {checklist.map(task => (
                                  <div key={task._id} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                                    <span style={{ color: task.completed ? '#10b981' : '#94a3b8', fontWeight: 'bold' }}>{task.completed ? '✓' : '○'}</span>
                                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: '#334155', fontSize: '0.825rem', fontWeight: 600 }}>{task.taskName}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

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
              ) : modalTab === 'spec' ? (
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

                      {/* Student Custom Tasks Progress */}
                      {(() => {
                        const customChecklist = selectedProject.progress?.customChecklist || [];
                        if (customChecklist.length === 0) return null;
                        return (
                          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                            <h4 style={{ margin: '0 0 10px 0', color: '#0f172a', fontWeight: 800, fontSize: '1rem' }}>Student Custom Tasks Progress</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
                              {customChecklist.map(task => (
                                <div key={task._id} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'white', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                                  <input type="checkbox" checked={task.completed} disabled style={{ width: '16px', height: '16px', accentColor: '#16a34a' }} />
                                  <span style={{ fontSize: '0.85rem', color: task.completed ? '#94a3b8' : '#334155', textDecoration: task.completed ? 'line-through' : 'none', fontWeight: 600 }}>
                                    {task.taskName}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}

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
              ) : modalTab === 'planner' ? (
                /* SPRINT PLANNER VIEW */
                (() => {
                  const planner = selectedProject.planner || [];
                  return (
                    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                      <h4 style={{ margin: '0 0 14px 0', color: '#0f172a', fontWeight: 800, fontSize: '1rem' }}>Sprint Kanban Board</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                        {['todo', 'in_progress', 'done'].map(status => {
                          const cards = planner.filter(c => !c.isDeleted && c.status === status);
                          const labelMap = { todo: 'To Do', in_progress: 'In Progress', done: 'Done' };
                          const colorMap = { todo: '#64748b', in_progress: '#0284c7', done: '#16a34a' };
                          return (
                            <div key={status} style={{ background: 'white', padding: '12px', borderRadius: '12px', border: '1.5px dashed #e2e8f0', minHeight: '120px' }}>
                              <strong style={{ fontSize: '0.8rem', color: colorMap[status], textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                                {labelMap[status]} ({cards.length})
                              </strong>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {cards.length === 0 ? (
                                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic' }}>Empty</span>
                                ) : (
                                  cards.map(c => (
                                    <div key={c._id} style={{ background: '#f8fafc', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>{c.title}</div>
                                      {c.description && <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>{c.description}</div>}
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', fontSize: '0.7rem' }}>
                                        <span style={{
                                          fontWeight: 800,
                                          textTransform: 'uppercase',
                                          color: c.priority === 'high' ? '#ef4444' : c.priority === 'medium' ? '#f59e0b' : '#3b82f6'
                                        }}>{c.priority}</span>
                                        {c.dueDate && <span style={{ color: '#94a3b8' }}>📅 {new Date(c.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>}
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Archived / Deleted Cards */}
                      {planner.some(c => c.isDeleted) && (
                        <div style={{ marginTop: '24px', borderTop: '1px solid #cbd5e1', paddingTop: '16px' }}>
                          <h5 style={{ margin: '0 0 10px 0', color: '#64748b', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            🗑️ Deleted / Archived Cards ({planner.filter(c => c.isDeleted).length})
                          </h5>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                            {planner.filter(c => c.isDeleted).map(c => (
                              <div key={c._id} style={{ background: '#f1f5f9', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', opacity: 0.6 }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textDecoration: 'line-through' }}>{c.title}</div>
                                {c.description && <div style={{ fontSize: '0.725rem', color: '#94a3b8', marginTop: '2px', textDecoration: 'line-through' }}>{c.description}</div>}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '0.675rem', color: '#94a3b8' }}>
                                  <span>Deleted: {c.deletedAt ? new Date(c.deletedAt).toLocaleDateString() : 'N/A'}</span>
                                  <span style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 800 }}>{c.status.replace('_', ' ')}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()
              ) : modalTab === 'timesheet' ? (
                /* WORK TIMESHEET VIEW */
                (() => {
                  const timesheet = selectedProject.timesheet || [];
                  const totalHours = timesheet.filter(entry => !entry.isDeleted).reduce((sum, entry) => sum + (entry.hours || 0), 0);
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', textAlign: 'center', width: 'fit-content', minWidth: '150px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Total Hours Logged</span>
                        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0047ab', marginTop: '6px' }}>{totalHours} hrs</div>
                      </div>

                      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                        <h4 style={{ margin: '0 0 12px 0', color: '#0f172a', fontWeight: 800, fontSize: '1rem' }}>Timesheet Work History</h4>
                        <div style={{ overflowX: 'auto' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                            <thead>
                              <tr style={{ borderBottom: '2px solid #cbd5e1', textAlign: 'left', color: '#64748b' }}>
                                <th style={{ padding: '8px' }}>Date</th>
                                <th style={{ padding: '8px', textAlign: 'center' }}>Hours</th>
                                <th style={{ padding: '8px' }}>Work Done Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {timesheet.filter(entry => !entry.isDeleted).length === 0 ? (
                                <tr>
                                  <td colSpan="3" style={{ textAlign: 'center', padding: '24px', color: '#94a3b8', fontStyle: 'italic' }}>
                                    No timesheet hours logged yet.
                                  </td>
                                </tr>
                              ) : (
                                [...timesheet].filter(log => !log.isDeleted).sort((a,b) => new Date(b.date) - new Date(a.date)).map(log => (
                                  <tr key={log._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '10px 8px', fontWeight: 600 }}>
                                      {new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 700, color: '#0047ab' }}>
                                      {log.hours} hrs
                                    </td>
                                    <td style={{ padding: '10px 8px', color: '#475569' }}>
                                      {log.description}
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Deleted Timesheet Logs */}
                      {timesheet.some(log => log.isDeleted) && (
                        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                          <h5 style={{ margin: '0 0 12px 0', color: '#ef4444', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            🗑️ Deleted Timesheet Logs ({timesheet.filter(log => log.isDeleted).length})
                          </h5>
                          <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', opacity: 0.7 }}>
                              <thead>
                                <tr style={{ borderBottom: '1px solid #cbd5e1', textAlign: 'left', color: '#64748b' }}>
                                  <th style={{ padding: '6px' }}>Date</th>
                                  <th style={{ padding: '6px', textAlign: 'center' }}>Hours</th>
                                  <th style={{ padding: '6px' }}>Description</th>
                                  <th style={{ padding: '6px', textAlign: 'right' }}>Deleted At</th>
                                </tr>
                              </thead>
                              <tbody>
                                {timesheet.filter(log => log.isDeleted).sort((a,b) => new Date(b.deletedAt || b.date) - new Date(a.deletedAt || a.date)).map(log => (
                                  <tr key={log._id} style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', background: 'rgba(0,0,0,0.01)' }}>
                                    <td style={{ padding: '8px 6px', textDecoration: 'line-through' }}>
                                      {new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </td>
                                    <td style={{ padding: '8px 6px', textAlign: 'center', textDecoration: 'line-through', fontWeight: 600 }}>
                                      {log.hours}h
                                    </td>
                                    <td style={{ padding: '8px 6px', textDecoration: 'line-through' }}>
                                      {log.description}
                                    </td>
                                    <td style={{ padding: '8px 6px', textAlign: 'right', fontSize: '0.725rem', color: '#94a3b8' }}>
                                      {log.deletedAt ? new Date(log.deletedAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()
              ) : (
                /* CUSTOM TASKS VIEW */
                (() => {
                  const checklist = selectedProject.progress?.customChecklist || [];
                  return (
                    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                      <h4 style={{ margin: '0 0 12px 0', color: '#0f172a', fontWeight: 800, fontSize: '1rem' }}>Custom Tasks Checklist</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {checklist.filter(task => !task.isDeleted).length === 0 ? (
                          <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic' }}>No custom tasks created by this student.</span>
                        ) : (
                          checklist.filter(task => !task.isDeleted).map(task => (
                            <div key={task._id} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'white', padding: '10px 14px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                              <input type="checkbox" checked={task.completed} readOnly style={{ width: '16px', height: '16px', accentColor: '#16a34a' }} />
                              <span style={{ fontSize: '0.85rem', color: task.completed ? '#94a3b8' : '#334155', textDecoration: task.completed ? 'line-through' : 'none', fontWeight: 600 }}>
                                {task.taskName}
                              </span>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Archived / Deleted Custom Tasks */}
                      {checklist.some(task => task.isDeleted) && (
                        <div style={{ marginTop: '24px', borderTop: '1px solid #cbd5e1', paddingTop: '16px' }}>
                          <h5 style={{ margin: '0 0 10px 0', color: '#64748b', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            🗑️ Deleted Custom Tasks ({checklist.filter(task => task.isDeleted).length})
                          </h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', opacity: 0.65 }}>
                            {checklist.filter(task => task.isDeleted).map(task => (
                              <div key={task._id} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f1f5f9', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', color: '#64748b' }}>
                                <span style={{ fontSize: '0.8rem', textDecoration: 'line-through', fontWeight: 500, flex: 1 }}>
                                  {task.taskName}
                                </span>
                                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                                  Deleted: {task.deletedAt ? new Date(task.deletedAt).toLocaleDateString() : 'N/A'}
                                </span>
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

        /* Pagination Styles */
        .page-btn { 
          min-width: 36px; 
          height: 36px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          border-radius: 10px; 
          border: 1px solid #cbd5e1; 
          background: white; 
          color: #64748b; 
          font-weight: 700; 
          font-size: 0.85rem; 
          cursor: pointer; 
          transition: all 0.2s; 
        }
        .page-btn:hover:not(:disabled) { 
          border-color: #0047ab; 
          color: #0047ab; 
          background: rgba(0, 71, 171, 0.05); 
          transform: translateY(-2px); 
        }
        .page-btn.active { 
          background: #0047ab; 
          color: white; 
          border-color: #0047ab; 
          box-shadow: 0 4px 12px rgba(0, 71, 171, 0.2); 
        }
        .page-btn:disabled { 
          opacity: 0.3; 
          cursor: not-allowed; 
        }
        `
      }} />
    </MainLayout>
  );
};

export default CapstonesAdmin;
