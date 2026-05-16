import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { History, Search, ArrowLeft, ShieldAlert, User, Activity, Clock, RotateCcw, Eye, CheckCircle, AlertCircle, Calendar, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage, setLogsPerPage] = useState(10);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });
  
  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const showSnackbar = (message, type = 'success') => {
    setSnackbar({ open: true, message, type });
    setTimeout(() => setSnackbar({ ...snackbar, open: false }), 4000);
  };

  const handleRevoke = async (log) => {
    if (log.action !== 'Status Change' || !log.targetId) {
      showSnackbar('This action cannot be revoked automatically', 'error');
      return;
    }

    try {
      // Extract the old status from the details string: "Status toggled from [Active] to [Inactive]..."
      const oldStatusLabel = log.details.match(/from \[(Active|Inactive)\]/)?.[1];
      if (!oldStatusLabel) {
        showSnackbar('Could not determine original status', 'error');
        return;
      }

      const originalStatus = oldStatusLabel === 'Active';
      const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
      
      await axios.put(`/api/auth/users/${log.targetId}/status`, { isActive: originalStatus }, config);
      
      showSnackbar(`Revoke successful: Personnel ${originalStatus ? 'Activated' : 'Deactivated'}`, 'success');
      
      // Optionally refresh logs to show the new "Revoke" event
      const { data } = await axios.get('/api/audit', config);
      setLogs(data);
    } catch (err) {
      showSnackbar(err.response?.data?.message || 'Revoke failed', 'error');
    }
  };

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        };
        const { data } = await axios.get('/api/audit', config);
        setLogs(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch audit logs');
        setLoading(false);
      }
    };

    fetchLogs();
  }, [currentUser]);

  const filteredLogs = logs.filter(log => {
    // Search Filter
    const matchesSearch = 
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());

    // Date Range Filter
    let matchesDate = true;
    const logDate = new Date(log.timestamp).getTime();
    
    if (startDate) {
      const start = new Date(startDate).setHours(0, 0, 0, 0);
      if (logDate < start) matchesDate = false;
    }
    
    if (endDate) {
      const end = new Date(endDate).setHours(23, 59, 59, 999);
      if (logDate > end) matchesDate = false;
    }

    return matchesSearch && matchesDate;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, startDate, endDate, logsPerPage]);

  if (loading) return <MainLayout><div className="loading-state">Accessing Audit Protocol...</div></MainLayout>;

  return (
    <MainLayout>
      <div className="audit-page">
        <div className="audit-header">
          <div className="header-title">
            <div className="icon-box purple">
              <History size={24} />
            </div>
            <div>
              <h1>Audit Protocol</h1>
              <p>System-wide activity monitoring and security logs</p>
            </div>
          </div>
          
          <div className="search-bar">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by personnel, action or mission ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Advanced Filters Bar */}
        <div className="audit-filter-bar">
          <div className="filter-group">
            <div className="input-with-icon">
              <Calendar size={16} />
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                placeholder="Start Date"
                title="Start Date"
              />
            </div>
            <span className="filter-separator">to</span>
            <div className="input-with-icon">
              <Calendar size={16} />
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                placeholder="End Date"
                title="End Date"
              />
            </div>
          </div>

          <div className="filter-group right">
            <div className="density-select">
              <Filter size={16} />
              <select value={logsPerPage} onChange={(e) => setLogsPerPage(Number(e.target.value))}>
                <option value={10}>10 Rows</option>
                <option value={20}>20 Rows</option>
                <option value={50}>50 Rows</option>
              </select>
            </div>
            {(startDate || endDate || searchTerm) && (
              <button className="reset-btn" onClick={resetFilters}>
                <RotateCcw size={14} />
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="audit-table-container card-3d">
          <table className="audit-table">
            <thead>
              <tr>
                <th><Clock size={14} /> Timestamp</th>
                <th><User size={14} /> Personnel</th>
                <th><Activity size={14} /> Action</th>
                <th>Details</th>
                <th>Status</th>
                {currentUser.role === 'superadmin' && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((log) => (
                <tr key={log._id}>
                  <td className="timestamp">
                    {new Date(log.timestamp).toLocaleDateString()}
                    <br />
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="personnel">
                    <div className="user-pill">
                      <User size={14} />
                      {log.userName}
                    </div>
                  </td>
                  <td className="action">
                    <span className="action-tag">{log.action}</span>
                  </td>
                  <td className="details">
                    <div className="details-cell">
                      <span className="details-text">
                        {log.details.split('->').map((part, i, arr) => (
                          <span key={i}>
                            {part}
                            {i < arr.length - 1 && <span className="change-arrow"> &rarr; </span>}
                          </span>
                        ))}
                      </span>
                      {log.targetId && (
                        <span className="target-id">
                          REF: {log.targetId.slice(-8).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="status">
                    <div className="status-cell">
                      <div className="status-dot"></div>
                      Verified
                    </div>
                  </td>
                  {currentUser.role === 'superadmin' && (
                    <td className="actions-cell">
                      <div className="audit-actions">
                        <button className="audit-btn revoke" title="Revoke Action" onClick={() => handleRevoke(log)}>
                          <RotateCcw size={16} />
                        </button>
                        <button className="audit-btn view" title="View Details">
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {filteredLogs.length === 0 && (
            <div className="empty-logs">
              <ShieldAlert size={48} />
              <p>No activity records found matching your filter.</p>
            </div>
          )}

          {filteredLogs.length > 0 && (
            <div className="audit-pagination">
              <div className="pagination-info">
                Showing <span className="bold">{indexOfFirstLog + 1}</span> to <span className="bold">{Math.min(indexOfLastLog, filteredLogs.length)}</span> of <span className="bold">{filteredLogs.length}</span> records
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

        {/* Snackbar Notification */}
        {snackbar.open && (
          <div className={`snackbar-notification ${snackbar.type} card-3d`}>
            {snackbar.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span>{snackbar.message}</span>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .audit-page { padding: 40px; animation: fadeIn 0.5s ease; max-width: 1400px; margin: 0 auto; }
        
        .audit-page .audit-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; gap: 24px; }
        .audit-page .header-title { display: flex; align-items: center; gap: 20px; }
        .audit-page .header-title h1 { font-size: 2.2rem; font-weight: 800; margin: 0; color: #1e293b; letter-spacing: -1px; }
        .audit-page .header-title p { margin: 4px 0 0; color: #64748b; font-size: 1rem; }
        
        .audit-page .icon-box.purple { width: 56px; height: 56px; background: rgba(168, 85, 247, 0.1); color: #a855f7; border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        
        .audit-page .audit-filter-bar { display: flex; justify-content: space-between; align-items: center; background: white; padding: 16px 24px; border-radius: 20px; border: 1px solid #e2e8f0; margin-bottom: 24px; gap: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .audit-page .filter-group { display: flex; align-items: center; gap: 12px; }
        .audit-page .filter-group.right { gap: 16px; }
        .audit-page .input-with-icon { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 16px; border-radius: 12px; transition: all 0.2s; }
        .audit-page .input-with-icon:focus-within { border-color: #a855f7; background: white; box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1); }
        .audit-page .input-with-icon input { border: none; background: transparent; outline: none; font-size: 0.9rem; color: #1e293b; cursor: pointer; }
        .audit-page .input-with-icon svg { color: #94a3b8; }
        .audit-page .filter-separator { color: #94a3b8; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; }
        
        .audit-page .density-select { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 16px; border-radius: 12px; }
        .audit-page .density-select select { border: none; background: transparent; outline: none; font-size: 0.9rem; color: #1e293b; font-weight: 600; cursor: pointer; }
        .audit-page .density-select svg { color: #94a3b8; }
        
        .audit-page .reset-btn { display: flex; align-items: center; gap: 8px; background: #f1f5f9; border: 1px solid #e2e8f0; padding: 8px 16px; border-radius: 12px; color: #64748b; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; }
        .audit-page .reset-btn:hover { background: #e2e8f0; color: #1e293b; }
        
        .audit-page .search-bar { 
          display: flex; 
          align-items: center; 
          gap: 12px; 
          background: white; 
          padding: 12px 20px; 
          border-radius: 14px; 
          border: 1px solid #e2e8f0; 
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          width: 100%;
          max-width: 400px;
          transition: all 0.2s;
        }
        .audit-page .search-bar:focus-within { border-color: #a855f7; box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1); }
        .audit-page .search-bar input { border: none; outline: none; background: transparent; width: 100%; color: #1e293b; font-size: 0.95rem; }
        .audit-page .search-bar svg { color: #94a3b8; }
        
        .audit-page .audit-table-container { background: white; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); padding: 12px; }
        .audit-page .audit-table { width: 100%; border-collapse: collapse; text-align: left; }
        .audit-page .audit-table thead { background: #f8fafc; }
        .audit-page .audit-table th { padding: 18px 16px; color: #64748b; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 800; border-bottom: 1px solid #e2e8f0; }
        .audit-page .audit-table td { padding: 20px 16px; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.95rem; }
        .audit-page .audit-table tr:last-child td { border-bottom: none; }
        .audit-page .audit-table tr:hover { background: #f8fafc; }
        
        .audit-page .timestamp { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem !important; color: #64748b !important; }
        
        .audit-page .user-pill { 
          background: #f1f5f9; 
          color: #475569; 
          padding: 6px 12px; 
          border-radius: 10px; 
          font-weight: 700; 
          font-size: 0.8rem; 
          display: inline-flex; 
          align-items: center; 
          gap: 6px; 
          border: 1px solid #e2e8f0;
        }
        
        .audit-page .action-tag { 
          display: inline-block;
          padding: 4px 10px;
          border-radius: 8px;
          background: rgba(168, 85, 247, 0.08);
          color: #a855f7;
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .details-cell { display: flex; flex-direction: column; gap: 4px; }
        .details-text { line-height: 1.5; color: #334155; }
        .change-arrow { color: #a855f7; font-weight: 800; font-size: 1.1rem; padding: 0 4px; }
        .target-id { font-family: monospace; font-size: 0.75rem; color: #94a3b8; background: #f8fafc; padding: 2px 6px; border-radius: 4px; width: fit-content; border: 1px solid #e2e8f0; }
        
        .status-cell { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.85rem; color: #16a34a; }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; background: #16a34a; box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.1); }
        
        .audit-actions { display: flex; gap: 8px; }
        .audit-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; color: #64748b; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
        .audit-btn:hover { background: #f8fafc; color: #1e293b; border-color: #cbd5e1; }
        .audit-page .audit-btn.revoke:hover { color: #a855f7; border-color: #a855f7; background: rgba(168, 85, 247, 0.05); }

        /* Pagination Style */
        .audit-page .audit-pagination { display: flex; justify-content: space-between; align-items: center; padding: 24px; border-top: 1px solid #f1f5f9; margin-top: 12px; }
        .audit-page .pagination-info { color: #64748b; font-size: 0.9rem; font-weight: 500; }
        .audit-page .pagination-info .bold { color: #1e293b; font-weight: 700; }
        
        .audit-page .page-navigation { display: flex; align-items: center; gap: 12px; }
        .audit-page .page-numbers { display: flex; gap: 8px; }
        .audit-page .page-btn { min-width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; border-radius: 12px; border: 1px solid #e2e8f0; background: white; color: #64748b; font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; }
        .audit-page .page-btn:hover:not(:disabled) { border-color: #a855f7; color: #a855f7; background: rgba(168, 85, 247, 0.05); transform: translateY(-2px); }
        .audit-page .page-btn.active { background: #a855f7; color: white; border-color: #a855f7; box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3); }
        .audit-page .page-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        /* Premium Snackbar */
        .snackbar-notification { position: fixed; bottom: 32px; right: 32px; display: flex; align-items: center; gap: 12px; padding: 14px 24px; border-radius: 20px; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(12px); color: #1e293b; border: 1px solid rgba(0,0,0,0.05); z-index: 9999; box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15); animation: snackbarSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); font-weight: 600; font-size: 0.95rem; }
        .snackbar-notification.success { border-left: 4px solid #16a34a; }
        .snackbar-notification.success svg { color: #16a34a; }
        .snackbar-notification.error { border-left: 4px solid #ef4444; }
        .snackbar-notification.error svg { color: #ef4444; }

        @keyframes snackbarSlideIn { from { opacity: 0; transform: translateX(40px) scale(0.9); } to { opacity: 1; transform: translateX(0) scale(1); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        @media (max-width: 1024px) {
          .audit-page { padding: 20px; }
          .audit-page .audit-header { flex-direction: column; align-items: flex-start; gap: 20px; }
          .audit-page .search-bar { max-width: none; }
          .audit-table-container { display: block; width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; position: relative; }
          .audit-table { min-width: 1000px; }
        }

        @media (max-width: 768px) {
          .audit-page .audit-filter-bar { flex-direction: column; align-items: stretch; gap: 16px; padding: 16px; }
          .audit-page .filter-group { flex-direction: column; align-items: stretch; }
          .audit-page .filter-group.right { flex-direction: row; justify-content: space-between; }
          .audit-page .input-with-icon { width: 100%; }
          .audit-page .filter-separator { text-align: center; display: block; margin: -8px 0; }
          .audit-page .audit-pagination { flex-direction: column; gap: 20px; text-align: center; }
          .audit-page .page-navigation { width: 100%; justify-content: center; }
          .audit-page .header-title h1 { font-size: 1.75rem; }
        }

        @media (max-width: 480px) {
          .audit-page { padding: 16px; }
          .audit-page .header-title { gap: 12px; }
          .audit-page .icon-box.purple { width: 44px; height: 44px; }
          .audit-page .header-title h1 { font-size: 1.5rem; }
          .audit-page .header-title p { font-size: 0.85rem; }
          .audit-page .filter-group.right { flex-direction: column; }
          .audit-page .density-select, .audit-page .reset-btn { width: 100%; justify-content: center; }
          .audit-page .page-btn { min-width: 32px; height: 32px; font-size: 0.8rem; }
        }
      `}} />
    </MainLayout>
  );
};

export default AuditLogs;
