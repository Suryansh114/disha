import React from 'react';
import { MapPin, IndianRupee, Bookmark, BookmarkCheck, TrendingUp } from 'lucide-react';

/**
 * Reusable college card used on CompareColleges listing and PathfinderResults.
 *
 * @param {{
 *   id: string,
 *   name: string,
 *   type: string,
 *   state?: string,
 *   icon?: string,
 *   fees?: string,
 *   avgPackage?: string,
 *   exams?: string[],
 *   description?: string,
 *   isBookmarked?: boolean,
 *   onBookmark?: () => void,
 *   onClick?: () => void
 * }} props
 */
function CollegeCard({ id, name, type, state, icon, fees, avgPackage, exams, description, isBookmarked, onBookmark, onClick }) {
  return (
    <div
      className={`college-card glass-card ${onClick ? 'college-card--clickable' : ''}`}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      role={onClick ? 'button' : undefined}
    >
      <div className="college-card-header">
        <div className="college-card-title-row">
          {icon && <span className="college-icon-badge">{icon}</span>}
          <div>
            <span className="college-type-label">{type}</span>
            <h4 className="college-card-name">{name}</h4>
            {state && (
              <span className="college-state">
                <MapPin size={11} /> {state}
              </span>
            )}
          </div>
        </div>
        {onBookmark && (
          <button
            className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
            onClick={(e) => { e.stopPropagation(); onBookmark(); }}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this college'}
            aria-pressed={isBookmarked}
          >
            {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
        )}
      </div>

      {description && <p className="college-card-desc">{description}</p>}

      <div className="college-card-stats">
        {fees && (
          <div className="college-stat">
            <IndianRupee size={13} />
            <span className="stat-label">Fees</span>
            <span className="stat-val">{fees}</span>
          </div>
        )}
        {avgPackage && (
          <div className="college-stat">
            <TrendingUp size={13} />
            <span className="stat-label">Avg. Package</span>
            <span className="stat-val">{avgPackage}</span>
          </div>
        )}
      </div>

      {exams && exams.length > 0 && (
        <div className="college-exams-chips">
          {exams.map((e) => (
            <span key={e} className="college-exam-chip">{e}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default CollegeCard;
