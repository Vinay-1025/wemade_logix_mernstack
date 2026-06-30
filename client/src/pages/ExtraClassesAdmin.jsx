import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, Edit2, Trash2, ShieldAlert, CheckCircle, AlertCircle, Info, Loader2, RefreshCw } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import axios from 'axios';

const ExtraClassesAdmin = () => {
  const { user } = useSelector((state) => state.auth);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Edit Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [newDate, setNewDate] = useState('');

  // Delete Modal State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);

  const fetchExtraSessions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/attendance/extra-sessions', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (res.data?.success) {
        setSessions(res.data.sessions || []);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch extra sessions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchExtraSessions();
    }
  }, [user]);

  const handleOpenEdit = (session) => {
    setCurrentSession(session);
    // Parse date from dayId (e.g. extra-2026-06-28 -> 2026-06-28)
    const datePart = session.dayId.substring(6);
    setNewDate(datePart);
    setIsEditOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!newDate) return;
    setActionLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const oldDayId = currentSession.dayId;
      const res = await axios.put(`/api/attendance/extra-sessions/${oldDayId}`, 
        { newDate },
        { headers: { 'Authorization': `Bearer ${user.token}` } }
      );
      if (res.data?.success) {
        setSuccessMsg(res.data.message || 'Rescheduled extra class successfully.');
        setIsEditOpen(false);
        fetchExtraSessions();
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to reschedule session.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenDelete = (session) => {
    setSessionToDelete(session);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!sessionToDelete) return;
    setActionLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const dayId = sessionToDelete.dayId;
      const res = await axios.delete(`/api/attendance/extra-sessions/${dayId}`, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (res.data?.success) {
        setSuccessMsg(res.data.message || 'Deleted extra class successfully.');
        setIsDeleteOpen(false);
        fetchExtraSessions();
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to delete extra class.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="extra-admin-container">
        <header className="extra-admin-header">
          <div>
            <h1>Extra Classes Register</h1>
            <p className="subtitle">Update, delete, and manage additional Sunday and schedule overrides</p>
          </div>
          <button className="refresh-btn" onClick={fetchExtraSessions} disabled={loading}>
            {loading ? <Loader2 size={16} className="spin" /> : <RefreshCw size={16} />}
            <span>Refresh</span>
          </button>
        </header>

        {successMsg && (
          <div className="admin-alert success">
            <CheckCircle size={18} />
            <span>{successMsg}</span>
            <button className="alert-close" onClick={() => setSuccessMsg(null)}>×</button>
          </div>
        )}

        {error && (
          <div className="admin-alert error">
            <AlertCircle size={18} />
            <span>{error}</span>
            <button className="alert-close" onClick={() => setError(null)}>×</button>
          </div>
        )}

        {loading ? (
          <div className="extra-loading">
            <Loader2 size={36} className="spin" />
            <p>Loading additional session records...</p>
          </div>
        ) : sessions.length === 0 ? (
          <div className="no-sessions-card">
            <Calendar size={48} className="empty-icon" />
            <h3>No Extra Classes Found</h3>
            <p>Any additional classes created in the Attendance Center will appear here for date edits and deletions.</p>
          </div>
        ) : (
          <div className="sessions-table-wrapper">
            <table className="sessions-table">
              <thead>
                <tr>
                  <th>Session Identifier</th>
                  <th>Target Date</th>
                  <th>Status</th>
                  <th>Created Info</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session) => {
                  const dateStr = session.dayId.substring(6);
                  const formattedDate = new Date(dateStr).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  });

                  return (
                    <tr key={session._id} className={session.isCancelled ? 'cancelled-row' : ''}>
                      <td>
                        <div className="session-id-badge">
                          <span className="code-font">{session.dayId}</span>
                        </div>
                      </td>
                      <td>
                        <span className="session-date">{formattedDate}</span>
                      </td>
                      <td>
                        {session.isCancelled ? (
                          <div className="status-cell-badge cancelled" title={session.cancelReason}>
                            <span>Cancelled</span>
                          </div>
                        ) : (
                          <div className="status-cell-badge active">
                            <span>Active</span>
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="created-details">
                          <span className="created-date">Code: {session.code}</span>
                          <span className="created-time">
                            Added: {new Date(session.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons-group">
                          <button 
                            className="row-action-btn edit" 
                            title="Reschedule Class Date"
                            onClick={() => handleOpenEdit(session)}
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            className="row-action-btn delete" 
                            title="Delete Session & Records"
                            onClick={() => handleOpenDelete(session)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Reschedule Modal */}
        {isEditOpen && (
          <div className="admin-modal-overlay">
            <div className="admin-modal">
              <h2>Reschedule Extra Class</h2>
              <p className="modal-description">
                Updating the date will modify the course day identifier to match <code className="code-font">extra-YYYY-MM-DD</code> and update all student attendance records linked to this session.
              </p>
              
              <div className="form-group">
                <label>Select New Date</label>
                <input 
                  type="date" 
                  value={newDate} 
                  onChange={(e) => setNewDate(e.target.value)} 
                  className="date-input"
                />
              </div>

              <div className="modal-actions">
                <button 
                  className="modal-btn secondary" 
                  onClick={() => setIsEditOpen(false)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button 
                  className="modal-btn primary" 
                  onClick={handleSaveEdit}
                  disabled={actionLoading || !newDate}
                >
                  {actionLoading ? <Loader2 size={16} className="spin" /> : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteOpen && (
          <div className="admin-modal-overlay">
            <div className="admin-modal danger">
              <div className="modal-danger-header">
                <ShieldAlert size={28} color="#ef4444" />
                <h2>Delete Extra Class?</h2>
              </div>
              <p className="modal-description">
                You are about to delete the extra session <code className="code-font">{sessionToDelete?.dayId}</code>. 
                This action is <strong>irreversible</strong> and will automatically delete all student attendance records marked for this extra day.
              </p>

              <div className="modal-actions">
                <button 
                  className="modal-btn secondary" 
                  onClick={() => setIsDeleteOpen(false)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button 
                  className="modal-btn danger" 
                  onClick={handleConfirmDelete}
                  disabled={actionLoading}
                >
                  {actionLoading ? <Loader2 size={16} className="spin" /> : 'Confirm Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .extra-admin-container {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Inter', -apple-system, sans-serif;
        }

        .extra-admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--app-border, #e2e8f0);
          padding-bottom: 20px;
        }

        .extra-admin-header h1 {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--app-text, #1e293b);
          margin: 0 0 6px 0;
          letter-spacing: -0.5px;
        }

        .extra-admin-header .subtitle {
          font-size: 0.9rem;
          color: var(--app-text-muted, #64748b);
          margin: 0;
        }

        .refresh-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 209, 209, 0.05);
          border: 1px solid rgba(0, 209, 209, 0.2);
          color: var(--primary-cyan, #00d1d1);
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .refresh-btn:hover {
          background: rgba(0, 209, 209, 0.1);
        }

        .admin-alert {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          border-radius: 8px;
          margin-bottom: 24px;
          font-size: 0.9rem;
          position: relative;
        }

        .admin-alert.success {
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.15);
          color: #10b981;
        }

        .admin-alert.error {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.15);
          color: #ef4444;
        }

        .alert-close {
          position: absolute;
          right: 16px;
          background: transparent;
          border: none;
          color: inherit;
          font-size: 1.25rem;
          cursor: pointer;
        }

        .extra-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 40px;
          color: var(--app-text-muted, #64748b);
          gap: 16px;
        }

        .no-sessions-card {
          text-align: center;
          padding: 60px 40px;
          background: var(--app-card-bg, #ffffff);
          border: 1px dashed var(--app-border, #e2e8f0);
          border-radius: 12px;
          color: var(--app-text-muted, #64748b);
        }

        .empty-icon {
          margin: 0 auto 16px auto;
          opacity: 0.4;
        }

        .no-sessions-card h3 {
          font-size: 1.25rem;
          color: var(--app-text, #1e293b);
          margin: 0 0 8px 0;
        }

        .no-sessions-card p {
          max-width: 400px;
          margin: 0 auto;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .sessions-table-wrapper {
          background: var(--app-card-bg, #ffffff);
          border: 1px solid var(--app-border, #e2e8f0);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .sessions-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .sessions-table th {
          background: rgba(0, 0, 0, 0.02);
          padding: 16px 20px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--app-text-muted, #64748b);
          border-bottom: 1px solid var(--app-border, #e2e8f0);
        }

        .sessions-table td {
          padding: 16px 20px;
          font-size: 0.9rem;
          border-bottom: 1px solid var(--app-border, #e2e8f0);
          color: var(--app-text, #0f172a);
          vertical-align: middle;
        }

        .sessions-table tr:last-child td {
          border-bottom: none;
        }

        .cancelled-row td {
          background: rgba(245, 158, 11, 0.02);
        }

        .session-id-badge {
          display: inline-block;
          background: rgba(0, 209, 209, 0.08);
          border: 1px solid rgba(0, 209, 209, 0.15);
          padding: 4px 10px;
          border-radius: 6px;
          color: #00D1D1;
        }

        .code-font {
          font-family: monospace;
          font-weight: 600;
        }

        .session-date {
          font-weight: 600;
        }

        .status-cell-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-cell-badge.active {
          background: rgba(16, 185, 129, 0.1);
          color: #16a34a;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .status-cell-badge.cancelled {
          background: rgba(245, 158, 11, 0.1);
          color: #d97706;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .created-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .created-date {
          font-weight: 600;
          font-size: 0.85rem;
        }

        .created-time {
          font-size: 0.75rem;
          color: var(--app-text-muted, #64748b);
        }

        .action-buttons-group {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }

        .row-action-btn {
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid var(--app-border, #e2e8f0);
          color: var(--app-text-muted, #64748b);
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .row-action-btn:hover {
          color: var(--app-text, #0f172a);
          background: rgba(0, 0, 0, 0.05);
        }

        .row-action-btn.edit:hover {
          background: rgba(0, 209, 209, 0.15);
          border-color: rgba(0, 209, 209, 0.3);
          color: #00D1D1;
        }

        .row-action-btn.delete:hover {
          background: rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        /* Modals */
        .admin-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .admin-modal {
          background: var(--app-card-bg, #ffffff);
          border: 1px solid var(--app-border, #e2e8f0);
          padding: 32px;
          border-radius: 16px;
          max-width: 480px;
          width: 90%;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
        }

        .admin-modal h2 {
          font-size: 1.35rem;
          color: var(--app-text, #0f172a);
          margin: 0 0 12px 0;
          font-weight: 800;
        }

        .modal-danger-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .modal-danger-header h2 {
          margin: 0;
          color: #ef4444;
        }

        .modal-description {
          font-size: 0.875rem;
          color: var(--app-text-muted, #64748b);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--app-text, #0f172a);
        }

        .date-input {
          width: 100%;
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid var(--app-border, #e2e8f0);
          color: var(--app-text, #0f172a);
          padding: 12px;
          border-radius: 8px;
          outline: none;
          font-size: 0.9rem;
          font-family: inherit;
        }

        .date-input:focus {
          border-color: #00D1D1;
        }

        .modal-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .modal-btn {
          padding: 12px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .modal-btn.secondary {
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid var(--app-border, #e2e8f0);
          color: var(--app-text, #0f172a);
        }

        .modal-btn.secondary:hover {
          background: rgba(0, 0, 0, 0.06);
        }

        .modal-btn.primary {
          background: var(--brand-gradient, linear-gradient(135deg, #00D1D1 0%, #0047AB 100%));
          border: none;
          color: #ffffff;
        }

        .modal-btn.primary:hover {
          opacity: 0.95;
        }

        .modal-btn.danger {
          background: #ef4444;
          border: none;
          color: #ffffff;
        }

        .modal-btn.danger:hover {
          background: #dc2626;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .extra-admin-header {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }
          .refresh-btn {
            width: 100%;
            justify-content: center;
          }
          .sessions-table-wrapper {
            overflow-x: auto;
          }
          .sessions-table th, .sessions-table td {
            padding: 12px 14px;
            font-size: 0.8rem;
          }
        }
      `}} />
    </MainLayout>
  );
};

export default ExtraClassesAdmin;
