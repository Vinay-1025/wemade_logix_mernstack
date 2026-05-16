import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { User, Mail, Shield, Calendar, Search, ArrowLeft, Plus, X, UserPlus, ChevronLeft, ChevronRight, MoreVertical, Trash2, UserCheck, Edit2, Ban, Bell, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'student' });
  const [editingUser, setEditingUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  // Feedback states
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, title: '', message: '', onConfirm: null });

  const showSnackbar = (message, type = 'success') => {
    setSnackbar({ open: true, message, type });
    setTimeout(() => setSnackbar({ ...snackbar, open: false }), 4000);
  };

  const showConfirm = (title, message, onConfirm) => {
    setConfirmDialog({ open: true, title, message, onConfirm });
  };

  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    showConfirm(
      'Remove Personnel',
      'Are you sure you want to permanently remove this personnel? This action cannot be undone.',
      async () => {
        try {
          const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
          await axios.delete(`/api/auth/users/${id}`, config);
          setUsers(users.filter(u => u._id !== id));
          showSnackbar('Personnel removed successfully');
        } catch (err) {
          showSnackbar('Failed to delete personnel', 'error');
        }
      }
    );
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
      const { data } = await axios.put(`/api/auth/users/${id}/status`, { isActive: !currentStatus }, config);
      setUsers(users.map(u => u._id === id ? data : u));
      showSnackbar(`Personnel ${data.isActive ? 'activated' : 'deactivated'} successfully`);
    } catch (err) {
      console.error(err);
      showSnackbar('Failed to update status', 'error');
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
      const { data } = await axios.put(`/api/auth/users/${editingUser._id}`, editingUser, config);
      setUsers(users.map(u => u._id === editingUser._id ? data : u));
      setIsEditModalOpen(false);
      showSnackbar('Personnel updated successfully');
    } catch (err) {
      showSnackbar('Failed to update personnel', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAvatarColor = (name) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
      '#F06292', '#AED581', '#FFD54F', '#4DB6AC', '#7986CB'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      const { data } = await axios.get('/api/auth/users', config);
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentUser]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      await axios.post('/api/auth/users', newUser, config);
      setIsAddModalOpen(false);
      setNewUser({ name: '', email: '', password: '', role: 'student' });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase());

    // Hide superadmin from regular admins
    if (currentUser.role === 'admin' && u.role === 'superadmin') return false;

    return matchesSearch;
  });

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading && users.length === 0) return <MainLayout><div className="loading-state">Accessing user records...</div></MainLayout>;

  return (
    <MainLayout>
      <div className="users-page">
        <div className="users-header">
          <div className="header-top">
            <div className="header-title">
              <div className="icon-box">
                <Shield size={24} />
              </div>
              <div>
                <h1>Personnel Directory</h1>
                <p>Manage access protocols and mission personnel</p>
              </div>
            </div>

            <button className="btn btn-primary add-user-btn" onClick={() => setIsAddModalOpen(true)}>
              <Plus size={18} />
              Add Personnel
            </button>
          </div>

          <div className="header-bottom">
            <div className="search-container">
              <Search size={18} />
              <input
                type="text"
                placeholder="Filter personnel by name, email or role..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>
            <div className="stats-mini">
              <span>Total Active: <strong>{users.length}</strong></span>
              <span>Administrative: <strong>{users.filter(u => u.role === 'admin' || u.role === 'superadmin').length}</strong></span>
            </div>
          </div>
        </div>

        {isAddModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content card-3d">
              <div className="modal-header">
                <div className="modal-icon">
                  <UserPlus size={24} />
                </div>
                <h3>Enroll New Personnel</h3>
                <button className="close-btn" onClick={() => setIsAddModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddUser}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="name@wemade.com"
                  />
                </div>
                <div className="form-group">
                  <label>Access Password</label>
                  <input
                    type="password"
                    required
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>
                <div className="form-group">
                  <label>Access Level (Role)</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  >
                    <option value="student">Student (Access Gated)</option>
                    <option value="admin">Administrator (Command Level)</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Authorize Personnel'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="table-container card-3d">
          <table className="personnel-table">
            <thead>
              <tr>
                <th>Personnel</th>
                <th>Access Level</th>
                <th>Contact Information</th>
                <th>Joined Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((u) => (
                <tr key={u._id} className={!u.isActive ? 'inactive-row' : ''}>
                  <td>
                    <div className="personnel-cell">
                      <div
                        className="avatar-small"
                        style={{ backgroundColor: getAvatarColor(u.name) }}
                      >
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="personnel-info">
                        <div className="name-status">
                          <span className="name">{u.name}</span>
                          {!u.isActive && <span className="status-label">Inactive</span>}
                        </div>
                        <span className="id">ID: {u._id.slice(-6)}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="user-role-badge" data-role={u.role}>
                      {(u.role === 'admin' || u.role === 'superadmin') ? <Shield size={12} /> : <User size={12} />}
                      {u.role}
                    </div>
                  </td>
                  <td>
                    <div className="contact-cell">
                      <Mail size={14} />
                      <span>{u.email}</span>
                    </div>
                  </td>
                  <td className="date-cell">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="action-icons">
                      <button
                        className="icon-btn edit"
                        title={currentUser._id === u._id ? "Cannot edit yourself" : (currentUser.role === 'admin' && u.role === 'superadmin' ? "Insufficient permissions" : "Edit Personnel")}
                        disabled={currentUser._id === u._id || (currentUser.role === 'admin' && u.role === 'superadmin')}
                        onClick={() => {
                          setEditingUser(u);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className={`icon-btn ${u.isActive ? 'ban' : 'activate'}`}
                        onClick={() => toggleStatus(u._id, u.isActive)}
                        disabled={currentUser._id === u._id || (currentUser.role === 'admin' && u.role === 'superadmin')}
                        title={currentUser._id === u._id ? "Cannot deactivate yourself" : (currentUser.role === 'admin' && u.role === 'superadmin' ? "Insufficient permissions" : (u.isActive ? 'Deactivate Personnel' : 'Activate Personnel'))}
                      >
                        {u.isActive ? <Ban size={16} /> : <UserCheck size={16} />}
                      </button>
                      <button
                        className="icon-btn delete"
                        onClick={() => handleDelete(u._id)}
                        disabled={currentUser._id === u._id || (currentUser.role === 'admin' && u.role === 'superadmin')}
                        title={currentUser._id === u._id ? "Cannot remove yourself" : (currentUser.role === 'admin' && u.role === 'superadmin' ? "Insufficient permissions" : "Remove Personnel")}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="empty-state">
              <Search size={48} />
              <p>No personnel records found.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
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

        {/* Edit Personnel Modal */}
        {isEditModalOpen && editingUser && (
          <div className="modal-overlay">
            <div className="modal-content card-3d">
              <div className="modal-header">
                <div className="modal-icon">
                  <Edit2 size={24} />
                </div>
                <h3>Edit Personnel</h3>
                <button className="close-btn" onClick={() => setIsEditModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleUpdateUser}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Personnel Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  >
                    <option value="student">Student</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn-ghost" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Custom Confirmation Dialog */}
        {confirmDialog.open && (
          <div className="modal-overlay" style={{ zIndex: 1100 }}>
            <div className="modal-content confirm-dialog card-3d" style={{ maxWidth: '400px' }}>
              <div className="modal-header">
                <div className="modal-icon warning">
                  <AlertCircle size={24} />
                </div>
                <h3>{confirmDialog.title}</h3>
              </div>
              <p className="confirm-message">{confirmDialog.message}</p>
              <div className="modal-footer">
                <button className="btn-ghost" onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary delete-btn"
                  onClick={() => {
                    confirmDialog.onConfirm();
                    setConfirmDialog({ ...confirmDialog, open: false });
                  }}
                >
                  Confirm Action
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Snackbar Notification */}
        {snackbar.open && (
          <div className={`snackbar-notification ${snackbar.type} card-3d`}>
            {snackbar.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span>{snackbar.message}</span>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .users-page { padding: 40px; animation: fadeIn 0.5s ease; max-width: 1400px; margin: 0 auto; }
        .header-top { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          margin-bottom: 32px;
          width: 100%;
        }
        .header-title { 
          display: flex; 
          align-items: center; 
          gap: 20px; 
        }
        .icon-box { width: 56px; height: 56px; background: rgba(0, 209, 209, 0.1); color: #00d1d1; border-radius: 16px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(0, 209, 209, 0.2); flex-shrink: 0; }
        .header-title h1 { font-size: 2rem; font-weight: 800; margin: 0; color: #1e293b; letter-spacing: -0.5px; }
        .header-title p { margin: 4px 0 0; color: #64748b; font-size: 0.95rem; }
        
        .add-user-btn { 
          display: flex !important; 
          align-items: center; 
          gap: 8px; 
          background: #00d1d1; 
          color: white; 
          padding: 10px 20px !important; 
          border-radius: 10px; 
          font-weight: 700; 
          border: none; 
          cursor: pointer; 
          transition: all 0.2s;
          white-space: nowrap;
          width: fit-content !important;
          flex: 0 0 auto !important;
          box-shadow: 0 4px 12px rgba(0, 209, 209, 0.2);
          font-size: 0.85rem;
        }
        .add-user-btn:hover { 
          transform: translateY(-2px); 
          background: #00c4c4; 
          box-shadow: 0 6px 16px rgba(0, 209, 209, 0.3); 
        }
        
        .header-bottom { display: flex; justify-content: space-between; align-items: center; background: var(--app-card-bg); padding: 12px 20px; border-radius: 16px; border: 1px solid var(--app-border); }
        .search-container { display: flex; align-items: center; gap: 12px; flex: 1; max-width: 500px; }
        .search-container input { background: transparent; border: none; color: var(--app-text); width: 100%; outline: none; font-size: 0.95rem; }
        .search-container svg { color: var(--app-text-muted); }
        .stats-mini { display: flex; gap: 24px; font-size: 0.85rem; color: var(--app-text-muted); border-left: 1px solid var(--app-border); padding-left: 24px; }
        .stats-mini strong { color: var(--primary); }

        .table-container { background: var(--app-card-bg); border-radius: 24px; border: 1px solid var(--app-border); overflow-x: auto; padding: 12px; -webkit-overflow-scrolling: touch; }
        .personnel-table { width: 100%; border-collapse: collapse; text-align: left; min-width: 850px; }
        .personnel-table th { padding: 16px; border-bottom: 1px solid var(--app-border); color: var(--app-text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 800; }
        .personnel-table td { padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.03); color: var(--app-text); font-size: 0.9rem; vertical-align: middle; }
        
        .users-page .personnel-cell { display: flex; align-items: center; gap: 14px; }
        .users-page .avatar-small { 
          width: 44px; 
          height: 44px; 
          border-radius: 12px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: white; 
          font-weight: 800; 
          font-size: 1.1rem; 
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          border: 2px solid white;
        }

        @keyframes slideDown { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 768px) {
          .users-page { padding: 20px; }
          .header-top { flex-direction: column; align-items: stretch; gap: 16px; }
          .header-title { gap: 12px; }
          .header-title h1 { font-size: 1.5rem; }
          .header-bottom { flex-direction: column; gap: 12px; align-items: stretch; }
          .stats-mini { border-left: none; border-top: 1px solid var(--app-border); padding: 12px 0 0; }
          .search-container { max-width: none; }
        }
        .personnel-info { display: flex; flex-direction: column; }
        .name-status { display: flex; align-items: center; gap: 10px; }
        .status-label { font-size: 0.65rem; background: #f1f5f9; color: #64748b; padding: 2px 8px; border-radius: 6px; text-transform: uppercase; font-weight: 700; border: 1px solid #e2e8f0; }
        .inactive-row { background: rgba(248, 250, 252, 0.5); }
        .inactive-row td { opacity: 0.6; }
        
        .personnel-table thead { background: #f8fafc; }
        .personnel-table th { padding: 18px 16px; color: #64748b; font-size: 0.7rem; }
        
        .user-role-badge { padding: 6px 12px; border-radius: 12px; font-size: 0.75rem; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; background: #f1f5f9; color: #475569; }
        .user-role-badge[data-role='admin'], .user-role-badge[data-role='superadmin'] { background: rgba(0, 209, 209, 0.08); color: #00d1d1; }
        
        .personnel-table tr { transition: all 0.25s ease; }
        .personnel-table tr:hover { background: #f8fafc; }
        
        .action-icons { 
          display: flex; 
          justify-content: flex-end; 
          gap: 10px; 
          transition: all 0.3s ease;
        }
        
        .icon-btn { 
          width: 36px; 
          height: 36px; 
          border-radius: 10px; 
          border: 1px solid #e2e8f0; 
          background: white; 
          color: #94a3b8; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          cursor: pointer; 
          transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        
        .icon-btn:hover:not(:disabled) { 
          transform: translateY(-3px) scale(1.15);
          box-shadow: 0 8px 16px -4px rgba(0,0,0,0.1);
        }
        
        .icon-btn.edit:hover { color: #00d1d1; border-color: #00d1d1; background: rgba(0, 209, 209, 0.05); }
        .icon-btn.ban:hover { color: #ef4444; border-color: #ef4444; background: rgba(239, 68, 68, 0.05); }
        .icon-btn.activate:hover { color: #16a34a; border-color: #16a34a; background: rgba(22, 163, 74, 0.05); }
        .icon-btn.delete:hover { color: #ef4444; border-color: #ef4444; background: rgba(239, 68, 68, 0.05); }
        
        .icon-btn:disabled { opacity: 0.2; cursor: not-allowed; filter: grayscale(1); pointer-events: none; border-color: #f1f5f9; }

        /* Pagination */
        .pagination { display: flex; justify-content: center; align-items: center; gap: 12px; margin-top: 24px; padding-bottom: 12px; }
        .page-numbers { display: flex; gap: 6px; }
        .page-btn { min-width: 36px; height: 36px; padding: 0 8px; background: transparent; border: 1px solid var(--app-border); border-radius: 10px; color: var(--app-text-muted); cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; font-weight: 600; }
        .page-btn:hover:not(:disabled) { background: rgba(255,255,255,0.05); color: white; border-color: #64748b; }
        .page-btn.active { background: var(--primary); color: white; border-color: var(--primary); box-shadow: var(--glow-sm); }
        .page-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        .empty-state { padding: 60px; text-align: center; color: var(--app-text-muted); }
        .empty-state p { margin-top: 16px; font-size: 1rem; }

        /* Modal Redesign (Light Theme) */
        .users-page .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; animation: fadeIn 0.3s ease; }
        .users-page .modal-content { background: white; border: 1px solid rgba(0,0,0,0.05); border-radius: 24px; width: 100%; max-width: 500px; padding: 40px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); color: #1e293b; }
        .users-page .modal-header { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; position: relative; }
        .users-page .modal-icon { width: 48px; height: 48px; background: rgba(0, 209, 209, 0.1); color: #00d1d1; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .users-page .modal-header h3 { font-size: 1.5rem; font-weight: 800; margin: 0; color: #1e293b; letter-spacing: -0.5px; }
        .users-page .close-btn { position: absolute; right: -10px; top: -10px; background: transparent; border: none; color: #64748b; cursor: pointer; padding: 8px; border-radius: 50%; transition: all 0.2s; }
        .users-page .close-btn:hover { background: #f1f5f9; color: #1e293b; }
        
        .users-page .form-group { margin-bottom: 24px; text-align: left; }
        .users-page .form-group label { display: block; font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
        .users-page .form-group input, .users-page .form-group select { width: 100%; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 16px; color: #1e293b; font-size: 0.95rem; outline: none; transition: all 0.2s; }
        .users-page .form-group input:focus, .users-page .form-group select:focus { border-color: #00d1d1; background: white; box-shadow: 0 0 0 4px rgba(0, 209, 209, 0.1); }
        
        .users-page .modal-footer { display: flex; gap: 12px; margin-top: 40px; }
        .users-page .btn-primary { background: #00d1d1; color: white; border: none; padding: 14px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px rgba(0, 209, 209, 0.2); width: 100%; }
        .users-page .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(0, 209, 209, 0.3); }
        .users-page .btn-primary:disabled { opacity: 0.6; transform: none; cursor: not-allowed; }
        
        .users-page .btn-ghost { background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0; padding: 14px 24px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; width: 100%; }
        .users-page .btn-ghost:hover { background: #e2e8f0; color: #1e293b; }

        /* Confirmation Overwrites */
        .users-page .confirm-dialog { max-width: 420px; }
        .users-page .confirm-message { color: #64748b; margin: 16px 0 24px; line-height: 1.6; }
        .users-page .delete-btn { background: #ef4444 !important; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2) !important; }
        .users-page .delete-btn:hover { box-shadow: 0 6px 15px rgba(239, 68, 68, 0.3) !important; }

        /* Premium Snackbar (Right Bottom Corner) */
        .snackbar-notification { 
          position: fixed; 
          bottom: 32px; 
          right: 32px; 
          display: flex; 
          align-items: center; 
          gap: 12px; 
          padding: 14px 24px; 
          border-radius: 20px; 
          background: rgba(255, 255, 255, 0.9); 
          backdrop-filter: blur(12px); 
          color: #1e293b; 
          border: 1px solid rgba(0,0,0,0.05); 
          z-index: 9999; 
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15); 
          animation: snackbarSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
          font-weight: 600;
          font-size: 0.95rem;
        }
        .snackbar-notification.success { border-left: 4px solid #16a34a; }
        .snackbar-notification.success svg { color: #16a34a; }
        .snackbar-notification.error { border-left: 4px solid #ef4444; }
        .snackbar-notification.error svg { color: #ef4444; }
        
        @keyframes snackbarSlideIn { 
          from { opacity: 0; transform: translateX(40px) scale(0.9); } 
          to { opacity: 1; transform: translateX(0) scale(1); } 
        }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </MainLayout>
  );
};

export default UsersList;
