import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { User, Shield, Award, Book, Clock, CheckCircle2 } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import { courseData } from '../data/mockData';
import axios from 'axios';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [userAssignments, setUserAssignments] = useState([]);
  const [allAssignments, setAllAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

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
        }
        setLoading(false);
      } catch (e) {
        console.error('Failed to fetch assignments for profile:', e);
        setLoading(false);
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
        `}} />
      </div>
    </MainLayout>
  );
};

export default Profile;
