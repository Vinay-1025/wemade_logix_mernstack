import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MainLayout from '../components/MainLayout';
import { useCourse } from '../context/CourseContext';
import { courseData } from '../data/mockData';
import axios from 'axios';
import { Lock, Unlock, ShieldAlert, CheckCircle, AlertCircle, RefreshCw, Loader2, ArrowRight } from 'lucide-react';

const CourseLocksAdmin = () => {
  const { user } = useSelector((state) => state.auth);
  const { dayLocks, refreshDayLocks, dayLocksLoading } = useCourse();
  const [updatingDayId, setUpdatingDayId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleUpdateLockStatus = async (dayId, status) => {
    if (!user?.token) return;
    setUpdatingDayId(dayId);
    try {
      const response = await axios.put('/api/course/day-locks', 
        { dayId, status },
        { headers: { 'Authorization': `Bearer ${user.token}` } }
      );
      if (response.data?.success) {
        showToast(`Successfully updated day ${dayId} lock mode to: ${status}`, 'success');
        await refreshDayLocks();
      } else {
        showToast('Failed to update day lock status', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'Error updating day lock status', 'error');
    } finally {
      setUpdatingDayId(null);
    }
  };

  // Helper to determine what standard behavior is for a day
  const getDefaultBehavior = (dayId) => {
    const match = dayId.match(/^w(\d+)-d(\d+)$/);
    if (match) {
      const wNum = parseInt(match[1], 10);
      const dNum = parseInt(match[2], 10);
      if (wNum === 1 && dNum < 2) {
        return { text: 'Default: Unlocked (Day < 2)', isLocked: false };
      }
    }
    return { text: 'Default: Lock active (Requires previous day assignment submission)', isLocked: true };
  };

  return (
    <MainLayout>
      <div className="locks-admin-container">
        {toast.show && (
          <div className={`locks-toast ${toast.type}`}>
            {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span>{toast.message}</span>
          </div>
        )}

        <div className="locks-admin-header">
          <div className="header-title-box">
            <Lock className="header-icon" />
            <div>
              <h1>Course Day Locks Control</h1>
              <p className="subtitle">
                Manage manual lock overrides for students. Force lock or unlock individual days, overriding standard progression rules.
              </p>
            </div>
          </div>
          <button className="refresh-btn-premium" onClick={refreshDayLocks} disabled={dayLocksLoading}>
            <RefreshCw size={16} className={dayLocksLoading ? 'spin' : ''} />
            <span>Refresh State</span>
          </button>
        </div>

        {dayLocksLoading && dayLocks.length === 0 ? (
          <div className="loading-state">
            <Loader2 className="spin" size={40} />
            <p>Loading course locking states...</p>
          </div>
        ) : (
          <div className="weeks-grid">
            {courseData.map((week) => (
              <div key={week.weekId} className="week-card-premium">
                <div className="week-card-header">
                  <h3>{week.weekTitle}</h3>
                  <span className="badge-total-days">{week.days.length} Days</span>
                </div>
                
                <div className="days-table-container">
                  <table className="days-table">
                    <thead>
                      <tr>
                        <th>Day / Topic Area</th>
                        <th>Standard Progression Rule</th>
                        <th>Status Override</th>
                      </tr>
                    </thead>
                    <tbody>
                      {week.days.map((day) => {
                        const currentOverride = dayLocks?.find(dl => dl.dayId === day.dayId);
                        const activeStatus = currentOverride ? currentOverride.status : 'default';
                        const defaultRule = getDefaultBehavior(day.dayId);
                        const isUpdating = updatingDayId === day.dayId;

                        return (
                          <tr key={day.dayId} className={`day-row ${activeStatus !== 'default' ? 'has-override' : ''}`}>
                            <td className="day-info-col">
                              <span className="day-badge-id">{day.dayId}</span>
                              <div className="day-details">
                                <span className="day-title-text">{day.dayTitle}</span>
                                <span className="topics-count">{day.topics?.length || 0} topics</span>
                              </div>
                            </td>
                            <td className="rule-info-col">
                              <span className={`rule-pill ${defaultRule.isLocked ? 'rule-locked' : 'rule-unlocked'}`}>
                                {defaultRule.text}
                              </span>
                            </td>
                            <td className="actions-col">
                              <div className="status-button-group">
                                <button
                                  className={`status-btn btn-default ${activeStatus === 'default' ? 'active' : ''}`}
                                  onClick={() => handleUpdateLockStatus(day.dayId, 'default')}
                                  disabled={isUpdating}
                                >
                                  Default
                                </button>
                                <button
                                  className={`status-btn btn-locked ${activeStatus === 'locked' ? 'active' : ''}`}
                                  onClick={() => handleUpdateLockStatus(day.dayId, 'locked')}
                                  disabled={isUpdating}
                                >
                                  <Lock size={12} style={{ marginRight: '4px' }} />
                                  Force Lock
                                </button>
                                <button
                                  className={`status-btn btn-unlocked ${activeStatus === 'unlocked' ? 'active' : ''}`}
                                  onClick={() => handleUpdateLockStatus(day.dayId, 'unlocked')}
                                  disabled={isUpdating}
                                >
                                  <Unlock size={12} style={{ marginRight: '4px' }} />
                                  Force Unlock
                                </button>
                              </div>
                              {isUpdating && (
                                <div className="row-spinner">
                                  <Loader2 className="spin" size={14} />
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .locks-admin-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          min-height: 100vh;
        }

        .locks-toast {
          position: fixed;
          top: 24px;
          right: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          z-index: 1000;
          font-weight: 500;
          color: white;
          animation: slideInRight 0.3s ease-out;
        }

        .locks-toast.success {
          background-color: #10b981;
          border: 1px solid #059669;
        }

        .locks-toast.error {
          background-color: #ef4444;
          border: 1px solid #dc2626;
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .locks-admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color, #e2e8f0);
        }

        .header-title-box {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-icon {
          width: 36px;
          height: 36px;
          color: #f43f5e;
          background: rgba(244, 63, 94, 0.1);
          padding: 8px;
          border-radius: 8px;
        }

        .locks-admin-header h1 {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0;
          color: var(--app-text);
        }

        .locks-admin-header .subtitle {
          color: var(--text-neutral, #64748b);
          margin: 4px 0 0 0;
          font-size: 0.95rem;
        }

        .refresh-btn-premium {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 8px;
          border: 1px solid var(--border-color, #e2e8f0);
          background: var(--card-bg, #ffffff);
          color: var(--app-text);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .refresh-btn-premium:hover:not(:disabled) {
          background: var(--bg-hover, #f8fafc);
          border-color: #cbd5e1;
        }

        .refresh-btn-premium:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 0;
          color: var(--text-neutral, #64748b);
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .weeks-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .week-card-premium {
          background: var(--card-bg, #ffffff);
          border-radius: 12px;
          border: 1px solid var(--border-color, #e2e8f0);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          overflow: hidden;
        }

        .week-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          background: var(--header-bg, #f8fafc);
          border-bottom: 1px solid var(--border-color, #e2e8f0);
        }

        .week-card-header h3 {
          margin: 0;
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--app-text);
        }

        .badge-total-days {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .days-table-container {
          overflow-x: auto;
        }

        .days-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .days-table th {
          padding: 1rem 1.5rem;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-neutral, #64748b);
          border-bottom: 1px solid var(--border-color, #e2e8f0);
          background: var(--card-bg, #ffffff);
        }

        .days-table td {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-color, #f1f5f9);
          vertical-align: middle;
        }

        .day-row {
          transition: background-color 0.2s ease;
        }

        .day-row:hover {
          background-color: var(--bg-hover, #f8fafc);
        }

        .day-row.has-override {
          background-color: rgba(244, 63, 94, 0.015);
        }

        .day-info-col {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .day-badge-id {
          background: var(--bg-hover, #f1f5f9);
          color: var(--app-text);
          font-family: monospace;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid var(--border-color, #e2e8f0);
        }

        .day-details {
          display: flex;
          flex-direction: column;
        }

        .day-title-text {
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--app-text);
        }

        .topics-count {
          font-size: 0.75rem;
          color: var(--text-neutral, #94a3b8);
          margin-top: 2px;
        }

        .rule-info-col {
          font-size: 0.85rem;
        }

        .rule-pill {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
          display: inline-block;
        }

        .rule-pill.rule-unlocked {
          background: rgba(16, 185, 129, 0.08);
          color: #10b981;
        }

        .rule-pill.rule-locked {
          background: rgba(59, 130, 246, 0.08);
          color: #3b82f6;
        }

        .actions-col {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .status-button-group {
          display: flex;
          background: var(--bg-hover, #f1f5f9);
          padding: 4px;
          border-radius: 8px;
          border: 1px solid var(--border-color, #e2e8f0);
        }

        .status-btn {
          padding: 6px 12px;
          border-radius: 6px;
          border: none;
          background: transparent;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-neutral, #64748b);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
        }

        .status-btn:hover:not(.active) {
          color: var(--app-text);
        }

        .status-btn.active {
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .status-btn.btn-default.active {
          background: var(--card-bg, #ffffff);
          color: #3b82f6;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .status-btn.btn-locked.active {
          background: #ef4444;
          color: white;
        }

        .status-btn.btn-unlocked.active {
          background: #10b981;
          color: white;
        }

        .row-spinner {
          display: flex;
          align-items: center;
          color: var(--text-neutral, #94a3b8);
        }
      `}} />
    </MainLayout>
  );
};

export default CourseLocksAdmin;
