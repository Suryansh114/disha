import React, { useState } from 'react';
import { Calendar as CalendarIcon, CheckSquare, Square, ChevronLeft, ChevronRight } from 'lucide-react';
import './ExamDates.css';

// Original detailed mock data with exact dates in 2026
const examsData = [
  {
    id: 'jee-main',
    name: 'JEE Main (Session 2)',
    category: 'Engineering',
    description: 'National entrance for B.Tech/B.Arch in NITs, IIITs and GFTIs.',
    examDate: '2026-04-06',
    resultDate: '2026-04-25',
    status: 'Exam Finished',
    badgeClass: 'status-finished',
    website: 'https://jeemain.nta.ac.in'
  },
  {
    id: 'jee-adv',
    name: 'JEE Advanced',
    category: 'Engineering',
    description: 'Gateway to the prestigious Indian Institutes of Technology (IITs).',
    examDate: '2026-05-24',
    resultDate: '2026-06-08',
    status: 'Admit Card Out',
    badgeClass: 'status-active',
    website: 'https://jeeadv.ac.in'
  },
  {
    id: 'neet',
    name: 'NEET UG',
    category: 'Medical',
    description: 'The single gateway to MBBS, BDS, and Ayush seats across India.',
    examDate: '2026-05-03',
    resultDate: '2026-06-15',
    status: 'Exam Finished',
    badgeClass: 'status-finished',
    website: 'https://neet.nta.nic.in'
  },
  {
    id: 'clat',
    name: 'CLAT',
    category: 'Law',
    description: 'Gateway to 5-year integrated Law degrees at 24 National Law Universities.',
    examDate: '2026-05-10',
    resultDate: '2026-05-25',
    status: 'Exam Finished',
    badgeClass: 'status-finished',
    website: 'https://consortiumofnlus.ac.in'
  },
  {
    id: 'cuet',
    name: 'CUET UG',
    category: 'Arts',
    description: 'Central Universities Entrance Test for BA, B.Sc, B.Com, and other UG degrees.',
    examDate: '2026-05-18',
    resultDate: '2026-06-28',
    status: 'Exam Ongoing',
    badgeClass: 'status-active',
    website: 'https://cuet.samarth.ac.in'
  },
  {
    id: 'cat',
    name: 'CAT (Management)',
    category: 'Management',
    description: 'National level test for postgraduate management programs at IIMs.',
    examDate: '2026-11-29',
    resultDate: '2026-12-21',
    status: 'Registration Closed',
    badgeClass: 'status-closed',
    website: 'https://iimcat.ac.in'
  },
  {
    id: 'uceed',
    name: 'UCEED',
    category: 'Design',
    description: 'Undergraduate Common Entrance Examination for B.Des at IITs and design colleges.',
    examDate: '2026-01-18',
    resultDate: '2026-03-05',
    status: 'Results Out',
    badgeClass: 'status-neutral',
    website: 'https://uceed.iitb.ac.in'
  },
  {
    id: 'nift',
    name: 'NIFT Entrance',
    category: 'Design',
    description: 'Gateway to design and technology programs at National Institutes of Fashion Technology.',
    examDate: '2026-02-08',
    resultDate: '2026-04-12',
    status: 'Results Out',
    badgeClass: 'status-neutral',
    website: 'https://nift.ac.in'
  },
  {
    id: 'nata',
    name: 'NATA',
    category: 'Engineering',
    description: 'National Aptitude Test in Architecture for B.Arch degree approvals.',
    examDate: '2026-04-11',
    resultDate: '2026-04-20',
    status: 'Results Out',
    badgeClass: 'status-neutral',
    website: 'https://nata.in'
  },
  {
    id: 'nda',
    name: 'NDA & NA Exam I',
    category: 'Engineering',
    description: 'National Defence Academy entry for Army, Navy, and Air Force officers.',
    examDate: '2026-04-19',
    resultDate: '2026-05-30',
    status: 'Exam Finished',
    badgeClass: 'status-finished',
    website: 'https://upsc.gov.in'
  },
  {
    id: 'ipmat',
    name: 'IPMAT (IIM Indore)',
    category: 'Commerce',
    description: 'Integrated Program in Management Aptitude Test for 5-year BBA+MBA.',
    examDate: '2026-05-22',
    resultDate: '2026-06-12',
    status: 'Admit Card Out',
    badgeClass: 'status-active',
    website: 'https://www.iimidr.ac.in'
  }
];

