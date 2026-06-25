import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Calendar as CalendarIcon, ChevronLeft, ChevronRight, AlertCircle, RotateCcw } from 'lucide-react';
import { supabase } from '../supabaseclient';
import ExamCard from '../components/cards/ExamCard';
import useBookmarks from '../hooks/useBookmarks';
import '../components/cards/Cards.css';
import './ExamDates.css';

const examsData = [
  { id: 'jee-main', name: 'JEE Main (Session 2)', category: 'Engineering', description: 'National entrance for B.Tech/B.Arch in NITs, IIITs and GFTIs.', examDate: '2026-04-06', resultDate: '2026-04-25', status: 'Exam Finished', website: 'https://jeemain.nta.ac.in' },
  { id: 'jee-adv', name: 'JEE Advanced', category: 'Engineering', description: 'Gateway to the prestigious Indian Institutes of Technology (IITs).', examDate: '2026-05-24', resultDate: '2026-06-08', status: 'Admit Card Out', website: 'https://jeeadv.ac.in' },
  { id: 'neet', name: 'NEET UG', category: 'Medical', description: 'The single gateway to MBBS, BDS, and Ayush seats across India.', examDate: '2026-05-03', resultDate: '2026-06-15', status: 'Exam Finished', website: 'https://neet.nta.nic.in' },
  { id: 'clat', name: 'CLAT', category: 'Law', description: 'Gateway to 5-year integrated Law degrees at 24 National Law Universities.', examDate: '2026-05-10', resultDate: '2026-05-25', status: 'Exam Finished', website: 'https://consortiumofnlus.ac.in' },
  { id: 'cuet', name: 'CUET UG', category: 'Arts', description: 'Central Universities Entrance Test for BA, B.Sc, B.Com, and other UG degrees.', examDate: '2026-05-18', resultDate: '2026-06-28', status: 'Exam Ongoing', website: 'https://cuet.samarth.ac.in' },
  { id: 'cat', name: 'CAT (Management)', category: 'Management', description: 'National level test for postgraduate management programs at IIMs.', examDate: '2026-11-29', resultDate: '2026-12-21', status: 'Registration Closed', website: 'https://iimcat.ac.in' },
  { id: 'uceed', name: 'UCEED', category: 'Design', description: 'Undergraduate Common Entrance Examination for B.Des at IITs and design colleges.', examDate: '2026-01-18', resultDate: '2026-03-05', status: 'Results Out', website: 'https://uceed.iitb.ac.in' },
  { id: 'nift', name: 'NIFT Entrance', category: 'Design', description: 'Gateway to design and technology programs at National Institutes of Fashion Technology.', examDate: '2026-02-08', resultDate: '2026-04-12', status: 'Results Out', website: 'https://nift.ac.in' },
  { id: 'nata', name: 'NATA', category: 'Engineering', description: 'National Aptitude Test in Architecture for B.Arch degree approvals.', examDate: '2026-04-11', resultDate: '2026-04-20', status: 'Results Out', website: 'https://nata.in' },
  { id: 'nda', name: 'NDA & NA Exam I', category: 'Engineering', description: 'National Defence Academy entry for Army, Navy, and Air Force officers.', examDate: '2026-04-19', resultDate: '2026-05-30', status: 'Exam Finished', website: 'https://upsc.gov.in' },
  { id: 'ipmat', name: 'IPMAT (IIM Indore)', category: 'Commerce', description: 'Integrated Program in Management Aptitude Test for 5-year BBA+MBA.', examDate: '2026-05-22', resultDate: '2026-06-12', status: 'Admit Card Out', website: 'https://www.iimidr.ac.in' },
];

