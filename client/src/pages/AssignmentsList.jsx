import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Clock, Search, ExternalLink, MessageSquare, Code, AlertCircle } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import CodeEditor from '../components/CodeEditor';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const AssignmentsList = () => {
  const location = useLocation();
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('pending');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);

  // New filtering states
  const [selectedStudentFilter, setSelectedStudentFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isChangingAction, setIsChangingAction] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });

  const showSnackbar = (message, type = 'success') => {
    setSnackbar({ open: true, message, type });
    setTimeout(() => setSnackbar(prev => ({ ...prev, open: false })), 4000);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData?.token;
      
      const response = await axios.get('/api/assignments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = response.data;
      if (Array.isArray(data)) {
        setAssignments(data);
      } else {
        setAssignments([]);
      }
      setLoading(false);

      // Handle navigation from notification
      if (location.state?.selectedId) {
        const target = data.find(a => a._id === location.state.selectedId);
        if (target) {
          setSelectedAssignment(target);
          setFeedback(target.feedback || '');
          setIsChangingAction(false);
        }
      }
    } catch (err) {
      console.error('Failed to fetch assignments');
      setLoading(false);
    }
  };

  const handleAction = async (status, requiresReason = false) => {
    if (!selectedAssignment) return;

    if (requiresReason && (!feedback.trim() || feedback.trim() === (selectedAssignment.feedback || '').trim())) {
      showSnackbar('Please specify why you are changing the status and provide a comment/reason.', 'error');
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData?.token;

      const response = await axios.put(`/api/assignments/${selectedAssignment._id}`, { status, feedback }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        showSnackbar(`Assignment ${status} successfully`, 'success');
        setSelectedAssignment(null);
        setFeedback('');
        setIsChangingAction(false);
        fetchAssignments();
      }
    } catch (err) {
      showSnackbar('Action failed', 'error');
    }
  };

  // Get unique list of students from loaded assignments
  const studentsList = Array.isArray(assignments) 
    ? [...new Map(assignments.map(a => [a.student?._id || a.student?.email, a.student])).values()].filter(Boolean)
    : [];

  const filteredAssignments = Array.isArray(assignments) ? assignments.filter(asn => {
    // 1. Search term match
    const matchesSearch = asn.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          asn.topicTitle?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 2. Status filter match
    const matchesFilter = filter === 'all' || asn.status === filter;
    
    // 3. Student dropdown filter match
    const studentId = asn.student?._id || asn.student?.email;
    const matchesStudent = selectedStudentFilter === 'all' || studentId === selectedStudentFilter;
    
    // 4. Date calendar filter match
    let matchesDate = true;
    if (asn.submittedAt) {
      const submittedDate = new Date(asn.submittedAt);
      submittedDate.setHours(0, 0, 0, 0); // Normalize time to start of day for comparison
      
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        if (submittedDate < start) matchesDate = false;
      }
      
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (submittedDate > end) matchesDate = false;
      }
    }
    
    return matchesSearch && matchesFilter && matchesStudent && matchesDate;
  }) : [];

  // Helper to parse code if it's stringified JSON
  const getParsedCode = (codeStr) => {
    try {
      return JSON.parse(codeStr);
    } catch (e) {
      return { html: '<!-- Plain Text Submission -->', css: '', js: '', plain: codeStr };
    }
  };

  return (
    <MainLayout>
      <div className="assignments-page">
        <div className="page-header">
          <div className="header-info">
            <h1>Student Submissions</h1>
            <p>Review and grade student mini-projects</p>
          </div>
          <div className="header-stats">
            <div className="mini-stat">
              <span className="label">Pending</span>
              <span className="value">{Array.isArray(assignments) ? assignments.filter(a => a.status === 'pending').length : 0}</span>
            </div>
            <div className="mini-stat">
              <span className="label">Total</span>
              <span className="value">{Array.isArray(assignments) ? assignments.length : 0}</span>
            </div>
          </div>
        </div>

        <div className="assignments-content">
          <div className="assignments-sidebar">
            <div className="search-bar">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search topics..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Student Dropdown and Date Range Filters */}
            <div className="advanced-filters" style={{ padding: '16px', borderBottom: '1px solid var(--light-tertiary)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="filter-field">
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-neutral)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Filter by Student</label>
                <select 
                  value={selectedStudentFilter} 
                  onChange={(e) => setSelectedStudentFilter(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--light-tertiary)', fontSize: '0.85rem', outline: 'none', background: 'white', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }}
                >
                  <option value="all">All Students</option>
                  {studentsList.map(s => (
                    <option key={s._id || s.email} value={s._id || s.email}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="filter-field">
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-neutral)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Filter by Calendar Range</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ flex: 1, padding: '8px 10px', borderRadius: '10px', border: '1px solid var(--light-tertiary)', fontSize: '0.8rem', color: 'var(--text-primary)', outline: 'none' }}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-neutral)' }}>to</span>
                  <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ flex: 1, padding: '8px 10px', borderRadius: '10px', border: '1px solid var(--light-tertiary)', fontSize: '0.8rem', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
                {(startDate || endDate) && (
                  <button 
                    onClick={() => { setStartDate(''); setEndDate(''); }}
                    style={{ background: 'transparent', border: 'none', color: '#dc2626', fontSize: '0.75rem', cursor: 'pointer', padding: '6px 0 0', fontWeight: 700, textAlign: 'left', width: 'fit-content' }}
                  >
                    Clear Calendar Filter
                  </button>
                )}
              </div>
            </div>

            <div className="filter-tabs">
              <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>Pending</button>
              <button className={filter === 'accepted' ? 'active' : ''} onClick={() => setFilter('accepted')}>Accepted</button>
              <button className={filter === 'rejected' ? 'active' : ''} onClick={() => setFilter('rejected')}>Rejected</button>
            </div>

            <div className="submissions-list">
              {loading ? (
                <div className="loading">Loading submissions...</div>
              ) : filteredAssignments.length === 0 ? (
                <div className="empty">No submissions found</div>
              ) : (
                filteredAssignments.map(asn => (
                  <div 
                    key={asn._id} 
                    className={`submission-item ${selectedAssignment?._id === asn._id ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedAssignment(asn);
                      setFeedback(asn.feedback || '');
                      setIsChangingAction(false);
                    }}
                  >
                    <div className="item-main">
                      <p className="topic-name">{asn.topicTitle}</p>
                      <p className="student-name" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                        <span>{asn.student.name}</span>
                        {asn.dayTitle && <span style={{ fontSize: '0.75rem', color: 'var(--primary-blue)', fontWeight: 700, opacity: 0.85 }}>{asn.dayTitle.split(':')[0]}</span>}
                      </p>
                    </div>
                    <div className={`status-tag ${asn.status}`}>
                      {asn.status === 'pending' && <Clock size={12} />}
                      {asn.status === 'accepted' && <CheckCircle2 size={12} />}
                      {asn.status === 'rejected' && <XCircle size={12} />}
                      <span>{asn.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="assignment-detail">
            {selectedAssignment ? (
              <div className="detail-view">
                <div className="detail-header">
                  <div className="student-profile">
                    <div className="avatar">{selectedAssignment.student.name.charAt(0)}</div>
                    <div>
                      <h2>{selectedAssignment.student.name}</h2>
                      <p>{selectedAssignment.student.email}</p>
                    </div>
                  </div>
                  <div className="submission-meta">
                    <p>Submitted on: {new Date(selectedAssignment.submittedAt).toLocaleDateString()}</p>
                    <p>Topic: {selectedAssignment.topicTitle}</p>
                    {selectedAssignment.dayTitle && <p style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>{selectedAssignment.dayTitle}</p>}
                  </div>
                </div>

                <div className="code-review-section">
                  <div className="section-label">
                    <Code size={18} /> <span>Submitted Code & Live Preview</span>
                  </div>
                  <CodeEditor 
                    initialCode={getParsedCode(selectedAssignment.code)} 
                  />
                </div>

                {selectedAssignment.status === 'pending' || isChangingAction ? (
                  <div className="feedback-section" style={{ background: isChangingAction ? '#fefce8' : 'white', border: isChangingAction ? '1px solid #fef3c7' : 'none', padding: isChangingAction ? '24px' : '0', borderRadius: isChangingAction ? '16px' : '0' }}>
                    <div className="section-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MessageSquare size={18} /> 
                        <span>{isChangingAction ? 'Reason for Status Change & New Feedback' : 'Instructor Feedback'}</span>
                      </span>
                      {isChangingAction && <span style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: 800 }}>CHANGING PREVIOUS DECISION</span>}
                    </div>
                    <textarea 
                      placeholder={isChangingAction ? 'Please detail the reason for changing the decision and include new feedback...' : 'Add your comments here...'}
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      style={{ border: isChangingAction ? '1px solid #fde68a' : '1px solid var(--light-tertiary)' }}
                    />
                    <div className="action-buttons">
                      <button className="btn btn-reject" onClick={() => handleAction('rejected', isChangingAction)}>
                        <XCircle size={18} /> Reject Submission
                      </button>
                      <button className="btn btn-accept" onClick={() => handleAction('accepted', isChangingAction)}>
                        <CheckCircle2 size={18} /> Accept & Approve
                      </button>
                      {isChangingAction && (
                        <button 
                          className="btn" 
                          type="button"
                          onClick={() => {
                            setIsChangingAction(false);
                            setFeedback(selectedAssignment.feedback || '');
                          }}
                          style={{ background: 'white', color: '#475569', border: '1px solid #cbd5e1', cursor: 'pointer' }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="feedback-section" style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid var(--light-tertiary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>Decision Status:</span>
                        <div className={`status-tag ${selectedAssignment.status}`}>
                          {selectedAssignment.status === 'accepted' && <CheckCircle2 size={12} />}
                          {selectedAssignment.status === 'rejected' && <XCircle size={12} />}
                          <span>{selectedAssignment.status}</span>
                        </div>
                      </div>
                      <button 
                        className="btn btn-secondary" 
                        type="button"
                        onClick={() => setIsChangingAction(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0, 71, 171, 0.05)', color: 'var(--primary-blue)', border: '1px solid rgba(0, 71, 171, 0.1)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}
                      >
                        Change Action
                      </button>
                    </div>
                    {selectedAssignment.feedback ? (
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-neutral)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Feedback</span>
                        <p style={{ margin: '8px 0 0', fontSize: '0.9rem', color: 'var(--text-primary)', background: 'white', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--light-tertiary)', whiteSpace: 'pre-wrap' }}>
                          {selectedAssignment.feedback}
                        </p>
                      </div>
                    ) : (
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-neutral)', fontStyle: 'italic' }}>No feedback was left for this decision.</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="no-selection">
                <ExternalLink size={48} />
                <p>Select a submission from the list to review</p>
              </div>
            )}
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .assignments-page { padding: 40px; height: calc(100vh - 85px); display: flex; flex-direction: column; overflow: hidden; }
          .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
          .header-info h1 { font-size: 2rem; font-weight: 800; margin-bottom: 4px; }
          .header-info p { color: var(--text-neutral); }
          .header-stats { display: flex; gap: 24px; }
          .mini-stat { background: white; padding: 12px 24px; border-radius: 16px; border: 1px solid var(--light-tertiary); text-align: center; }
          .mini-stat .label { display: block; font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--text-neutral); }
          .mini-stat .value { font-size: 1.25rem; font-weight: 800; color: var(--primary-blue); }

          .assignments-content { display: grid; grid-template-columns: 350px 1fr; gap: 32px; flex: 1; min-height: 0; }
          
          @media (max-width: 1024px) {
            .assignments-page { height: auto; overflow: visible; padding: 20px; }
            .page-header { flex-direction: column; align-items: flex-start; gap: 20px; }
            .assignments-content { grid-template-columns: 1fr; }
            .assignments-sidebar { height: 680px; }
          }

          @media (max-width: 768px) {
            .header-stats { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
            .mini-stat { padding: 12px; }
            .detail-header { flex-direction: column; gap: 20px; }
            .submission-meta { text-align: left; }
            .action-buttons { flex-direction: column; }
          }
          
          .assignments-sidebar { background: white; border-radius: 24px; border: 1px solid var(--light-tertiary); display: flex; flex-direction: column; overflow: hidden; }
          .search-bar { padding: 16px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid var(--light-tertiary); }
          .search-bar input { border: none; outline: none; flex: 1; font-size: 0.9rem; }
          .filter-tabs { display: flex; padding: 12px; gap: 8px; border-bottom: 1px solid var(--light-tertiary); }
          .filter-tabs button { flex: 1; padding: 8px; border: none; background: transparent; font-size: 0.8rem; font-weight: 600; border-radius: 8px; cursor: pointer; color: var(--text-neutral); }
          .filter-tabs button.active { background: var(--light-secondary); color: var(--primary-blue); }
          
          .submissions-list { flex: 1; overflow-y: auto; padding: 12px; }
          .submission-item { padding: 16px; border-radius: 16px; margin-bottom: 8px; cursor: pointer; transition: all 0.2s; border: 1px solid transparent; display: flex; justify-content: space-between; align-items: center; }
          .submission-item:hover { background: var(--light-secondary); }
          .submission-item.active { background: rgba(0, 71, 171, 0.05); border-color: rgba(0, 71, 171, 0.1); }
          .topic-name { font-weight: 700; font-size: 0.95rem; margin-bottom: 2px; }
          .student-name { font-size: 0.85rem; color: var(--text-neutral); }
          
          .status-tag { display: flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 12px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
          .status-tag.pending { background: #fffbeb; color: #d97706; }
          .status-tag.accepted { background: #f0fdf4; color: #16a34a; }
          .status-tag.rejected { background: #fef2f2; color: #dc2626; }

          .assignment-detail { background: white; border-radius: 24px; border: 1px solid var(--light-tertiary); overflow-y: auto; }
          .no-selection { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted); gap: 16px; }
          
          .detail-view { padding: 32px; }
          .detail-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
          .student-profile { display: flex; gap: 16px; align-items: center; }
          .student-profile .avatar { width: 56px; height: 56px; background: var(--brand-gradient); color: white; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 800; }
          .student-profile h2 { margin: 0; font-size: 1.5rem; }
          .student-profile p { margin: 0; color: var(--text-neutral); }
          .submission-meta { text-align: right; }
          .submission-meta p { margin: 0 0 4px 0; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); }

          .section-label { display: flex; align-items: center; gap: 8px; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; }
          .code-review-section { margin-bottom: 40px; }
          .feedback-section textarea { width: 100%; min-height: 120px; padding: 16px; border-radius: 16px; border: 1px solid var(--light-tertiary); outline: none; margin-bottom: 24px; font-family: inherit; font-size: 0.95rem; }
          
          .action-buttons { display: flex; gap: 16px; }
          .action-buttons button { flex: 1; padding: 14px; border: none; border-radius: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: all 0.2s; }
          .btn-accept { background: #16a34a; color: white; }
          .btn-reject { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
          .btn-accept:hover { background: #15803d; transform: translateY(-2px); }
          .btn-reject:hover { background: #fee2e2; transform: translateY(-2px); }
        `}} />
        {snackbar.open && (
          <div className={`snackbar-notification ${snackbar.type} card-3d`}>
            {snackbar.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{snackbar.message}</span>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AssignmentsList;
