import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, GraduationCap } from 'lucide-react';
import './Header.css';

function Header({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <GraduationCap className="logo-icon-svg" />
            <span className="logo-text">Disha</span>
          </Link>
        </div>
        <nav className="nav">
          <Link to="/" className={isActive('/') ? 'nav-link active' : 'nav-link'}>
            Home
          </Link>
          <Link to="/explore-streams" className={isActive('/explore-streams') || isActive('/stream') ? 'nav-link active' : 'nav-link'}>
            Explore Streams
          </Link>
          <Link to="/exam-dates" className={isActive('/exam-dates') ? 'nav-link active' : 'nav-link'}>
            Exam Dates
          </Link>
          <Link to="/compare-colleges" className={isActive('/compare-colleges') ? 'nav-link active' : 'nav-link'}>
            Compare Colleges
          </Link>
        </nav>
        <div className="header-actions">
          {user ? (
            <div className="user-menu">
              <span className="user-name">👋 {user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/signup" className="btn btn-primary btn-signup-header">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