const localPrepCourses = [
  { exam_id: 'jee-main', title: 'Physics Galaxy JEE Main Lectures', provider: 'YouTube', url: 'https://www.youtube.com/@physicsgalaxyworld', instructor: 'Ashish Arora', type: 'Free', rating: 4.9 },
  { exam_id: 'jee-main', title: 'Complete Mathematics for JEE Mains', provider: 'YouTube', url: 'https://www.youtube.com/@MathematicallyInclined', instructor: 'Neha Agrawal', type: 'Free', rating: 4.8 },
  { exam_id: 'jee-main', title: 'JEE Mains Chemistry Crash Course', provider: 'YouTube', url: 'https://www.youtube.com/@UnacademyJEE', instructor: 'Unacademy Team', type: 'Free', rating: 4.7 },
  { exam_id: 'jee-main', title: 'Chemistry Masterclass for JEE Advanced', provider: 'Udemy', url: 'https://www.udemy.com/course/organic-chemistry-jee-advanced/', instructor: 'Dr. R. Singh', type: 'Paid', rating: 4.8 },
  { exam_id: 'jee-main', title: 'Mathematics JEE Main Exam Prep Course', provider: 'Udemy', url: 'https://www.udemy.com/course/jee-main-maths-algebra/', instructor: 'LearnTech India', type: 'Paid', rating: 4.5 },
  
  { exam_id: 'jee-adv', title: 'Physics Galaxy JEE Advanced Lectures', provider: 'YouTube', url: 'https://www.youtube.com/@physicsgalaxyworld', instructor: 'Ashish Arora', type: 'Free', rating: 4.9 },
  { exam_id: 'jee-adv', title: 'Chemistry Masterclass for JEE Advanced', provider: 'Udemy', url: 'https://www.udemy.com/course/organic-chemistry-jee-advanced/', instructor: 'Dr. R. Singh', type: 'Paid', rating: 4.8 },

  { exam_id: 'neet', title: 'NCERT Biology Line by Line Series', provider: 'YouTube', url: 'https://www.youtube.com/@GarimaGoelBiology', instructor: 'Garima Goel', type: 'Free', rating: 4.9 },
  { exam_id: 'neet', title: 'NEET Physics One-Shot Crash Course', provider: 'YouTube', url: 'https://www.youtube.com/@PhysicsWallah', instructor: 'Alakh Pandey', type: 'Free', rating: 4.9 },
  { exam_id: 'neet', title: 'Complete Organic Chemistry for NEET', provider: 'YouTube', url: 'https://www.youtube.com/@PankajsirChemistry', instructor: 'Pankaj Sir', type: 'Free', rating: 4.8 },
  { exam_id: 'neet', title: 'Mastering Biology for Medical Entrance Exams', provider: 'Udemy', url: 'https://www.udemy.com/course/neet-biology-physiology/', instructor: 'Dr. Shalini', type: 'Paid', rating: 4.6 },

  { exam_id: 'clat', title: 'Daily Current Affairs & Legal Reasoning for CLAT', provider: 'YouTube', url: 'https://www.youtube.com/@LegalEdgeCLATPreparation', instructor: 'LegalEdge Team', type: 'Free', rating: 4.8 },
  { exam_id: 'clat', title: 'CLAT English Language & Logical Reasoning', provider: 'YouTube', url: 'https://www.youtube.com/@ClatPossible', instructor: 'CLAT Possible', type: 'Free', rating: 4.6 },
  { exam_id: 'clat', title: 'Crack CLAT: Step-by-Step Law Prep Bootcamp', provider: 'Udemy', url: 'https://www.udemy.com/course/clat-legal-reasoning-bootcamp/', instructor: 'Legal Academy', type: 'Paid', rating: 4.7 },

  { exam_id: 'cuet', title: 'CUET UG General Test & Domain Domain Prep', provider: 'YouTube', url: 'https://www.youtube.com/@Adda247Official', instructor: 'Adda247 Team', type: 'Free', rating: 4.7 },
  { exam_id: 'cuet', title: 'CUET Commerce Domain Core Classes', provider: 'YouTube', url: 'https://www.youtube.com/@CommerceAdda247', instructor: 'Commerce Adda', type: 'Free', rating: 4.8 },
  { exam_id: 'cuet', title: 'CUET Section III Preparation Course', provider: 'Udemy', url: 'https://www.udemy.com/course/cuet-general-test-quantitative-aptitude/', instructor: 'PrepOnline', type: 'Paid', rating: 4.4 }
];

const calendarMonths = [
  { name: 'April 2026', year: 2026, monthIndex: 3, daysCount: 30, startDayOfWeek: 3 },
  { name: 'May 2026', year: 2026, monthIndex: 4, daysCount: 31, startDayOfWeek: 5 },
  { name: 'June 2026', year: 2026, monthIndex: 5, daysCount: 30, startDayOfWeek: 1 },
];

const categories = ['All', 'Engineering', 'Medical', 'Law', 'Commerce', 'Management', 'Design', 'Arts'];

