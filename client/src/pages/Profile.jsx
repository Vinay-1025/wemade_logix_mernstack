import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { User, Shield, Award, Book, Clock, CheckCircle2, Flame, Calendar, Percent, Activity } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import { courseData } from '../data/mockData';
import axios from 'axios';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [userAssignments, setUserAssignments] = useState([]);
  const [allAssignments, setAllAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendanceStats, setAttendanceStats] = useState(null);
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [timeRange, setTimeRange] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const getNextMilestone = (streak) => {
    if (streak < 5) return 5;
    if (streak < 10) return 10;
    if (streak < 15) return 15;
    if (streak < 20) return 20;
    return streak + 5;
  };

  const getMilestoneProgress = (streak) => {
    const next = getNextMilestone(streak);
    const prev = next === 5 ? 0 : next - 5;
    const range = next - prev;
    const progress = streak - prev;
    return Math.min((progress / range) * 100, 100);
  };

  // Helper to generate days for heatmap (15 weeks = 105 days)
  const generateHeatmapDays = () => {
    const days = [];
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    
    const startDate = new Date(today);
    // Align with Sunday 14 weeks ago
    startDate.setDate(today.getDate() - 14 * 7 - currentDayOfWeek);
    
    const tempDate = new Date(startDate);
    // Generate up to today
    while (tempDate <= today) {
      days.push(new Date(tempDate));
      tempDate.setDate(tempDate.getDate() + 1);
    }
    
    // Pad to complete the final week's row
    while (days.length % 7 !== 0) {
      const nextDay = new Date(days[days.length - 1]);
      nextDay.setDate(nextDay.getDate() + 1);
      days.push(nextDay);
    }
    
    return days;
  };

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        if (user.role === 'admin' || user.role === 'superadmin') {
          const response = await axios.get('/api/assignments', {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          if (Array.isArray(response.data)) {
            setAllAssignments(response.data);
          }
        } else {
          const response = await axios.get('/api/assignments/my', {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          if (Array.isArray(response.data)) {
            setUserAssignments(response.data);
          }

          // Fetch attendance stats for student
          try {
            const attResponse = await axios.get('/api/attendance/stats', {
              headers: { 'Authorization': `Bearer ${user.token}` }
            });
            if (attResponse.data && attResponse.data.success) {
              setAttendanceStats(attResponse.data.stats);
            }
          } catch (err) {
            console.error('Failed to fetch attendance stats:', err);
          } finally {
            setAttendanceLoading(false);
          }
        }
        setLoading(false);
      } catch (e) {
        console.error('Failed to fetch assignments for profile:', e);
        setLoading(false);
        setAttendanceLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Compute student stats
  const studentSubmissions = userAssignments || [];
  const submittedCount = studentSubmissions.length;
  const acceptedCount = studentSubmissions.filter(a => a.status === 'accepted').length;
  
  // Total Days in Course
  const totalCourseDays = courseData.reduce((acc, w) => acc + w.days.length, 0);
  const progressPercent = Math.min(Math.round((acceptedCount / totalCourseDays) * 100), 100);

  // Helper to calculate progress for specific week numbers
  const getWeekProgress = (weekNums) => {
    const targetDays = courseData.filter(w => {
      const wNum = parseInt(w.weekId.replace('w', ''));
      return weekNums.includes(wNum);
    }).flatMap(w => w.days);
    
    if (targetDays.length === 0) return 0;
    
    let completedDays = 0;
    targetDays.forEach(d => {
      const hasAccepted = studentSubmissions.some(a => a.status === 'accepted' && d.topics.some(t => t.id === a.topicId));
      if (hasAccepted) completedDays++;
    });
    
    return Math.round((completedDays / targetDays.length) * 100);
  };

  const htmlCssProgress = getWeekProgress([1, 2]);
  const jsProgress = getWeekProgress([3, 4]);
  const reactProgress = getWeekProgress([5, 6]);
  const nodeProgress = getWeekProgress([7]);
  const mongoDbProgress = getWeekProgress([8]);
  const fullStackProgress = getWeekProgress([9, 10]);

  // Achievements
  const achievements = [
    {
      title: "Semantic HTML Specialist",
      desc: "Approved assignment in Week 1 (HTML Foundations).",
      earned: studentSubmissions.some(a => a.status === 'accepted' && (a.weekTitle?.toLowerCase().includes('week 1') || a.topicId?.startsWith('w1-d') || a.topicId?.startsWith('t'))),
      icon: "🏆"
    },
    {
      title: "CSS Layout Architect",
      desc: "Approved assignment in Week 2 (CSS Box Model & Grid).",
      earned: studentSubmissions.some(a => a.status === 'accepted' && (a.weekTitle?.toLowerCase().includes('week 2') || a.topicId?.startsWith('w2-d'))),
      icon: "🎨"
    },
    {
      title: "JS Logic Master",
      desc: "Approved assignment in Week 3 & 4 (JS & DOM).",
      earned: studentSubmissions.some(a => a.status === 'accepted' && (a.weekTitle?.toLowerCase().includes('week 3') || a.weekTitle?.toLowerCase().includes('week 4'))),
      icon: "⚡"
    },
    {
      title: "React UI Developer",
      desc: "Approved assignment in Week 5 & 6 (React Router & Hooks).",
      earned: studentSubmissions.some(a => a.status === 'accepted' && (a.weekTitle?.toLowerCase().includes('week 5') || a.weekTitle?.toLowerCase().includes('week 6'))),
      icon: "⚛️"
    },
    {
      title: "Node & Express Engineer",
      desc: "Approved assignment in Week 7 & 8 (Express & MongoDB).",
      earned: studentSubmissions.some(a => a.status === 'accepted' && (a.weekTitle?.toLowerCase().includes('week 7') || a.weekTitle?.toLowerCase().includes('week 8'))),
      icon: "💾"
    },
    {
      title: "Full-Stack Deployment Pro",
      desc: "Approved assignment in Week 9 & 10 (Production Launch).",
      earned: studentSubmissions.some(a => a.status === 'accepted' && (a.weekTitle?.toLowerCase().includes('week 9') || a.weekTitle?.toLowerCase().includes('week 10'))),
      icon: "🚀"
    }
  ];

  const earnedAchievementsCount = achievements.filter(a => a.earned).length;

  // Compute admin stats
  const gradedAssignments = allAssignments.filter(a => a.status !== 'pending');
  const pendingReviewsCount = allAssignments.filter(a => a.status === 'pending').length;
  const activeStudentsCount = new Set(allAssignments.map(a => a.student?._id || a.student?.email)).size;
  const approvalRate = gradedAssignments.length > 0 
    ? Math.round((gradedAssignments.filter(a => a.status === 'accepted').length / gradedAssignments.length) * 100) 
    : 0;
  const gradingProgress = allAssignments.length > 0 
    ? Math.round((gradedAssignments.length / allAssignments.length) * 100) 
    : 100;

  const recentSubmissions = [...allAssignments]
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    .slice(0, 5);

  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  return (
    <MainLayout showSidebar={!isAdmin}>
      <div className="profile-page">
        <div className="profile-hero">
          <div className="profile-cover"></div>
          <div className="profile-info-card">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-large">
                <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-blue)' }}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : <User size={48} />}
                </span>
              </div>
            </div>
            <div className="profile-details">
              <h1>{user?.name}</h1>
              <p className="profile-email">{user?.email}</p>
              <div className="profile-badges">
                <span className="badge role-badge">
                  {isAdmin ? <Shield size={14} /> : <User size={14} />}
                  {user?.role}
                </span>
                <span className="badge status-badge" style={{
                  background: isAdmin ? 'rgba(168, 85, 247, 0.08)' : '#f0fdf4',
                  color: isAdmin ? '#a855f7' : '#16a34a'
                }}>
                  {isAdmin ? 'Course Director' : 'Active Learner'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', fontSize: '1rem', color: 'var(--text-neutral)' }}>
            Loading profile information...
          </div>
        ) : (
          <div className="profile-content">
            {/* Sections */}
            <div className="profile-sections">
              {/* Account Details & Recent Work / Progress */}
              <div className="profile-section-card">
                <h2>Account Details</h2>
                <div className="detail-row">
                  <div className="detail-label">Full Name</div>
                  <div className="detail-value">{user?.name}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Email Address</div>
                  <div className="detail-value">{user?.email}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Member Since</div>
                  <div className="detail-value">May 2026</div>
                </div>
                
                {isAdmin ? (
                  <div style={{ marginTop: '24px', borderTop: '1px solid var(--light-tertiary)', paddingTop: '20px' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: '750', marginBottom: '12px', color: 'var(--text-primary)' }}>Grading Workload</h3>
                    <div className="progress-item" style={{ marginBottom: '8px' }}>
                      <div className="progress-label" style={{ fontSize: '0.8rem' }}>
                        <span>Queue Progress</span>
                        <span>{gradingProgress}%</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${gradingProgress}%`, background: 'var(--brand-gradient)' }}></div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-neutral)' }}>
                      <span>Approval Rate: <strong>{approvalRate}%</strong></span>
                      <span>Total Queue: <strong>{allAssignments.length}</strong></span>
                    </div>
                  </div>
                ) : (
                  <div style={{ marginTop: '24px', borderTop: '1px solid var(--light-tertiary)', paddingTop: '20px' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: '750', marginBottom: '12px', color: 'var(--text-primary)' }}>Syllabus Completion</h3>
                    <div className="progress-item" style={{ marginBottom: '8px' }}>
                      <div className="progress-label" style={{ fontSize: '0.8rem' }}>
                        <span>Course Completion</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${progressPercent}%`, background: 'var(--brand-gradient)' }}></div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-neutral)' }}>
                      <span>Graduation Target: <strong>Day 45</strong></span>
                      <span>Approved: <strong>{acceptedCount} Days</strong></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Progress Bars or Recent Submissions / Badges */}
              <div className="profile-section-card">
                {isAdmin ? (
                  <>
                    <h2>Recent Student Activity</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {recentSubmissions.length === 0 ? (
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-neutral)', fontStyle: 'italic' }}>No student activity recorded yet.</p>
                      ) : (
                        recentSubmissions.map((sub, idx) => (
                          <div key={sub._id || idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--light-secondary)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--light-tertiary)' }}>
                            <div style={{ minWidth: 0, flex: 1, paddingRight: '8px' }}>
                              <strong style={{ fontSize: '0.85rem', display: 'block', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {sub.student?.name}
                              </strong>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-neutral)' }}>
                                {sub.topicTitle}
                              </span>
                            </div>
                            <span style={{
                              fontSize: '0.7rem',
                              fontWeight: '700',
                              textTransform: 'uppercase',
                              padding: '4px 8px',
                              borderRadius: '8px',
                              background: sub.status === 'accepted' ? '#f0fdf4' : sub.status === 'rejected' ? '#fef2f2' : '#fffbeb',
                              color: sub.status === 'accepted' ? '#16a34a' : sub.status === 'rejected' ? '#dc2626' : '#d97706'
                            }}>
                              {sub.status}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <h2>Technology Mastery</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div className="progress-item">
                        <div className="progress-label">
                          <span>HTML & CSS Foundations</span>
                          <span>{htmlCssProgress}%</span>
                        </div>
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: `${htmlCssProgress}%` }}></div>
                        </div>
                      </div>
                      <div className="progress-item">
                        <div className="progress-label">
                          <span>JavaScript Programming</span>
                          <span>{jsProgress}%</span>
                        </div>
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: `${jsProgress}%` }}></div>
                        </div>
                      </div>
                      <div className="progress-item">
                        <div className="progress-label">
                          <span>React Frontend Development</span>
                          <span>{reactProgress}%</span>
                        </div>
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: `${reactProgress}%` }}></div>
                        </div>
                      </div>
                      <div className="progress-item">
                        <div className="progress-label">
                          <span>Node.js & Express APIs</span>
                          <span>{nodeProgress}%</span>
                        </div>
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: `${nodeProgress}%` }}></div>
                        </div>
                      </div>
                      <div className="progress-item">
                        <div className="progress-label">
                          <span>MongoDB & Databases</span>
                          <span>{mongoDbProgress}%</span>
                        </div>
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: `${mongoDbProgress}%` }}></div>
                        </div>
                      </div>
                      <div className="progress-item">
                        <div className="progress-label">
                          <span>Full-Stack Projects & Deployment</span>
                          <span>{fullStackProgress}%</span>
                        </div>
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: `${fullStackProgress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Attendance Analytics & Heatmap Section */}
            {!isAdmin && !attendanceLoading && attendanceStats && (
              <div className="profile-section-card attendance-analytics-card" style={{ gridColumn: 'span 2', marginTop: '24px' }}>
                <div className="attendance-header">
                  <h2 style={{ margin: 0 }}>Attendance Analytics & Streaks</h2>
                  <div className="hover-tooltip-display">
                    {hoveredCell ? (
                      <span className="tooltip-text fade-in">
                        {hoveredCell.dateLabel} • <strong style={{ 
                          color: hoveredCell.status === 'attended' ? '#10b981' : hoveredCell.status === 'missed' ? '#ef4444' : 'var(--text-neutral)' 
                        }}>
                          {hoveredCell.status === 'attended' ? 'Attended' : hoveredCell.status === 'missed' ? 'Missed' : 'No Class'}
                        </strong>
                      </span>
                    ) : (
                      <span className="tooltip-text-placeholder">Hover over a square to view details</span>
                    )}
                  </div>
                </div>

                {/* Stat Grid */}
                <div className="attendance-stats-grid">
                  {/* Attendance Rate (Circular SVG) */}
                  <div className="att-stat-item rate-stat-card">
                    <div className="radial-progress-container">
                      <svg width="56" height="56" viewBox="0 0 44 44" className="circular-progress">
                        <circle cx="22" cy="22" r="18" fill="none" stroke="var(--light-tertiary)" strokeWidth="3" />
                        <circle cx="22" cy="22" r="18" fill="none" stroke="url(#progressGrad)" strokeWidth="3" 
                                strokeDasharray="113" strokeDashoffset={113 - (113 * attendanceStats.attendancePercentage) / 100}
                                strokeLinecap="round" transform="rotate(-90 22 22)" />
                        <defs>
                          <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0ea5e9" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="radial-progress-value">{attendanceStats.attendancePercentage}%</div>
                    </div>
                    <div className="att-stat-details">
                      <h3>Rate</h3>
                      <p>Attendance Rate</p>
                      <span className={`att-badge ${
                        attendanceStats.attendancePercentage >= 90 ? 'badge-excellent' : 
                        attendanceStats.attendancePercentage >= 75 ? 'badge-warning' : 'badge-danger'
                      }`}>
                        {attendanceStats.attendancePercentage >= 90 ? 'Excellent' : 
                         attendanceStats.attendancePercentage >= 75 ? 'On Track' : 'Low Attendance'}
                      </span>
                    </div>
                  </div>

                  {/* Current Streak with Milestones */}
                  <div className="att-stat-item streak-stat-card">
                    <div className={`att-stat-icon-wrapper flame-icon ${attendanceStats.currentStreak > 0 ? 'glowing-flame' : ''}`}>
                      <Flame size={20} />
                    </div>
                    <div className="att-stat-details" style={{ flex: 1, minWidth: 0 }}>
                      <h3>{attendanceStats.currentStreak} Days</h3>
                      <p>Current Streak</p>
                      <div className="streak-milestone-wrapper">
                        {attendanceStats.currentStreak > 0 ? (
                          <>
                            <div className="streak-progress-label">
                              <span>Next milestone: {getNextMilestone(attendanceStats.currentStreak)} Days</span>
                            </div>
                            <div className="streak-progress-bg">
                              <div className="streak-progress-fill" style={{ width: `${getMilestoneProgress(attendanceStats.currentStreak)}%` }}></div>
                            </div>
                          </>
                        ) : (
                          <span className="att-badge-streak" style={{ color: 'var(--text-neutral)', fontSize: '0.7rem' }}>
                            Scan QR to start!
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Max Streak */}
                  <div className="att-stat-item">
                    <div className="att-stat-icon-wrapper award-icon">
                      <Award size={20} />
                    </div>
                    <div className="att-stat-details">
                      <h3>{attendanceStats.maxStreak} Days</h3>
                      <p>Max Streak Record</p>
                      <span className="att-badge-neutral">Personal Best</span>
                    </div>
                  </div>

                  {/* Total Presence */}
                  <div className="att-stat-item">
                    <div className="att-stat-icon-wrapper calendar-icon">
                      <Calendar size={20} />
                    </div>
                    <div className="att-stat-details">
                      <h3>{attendanceStats.attendedCount} / {attendanceStats.totalSessions}</h3>
                      <p>Sessions Attended</p>
                      <span className="att-badge-neutral">Classes Held</span>
                    </div>
                  </div>
                </div>

                {/* Heatmap Filters & Headers */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '32px', marginBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '750', margin: '0 0 4px 0', color: 'var(--text-primary)' }}>Attendance Heatmap</h3>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-neutral)' }}>Interactive calendar tracking your attendance over the past 15 weeks.</p>
                  </div>
                  
                  {/* Heatmap Filters */}
                  <div className="heatmap-filters">
                    <div className="filter-group">
                      <span className="filter-label">Timeframe</span>
                      <div className="filter-buttons">
                        <button className={`filter-btn ${timeRange === 'all' ? 'active' : ''}`} onClick={() => setTimeRange('all')}>15W</button>
                        <button className={`filter-btn ${timeRange === '90' ? 'active' : ''}`} onClick={() => setTimeRange('90')}>90D</button>
                        <button className={`filter-btn ${timeRange === '60' ? 'active' : ''}`} onClick={() => setTimeRange('60')}>60D</button>
                        <button className={`filter-btn ${timeRange === '30' ? 'active' : ''}`} onClick={() => setTimeRange('30')}>30D</button>
                      </div>
                    </div>
                    <div className="filter-group">
                      <span className="filter-label">Status</span>
                      <div className="filter-buttons">
                        <button className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>All</button>
                        <button className={`filter-btn ${statusFilter === 'attended' ? 'active' : ''}`} onClick={() => setStatusFilter('attended')}>Attended</button>
                        <button className={`filter-btn ${statusFilter === 'missed' ? 'active' : ''}`} onClick={() => setStatusFilter('missed')}>Missed</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Heatmap Layout */}
                <div className="heatmap-container">
                  <div className="day-labels">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>

                  <div className="heatmap-grid-scroll-wrapper">
                    <div className="heatmap-grid">
                      {generateHeatmapDays().map((day, idx) => {
                        const dateStr = day.toLocaleDateString('en-CA');
                        const status = attendanceStats.heatmapData[dateStr] || 'none';
                        const isFuture = day > new Date();
                        const dateLabel = day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

                        // Apply Filters
                        const today = new Date();
                        const diffTime = Math.abs(today - day);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        
                        let isFilteredByTime = false;
                        if (timeRange === '30' && diffDays > 30) isFilteredByTime = true;
                        if (timeRange === '60' && diffDays > 60) isFilteredByTime = true;
                        if (timeRange === '90' && diffDays > 90) isFilteredByTime = true;

                        let isFilteredByStatus = false;
                        if (statusFilter === 'attended' && status !== 'attended') isFilteredByStatus = true;
                        if (statusFilter === 'missed' && status !== 'missed') isFilteredByStatus = true;

                        const isDimmed = isFilteredByTime || isFilteredByStatus;

                        return (
                          <div
                            key={idx}
                            className={`heatmap-cell cell-${status} ${isFuture ? 'cell-future' : ''} ${isDimmed ? 'cell-dimmed' : ''}`}
                            style={{
                              gridRow: (day.getDay() + 1),
                            }}
                            onMouseEnter={() => setHoveredCell({ dateLabel, status })}
                            onMouseLeave={() => setHoveredCell(null)}
                            title={`${dateLabel}: ${status === 'attended' ? 'Attended' : status === 'missed' ? 'Missed' : 'No Class'}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Heatmap Legend */}
                <div className="heatmap-legend">
                  <span>Less</span>
                  <div className="legend-cell cell-none"></div>
                  <div className="legend-cell cell-missed"></div>
                  <div className="legend-cell cell-attended"></div>
                  <span>More</span>
                  <div className="legend-labels" style={{ marginLeft: '12px', fontSize: '0.75rem', color: 'var(--text-neutral)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <span>⬜ No Class</span>
                    <span>🟥 Missed Class</span>
                    <span>🟩 Attended Class</span>
                  </div>
                </div>
              </div>
            )}

            {/* Certificate Status Section */}
            {!isAdmin && (
              <div 
                className="profile-section-card" 
                style={{ 
                  marginTop: '24px', 
                  gridColumn: 'span 2', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  minHeight: '160px', 
                  border: '1px dashed var(--light-tertiary)', 
                  background: 'var(--light-secondary)', 
                  textAlign: 'center', 
                  flexDirection: 'column', 
                  gap: '12px' 
                }}
              >
                <div style={{ padding: '16px', background: 'white', borderRadius: '50%', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <span style={{ fontSize: '1.8rem' }}>🔒</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0 0 4px 0', color: 'var(--text-primary)' }}>Certificate of Completion</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-neutral)' }}>Complete all course modules to unlock your official MERN Stack Certification.</p>
                </div>
              </div>
            )}
          </div>
        )}

        <style dangerouslySetInnerHTML={{ __html: `
          .profile-page {
            padding: 40px;
            max-width: 1100px;
            margin: 0 auto;
            animation: fadeIn 0.5s ease;
          }
          .profile-hero {
            position: relative;
            margin-bottom: 80px;
          }
          .profile-cover {
            height: 160px;
            background: var(--brand-gradient);
            border-radius: 24px;
            opacity: 0.15;
          }
          .profile-info-card {
            position: absolute;
            bottom: -40px;
            left: 40px;
            display: flex;
            align-items: flex-end;
            gap: 24px;
          }
          .profile-avatar-wrapper {
            background: white;
            padding: 6px;
            border-radius: 28px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          }
          .profile-avatar-large {
            width: 100px;
            height: 100px;
            background: var(--light-secondary);
            border-radius: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary-blue);
          }
          .profile-details h1 {
            font-size: 2rem;
            font-weight: 800;
            color: var(--text-primary);
            margin: 0 0 4px 0;
          }
          .profile-email {
            color: var(--text-neutral);
            margin-bottom: 12px;
          }
          .profile-badges {
            display: flex;
            gap: 8px;
          }
          .badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 6px;
            text-transform: uppercase;
          }
          .role-badge {
            background: rgba(0, 71, 171, 0.1);
            color: var(--primary-blue);
          }
          .status-badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
          }
          
          .profile-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            margin-bottom: 40px;
          }
          .stat-card {
            background: white;
            padding: 24px;
            border-radius: 20px;
            border: 1px solid var(--light-tertiary);
            display: flex;
            align-items: center;
            gap: 16px;
          }
          .stat-card svg {
            color: var(--primary-blue);
          }
          .stat-info h3 {
            font-size: 1.5rem;
            font-weight: 800;
            margin: 0;
            color: var(--text-primary);
          }
          .stat-info p {
            font-size: 0.85rem;
            color: var(--text-neutral);
            margin: 0;
          }

          .profile-sections {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
          .profile-section-card {
            background: white;
            padding: 32px;
            border-radius: 24px;
            border: 1px solid var(--light-tertiary);
          }
          .profile-section-card h2 {
            font-size: 1.25rem;
            font-weight: 800;
            margin-bottom: 24px;
            color: var(--text-primary);
          }
          .detail-row {
            margin-bottom: 16px;
            border-bottom: 1px solid var(--light-secondary);
            padding-bottom: 10px;
          }
          .detail-row:last-of-type {
            border-bottom: none;
            padding-bottom: 0;
          }
          .detail-label {
            font-size: 0.85rem;
            color: var(--text-neutral);
            margin-bottom: 4px;
          }
          .detail-value {
            font-weight: 600;
            color: var(--text-primary);
          }

          .progress-item {
            margin-bottom: 20px;
          }
          .progress-item:last-of-type {
            margin-bottom: 0;
          }
          .progress-label {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 8px;
            color: var(--text-secondary);
          }
          .progress-bar-bg {
            height: 8px;
            background: var(--light-secondary);
            border-radius: 4px;
            overflow: hidden;
          }
          .progress-bar-fill {
            height: 100%;
            background: var(--brand-gradient);
            border-radius: 4px;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media (max-width: 768px) {
            .profile-stats, .profile-sections {
              grid-template-columns: 1fr;
            }
            .profile-info-card {
              flex-direction: column;
              align-items: center;
              left: 50%;
              transform: translateX(-50%);
              text-align: center;
            }
            .profile-hero {
              margin-bottom: 140px;
            }
          }

          /* Attendance Analytics Styles */
          .attendance-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
            flex-wrap: wrap;
            gap: 12px;
          }
          .hover-tooltip-display {
            background: var(--light-secondary);
            padding: 6px 16px;
            border-radius: 12px;
            font-size: 0.8rem;
            color: var(--text-secondary);
            border: 1px solid var(--light-tertiary);
            min-height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 200px;
          }
          .tooltip-text {
            color: var(--text-primary);
            font-weight: 500;
          }
          .tooltip-text-placeholder {
            color: var(--text-neutral);
            font-style: italic;
          }
          .attendance-stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
          .att-stat-item {
            background: var(--light-secondary);
            border: 1px solid var(--light-tertiary);
            padding: 20px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            gap: 16px;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .att-stat-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.02);
          }
          .att-stat-icon-wrapper {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          /* Radial Progress Styles */
          .radial-progress-container {
            position: relative;
            width: 56px;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          .circular-progress {
            width: 100%;
            height: 100%;
          }
          .radial-progress-value {
            position: absolute;
            font-size: 0.8rem;
            font-weight: 800;
            color: var(--text-primary);
          }

          /* Streak Milestone Styles */
          .streak-milestone-wrapper {
            margin-top: 6px;
            width: 100%;
          }
          .streak-progress-label {
            font-size: 0.65rem;
            font-weight: 700;
            color: #f97316;
            margin-bottom: 4px;
            display: flex;
            justify-content: space-between;
          }
          .streak-progress-bg {
            height: 5px;
            background: rgba(0, 0, 0, 0.06);
            border-radius: 3px;
            overflow: hidden;
            width: 100%;
          }
          .streak-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #ff6b6b, #ffbe0b);
            border-radius: 3px;
            transition: width 0.3s ease;
          }

          /* Filters Styles */
          .heatmap-filters {
            display: flex;
            gap: 12px;
            background: rgba(0, 0, 0, 0.02);
            padding: 4px;
            border-radius: 12px;
            border: 1px solid var(--light-tertiary);
            flex-wrap: wrap;
          }
          .filter-group {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .filter-label {
            font-size: 0.65rem;
            font-weight: 800;
            color: var(--text-neutral);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding-left: 6px;
          }
          .filter-buttons {
            display: flex;
            background: rgba(0, 0, 0, 0.03);
            padding: 2px;
            border-radius: 8px;
            gap: 1px;
          }
          .filter-btn {
            border: none;
            background: transparent;
            padding: 4px 10px;
            font-size: 0.7rem;
            font-weight: 700;
            color: var(--text-secondary);
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.15s ease;
          }
          .filter-btn:hover {
            color: var(--text-primary);
          }
          .filter-btn.active {
            background: white;
            color: var(--text-primary);
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
          }

          .percent-icon {
            background: rgba(14, 165, 233, 0.1);
            color: #0ea5e9;
          }
          .flame-icon {
            background: rgba(249, 115, 22, 0.1);
            color: #f97316;
          }
          .flame-icon.glowing-flame {
            background: linear-gradient(135deg, #ff6b6b, #ffbe0b);
            color: white;
            animation: pulse 1.5s infinite alternate;
          }
          .award-icon {
            background: rgba(168, 85, 247, 0.1);
            color: #a855f7;
          }
          .calendar-icon {
            background: rgba(16, 185, 129, 0.1);
            color: #10b981;
          }
          .att-stat-details h3 {
            font-size: 1.25rem;
            font-weight: 800;
            margin: 0 0 2px 0;
            color: var(--text-primary);
          }
          .att-stat-details p {
            font-size: 0.8rem;
            color: var(--text-neutral);
            margin: 0 0 6px 0;
          }
          .att-badge {
            font-size: 0.7rem;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 6px;
            text-transform: uppercase;
          }
          .badge-excellent {
            background: #f0fdf4;
            color: #16a34a;
          }
          .badge-warning {
            background: #fffbeb;
            color: #d97706;
          }
          .badge-danger {
            background: #fef2f2;
            color: #dc2626;
          }
          .att-badge-streak {
            font-size: 0.7rem;
            font-weight: 700;
          }
          .att-badge-neutral {
            font-size: 0.7rem;
            font-weight: 600;
            color: var(--text-neutral);
          }
          
          /* Heatmap styles */
          .heatmap-container {
            display: flex;
            gap: 12px;
            margin-top: 16px;
            background: var(--light-secondary);
            border: 1px solid var(--light-tertiary);
            padding: 20px;
            border-radius: 20px;
          }
          .day-labels {
            display: grid;
            grid-template-rows: repeat(7, 14px);
            gap: 4px;
            font-size: 0.7rem;
            color: var(--text-neutral);
            align-items: center;
            user-select: none;
            padding-top: 2px;
          }
          .heatmap-grid-scroll-wrapper {
            overflow-x: auto;
            flex: 1;
          }
          .heatmap-grid {
            display: grid;
            grid-template-rows: repeat(7, 14px);
            grid-auto-flow: column;
            gap: 4px;
            width: max-content;
          }
          .heatmap-cell {
            width: 14px;
            height: 14px;
            border-radius: 3px;
            background: rgba(0, 0, 0, 0.04);
            transition: transform 0.15s ease, background 0.2s ease, opacity 0.2s ease;
            cursor: pointer;
          }
          .heatmap-cell:hover {
            transform: scale(1.25);
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            z-index: 10;
          }
          .heatmap-cell.cell-attended {
            background: #10b981;
          }
          .heatmap-cell.cell-missed {
            background: #ef4444;
          }
          .heatmap-cell.cell-future {
            opacity: 0.2;
            cursor: default;
            pointer-events: none;
          }
          .heatmap-cell.cell-dimmed {
            opacity: 0.06;
            transform: scale(0.85);
            pointer-events: none;
          }
          .heatmap-legend {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 6px;
            margin-top: 12px;
            font-size: 0.75rem;
            color: var(--text-neutral);
          }
          .legend-cell {
            width: 10px;
            height: 10px;
            border-radius: 2px;
          }
          .legend-cell.cell-none {
            background: rgba(0, 0, 0, 0.04);
          }
          .legend-cell.cell-missed {
            background: #ef4444;
          }
          .legend-cell.cell-attended {
            background: #10b981;
          }

          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4); }
            100% { transform: scale(1.05); box-shadow: 0 0 10px 4px rgba(249, 115, 22, 0); }
          }
          
          @media (max-width: 1024px) {
            .attendance-stats-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 600px) {
            .attendance-stats-grid {
              grid-template-columns: 1fr;
            }
          }
        `}} />
      </div>
    </MainLayout>
  );
};

export default Profile;
