import React from 'react';
import { useSelector } from 'react-redux';
import { User, Mail, Shield, Calendar, Award, Book, Clock } from 'lucide-react';
import MainLayout from '../components/MainLayout';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <MainLayout showSidebar={user?.role !== 'admin' && user?.role !== 'superadmin'}>
      <div className="profile-page">
        <div className="profile-hero">
          <div className="profile-cover"></div>
          <div className="profile-info-card">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-large">
                <User size={48} />
              </div>
            </div>
            <div className="profile-details">
              <h1>{user?.name}</h1>
              <p className="profile-email">{user?.email}</p>
              <div className="profile-badges">
                <span className="badge role-badge">
                  {(user?.role === 'admin' || user?.role === 'superadmin') ? <Shield size={14} /> : <User size={14} />}
                  {user?.role}
                </span>
                <span className="badge status-badge">Active Learner</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-stats">
            <div className="stat-card">
              <Book size={24} />
              <div className="stat-info">
                <h3>12</h3>
                <p>Lessons Completed</p>
              </div>
            </div>
            <div className="stat-card">
              <Award size={24} />
              <div className="stat-info">
                <h3>4</h3>
                <p>Achievements</p>
              </div>
            </div>
            <div className="stat-card">
              <Clock size={24} />
              <div className="stat-info">
                <h3>24h</h3>
                <p>Learning Time</p>
              </div>
            </div>
          </div>

          <div className="profile-sections">
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
              <button className="edit-profile-btn">Edit Profile Settings</button>
            </div>

            <div className="profile-section-card">
              <h2>Learning Progress</h2>
              <div className="progress-item">
                <div className="progress-label">
                  <span>English Mastery</span>
                  <span>65%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="progress-item">
                <div className="progress-label">
                  <span>Business Communication</span>
                  <span>40%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .profile-page {
            padding: 40px;
            max-width: 1000px;
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
            background: #f0fdf4;
            color: #16a34a;
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
          }
          .detail-row {
            margin-bottom: 16px;
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
          .edit-profile-btn {
            margin-top: 12px;
            padding: 10px 20px;
            background: var(--light-secondary);
            border: 1px solid var(--light-tertiary);
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .edit-profile-btn:hover {
            background: var(--light-tertiary);
          }

          .progress-item {
            margin-bottom: 20px;
          }
          .progress-label {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 8px;
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
