import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { ArrowRight, Plus, UserCircle, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess || user) {
      if (user?.role === 'admin' || user?.role === 'superadmin') {
        navigate('/admin/users');
      } else {
        navigate('/');
      }
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <div className="auth-page">
      {/* Left Side: Branding & Info */}
      <div className="auth-left">
        <div className="brand-area">
          <img src="/fav_icon.png" alt="Wemade Logix" className="brand-logo-img" />
          <span className="brand-name">Wemade Logix</span>
        </div>

        <div className="auth-left-content">
          <div className="hero-text">
            <h1>Master Your<br /><span>Language Skills</span></h1>
          </div>
          
          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">
                <ArrowRight size={18} />
              </div>
              <span className="feature-text">Interactive Speaking Exercises</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <ArrowRight size={18} />
              </div>
              <span className="feature-text">Real-time Grammar Feedback</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <ArrowRight size={18} />
              </div>
              <span className="feature-text">Enterprise Learning Management</span>
            </div>
          </div>
        </div>
        
        <div className="auth-footer-tag">
          © 2026 WEMADE LOGIX • INTELLIGENT LEARNING
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="auth-right">
        <div className="auth-form-container">
          <h2>Welcome back</h2>
          <p className="subtitle">Sign in to access your dashboard</p>
          
          <div className="login-form-wrapper">
            <form onSubmit={onSubmit}>
              <div className="input-group">
                <label>Work Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="name@wemadelogix.com"
                  onChange={onChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={password}
                    placeholder="••••••••"
                    onChange={onChange}
                    required
                  />
                  <button 
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            
            <div className="secondary-action">
              <p>Contact your administrator for access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
