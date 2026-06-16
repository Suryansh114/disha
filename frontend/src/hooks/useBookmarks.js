import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'disha_bookmarks';

/**
 * @typedef {{ id: string, type: 'course'|'exam'|'college', data: Object }} Bookmark
 */

/**
 * Custom hook that manages bookmark state using localStorage.
 * Falls back gracefully if localStorage is unavailable.
 *
 * @returns {{
 *   bookmarks: Bookmark[],
 *   isBookmarked: (id: string) => boolean,
 *   toggleBookmark: (item: Bookmark) => void,
 *   clearAll: () => void
 * }}
 */
function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage whenever bookmarks change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch {
      // storage quota exceeded or private mode — fail silently
    }
  }, [bookmarks]);

  const isBookmarked = useCallback(
    (id) => bookmarks.some((b) => b.id === id),
    [bookmarks]
  );

  const toggleBookmark = useCallback((item) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === item.id);
      if (exists) {
        return prev.filter((b) => b.id !== item.id);
      }
      return [...prev, item];
    });
  }, []);

  const clearAll = useCallback(() => {
    setBookmarks([]);
  }, []);

  return { bookmarks, isBookmarked, toggleBookmark, clearAll };
}

export default useBookmarks;
