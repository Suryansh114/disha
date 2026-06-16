import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Bookmark } from 'lucide-react';
import DishaLogo from './DishaLogo';
import useBookmarks from '../hooks/useBookmarks';
import './Header.css';

function Header({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookmarks } = useBookmarks();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { path: '/after-10th', label: 'After 10th' },
    { path: '/after-12th', label: 'After 12th' },
    { path: '/exam-dates', label: 'Exam Dates' },
    { path: '/compare-colleges', label: 'Compare Colleges' },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-link" aria-label="Disha Home">
          <DishaLogo size={32} showText={true} />
        </Link>
        
        <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Mobile Auth inside menu if open */}
          <div className="mobile-auth-actions">
            <Link to="/pathfinder" className="btn btn-primary w-full text-center">Pathfinder Quiz</Link>
            {!user && (
              <>
                <Link to="/login" className="btn-login text-center">Login</Link>
                <Link to="/signup" className="btn btn-secondary text-center">Sign Up</Link>
              </>
            )}
          </div>
        </nav>

        <div className="header-actions">
          {/* Bookmarks Icon */}
          <Link to="/bookmarks" className="bookmarks-icon-link" aria-label="Saved Bookmarks">
            <Bookmark size={20} />
            {bookmarks.length > 0 && <span className="bookmarks-badge">{bookmarks.length}</span>}
          </Link>

          <div className="desktop-auth-actions">
            {user ? (
              <div className="user-menu">
                <span className="user-name">👋 {user.name}</span>
                <button className="logout-btn" onClick={handleLogout} aria-label="Logout">
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

          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile overlay */}
      {mobileMenuOpen && <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)} />}
    </header>
  );
}

export default Header;
