import React, { useState, useMemo } from 'react';
import { Calendar, X, Bell } from 'lucide-react';

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

  const upcoming = useMemo(() => {
    return UPCOMING_EXAMS
      .map((e) => ({ ...e, daysLeft: daysUntil(e.examDate) }))
      .filter((e) => e.daysLeft >= 0)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 3);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem('disha_banner_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  if (dismissed || upcoming.length === 0) return null;

  return (
    <div className="deadlines-banner" role="banner" aria-label="Upcoming exam deadlines">
      <div className="deadlines-banner-inner">
        <span className="deadlines-banner-icon">
          <Bell size={14} />
        </span>
        <div className="deadlines-list">
          {upcoming.map((exam) => (
            <span key={exam.id} className="deadline-chip">
              <Calendar size={11} />
              <strong>{exam.name}</strong>
              <span className={`days-badge ${exam.daysLeft <= 7 ? 'urgent' : ''}`}>
                {exam.daysLeft === 0 ? 'Today!' : `${exam.daysLeft}d`}
              </span>
            </span>
          ))}
        </div>
        <button
          className="banner-dismiss"
          onClick={dismiss}
          aria-label="Dismiss deadline banner"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

export default DeadlinesBanner;
