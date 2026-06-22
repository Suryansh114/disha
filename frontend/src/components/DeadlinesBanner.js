import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, X, Bell } from 'lucide-react';
import './DeadlinesBanner.css';

// Exam dates sourced from the ExamDates page mock data
const UPCOMING_EXAMS = [
  { id: 'cuet', name: 'CUET UG', examDate: '2026-05-18', category: 'Arts/Sciences' },
  { id: 'jee-adv', name: 'JEE Advanced', examDate: '2026-05-24', category: 'Engineering' },
  { id: 'ipmat', name: 'IPMAT (IIM Indore)', examDate: '2026-05-22', category: 'Commerce' },
  { id: 'cat', name: 'CAT', examDate: '2026-11-29', category: 'Management' },
];

/**
 * Returns the number of days between today and a target date string.
 * @param {string} dateStr
 * @returns {number}
 */
function daysUntil(dateStr) {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = target - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Sticky dismissible banner showing the next 3 upcoming exam deadlines.
 */
function DeadlinesBanner() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem('disha_banner_dismissed') === 'true';
    } catch {
      return false;
    }
  });
  const [isDismissing, setIsDismissing] = useState(false);

  const upcoming = useMemo(() => {
    return UPCOMING_EXAMS
      .map((e) => ({ ...e, daysLeft: daysUntil(e.examDate) }))
      .filter((e) => e.daysLeft >= 0)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 3);
  }, []);

  const handleDismiss = () => {
    setIsDismissing(true);
    setTimeout(() => {
      setDismissed(true);
      try {
        localStorage.setItem('disha_banner_dismissed', 'true');
      } catch {
        // ignore
      }
    }, 300);
  };

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    if (dismissed || upcoming.length === 0) return;
    const timer = setTimeout(() => {
      handleDismiss();
    }, 5000);
    return () => clearTimeout(timer);
  }, [dismissed, upcoming]);

  if (dismissed || upcoming.length === 0) return null;

  return (
    <div 
      className={`deadlines-banner ${isDismissing ? 'dismissing' : ''}`} 
      role="banner" 
      aria-label="Upcoming exam deadlines"
    >
      <span className="deadlines-banner-icon">
        <Bell size={16} />
      </span>
      <div className="deadlines-banner-inner">
        <div className="deadlines-list">
          {upcoming.map((exam) => (
            <span key={exam.id} className="deadline-chip">
              <Calendar size={12} />
              <strong>{exam.name}</strong>
              <span className={`days-badge ${exam.daysLeft <= 7 ? 'urgent' : ''}`}>
                {exam.daysLeft === 0 ? 'Today!' : `${exam.daysLeft}d`}
              </span>
            </span>
          ))}
        </div>
        <button
          className="banner-dismiss"
          onClick={handleDismiss}
          aria-label="Dismiss deadline banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export default DeadlinesBanner;
