import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MainLayout from '../components/MainLayout';
import axios from 'axios';
import { Play, Square, QrCode, Search, RefreshCw, CheckCircle, Clock, Calendar, Download } from 'lucide-react';

const AttendanceAdmin = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  
  const [activeSession, setActiveSession] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recordsLoading, setRecordsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const fetchActiveSession = async () => {
    if (!currentUser?.token) return;
    try {
      const response = await axios.get('/api/attendance/session/active', {
        headers: { 'Authorization': `Bearer ${currentUser.token}` }
      });
      if (response.data?.success) {
        setActiveSession(response.data.session);
      }
    } catch (err) {
      console.error('Failed to fetch active session:', err);
    }
  };

  const fetchRecords = async () => {
    if (!currentUser?.token) return;
    setRecordsLoading(true);
    try {
      const response = await axios.get('/api/attendance/records', {
        headers: { 'Authorization': `Bearer ${currentUser.token}` }
      });
      if (response.data?.success) {
        setRecords(response.data.records);
      }
    } catch (err) {
      console.error('Failed to fetch attendance records:', err);
    } finally {
      setRecordsLoading(false);
    }
  };

  const initializeData = async () => {
    if (!currentUser?.token) return;
    setLoading(true);
    await Promise.all([fetchActiveSession(), fetchRecords()]);
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser?.token) {
      initializeData();
    }
  }, [currentUser]);

  const handleStartSession = async () => {
    if (!currentUser?.token) return;
    try {
      const response = await axios.post('/api/attendance/session', {}, {
        headers: { 'Authorization': `Bearer ${currentUser.token}` }
      });
      if (response.data?.success) {
        setActiveSession(response.data.session);
        setStatusMessage({ type: 'success', text: 'Attendance session started. QR code generated!' });
        fetchRecords();
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.response?.data?.message || 'Failed to start session' });
    }
  };

  const handleEndSession = async () => {
    if (!currentUser?.token) return;
    try {
      const response = await axios.put('/api/attendance/session/end', {}, {
        headers: { 'Authorization': `Bearer ${currentUser.token}` }
      });
      if (response.data?.success) {
        setActiveSession(null);
        setStatusMessage({ type: 'success', text: 'Attendance session ended successfully.' });
        fetchRecords();
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.response?.data?.message || 'Failed to end session' });
    }
  };

  const handleExportCSV = () => {
    if (records.length === 0) return;
    
    const headers = ['Student Name', 'Student Email', 'Session Code', 'Marked At'];
    const rows = records.map(r => [
      r.student?.name || 'N/A',
      r.student?.email || 'N/A',
      r.session?.code || 'N/A',
      new Date(r.markedAt).toLocaleString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(','))].join('\n');
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `wemade_attendance_records_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter records based on search query
  const filteredRecords = records.filter(r => {
    const studentName = r.student?.name || '';
    const studentEmail = r.student?.email || '';
    const sessionCode = r.session?.code || '';
    const query = searchQuery.toLowerCase();
    return studentName.toLowerCase().includes(query) || 
           studentEmail.toLowerCase().includes(query) || 
           sessionCode.toLowerCase().includes(query);
  });

  return (
    <MainLayout>
      <div className="attendance-admin-container">
        {/* Header Block */}
        <div className="admin-header-card">
          <div className="header-text-block">
            <h1 className="admin-page-title">Attendance Control Room</h1>
            <p className="admin-page-subtitle">Dynamically control class registration, generate secure QR keys, and audit student check-ins.</p>
          </div>
          <div className="header-actions-block">
            <button className="icon-btn-action" onClick={initializeData} title="Refresh Dashboard">
              <RefreshCw size={16} className={recordsLoading ? 'spin' : ''} />
            </button>
            <button 
              className="action-btn-secondary" 
              onClick={handleExportCSV}
              disabled={records.length === 0}
            >
              <Download size={16} /> Export Records
            </button>
          </div>
        </div>

        {statusMessage.text && (
          <div className={`status-banner ${statusMessage.type}`}>
            <span>{statusMessage.text}</span>
            <button className="close-banner" onClick={() => setStatusMessage({ type: '', text: '' })}>×</button>
          </div>
        )}

        <div className="attendance-grid">
          {/* QR Generator Control Card */}
          <div className="control-card shadow-premium">
            <div className="card-header-premium">
              <QrCode size={20} className="header-icon-green" />
              <h3>Live Attendance Generator</h3>
            </div>

            {loading ? (
              <div className="loading-state-card">Checking active sessions...</div>
            ) : activeSession ? (
              <div className="session-active-view">
                <div className="pulse-indicator">
                  <span className="pulse-dot"></span>
                  <span className="pulse-text">SESSION ACTIVE</span>
                </div>

                <div className="qr-code-wrapper">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${activeSession.code}&color=0047ab&bgcolor=ffffff`} 
                    alt="Attendance QR Code"
                    className="qr-image"
                  />
                  <div className="qr-code-overlay">
                    <span className="code-text">{activeSession.code}</span>
                  </div>
                </div>

                <div className="session-details-list">
                  <div className="detail-item">
                    <span className="detail-label">Started At</span>
                    <span className="detail-value">{new Date(activeSession.createdAt).toLocaleTimeString()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Authorized Token</span>
                    <span className="detail-value font-mono">{activeSession.code}</span>
                  </div>
                </div>

                <button className="btn-stop-session" onClick={handleEndSession}>
                  <Square size={16} fill="white" /> End Active Session
                </button>
              </div>
            ) : (
              <div className="session-inactive-view">
                <div className="inactive-badge">
                  <span className="inactive-dot"></span>
                  <span className="inactive-text">NO ACTIVE SESSION</span>
                </div>
                <p className="inactive-description">
                  Generate a dynamic, temporary session-bound QR key. Students can scan it via their headers to verify attendance. Keys remain valid until manually terminated.
                </p>
                <button className="btn-start-session" onClick={handleStartSession}>
                  <Play size={16} fill="white" /> Enable Attendance QR
                </button>
              </div>
            )}
          </div>

          {/* Real-time Audit List */}
          <div className="audit-card shadow-premium">
            <div className="card-header-premium">
              <CheckCircle size={20} className="header-icon-cyan" />
              <h3>Personnel Audit Logs</h3>
              <div className="records-count">{filteredRecords.length} records</div>
            </div>

            <div className="search-bar-wrapper">
              <Search size={16} className="search-icon-card" />
              <input 
                type="text" 
                placeholder="Search by student name, email, or session token..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="search-input-card"
              />
            </div>

            <div className="table-responsive-container">
              {recordsLoading && records.length === 0 ? (
                <div className="loading-state-card">Loading attendance logs...</div>
              ) : filteredRecords.length === 0 ? (
                <div className="empty-records-card">No records found matching search queries.</div>
              ) : (
                <table className="premium-admin-table">
                  <thead>
                    <tr>
                      <th>Personnel</th>
                      <th>Token ID</th>
                      <th>Time Verified</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record) => (
                      <tr key={record._id} className="table-row-hover">
                        <td>
                          <div className="user-info-cell">
                            <span className="user-cell-name">{record.student?.name || 'Deleted Account'}</span>
                            <span className="user-cell-email">{record.student?.email || 'N/A'}</span>
                          </div>
                        </td>
                        <td>
                          <span className="token-cell font-mono">{record.session?.code || 'Expired'}</span>
                        </td>
                        <td>
                          <div className="time-cell">
                            <span className="time-cell-main">{new Date(record.markedAt).toLocaleTimeString()}</span>
                            <span className="time-cell-sub">{new Date(record.markedAt).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td>
                          <span className="status-badge-verified">Verified</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .attendance-admin-container {
          padding: 30px;
          background: var(--app-bg);
          min-height: calc(100vh - 64px);
        }
        .admin-header-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #ffffff;
          border: 1px solid var(--app-border);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        .admin-page-title {
          font-size: 1.75rem;
          font-weight: 850;
          color: var(--text-primary);
          margin: 0 0 6px 0;
          letter-spacing: -0.5px;
        }
        .admin-page-subtitle {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin: 0;
        }
        .header-actions-block {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .icon-btn-action {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: 1px solid var(--app-border);
          background: #f8fafc;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s;
        }
        .icon-btn-action:hover {
          background: #f1f5f9;
          color: var(--primary-cyan);
          border-color: var(--primary-cyan);
        }
        .action-btn-secondary {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 12px;
          border: 1px solid var(--app-border);
          background: #f8fafc;
          color: var(--text-primary);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .action-btn-secondary:hover:not(:disabled) {
          background: #f1f5f9;
          border-color: var(--primary-cyan);
          color: var(--primary-cyan);
        }
        .action-btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .status-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
          border-radius: 12px;
          margin-bottom: 24px;
          font-size: 0.9rem;
          font-weight: 650;
        }
        .status-banner.success {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
        .status-banner.error {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        .close-banner {
          background: transparent;
          border: none;
          color: inherit;
          font-size: 1.25rem;
          cursor: pointer;
        }
        .attendance-grid {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .attendance-grid {
            grid-template-columns: 1fr;
          }
        }
        .control-card, .audit-card {
          background: var(--app-card-bg);
          border: 1px solid var(--app-border);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
        }
        .card-header-premium {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          position: relative;
        }
        .card-header-premium h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .header-icon-green { color: #10b981; }
        .header-icon-cyan { color: var(--primary-cyan); }
        .records-count {
          position: absolute;
          right: 0;
          background: rgba(0, 209, 209, 0.1);
          color: var(--primary-cyan);
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 750;
        }
        .session-active-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .pulse-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 6px 14px;
          border-radius: 20px;
          margin-bottom: 20px;
        }
        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 8px #10b981;
          animation: pulseGreen 1.5s infinite;
        }
        @keyframes pulseGreen {
          0% { transform: scale(0.95); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.6; }
          100% { transform: scale(0.95); opacity: 1; }
        }
        .pulse-text {
          font-size: 0.75rem;
          font-weight: 800;
          color: #10b981;
          letter-spacing: 0.5px;
        }
        .qr-code-wrapper {
          position: relative;
          background: #f8fafc;
          padding: 16px;
          border-radius: 16px;
          border: 1px solid var(--app-border);
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          margin-bottom: 20px;
        }
        .qr-image {
          width: 180px;
          height: 180px;
          object-fit: contain;
          border-radius: 8px;
        }
        .qr-code-overlay {
          margin-top: 10px;
          background: rgba(0, 209, 209, 0.1);
          border: 1px solid rgba(0, 209, 209, 0.3);
          padding: 4px 12px;
          border-radius: 8px;
        }
        .code-text {
          font-family: monospace;
          color: var(--primary-cyan);
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 1px;
        }
        .session-details-list {
          width: 100%;
          border: 1px solid var(--app-border);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 20px;
        }
        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: #ffffff;
          font-size: 0.85rem;
        }
        .detail-item:not(:last-child) {
          border-bottom: 1px solid var(--app-border);
        }
        .detail-label {
          color: var(--text-secondary);
          font-weight: 600;
        }
        .detail-value {
          color: var(--text-primary);
          font-weight: 750;
        }
        .btn-stop-session {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: #ef4444;
          color: #fff;
          font-weight: 750;
          font-size: 0.9rem;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
          transition: all 0.2s;
        }
        .btn-stop-session:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
        }
        .session-inactive-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px 0;
        }
        .inactive-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(148, 163, 184, 0.08);
          border: 1px solid rgba(148, 163, 184, 0.2);
          padding: 6px 14px;
          border-radius: 20px;
          margin-bottom: 20px;
        }
        .inactive-dot {
          width: 8px;
          height: 8px;
          background: #94a3b8;
          border-radius: 50%;
        }
        .inactive-text {
          font-size: 0.75rem;
          font-weight: 800;
          color: #94a3b8;
          letter-spacing: 0.5px;
        }
        .inactive-description {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 24px;
        }
        .btn-start-session {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: var(--brand-gradient);
          color: #fff;
          font-weight: 750;
          font-size: 0.9rem;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 209, 209, 0.2);
          transition: all 0.2s;
        }
        .btn-start-session:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0, 209, 209, 0.3);
        }
        .search-bar-wrapper {
          position: relative;
          width: 100%;
          margin-bottom: 20px;
        }
        .search-icon-card {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }
        .search-input-card {
          width: 100%;
          padding: 12px 16px 12px 42px;
          border: 1px solid var(--app-border);
          border-radius: 12px;
          background: #f8fafc;
          color: var(--text-primary);
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .search-input-card:focus {
          outline: none;
          border-color: var(--primary-cyan);
          background: #ffffff;
          box-shadow: 0 0 10px rgba(0,209,209,0.1);
        }
        .table-responsive-container {
          overflow-x: auto;
        }
        .premium-admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .premium-admin-table th {
          padding: 12px 16px;
          font-size: 0.75rem;
          font-weight: 750;
          color: var(--text-secondary);
          text-transform: uppercase;
          border-bottom: 2px solid var(--app-border);
          background: #f8fafc;
          letter-spacing: 0.5px;
        }
        .premium-admin-table td {
          padding: 14px 16px;
          border-bottom: 1px solid var(--app-border);
          font-size: 0.875rem;
          color: var(--text-primary);
        }
        .table-row-hover:hover {
          background: #f8fafc;
        }
        .user-info-cell {
          display: flex;
          flex-direction: column;
        }
        .user-cell-name {
          font-weight: 700;
          color: var(--text-primary);
        }
        .user-cell-email {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .token-cell {
          font-size: 0.8rem;
          background: #f1f5f9;
          border: 1px solid var(--app-border);
          padding: 4px 8px;
          border-radius: 6px;
          color: var(--text-secondary);
        }
        .time-cell {
          display: flex;
          flex-direction: column;
        }
        .time-cell-main {
          font-weight: 650;
          color: var(--text-primary);
        }
        .time-cell-sub {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .status-badge-verified {
          background: rgba(16, 185, 129, 0.08);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 850;
          display: inline-block;
        }
        .loading-state-card {
          padding: 40px;
          text-align: center;
          color: var(--text-neutral);
          font-size: 0.9rem;
        }
        .empty-records-card {
          padding: 40px;
          text-align: center;
          color: var(--text-neutral);
          font-size: 0.9rem;
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </MainLayout>
  );
};

export default AttendanceAdmin;
