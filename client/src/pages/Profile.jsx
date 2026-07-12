import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { User, Shield, Award, Book, Clock, CheckCircle2, Flame, Calendar, Percent, Activity } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import { courseData } from '../data/mockData';
import { QRCodeSVG } from 'qrcode.react';
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
  const [latestProfile, setLatestProfile] = useState(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const generationSteps = [
    { text: "Analyzing course progress & module submissions...", percent: 15 },
    { text: "Verifying attendance logs & class overrides...", percent: 35 },
    { text: "Securing student identity & matching credentials...", percent: 60 },
    { text: "Injecting SHA-256 cryptographic trust signature...", percent: 85 },
    { text: "Assembling official digital MERN Stack Certificate...", percent: 100 }
  ];

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
    // Create UTC midnight for today
    const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    const currentDayOfWeek = todayUTC.getUTCDay();

    const startDate = new Date(todayUTC.getTime());
    startDate.setUTCDate(todayUTC.getUTCDate() - 14 * 7 - currentDayOfWeek);

    const tempDate = new Date(startDate.getTime());
    // Generate up to today
    while (tempDate <= todayUTC) {
      days.push(new Date(tempDate.getTime()));
      tempDate.setUTCDate(tempDate.getUTCDate() + 1);
    }

    // Pad to complete the final week's row
    while (days.length % 7 !== 0) {
      const nextDay = new Date(days[days.length - 1].getTime());
      nextDay.setUTCDate(nextDay.getUTCDate() + 1);
      days.push(nextDay);
    }

    return days;
  };

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        let isMLStudent = user.course === 'ml';
        // Fetch latest profile status (override, certificateId)
        try {
          const profileRes = await axios.get('/api/auth/profile', {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          setLatestProfile(profileRes.data);
          if (profileRes.data && profileRes.data.course) {
            isMLStudent = profileRes.data.course === 'ml';
          }
        } catch (err) {
          console.error('Failed to fetch latest profile info:', err);
        }

        if (user.role === 'admin' || user.role === 'superadmin') {
          const response = await axios.get('/api/assignments', {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          if (Array.isArray(response.data)) {
            setAllAssignments(response.data);
          }
        } else if (!isMLStudent) {
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
        } else {
          setAttendanceLoading(false);
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

  useEffect(() => {
    if (isGenerating && generationStep === generationSteps.length - 1 && imageLoaded) {
      const timeout = setTimeout(() => {
        setIsGenerating(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isGenerating, generationStep, imageLoaded, generationSteps.length]);

  const startGeneration = () => {
    setIsGenerating(true);
    setIsCertificateOpen(true);
    setGenerationStep(0);
    setImageLoaded(false);

    // Preload background template image
    const img = new Image();
    const isML = user?.course === 'ml' || latestProfile?.course === 'ml';
    img.src = isML ? '/Wemade-ML-Certificate1.png' : '/Certificate_template_enhanced.png';
    img.onload = () => {
      setImageLoaded(true);
    };

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < generationSteps.length) {
        setGenerationStep(currentStep);
      } else {
        clearInterval(interval);
      }
    }, 600);
  };

  const handleDownloadImage = () => {
    const img = new Image();
    const isML = user?.course === 'ml' || latestProfile?.course === 'ml';
    img.src = isML ? '/Wemade-ML-Certificate1.png' : '/Certificate_template_enhanced.png';
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(img, 0, 0);

      const nameX = canvas.width * 0.5;
      const nameY = isML ? canvas.height * 0.425 : canvas.height * 0.455;
      const baseFontSize = Math.round(canvas.width * 0.038);
      const studentName = user?.name || '';
      const nameFontSize = studentName.length > 20
        ? Math.max(Math.round(baseFontSize * (20 / studentName.length)), Math.round(canvas.width * 0.022))
        : baseFontSize;
      ctx.font = `bold ${nameFontSize}px "Georgia", "Times New Roman", serif`;
      ctx.fillStyle = '#1a1a1a';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(studentName, nameX, nameY);

      // Preload Trainer Signature
      const signImg = new Image();
      signImg.src = '/sign.png';
      signImg.crossOrigin = 'anonymous';
      signImg.onload = () => {
        const svgEl = document.getElementById('certificate-qr-svg');
        if (svgEl) {
          const svgString = new XMLSerializer().serializeToString(svgEl);
          const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
          const URL = window.URL || window.webkitURL || window;
          const blobURL = URL.createObjectURL(svgBlob);
          const qrImg = new Image();
          qrImg.src = blobURL;
          qrImg.onload = () => {
            // Draw signature
            const signWidth = canvas.width * 0.100;
            const signHeight = canvas.height * 0.093;
            const signX = canvas.width * 0.055;
            const signY = isML ? canvas.height * 0.826 : canvas.height * 0.835;
            ctx.drawImage(signImg, signX, signY, signWidth, signHeight);

            // Draw Trainer Signature Title
            const signTitleFontSize = Math.round(canvas.width * 0.009);
            ctx.font = `bold ${signTitleFontSize}px "Inter", -apple-system, sans-serif`;
            ctx.fillStyle = '#235cbe';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText("Trainer Signature", canvas.width * 0.105, canvas.height * 0.910);

            // Draw QR code
            const qrWidthPercent = 0.0737;
            const qrHeightPercent = 0.1044;
            const qrWidth = canvas.width * qrWidthPercent;
            const qrHeight = canvas.height * qrHeightPercent;
            const qrX = canvas.width * 0.8536 - qrWidth / 2;
            const qrY = canvas.height * 0.7434 - qrHeight / 2;

            ctx.drawImage(qrImg, qrX, qrY, qrWidth, qrHeight);

            // Draw certificate details (Duration, Mode, Date, ID) on the high-res download canvas
            const detailsFontSize = Math.round(canvas.width * 0.011);
            ctx.fillStyle = '#1a1a1a';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const detailsY = isML ? canvas.height * 0.776 : canvas.height * 0.785;

            // Draw Duration
            ctx.font = `bold ${detailsFontSize}px "Inter", -apple-system, sans-serif`;
            ctx.fillText("45 Days", canvas.width * 0.1430, detailsY);

            // Draw Mode
            ctx.font = `bold ${detailsFontSize}px "Inter", -apple-system, sans-serif`;
            ctx.fillText("Online", canvas.width * 0.3440, detailsY);

            // Draw Date of Issue
            ctx.font = `bold ${detailsFontSize}px "Inter", -apple-system, sans-serif`;
            const issueDateStr = latestProfile?.certificateIssueDate
              ? new Date(latestProfile.certificateIssueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
              : new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            ctx.fillText(issueDateStr, canvas.width * 0.5036, detailsY);

            // Draw Certificate ID
            ctx.font = `bold ${detailsFontSize}px "Inter", -apple-system, sans-serif`;
            ctx.fillText(certificateId, canvas.width * 0.7000, detailsY);

            const formattedName = (user?.name || 'student').trim().replace(/\s+/g, '_').toLowerCase();
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `${formattedName}_wemade_${isML ? 'ml' : 'mernstack'}_certificate.png`;
            link.href = dataUrl;
            link.click();

            URL.revokeObjectURL(blobURL);
          };
        }
      };
    };
  };

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
      if (!w.weekId.startsWith('w')) return false;
      const wNum = parseInt(w.weekId.replace('w', ''), 10);
      return !isNaN(wNum) && weekNums.includes(wNum);
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
  const override = latestProfile?.certificateOverride;
  const finalProjectSubmitted = studentSubmissions?.find(a => a.topicId === 'final-project-topic');
  const finalProjectAccepted = finalProjectSubmitted?.status === 'accepted';
  const isML = user?.course === 'ml' || latestProfile?.course === 'ml';
  const isUnlocked = override === 'unlocked' || (override !== 'locked' && (isML || (progressPercent >= 100 && finalProjectAccepted))) || previewMode;
  const certificateId = latestProfile?.certificateId || `WM-${user?._id}-invalid`;

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
            <div className="profile-sections" style={{ gridTemplateColumns: isAdmin ? '1fr 1fr' : '1fr' }}>
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
                ) : isML ? null : (
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
              {isAdmin && (
                <div className="profile-section-card">
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
                </div>
              )}
            </div>

            {/* Attendance Analytics & Heatmap Section */}
            {!isAdmin && !isML && !attendanceLoading && attendanceStats && (
              <div className="profile-section-card attendance-analytics-card" style={{ gridColumn: 'span 2', marginTop: '24px' }}>
                <div className="attendance-header">
                  <h2 style={{ margin: 0 }}>Attendance Analytics & Streaks</h2>
                  <div className="hover-tooltip-display">
                    {hoveredCell ? (
                      <span className="tooltip-text fade-in">
                        {hoveredCell.dateLabel} • <strong style={{
                          color: hoveredCell.status === 'live' || hoveredCell.status === 'attended' ? '#10b981' :
                            hoveredCell.status === 'recording' ? '#0ea5e9' :
                              hoveredCell.status === 'missed' ? '#ef4444' :
                                hoveredCell.status === 'cancelled' ? '#d97706' : 'var(--text-neutral)'
                        }}>
                          {hoveredCell.status === 'live' ? 'Attended (Live)' :
                            hoveredCell.status === 'recording' ? 'Attended (Recording)' :
                              hoveredCell.status === 'attended' ? 'Attended' :
                                hoveredCell.status === 'missed' ? 'Missed' :
                                  hoveredCell.status === 'cancelled' ? `Cancelled: ${hoveredCell.reason || 'Cancelled'}` : 'No Class'}
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
                      <p>{attendanceStats.attendedCount} / {attendanceStats.totalSessions} Present</p>
                      <span className={`att-badge ${attendanceStats.attendancePercentage >= 90 ? 'badge-excellent' :
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

                  {/* Live Sessions */}
                  <div className="att-stat-item">
                    <div className="att-stat-icon-wrapper calendar-icon">
                      <CheckCircle2 size={20} />
                    </div>
                    <div className="att-stat-details">
                      <h3>{attendanceStats.liveCount || 0} / {attendanceStats.totalSessions}</h3>
                      <p>Live Sessions</p>
                      <span className="att-badge badge-excellent" style={{ fontSize: '0.65rem' }}>Live Check-ins</span>
                    </div>
                  </div>

                  {/* Recordings Watched */}
                  <div className="att-stat-item">
                    <div className="att-stat-icon-wrapper percent-icon">
                      <Clock size={20} />
                    </div>
                    <div className="att-stat-details">
                      <h3>{attendanceStats.recordingCount || 0} Sessions</h3>
                      <p>Recordings Watched</p>
                      <span className="att-badge" style={{ background: 'rgba(14, 165, 233, 0.08)', color: '#0ea5e9', fontSize: '0.65rem' }}>Portal Study</span>
                    </div>
                  </div>
                </div>

                {/* Heatmap Filters & Headers */}
                <div className="heatmap-header-container">
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
                        <button className={`filter-btn ${statusFilter === 'cancelled' ? 'active' : ''}`} onClick={() => setStatusFilter('cancelled')}>Cancelled</button>
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
                        const yyyy = day.getUTCFullYear();
                        const mm = String(day.getUTCMonth() + 1).padStart(2, '0');
                        const dd = String(day.getUTCDate()).padStart(2, '0');
                        const dateStr = `${yyyy}-${mm}-${dd}`;
                        const status = attendanceStats.heatmapData[dateStr] || 'none';

                        const today = new Date();
                        const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
                        const isFuture = day.getTime() > todayUTC.getTime();
                        const dateLabel = day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

                        // Apply Filters
                        const diffTime = Math.abs(todayUTC.getTime() - day.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        let isFilteredByTime = false;
                        if (timeRange === '30' && diffDays > 30) isFilteredByTime = true;
                        if (timeRange === '60' && diffDays > 60) isFilteredByTime = true;
                        if (timeRange === '90' && diffDays > 90) isFilteredByTime = true;

                        let isFilteredByStatus = false;
                        if (statusFilter === 'attended' && status !== 'live' && status !== 'recording') isFilteredByStatus = true;
                        if (statusFilter === 'missed' && status !== 'missed') isFilteredByStatus = true;
                        if (statusFilter === 'cancelled' && status !== 'cancelled') isFilteredByStatus = true;

                        const isDimmed = isFilteredByTime || isFilteredByStatus;

                        return (
                          <div
                            key={idx}
                            className={`heatmap-cell cell-${status} ${isFuture ? 'cell-future' : ''} ${isDimmed ? 'cell-dimmed' : ''}`}
                            style={{
                              gridRow: (day.getUTCDay() + 1),
                            }}
                            onMouseEnter={() => setHoveredCell({ dateLabel, status, reason: attendanceStats.cancelledReasons?.[dateStr] || '' })}
                            onMouseLeave={() => setHoveredCell(null)}
                            title={`${dateLabel}: ${status === 'live' ? 'Attended (Live)' :
                              status === 'recording' ? 'Attended (Recording)' :
                                status === 'attended' ? 'Attended' :
                                  status === 'missed' ? 'Missed' :
                                    status === 'cancelled' ? `Cancelled: ${attendanceStats.cancelledReasons?.[dateStr] || 'Cancelled'}` : 'No Class'
                              }`}
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
                  <div className="legend-cell cell-cancelled"></div>
                  <div className="legend-cell cell-missed"></div>
                  <div className="legend-cell cell-live"></div>
                  <div className="legend-cell cell-recording"></div>
                  <span>More</span>
                  <div className="legend-labels" style={{ marginLeft: '12px', fontSize: '0.75rem', color: 'var(--text-neutral)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <span>⬜ No Class</span>
                    <span>🟨 Session Cancelled</span>
                    <span>🟥 Missed Class</span>
                    <span>🟩 Live Class</span>
                    <span>🟦 Recording Watched</span>
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
                  minHeight: '180px',
                  border: isUnlocked ? '1px solid rgba(217, 119, 6, 0.25)' : '1px dashed var(--light-tertiary)',
                  background: isUnlocked ? 'rgba(217, 119, 6, 0.04)' : 'var(--light-secondary)',
                  textAlign: 'center',
                  flexDirection: 'column',
                  gap: '12px',
                  borderRadius: '16px',
                  padding: '24px',
                  position: 'relative',
                }}
              >
                <div style={{
                  padding: '16px',
                  background: 'white',
                  borderRadius: '50%',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '56px',
                  height: '56px',
                }}>
                  <span style={{ fontSize: '1.8rem' }}>{isUnlocked ? '🏆' : '🔒'}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: '0 0 4px 0', color: isUnlocked ? '#d97706' : 'var(--text-primary)' }}>
                    {isUnlocked ? 'Official WeMade Certification Unlocked!' : 'Certificate of Completion'}
                  </h3>
                  <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: 'var(--text-neutral)' }}>
                    {isUnlocked
                      ? 'Congratulations! You have completed all syllabus requirements. Your official WeMade Logix certificate is now active.'
                      : `Complete all course modules to unlock your official ${isML ? 'Machine Learning' : 'MERN Stack'} Certification.`
                    }
                  </p>
                  {isUnlocked ? (
                    <button
                      onClick={startGeneration}
                      style={{
                        background: 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 24px',
                        borderRadius: '8px',
                        fontWeight: '750',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(217, 119, 6, 0.2)',
                        transition: 'transform 0.2s',
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                      onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                      View & Print Certificate
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-neutral)', fontStyle: 'italic' }}>
                      {isML 
                        ? 'Requires unlock authorization'
                        : `Progress: ${progressPercent}% (Requires 100%)`}
                    </span>
                  )}
                </div>

                {/* Developer / Instructor Preview Toggle */}
                <div className="no-print" style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  opacity: 0.7
                }}>
                  <input
                    type="checkbox"
                    id="preview-cert-toggle"
                    checked={previewMode}
                    onChange={(e) => setPreviewMode(e.target.checked)}
                    style={{ cursor: 'pointer' }}
                  />
                  <label htmlFor="preview-cert-toggle" style={{ fontSize: '0.7rem', color: 'var(--text-neutral)', cursor: 'pointer', fontWeight: 600 }}>
                    🧪 Preview Certificate
                  </label>
                </div>
              </div>
            )}


            {/* Certificate Modal */}
            {isCertificateOpen && (
              <div
                className="admin-modal-overlay no-print"
                onClick={() => setIsCertificateOpen(false)}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(5px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2000
                }}
              >
                <div
                  className="certificate-modal-content"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: '#111827',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '24px',
                    borderRadius: '20px',
                    maxWidth: '1050px',
                    width: '95%',
                    maxHeight: '95vh',
                    overflowY: 'auto',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                    position: 'relative',
                    textAlign: 'center',
                  }}
                >
                  <div className="certificate-modal-header" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    paddingBottom: '12px'
                  }}>
                    <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#ffffff', fontWeight: 800 }}>Your WeMade Official Certificate</h2>
                    <button
                      onClick={() => setIsCertificateOpen(false)}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        borderRadius: '50%',
                        padding: '8px',
                        width: '36px',
                        height: '36px',
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      ✕
                    </button>
                  </div>

                  {isGenerating ? (
                    /* Futuristic Dynamic Generating Progress Loader */
                    <div className="certificate-generation-loader" style={{
                      padding: '60px 40px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '400px',
                      color: '#ffffff',
                      fontFamily: '"Inter", sans-serif',
                    }}>
                      <div className="futuristic-spinner-container" style={{ position: 'relative', marginBottom: '24px' }}>
                        <div className="mini-spinner" style={{
                          width: '72px',
                          height: '72px',
                          border: '3px solid rgba(0, 209, 209, 0.05)',
                          borderTopColor: 'var(--primary-cyan, #00D1D1)',
                          borderBottomColor: '#0047AB',
                          borderRadius: '50%',
                          animation: 'spin 1.5s linear infinite',
                        }}></div>
                        <span style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          fontSize: '1rem',
                          fontWeight: '800',
                          color: 'var(--primary-cyan, #00D1D1)',
                        }}>
                          {generationSteps[generationStep].percent}%
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '8px', color: '#ffffff' }}>
                        Generating Verified Certificate
                      </h3>

                      <p style={{
                        fontSize: '0.9rem',
                        color: '#94a3b8',
                        marginBottom: '24px',
                        minHeight: '20px',
                        fontWeight: 500,
                      }}>
                        {generationSteps[generationStep].text}
                      </p>

                      <div style={{
                        width: '100%',
                        maxWidth: '400px',
                        height: '6px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                      }}>
                        <div style={{
                          width: `${generationSteps[generationStep].percent}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #00D1D1 0%, #0047AB 100%)',
                          transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}></div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Landscape Print Area with Scroll Wrapper */}
                      <div className="certificate-scroll-wrapper" style={{ overflowX: 'auto', width: '100%', padding: '10px 0' }}>
                        <div className="certificate-print-area" style={{
                          position: 'relative',
                          width: '1000px',
                          height: '707px',
                          backgroundImage: `url(${isML ? '/Wemade-ML-Certificate1.png' : '/Certificate_template_enhanced.png'})`,
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          margin: '0 auto',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          backgroundColor: '#ffffff',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        }}>
                          {/* Dynamically Overlayed Student Name */}
                          <div style={{
                            position: 'absolute',
                            top: isML ? '42.5%' : '45.5%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: user?.name && user.name.length > 20
                              ? `${Math.max(2.5 * (20 / user.name.length), 1.55)}rem`
                              : '2.5rem',
                            fontFamily: '"Georgia", "Times New Roman", serif',
                            fontWeight: 'bold',
                            color: '#1a1a1a',
                            textAlign: 'center',
                            width: '80%',
                            letterSpacing: '1px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}>
                            {user?.name ? user.name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') : ''}
                          </div>

                          {/* Dynamically Overlayed Duration */}
                          <div style={{
                            position: 'absolute',
                            top: isML ? '77.6%' : '78.5%',
                            left: '14.30%',
                            transform: 'translateX(-50%)',
                            fontSize: '0.74rem',
                            fontWeight: 'bold',
                            color: '#1a1a1a',
                            fontFamily: '"Inter", sans-serif',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                          }}>
                            45 Days
                          </div>

                          {/* Dynamically Overlayed Mode */}
                          <div style={{
                            position: 'absolute',
                            top: isML ? '77.6%' : '78.5%',
                            left: '34.40%',
                            transform: 'translateX(-50%)',
                            fontSize: '0.74rem',
                            fontWeight: 'bold',
                            color: '#1a1a1a',
                            fontFamily: '"Inter", sans-serif',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                          }}>
                            Online
                          </div>

                          {/* Dynamically Overlayed Date of Issue */}
                          <div style={{
                            position: 'absolute',
                            top: isML ? '77.6%' : '78.5%',
                            left: '50.36%',
                            transform: 'translateX(-50%)',
                            fontSize: '0.74rem',
                            fontWeight: 'bold',
                            color: '#1a1a1a',
                            fontFamily: '"Inter", sans-serif',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                          }}>
                            {latestProfile?.certificateIssueDate
                              ? new Date(latestProfile.certificateIssueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                              : new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </div>

                          {/* Dynamically Overlayed Certificate ID */}
                          <div style={{
                            position: 'absolute',
                            top: isML ? '77.6%' : '78.5%',
                            left: '70.0%',
                            transform: 'translateX(-50%)',
                            fontSize: '0.74rem',
                            fontWeight: 'bold',
                            color: '#1a1a1a',
                            fontFamily: '"Inter", sans-serif',
                            textAlign: 'center',
                            width: '180px',
                            wordBreak: 'break-all'
                          }}>
                            {certificateId}
                          </div>

                          {/* Dynamically Overlayed Verification QR Code (Exact positioning over bottom-right placeholder) */}
                          <div style={{
                            position: 'absolute',
                            top: '69.12%',
                            left: '81.73%',
                            width: '7.37%',
                            height: '10.44%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <QRCodeSVG
                              id="certificate-qr-svg"
                              value={`${window.location.origin}/verify-certificate/${certificateId}`}
                              size={80}
                              bgColor={"#ffffff"}
                              fgColor={"#2244a0ff"}
                              level={"H"}
                            />
                          </div>

                          {/* Trainer Signature */}
                          <img
                            src="/sign.png"
                            alt="Trainer Signature"
                            style={{
                              position: 'absolute',
                              top: isML ? '82.6%' : '83.5%',
                              left: '5.5%',
                              width: '10.0%',
                              height: '9.3%',
                              objectFit: 'contain',
                              pointerEvents: 'none'
                            }}
                          />

                          {/* Trainer Signature Title */}
                          <div style={{
                            position: 'absolute',
                            top: '91.0%',
                            left: '10.5%',
                            transform: 'translateX(-50%)',
                            fontSize: '0.62rem',
                            fontWeight: 700,
                            color: '#235cbeff',
                            fontFamily: '"Inter", sans-serif',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}>
                            Trainer Signature
                          </div>
                        </div>
                      </div>

                      <div className="certificate-modal-footer" style={{
                        marginTop: '24px',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '16px'
                      }}>
                        <button
                          onClick={() => setIsCertificateOpen(false)}
                          className="btn-ghost"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#e2e8f0',
                            padding: '10px 24px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 600,
                          }}
                        >
                          Close Preview
                        </button>
                        <button
                          onClick={handleDownloadImage}
                          style={{
                            background: 'rgba(0, 209, 209, 0.1)',
                            border: '1px solid rgba(0, 209, 209, 0.3)',
                            color: '#00D1D1',
                            padding: '10px 24px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 700,
                          }}
                        >
                          Download Image
                        </button>

                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <style dangerouslySetInnerHTML={{
          __html: `
          @media print {
            @page {
              size: landscape;
              margin: 0;
            }
            body * {
              visibility: hidden !important;
            }
            .certificate-print-area, .certificate-print-area * {
              visibility: visible !important;
            }
            .certificate-print-area {
              position: fixed !important;
              left: 50% !important;
              top: 50% !important;
              transform: translate(-50%, -50%) !important;
              width: 1000px !important;
              height: 707px !important;
              background-image: url(${(user?.course === 'ml' || latestProfile?.course === 'ml') ? '/Wemade-ML-Certificate1.png' : '/Certificate_template_enhanced.png'}) !important;
              background-size: contain !important;
              background-repeat: no-repeat !important;
              background-position: center !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              box-shadow: none !important;
              border: none !important;
              background-color: #ffffff !important;
              z-index: 9999 !important;
            }
            .no-print {
              display: none !important;
            }
          }

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

          .heatmap-header-container {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 32px;
            margin-bottom: 16px;
            flex-wrap: wrap;
            gap: 16px;
          }

          @media (max-width: 768px) {
            .profile-page {
              padding: 20px 16px;
            }
            .profile-stats, .profile-sections {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }
            .profile-hero {
              margin-bottom: 24px;
              display: flex;
              flex-direction: column;
              align-items: center;
              background: white;
              border: 1px solid var(--light-tertiary);
              border-radius: 20px;
              padding: 20px;
              padding-top: 0;
              overflow: hidden;
            }
            .profile-cover {
              width: calc(100% + 40px);
              margin: 0 -20px;
              border-radius: 0;
              height: 100px;
            }
            .profile-info-card {
              position: static;
              transform: none;
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              margin-top: -50px;
              gap: 12px;
            }
            .profile-avatar-wrapper {
              box-shadow: 0 8px 20px rgba(0,0,0,0.06);
            }
            .profile-avatar-large {
              width: 80px;
              height: 80px;
              border-radius: 20px;
            }
            .profile-details h1 {
              font-size: 1.5rem;
            }
            .profile-email {
              margin-bottom: 8px;
            }
            .profile-badges {
              justify-content: center;
            }
            .profile-section-card {
              padding: 20px;
              border-radius: 16px;
              grid-column: span 1 !important;
            }
            .heatmap-header-container {
              flex-direction: column;
              align-items: flex-start;
              gap: 12px;
            }
            .heatmap-filters {
              width: 100%;
              padding: 8px 12px;
              flex-direction: column;
              gap: 10px;
              border-radius: 14px;
            }
            .filter-group {
              width: 100%;
              justify-content: space-between;
              align-items: center;
            }
            .heatmap-container {
              padding: 12px;
              gap: 8px;
            }
            .heatmap-legend {
              justify-content: center;
              flex-wrap: wrap;
              gap: 8px;
              margin-top: 16px;
            }
            .heatmap-legend .legend-labels {
              margin-left: 0 !important;
              justify-content: center;
              width: 100%;
              margin-top: 4px;
            }
            .att-stat-item {
              padding: 16px;
              gap: 12px;
              border-radius: 16px;
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
          .heatmap-cell.cell-attended, .heatmap-cell.cell-live {
            background: #10b981;
          }
          .heatmap-cell.cell-recording {
            background: #0ea5e9;
          }
          .heatmap-cell.cell-missed {
            background: #ef4444;
          }
          .heatmap-cell.cell-cancelled {
            background: #f59e0b;
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
          .legend-cell.cell-cancelled {
            background: #f59e0b;
          }
          .legend-cell.cell-attended, .legend-cell.cell-live {
            background: #10b981;
          }
          .legend-cell.cell-recording {
            background: #0ea5e9;
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