// Helper to generate calendar grids for 2026 months
// We focus on April, May, and June 2026 since most exams occur then
const calendarMonths = [
  { name: 'April 2026', year: 2026, monthIndex: 3, daysCount: 30, startDayOfWeek: 3 }, // April 1, 2026 is Wednesday (3)
  { name: 'May 2026', year: 2026, monthIndex: 4, daysCount: 31, startDayOfWeek: 5 }, // May 1, 2026 is Friday (5)
  { name: 'June 2026', year: 2026, monthIndex: 5, daysCount: 30, startDayOfWeek: 1 }  // June 1, 2026 is Monday (1)
];

const categories = ['All', 'Engineering', 'Medical', 'Law', 'Commerce', 'Management', 'Design', 'Arts'];

function ExamDates() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExams, setSelectedExams] = useState(['jee-main', 'jee-adv', 'neet']); // default tracked exams
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeMonthIdx, setActiveMonthIdx] = useState(1); // Default to May 2026 (index 1)

  const toggleExam = (id) => {
    if (selectedExams.includes(id)) {
      setSelectedExams(selectedExams.filter(eId => eId !== id));
    } else {
      setSelectedExams([...selectedExams, id]);
    }
  };

  const filteredExams = selectedCategory === 'All'
    ? examsData
    : examsData.filter(exam => exam.category === selectedCategory);

  const trackedExamsData = examsData.filter(exam => selectedExams.includes(exam.id));

  // Calendar Event Mapping
  const getEventsForDay = (year, monthIdx, day) => {
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = (monthIdx + 1) < 10 ? `0${monthIdx + 1}` : (monthIdx + 1);
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    
    const events = [];
    trackedExamsData.forEach(exam => {
      if (exam.examDate === dateStr) {
        events.push({ type: 'exam', name: `${exam.name} Exam Day`, color: 'var(--accent-primary)' });
      }
      if (exam.resultDate === dateStr) {
        events.push({ type: 'result', name: `${exam.name} Results Out`, color: 'var(--accent-secondary)' });
      }
    });
    return events;
  };

  // Render Calendar Grid Cells
  const renderCalendarDays = () => {
    const monthInfo = calendarMonths[activeMonthIdx];
    const cells = [];
    
    // Empty cells for alignment before start of month
    for (let i = 0; i < monthInfo.startDayOfWeek; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= monthInfo.daysCount; day++) {
      const events = getEventsForDay(monthInfo.year, monthInfo.monthIndex, day);
      
      cells.push(
        <div key={`day-${day}`} className={`calendar-cell ${events.length > 0 ? 'has-events' : ''}`}>
          <span className="day-number">{day}</span>
          <div className="day-events-dots">
            {events.map((evt, idx) => (
              <span 
                key={idx} 
                className="event-dot" 
                style={{ backgroundColor: evt.color }}
                title={evt.name}
              ></span>
            ))}
          </div>
          {events.length > 0 && (
            <div className="event-popup">
              {events.map((evt, idx) => (
                <div key={idx} className="popup-event-item">
                  <span className="popup-dot" style={{ backgroundColor: evt.color }}></span>
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
      <div className="exams-glow"></div>
      
      <div className="section-container">
        {!showCalendar ? (
          /* SECTION 1: SELECTION AND FILTER GRID */
          <div className="selection-view animate-fade-in">
            <div className="exams-header">
              <span className="badge-pill exams-badge">
                <CalendarIcon size={12} className="badge-icon" />
                Your Personal Exam Planner
              </span>
              <h1>Which exams are you sitting for this year?</h1>
              <p>
                Tick the ones you're planning to write — JEE, NEET, CLAT, CUET, or anything else.
                We'll lay them out on a clean calendar so exam days and result dates are always front of mind.
                No more hunting through government websites.
              </p>
            </div>

            {/* Category Filter Chips */}
            <div className="filter-chips-container">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Selectable Exam Cards */}
            <div className="exams-selection-grid">
              {filteredExams.map(exam => {
                const isChecked = selectedExams.includes(exam.id);
                return (
                  <div 
                    key={exam.id}
                    className={`exam-select-card glass-card ${isChecked ? 'selected' : ''}`}
                    onClick={() => toggleExam(exam.id)}
                  >
                    <div className="card-checkbox-area">
                      {isChecked ? (
                        <CheckSquare className="checkbox-svg active" size={20} />
                      ) : (
                        <Square className="checkbox-svg" size={20} />
                      )}
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
                  </div>
                );
              })}
            </div>

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
          /* SECTION 2: THE CUSTOM RENDERED CALENDAR VIEW */
          <div className="calendar-view animate-slide-up">
            <button 
                className="back-btn-selection" onClick={() => setShowCalendar(false)}>
              <ChevronLeft size={16} />
              <span>← Edit my exam list</span>
            </button>

            <div className="calendar-header-section">
              <h2>Your Exam Calendar — 2026</h2>
              <p>Coloured dots = your exam or result days. Hover any dot to see what's happening. Switch months using the arrows.</p>
            </div>

            {/* Calendar Controls */}
            <div className="calendar-wrapper-box glass-card">
              <div className="calendar-controls">
                <button 
                  className="control-btn"
                  disabled={activeMonthIdx === 0}
                  onClick={() => setActiveMonthIdx(activeMonthIdx - 1)}
                >
                  <ChevronLeft size={20} />
                </button>
                <h3 className="active-month-title">{calendarMonths[activeMonthIdx].name}</h3>
                <button 
                  className="control-btn"
                  disabled={activeMonthIdx === calendarMonths.length - 1}
                  onClick={() => setActiveMonthIdx(activeMonthIdx + 1)}
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Day names */}
              <div className="day-names-grid">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* Grid cells */}
              <div className="calendar-days-grid">
                {renderCalendarDays()}
              </div>

              {/* Legend */}
              <div className="calendar-legend">
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: 'var(--accent-primary)' }}></span>
                  <span>Exam Day</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: 'var(--accent-secondary)' }}></span>
                  <span>Results Announced</span>
                </div>
              </div>
            </div>

            {/* Tracked Exams Table/List */}
            <div className="tracked-exams-list-section">
              <h3 className="section-title-sub">Your Tracked Exams</h3>
              
              <div className="tracked-list-grid">
                {trackedExamsData.map(exam => (
                  <div key={exam.id} className="tracked-exam-row glass-card">
                    <div className="row-main">
                      <div className="row-title-area">
                        <h4>{exam.name}</h4>
                        <span className="row-cat">{exam.category}</span>
                      </div>
                      <p className="row-desc">{exam.description}</p>
                      
                      <div className="row-details-grid">
                        <div className="row-detail-item">
                          <span className="label">Exam Date</span>
                          <span className="value">🗓️ {exam.examDate}</span>
                        </div>
                        <div className="row-detail-item">
                          <span className="label">Result Date</span>
                          <span className="value">📈 {exam.resultDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="row-side-actions">
                      <span className={`status-badge-row ${exam.badgeClass}`}>
                        {exam.status}
                      </span>
                      <a href={exam.website} target="_blank" rel="noopener noreferrer" className="row-link">
                        Official Site →
                      </a>
                    </div>
                  </div>
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
