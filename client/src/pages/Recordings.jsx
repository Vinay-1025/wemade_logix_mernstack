import React, { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import axios from 'axios';
import { 
  Video, Search, Play, ArrowLeft, RefreshCw, 
  Settings, Edit2, AlertCircle, CheckCircle2, SlidersHorizontal, Info, Eye,
  Maximize2, ArrowUpRight, MonitorPlay, Sparkles, BookOpen, GraduationCap
} from 'lucide-react';
import { courseData } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const normalizeDayId = (dayId) => {
  if (!dayId) return '';
  const str = dayId.toString().trim().toLowerCase();
  if (/^\d+$/.test(str)) {
    const dayNo = parseInt(str, 10);
    if (dayNo === 0) return 'w1-d0';
    const week = Math.ceil(dayNo / 6);
    const day = dayNo % 6 === 0 ? 6 : dayNo % 6;
    return `w${week}-d${day}`;
  }
  return str;
};

const Recordings = () => {
  const [recordings, setRecordings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all'); // 'all', 'available', 'missing'
  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Full screen theater states
  const [activeVideoUrl, setActiveVideoUrl] = useState('');
  const [activeVideoTitle, setActiveVideoTitle] = useState('');
  const [activeDayData, setActiveDayData] = useState(null);

  // Admin edit modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDayToEdit, setSelectedDayToEdit] = useState(null);
  const [modalFormData, setModalFormData] = useState({
    morningLink: '',
    eveningLink: '',
    commonLink: '',
    tutorMaterialLink: ''
  });
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');
  const [modalSuccess, setModalSuccess] = useState('');

  // Student recording attendance states
  const [myAttendance, setMyAttendance] = useState([]);
  const [countdown, setCountdown] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [canMarkAttendance, setCanMarkAttendance] = useState(false);
  const [markingAttendance, setMarkingAttendance] = useState(false);

  // Fetch all recordings and load user role on mount
  const fetchAllRecordings = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
      const isUserAdmin = userData?.role === 'admin' || userData?.role === 'superadmin';
      setIsAdmin(isUserAdmin);

      const token = userData?.token;
      if (!token) return;

      const response = await axios.get('/api/recordings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (Array.isArray(response.data)) {
        setRecordings(response.data);
      }
    } catch (err) {
      console.error('Error fetching all recordings:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyAttendance = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData?.token;
      if (!token) return;

      const response = await axios.get(`/api/attendance/my?t=${Date.now()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data && Array.isArray(response.data.records)) {
        setMyAttendance(response.data.records);
      }
    } catch (err) {
      console.error('Error fetching my attendance:', err);
    }
  };

  useEffect(() => {
    fetchAllRecordings();
    fetchMyAttendance();
  }, []);

  // Timer logic for video engagement tracking
  useEffect(() => {
    if (activeVideoUrl && activeDayData && !isAdmin) {
      const hasAttended = myAttendance.some(
        a => a.dayId && normalizeDayId(a.dayId) === normalizeDayId(activeDayData.dayId)
      );
      if (!hasAttended) {
        setCountdown(30);
        setCanMarkAttendance(false);
        setTimerActive(true);
      } else {
        setTimerActive(false);
        setCanMarkAttendance(false);
      }
    } else {
      setTimerActive(false);
    }
  }, [activeVideoUrl, activeDayData, myAttendance, isAdmin]);

  useEffect(() => {
    let interval = null;
    if (timerActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanMarkAttendance(true);
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, countdown]);

  const handleMarkMyAttendance = async () => {
    if (!activeDayData || markingAttendance) return;
    setMarkingAttendance(true);
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData?.token;
      if (!token) return;

      const response = await axios.post('/api/attendance/recording', 
        { dayId: activeDayData.dayId },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      if (response.data?.success) {
        alert('🎉 Attendance verified successfully!');
        await fetchMyAttendance();
      }
    } catch (err) {
      console.error('Error marking attendance:', err);
      alert(err.response?.data?.message || 'Failed to mark attendance');
    } finally {
      setMarkingAttendance(false);
    }
  };

  // Helper function to find day recordings case-insensitively and trimmed
  const getDayRecording = (dayId) => {
    if (!dayId) return {};
    return recordings.find(r => r.dayId && r.dayId.trim().toLowerCase() === dayId.trim().toLowerCase()) || {};
  };

  // Helper function to parse Drive and YouTube links into correct iframe embed format
  const getEmbedUrl = (url) => {
    if (!url) return '';
    
    // Google Drive URL conversion
    if (url.includes('drive.google.com')) {
      if (url.includes('/view')) {
        return url.replace('/view', '/preview');
      }
      if (url.includes('?id=')) {
        const id = url.split('?id=')[1].split('&')[0];
        return `https://drive.google.com/file/d/${id}/preview`;
      }
      if (url.includes('/file/d/')) {
        const parts = url.split('/file/d/');
        if (parts[1]) {
          const id = parts[1].split('/')[0];
          return `https://drive.google.com/file/d/${id}/preview`;
        }
      }
    }

    // YouTube URL conversion
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      if (url.includes('v=')) {
        const id = url.split('v=')[1].split('&')[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1].split('?')[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      if (url.includes('youtube.com/embed/')) {
        return url;
      }
    }

    return url; // Fallback
  };

  // Map day data from courseData to easily display metadata (like Day Title)
  const allDays = courseData.reduce((acc, week) => {
    if (week.days && Array.isArray(week.days)) {
      week.days.forEach(day => {
        acc.push({
          ...day,
          weekId: week.weekId,
          weekTitle: week.weekTitle
        });
      });
    }
    return acc;
  }, []);

  // Filter days based on search query, week, and link availability
  const filteredDays = allDays.filter(day => {
    const rec = getDayRecording(day.dayId);
    const activeVideo = (rec.commonLink && rec.commonLink.trim()) || (rec.morningLink && rec.morningLink.trim()) || (rec.eveningLink && rec.eveningLink.trim()) || '';
    const hasVideo = !!activeVideo;

    // 1. Week Filter
    const matchesWeek = selectedWeek === 'all' || day.weekId === selectedWeek;
    
    // 2. Search Filter
    const matchesSearch = 
      day.dayTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (day.topics && day.topics.some(topic => topic.title.toLowerCase().includes(searchQuery.toLowerCase())));

    // 3. Link Availability Filter
    let matchesAvailability = true;
    if (availabilityFilter === 'available') {
      matchesAvailability = hasVideo;
    } else if (availabilityFilter === 'missing') {
      matchesAvailability = !hasVideo;
    }

    return matchesWeek && matchesSearch && matchesAvailability;
  });

  // Open edit modal for a specific day
  const handleOpenEdit = (day) => {
    const rec = getDayRecording(day.dayId);
    setSelectedDayToEdit(day);
    setModalFormData({
      morningLink: rec.morningLink || '',
      eveningLink: rec.eveningLink || '',
      commonLink: rec.commonLink || '',
      tutorMaterialLink: rec.tutorMaterialLink || ''
    });
    setModalError('');
    setModalSuccess('');
    setShowEditModal(true);
  };

  // Submit link changes from the modal form
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDayToEdit) return;
    setModalSubmitting(true);
    setModalError('');
    setModalSuccess('');

    try {
      const token = user?.token;
      const firstTopicId = selectedDayToEdit.topics && selectedDayToEdit.topics[0]?.id;
      
      const payload = {
        ...modalFormData,
        dayTitle: selectedDayToEdit.dayTitle,
        topicId: firstTopicId || ''
      };

      await axios.post(`/api/recordings/${selectedDayToEdit.dayId}`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setModalSuccess('Recordings successfully published/updated!');
      await fetchAllRecordings();
      
      setTimeout(() => {
        setShowEditModal(false);
      }, 1200);
    } catch (err) {
      setModalError(err.response?.data?.message || 'Failed to update recordings');
    } finally {
      setModalSubmitting(false);
    }
  };

  // Trigger theater view
  const handlePlayVideo = (day, url) => {
    setActiveVideoUrl(url);
    setActiveVideoTitle(day.dayTitle);
    setActiveDayData(day);
  };

  return (
    <MainLayout showSidebar={!activeVideoUrl}>
      {activeVideoUrl ? (
        /* Full Screen Theater Mode Player View */
        <div className="theater-mode-view" style={{ background: '#090d16', color: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          
          {/* Top navigation */}
          <div className="theater-header" style={{ padding: '16px 24px', background: '#0b0f19', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              onClick={() => {
                setActiveVideoUrl('');
                setActiveDayData(null);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#cbd5e1',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.9rem',
                fontWeight: '700'
              }}
              className="back-list-btn"
            >
              <ArrowLeft size={18} /> Back to Recordings List
            </button>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800', color: 'white' }}>{activeVideoTitle}</h2>
              {activeDayData && <span style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>{activeDayData.weekId} • {activeDayData.dayId.toUpperCase()}</span>}
            </div>
            {/* Top Header Verification Tools on the right */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', minWidth: '220px' }}>
              {activeDayData && !isAdmin && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {(() => {
                    const matchedAttendance = myAttendance.find(
                      a => a.dayId && normalizeDayId(a.dayId) === normalizeDayId(activeDayData.dayId)
                    );
                    
                    if (matchedAttendance) {
                      const isLive = matchedAttendance.attendanceType === 'live';
                      return (
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '6px', 
                          background: isLive ? 'rgba(16, 185, 129, 0.08)' : 'rgba(14, 165, 233, 0.08)', 
                          border: isLive ? '1px solid rgba(16, 185, 129, 0.15)' : '1px solid rgba(14, 165, 233, 0.15)',
                          borderRadius: '16px', 
                          padding: '6px 14px',
                          color: isLive ? '#10b981' : '#0ea5e9',
                          fontSize: '0.75rem',
                          fontWeight: '800'
                        }}>
                          <CheckCircle2 size={14} /> 
                          <span>Verified ({isLive ? 'Live' : 'Recording'})</span>
                        </div>
                      );
                    }
                    
                    if (timerActive) {
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                          <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '700' }}>
                            Unlock in <strong>{countdown}s</strong>
                          </span>
                          <div style={{ width: '100px', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', background: 'var(--primary-cyan)', width: `${((30 - countdown) / 30) * 100}%`, transition: 'width 1s linear' }}></div>
                          </div>
                        </div>
                      );
                    }
                    
                    if (canMarkAttendance) {
                      return (
                        <button
                          onClick={handleMarkMyAttendance}
                          disabled={markingAttendance}
                          style={{
                            padding: '8px 16px',
                            background: 'linear-gradient(135deg, #0ea5e9, #10b981)',
                            border: 'none',
                            borderRadius: '20px',
                            color: '#090d16',
                            fontWeight: '800',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 10px rgba(16, 185, 129, 0.25)',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          className="theater-trigger-btn"
                        >
                          <CheckCircle2 size={12} /> {markingAttendance ? 'Verifying...' : 'Verify Attendance'}
                        </button>
                      );
                    }
                    
                    return null;
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Main Video View Box - Spans Full Width */}
          <div className="theater-layout" style={{ flex: 1, display: 'flex', minHeight: 0, width: '100%' }}>
            {/* Full-width Video Player Frame */}
            <div className="theater-video-frame-box" style={{ flex: 1, width: '100%', background: 'black', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <iframe 
                src={getEmbedUrl(activeVideoUrl)}
                title="Theater playback screen"
                style={{ width: '100%', height: '100%', border: 'none', minHeight: '560px' }}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
              {/* Cover Pop Out Icon Overlay */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '48px', // Covers the native pop-out button on Drive iframe
                width: '110px',
                height: '40px',
                borderRadius: '20px',
                background: '#090d16',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 5,
                pointerEvents: 'all',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                gap: '8px'
              }}>
                <img
                  src="/fav_icon.png"
                  alt="Wemade Logo"
                  style={{ width: '16px', height: '16px', objectFit: 'contain' }}
                />
                <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.5px' }}>WEMADE</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Regular Recordings List View */
        <div className="recordings-container" style={{ padding: '32px var(--space-6)', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Back navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <button 
              onClick={() => navigate('/')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-neutral)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.85rem',
                fontWeight: '600',
                padding: '4px 8px',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }}
              className="back-home-btn"
            >
              <ArrowLeft size={16} /> Back to Classroom
            </button>
          </div>

          {/* Dashboard Title */}
          <div className="recordings-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '800', letterSpacing: '-0.5px' }}>Class Session Recordings</h1>
              <p style={{ margin: '6px 0 0 0', color: 'var(--text-neutral)', fontSize: '0.95rem' }}>Access all recorded morning lectures, evening Q&A, and comprehensive code walkthroughs without restriction.</p>
            </div>
            {isAdmin && (
              <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--primary)', background: 'rgba(0,71,171,0.08)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(0,71,171,0.15)' }} className="admin-badge-hide">
                Administrator Console Active
              </span>
            )}
          </div>

          {/* Filters Toolbar */}
          <div className="filter-toolbar" style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center', background: 'var(--card-bg)', padding: '16px', borderRadius: '12px', border: '1px solid var(--app-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--app-text)', marginRight: '8px' }}>
              <SlidersHorizontal size={16} className="text-cyan" /> <span>Filters</span>
            </div>

            {/* Search Box */}
            <div className="search-box" style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-neutral)' }} />
              <input 
                type="text" 
                placeholder="Search topics..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  borderRadius: '8px',
                  border: '1px solid var(--app-border)',
                  background: 'var(--light-secondary)',
                  color: 'var(--app-text)',
                  outline: 'none',
                  fontSize: '0.85rem'
                }}
                className="search-input-field"
              />
            </div>

            {/* Week Filter */}
            <div className="filter-item">
              <select 
                value={selectedWeek}
                onChange={e => setSelectedWeek(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--app-border)',
                  background: 'var(--light-secondary)',
                  color: 'var(--app-text)',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Weeks</option>
                {courseData.map(week => (
                  <option key={week.weekId} value={week.weekId}>{week.weekTitle.split(':')[0] || week.weekTitle}</option>
                ))}
              </select>
            </div>

            {/* Link Availability Filter */}
            <div className="filter-item">
              <select 
                value={availabilityFilter}
                onChange={e => setAvailabilityFilter(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--app-border)',
                  background: 'var(--light-secondary)',
                  color: 'var(--app-text)',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Availability</option>
                <option value="available">Has Active Link</option>
                <option value="missing">Missing Links</option>
              </select>
            </div>
          </div>

          {/* Main Content Table Area */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-neutral)' }}>
              <div style={{ marginBottom: '16px' }}><RefreshCw className="animate-spin" size={32} /></div>
              <p style={{ fontWeight: '500' }}>Fetching class recordings database...</p>
            </div>
          ) : filteredDays.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', border: '1px dashed var(--app-border)', borderRadius: '16px', background: 'var(--light-secondary)' }}>
              <Video size={48} style={{ color: 'var(--text-neutral)', marginBottom: '16px' }} />
              <h3 style={{ margin: '0 0 8px 0', fontWeight: '700' }}>No recordings match your criteria</h3>
              <p style={{ color: 'var(--text-neutral)', fontSize: '0.9rem', margin: 0 }}>Try adjusting your query or selecting a different filter.</p>
            </div>
          ) : (
            /* Sleek Table Layout: Hiding morning/evening and displaying only comprehensive */
            <div className="recordings-table-wrapper" style={{ overflowX: 'auto', background: 'var(--card-bg)', border: '1px solid var(--app-border)', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}>
              <table className="recordings-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
                <thead>
                  <tr style={{ background: 'var(--light-secondary)', borderBottom: '1px solid var(--app-border)' }}>
                    <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-neutral)', textTransform: 'uppercase', width: '80px' }}>Week</th>
                    <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-neutral)', textTransform: 'uppercase', width: '80px' }}>Day</th>
                    <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-neutral)', textTransform: 'uppercase' }}>Day Description & Core Topics</th>
                    <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-neutral)', textTransform: 'uppercase', width: '120px' }}>Status</th>
                    <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-neutral)', textTransform: 'uppercase', width: '220px', textAlign: 'center' }}>Session Recording</th>
                    {isAdmin && (
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-neutral)', textTransform: 'uppercase', width: '110px', textAlign: 'center' }}>Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredDays.map(day => {
                    const rec = getDayRecording(day.dayId);
                    const activeVideo = (rec.commonLink && rec.commonLink.trim()) || (rec.morningLink && rec.morningLink.trim()) || (rec.eveningLink && rec.eveningLink.trim()) || '';
                    const hasVideo = !!activeVideo;
                    
                    const matchedAttendance = myAttendance.find(
                      a => a.dayId && normalizeDayId(a.dayId) === normalizeDayId(day.dayId)
                    );
                    
                    return (
                      <tr 
                        key={day.dayId} 
                        style={{ borderBottom: '1px solid var(--app-border)', transition: 'background 0.2s' }}
                        className="table-row-hover"
                      >
                        {/* Week label */}
                        <td style={{ padding: '16px 20px' }} data-label="Week">
                          <span style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--primary-cyan)', background: 'rgba(0,209,209,0.08)', padding: '4px 8px', borderRadius: '6px' }}>
                            {day.weekId}
                          </span>
                        </td>

                        {/* Day Label */}
                        <td style={{ padding: '16px 20px', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-primary)' }} data-label="Day">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>{day.dayId.split('-')[1].toUpperCase()}</span>
                            {matchedAttendance && (
                              <CheckCircle2 
                                size={14} 
                                style={{ 
                                  color: matchedAttendance.attendanceType === 'live' ? '#10b981' : '#0ea5e9' 
                                }} 
                                title={`Attendance Verified (${matchedAttendance.attendanceType === 'live' ? 'Live' : 'Recording'})`}
                              />
                            )}
                          </div>
                        </td>

                        {/* Day Title & Topics list */}
                        <td style={{ padding: '16px 20px' }} data-label="Description">
                          <div className="day-desc-title" style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--app-text)', marginBottom: '4px' }}>
                            {day.dayTitle.split(': ')[1] || day.dayTitle}
                          </div>
                          {day.topics && day.topics.length > 0 && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-neutral)', lineHeight: '1.4' }} className="day-desc-topics">
                              {day.topics.slice(0, 3).map(t => t.title.split('. ')[1] || t.title).join(', ')}...
                            </div>
                          )}
                        </td>

                        {/* Link status badge */}
                        <td style={{ padding: '16px 20px' }} data-label="Status">
                          <span style={{ 
                            fontSize: '0.7rem', 
                            fontWeight: '800', 
                            padding: '4px 8px', 
                            borderRadius: '6px', 
                            display: 'inline-block',
                            color: hasVideo ? '#10b981' : '#f59e0b',
                            background: hasVideo ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)'
                          }}>
                            {hasVideo ? 'PUBLISHED' : 'PENDING'}
                          </span>
                        </td>

                        {/* Single watch button for comprehensive link / fallback */}
                        <td style={{ padding: '16px 20px', textAlign: 'center' }} data-label="Session Video">
                          {hasVideo ? (
                            <button 
                              onClick={() => handlePlayVideo(day, activeVideo)}
                              style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '6px', 
                                border: 'none',
                                cursor: 'pointer',
                                background: 'var(--primary-cyan)', 
                                color: '#090d16',
                                fontWeight: '800', 
                                padding: '8px 16px',
                                borderRadius: '8px',
                                fontSize: '0.75rem',
                                boxShadow: '0 4px 10px rgba(0,209,209,0.25)',
                                transition: 'all 0.2s'
                              }}
                              className="theater-trigger-btn"
                            >
                              <Play size={12} fill="#090d16" /> View Session
                            </button>
                          ) : (
                            <span style={{ color: 'var(--text-neutral)', fontSize: '0.8rem', fontStyle: 'italic' }}>Pending Link upload</span>
                          )}
                        </td>

                        {/* Admin inline edit action */}
                        {isAdmin && (
                          <td style={{ padding: '16px 20px', textAlign: 'center' }} data-label="Actions">
                            <button 
                              onClick={() => handleOpenEdit(day)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--primary)',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                transition: 'all 0.2s'
                              }}
                              className="edit-row-btn"
                            >
                              <Edit2 size={12} /> Edit
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modern & Classy Glassmorphic Admin Link Upload/Edit Modal */}
      {showEditModal && selectedDayToEdit && (
        <div 
          className="modal-overlay" 
          onClick={() => setShowEditModal(false)} 
          style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            background: 'rgba(2, 6, 23, 0.65)', 
            backdropFilter: 'blur(16px)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            zIndex: 1100,
            animation: 'fadeIn 0.25s ease-out'
          }}
        >
          <div 
            className="modal-content" 
            onClick={e => e.stopPropagation()} 
            style={{ 
              background: '#0f172a', 
              border: '1px solid rgba(255, 255, 255, 0.08)', 
              borderRadius: '24px', 
              padding: '32px', 
              maxWidth: '540px', 
              width: '90%', 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              color: '#f8fafc',
              position: 'relative'
            }}
          >
            {/* Decorative background gradients */}
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '140px', height: '140px', background: 'rgba(0, 209, 209, 0.15)', filter: 'blur(40px)', borderRadius: '50%', pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '160px', height: '160px', background: 'rgba(79, 70, 229, 0.12)', filter: 'blur(50px)', borderRadius: '50%', pointerEvents: 'none' }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Settings size={20} className="text-cyan animate-spin" style={{ animationDuration: '4s' }} />
                <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800', color: 'white', letterSpacing: '-0.5px' }}>Link Console Manager</h3>
              </div>
              <button 
                onClick={() => setShowEditModal(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.6rem', cursor: 'pointer', color: '#64748b', transition: 'color 0.2s' }}
                className="close-modal-btn"
              >
                ×
              </button>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '12px 16px', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--primary-cyan)', fontWeight: '800', display: 'block', marginBottom: '2px' }}>Topic Scope:</span>
              <strong style={{ fontSize: '0.9rem', color: 'white' }}>{selectedDayToEdit.dayTitle}</strong>
            </div>

            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px', position: 'relative', zIndex: 1 }}>
              {modalError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', padding: '10px 14px', borderRadius: '10px', fontSize: '0.8rem' }}>
                  <AlertCircle size={16} /> <span>{modalError}</span>
                </div>
              )}
              {modalSuccess && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399', padding: '10px 14px', borderRadius: '10px', fontSize: '0.8rem' }}>
                  <CheckCircle2 size={16} /> <span>{modalSuccess}</span>
                </div>
              )}

              {/* Comprehensive Link input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Comprehensive Session URL (Default Watch Video):</label>
                <div style={{ position: 'relative' }}>
                  <Play size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input 
                    type="text" 
                    value={modalFormData.commonLink} 
                    onChange={e => setModalFormData({ ...modalFormData, commonLink: e.target.value })}
                    placeholder="https://drive.google.com/file/d/... or YouTube link"
                    style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#1e293b', color: 'white', fontSize: '0.85rem' }}
                    className="modal-input-field"
                  />
                </div>
              </div>

              {/* Slide material input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Wemade Slides / Material URL:</label>
                <div style={{ position: 'relative' }}>
                  <BookOpen size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input 
                    type="text" 
                    value={modalFormData.tutorMaterialLink} 
                    onChange={e => setModalFormData({ ...modalFormData, tutorMaterialLink: e.target.value })}
                    placeholder="https://drive.google.com/file/d/... or PDF material link"
                    style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#1e293b', color: 'white', fontSize: '0.85rem' }}
                    className="modal-input-field"
                  />
                </div>
              </div>

              {/* Optional morning/evening links */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '14px', marginTop: '4px' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Alternative Streams (Optional):</span>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Morning Session:</label>
                    <input 
                      type="text" 
                      value={modalFormData.morningLink} 
                      onChange={e => setModalFormData({ ...modalFormData, morningLink: e.target.value })}
                      placeholder="Morning stream"
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#131926', color: 'white', fontSize: '0.8rem' }}
                      className="modal-input-field"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Evening Session:</label>
                    <input 
                      type="text" 
                      value={modalFormData.eveningLink} 
                      onChange={e => setModalFormData({ ...modalFormData, eveningLink: e.target.value })}
                      placeholder="Evening stream"
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#131926', color: 'white', fontSize: '0.8rem' }}
                      className="modal-input-field"
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowEditModal(false)}
                  disabled={modalSubmitting}
                  style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#cbd5e1', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}
                  className="modal-cancel-btn"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={modalSubmitting}
                  style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--primary-cyan)', color: '#090d16', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '800', boxShadow: '0 4px 12px rgba(0,209,209,0.25)' }}
                >
                  {modalSubmitting ? 'Saving changes...' : 'Save Links'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Styled overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .table-row-hover:hover {
          background: var(--light-secondary) !important;
        }
        .edit-row-btn:hover {
          background: rgba(0,71,171,0.05) !important;
        }
        .back-home-btn:hover {
          color: var(--app-text) !important;
          background: var(--light-secondary) !important;
        }
        .back-list-btn:hover {
          color: white !important;
        }
        .theater-trigger-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(0,209,209,0.4) !important;
        }
        .close-modal-btn:hover {
          color: white !important;
        }
        .modal-input-field:focus {
          border-color: var(--primary-cyan) !important;
          outline: none;
        }
        .modal-cancel-btn:hover {
          background: rgba(255,255,255,0.03) !important;
          color: white !important;
        }
        .animate-spin {
          animation: spin 1.5s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* -------------------------------------------
           MOBILE AND TABLET RESPONSIVENESS MEDIA QUERY
           ------------------------------------------- */
        @media (max-width: 900px) {
          .admin-badge-hide {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .recordings-container {
            padding: 16px !important;
          }
          
          /* Hide table headers on mobile */
          .recordings-table thead {
            display: none !important;
          }
          
          /* Convert table structure to display block blocks */
          .recordings-table, 
          .recordings-table tbody, 
          .recordings-table tr, 
          .recordings-table td {
            display: block !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          
          /* Space the table wrapper card */
          .recordings-table-wrapper {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }

          /* Style each row as a standalone card object */
          .recordings-table tr {
            background: var(--card-bg) !important;
            border: 1px solid var(--app-border) !important;
            border-radius: 12px !important;
            margin-bottom: 20px !important;
            padding: 18px !important;
            box-shadow: var(--shadow-sm) !important;
          }
          
          /* Align td cell elements with content labeling */
          .recordings-table td {
            border: none !important;
            padding: 8px 0 !important;
            text-align: left !important;
          }
          
          /* Exclude first-child (Week) and second-child (Day) columns for side-by-side alignment */
          .recordings-table td[data-label="Week"],
          .recordings-table td[data-label="Day"] {
            display: inline-block !important;
            width: auto !important;
            margin-right: 12px !important;
            padding-bottom: 12px !important;
          }

          /* Remove empty labels before tags */
          .recordings-table td[data-label="Week"]::before,
          .recordings-table td[data-label="Day"]::before {
            display: none !important;
          }

          /* Hide label header for title description to keep title card flow clean */
          .recordings-table td[data-label="Description"]::before {
            display: none !important;
          }

          /* Add prefix labels in front of values for clarity */
          .recordings-table td[data-label="Status"]::before,
          .recordings-table td[data-label="Session Video"]::before,
          .recordings-table td[data-label="Actions"]::before {
            content: attr(data-label) ": ";
            font-weight: 800;
            color: var(--text-neutral);
            font-size: 0.75rem;
            text-transform: uppercase;
            margin-right: 6px;
          }

          .day-desc-title {
            font-size: 1.05rem !important;
            margin-top: 4px;
          }

          .day-desc-topics {
            font-size: 0.8rem !important;
          }

          /* View button width on mobile */
          .theater-trigger-btn {
            width: 100% !important;
            justify-content: center !important;
            margin-top: 6px !important;
          }
        }
      `}} />
    </MainLayout>
  );
};

export default Recordings;
