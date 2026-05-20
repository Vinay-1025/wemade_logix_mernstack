import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MainLayout from '../components/MainLayout';
import axios from 'axios';
import { Play, Square, QrCode, Search, RefreshCw, CheckCircle, Clock, Calendar, Download, ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';
import { courseData } from '../data/mockData';
import { QRCodeSVG } from 'qrcode.react';

const AttendanceAdmin = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [activeSession, setActiveSession] = useState(null);
  const [records, setRecords] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recordsLoading, setRecordsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Flatten days from courseData for selecting and filtering
  const allDays = courseData.flatMap(week =>
    week.days.map(day => ({
      dayId: day.dayId,
      dayTitle: day.dayTitle,
      weekTitle: week.weekTitle
    }))
  );

  const getDayLabel = (dayId) => {
    const day = allDays.find(d => d.dayId === dayId);
    return day ? day.dayTitle : (dayId ? `Day ID: ${dayId}` : 'General / Unassigned');
  };

  // Filter States
  const [selectedDayId, setSelectedDayId] = useState('');
  const [filterDayId, setFilterDayId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

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

  // Reset pagination when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterDayId, startDate, endDate, recordsPerPage]);

  const handleStartSession = async () => {
    if (!currentUser?.token) return;
    try {
      const response = await axios.post('/api/attendance/session', { dayId: selectedDayId }, {
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

  const handleCopyCode = () => {
    if (!activeSession?.code) return;
    navigator.clipboard.writeText(activeSession.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportCSV = () => {
    if (records.length === 0) return;

    const headers = ['Student Name', 'Student Email', 'Session Code', 'Class Day', 'Marked At'];
    const rows = records.map(r => [
      r.student?.name || 'N/A',
      r.student?.email || 'N/A',
      r.session?.code || 'N/A',
      getDayLabel(r.session?.dayId),
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

  // Filter records based on query, day, and date range
  const filteredRecords = records.filter(r => {
    const studentName = r.student?.name || '';
    const studentEmail = r.student?.email || '';
    const sessionCode = r.session?.code || '';
    const query = searchQuery.toLowerCase();
    const matchesSearch = studentName.toLowerCase().includes(query) ||
      studentEmail.toLowerCase().includes(query) ||
      sessionCode.toLowerCase().includes(query);

    const sessionDayId = r.session?.dayId || '';
    const matchesDay = !filterDayId || sessionDayId === filterDayId;

    const markedDate = new Date(r.markedAt);

    let matchesStartDate = true;
    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      matchesStartDate = markedDate >= start;
    }

    let matchesEndDate = true;
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      matchesEndDate = markedDate <= end;
    }

    return matchesSearch && matchesDay && matchesStartDate && matchesEndDate;
  });

  // Pagination calculations
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <MainLayout>
      <div className="attendance-admin-container">
        {/* Header Block */}
        <div className="admin-header-card">
          <div className="header-text-block">
            <h1 className="admin-page-title">Attendance Control Center</h1>
            <p className="admin-page-subtitle">Dynamically control class registration, generate secure QR keys, and audit student check-ins.</p>
          </div>
          <div className="header-actions-block">

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
              <div className="card-icon-box green">
                <QrCode size={20} />
              </div>
              <h3>Live Attendance Generator</h3>
            </div>

            {loading ? (
              <div className="loading-state-card">Checking active sessions...</div>
            ) : activeSession ? (
              <div className="session-active-view">
                <div className="active-session-split">
                  <div className="active-session-left">
                    <div className="qr-code-wrapper">
                      <div className="qr-image-container">
                        <QRCodeSVG
                          value={activeSession.code}
                          size={200}
                          bgColor={"#ffffff"}
                          fgColor={"#0047ab"}
                          level={"H"}
                          className="qr-image"
                        />
                      </div>
                      <div className="qr-code-overlay">
                        <span className="code-text">{activeSession.code}</span>
                        <button
                          className="copy-code-btn"
                          onClick={handleCopyCode}
                          title={copied ? "Copied!" : "Copy Code"}
                        >
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="active-session-right">
                    <div className="pulse-indicator">
                      <span className="pulse-dot"></span>
                      <span className="pulse-text">SESSION ACTIVE</span>
                    </div>

                    <div className="session-details-list">
                      <div className="detail-item">
                        <span className="detail-label">Started At</span>
                        <span className="detail-value">{new Date(activeSession.createdAt).toLocaleTimeString()}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Class Day</span>
                        <span className="detail-value">{getDayLabel(activeSession.dayId)}</span>
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
                </div>
              </div>
            ) : (
              <div className="session-inactive-view">
                <div className="inactive-badge">
                  <span className="inactive-dot"></span>
                  <span className="inactive-text">NO ACTIVE SESSION</span>
                </div>

                <div className="select-day-wrapper">
                  <label className="select-day-label">Select Class Day</label>
                  <select
                    value={selectedDayId}
                    onChange={e => setSelectedDayId(e.target.value)}
                    className="select-day-input"
                  >
                    <option value="">-- General / Unassigned --</option>
                    {allDays.map(day => (
                      <option key={day.dayId} value={day.dayId}>
                        {day.dayTitle}
                      </option>
                    ))}
                  </select>
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
              <div className="card-icon-box cyan">
                <CheckCircle size={20} />
              </div>
              <h3>Personnel Audit Logs</h3>
              <div className="records-count">{filteredRecords.length} records</div>
            </div>

            <div className="filters-container">
              <div className="search-and-refresh-row" style={{ display: 'flex', gap: '12px', alignItems: 'center', width: '100%' }}>
                <div className="search-bar-wrapper" style={{ flex: 1 }}>
                  <Search size={16} className="search-icon-card" />
                  <input
                    type="text"
                    placeholder="Search by student name, email, or session token..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="search-input-card"
                    style={{ height: '48px' }}
                  />
                </div>
                <button 
                  className="icon-btn-action" 
                  onClick={initializeData} 
                  title="Refresh Dashboard"
                  style={{ flexShrink: 0, height: '48px', width: '48px' }}
                >
                  <RefreshCw size={16} className={recordsLoading ? 'spin' : ''} />
                </button>
              </div>

              <div className="filter-selectors-grid">
                <div className="filter-select-wrapper">
                  <label className="filter-label">Class Day</label>
                  <select
                    value={filterDayId}
                    onChange={e => setFilterDayId(e.target.value)}
                    className="filter-select-input"
                  >
                    <option value="">All Days</option>
                    {allDays.map(day => (
                      <option key={day.dayId} value={day.dayId}>
                        {day.dayTitle}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-select-wrapper">
                  <label className="filter-label">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="filter-date-input"
                  />
                </div>

                <div className="filter-select-wrapper">
                  <label className="filter-label">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="filter-date-input"
                  />
                </div>

                <div className="filter-select-wrapper">
                  <label className="filter-label">Rows per Page</label>
                  <select
                    value={recordsPerPage}
                    onChange={e => setRecordsPerPage(Number(e.target.value))}
                    className="filter-select-input"
                  >
                    <option value={5}>5 Rows</option>
                    <option value={10}>10 Rows</option>
                    <option value={20}>20 Rows</option>
                    <option value={50}>50 Rows</option>
                  </select>
                </div>
              </div>
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
                      <th>Class Day</th>
                      <th>Token ID</th>
                      <th>Time Verified</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.map((record) => (
                      <tr key={record._id} className="table-row-hover">
                        <td>
                          <div className="user-info-cell">
                            <span className="user-cell-name">{record.student?.name || 'Deleted Account'}</span>
                            <span className="user-cell-email">{record.student?.email || 'N/A'}</span>
                          </div>
                        </td>
                        <td>
                          <span className="day-badge-table">{getDayLabel(record.session?.dayId)}</span>
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

            {filteredRecords.length > 0 && (
              <div className="audit-pagination">
                <div className="pagination-info">
                  Showing <span className="bold">{indexOfFirstRecord + 1}</span> to <span className="bold">{Math.min(indexOfLastRecord, filteredRecords.length)}</span> of <span className="bold">{filteredRecords.length}</span> records
                </div>

                {totalPages > 1 && (
                  <div className="page-navigation">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => paginate(currentPage - 1)}
                      className="page-btn"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <div className="page-numbers">
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => paginate(index + 1)}
                          className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => paginate(currentPage + 1)}
                      className="page-btn"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .attendance-admin-container {
          max-width: 100%;
          margin: 0 auto;
          padding: 40px 30px;
          animation: fadeIn 0.5s ease;
          min-height: calc(100vh - 64px);
          box-sizing: border-box;
        }
        .admin-header-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #ffffff;
          border: 1px solid var(--app-border);
          border-radius: 24px;
          padding: 32px;
          margin-bottom: 32px;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.04);
          box-sizing: border-box;
          width: 100%;
        }
        .admin-page-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 8px 0;
          letter-spacing: -0.5px;
        }
        .admin-page-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin: 0;
          line-height: 1.5;
        }
        .header-actions-block {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        .icon-btn-action {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid var(--app-border);
          background: #f8fafc;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .icon-btn-action:hover {
          background: #f1f5f9;
          color: var(--primary-cyan);
          border-color: var(--primary-cyan);
          transform: translateY(-1px);
        }
        .action-btn-secondary {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 12px;
          border: 1px solid var(--app-border);
          background: #f8fafc;
          color: var(--text-primary);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .action-btn-secondary:hover:not(:disabled) {
          background: #f1f5f9;
          border-color: var(--primary-cyan);
          color: var(--primary-cyan);
          transform: translateY(-1px);
        }
        .action-btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .status-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          border-radius: 16px;
          margin-bottom: 32px;
          font-size: 0.95rem;
          font-weight: 650;
        }
        .status-banner.success {
          background: rgba(16, 185, 129, 0.08);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.15);
        }
        .status-banner.error {
          background: rgba(239, 68, 68, 0.08);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.15);
        }
        .close-banner {
          background: transparent;
          border: none;
          color: inherit;
          font-size: 1.5rem;
          cursor: pointer;
          line-height: 1;
        }
        .attendance-grid {
          display: grid;
          grid-template-columns: 560px 1fr;
          gap: 32px;
          align-items: start;
          width: 100%;
        }
        .control-card, .audit-card {
          background: #ffffff;
          border: 1px solid var(--app-border);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.04);
          min-width: 0;
          overflow: hidden;
          width: 100%;
          box-sizing: border-box;
        }
        .card-header-premium {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 28px;
          position: relative;
        }
        .card-header-premium h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.3px;
        }
        .card-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .card-icon-box.green {
          background: rgba(16, 185, 129, 0.08);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.15);
        }
        .card-icon-box.cyan {
          background: rgba(0, 209, 209, 0.08);
          color: var(--primary-cyan);
          border: 1px solid rgba(0, 209, 209, 0.2);
        }
        .records-count {
          position: absolute;
          right: 0;
          background: rgba(0, 209, 209, 0.08);
          color: var(--primary-cyan);
          padding: 6px 12px;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 750;
        }
        .session-active-view {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          width: 100%;
        }
        .active-session-split {
          display: flex;
          gap: 28px;
          align-items: center;
          width: 100%;
        }
        .active-session-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 0;
        }
        .active-session-right {
          flex: 1.2;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: center;
          min-width: 0;
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
          width: fit-content;
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
          background: #ffffff;
          padding: 24px;
          border-radius: 24px;
          border: 1px solid var(--app-border);
          box-shadow: var(--shadow-sm);
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          width: 100%;
          box-sizing: border-box;
        }
        .qr-image-container {
          position: relative;
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .qr-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 12px;
        }
        .qr-code-overlay {
          margin-top: 16px;
          background: rgba(0, 209, 209, 0.08);
          border: 1px solid rgba(0, 209, 209, 0.2);
          padding: 6px 16px;
          border-radius: 10px;
          width: 100%;
          text-align: center;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .copy-code-btn {
          background: transparent;
          border: none;
          color: var(--primary-cyan);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        .copy-code-btn:hover {
          background: rgba(0, 209, 209, 0.15);
          color: var(--primary-cyan);
        }
        .code-text {
          font-family: monospace;
          color: var(--primary-cyan);
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 1px;
        }
        .session-details-list {
          width: 100%;
          border: 1px solid var(--app-border);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 24px;
        }
        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
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
          padding: 16px;
          border-radius: 12px;
          border: none;
          background: #ef4444;
          color: #fff;
          font-weight: 750;
          font-size: 0.9rem;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
          transition: all 0.2s ease;
        }
        .btn-stop-session:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
        }
        .session-inactive-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 10px 0;
          width: 100%;
        }
        .inactive-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(148, 163, 184, 0.08);
          border: 1px solid rgba(148, 163, 184, 0.2);
          padding: 6px 14px;
          border-radius: 20px;
          margin-bottom: 24px;
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
        .select-day-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-align: left;
          margin-bottom: 24px;
        }
        .select-day-label {
          font-size: 0.8rem;
          font-weight: 750;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .select-day-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid var(--app-border);
          border-radius: 12px;
          background: #f8fafc;
          color: var(--text-primary);
          font-size: 0.9rem;
          font-weight: 650;
          outline: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .select-day-input:focus {
          border-color: var(--primary-cyan);
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(0, 209, 209, 0.08);
        }
        .inactive-description {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 28px;
        }
        .btn-start-session {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          border: none;
          background: var(--brand-gradient);
          color: #fff;
          font-weight: 750;
          font-size: 0.9rem;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 209, 209, 0.2);
          transition: all 0.2s ease;
        }
        .btn-start-session:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 209, 209, 0.3);
        }
        .filters-container {
          margin-bottom: 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }
        .search-bar-wrapper {
          position: relative;
          width: 100%;
        }
        .search-icon-card {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }
        .search-input-card {
          width: 100%;
          padding: 14px 16px 14px 46px;
          border: 1px solid var(--app-border);
          border-radius: 12px;
          background: #f8fafc;
          color: var(--text-primary);
          font-size: 0.9rem;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        .search-input-card:focus {
          outline: none;
          border-color: var(--primary-cyan);
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(0, 209, 209, 0.08);
        }
        .filter-selectors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 16px;
          width: 100%;
        }
        .filter-select-wrapper {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .filter-label {
          font-size: 0.72rem;
          font-weight: 750;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .filter-select-input, .filter-date-input {
          width: 100%;
          padding: 11px 14px;
          border: 1px solid var(--app-border);
          border-radius: 10px;
          background: #f8fafc;
          color: var(--text-primary);
          font-size: 0.85rem;
          font-weight: 600;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        .filter-select-input:focus, .filter-date-input:focus {
          border-color: var(--primary-cyan);
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(0, 209, 209, 0.08);
        }
        .table-responsive-container {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          border: 1px solid var(--app-border);
          border-radius: 16px;
          width: 100%;
        }
        .premium-admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          min-width: 750px;
        }
        .premium-admin-table th {
          padding: 16px 20px;
          font-size: 0.72rem;
          font-weight: 750;
          color: var(--text-secondary);
          text-transform: uppercase;
          border-bottom: 2px solid var(--app-border);
          background: #f8fafc;
          letter-spacing: 0.5px;
        }
        .premium-admin-table td {
          padding: 18px 20px;
          border-bottom: 1px solid var(--app-border);
          font-size: 0.875rem;
          color: var(--text-primary);
          white-space: nowrap;
          vertical-align: middle;
        }
        .table-row-hover:hover {
          background: rgba(0, 209, 209, 0.015);
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
        .day-badge-table {
          background: rgba(0, 209, 209, 0.06);
          color: var(--primary-cyan);
          border: 1px solid rgba(0, 209, 209, 0.15);
          padding: 6px 12px;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 700;
          display: inline-block;
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 850;
          display: inline-block;
        }
        .loading-state-card {
          padding: 50px;
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .empty-records-card {
          padding: 50px;
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Pagination Styles */
        .audit-pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0 0;
          border-top: 1px solid var(--app-border);
          margin-top: 24px;
        }
        .pagination-info {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .pagination-info .bold {
          font-weight: 700;
          color: var(--text-primary);
        }
        .page-navigation {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .page-numbers {
          display: flex;
          gap: 4px;
        }
        .page-btn {
          min-width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          border: 1px solid var(--app-border);
          background: #ffffff;
          color: var(--text-secondary);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .page-btn:hover:not(:disabled) {
          border-color: var(--primary-cyan);
          color: var(--primary-cyan);
          background: rgba(0, 209, 209, 0.05);
          transform: translateY(-1px);
        }
        .page-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .page-btn.active {
          background: var(--primary-cyan);
          color: white;
          border-color: var(--primary-cyan);
          box-shadow: 0 4px 12px rgba(0, 209, 209, 0.25);
        }

        /* Responsive Media Queries */
        @media (max-width: 1350px) {
          .attendance-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
        @media (max-width: 600px) {
          .active-session-split {
            flex-direction: column;
            gap: 20px;
          }
          .active-session-left, .active-session-right {
            width: 100%;
          }
          .pulse-indicator {
            align-self: center;
          }
        }
        @media (max-width: 768px) {
          .attendance-admin-container {
            padding: 20px 16px 80px 16px;
          }
          .admin-header-card {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
            padding: 24px;
            gap: 20px;
            margin-bottom: 24px;
          }
          .header-text-block {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .admin-page-title {
            font-size: 1.6rem;
          }
          .header-actions-block {
            justify-content: center;
            width: 100%;
          }
          .action-btn-secondary {
            flex: 1;
            justify-content: center;
          }
          .control-card, .audit-card {
            padding: 24px 20px;
          }
          .filter-selectors-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .audit-pagination {
            flex-direction: column;
            gap: 16px;
            align-items: center;
            text-align: center;
            padding: 16px 0 0;
          }
          .page-navigation {
            width: 100%;
            justify-content: center;
          }
        }
      `}} />
    </MainLayout>
  );
};

export default AttendanceAdmin;
