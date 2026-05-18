import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCourse } from '../context/CourseContext';
import { courseData } from '../data/mockData';
import { ChevronDown, ChevronRight, BookOpen, Clock, Calendar, CheckCircle2, PanelLeftClose, PanelLeftOpen, ShieldCheck, ClipboardCheck, Lock, History } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminView = location.pathname.startsWith('/admin');
  const { 
    selectedTopic, 
    setSelectedTopic, 
    isSidebarOpen, 
    isSidebarCollapsed, 
    toggleSidebarCollapse,
    userAssignments 
  } = useCourse();
  const [expandedWeeks, setExpandedWeeks] = useState(['w1']);
  const [expandedDays, setExpandedDays] = useState(['w1-d1']);

  // Helper to get assignment status for a day
  const getDayStatus = (dayId) => {
    // Find the last topic of this day which is the mini-project
    let dayData = null;
    courseData.forEach(w => {
      const found = w.days.find(d => d.dayId === dayId);
      if (found) dayData = found;
    });

    if (!dayData) return { isSubmitted: false, isAccepted: false };

    const miniProjectTopic = dayData.topics[dayData.topics.length - 1];
    const assignment = userAssignments.find(a => a.topicId === miniProjectTopic.id);

    return {
      isSubmitted: !!assignment,
      isAccepted: assignment?.status === 'accepted',
      status: assignment?.status || 'none'
    };
  };

  // Helper to check if a day is unlocked
  const isDayUnlocked = (weekIndex, dayIndex) => {
    // Admin/Superadmin sees everything
    if (user?.role === 'admin' || user?.role === 'superadmin') return true;
    
    // First day is always unlocked
    if (weekIndex === 0 && dayIndex === 0) return true;

    // Get previous day's ID
    let prevDayId = '';
    if (dayIndex > 0) {
      prevDayId = courseData[weekIndex].days[dayIndex - 1].dayId;
    } else if (weekIndex > 0) {
      const prevWeek = courseData[weekIndex - 1];
      prevDayId = prevWeek.days[prevWeek.days.length - 1].dayId;
    }

    const prevStatus = getDayStatus(prevDayId);
    return prevStatus.isSubmitted; // Unlocked if submitted
  };

  // Auto-expand active topic's section and collapse others
  React.useEffect(() => {
    if (selectedTopic?.id) {
      const parts = selectedTopic.id.split('-');
      if (parts.length >= 2) {
        const weekId = parts[0];
        const dayId = `${parts[0]}-${parts[1]}`;
        setExpandedWeeks([weekId]);
        setExpandedDays([dayId]);
      }
    }
  }, [selectedTopic?.id]);

  const toggleWeek = (weekId) => {
    if (isSidebarCollapsed) {
      toggleSidebarCollapse();
      setExpandedWeeks([weekId]);
      return;
    }
    setExpandedWeeks(prev => prev.includes(weekId) ? [] : [weekId]);
  };

  const toggleDay = (dayId) => {
    if (isSidebarCollapsed) {
      toggleSidebarCollapse();
      setExpandedDays([dayId]);
      return;
    }
    setExpandedDays(prev => prev.includes(dayId) ? [] : [dayId]);
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : ''} ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isSidebarCollapsed && (
          <div className="sidebar-title-area">
            {isAdminView ? (
              <>
                <h2 style={{ fontSize: '1.1rem', marginBottom: '4px', whiteSpace: 'nowrap', color: '#00D1D1' }}>Command Center</h2>
                <div className="admin-status">
                  <div className="status-dot"></div>
                  <span>System Active</span>
                </div>
              </>
            ) : (
              <>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '4px', whiteSpace: 'nowrap' }}>Course Content</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-neutral)' }}>12% completed</p>
              </>
            )}
          </div>
        )}
        <button className="collapse-toggle" onClick={toggleSidebarCollapse} title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}>
          {isSidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>
      </div>

      <div className="sidebar-list">
        {(user?.role === 'admin' || user?.role === 'superadmin') && isAdminView && (
          <div className="week-item admin-section">
            <Link to="/admin/users" style={{ textDecoration: 'none', color: 'inherit' }}>
              <button className={`sidebar-toggle-btn week-btn admin-btn ${location.pathname === '/admin/users' ? 'active' : ''}`}>
                <div className="btn-content">
                  <ShieldCheck size={20} color="#f59e0b" />
                  {!isSidebarCollapsed && <span>User Directory</span>}
                </div>
              </button>
            </Link>
            <Link to="/admin/assignments" style={{ textDecoration: 'none', color: 'inherit', marginTop: '8px', display: 'block' }}>
              <button className={`sidebar-toggle-btn week-btn admin-btn ${location.pathname === '/admin/assignments' ? 'active' : ''}`}>
                <div className="btn-content">
                  <ClipboardCheck size={20} color="#00D1D1" />
                  {!isSidebarCollapsed && <span>Assignments</span>}
                </div>
              </button>
            </Link>
            
            {user?.role === 'superadmin' && (
              <Link to="/admin/audit" style={{ textDecoration: 'none', color: 'inherit', marginTop: '8px', display: 'block' }}>
                <button className={`sidebar-toggle-btn week-btn admin-btn ${location.pathname === '/admin/audit' ? 'active' : ''}`}>
                  <div className="btn-content">
                    <History size={20} color="#a855f7" />
                    {!isSidebarCollapsed && <span>Audit Protocol</span>}
                  </div>
                </button>
              </Link>
            )}
          </div>
        )}
        
        {!isAdminView && courseData.map((week, wIndex) => (
          <div key={week.weekId} className="week-item">
            <button 
              className="sidebar-toggle-btn week-btn"
              onClick={() => toggleWeek(week.weekId)}
            >
              <div className="btn-content">
                <Calendar size={20} color="var(--primary)" />
                {!isSidebarCollapsed && <span>{week.weekTitle}</span>}
              </div>
              {!isSidebarCollapsed && (expandedWeeks.includes(week.weekId) ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
            </button>

            {expandedWeeks.includes(week.weekId) && !isSidebarCollapsed && (
              <div className="days-list">
                {week.days.map((day, dIndex) => {
                  const unlocked = isDayUnlocked(wIndex, dIndex);
                  const status = getDayStatus(day.dayId);
                  
                  return (
                    <div 
                      key={day.dayId} 
                      className={`day-item ${!unlocked ? 'locked' : ''} ${status.isAccepted ? 'completed' : ''}`}
                    >
                      <button 
                        className="sidebar-toggle-btn day-btn"
                        onClick={() => unlocked && toggleDay(day.dayId)}
                        disabled={!unlocked}
                      >
                        <div className="btn-content">
                          {unlocked ? (
                            status.isAccepted ? <CheckCircle2 size={18} color="#16a34a" /> : <Clock size={18} />
                          ) : (
                            <Lock size={18} color="var(--text-neutral)" />
                          )}
                          {!isSidebarCollapsed && <span>{day.dayTitle}</span>}
                        </div>
                        {unlocked && !isSidebarCollapsed && (expandedDays.includes(day.dayId) ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
                      </button>

                      {unlocked && expandedDays.includes(day.dayId) && (
                        <div className="topics-list">
                          {day.topics.map((topic) => (
                            <button
                              key={topic.id}
                              className={`topic-btn ${selectedTopic.id === topic.id ? 'active' : ''}`}
                              onClick={() => {
                                setSelectedTopic(topic);
                                if (location.pathname !== '/') {
                                  navigate('/');
                                }
                              }}
                            >
                              <BookOpen size={16} />
                              {!isSidebarCollapsed && (
                                <span>
                                  {topic.isResources 
                                    ? (user?.role === 'admin' || user?.role === 'superadmin' ? 'Tutor Materials & Resources' : 'Resources & Materials') 
                                    : topic.title}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar {
          width: 320px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .admin-status { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
        .status-dot { width: 8px; height: 8px; background: #16a34a; border-radius: 50%; box-shadow: 0 0 8px rgba(22, 163, 74, 0.5); animation: pulse-green 2s infinite; }
        @keyframes pulse-green { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }
        
        .sidebar.collapsed {
          width: 72px;
        }
        .sidebar-header {
          padding: var(--space-3);
          border-bottom: 1px solid var(--app-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 85px;
        }
        .sidebar.collapsed .sidebar-header {
          justify-content: center;
          padding: var(--space-2) 0;
        }
        .collapse-toggle {
          background: transparent;
          border: none;
          color: var(--app-text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: var(--radius-sm);
          transition: var(--transition);
        }
        .day-item.locked { opacity: 0.6; cursor: not-allowed; }
        .day-item.completed { background: rgba(22, 163, 74, 0.08); border-radius: 8px; margin: 2px 0; }
        .day-item.completed .day-btn { color: #16a34a; font-weight: 600; }
        .day-btn:disabled { cursor: not-allowed; pointer-events: none; }
        
        .day-btn {
          padding: var(--space-2) var(--space-3);
          border-radius: var(--radius-sm);
          transition: var(--transition);
        }
        .day-btn:hover:not(:disabled) {
          background: var(--light-secondary);
        }
        .collapse-toggle:hover {
          background: var(--light-tertiary);
          color: var(--primary);
        }
        [data-theme='dark'] .collapse-toggle:hover {
          background: var(--dark-tertiary);
        }
        .sidebar-list {
          padding: var(--space-1);
          overflow-y: auto;
          flex: 1;
        }
        .sidebar.collapsed .sidebar-list {
          padding: var(--space-1) 4px;
        }
        .sidebar-toggle-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-2);
          background: transparent;
          border: none;
          color: var(--app-text);
          cursor: pointer;
          font-family: inherit;
          text-align: left;
          transition: var(--transition);
          border-radius: var(--radius-sm);
          margin-bottom: 2px;
        }
        .btn-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sidebar.collapsed .btn-content {
          justify-content: center;
          width: 100%;
        }
        .week-btn {
          font-weight: 600;
          font-size: 0.95rem;
          margin-top: var(--space-1);
        }
        .week-btn:hover {
          background: var(--light-tertiary);
        }
        [data-theme='dark'] .week-btn:hover {
          background: var(--dark-tertiary);
        }
        .day-btn {
          padding-left: var(--space-4);
          font-size: 0.875rem;
          color: var(--app-text-muted);
        }
        .sidebar.collapsed .day-btn {
          padding-left: var(--space-2);
        }
        .topics-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 4px 0 8px 48px;
        }
        .sidebar.collapsed .topics-list {
          padding: 4px 0;
        }
        .admin-btn.active {
          background: rgba(0, 209, 209, 0.1);
          color: #00D1D1;
          border-left: 3px solid #00D1D1;
          box-shadow: inset 4px 0 10px rgba(0, 209, 209, 0.05);
        }
        [data-theme='dark'] .admin-btn.active {
          background: rgba(0, 209, 209, 0.15);
          box-shadow: 0 0 15px rgba(0, 209, 209, 0.1);
        }
        
        .topic-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border: none;
          background: transparent;
          color: var(--text-neutral);
          cursor: pointer;
          font-size: 0.85rem;
          border-radius: var(--radius-sm);
          text-align: left;
          transition: var(--transition);
        }
        .sidebar.collapsed .topic-btn {
          justify-content: center;
        }
        .topic-btn:hover {
          background: rgba(0, 71, 171, 0.05);
          color: var(--primary);
        }
        .topic-btn.active {
          background: var(--brand-gradient);
          color: white;
          box-shadow: var(--shadow-sm);
        }
        [data-theme='dark'] .topic-btn.active {
          box-shadow: var(--glow);
        }
      `}} />
    </aside>
  );
};

export default Sidebar;
