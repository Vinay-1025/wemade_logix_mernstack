import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Clock, Search, ExternalLink, MessageSquare, Code } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import CodeEditor from '../components/CodeEditor';
import { useLocation } from 'react-router-dom';

const AssignmentsList = () => {
  const location = useLocation();
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData?.token;
      
      const response = await fetch('/api/assignments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setAssignments(data);
      setLoading(false);

      // Handle navigation from notification
      if (location.state?.selectedId) {
        const target = data.find(a => a._id === location.state.selectedId);
        if (target) {
          setSelectedAssignment(target);
          setFeedback(target.feedback || '');
        }
      }
    } catch (err) {
      console.error('Failed to fetch assignments');
      setLoading(false);
    }
  };

  const handleAction = async (status) => {
    if (!selectedAssignment) return;

    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData?.token;

      const response = await fetch(`/api/assignments/${selectedAssignment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status, feedback })
      });

      if (response.ok) {
        alert(`Assignment ${status} successfully`);
        setSelectedAssignment(null);
        setFeedback('');
        fetchAssignments();
      }
    } catch (err) {
      alert('Action failed');
    }
  };

  const filteredAssignments = assignments.filter(asn => {
    const matchesSearch = asn.student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          asn.topicTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || asn.status === filter;
    return matchesSearch && matchesFilter;
  });

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
              <span className="value">{assignments.filter(a => a.status === 'pending').length}</span>
            </div>
            <div className="mini-stat">
              <span className="label">Total</span>
              <span className="value">{assignments.length}</span>
            </div>
          </div>
        </div>

        <div className="assignments-content">
          <div className="assignments-sidebar">
            <div className="search-bar">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search students or topics..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-tabs">
              <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
              <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>Pending</button>
              <button className={filter === 'accepted' ? 'active' : ''} onClick={() => setFilter('accepted')}>Accepted</button>
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
                    }}
                  >
                    <div className="item-main">
                      <p className="topic-name">{asn.topicTitle}</p>
                      <p className="student-name">{asn.student.name}</p>
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

                <div className="feedback-section">
                  <div className="section-label">
                    <MessageSquare size={18} /> <span>Instructor Feedback</span>
                  </div>
                  <textarea 
                    placeholder="Add your comments here..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                  <div className="action-buttons">
                    <button className="btn btn-reject" onClick={() => handleAction('rejected')}>
                      <XCircle size={18} /> Reject Submission
                    </button>
                    <button className="btn btn-accept" onClick={() => handleAction('accepted')}>
                      <CheckCircle2 size={18} /> Accept & Approve
                    </button>
                  </div>
                </div>
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
            .assignments-sidebar { height: 400px; }
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
      </div>
    </MainLayout>
  );
};

export default AssignmentsList;
