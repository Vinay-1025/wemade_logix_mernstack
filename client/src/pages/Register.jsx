import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

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
      navigate('/');
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

    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
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
            <h1>Start Your<br /><span>Language Mastery</span></h1>
          </div>
          
          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">
                <CheckCircle2 size={18} />
              </div>
              <span className="feature-text">Personalized Learning Paths</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <CheckCircle2 size={18} />
              </div>
              <span className="feature-text">Advanced Progress Analytics</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <CheckCircle2 size={18} />
              </div>
              <span className="feature-text">24/7 AI-Powered Assistance</span>
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
          <h2>Create account</h2>
          <p className="subtitle">Join thousands of professionals mastering languages</p>
          
          <div className="login-form-wrapper">
            <form onSubmit={onSubmit}>
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="John Doe"
                  onChange={onChange}
                  required
                />
              </div>
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
                <label>Create Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="••••••••"
                  onChange={onChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder="••••••••"
                  onChange={onChange}
                  required
                />
              </div>
              
              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
            
            <div className="secondary-action">
              <p>
                Already have an account? <Link to="/login">Sign in here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
