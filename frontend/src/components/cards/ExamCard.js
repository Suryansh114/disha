import React from 'react';
import { Calendar, ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';

const STATUS_CLASSES = {
  'Exam Finished': 'status-finished',
  'Exam Ongoing': 'status-active',
  'Admit Card Out': 'status-active',
  'Registration Closed': 'status-closed',
  'Results Out': 'status-neutral',
};

/**
 * Reusable exam card used across ExamDates, After12th, and PathfinderResults.
 *
 * @param {{
 *   id: string,
 *   name: string,
 *   category: string,
 *   examDate: string,
 *   resultDate?: string,
 *   status: string,
 *   description: string,
 *   website: string,
 *   isBookmarked?: boolean,
 *   onBookmark?: () => void,
 *   compact?: boolean
 * }} props
 */
function ExamCard({ id, name, category, examDate, resultDate, status, description, website, isBookmarked, onBookmark, compact }) {
  const statusClass = STATUS_CLASSES[status] || 'status-neutral';

  return (
    <div className={`exam-card glass-card ${compact ? 'exam-card--compact' : ''}`}>
      <div className="exam-card-top">
        <div>
          <span className="exam-category-label">{category}</span>
          <h4 className="exam-card-name">{name}</h4>
        </div>
        <div className="exam-card-actions">
          <span className={`status-badge-row ${statusClass}`}>{status}</span>
          {onBookmark && (
            <button
              className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={(e) => { e.stopPropagation(); onBookmark(); }}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this exam'}
              aria-pressed={isBookmarked}
            >
              {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            </button>
          )}
        </div>
      </div>

      {!compact && <p className="exam-card-desc">{description}</p>}

      <div className="exam-card-dates">
        <span><Calendar size={12} /> Exam: <strong>{examDate}</strong></span>
        {resultDate && <span><Calendar size={12} /> Result: <strong>{resultDate}</strong></span>}
      </div>

      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="exam-official-link"
        aria-label={`Official website for ${name}`}
      >
        Official Site <ExternalLink size={12} />
      </a>
    </div>
  );
}

export default ExamCard;
