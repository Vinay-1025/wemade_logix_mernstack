import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { logout, reset } from '../features/auth/authSlice';
import { Sun, Moon, Menu, Search, Bell, User, LogOut, Users, Shield, GraduationCap, ChevronDown, ClipboardCheck, MessageSquare } from 'lucide-react';
import { useCourse } from '../context/CourseContext';

const Header = () => {
  const { theme, toggleTheme, toggleSidebar } = useCourse();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [passwordStatus, setPasswordStatus] = useState({ type: '', message: '' });
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const fetchNotifications = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData?.token;
      if (!token) return;

      const response = await axios.get('/api/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (Array.isArray(response.data)) {
        setNotifications(response.data);
      } else {
        setNotifications([]);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setNotifications([]);
      } else {
        console.error('Failed to fetch notifications:', err);
        setNotifications([]);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
      return () => clearInterval(interval);
    }
  }, [user]);

  const markAsRead = async (id) => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData?.token;
      
      await axios.put(`/api/notifications/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchNotifications();
    } catch (err) {
      console.error('Failed to mark read:', err);
    }
  };

  const clearAllNotifications = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData?.token;
      await axios.delete('/api/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchNotifications();
    } catch (err) {
      console.error('Failed to clear notifications:', err);
    }
  };

  const handleNotifClick = (notif) => {
    markAsRead(notif._id);
    setShowNotifications(false);

    if (notif.type === 'assignment_submission') {
      // Navigate to admin assignments and select this one
      navigate('/admin/assignments', { state: { selectedId: notif.relatedId } });
    } else if (notif.type === 'assignment_feedback') {
      // Navigate to home and let MainContent handle it or just show success
      navigate('/');
    }
  };

  const unreadCount = Array.isArray(notifications) ? notifications.filter(n => !n.isRead).length : 0;

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      setPasswordStatus({ type: 'error', message: 'New passwords do not match' });
      return;
    }
    if (passwordData.new.length < 6) {
      setPasswordStatus({ type: 'error', message: 'Password must be at least 6 characters' });
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      await axios.put('/api/auth/password', {
        currentPassword: passwordData.current,
        newPassword: passwordData.new
      }, {
        headers: { 'Authorization': `Bearer ${userData.token}` }
      });

      setPasswordStatus({ type: 'success', message: 'Password updated successfully!' });
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordStatus({ type: '', message: '' });
        setPasswordData({ current: '', new: '', confirm: '' });
      }, 2000);
    } catch (err) {
      setPasswordStatus({ type: 'error', message: err.response?.data?.message || 'Failed to update password' });
    }
  };

  const isAdminView = location.pathname.startsWith('/admin');

  // Close menus on click outside
  React.useEffect(() => {
    const closeMenus = () => {
      setShowProfileMenu(false);
      setShowNotifications(false);
    };
    if (showProfileMenu || showNotifications) {
      window.addEventListener('click', closeMenus);
    }
    return () => window.removeEventListener('click', closeMenus);
  }, [showProfileMenu, showNotifications]);

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
        <div className="logo">
          <img src="/fav_icon.png" alt="Wemade Logix" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
          <span className="logo-text">Wemade<span style={{ color: 'var(--primary-cyan)' }}> Logix</span></span>
        </div>
      </div>

      <div className="header-search">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search topics, tutorials..." />
      </div>

      <div className="header-actions">
        <div className="notification-container">
          <button 
            className="icon-btn" 
            onClick={(e) => {
              e.stopPropagation();
              setShowNotifications(!showNotifications);
            }}
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="notification-dot">{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div className="notifications-dropdown" onClick={(e) => e.stopPropagation()}>
              <div className="dropdown-header">
                <div className="header-info-notif">
                  <h3>Notifications</h3>
                  {unreadCount > 0 && <span className="unread-badge">{unreadCount} new</span>}
                </div>
                {notifications.length > 0 && (
                  <button className="clear-btn-notif" onClick={clearAllNotifications}>Clear All</button>
                )}
              </div>
              <div className="notifications-list">
                {notifications.length === 0 ? (
                  <div className="empty-notifications">No notifications yet</div>
                ) : (
                  notifications.map(notif => (
                    <div 
                      key={notif._id} 
                      className={`notification-item ${!notif.isRead ? 'unread' : ''}`}
                      onClick={() => handleNotifClick(notif)}
                    >
                      <div className="notif-icon">
                        {notif.type === 'assignment_submission' ? <ClipboardCheck size={16} /> : <MessageSquare size={16} />}
                      </div>
                      <div className="notif-content">
                        <p className="notif-message">{notif.message}</p>
                        <span className="notif-time">{new Date(notif.createdAt).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="user-profile-container">
          <div 
            className="user-profile" 
            onClick={(e) => {
              e.stopPropagation();
              setShowProfileMenu(!showProfileMenu);
            }}
          >
            <div className="avatar">
              <User size={18} />
            </div>
            <span className="user-name">{user ? user.name : 'User'}</span>
            <ChevronDown size={14} className={`chevron-icon ${showProfileMenu ? 'open' : ''}`} />
          </div>

          {showProfileMenu && (
            <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
              <div className="dropdown-header">
                <div className="dropdown-user-info">
                  <div className="dropdown-avatar-large">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="dropdown-user-details">
                    <p className="dropdown-user-name">{user?.name}</p>
                    <p className="dropdown-user-email">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="dropdown-divider"></div>

              {user && (user.role === 'admin' || user.role === 'superadmin') && (
                <button 
                  className="dropdown-item mode-switch" 
                  onClick={() => {
                    navigate(isAdminView ? '/' : '/admin/users');
                    setShowProfileMenu(false);
                  }}
                >
                  {isAdminView ? (
                    <>
                      <GraduationCap size={18} />
                      <span>View as Student</span>
                    </>
                  ) : (
                    <>
                      <Shield size={18} />
                      <span>View as Admin</span>
                    </>
                  )}
                </button>
              )}

              <button 
                className="dropdown-item" 
                onClick={() => {
                  setShowPasswordModal(true);
                  setShowProfileMenu(false);
                }}
              >
                <Shield size={18} />
                <span>Reset Password</span>
              </button>

              <button 
                className="dropdown-item" 
                onClick={() => {
                  navigate('/profile');
                  setShowProfileMenu(false);
                }}
              >
                <User size={18} />
                <span>My Profile</span>
              </button>

              <div className="dropdown-divider"></div>

              <button className="dropdown-item logout-item" onClick={onLogout}>
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content password-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Reset Password</h3>
              <button className="close-btn" onClick={() => setShowPasswordModal(false)}>×</button>
            </div>
            <form onSubmit={handlePasswordReset} className="password-form">
              {passwordStatus.message && (
                <div className={`status-message ${passwordStatus.type}`}>
                  {passwordStatus.message}
                </div>
              )}
              <div className="form-group">
                <label>Current Password</label>
                <input 
                  type="password" 
                  value={passwordData.current}
                  onChange={e => setPasswordData({...passwordData, current: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input 
                  type="password" 
                  value={passwordData.new}
                  onChange={e => setPasswordData({...passwordData, new: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input 
                  type="password" 
                  value={passwordData.confirm}
                  onChange={e => setPasswordData({...passwordData, confirm: e.target.value})}
                  required 
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Update Password</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .app-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 var(--space-4);
          height: 64px;
          background: var(--app-header-bg);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--app-border);
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }
        .menu-btn {
          display: none;
          background: transparent;
          border: none;
          color: var(--app-text);
          cursor: pointer;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .logo-icon {
          width: 32px;
          height: 32px;
          background: var(--brand-gradient);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 1.2rem;
        }
        .logo-text {
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: -0.5px;
        }
        .header-search {
          flex: 1;
          max-width: 480px;
          position: relative;
          margin: 0 var(--space-4);
        }
        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-neutral);
        }
        .header-search input {
          width: 100%;
          padding: 8px 12px 8px 40px;
          background: var(--light-secondary);
          border: 1px solid var(--light-tertiary);
          border-radius: var(--radius-xl);
          color: var(--app-text);
          font-family: inherit;
          transition: var(--transition);
        }
        [data-theme='dark'] .header-search input {
          background: var(--dark-secondary);
          border-color: var(--dark-tertiary);
        }
        .header-search input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(0, 71, 171, 0.1);
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }
        .user-profile-container {
          position: relative;
        }
        .user-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 12px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }
        .user-profile:hover {
          background: var(--light-secondary);
          border-color: var(--light-tertiary);
        }
        .chevron-icon {
          color: var(--text-neutral);
          transition: transform 0.3s ease;
        }
        .chevron-icon.open {
          transform: rotate(180deg);
        }
        .profile-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 240px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--light-tertiary);
          padding: 8px;
          z-index: 1001;
          animation: slideDown 0.2s ease-out;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dropdown-header {
          padding: 16px;
        }
        .dropdown-user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .dropdown-avatar-large {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--brand-gradient);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 700;
        }
        .dropdown-user-details {
          overflow: hidden;
        }
        .dropdown-user-name {
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 2px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dropdown-user-email {
          font-size: 0.8rem;
          color: var(--text-neutral);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dropdown-divider {
          height: 1px;
          background: var(--light-tertiary);
          margin: 8px 0;
        }
        .dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          border: none;
          background: transparent;
          border-radius: 10px;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }
        .dropdown-item:hover {
          background: var(--light-secondary);
          color: var(--primary-blue);
        }
        .dropdown-item svg {
          color: var(--text-neutral);
          transition: color 0.2s ease;
        }
        .dropdown-item:hover svg {
          color: var(--primary-blue);
        }
        .dropdown-item.mode-switch {
          background: rgba(0, 71, 171, 0.05);
          color: var(--primary-blue);
          margin-bottom: 4px;
        }
        .dropdown-item.mode-switch:hover {
          background: var(--primary-blue);
          color: white;
        }
        .dropdown-item.mode-switch:hover svg {
          color: white;
        }
        .logout-item:hover {
          background: #fff1f2;
          color: #e11d48;
        }
        .logout-item:hover svg {
          color: #e11d48;
        }
        .notification-container { position: relative; }
        .notification-dot {
          position: absolute;
          top: -2px;
          right: -2px;
          background: #ef4444;
          color: white;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          font-size: 0.65rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
        }
        .notifications-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 320px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--light-tertiary);
          padding: 8px;
          z-index: 1001;
          animation: slideDown 0.2s ease-out;
        }
        .dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          border-bottom: 1px solid var(--light-tertiary);
          margin-bottom: 8px;
        }
        .header-info-notif {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .clear-btn-notif {
          background: transparent;
          border: none;
          color: var(--text-neutral);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s;
        }
        .clear-btn-notif:hover { color: #ef4444; }
        .unread-badge {
          background: rgba(0, 71, 171, 0.1);
          color: var(--primary-blue);
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.7rem;
          font-weight: 700;
        }
        .notifications-list {
          max-height: 400px;
          overflow-y: auto;
        }
        .notification-item {
          display: flex;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .notification-item:hover { background: var(--light-secondary); }
        .notification-item.unread { background: rgba(0, 71, 171, 0.03); }
        .notif-icon {
          width: 32px;
          height: 32px;
          background: var(--light-secondary);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-blue);
        }
        .notif-content p {
          margin: 0;
          font-size: 0.85rem;
          color: var(--text-primary);
          line-height: 1.4;
        }
        .notif-time {
          font-size: 0.75rem;
          color: var(--text-neutral);
        }
        .empty-notifications {
          padding: 32px;
          text-align: center;
          color: var(--text-neutral);
          font-size: 0.9rem;
        }
        .icon-btn {
          position: relative;
          background: transparent;
          border: none;
          color: var(--app-text-muted);
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-btn:hover {
          background: var(--light-tertiary);
          color: var(--app-text);
        }
        [data-theme='dark'] .icon-btn:hover {
          background: var(--dark-tertiary);
        }
        .user-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-left: var(--space-2);
          border-left: 1px solid var(--app-border);
          cursor: pointer;
        }
        .avatar {
          width: 36px;
          height: 36px;
          background: var(--light-tertiary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
        }
        .user-name {
          font-weight: 500;
          font-size: 0.9rem;
        }
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeInOverlay 0.2s ease-out;
        }
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .password-modal {
          width: 100%;
          max-width: 440px;
          background: var(--app-bg) !important;
          border-radius: 24px !important;
          border: 1px solid var(--light-tertiary) !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
          padding: 32px !important;
          margin: 20px;
          animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes modalPop {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .close-btn {
          background: transparent;
          border: none;
          font-size: 1.5rem;
          color: var(--text-neutral);
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .close-btn:hover {
          background: var(--light-tertiary);
          color: var(--text-primary);
        }
        .modal-header h3 {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          letter-spacing: -0.5px;
        }
        .password-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-top: 24px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .form-group input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid var(--light-tertiary);
          border-radius: 12px;
          font-family: inherit;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          background: var(--light-secondary);
        }
        .form-group input:focus {
          outline: none;
          border-color: var(--primary-cyan);
          background: white;
          box-shadow: 0 0 0 4px rgba(0, 209, 209, 0.1);
        }
        .modal-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-top: 24px;
        }
        .btn-secondary {
          padding: 12px 20px;
          border-radius: 12px;
          border: 2px solid var(--light-tertiary);
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          font-weight: 700;
          transition: all 0.2s ease;
        }
        .btn-secondary:hover {
          background: var(--light-tertiary);
          color: var(--text-primary);
        }
        .btn-primary {
          padding: 12px 24px;
          border-radius: 12px;
          border: none;
          background: var(--brand-gradient);
          color: white;
          cursor: pointer;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(0, 209, 209, 0.3);
          transition: all 0.2s ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 209, 209, 0.4);
        }
        .status-message {
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .status-message.error {
          background: #fef2f2;
          color: #ef4444;
          border: 1px solid #fecaca;
        }
        .status-message.success {
          background: #f0fdf4;
          color: #16a34a;
          border: 1px solid #bbf7d0;
        }
        @media (max-width: 768px) {
          .menu-btn { display: block; }
          .header-search, .user-name { display: none; }
        }
        @media (max-width: 600px) {
          .logo-text { display: none; }
        }

        @media (max-width: 480px) {
          .notifications-dropdown {
            position: fixed;
            top: 60px;
            right: 16px;
            left: 16px;
            width: auto;
            max-width: none;
          }
          .profile-dropdown {
            position: fixed;
            top: 60px;
            right: 16px;
            left: 16px;
            width: auto;
          }
          .header-actions { gap: var(--space-1); }
        }
      `}} />
    </header>
  );
};

export default Header;
