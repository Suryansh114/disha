import React from 'react';

/**
 * A shimmer skeleton card for use while data is loading.
 * @param {{ lines?: number, height?: string }} props
 */
function SkeletonCard({ lines = 3, height = 'auto' }) {
  return (
    <div className="skeleton-card" style={{ height }} aria-busy="true" aria-label="Loading...">
      <div className="skeleton-line skeleton-title" />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton-line"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
}

/**
 * Renders a grid of skeleton cards.
 * @param {{ count?: number, lines?: number }} props
 */
export function SkeletonGrid({ count = 3, lines = 3 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} lines={lines} />
      ))}
    </div>
  );
}

export default SkeletonCard;
