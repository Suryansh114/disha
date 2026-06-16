import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * @typedef {'10' | '12' | null} ClassLevel
 */

/**
 * @typedef {Object} ClassLevelContextValue
 * @property {ClassLevel} classLevel
 * @property {(level: ClassLevel) => void} setClassLevel
 * @property {boolean} isAfter10th
 * @property {boolean} isAfter12th
 */

const ClassLevelContext = createContext(/** @type {ClassLevelContextValue} */ ({
  classLevel: null,
  setClassLevel: () => {},
  isAfter10th: false,
  isAfter12th: false,
}));

/**
 * Provides classLevel state to the whole app.
 * Persists to localStorage so a returning user stays in the right journey.
 * @param {{ children: React.ReactNode }} props
 */
export function ClassLevelProvider({ children }) {
  const [classLevel, setClassLevelState] = useState(() => {
    try {
      return localStorage.getItem('disha_class_level') || null;
    } catch {
      return null;
    }
  });

  const setClassLevel = useCallback((level) => {
    setClassLevelState(level);
    try {
      if (level) {
        localStorage.setItem('disha_class_level', level);
      } else {
        localStorage.removeItem('disha_class_level');
      }
    } catch {
      // ignore
    }
  }, []);

  const value = {
    classLevel,
    setClassLevel,
    isAfter10th: classLevel === '10',
    isAfter12th: classLevel === '12',
  };

  return (
    <ClassLevelContext.Provider value={value}>
      {children}
    </ClassLevelContext.Provider>
  );
}

/**
 * Hook to access the ClassLevel context.
 * @returns {ClassLevelContextValue}
 */
export function useClassLevel() {
  return useContext(ClassLevelContext);
}

export default ClassLevelContext;
