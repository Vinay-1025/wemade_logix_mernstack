import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { User, Mail, Shield, Calendar, Search, ArrowLeft, Plus, X, UserPlus, ChevronLeft, ChevronRight, MoreVertical, Trash2, UserCheck, Edit2, Ban, Bell, AlertCircle, CheckCircle, Filter, RotateCcw, FileSpreadsheet, Upload, Download, Database, Flame, Percent, Clock, CheckCircle2, Activity } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import { sendWelcomeEmailJS } from '../utils/emailService';
import { courseData } from '../data/mockData';

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
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [selectedDetailUser, setSelectedDetailUser] = useState(null);
  const [detailUserAssignments, setDetailUserAssignments] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);

  // Detailed view page & filter states
  const [syllabusPage, setSyllabusPage] = useState(1);
  const [syllabusStatusFilter, setSyllabusStatusFilter] = useState('all');
  const [syllabusWeekFilter, setSyllabusWeekFilter] = useState('all');
  const [syllabusSearch, setSyllabusSearch] = useState('');
  const [submissionPage, setSubmissionPage] = useState(1);
  const [submissionStatusFilter, setSubmissionStatusFilter] = useState('all');
  const [submissionSearch, setSubmissionSearch] = useState('');

  // Attendance Consistency Matrix States
  const [consistencyPage, setConsistencyPage] = useState(1);
  const [consistencyStatusFilter, setConsistencyStatusFilter] = useState('all');
  const [consistencySearch, setConsistencySearch] = useState('');


  // Excel / CSV Batch states
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [excelUsers, setExcelUsers] = useState([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [excelFile, setExcelFile] = useState(null);

  // Feedback states
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, title: '', message: '', onConfirm: null });

  // Attendance details states for selected detail user
  const [attendanceStats, setAttendanceStats] = useState(null);
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [timeRange, setTimeRange] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingDays, setUpdatingDays] = useState({});


  const downloadTemplate = () => {
    const headers = "Name,Email,Password,Role\n";
    const sampleData = "Jane Doe,jane.doe@example.com,securePass123,student\nJohn Admin,john.admin@example.com,adminPass456,admin\n";
    const blob = new Blob([headers + sampleData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "personnel_import_template.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const parseCSV = (text) => {
    const lines = text.split('\n');
    const result = [];
    if (lines.length < 2) return result;

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const nameIdx = headers.indexOf('name');
    const emailIdx = headers.indexOf('email');
    const passIdx = headers.indexOf('password');
    const roleIdx = headers.indexOf('role');

    if (nameIdx === -1 || emailIdx === -1) {
      throw new Error("Invalid CSV template. Column headers must contain 'Name' and 'Email'.");
    }

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const cols = line.split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
      if (cols.length < 2) continue;

      const name = cols[nameIdx] || '';
      const email = cols[emailIdx] || '';
      const password = passIdx !== -1 ? (cols[passIdx] || 'wemade123') : 'wemade123';
      let role = roleIdx !== -1 ? (cols[roleIdx] || 'student') : 'student';

      // Normalize role
      role = role.toLowerCase().includes('admin') ? 'admin' : 'student';

      if (name && email) {
        result.push({ name, email, password, role });
      }
    }
    return result;
  };

  const handleFile = (file) => {
    if (!file) return;
    const isCSV = file.name.endsWith('.csv') || file.name.endsWith('.txt');
    const isXLS = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');

    if (!isCSV && !isXLS) {
      showSnackbar("Only Excel (.xlsx) or CSV (.csv) template files are supported.", "error");
      return;
    }

    setExcelFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const parsed = parseCSV(text);
        if (parsed.length === 0) {
          showSnackbar("No valid personnel records found in the template.", "error");
          setExcelFile(null);
        } else {
          setExcelUsers(parsed);
          showSnackbar(`Parsed ${parsed.length} personnel records successfully!`, "success");
        }
      } catch (err) {
        showSnackbar(err.message || "Failed to parse file data.", "error");
        setExcelFile(null);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleBatchImport = async () => {
    if (excelUsers.length === 0) return;
    setIsImporting(true);
    setImportProgress(0);
    let successCount = 0;
    let failCount = 0;

    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };

    for (let i = 0; i < excelUsers.length; i++) {
      const userToCreate = excelUsers[i];
      try {
        await axios.post('/api/auth/users', userToCreate, config);
        successCount++;
        
        // Dispatch email directly from client-side via EmailJS
        sendWelcomeEmailJS(userToCreate.email, userToCreate.name, userToCreate.password, userToCreate.role);
      } catch (err) {
        console.error('Import failure:', userToCreate.email, err);
        failCount++;
      }
      setImportProgress(Math.round(((i + 1) / excelUsers.length) * 100));
    }

    setIsImporting(false);
    setIsExcelModalOpen(false);
    setExcelUsers([]);
    setExcelFile(null);
    fetchUsers();

    if (failCount === 0) {
      showSnackbar(`Successfully imported ${successCount} personnel records!`, 'success');
    } else {
      showSnackbar(`Import complete. ${successCount} imported, ${failCount} skipped due to email duplication.`, 'error');
    }
  };

  const showSnackbar = (message, type = 'success') => {
    setSnackbar({ open: true, message, type });
    setTimeout(() => setSnackbar({ ...snackbar, open: false }), 4000);
  };

  const showConfirm = (title, message, onConfirm) => {
    setConfirmDialog({ open: true, title, message, onConfirm });
  };

  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

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

  const getCalendarDateForDay = (dayId) => {
    if (dayId && dayId.toString().startsWith('extra-')) {
      return dayId.toString().substring(6);
    }
    const baseDate = new Date(Date.UTC(2026, 4, 18)); // May 18, 2026 (Month is 0-indexed, UTC)


    const getDayNumber = (id) => {
      if (!id) return 1;
      const str = id.toString().trim().toLowerCase();
      if (/^\d+$/.test(str)) {
        return parseInt(str, 10);
      }
      const match = str.match(/^w(\d+)-d(\d+)$/);
      if (match) {
        const week = parseInt(match[1], 10);
        const day = parseInt(match[2], 10);
        if (week === 1 && day === 0) return 0;
        return (week - 1) * 6 + day;
      }
      return 1;
    };

    const dayNo = getDayNumber(dayId);
    if (dayNo === 0) {
      return '2026-05-18';
    }

    let targetDate = new Date(baseDate.getTime());
    let nonSundayDaysAdded = 0;

    while (nonSundayDaysAdded < dayNo - 1) {
      targetDate.setUTCDate(targetDate.getUTCDate() + 1);
      if (targetDate.getUTCDay() !== 0) { // 0 is Sunday
        nonSundayDaysAdded++;
      }
    }

    const yyyy = targetDate.getUTCFullYear();
    const mm = String(targetDate.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(targetDate.getUTCDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const fetchDetailUserAttendance = async (selectedUser, silent = false) => {
    if (!selectedUser) return;
    if (!silent) {
      setAttendanceLoading(true);
      setAttendanceStats(null);
    }
    try {
      const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
      const { data } = await axios.get(`/api/attendance/stats/${selectedUser._id}`, config);
      if (data && data.success) {
        setAttendanceStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to fetch attendance stats:', err);
    } finally {
      if (!silent) {
        setAttendanceLoading(false);
      }
    }
  };

  const handleUpdateAttendanceStatus = async (dayId, newStatus) => {
    if (!selectedDetailUser) return;
    setUpdatingDays(prev => ({ ...prev, [dayId]: true }));
    try {
      const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
      const response = await axios.put('/api/attendance/update', {
        studentId: selectedDetailUser._id,
        dayId,
        newStatus
      }, config);
      
      if (response.data && response.data.success) {
        showSnackbar(response.data.message || 'Attendance status updated successfully!', 'success');
        // Fetch stats again silently to update UI without unmounting/flashing
        await fetchDetailUserAttendance(selectedDetailUser, true);
      }
    } catch (err) {
      console.error('Failed to update attendance status:', err);
      showSnackbar(err.response?.data?.message || 'Failed to update attendance status', 'error');
    } finally {
      setUpdatingDays(prev => ({ ...prev, [dayId]: false }));
    }
  };




  const getPaginationRange = (currPage, totPages) => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totPages; i++) {
      if (i === 1 || i === totPages || (i >= currPage - delta && i <= currPage + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const fetchDetailUserAssignments = async (selectedUser) => {
    if (!selectedUser) return;
    setDetailLoading(true);
    setSyllabusPage(1);
    setSyllabusStatusFilter('all');
    setSyllabusWeekFilter('all');
    setSyllabusSearch('');
    setSubmissionPage(1);
    setSubmissionStatusFilter('all');
    setSubmissionSearch('');
    try {
      const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
      const { data } = await axios.get('/api/assignments', config);
      if (Array.isArray(data)) {
        const filtered = data.filter(a => a.student?._id === selectedUser._id || a.student?.email === selectedUser.email);
        setDetailUserAssignments(filtered);
      }
    } catch (err) {
      console.error(err);
      showSnackbar('Failed to load student submission details', 'error');
    } finally {
      setDetailLoading(false);
    }
  };

  const getDayAssignmentTopic = (day) => {
    if (!day || !day.topics || day.topics.length === 0) return null;
    return day.topics.find(t => t.title.toLowerCase().includes('assignment')) 
      || [...day.topics].reverse().find(t => !t.isResources) 
      || day.topics[day.topics.length - 1];
  };

  const getDayStatus = (dayId, day) => {
    const topic = getDayAssignmentTopic(day);
    if (!topic) return { status: 'none', label: 'No Assignment' };

    const submission = detailUserAssignments.find(a => a.topicId === topic.id);
    if (!submission) {
      return { status: 'pending_submission', label: 'Not Started' };
    }
    return {
      status: submission.status,
      label: submission.status.charAt(0).toUpperCase() + submission.status.slice(1),
      submission
    };
  };

  const isDayUnlocked = (dayId, wIndex, dIndex) => {
    const match = dayId.match(/^w(\d+)-d(\d+)$/);
    if (match) {
      const wNum = parseInt(match[1], 10);
      const dNum = parseInt(match[2], 10);
      if (wNum === 1 && dNum < 2) {
        return true;
      }
    }

    let prevDay = null;
    if (dIndex > 0) {
      prevDay = courseData[wIndex].days[dIndex - 1];
    } else {
      let prevWIdx = wIndex - 1;
      while (prevWIdx >= 0) {
        const prevWeek = courseData[prevWIdx];
        if (prevWeek?.days && prevWeek.days.length > 0) {
          prevDay = prevWeek.days[prevWeek.days.length - 1];
          break;
        }
        prevWIdx--;
      }
    }

    if (!prevDay) return true;
    if (prevDay.dayId === 'w1-d0') return true;

    const prevTopic = getDayAssignmentTopic(prevDay);
    if (!prevTopic) return true;

    const prevSubmission = detailUserAssignments.find(a => a.topicId === prevTopic.id);
    return prevSubmission && prevSubmission.status === 'accepted';
  };

  useEffect(() => {
    setSelectedDetailUser(null);
    setAttendanceStats(null);
  }, [location.pathname]);

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

  const resetFilters = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, usersPerPage]);

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
      
      // Dispatch email directly from client-side via EmailJS
      sendWelcomeEmailJS(newUser.email, newUser.name, newUser.password, newUser.role);
      
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

  // Filter & Paginate Syllabus for Detail Page
  const syllabusPerPage = 6;
  const filteredSyllabus = courseData.flatMap((week, wIdx) => 
    week.days.map((day, dIdx) => {
      const statusInfo = getDayStatus(day.dayId, day);
      const unlocked = isDayUnlocked(day.dayId, wIdx, dIdx);
      return {
        week,
        wIdx,
        day,
        dIdx,
        statusInfo,
        unlocked
      };
    })
  ).filter(item => {
    // Week filter
    if (syllabusWeekFilter !== 'all') {
      if (String(item.wIdx) !== syllabusWeekFilter) return false;
    }
    // Status filter
    if (syllabusStatusFilter !== 'all') {
      if (syllabusStatusFilter === 'locked') {
        if (item.unlocked) return false;
      } else {
        if (!item.unlocked) return false;
        if (item.statusInfo.status !== syllabusStatusFilter) return false;
      }
    }
    // Search filter
    if (syllabusSearch.trim() !== '') {
      const query = syllabusSearch.toLowerCase();
      const matchesDay = item.day.dayTitle.toLowerCase().includes(query);
      const matchesWeek = item.week.weekTitle.toLowerCase().includes(query);
      if (!matchesDay && !matchesWeek) return false;
    }
    return true;
  });

  const syllabusTotalPages = Math.ceil(filteredSyllabus.length / syllabusPerPage);
  const currentSyllabus = filteredSyllabus.slice(
    (syllabusPage - 1) * syllabusPerPage,
    syllabusPage * syllabusPerPage
  );

  // Filter & Paginate Submissions for Detail Page
  const submissionsPerPage = 5;
  const filteredSubmissions = detailUserAssignments.filter(sub => {
    // Status filter
    if (submissionStatusFilter !== 'all') {
      if (sub.status !== submissionStatusFilter) return false;
    }
    // Search filter
    if (submissionSearch.trim() !== '') {
      const query = submissionSearch.toLowerCase();
      const matchesTopic = sub.topicTitle.toLowerCase().includes(query);
      const matchesFeedback = sub.feedback && sub.feedback.toLowerCase().includes(query);
      if (!matchesTopic && !matchesFeedback) return false;
    }
    return true;
  });

  const submissionTotalPages = Math.ceil(filteredSubmissions.length / submissionsPerPage);
  const currentSubmissions = [...filteredSubmissions]
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    .slice((submissionPage - 1) * submissionsPerPage, submissionPage * submissionsPerPage);

  // Attendance Consistency Matrix list processing
  const allCourseDays = courseData.reduce((acc, week) => {
    return acc.concat(
      week.days.map(day => ({
        weekTitle: week.weekTitle,
        weekId: week.weekId,
        ...day
      }))
    );
  }, []);

  const mappedCourseDays = allCourseDays.map(day => {
    const dateStr = getCalendarDateForDay(day.dayId);
    
    // Calculate if day is in future
    const targetDate = new Date(Date.UTC(
      parseInt(dateStr.split('-')[0]),
      parseInt(dateStr.split('-')[1]) - 1,
      parseInt(dateStr.split('-')[2])
    ));
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    const isFuture = targetDate.getTime() > todayUTC.getTime();

    let status = 'none';
    let cancelReason = '';
    if (attendanceStats && attendanceStats.heatmapData) {
      status = attendanceStats.heatmapData[dateStr] || 'none';
    }
    if (attendanceStats && attendanceStats.cancelledReasons) {
      cancelReason = attendanceStats.cancelledReasons[dateStr] || '';
    }

    // Display label mapping
    let statusLabel = 'No Session';
    let statusClass = 'none';
    if (status === 'live') {
      statusLabel = 'Live';
      statusClass = 'live';
    } else if (status === 'recording') {
      statusLabel = 'Recording';
      statusClass = 'recording';
    } else if (status === 'cancelled') {
      statusLabel = 'Cancelled';
      statusClass = 'cancelled';
    } else if (status === 'missed') {
      statusLabel = 'Absent';
      statusClass = 'absent';
    } else if (isFuture) {
      statusLabel = 'Scheduled';
      statusClass = 'future';
    }

    return {
      ...day,
      dateStr,
      formattedDate: targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }),
      status,
      statusLabel,
      statusClass,
      cancelReason,
      isFuture
    };
  });

  const extraCourseDays = (attendanceStats?.extraDays || []).map(extra => {
    const dateStr = getCalendarDateForDay(extra.dayId);
    
    const targetDate = new Date(Date.UTC(
      parseInt(dateStr.split('-')[0]),
      parseInt(dateStr.split('-')[1]) - 1,
      parseInt(dateStr.split('-')[2])
    ));
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    const isFuture = targetDate.getTime() > todayUTC.getTime();

    let status = 'none';
    if (attendanceStats && attendanceStats.heatmapData) {
      status = attendanceStats.heatmapData[dateStr] || 'none';
    }
    
    let statusLabel = 'No Session';
    let statusClass = 'none';
    if (status === 'live') {
      statusLabel = 'Live';
      statusClass = 'live';
    } else if (status === 'recording') {
      statusLabel = 'Recording';
      statusClass = 'recording';
    } else if (status === 'cancelled') {
      statusLabel = 'Cancelled';
      statusClass = 'cancelled';
    } else if (status === 'missed') {
      statusLabel = 'Absent';
      statusClass = 'absent';
    } else if (isFuture) {
      statusLabel = 'Scheduled';
      statusClass = 'future';
    }

    return {
      weekTitle: 'Additional Class',
      weekId: 'extra',
      dayId: extra.dayId,
      dayTitle: 'Extra Session',
      dateStr,
      formattedDate: targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }),
      status,
      statusLabel,
      statusClass,
      cancelReason: extra.cancelReason || '',
      isFuture,
      isExtra: true
    };
  });

  const combinedCourseDays = [...mappedCourseDays, ...extraCourseDays].sort((a, b) => new Date(a.dateStr) - new Date(b.dateStr));

  const filteredConsistencyDays = combinedCourseDays.filter(day => {
    const matchesSearch = 
      day.dayTitle.toLowerCase().includes(consistencySearch.toLowerCase()) ||
      day.weekTitle.toLowerCase().includes(consistencySearch.toLowerCase()) ||
      day.dayId.toLowerCase().includes(consistencySearch.toLowerCase());

    let matchesStatus = true;
    if (consistencyStatusFilter !== 'all') {
      if (consistencyStatusFilter === 'attended') {
        matchesStatus = day.status === 'live' || day.status === 'recording';
      } else if (consistencyStatusFilter === 'absent') {
        matchesStatus = day.status === 'missed';
      } else if (consistencyStatusFilter === 'cancelled') {
        matchesStatus = day.status === 'cancelled';
      } else if (consistencyStatusFilter === 'no_session') {
        matchesStatus = day.status === 'none' && !day.isFuture;
      } else if (consistencyStatusFilter === 'future') {
        matchesStatus = day.isFuture;
      }
    }

    return matchesSearch && matchesStatus;
  });

  const consistencyPerPage = 10;
  const consistencyTotalPages = Math.ceil(filteredConsistencyDays.length / consistencyPerPage);
  const currentConsistencyDays = filteredConsistencyDays.slice(
    (consistencyPage - 1) * consistencyPerPage,
    consistencyPage * consistencyPerPage
  );

  const handleConsistencySearchChange = (e) => {
    setConsistencySearch(e.target.value);
    setConsistencyPage(1);
  };
  const handleConsistencyStatusFilterChange = (e) => {
    setConsistencyStatusFilter(e.target.value);
    setConsistencyPage(1);
  };

  if (loading && users.length === 0) return <MainLayout><div className="loading-state">Accessing user records...</div></MainLayout>;

  return (
    <MainLayout>
      <div className="users-page">
        {selectedDetailUser ? (
          <div className="user-detail-container fade-in">
            {/* Top Navigation */}
            <div className="detail-navigation">
              <button className="back-btn-directory" onClick={() => { setSelectedDetailUser(null); setAttendanceStats(null); }}>
                <ArrowLeft size={18} />
                <span>Back to User Directory</span>
              </button>
              <h2 className="directory-nav-title">Personnel File: {selectedDetailUser.name}</h2>
            </div>

            {/* Profile Summary Card */}
            <div className="detail-profile-card card-3d">
              <div className="profile-summary-header">
                <div className="avatar-large-details" style={{ backgroundColor: getAvatarColor(selectedDetailUser.name) }}>
                  {selectedDetailUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="summary-info">
                  <h2>{selectedDetailUser.name}</h2>
                  <p className="summary-email">
                    <Mail size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    {selectedDetailUser.email}
                  </p>
                  <div className="summary-meta-badges">
                    <span className="badge-role" data-role={selectedDetailUser.role}>
                      <Shield size={12} style={{ marginRight: '4px' }} />
                      {selectedDetailUser.role}
                    </span>
                    <span className={`badge-status ${selectedDetailUser.isActive ? 'active' : 'inactive'}`}>
                      {selectedDetailUser.isActive ? 'Active' : 'Suspended'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="profile-summary-details">
                <div className="summary-col">
                  <span className="label">Registered On</span>
                  <span className="val">{new Date(selectedDetailUser.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="summary-col">
                  <span className="label">Unique Identifier</span>
                  <span className="val">{selectedDetailUser._id}</span>
                </div>
                <div className="summary-col">
                  <span className="label">Access Status</span>
                  <span className="val" style={{ color: selectedDetailUser.isActive ? '#16a34a' : '#dc2626', fontWeight: 700 }}>
                    {selectedDetailUser.isActive ? 'AUTHORIZED' : 'REVOKED'}
                  </span>
                </div>
                {selectedDetailUser.role === 'student' && (
                  <div className="summary-col">
                    <span className="label">Certificate Access</span>
                    <select
                      value={selectedDetailUser.certificateOverride || 'auto'}
                      onChange={async (e) => {
                        const newOverride = e.target.value;
                        try {
                          const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
                          const response = await axios.put(`/api/auth/users/${selectedDetailUser._id}/certificate-override`, {
                            override: newOverride
                          }, config);
                          if (response.data && response.data.user) {
                            const updatedUser = { 
                              ...selectedDetailUser, 
                              certificateOverride: response.data.user.certificateOverride 
                            };
                            setSelectedDetailUser(updatedUser);
                            setUsers(users.map(u => u._id === selectedDetailUser._id ? { ...u, certificateOverride: response.data.user.certificateOverride } : u));
                            showSnackbar(response.data.message || 'Certificate override updated.', 'success');
                          }
                        } catch (err) {
                          console.error(err);
                          showSnackbar(err.response?.data?.message || 'Failed to update certificate override.', 'error');
                        }
                      }}
                      style={{
                        background: 'rgba(0,0,0,0.03)',
                        border: '1px solid var(--app-border)',
                        color: 'var(--app-text)',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        marginTop: '4px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                    >
                      <option value="auto">Auto (100% Progress)</option>
                      <option value="unlocked">Force Unlocked</option>
                      <option value="locked">Force Locked</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {detailLoading ? (
              <div className="loading-state-details">Loading syllabus and submission analytics...</div>
            ) : (
              <>
                <div className="detail-tables-grid">
                {/* Table 1: Syllabus Progress */}
                <div className="detail-section-card card-3d">
                  <div className="section-header-title text-layout">
                    <h3>Syllabus Assignments</h3>
                    <span className="sub-count">Matches: {filteredSyllabus.length} of {courseData.reduce((acc, w) => acc + w.days.length, 0)} days</span>
                  </div>

                  {/* Syllabus Filters */}
                  <div className="detail-filters-row">
                    <input 
                      type="text" 
                      placeholder="Search syllabus..." 
                      value={syllabusSearch} 
                      onChange={(e) => { setSyllabusSearch(e.target.value); setSyllabusPage(1); }} 
                      className="detail-filter-input" 
                    />
                    <select 
                      value={syllabusWeekFilter} 
                      onChange={(e) => { setSyllabusWeekFilter(e.target.value); setSyllabusPage(1); }} 
                      className="detail-filter-select"
                    >
                      <option value="all">All Weeks</option>
                      {courseData.map((week, idx) => (
                        <option key={idx} value={String(idx)}>{week.weekTitle.split(':')[0]}</option>
                      ))}
                    </select>
                    <select 
                      value={syllabusStatusFilter} 
                      onChange={(e) => { setSyllabusStatusFilter(e.target.value); setSyllabusPage(1); }} 
                      className="detail-filter-select"
                    >
                      <option value="all">All Statuses</option>
                      <option value="locked">Locked</option>
                      <option value="pending_submission">Not Started</option>
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="table-scroll-wrapper">
                    <table className="detail-data-table">
                      <thead>
                        <tr>
                          <th>Day</th>
                          <th>Topic / Project</th>
                          <th style={{ textAlign: 'right' }}>Syllabus Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentSyllabus.length === 0 ? (
                          <tr>
                            <td colSpan="3" style={{ textAlign: 'center', padding: '40px', color: 'var(--app-text-muted)', fontStyle: 'italic' }}>
                              No matching syllabus topics found.
                            </td>
                          </tr>
                        ) : (
                          currentSyllabus.map(({ week, wIdx, day, dIdx, statusInfo, unlocked }) => (
                            <tr key={day.dayId}>
                              <td style={{ fontWeight: 700 }}>
                                {week.weekTitle.split(':')[0]} - {day.dayTitle.split(':')[0]}
                              </td>
                              <td>{day.dayTitle.split(':').slice(1).join(':').trim()}</td>
                              <td style={{ textAlign: 'right' }}>
                                {!unlocked ? (
                                  <span className="status-indicator locked">Locked</span>
                                ) : (
                                  <span className={`status-indicator ${statusInfo.status}`}>
                                    {statusInfo.label}
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Syllabus Pagination */}
                  {syllabusTotalPages > 1 && (
                    <div className="detail-pagination">
                      <span className="pagination-info">
                        Page <span className="bold">{syllabusPage}</span> of <span className="bold">{syllabusTotalPages}</span>
                      </span>
                      <div className="page-navigation">
                        <button 
                          className="page-btn" 
                          onClick={() => setSyllabusPage(p => Math.max(1, p - 1))}
                          disabled={syllabusPage === 1}
                        >
                          Prev
                        </button>
                        <div className="page-numbers">
                          {getPaginationRange(syllabusPage, syllabusTotalPages).map((p, idx) => (
                            p === '...' ? (
                              <span key={`dots-${idx}`} className="pagination-dots" style={{ padding: '0 8px', color: 'var(--app-text-muted)' }}>...</span>
                            ) : (
                              <button 
                                key={p} 
                                className={`page-btn ${syllabusPage === p ? 'active' : ''}`}
                                onClick={() => setSyllabusPage(p)}
                              >
                                {p}
                              </button>
                            )
                          ))}
                        </div>
                        <button 
                          className="page-btn" 
                          onClick={() => setSyllabusPage(p => Math.min(syllabusTotalPages, p + 1))}
                          disabled={syllabusPage === syllabusTotalPages}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Table 2: Submissions Log */}
                <div className="detail-section-card card-3d">
                  <div className="section-header-title text-layout">
                    <h3>Submission Log</h3>
                    <span className="sub-count">Matches: {filteredSubmissions.length} of {detailUserAssignments.length} projects</span>
                  </div>

                  {/* Submissions Filters */}
                  <div className="detail-filters-row">
                    <input 
                      type="text" 
                      placeholder="Search submissions..." 
                      value={submissionSearch} 
                      onChange={(e) => { setSubmissionSearch(e.target.value); setSubmissionPage(1); }} 
                      className="detail-filter-input" 
                    />
                    <select 
                      value={submissionStatusFilter} 
                      onChange={(e) => { setSubmissionStatusFilter(e.target.value); setSubmissionPage(1); }} 
                      className="detail-filter-select"
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="table-scroll-wrapper">
                    <table className="detail-data-table">
                      <thead>
                        <tr>
                          <th>Submitted Date</th>
                          <th>Project Name</th>
                          <th>Status</th>
                          <th>Instructor Feedback</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentSubmissions.length === 0 ? (
                          <tr>
                            <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: 'var(--app-text-muted)', fontStyle: 'italic' }}>
                              No project submissions logged for this user.
                            </td>
                          </tr>
                        ) : (
                          currentSubmissions.map((sub) => (
                            <tr key={sub._id}>
                              <td className="date-cell-details">
                                {new Date(sub.submittedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </td>
                              <td style={{ fontWeight: 700 }}>{sub.topicTitle}</td>
                              <td>
                                <span className={`status-indicator ${sub.status}`}>
                                  {sub.status}
                                </span>
                              </td>
                              <td className="feedback-cell-details">
                                {sub.feedback ? (
                                  <div className="feedback-bubble-mini" title={sub.feedback}>
                                    {sub.feedback}
                                  </div>
                                ) : (
                                  <span style={{ color: 'var(--app-text-muted)', fontStyle: 'italic' }}>None</span>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Submissions Pagination */}
                  {submissionTotalPages > 1 && (
                    <div className="detail-pagination">
                      <span className="pagination-info">
                        Page <span className="bold">{submissionPage}</span> of <span className="bold">{submissionTotalPages}</span>
                      </span>
                      <div className="page-navigation">
                        <button 
                          className="page-btn" 
                          onClick={() => setSubmissionPage(p => Math.max(1, p - 1))}
                          disabled={submissionPage === 1}
                        >
                          Prev
                        </button>
                        <div className="page-numbers">
                          {getPaginationRange(submissionPage, submissionTotalPages).map((p, idx) => (
                            p === '...' ? (
                              <span key={`dots-${idx}`} className="pagination-dots" style={{ padding: '0 8px', color: 'var(--app-text-muted)' }}>...</span>
                            ) : (
                              <button 
                                key={p} 
                                className={`page-btn ${submissionPage === p ? 'active' : ''}`}
                                onClick={() => setSubmissionPage(p)}
                              >
                                {p}
                              </button>
                            )
                          ))}
                        </div>
                        <button 
                          className="page-btn" 
                          onClick={() => setSubmissionPage(p => Math.min(submissionTotalPages, p + 1))}
                          disabled={submissionPage === submissionTotalPages}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {attendanceLoading ? (
                <div className="loading-state-details" style={{ marginTop: '24px' }}>Loading student attendance records...</div>
              ) : attendanceStats ? (
                <div className="detail-tables-grid" style={{ marginTop: '24px' }}>
                  {/* Card 1: Attendance Heatmap & Stats */}
                  <div className="detail-section-card card-3d">
                    <div className="section-header-title text-layout">
                      <h3>Attendance Heatmap & Streaks</h3>
                    </div>

                    <div className="attendance-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
                      {/* Attendance Rate */}
                      <div className="att-stat-item rate-stat-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '16px' }}>
                        <div className="radial-progress-container" style={{ position: 'relative', width: '56px', height: '56px' }}>
                          <svg width="56" height="56" viewBox="0 0 44 44" className="circular-progress">
                            <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="3" />
                            <circle cx="22" cy="22" r="18" fill="none" stroke="url(#progressGradDetails)" strokeWidth="3" 
                                    strokeDasharray="113" strokeDashoffset={113 - (113 * attendanceStats.attendancePercentage) / 100}
                                    strokeLinecap="round" transform="rotate(-90 22 22)" />
                            <defs>
                              <linearGradient id="progressGradDetails" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#0ea5e9" />
                                <stop offset="100%" stopColor="#10b981" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="radial-progress-value" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '0.8rem', fontWeight: 800 }}>{attendanceStats.attendancePercentage}%</div>
                        </div>
                        <div className="att-stat-details">
                          <h4 style={{ margin: 0, fontSize: '0.85rem', color: 'var(--app-text-muted)' }}>Rate</h4>
                          <p style={{ margin: '2px 0 4px', fontSize: '0.9rem', fontWeight: 700 }}>{attendanceStats.attendedCount} / {attendanceStats.totalSessions} Present</p>
                          <span className={`status-indicator ${
                            attendanceStats.attendancePercentage >= 90 ? 'accepted' : 
                            attendanceStats.attendancePercentage >= 75 ? 'pending' : 'rejected'
                          }`} style={{ fontSize: '0.6rem', padding: '2px 6px' }}>
                            {attendanceStats.attendancePercentage >= 90 ? 'Excellent' : 
                             attendanceStats.attendancePercentage >= 75 ? 'On Track' : 'Low Attendance'}
                          </span>
                        </div>
                      </div>

                      {/* Current Streak */}
                      <div className="att-stat-item streak-stat-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '16px' }}>
                        <div className="att-stat-icon-wrapper flame-icon" style={{ background: attendanceStats.currentStreak > 0 ? 'rgba(249, 115, 22, 0.1)' : 'rgba(0,0,0,0.05)', color: attendanceStats.currentStreak > 0 ? '#f97316' : '#64748b', padding: '10px', borderRadius: '12px' }}>
                          <Flame size={20} className={attendanceStats.currentStreak > 0 ? 'glowing-flame' : ''} />
                        </div>
                        <div className="att-stat-details" style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ margin: 0, fontSize: '0.85rem', color: 'var(--app-text-muted)' }}>{attendanceStats.currentStreak} Days</h4>
                          <p style={{ margin: '2px 0 0', fontSize: '0.9rem', fontWeight: 700 }}>Current Streak</p>
                        </div>
                      </div>

                      {/* Live Sessions */}
                      <div className="att-stat-item" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '16px' }}>
                        <div className="att-stat-icon-wrapper calendar-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#16a34a', padding: '10px', borderRadius: '12px' }}>
                          <CheckCircle2 size={20} />
                        </div>
                        <div className="att-stat-details">
                          <h4 style={{ margin: 0, fontSize: '0.85rem', color: 'var(--app-text-muted)' }}>{attendanceStats.liveCount || 0} / {attendanceStats.totalSessions}</h4>
                          <p style={{ margin: '2px 0 0', fontSize: '0.9rem', fontWeight: 700 }}>Live Sessions</p>
                        </div>
                      </div>

                      {/* Recordings Watched */}
                      <div className="att-stat-item" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '16px' }}>
                        <div className="att-stat-icon-wrapper percent-icon" style={{ background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9', padding: '10px', borderRadius: '12px' }}>
                          <Clock size={20} />
                        </div>
                        <div className="att-stat-details">
                          <h4 style={{ margin: 0, fontSize: '0.85rem', color: 'var(--app-text-muted)' }}>{attendanceStats.recordingCount || 0} Sessions</h4>
                          <p style={{ margin: '2px 0 0', fontSize: '0.9rem', fontWeight: 700 }}>Recordings Watched</p>
                        </div>
                      </div>
                    </div>

                    {/* Heatmap Filters & Headers */}
                    <div className="heatmap-header-container" style={{ marginTop: '16px', borderTop: '1px solid var(--app-border)', paddingTop: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Attendance Heatmap</h4>
                        
                        {/* Hover tooltip display */}
                        <div className="hover-tooltip-display" style={{ fontSize: '0.8rem', color: 'var(--app-text-muted)', minHeight: '20px' }}>
                          {hoveredCell ? (
                            <span className="tooltip-text fade-in">
                              {hoveredCell.dateLabel} • <strong style={{ 
                                color: hoveredCell.status === 'live' ? '#10b981' : 
                                       hoveredCell.status === 'recording' ? '#0ea5e9' : 
                                       hoveredCell.status === 'missed' ? '#ef4444' : 
                                       hoveredCell.status === 'cancelled' ? '#d97706' : 'var(--app-text-muted)' 
                              }}>
                                {hoveredCell.status === 'live' ? 'Live' : 
                                 hoveredCell.status === 'recording' ? 'Recording' : 
                                 hoveredCell.status === 'missed' ? 'Missed' : 
                                 hoveredCell.status === 'cancelled' ? `Cancelled: ${hoveredCell.reason || 'No Session Held'}` : 'No Class'}
                              </strong>
                            </span>
                          ) : (
                            <span className="tooltip-text-placeholder">Hover cell for details</span>
                          )}
                        </div>
                      </div>

                      <div className="heatmap-filters" style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                        <div className="filter-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="filter-label" style={{ fontSize: '0.75rem', color: 'var(--app-text-muted)', fontWeight: 600 }}>Time:</span>
                          <div className="filter-buttons" style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.03)', padding: '2px', borderRadius: '8px' }}>
                            {['all', '90', '60', '30'].map(t => (
                              <button 
                                key={t}
                                className={`filter-btn ${timeRange === t ? 'active' : ''}`} 
                                onClick={() => setTimeRange(t)}
                                style={{
                                  border: 'none',
                                  background: timeRange === t ? 'white' : 'transparent',
                                  color: timeRange === t ? 'var(--app-text)' : 'var(--app-text-muted)',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '0.7rem',
                                  fontWeight: 700,
                                  boxShadow: timeRange === t ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
                                }}
                              >
                                {t === 'all' ? '15W' : `${t}D`}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="filter-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="filter-label" style={{ fontSize: '0.75rem', color: 'var(--app-text-muted)', fontWeight: 600 }}>Status:</span>
                          <div className="filter-buttons" style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.03)', padding: '2px', borderRadius: '8px' }}>
                            {['all', 'attended', 'missed'].map(s => (
                              <button 
                                key={s}
                                className={`filter-btn ${statusFilter === s ? 'active' : ''}`} 
                                onClick={() => setStatusFilter(s)}
                                style={{
                                  border: 'none',
                                  background: statusFilter === s ? 'white' : 'transparent',
                                  color: statusFilter === s ? 'var(--app-text)' : 'var(--app-text-muted)',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '0.7rem',
                                  fontWeight: 700,
                                  boxShadow: statusFilter === s ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
                                }}
                              >
                                {s === 'all' ? 'All' : s === 'attended' ? 'Attended' : 'Missed'}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="heatmap-container" style={{ display: 'flex', gap: '12px', background: 'rgba(0,0,0,0.01)', padding: '16px', borderRadius: '16px', border: '1px solid var(--app-border)' }}>
                      <div className="day-labels" style={{ display: 'grid', gridTemplateRows: 'repeat(7, 14px)', gap: '4px', fontSize: '0.65rem', color: 'var(--app-text-muted)', alignItems: 'center' }}>
                        <span>Sun</span>
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                      </div>

                      <div className="heatmap-grid-scroll-wrapper" style={{ overflowX: 'auto', flex: 1 }}>
                        <div className="heatmap-grid" style={{ display: 'grid', gridTemplateRows: 'repeat(7, 14px)', gridAutoFlow: 'column', gap: '4px', width: 'max-content' }}>
                          {generateHeatmapDays().map((day, idx) => {
                            const yyyy = day.getUTCFullYear();
                            const mm = String(day.getUTCMonth() + 1).padStart(2, '0');
                            const dd = String(day.getUTCDate()).padStart(2, '0');
                            const dateStr = `${yyyy}-${mm}-${dd}`;
                            const status = attendanceStats.heatmapData[dateStr] || 'none';
                            const reason = attendanceStats.cancelledReasons ? attendanceStats.cancelledReasons[dateStr] : '';
                            
                            const today = new Date();
                            const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
                            const isFuture = day.getTime() > todayUTC.getTime();
                            const dateLabel = day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

                            const diffTime = Math.abs(todayUTC.getTime() - day.getTime());
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            
                            let isFilteredByTime = false;
                            if (timeRange === '30' && diffDays > 30) isFilteredByTime = true;
                            if (timeRange === '60' && diffDays > 60) isFilteredByTime = true;
                            if (timeRange === '90' && diffDays > 90) isFilteredByTime = true;

                            let isFilteredByStatus = false;
                            if (statusFilter === 'attended' && status !== 'live' && status !== 'recording') isFilteredByStatus = true;
                            if (statusFilter === 'missed' && status !== 'missed') isFilteredByStatus = true;

                            const isDimmed = isFilteredByTime || isFilteredByStatus;

                            return (
                              <div
                                key={idx}
                                className={`heatmap-cell cell-${status} ${isFuture ? 'cell-future' : ''} ${isDimmed ? 'cell-dimmed' : ''}`}
                                style={{
                                  gridRow: (day.getUTCDay() + 1),
                                }}
                                onMouseEnter={() => setHoveredCell({ dateLabel, status, reason })}
                                onMouseLeave={() => setHoveredCell(null)}
                                title={`${dateLabel}: ${
                                  status === 'live' ? 'Attended (Live)' : 
                                  status === 'recording' ? 'Attended (Recording)' : 
                                  status === 'missed' ? 'Missed' : 
                                  status === 'cancelled' ? `Cancelled: ${reason || 'No Session Held'}` : 'No Class'
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="heatmap-legend" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginTop: '12px', fontSize: '0.7rem', color: 'var(--app-text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span className="legend-cell cell-none" style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(0,0,0,0.04)', display: 'inline-block' }}></span> No Session</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span className="legend-cell cell-live" style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#10b981', display: 'inline-block' }}></span> Live</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span className="legend-cell cell-recording" style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#0ea5e9', display: 'inline-block' }}></span> Recording</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span className="legend-cell cell-cancelled" style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#f59e0b', display: 'inline-block' }}></span> Cancelled</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span className="legend-cell cell-missed" style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#ef4444', display: 'inline-block' }}></span> Absent</span>
                    </div>
                  </div>

                  {/* Card 2: Attendance Consistency Matrix */}
                  <div className="detail-section-card card-3d">
                    <div className="section-header-title text-layout">
                      <h3>Attendance Consistency Matrix</h3>
                      <span className="sub-count">Matches: {filteredConsistencyDays.length} of {combinedCourseDays.length} course days</span>
                    </div>

                    {/* Filters Row */}
                    <div className="detail-filters-row" style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                      <input 
                        type="text" 
                        placeholder="Search days or topics..." 
                        value={consistencySearch} 
                        onChange={handleConsistencySearchChange} 
                        className="detail-filter-input"
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--app-border)',
                          background: 'transparent',
                          color: 'var(--app-text)',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      />
                      <select 
                        value={consistencyStatusFilter} 
                        onChange={handleConsistencyStatusFilterChange} 
                        className="detail-filter-select"
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--app-border)',
                          background: 'var(--app-card-bg)',
                          color: 'var(--app-text)',
                          fontSize: '0.85rem',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="all">All Markings</option>
                        <option value="attended">Attended (Live/Rec)</option>
                        <option value="absent">Absent</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="no_session">No Session</option>
                        <option value="future">Scheduled</option>
                      </select>
                    </div>

                    {/* Table Scroll Wrapper */}
                    <div className="detail-table-wrapper" style={{ overflowX: 'auto' }}>
                      <table className="detail-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--app-border)', textAlign: 'left' }}>
                            <th style={{ padding: '10px 8px', fontSize: '0.8rem', color: 'var(--app-text-muted)' }}>Day</th>
                            <th style={{ padding: '10px 8px', fontSize: '0.8rem', color: 'var(--app-text-muted)' }}>Calendar Date</th>
                            <th style={{ padding: '10px 8px', fontSize: '0.8rem', color: 'var(--app-text-muted)', textAlign: 'right' }}>Marking</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentConsistencyDays.length === 0 ? (
                            <tr>
                              <td colSpan="3" style={{ textAlign: 'center', padding: '40px', color: 'var(--app-text-muted)', fontStyle: 'italic' }}>
                                No matching course days found.
                              </td>
                            </tr>
                          ) : (
                            currentConsistencyDays.map((day) => (
                              <tr key={day.dayId} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                                <td style={{ padding: '10px 8px', fontSize: '0.85rem' }}>
                                  <div style={{ fontWeight: 700 }}>
                                    {day.isExtra ? (
                                      <span style={{ color: 'var(--primary-cyan)', fontWeight: 800 }}>EXTRA CLASS</span>
                                    ) : (
                                      `${day.weekId.toUpperCase()} - ${day.dayId.split('-')[1].toUpperCase()}`
                                    )}
                                  </div>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--app-text-muted)', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={day.dayTitle}>
                                    {day.dayTitle}
                                  </div>
                                  {day.isExtra && day.dayId.startsWith('extra-') && (
                                    <div style={{ fontSize: '0.7rem', color: 'var(--app-text-muted)', marginTop: '2px' }}>
                                      {day.dayId.substring(6)}
                                    </div>
                                  )}
                                </td>
                                <td style={{ padding: '10px 8px', fontSize: '0.85rem', color: 'var(--app-text-muted)' }}>
                                  {day.formattedDate}
                                </td>
                                <td style={{ padding: '10px 8px', fontSize: '0.85rem', textAlign: 'right' }}>
                                  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                                    {day.status === 'cancelled' ? (
                                      <>
                                        <span className="status-indicator cancelled">
                                          Cancelled
                                        </span>
                                        {day.cancelReason && (
                                          <span style={{ fontSize: '0.7rem', color: '#d97706', fontStyle: 'italic', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={day.cancelReason}>
                                            {day.cancelReason}
                                          </span>
                                        )}
                                      </>
                                    ) : day.isFuture ? (
                                      <span className="status-indicator future">
                                        Scheduled
                                      </span>
                                    ) : updatingDays[day.dayId] ? (
                                      <div 
                                        className="mini-spinner" 
                                        style={{ margin: '4px 20px 4px 0' }} 
                                      />
                                    ) : (
                                      <select
                                        className={`status-indicator status-indicator-select ${day.status === 'live' ? 'live' : (day.status === 'recording' ? 'recording' : 'absent')}`}
                                        value={day.status === 'live' ? 'live' : (day.status === 'recording' ? 'recording' : 'absent')}
                                        onChange={(e) => handleUpdateAttendanceStatus(day.dayId, e.target.value)}
                                        style={{ outline: 'none' }}
                                      >
                                        <option value="live" className="option-live" style={{ color: '#16a34a', backgroundColor: '#f0fdf4', fontWeight: 'bold' }}>Live</option>
                                        <option value="recording" className="option-recording" style={{ color: '#0ea5e9', backgroundColor: '#f0f9ff', fontWeight: 'bold' }}>Recording</option>
                                        <option value="absent" className="option-absent" style={{ color: '#dc2626', backgroundColor: '#fef2f2', fontWeight: 'bold' }}>Absent</option>
                                      </select>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Section */}
                    {consistencyTotalPages > 1 && (
                      <div className="detail-pagination" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1px solid var(--app-border)', paddingTop: '12px' }}>
                        <span className="pagination-info" style={{ fontSize: '0.8rem', color: 'var(--app-text-muted)' }}>
                          Page <span className="bold" style={{ fontWeight: 700 }}>{consistencyPage}</span> of <span className="bold" style={{ fontWeight: 700 }}>{consistencyTotalPages}</span>
                        </span>
                        <div className="page-navigation" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <button 
                            className="page-btn" 
                            onClick={() => setConsistencyPage(p => Math.max(1, p - 1))}
                            disabled={consistencyPage === 1}
                            style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--app-border)', background: 'transparent', cursor: 'pointer', fontSize: '0.75rem' }}
                          >
                            Prev
                          </button>
                          <div className="page-numbers" style={{ display: 'flex', gap: '4px' }}>
                            {getPaginationRange(consistencyPage, consistencyTotalPages).map((p, idx) => (
                              p === '...' ? (
                                <span key={`dots-${idx}`} className="pagination-dots" style={{ padding: '0 4px', color: 'var(--app-text-muted)' }}>...</span>
                              ) : (
                                <button 
                                  key={p} 
                                  className={`page-btn ${consistencyPage === p ? 'active' : ''}`}
                                  onClick={() => setConsistencyPage(p)}
                                  style={{
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    border: '1px solid var(--app-border)',
                                    background: consistencyPage === p ? 'var(--primary-cyan)' : 'transparent',
                                    color: consistencyPage === p ? 'white' : 'var(--app-text)',
                                    cursor: 'pointer',
                                    fontSize: '0.75rem',
                                    fontWeight: 700
                                  }}
                                >
                                  {p}
                                </button>
                              )
                            ))}
                          </div>
                          <button 
                            className="page-btn" 
                            onClick={() => setConsistencyPage(p => Math.min(consistencyTotalPages, p + 1))}
                            disabled={consistencyPage === consistencyTotalPages}
                            style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--app-border)', background: 'transparent', cursor: 'pointer', fontSize: '0.75rem' }}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="empty-records-card" style={{ marginTop: '24px', padding: '24px', background: 'var(--app-card-bg)', border: '1px solid var(--app-border)', borderRadius: '16px', textAlign: 'center', color: 'var(--app-text-muted)' }}>
                  No attendance records found for this student.
                </div>
              )}
              </>
            )}
          </div>
        ) : (
          <>
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
                <div className="header-actions-group">
                  <select
                    onChange={(e) => {
                      const action = e.target.value;
                      if (!action) return;

                      const actionLabels = {
                        unlocked: 'Force Unlock ALL Student Certificates',
                        locked: 'Force Lock ALL Student Certificates',
                        auto: 'Reset ALL Student Certificates to Auto'
                      };

                      showConfirm(
                        'Global Certificate Update',
                        `Are you sure you want to ${actionLabels[action]}? This override will apply to all students.`,
                        async () => {
                          try {
                            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
                            const response = await axios.post('/api/auth/users/certificate-override-all', {
                              override: action
                            }, config);
                            if (response.data) {
                              showSnackbar(response.data.message || 'Global certificate status updated successfully.', 'success');
                              fetchUsers();
                            }
                          } catch (err) {
                            console.error(err);
                            showSnackbar(err.response?.data?.message || 'Failed to update global certificates.', 'error');
                          }
                        }
                      );
                      e.target.value = "";
                    }}
                    style={{
                      background: 'rgba(217, 119, 6, 0.08)',
                      color: '#d97706',
                      border: '1px solid rgba(217, 119, 6, 0.2)',
                      padding: '10px 20px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  >
                    <option value="">Certificates Action</option>
                    <option value="unlocked">🔓 Unlock All Certificates</option>
                    <option value="locked">🔒 Lock All Certificates</option>
                    <option value="auto">🔄 Reset All to Auto</option>
                  </select>
                  <button 
                    className="btn btn-secondary excel-import-btn" 
                    onClick={() => setIsExcelModalOpen(true)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      background: 'rgba(0, 209, 209, 0.05)', 
                      color: 'var(--primary-cyan)', 
                      border: '1px solid rgba(0, 209, 209, 0.2)', 
                      padding: '10px 20px', 
                      borderRadius: '10px', 
                      fontWeight: 700, 
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    <FileSpreadsheet size={18} />
                    Excel Import
                  </button>
                  <button className="btn btn-primary add-user-btn" onClick={() => setIsAddModalOpen(true)}>
                    <Plus size={18} />
                    Add Personnel
                  </button>
                </div>
              </div>

              <div className="header-bottom">
                <div className="search-container">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Filter personnel by name, email or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="filter-group-users">
                  <div className="density-select">
                    <Filter size={16} />
                    <select value={usersPerPage} onChange={(e) => setUsersPerPage(Number(e.target.value))}>
                      <option value={10}>10 Rows</option>
                      <option value={20}>20 Rows</option>
                      <option value={50}>50 Rows</option>
                    </select>
                  </div>
                  {searchTerm && (
                    <button className="reset-btn-users" onClick={resetFilters}>
                      <RotateCcw size={14} />
                      Reset
                    </button>
                  )}
                </div>

                <div className="stats-mini">
                  <span>Total Active: <strong>{users.length}</strong></span>
                  <span>Administrative: <strong>{users.filter(u => u.role === 'admin' || u.role === 'superadmin').length}</strong></span>
                </div>
              </div>
            </div>

            {isExcelModalOpen && (
              <div className="modal-overlay">
                <div className="modal-content card-3d excel-modal" style={{ maxWidth: '600px' }}>
                  <div className="modal-header">
                    <div className="modal-icon">
                      <FileSpreadsheet size={24} />
                    </div>
                    <div>
                      <h3 style={{ margin: 0 }}>Batch Personnel Onboarding</h3>
                      <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#64748b' }}>Import multiple users simultaneously via Excel/CSV templates</p>
                    </div>
                    <button className="close-btn" onClick={() => { setIsExcelModalOpen(false); setExcelUsers([]); setExcelFile(null); }}>
                      <X size={20} />
                    </button>
                  </div>

                  <div className="excel-workflow" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '55vh', overflowY: 'auto', paddingRight: '8px' }}>
                    
                    {/* Step 1: Download Template */}
                    <div className="workflow-step" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', display: 'flex', justifycontent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>1. Get Configuration Spreadsheet</h4>
                        <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#64748b' }}>Download our prepared template containing required user schemas.</p>
                      </div>
                      <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={downloadTemplate}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0, 209, 209, 0.08)', color: 'var(--primary-cyan)', border: '1px solid rgba(0, 209, 209, 0.2)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}
                      >
                        <Download size={14} />
                        Download Schema
                      </button>
                    </div>

                    {/* Step 2: Drag and Drop Zone */}
                    <div className="workflow-step" style={{ flexShrink: 0 }}>
                      <h4 style={{ margin: '0 0 10px', fontSize: '0.95rem', fontWeight: 700 }}>2. Upload Populated Template</h4>
                      
                      <div 
                        className={`dropzone-container ${dragActive ? 'active' : ''}`}
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        style={{
                          border: dragActive ? '2px dashed var(--primary-cyan)' : '2px dashed #cbd5e1',
                          background: dragActive ? 'rgba(0, 209, 209, 0.02)' : '#f8fafc',
                          borderRadius: '16px',
                          padding: '30px 20px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          position: 'relative'
                        }}
                        onClick={() => document.getElementById('file-upload-input').click()}
                      >
                        <input 
                          id="file-upload-input" 
                          type="file" 
                          accept=".csv, .xlsx, .xls"
                          onChange={handleFileSelect}
                          style={{ display: 'none' }}
                        />
                        
                        <Upload size={32} style={{ color: dragActive ? 'var(--primary-cyan)' : '#94a3b8', marginBottom: '12px' }} />
                        {excelFile ? (
                          <div>
                            <p style={{ margin: 0, fontWeight: 700, color: '#1e293b', fontSize: '0.9rem' }}>{excelFile.name}</p>
                            <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>
                              Detected {excelUsers.length} valid personnel record(s) ready to synchronize
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p style={{ margin: 0, fontWeight: 700, color: '#475569', fontSize: '0.9rem' }}>Drag & drop populated spreadsheet template here</p>
                            <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>Supports Excel (.xlsx) or CSV (.csv) formats up to 10MB</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Step 3: parsed preview */}
                    {excelUsers.length > 0 && (
                      <div className="parsed-preview-container" style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', flexShrink: 0 }}>
                        <div style={{ background: '#f8fafc', padding: '10px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifycontent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.5px' }}>Data Schema Preview</span>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-cyan)' }}>Total: {excelUsers.length}</span>
                        </div>
                        <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
                            <thead>
                              <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
                                <th style={{ padding: '8px 12px', color: '#64748b' }}>Name</th>
                                <th style={{ padding: '8px 12px', color: '#64748b' }}>Email</th>
                                <th style={{ padding: '8px 12px', color: '#64748b' }}>Role</th>
                              </tr>
                            </thead>
                            <tbody>
                              {excelUsers.slice(0, 5).map((user, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>{user.name}</td>
                                  <td style={{ padding: '8px 12px', color: '#64748b' }}>{user.email}</td>
                                  <td style={{ padding: '8px 12px' }}>
                                    <span style={{ padding: '2px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700, background: user.role === 'admin' ? 'rgba(0, 209, 209, 0.08)' : '#f1f5f9', color: user.role === 'admin' ? 'var(--primary-cyan)' : '#475569' }}>
                                      {user.role}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                              {excelUsers.length > 5 && (
                                <tr>
                                  <td colSpan="3" style={{ padding: '8px 12px', textAlign: 'center', color: '#94a3b8', background: '#f8fafc' }}>
                                    + {excelUsers.length - 5} more records parsed
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Import Status Progress */}
                    {isImporting && (
                      <div className="import-progress-container" style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', flexShrink: 0 }}>
                        <div style={{ display: 'flex', justifycontent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-cyan)' }}>
                            <Database size={16} />
                            Synchronizing with Main Directory...
                          </span>
                          <span>{importProgress}%</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${importProgress}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary-cyan) 0%, #3b82f6 100%)', transition: 'width 0.1s ease', borderRadius: '4px' }}></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="modal-footer" style={{ marginTop: '30px' }}>
                    <button 
                      type="button" 
                      className="btn btn-ghost" 
                      onClick={() => { setIsExcelModalOpen(false); setExcelUsers([]); setExcelFile(null); }}
                      disabled={isImporting}
                      style={{ width: '50%' }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-primary" 
                      onClick={handleBatchImport}
                      disabled={excelUsers.length === 0 || isImporting}
                      style={{ width: '50%', background: 'linear-gradient(135deg, var(--primary-cyan) 0%, #3b82f6 100%)' }}
                    >
                      {isImporting ? 'Syncing...' : `Import ${excelUsers.length} Users`}
                    </button>
                  </div>
                </div>
              </div>
            )}

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
                    <tr 
                      key={u._id} 
                      className={`${!u.isActive ? 'inactive-row' : ''} clickable-user-row`}
                      onClick={() => {
                        setSelectedDetailUser(u);
                        fetchDetailUserAssignments(u);
                        fetchDetailUserAttendance(u);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
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
                      <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
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

              {filteredUsers.length > 0 && (
                <div className="audit-pagination">
                  <div className="pagination-info">
                    Showing <span className="bold">{indexOfFirstUser + 1}</span> to <span className="bold">{Math.min(indexOfLastUser, filteredUsers.length)}</span> of <span className="bold">{filteredUsers.length}</span> records
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
                        {getPaginationRange(currentPage, totalPages).map((p, idx) => (
                          p === '...' ? (
                            <span key={`dots-${idx}`} className="pagination-dots" style={{ padding: '0 8px', color: 'var(--app-text-muted)' }}>...</span>
                          ) : (
                            <button
                              key={p}
                              onClick={() => paginate(p)}
                              className={`page-btn ${currentPage === p ? 'active' : ''}`}
                            >
                              {p}
                            </button>
                          )
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
          </>
        )}

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
        
        .header-bottom { display: flex; justify-content: space-between; align-items: center; background: var(--app-card-bg); padding: 12px 20px; border-radius: 16px; border: 1px solid var(--app-border); gap: 20px; }
        .search-container { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 200px; }
        .search-container input { background: transparent; border: none; color: var(--app-text); width: 100%; outline: none; font-size: 0.95rem; }
        .search-container svg { color: var(--app-text-muted); }
        .filter-group-users { display: flex; align-items: center; gap: 12px; }
        .density-select { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 10px; }
        .density-select select { border: none; background: transparent; outline: none; font-size: 0.85rem; color: #1e293b; font-weight: 600; cursor: pointer; }
        .density-select svg { color: #94a3b8; }
        .reset-btn-users { display: flex; align-items: center; gap: 6px; background: #f1f5f9; border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 10px; color: #64748b; font-weight: 700; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .reset-btn-users:hover { background: #e2e8f0; color: #1e293b; }
        .stats-mini { display: flex; gap: 24px; font-size: 0.85rem; color: var(--app-text-muted); border-left: 1px solid var(--app-border); padding-left: 24px; white-space: nowrap; }
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
          .users-page { padding: 20px; padding-bottom: 80px; }
          .header-top { flex-direction: column; align-items: stretch; gap: 16px; }
          .header-title { gap: 12px; }
          .header-title h1 { font-size: 1.5rem; }
          .header-bottom { flex-direction: column; gap: 12px; align-items: stretch; }
          .filter-group-users { justify-content: space-between; }
          .density-select, .reset-btn-users { flex: 1; justify-content: center; }
          .stats-mini { border-left: none; border-top: 1px solid var(--app-border); padding: 12px 0 0; justify-content: space-around; }
          .search-container { max-width: none; }
          .audit-pagination { flex-direction: column; gap: 16px; text-align: center; }
          .page-navigation { width: 100%; justify-content: center; }
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

        /* Pagination Style (Synced with Audit) */
        .audit-pagination { display: flex; justify-content: space-between; align-items: center; padding: 20px; border-top: 1px solid #f1f5f9; margin-top: 12px; }
        .pagination-info { color: #64748b; font-size: 0.85rem; font-weight: 500; }
        .pagination-info .bold { color: #1e293b; font-weight: 700; }
        .page-navigation { display: flex; align-items: center; gap: 12px; }
        .page-numbers { display: flex; gap: 8px; }
        .page-btn { min-width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; border-radius: 10px; border: 1px solid #e2e8f0; background: white; color: #64748b; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; }
        .page-btn:hover:not(:disabled) { border-color: #00d1d1; color: #00d1d1; background: rgba(0, 209, 209, 0.05); transform: translateY(-2px); }
        .page-btn.active { background: #00d1d1; color: white; border-color: #00d1d1; box-shadow: 0 4px 12px rgba(0, 209, 209, 0.3); }
        .page-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        .empty-state { padding: 60px; text-align: center; color: var(--app-text-muted); }
        .empty-state p { margin-top: 16px; font-size: 1rem; }

        /* Modal Redesign (Light Theme) */
        .users-page .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(4px); display: flex; align-items: flex-start; justify-content: center; z-index: 1000; padding: 40px 20px; overflow-y: auto; animation: fadeIn 0.3s ease; }
        .users-page .modal-content { background: white; border: 1px solid rgba(0,0,0,0.05); border-radius: 24px; width: 100%; max-width: 500px; padding: 40px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); color: #1e293b; margin: auto; }
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

        /* User Detail View Styles */
        .user-detail-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          animation: fadeIn 0.4s ease;
        }
        .detail-navigation {
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 1px solid var(--app-border);
          padding-bottom: 16px;
          margin-bottom: 8px;
        }
        .back-btn-directory {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--app-card-bg);
          border: 1px solid var(--app-border);
          padding: 8px 16px;
          border-radius: 10px;
          font-weight: 700;
          color: var(--app-text);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.85rem;
        }
        .back-btn-directory:hover {
          background: var(--light-secondary);
          transform: translateX(-3px);
          box-shadow: var(--shadow-sm);
        }
        .directory-nav-title {
          font-size: 1.25rem;
          font-weight: 800;
          margin: 0;
          color: var(--app-text);
        }
        
        .detail-profile-card {
          background: var(--app-card-bg);
          border: 1px solid var(--app-border);
          border-radius: 24px;
          padding: 24px 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .profile-summary-header {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .avatar-large-details {
          width: 72px;
          height: 72px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 1.8rem;
          box-shadow: var(--shadow-md);
          border: 2px solid white;
        }
        .summary-info h2 {
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0 0 4px 0;
          color: var(--app-text);
        }
        .summary-email {
          color: var(--app-text-muted);
          font-size: 0.9rem;
          margin-bottom: 8px;
        }
        .summary-meta-badges {
          display: flex;
          gap: 10px;
        }
        .badge-role {
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          background: rgba(0, 209, 209, 0.08);
          color: #00d1d1;
        }
        .badge-role[data-role='student'] {
          background: rgba(0, 71, 171, 0.08);
          color: var(--primary-blue);
        }
        .badge-status {
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .badge-status.active {
          background: #f0fdf4;
          color: #16a34a;
        }
        .badge-status.inactive {
          background: #fef2f2;
          color: #dc2626;
        }
        
        .profile-summary-details {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          border-top: 1px solid var(--app-border);
          padding-top: 20px;
        }
        .summary-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .summary-col .label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--app-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .summary-col .val {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--app-text);
        }
        
        .loading-state-details {
          text-align: center;
          padding: 48px;
          color: var(--app-text-muted);
          font-size: 1rem;
          font-style: italic;
        }
        
        .detail-tables-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 24px;
        }
        .detail-section-card {
          background: var(--app-card-bg);
          border: 1px solid var(--app-border);
          border-radius: 24px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .section-header-title {
          margin-bottom: 20px;
          border-bottom: 1px solid var(--app-border);
          padding-bottom: 12px;
        }
        .section-header-title h3 {
          font-size: 1.1rem;
          font-weight: 800;
          margin: 0 0 2px 0;
          color: var(--app-text);
        }
        .section-header-title .sub-count {
          font-size: 0.8rem;
          color: var(--app-text-muted);
        }
        
        .table-scroll-wrapper {
          overflow-y: auto;
          max-height: 480px;
        }
        .detail-data-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .detail-data-table th {
          padding: 12px;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--app-text-muted);
          border-bottom: 1px solid var(--app-border);
          font-weight: 800;
          position: sticky;
          top: 0;
          background: var(--app-card-bg);
          z-index: 1;
        }
        .detail-data-table td {
          padding: 12px;
          font-size: 0.85rem;
          color: var(--app-text);
          border-bottom: 1px solid rgba(0, 0, 0, 0.03);
          vertical-align: middle;
        }
        .detail-data-table tr:hover {
          background: rgba(0, 0, 0, 0.01);
        }
        
        .status-indicator {
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          display: inline-block;
        }
        .status-indicator.pending {
          background: #fffbeb;
          color: #d97706;
        }
        .status-indicator.accepted {
          background: #f0fdf4;
          color: #16a34a;
        }
        .status-indicator.rejected {
          background: #fef2f2;
          color: #dc2626;
        }
        .status-indicator.pending_submission {
          background: #f1f5f9;
          color: #64748b;
        }
        .status-indicator.locked {
          background: #f8fafc;
          color: #cbd5e1;
          border: 1.5px dashed #cbd5e1;
        }
        
        .feedback-bubble-mini {
          max-width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          background: #f8fafc;
          padding: 4px 10px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          color: #475569;
          font-size: 0.8rem;
          cursor: help;
        }
        
        /* Detail Page Filters & Pagination Styles */
        .detail-filters-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 16px;
          align-items: center;
        }
        .detail-filter-input {
          flex: 1;
          min-width: 150px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 8px 12px;
          color: #1e293b;
          font-size: 0.85rem;
          outline: none;
          transition: all 0.2s;
        }
        .detail-filter-input:focus {
          border-color: #00d1d1;
          background: white;
          box-shadow: 0 0 0 3px rgba(0, 209, 209, 0.08);
        }
        .detail-filter-select {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 8px 12px;
          color: #1e293b;
          font-size: 0.85rem;
          outline: none;
          transition: all 0.2s;
          cursor: pointer;
          min-width: 120px;
        }
        .detail-filter-select:focus {
          border-color: #00d1d1;
          background: white;
          box-shadow: 0 0 0 3px rgba(0, 209, 209, 0.08);
        }
        .detail-pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          margin-top: 16px;
          border-top: 1px solid var(--app-border);
        }
        
        @media (max-width: 1024px) {
          .detail-tables-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
        @media (max-width: 768px) {
          .profile-summary-header {
            flex-direction: column;
            text-align: center;
          }
          .profile-summary-details {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .summary-meta-badges {
            justify-content: center;
          }
        }
        @media (max-width: 480px) {
          .detail-filters-row {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }
          .detail-filter-input, .detail-filter-select {
            width: 100%;
          }
          .detail-pagination {
            flex-direction: column;
            gap: 12px;
            align-items: center;
            text-align: center;
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
          background: #f8fafc;
          padding: 6px 16px;
          border-radius: 12px;
          font-size: 0.8rem;
          color: var(--app-text-muted);
          border: 1px solid var(--app-border);
          min-height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 200px;
        }
        .tooltip-text {
          color: var(--app-text);
          font-weight: 500;
        }
        .tooltip-text-placeholder {
          color: var(--app-text-muted);
          font-style: italic;
        }
        .attendance-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 24px;
        }
        .att-stat-item {
          background: #f8fafc;
          border: 1px solid var(--app-border);
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
          color: var(--app-text);
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
          border: 1px solid var(--app-border);
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
          color: var(--app-text-muted);
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
          color: var(--app-text-muted);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .filter-btn:hover {
          color: var(--app-text);
        }
        .filter-btn.active {
          background: white;
          color: var(--app-text);
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
          color: var(--app-text);
        }
        .att-stat-details p {
          font-size: 0.8rem;
          color: var(--app-text-muted);
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
          color: var(--app-text-muted);
        }
        
        /* Heatmap styles */
        .heatmap-container {
          display: flex;
          gap: 12px;
          margin-top: 16px;
          background: #f8fafc;
          border: 1px solid var(--app-border);
          padding: 20px;
          border-radius: 20px;
        }
        .day-labels {
          display: grid;
          grid-template-rows: repeat(7, 14px);
          gap: 4px;
          font-size: 0.7rem;
          color: var(--app-text-muted);
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
          color: var(--app-text-muted);
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

        .status-indicator.live {
          background-color: #f0fdf4;
          color: #16a34a;
        }
        .status-indicator.recording {
          background-color: #f0f9ff;
          color: #0ea5e9;
        }
        .status-indicator.cancelled, .status-indicator.cancelled-badge {
          background-color: #fef3c7;
          color: #d97706;
        }
        .status-indicator.missed, .status-indicator.absent {
          background-color: #fef2f2;
          color: #dc2626;
        }
        .status-indicator.future, .status-indicator.scheduled {
          background-color: #f1f5f9;
          color: #94a3b8;
        }
        .status-indicator-select {
          padding: 3px 20px 3px 8px;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          display: inline-block;
          border: 1px solid transparent;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-repeat: no-repeat;
          background-position: right 6px center;
          background-size: 8px;
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .status-indicator-select.live {
          background-image: url("data:image/svg+xml;utf8,<svg fill='none' stroke='%2316a34a' stroke-width='2.5' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'></path></svg>");
        }
        .status-indicator-select.recording {
          background-image: url("data:image/svg+xml;utf8,<svg fill='none' stroke='%230ea5e9' stroke-width='2.5' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'></path></svg>");
        }
        .status-indicator-select.absent {
          background-image: url("data:image/svg+xml;utf8,<svg fill='none' stroke='%23dc2626' stroke-width='2.5' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'></path></svg>");
        }

        .status-indicator-select option {
          background-color: #ffffff;
          color: #0f172a;
          font-weight: normal;
          text-transform: none;
        }
        .status-indicator-select option.option-live {
          color: #16a34a !important;
          background-color: #f0fdf4 !important;
        }
        .status-indicator-select option.option-recording {
          color: #0ea5e9 !important;
          background-color: #f0f9ff !important;
        }
        .status-indicator-select option.option-absent {
          color: #dc2626 !important;
          background-color: #fef2f2 !important;
        }
        .mini-spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(0, 0, 0, 0.08);
          border-top-color: #0ea5e9;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .pagination-dots {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.95rem;
        }

        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4); }
          100% { transform: scale(1.05); box-shadow: 0 0 10px 4px rgba(249, 115, 22, 0); }
        }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .header-actions-group {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .header-actions-group {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 10px;
            margin-top: 10px;
          }
          .header-actions-group > * {
            width: 100% !important;
            box-sizing: border-box;
          }
        }
      `}} />
    </MainLayout>
  );
};

export default UsersList;




