import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-icon">⊙</span>
            <span className="logo-text">Disha</span>
          </Link>
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/explore-streams">Explore Streams</Link>
          <Link to="/exam-dates">Exam Dates</Link>
          <Link to="/compare-colleges">Compare Colleges</Link>
        </nav>
        <div className="header-actions">
          {user ? (
            <div className="user-menu">
              <span className="user-name">{user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/signup" className="btn-signup">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
