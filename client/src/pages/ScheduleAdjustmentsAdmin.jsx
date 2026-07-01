import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, Edit2, Trash2, ShieldAlert, CheckCircle, AlertCircle, Info, Loader2, RefreshCw, XCircle, Undo2, Award } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import axios from 'axios';

const ScheduleAdjustmentsAdmin = () => {
  const { user } = useSelector((state) => state.auth);

  const getCalendarDateForDay = (dayId) => {
    if (dayId && dayId.toString().startsWith('extra-')) {
      return dayId.toString().substring(6);
    }
    const baseDate = new Date(Date.UTC(2026, 4, 18)); // May 18, 2026 (Month is 0-indexed, UTC)

    const getDayNumber = (id) => {
      if (!id) return 1;
      const str = id.toString().trim().toLowerCase();
      if (/^\d+$/.test(str)) {
        return parseInt(str, 10);
      }
      const match = str.match(/^w(\d+)-d(\d+)$/);
      if (match) {
        const week = parseInt(match[1], 10);
        const day = parseInt(match[2], 10);
        if (week === 1 && day === 0) return 0;
        return (week - 1) * 6 + day;
      }
      return 1;
    };

    const dayNo = getDayNumber(dayId);
    if (dayNo === 0) {
      return '2026-05-18';
    }

    let targetDate = new Date(baseDate.getTime());
    let nonSundayDaysAdded = 0;

    while (nonSundayDaysAdded < dayNo - 1) {
      targetDate.setUTCDate(targetDate.getUTCDate() + 1);
      if (targetDate.getUTCDay() !== 0) { // 0 is Sunday
        nonSundayDaysAdded++;
      }
    }

    const yyyy = targetDate.getUTCFullYear();
    const mm = String(targetDate.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(targetDate.getUTCDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Filter tab state
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'extra', 'cancelled'

  // Edit Modal State (Extra Classes only)
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [newDate, setNewDate] = useState('');

  // Delete Modal State (Extra Classes deletion / Cancelled sessions restoration)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const [restoreConfirmId, setRestoreConfirmId] = useState(null);

  const fetchAdjustments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/attendance/schedule-adjustments', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (res.data?.success) {
        setSessions(res.data.sessions || []);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch schedule adjustments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchAdjustments();
    }
  }, [user]);

  const handleOpenEdit = (session) => {
    setCurrentSession(session);
    // Parse date from dayId (e.g. extra-2026-06-28 -> 2026-06-28)
    const datePart = session.dayId.startsWith('extra-') ? session.dayId.substring(6) : '';
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
        fetchAdjustments();
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to reschedule session.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRestoreSession = async (sessionToRestore) => {
    setActionLoading(true);
    setError(null);
    setSuccessMsg(null);
    setRestoreConfirmId(null);
    try {
      const dayId = sessionToRestore.dayId;
      const res = await axios.delete(`/api/attendance/extra-sessions/${dayId}`, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (res.data?.success) {
        setSuccessMsg('Successfully restored class and removed cancellation status.');
        fetchAdjustments();
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to restore class session.');
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
        const isCancelledType = sessionToDelete.isCancelled;
        setSuccessMsg(
          isCancelledType 
            ? 'Successfully restored class and removed cancellation status.' 
            : 'Deleted extra class successfully.'
        );
        setIsDeleteOpen(false);
        fetchAdjustments();
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to complete schedule update.');
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered sessions list
  const filteredSessions = sessions.filter(session => {
    const isExtra = session.dayId.startsWith('extra-');
    const isCancelled = session.isCancelled;
    if (activeTab === 'extra') return isExtra && !isCancelled;
    if (activeTab === 'cancelled') return isCancelled;
    return true; // 'all'
  });

  return (
    <MainLayout>
      <div className="adjustments-admin-container">
        {/* Header Block */}
        <header className="adjustments-admin-header">
          <div>
            <h1>Schedule Adjustments Center</h1>
            <p className="subtitle">Update, delete, and manage additional Sunday classes and class cancellation schedule overrides</p>
          </div>
          <button className="refresh-btn" onClick={fetchAdjustments} disabled={loading}>
            {loading ? <Loader2 size={15} className="spin" /> : <RefreshCw size={15} />}
            <span>Refresh</span>
          </button>
        </header>

        {/* Tab Filters */}
        <div className="filter-tabs-container">
          <button 
            className={`filter-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Adjustments ({sessions.length})
          </button>
          <button 
            className={`filter-tab-btn ${activeTab === 'extra' ? 'active' : ''}`}
            onClick={() => setActiveTab('extra')}
          >
            Extra Classes ({sessions.filter(s => s.dayId.startsWith('extra-') && !s.isCancelled).length})
          </button>
          <button 
            className={`filter-tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled Sessions ({sessions.filter(s => s.isCancelled).length})
          </button>
        </div>

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
          <div className="adjustments-loading">
            <Loader2 size={36} className="spin" />
            <p>Loading schedule override records...</p>
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="no-adjustments-card">
            <Calendar size={48} className="empty-icon" />
            <h3>No Schedule Overrides Found</h3>
            <p>Any extra classes or cancelled sessions registered in the system will appear here.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="desktop-table-wrapper">
              <table className="adjustments-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Session Identifier</th>
                    <th>Target Date</th>
                    <th>Reason / Details</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSessions.map((session) => {
                    const isExtra = session.dayId.startsWith('extra-');
                    const dateStr = getCalendarDateForDay(session.dayId);
                    let formattedDate = 'N/A';
                    try {
                      if (dateStr) {
                        // Use UTC timezone mapping if date is YYYY-MM-DD to prevent local timezone offsets
                        const parts = dateStr.split('-');
                        const targetDate = parts.length === 3 
                          ? new Date(Date.UTC(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])))
                          : new Date(dateStr);
                        formattedDate = targetDate.toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          timeZone: 'UTC'
                        });
                      }
                    } catch (e) {}

                    return (
                      <tr key={session._id} className={session.isCancelled ? 'cancelled-row' : ''}>
                        <td>
                          <span className={`type-tag ${isExtra ? 'extra' : 'cancelled'}`}>
                            {isExtra ? 'Extra Class' : 'Cancelled Class'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div className="session-id-badge" style={{ width: 'fit-content' }}>
                              <span className="code-font">{session.dayId}</span>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                              {formattedDate}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className="session-date">{formattedDate}</span>
                        </td>
                        <td>
                          {session.isCancelled ? (
                            <span className="detail-text reason" title={session.cancelReason}>
                              Reason: {session.cancelReason || 'Cancelled session'}
                            </span>
                          ) : (
                            <span className="detail-text code">Code: {session.code || 'Active Extra Class'}</span>
                          )}
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
                        <td style={{ position: 'relative' }}>
                          <div className="action-buttons-group">
                            {isExtra && (
                              <button 
                                className="row-action-btn edit" 
                                title="Reschedule Class Date"
                                onClick={() => {
                                  setRestoreConfirmId(null);
                                  handleOpenEdit(session);
                                }}
                              >
                                <Edit2 size={13} />
                              </button>
                            )}
                            <button 
                              className={`row-action-btn ${session.isCancelled ? 'restore' : 'delete'}`} 
                              title={session.isCancelled ? "Restore Class (Remove Override)" : "Delete Session & Records"}
                              onClick={() => {
                                if (session.isCancelled) {
                                  setRestoreConfirmId(restoreConfirmId === session._id ? null : session._id);
                                } else {
                                  handleOpenDelete(session);
                                }
                              }}
                            >
                              {session.isCancelled ? <Undo2 size={13} /> : <Trash2 size={13} />}
                            </button>

                            {session.isCancelled && restoreConfirmId === session._id && (
                              <div className="anchored-confirm-popover">
                                <span className="confirm-text">Restore class?</span>
                                <div className="confirm-actions">
                                  <button className="confirm-btn yes" onClick={() => handleRestoreSession(session)}>Yes</button>
                                  <button className="confirm-btn no" onClick={() => setRestoreConfirmId(null)}>No</button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Grid View */}
            <div className="mobile-cards-grid">
              {filteredSessions.map((session) => {
                const isExtra = session.dayId.startsWith('extra-');
                const dateStr = getCalendarDateForDay(session.dayId);
                let formattedDate = 'N/A';
                try {
                  if (dateStr) {
                    const parts = dateStr.split('-');
                    const targetDate = parts.length === 3 
                      ? new Date(Date.UTC(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])))
                      : new Date(dateStr);
                    formattedDate = targetDate.toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      timeZone: 'UTC'
                    });
                  }
                } catch (e) {}

                return (
                  <div key={session._id} className={`adjustment-card ${session.isCancelled ? 'cancelled-card' : ''}`}>
                    <div className="card-header">
                      <span className={`type-tag ${isExtra ? 'extra' : 'cancelled'}`}>
                        {isExtra ? 'Extra Class' : 'Cancelled Class'}
                      </span>
                      <div className="status-cell-badge-container">
                        {session.isCancelled ? (
                          <div className="status-cell-badge cancelled">Cancelled</div>
                        ) : (
                          <div className="status-cell-badge active">Active</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="card-body">
                      <div className="card-row">
                        <span className="label">Identifier:</span>
                        <span className="value code-font" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                          <span>{session.dayId}</span>
                          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>({formattedDate})</span>
                        </span>
                      </div>
                      <div className="card-row">
                        <span className="label">Target Date:</span>
                        <span className="value session-date">{formattedDate}</span>
                      </div>
                      <div className="card-row">
                        <span className="label">Info:</span>
                        <span className="value detail">
                          {session.isCancelled 
                            ? `Reason: ${session.cancelReason || 'Cancelled session'}` 
                            : `Code: ${session.code || 'Active Extra Class'}`}
                        </span>
                      </div>
                    </div>

                    <div className="card-actions" style={{ position: 'relative' }}>
                      {isExtra && (
                        <button 
                          className="card-action-btn edit" 
                          onClick={() => {
                            setRestoreConfirmId(null);
                            handleOpenEdit(session);
                          }}
                        >
                          <Edit2 size={13} />
                          <span>Reschedule</span>
                        </button>
                      )}
                      <button 
                        className={`card-action-btn ${session.isCancelled ? 'restore' : 'delete'}`} 
                        onClick={() => {
                          if (session.isCancelled) {
                            setRestoreConfirmId(restoreConfirmId === session._id ? null : session._id);
                          } else {
                            handleOpenDelete(session);
                          }
                        }}
                      >
                        {session.isCancelled ? (
                          <>
                            <Undo2 size={13} />
                            <span>Restore Class</span>
                          </>
                        ) : (
                          <>
                            <Trash2 size={13} />
                            <span>Delete</span>
                          </>
                        )}
                      </button>

                      {session.isCancelled && restoreConfirmId === session._id && (
                        <div className="anchored-confirm-popover">
                          <span className="confirm-text">Restore class?</span>
                          <div className="confirm-actions">
                            <button className="confirm-btn yes" onClick={() => handleRestoreSession(session)}>Yes</button>
                            <button className="confirm-btn no" onClick={() => setRestoreConfirmId(null)}>No</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Reschedule Modal (Extra Classes Only) */}
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

        {/* Delete Confirmation / Restore Modal */}
        {isDeleteOpen && (
          <div className="admin-modal-overlay">
            <div className="admin-modal danger">
              <div className="modal-danger-header">
                <ShieldAlert size={28} color={sessionToDelete?.isCancelled ? "#10b981" : "#ef4444"} />
                <h2>{sessionToDelete?.isCancelled ? 'Restore Session?' : 'Delete Extra Class?'}</h2>
              </div>
              <p className="modal-description">
                {sessionToDelete?.isCancelled ? (
                  <>
                    You are about to restore the session <code className="code-font">{sessionToDelete?.dayId}</code>.
                    This will remove the cancellation override and enable students to view or mark attendance on this day.
                  </>
                ) : (
                  <>
                    You are about to delete the extra session <code className="code-font">{sessionToDelete?.dayId}</code>. 
                    This action is <strong>irreversible</strong> and will automatically delete all student attendance records marked for this extra day.
                  </>
                )}
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
                  className={`modal-btn ${sessionToDelete?.isCancelled ? 'primary' : 'danger'}`} 
                  onClick={handleConfirmDelete}
                  disabled={actionLoading}
                >
                  {actionLoading ? <Loader2 size={16} className="spin" /> : sessionToDelete?.isCancelled ? 'Confirm Restore' : 'Confirm Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .adjustments-admin-container {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Inter', -apple-system, sans-serif;
        }

        .adjustments-admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--app-border, #e2e8f0);
          padding-bottom: 20px;
          gap: 16px;
        }

        .adjustments-admin-header h1 {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--app-text, #1e293b);
          margin: 0 0 6px 0;
          letter-spacing: -0.5px;
        }

        .adjustments-admin-header .subtitle {
          font-size: 0.85rem;
          color: var(--app-text-muted, #64748b);
          margin: 0;
          line-height: 1.4;
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
          white-space: nowrap;
        }

        .refresh-btn:hover {
          background: rgba(0, 209, 209, 0.1);
        }

        /* Filter tabs navigation */
        .filter-tabs-container {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          background: #f1f5f9;
          padding: 4px;
          border-radius: 10px;
          width: fit-content;
          box-sizing: border-box;
        }

        .filter-tab-btn {
          background: transparent;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.825rem;
          font-weight: 700;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .filter-tab-btn:hover {
          color: #0f172a;
        }

        .filter-tab-btn.active {
          background: white;
          color: #0047ab;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
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

        .adjustments-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 40px;
          color: var(--app-text-muted, #64748b);
          gap: 16px;
        }

        .no-adjustments-card {
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

        .no-adjustments-card h3 {
          font-size: 1.25rem;
          color: var(--app-text, #1e293b);
          margin: 0 0 8px 0;
        }

        .no-adjustments-card p {
          max-width: 400px;
          margin: 0 auto;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .desktop-table-wrapper {
          background: var(--app-card-bg, #ffffff);
          border: 1px solid var(--app-border, #e2e8f0);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
          display: block;
        }

        .adjustments-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .adjustments-table th {
          background: rgba(0, 0, 0, 0.02);
          padding: 16px 20px;
          font-size: 0.775rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--app-text-muted, #64748b);
          border-bottom: 1px solid var(--app-border, #e2e8f0);
        }

        .adjustments-table td {
          padding: 16px 20px;
          font-size: 0.875rem;
          border-bottom: 1px solid var(--app-border, #e2e8f0);
          color: var(--app-text, #0f172a);
          vertical-align: middle;
        }

        .adjustments-table tr:last-child td {
          border-bottom: none;
        }

        .cancelled-row td {
          background: rgba(245, 158, 11, 0.01);
        }

        .type-tag {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .type-tag.extra {
          background: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #dbeafe;
        }

        .type-tag.cancelled {
          background: #fff7ed;
          color: #c2410c;
          border: 1px solid #ffedd5;
        }

        .session-id-badge {
          display: inline-block;
          background: rgba(0, 209, 209, 0.06);
          border: 1px solid rgba(0, 209, 209, 0.12);
          padding: 4px 10px;
          border-radius: 6px;
          color: #008f8f;
        }

        .code-font {
          font-family: monospace;
          font-weight: 700;
        }

        .session-date {
          font-weight: 600;
          color: #334155;
        }

        .detail-text {
          font-size: 0.825rem;
          font-weight: 500;
        }

        .detail-text.reason {
          color: #b45309;
        }

        .detail-text.code {
          color: #475569;
        }

        .status-cell-badge {
          display: inline-block;
          font-size: 0.725rem;
          font-weight: 750;
          padding: 3px 8px;
          border-radius: 5px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-cell-badge.active {
          background: rgba(16, 185, 129, 0.08);
          color: #15803d;
          border: 1px solid rgba(16, 185, 129, 0.15);
        }

        .status-cell-badge.cancelled {
          background: rgba(239, 68, 68, 0.08);
          color: #b91c1c;
          border: 1px solid rgba(239, 68, 68, 0.15);
        }

        .action-buttons-group {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }

        .row-action-btn {
          background: white;
          border: 1px solid var(--app-border, #cbd5e1);
          color: var(--app-text-muted, #64748b);
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .row-action-btn:hover {
          color: var(--app-text, #0f172a);
          background: rgba(0, 0, 0, 0.04);
        }

        .row-action-btn.edit:hover {
          background: rgba(0, 209, 209, 0.12);
          border-color: rgba(0, 209, 209, 0.25);
          color: #00D1D1;
        }

        .row-action-btn.delete:hover {
          background: rgba(239, 68, 68, 0.12);
          border-color: rgba(239, 68, 68, 0.25);
          color: #ef4444;
        }

        .row-action-btn.restore:hover {
          background: rgba(16, 185, 129, 0.12);
          border-color: rgba(16, 185, 129, 0.25);
          color: #10b981;
        }

        /* Mobile Grid Cards View (Hidden on Desktop) */
        .mobile-cards-grid {
          display: none;
          flex-direction: column;
          gap: 12px;
        }

        .adjustment-card {
          background: white;
          border: 1px solid #cbd5e1;
          border-radius: 14px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
        }

        .adjustment-card.cancelled-card {
          background: #fafaf9;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 8px;
        }

        .card-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .card-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          line-height: 1.4;
        }

        .card-row .label {
          color: #64748b;
          font-weight: 500;
        }

        .card-row .value {
          color: #0f172a;
          font-weight: 700;
          text-align: right;
        }

        .card-row .value.detail {
          max-width: 70%;
          word-break: break-all;
        }

        .card-actions {
          display: flex;
          gap: 8px;
          border-top: 1px solid #f1f5f9;
          padding-top: 10px;
        }

        .card-action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px;
          border-radius: 8px;
          font-size: 0.775rem;
          font-weight: 700;
          cursor: pointer;
          border: 1px solid #cbd5e1;
          background: white;
          color: #475569;
          transition: all 0.2s;
        }

        .card-action-btn.edit {
          color: #008f8f;
          background: rgba(0, 209, 209, 0.04);
          border-color: rgba(0, 209, 209, 0.2);
        }

        .card-action-btn.delete {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.04);
          border-color: rgba(239, 68, 68, 0.2);
        }

        .card-action-btn.restore {
          color: #10b981;
          background: rgba(16, 185, 129, 0.04);
          border-color: rgba(16, 185, 129, 0.2);
        }

        /* Modals styling */
        .admin-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.3);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 16px;
          box-sizing: border-box;
        }

        .admin-modal {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 24px;
          border-radius: 20px;
          max-width: 440px;
          width: 100%;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
          box-sizing: border-box;
        }

        .admin-modal h2 {
          font-size: 1.2rem;
          color: #0f172a;
          margin: 0 0 10px 0;
          font-weight: 800;
        }

        .modal-danger-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .modal-danger-header h2 {
          margin: 0;
        }

        .modal-description {
          font-size: 0.825rem;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 6px;
          color: #334155;
        }

        .date-input {
          width: 100%;
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid #cbd5e1;
          color: #0f172a;
          padding: 10px;
          border-radius: 8px;
          outline: none;
          font-size: 0.875rem;
          font-family: inherit;
          box-sizing: border-box;
        }

        .date-input:focus {
          border-color: #00d1d1;
        }

        .modal-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .modal-btn {
          padding: 10px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .modal-btn.secondary {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #475569;
        }

        .modal-btn.secondary:hover {
          background: #e2e8f0;
        }

        .modal-btn.primary {
          background: #0047ab;
          border: none;
          color: #ffffff;
        }

        .modal-btn.primary:hover {
          background: #003380;
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

        /* Anchored Confirmation Popover Styling */
        .anchored-confirm-popover {
          position: absolute;
          right: 42px;
          top: 50%;
          transform: translateY(-50%);
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 6px 12px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 100;
          white-space: nowrap;
        }

        .anchored-confirm-popover .confirm-text {
          font-size: 0.775rem;
          font-weight: 700;
          color: #334155;
        }

        .anchored-confirm-popover .confirm-actions {
          display: flex;
          gap: 6px;
        }

        .anchored-confirm-popover .confirm-btn {
          border: none;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 0.725rem;
          font-weight: 800;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .anchored-confirm-popover .confirm-btn.yes {
          background: #10b981;
          color: white;
        }

        .anchored-confirm-popover .confirm-btn.no {
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #cbd5e1;
        }

        .anchored-confirm-popover .confirm-btn:hover {
          opacity: 0.9;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .adjustments-admin-container {
            padding: 14px;
          }

          .adjustments-admin-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            margin-bottom: 18px;
            padding-bottom: 14px;
          }

          .adjustments-admin-header h1 {
            font-size: 1.35rem;
            text-align: center;
          }

          .adjustments-admin-header .subtitle {
            font-size: 0.775rem;
            text-align: center;
          }

          .refresh-btn {
            width: 100%;
            justify-content: center;
            font-size: 0.8rem;
            padding: 8px 12px;
          }

          .filter-tabs-container {
            display: flex;
            width: 100%;
            overflow-x: auto;
            gap: 4px;
            padding: 2px;
            border-radius: 8px;
            margin-bottom: 16px;
            -webkit-overflow-scrolling: touch;
          }

          .filter-tab-btn {
            flex: 1;
            padding: 6px 10px;
            font-size: 0.725rem;
            border-radius: 6px;
            text-align: center;
          }

          .desktop-table-wrapper {
            display: none; /* Hide table view on mobile */
          }

          .mobile-cards-grid {
            display: flex; /* Show card view on mobile */
          }

          .card-actions .anchored-confirm-popover {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            transform: none;
            width: 100%;
            box-sizing: border-box;
            justify-content: space-between;
            border-radius: 8px;
            padding: 4px 12px;
            box-shadow: none;
          }

          .admin-alert {
            padding: 10px 14px;
            font-size: 0.8rem;
            margin-bottom: 16px;
          }

          .alert-close {
            right: 12px;
          }
        }
      `}} />
    </MainLayout>
  );
};

export default ScheduleAdjustmentsAdmin;
