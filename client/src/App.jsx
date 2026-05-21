import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/UsersList';
import AssignmentsList from './pages/AssignmentsList';
import Profile from './pages/Profile';
import AuditLogs from './pages/AuditLogs';
import AttendanceAdmin from './pages/AttendanceAdmin';
import CourseLocksAdmin from './pages/CourseLocksAdmin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        
        {/* Admin Routes */}
        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/assignments" element={<AssignmentsList />} />
          <Route path="/admin/attendance" element={<AttendanceAdmin />} />
          <Route path="/admin/locks" element={<CourseLocksAdmin />} />
        </Route>

        {/* SuperAdmin Routes */}
        <Route element={<ProtectedRoute superAdminOnly={true} />}>
          <Route path="/admin/audit" element={<AuditLogs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
