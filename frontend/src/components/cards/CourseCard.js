import { ExternalLink, Bookmark, BookmarkCheck, Video, PlayCircle, BookOpen } from 'lucide-react';

const PLATFORM_ICONS = {
  youtube: { icon: Video, color: '#ff0000', label: 'YouTube' },
  udemy: { icon: PlayCircle, color: '#a435f0', label: 'Udemy' },
  ncert: { icon: BookOpen, color: '#22c55e', label: 'NCERT' },
  default: { icon: ExternalLink, color: '#6366f1', label: 'Course' },
};

/**
 * Reusable course card used across After10th, After12th, and PathfinderResults.
 *
 * @param {{
 *   id: string,
 *   title: string,
 *   platform: 'youtube'|'udemy'|'ncert'|string,
 *   url: string,
 *   stream: string,
 *   level: '10'|'12'|'both',
 *   description?: string,
 *   isBookmarked?: boolean,
 *   onBookmark?: () => void
 * }} props
 */
function CourseCard({ id, title, platform, url, stream, level, description, isBookmarked, onBookmark }) {
  const pKey = (platform || '').toLowerCase();
  const { icon: PlatformIcon, color, label } = PLATFORM_ICONS[pKey] || PLATFORM_ICONS.default;

  return (
    <div className="course-card glass-card">
      <div className="course-card-header">
        <span className="course-platform-badge" style={{ borderColor: color, color }}>
          <PlatformIcon size={13} />
          {label}
        </span>
        {onBookmark && (
          <button
            className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
            onClick={(e) => { e.stopPropagation(); onBookmark(); }}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this course'}
            aria-pressed={isBookmarked}
          >
            {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
        )}
      </div>

      <h4 className="course-card-title">{title}</h4>
      {description && <p className="course-card-desc">{description}</p>}

      <div className="course-card-footer">
        <span className="course-stream-chip">{stream}</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="course-link-btn"
          aria-label={`Open ${title} on ${label}`}
        >
          Open <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}

export default CourseCard;