function ExamDates() {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExams, setSelectedExams] = useState(['jee-main', 'jee-adv', 'neet']);
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeMonthIdx, setActiveMonthIdx] = useState(1);

  const toggleExam = (id) => {
    setSelectedExams((prev) =>
      prev.includes(id) ? prev.filter((eId) => eId !== id) : [...prev, id]
    );
  };

  const removeCategory = () => setSelectedCategory('All');
  const clearSearch = () => setSearchQuery('');

  const filteredExams = useMemo(() => {
    return examsData.filter((exam) => {
      const catMatch = selectedCategory === 'All' || exam.category === selectedCategory;
      const searchMatch = !searchQuery || exam.name.toLowerCase().includes(searchQuery.toLowerCase()) || exam.description.toLowerCase().includes(searchQuery.toLowerCase());
      return catMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  const trackedExamsData = examsData.filter((exam) => selectedExams.includes(exam.id));

  const activeFilters = [
    selectedCategory !== 'All' && { label: selectedCategory, onRemove: removeCategory },
    searchQuery && { label: `"${searchQuery}"`, onRemove: clearSearch },
  ].filter(Boolean);

  const getEventsForDay = (year, monthIdx, day) => {
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = (monthIdx + 1) < 10 ? `0${monthIdx + 1}` : (monthIdx + 1);
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    const events = [];
    trackedExamsData.forEach((exam) => {
      if (exam.examDate === dateStr) events.push({ type: 'exam', name: `${exam.name} Exam Day`, color: 'var(--accent-primary)' });
      if (exam.resultDate === dateStr) events.push({ type: 'result', name: `${exam.name} Results Out`, color: 'var(--accent-secondary)' });
    });
    return events;
  };

  const renderCalendarDays = () => {
    const monthInfo = calendarMonths[activeMonthIdx];
    const cells = [];
    for (let i = 0; i < monthInfo.startDayOfWeek; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-cell empty" />);
    }
    for (let day = 1; day <= monthInfo.daysCount; day++) {
      const events = getEventsForDay(monthInfo.year, monthInfo.monthIndex, day);
      cells.push(
        <div key={`day-${day}`} className={`calendar-cell ${events.length > 0 ? 'has-events' : ''}`}>
          <span className="day-number">{day}</span>
          <div className="day-events-dots">
            {events.map((evt, idx) => (
              <span key={idx} className="event-dot" style={{ backgroundColor: evt.color }} title={evt.name} />
            ))}
          </div>
          {events.length > 0 && (
            <div className="event-popup">
              {events.map((evt, idx) => (
                <div key={idx} className="popup-event-item">
                  <span className="popup-dot" style={{ backgroundColor: evt.color }} />
                  <span className="popup-text">{evt.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="exam-dates-page animate-fade-in">
      <div className="exams-glow" />

      <div className="section-container">
        {!showCalendar ? (
          <div className="selection-view animate-fade-in">
            <div className="exams-header">
              <span className="badge-pill exams-badge">
                <CalendarIcon size={12} className="badge-icon" />
                Your Personal Exam Planner
              </span>
              <h1>Which exams are you sitting for this year?</h1>
              <p>Tick the ones you're planning to write. We'll lay them out on a clean calendar so exam days and result dates are always front of mind.</p>
            </div>

            {/* Search */}
            <div className="exams-search-row">
              <div className="search-input-wrapper">
                <Search size={16} className="search-icon" />
                <input
                  type="search"
                  placeholder="Search exams…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="exam-search-input"
                  aria-label="Search exams"
                />
                {searchQuery && (
                  <button className="search-clear-btn" onClick={clearSearch} aria-label="Clear search">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="filter-chips-container">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={selectedCategory === cat}
                >
                  {cat}
                  {cat === selectedCategory && cat !== 'All' && (
                    <X size={11} className="chip-remove" onClick={(e) => { e.stopPropagation(); removeCategory(); }} />
                  )}
                </button>
              ))}
            </div>

            {/* Active Filter Chips */}
            {activeFilters.length > 0 && (
              <div className="active-filters-row">
                <span className="active-filters-label">Active filters:</span>
                {activeFilters.map((f, i) => (
                  <span key={i} className="active-filter-chip">
                    {f.label}
                    <button className="chip-x-btn" onClick={f.onRemove} aria-label={`Remove filter ${f.label}`}>
                      <X size={11} />
                    </button>
                  </span>
                ))}
                <button
                  className="clear-all-filters-btn"
                  onClick={() => { removeCategory(); clearSearch(); }}
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Exam Cards Grid */}
            {filteredExams.length === 0 ? (
              <div className="exams-empty-state">
                <AlertCircle size={36} className="empty-icon" />
                <h3>No exams match your filters</h3>
                <p>Try a different category or clear your search.</p>
                <button className="btn btn-secondary" onClick={() => { removeCategory(); clearSearch(); }}>
                  <RotateCcw size={14} /> Clear Filters
                </button>
              </div>
            ) : (
              <div className="exams-selection-grid">
                {filteredExams.map((exam) => {
                  const isChecked = selectedExams.includes(exam.id);
                  return (
                    <div
                      key={exam.id}
                      className={`exam-select-card glass-card ${isChecked ? 'selected' : ''}`}
                      onClick={() => toggleExam(exam.id)}
                      role="checkbox"
                      aria-checked={isChecked}
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && toggleExam(exam.id)}
                    >
                      <div className="card-checkbox-area">
                        <div className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                          {isChecked && <span>✓</span>}
                        </div>
                      </div>
                      <div className="card-main-content">
                        <span className="exam-card-cat">{exam.category}</span>
                        <h3>{exam.name}</h3>
                        <p>{exam.description}</p>
                        <div className="card-mini-dates">
                          <span>🗓️ Exam: {exam.examDate}</span>
                          <span className="card-mini-divider">|</span>
                          <span>📈 Results: {exam.resultDate}</span>
                        </div>
                      </div>
                      <button
                        className={`bookmark-btn ${isBookmarked(exam.id) ? 'bookmarked' : ''}`}
                        onClick={(e) => { e.stopPropagation(); toggleBookmark({ id: exam.id, type: 'exam', data: exam }); }}
                        aria-label={isBookmarked(exam.id) ? 'Remove bookmark' : 'Bookmark this exam'}
                      >
                        {isBookmarked(exam.id) ? '🔖' : '🏷️'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Sticky Bottom Bar */}
            <div className="sticky-bottom-bar glass-card">
              <div className="bar-info">
                <span className="count-badge">{selectedExams.length}</span>
                <span>{selectedExams.length === 1 ? '1 exam selected' : `${selectedExams.length} exams selected`}</span>
              </div>
              <button
                className="btn btn-primary"
                disabled={selectedExams.length === 0}
                onClick={() => setShowCalendar(true)}
              >
                {selectedExams.length === 0 ? 'Pick at least one exam' : 'Build My Calendar →'}
              </button>
            </div>
          </div>
        ) : (
          <div className="calendar-view animate-slide-up">
            <button className="back-btn-selection" onClick={() => setShowCalendar(false)}>
              <ChevronLeft size={16} />
              <span>← Edit my exam list</span>
            </button>

            <div className="calendar-header-section">
              <h2>Your Exam Calendar — 2026</h2>
              <p>Coloured dots = your exam or result days. Hover any dot to see what's happening.</p>
            </div>

            <div className="calendar-wrapper-box glass-card">
              <div className="calendar-controls">
                <button className="control-btn" disabled={activeMonthIdx === 0} onClick={() => setActiveMonthIdx(activeMonthIdx - 1)} aria-label="Previous month">
                  <ChevronLeft size={20} />
                </button>
                <h3 className="active-month-title">{calendarMonths[activeMonthIdx].name}</h3>
                <button className="control-btn" disabled={activeMonthIdx === calendarMonths.length - 1} onClick={() => setActiveMonthIdx(activeMonthIdx + 1)} aria-label="Next month">
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="day-names-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <span key={d}>{d}</span>)}
              </div>

              <div className="calendar-days-grid">{renderCalendarDays()}</div>

              <div className="calendar-legend">
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: 'var(--accent-primary)' }} />
                  <span>Exam Day</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: 'var(--accent-secondary)' }} />
                  <span>Results Announced</span>
                </div>
              </div>
            </div>

            {/* Tracked Exams using reusable ExamCard */}
            <div className="tracked-exams-list-section">
              <h3 className="section-title-sub">Your Tracked Exams</h3>
              <div className="tracked-cards-grid">
                {trackedExamsData.map((exam) => (
                  <ExamCard
                    key={exam.id}
                    {...exam}
                    isBookmarked={isBookmarked(exam.id)}
                    onBookmark={() => toggleBookmark({ id: exam.id, type: 'exam', data: exam })}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExamDates;
