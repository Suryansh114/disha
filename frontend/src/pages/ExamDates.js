import React, { useState } from 'react';
import './ExamDates.css';

function ExamDates() {
  const [selectedYear, setSelectedYear] = useState('2026');

  const exams = [
    {
      id: 1,
      name: 'JEE Main',
      type: 'Engineering',
      dates: 'April 2026',
      registrationStart: 'Feb 2026',
      icon: '⚙️',
      website: 'jeemain.nta.ac.in'
    },
    {
      id: 2,
      name: 'JEE Advanced',
      type: 'Engineering',
      dates: 'May 2026',
      registrationStart: 'April 2026',
      icon: '⚙️',
      website: 'jeeadv.ac.in'
    },
    {
      id: 3,
      name: 'NEET',
      type: 'Medical',
      dates: 'May 2026',
      registrationStart: 'March 2026',
      icon: '🏥',
      website: 'neet.nta.ac.in'
    },
    {
      id: 4,
      name: 'CLAT',
      type: 'Law',
      dates: 'December 2025',
      registrationStart: 'September 2025',
      icon: '⚖️',
      website: 'consortiumofnlus.ac.in'
    },
    {
      id: 5,
      name: 'CAT',
      type: 'Management',
      dates: 'November 2025',
      registrationStart: 'August 2025',
      icon: '💼',
      website: 'iimcat.ac.in'
    },
    {
      id: 6,
      name: 'CUET',
      type: 'Arts/Commerce/Science',
      dates: 'May 2026',
      registrationStart: 'April 2026',
      icon: '📚',
      website: 'cuet.samakondu.ac.in'
    }
  ];

  return (
    <div className="exam-dates">
      <div className="exam-header">
        <h1>📅 Important Exam Dates</h1>
        <p>Mark your calendars for these crucial national entrance exams</p>
      </div>

      <div className="exam-container">
        <div className="exam-grid">
          {exams.map(exam => (
            <div key={exam.id} className="exam-card">
              <div className="exam-icon">{exam.icon}</div>
              <h3>{exam.name}</h3>
              <p className="exam-type">{exam.type}</p>
              
              <div className="exam-info">
                <div className="info-item">
                  <span className="label">Exam Date</span>
                  <span className="value">{exam.dates}</span>
                </div>
                <div className="info-item">
                  <span className="label">Registration Opens</span>
                  <span className="value">{exam.registrationStart}</span>
                </div>
              </div>
              
              <button className="visit-btn">
                Visit Website →
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="exam-tips">
        <h2>📝 Exam Preparation Tips</h2>
        <div className="tips-grid">
          <div className="tip">
            <h4>🎯 Start Early</h4>
            <p>Begin your preparation at least 1 year before the exam</p>
          </div>
          <div className="tip">
            <h4>📚 Quality Study Material</h4>
            <p>Use recommended books and online resources</p>
          </div>
          <div className="tip">
            <h4>⏰ Time Management</h4>
            <p>Follow a structured study schedule daily</p>
          </div>
          <div className="tip">
            <h4>🧪 Mock Tests</h4>
            <p>Take regular mock tests to assess progress</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamDates;
