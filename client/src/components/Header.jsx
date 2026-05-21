import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { logout, reset } from '../features/auth/authSlice';
import { Sun, Moon, Menu, Search, Bell, User, LogOut, Users, Shield, GraduationCap, ChevronDown, ClipboardCheck, MessageSquare, Eye, EyeOff, X, QrCode } from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import { courseData } from '../data/mockData';
import { Html5Qrcode } from 'html5-qrcode';

const Header = () => {
  const { theme, toggleTheme, toggleSidebar, setSelectedTopic } = useCourse();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [passwordStatus, setPasswordStatus] = useState({ type: '', message: '' });
  const [showPasswordFields, setShowPasswordFields] = useState({ current: false, new: false, confirm: false });
  const [notifications, setNotifications] = useState([]);

  // QR Scanner States
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [scannerError, setScannerError] = useState('');
  const [scanSuccessMessage, setScanSuccessMessage] = useState('');
  const [manualCode, setManualCode] = useState('');
  const [attendanceSubmitting, setAttendanceSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    let html5QrCode;

    if (showScannerModal && !scanSuccessMessage) {
      setScannerError('');
      const initTimeout = setTimeout(() => {
        try {
          html5QrCode = new Html5Qrcode("qr-reader");
          html5QrCode.start(
            { facingMode: "environment" },
            {
              fps: 10,
              qrbox: 200,
            },
            async (decodedText) => {
              try {
                await html5QrCode.stop();
                handleMarkAttendance(decodedText);
              } catch (stopErr) {
                console.error("Error stopping scanner on success:", stopErr);
                handleMarkAttendance(decodedText);
              }
            },
            (errorMessage) => {
              // Ignore spammy parse errors
            }
          ).catch(err => {
            console.error("Camera start failed:", err);
            setScannerError("Camera access permission denied or no camera found.");
          });
        } catch (err) {
          console.error("Scanner setup failed:", err);
          setScannerError("Failed to initialize scanner. Make sure camera is available.");
        }
      }, 300);

      return () => {
        clearTimeout(initTimeout);
        if (html5QrCode && html5QrCode.isScanning) {
          html5QrCode.stop().catch(err => console.error("Error stopping scanner on clean-up:", err));
        }
      };
    }
  }, [showScannerModal, scanSuccessMessage]);

  const handleMarkAttendance = async (code) => {
    if (attendanceSubmitting) return;
    setAttendanceSubmitting(true);
    setScannerError('');
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData?.token;
      if (!token) {
        setScannerError("Authentication token not found. Please log in again.");
        setAttendanceSubmitting(false);
        return;
      }

      const response = await axios.post('/api/attendance/scan',
        { code: code.trim().toUpperCase() },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data?.success) {
        setScanSuccessMessage("🎉 Attendance marked successfully!");
        alert("Attendance Marked successfully!");
        setTimeout(() => {
          setShowScannerModal(false);
          setScanSuccessMessage('');
          setAttendanceSubmitting(false);
        }, 1500);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to mark attendance. Invalid QR code.";
      setScannerError(msg);
      setAttendanceSubmitting(false);
      setTimeout(() => {
        setScannerError('');
        setShowScannerModal(false);
        setTimeout(() => setShowScannerModal(true), 200);
      }, 3000);
    }
  };

  const handleManualCodeSubmit = async (e) => {
    e.preventDefault();
    if (!manualCode.trim() || attendanceSubmitting) return;
    setAttendanceSubmitting(true);
    setScannerError('');
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData?.token;
      if (!token) {
        setScannerError("Authentication token not found. Please log in again.");
        setAttendanceSubmitting(false);
        return;
      }

      const response = await axios.post('/api/attendance/scan',
        { code: manualCode.trim().toUpperCase() },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data?.success) {
        setScanSuccessMessage("🎉 Attendance marked successfully!");
        alert("Attendance Marked successfully!");
        setManualCode('');
        setTimeout(() => {
          setShowScannerModal(false);
          setScanSuccessMessage('');
          setAttendanceSubmitting(false);
        }, 1500);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to mark attendance. Invalid code.";
      setScannerError(msg);
      setAttendanceSubmitting(false);
    }
  };

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
      const interval = setInterval(fetchNotifications, 8000); // Poll every 8s
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
    } else if (notif.type === 'system' && notif.targetTopicId) {
      // Find the topic matching notif.targetTopicId
      let foundTopic = null;
      for (const week of courseData) {
        for (const day of week.days) {
          for (const topic of day.topics) {
            if (topic.id === notif.targetTopicId) {
              foundTopic = topic;
              break;
            }
          }
          if (foundTopic) break;
        }
        if (foundTopic) break;
      }

      if (foundTopic) {
        localStorage.setItem('activeResourcesSection', 'recording');
        setSelectedTopic(foundTopic);
        window.dispatchEvent(new CustomEvent('refresh-recording-links'));
      }
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
        {user && (
          <button
            className="icon-btn"
            onClick={() => {
              setScanSuccessMessage('');
              setScannerError('');
              setManualCode('');
              setShowScannerModal(true);
            }}
            title="Scan Attendance QR"
            style={{ marginRight: '4px' }}
          >
            <QrCode size={20} />
          </button>
        )}
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
                      style={{ position: 'relative', paddingRight: '40px' }}
                    >
                      <div className="notif-icon">
                        {notif.type === 'assignment_submission' ? <ClipboardCheck size={16} /> : <MessageSquare size={16} />}
                      </div>
                      <div className="notif-content">
                        <p className="notif-message">{notif.message}</p>
                        <span className="notif-time">{new Date(notif.createdAt).toLocaleTimeString()}</span>
                      </div>
                      <button
                        className="notif-delete-btn"
                        onClick={async (e) => {
                          e.stopPropagation();
                          await markAsRead(notif._id);
                        }}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--text-neutral)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '6px',
                          borderRadius: '50%',
                          transition: 'all 0.2s',
                        }}
                        title="Dismiss"
                      >
                        <X size={14} />
                      </button>
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

      {showScannerModal && createPortal(
        <div className="modal-overlay" onClick={() => setShowScannerModal(false)}>
          <div className="modal-content scanner-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px', padding: '24px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <QrCode size={22} style={{ color: 'var(--primary-cyan)' }} />
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>Scan Attendance QR</h3>
              </div>
              <button className="close-btn" onClick={() => setShowScannerModal(false)}>×</button>
            </div>

            <div className="scanner-body" style={{ marginTop: '16px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-neutral)', marginBottom: '16px', lineHeight: '1.4' }}>
                Position the tutor's dynamic QR code inside the scanner box below to mark your attendance.
              </p>

              {scannerError ? (
                <div className="status-message error" style={{ marginBottom: '16px', fontSize: '0.85rem' }}>
                  {scannerError}
                </div>
              ) : null}

              {scanSuccessMessage ? (
                <div className="status-message success" style={{ marginBottom: '16px', justifyContent: 'center', fontSize: '0.85rem' }}>
                  {scanSuccessMessage}
                </div>
              ) : (
                <>
                  <div style={{ position: 'relative', width: '100%', maxWidth: '280px', margin: '0 auto', borderRadius: '16px', overflow: 'hidden', border: '2px solid var(--primary-cyan)', boxShadow: '0 0 15px rgba(0,209,209,0.2)' }}>
                    <div id="qr-reader" style={{ width: '100%', height: '260px' }}></div>

                    {/* Scanner target box overlay */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '220px',
                      height: '220px',
                      border: '2px dashed var(--primary-cyan)',
                      borderRadius: '12px',
                      pointerEvents: 'none',
                      zIndex: 2,
                      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.4)'
                    }}></div>
                  </div>

                  <div className="scanner-divider">
                    <span>OR</span>
                  </div>

                  <form onSubmit={handleManualCodeSubmit} className="manual-code-form">
                    <input 
                      type="text" 
                      placeholder="Enter session code" 
                      value={manualCode}
                      onChange={e => setManualCode(e.target.value)}
                      maxLength={16}
                      disabled={attendanceSubmitting}
                      className="manual-code-input"
                    />
                    <button 
                      type="submit" 
                      disabled={attendanceSubmitting || !manualCode.trim()} 
                      className="manual-code-btn"
                    >
                      {attendanceSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </form>
                </>
              )}
            </div>

            <div className="modal-actions" style={{ justifyContent: 'center', marginTop: '20px' }}>
              <button className="btn-secondary" onClick={() => setShowScannerModal(false)} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                Close Scanner
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {showPasswordModal && createPortal(
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
                <div className="password-input-wrapper">
                  <input
                    type={showPasswordFields.current ? "text" : "password"}
                    value={passwordData.current}
                    onChange={e => setPasswordData({ ...passwordData, current: e.target.value })}
                    required
                  />
                  <button type="button" className="password-toggle-btn" onClick={() => setShowPasswordFields(prev => ({ ...prev, current: !prev.current }))}>
                    {showPasswordFields.current ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>New Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPasswordFields.new ? "text" : "password"}
                    value={passwordData.new}
                    onChange={e => setPasswordData({ ...passwordData, new: e.target.value })}
                    required
                  />
                  <button type="button" className="password-toggle-btn" onClick={() => setShowPasswordFields(prev => ({ ...prev, new: !prev.new }))}>
                    {showPasswordFields.new ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPasswordFields.confirm ? "text" : "password"}
                    value={passwordData.confirm}
                    onChange={e => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    required
                  />
                  <button type="button" className="password-toggle-btn" onClick={() => setShowPasswordFields(prev => ({ ...prev, confirm: !prev.confirm }))}>
                    {showPasswordFields.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Update Password</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
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
        .notif-delete-btn:hover { background: rgba(239, 68, 68, 0.1) !important; color: #ef4444 !important; }
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
        .scanner-modal {
          width: 100%;
          max-width: 440px;
          background: #ffffff !important;
          border-radius: 24px !important;
          border: 1px solid #e2e8f0 !important;
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.15) !important;
          padding: 24px !important;
          margin: 20px;
          animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          color: #1e293b !important;
        }
        .scanner-modal .modal-header h3 {
          color: #1e293b !important;
        }
        .scanner-modal .close-btn {
          color: #64748b !important;
        }
        .scanner-modal .close-btn:hover {
          background: #f1f5f9 !important;
          color: #1e293b !important;
        }
        .scanner-modal p {
          color: #64748b !important;
        }
        .scanner-modal .btn-secondary {
          background: #f1f5f9 !important;
          border: 1px solid #e2e8f0 !important;
          color: #475569 !important;
        }
        .scanner-modal .btn-secondary:hover {
          background: #e2e8f0 !important;
          color: #1e293b !important;
        }
        .scanner-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 16px 0;
          color: #94a3b8;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .scanner-divider::before,
        .scanner-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #e2e8f0;
        }
        .scanner-divider:not(:empty)::before {
          margin-right: 12px;
        }
        .scanner-divider:not(:empty)::after {
          margin-left: 12px;
        }
        .manual-code-form {
          display: flex;
          gap: 10px;
          width: 100%;
          max-width: 320px;
          margin: 0 auto;
        }
        .manual-code-input {
          flex: 1;
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 12px !important;
          padding: 10px 14px !important;
          color: #1e293b !important;
          font-size: 0.9rem !important;
          outline: none;
          text-align: center;
          font-family: monospace;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .manual-code-input:focus {
          border-color: var(--primary-cyan) !important;
          box-shadow: 0 0 0 3px rgba(0, 209, 209, 0.1) !important;
          background: white !important;
        }
        .manual-code-btn {
          background: var(--brand-gradient);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 10px 18px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 10px rgba(0, 209, 209, 0.2);
          white-space: nowrap;
        }
        .manual-code-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 14px rgba(0, 209, 209, 0.3);
        }
        .manual-code-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
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
        .password-input-wrapper {
          position: relative;
          width: 100%;
        }
        .password-input-wrapper input {
          padding-right: 48px;
        }
        .password-toggle-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: var(--text-neutral);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 50%;
          transition: all 0.2s;
        }
        .password-toggle-btn:hover {
          color: var(--primary-cyan);
          background: rgba(0, 209, 209, 0.05);
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
