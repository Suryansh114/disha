import React, { useState } from 'react';
import './CompareColleges.css';

function CompareColleges() {
  const [selectedColleges, setSelectedColleges] = useState([]);

  const colleges = [
    {
      id: 1,
      name: 'IIT Bombay',
      type: 'NIT/IIT',
      ranking: '#1',
      location: 'Mumbai',
      avgPackage: '₹22 LPA',
      placements: '98%',
      icon: '🏆'
    },
    {
      id: 2,
      name: 'Delhi University',
      type: 'Central University',
      ranking: '#5',
      location: 'Delhi',
      avgPackage: '₹12 LPA',
      placements: '85%',
      icon: '🎓'
    },
    {
      id: 3,
      name: 'AIIMS Delhi',
      type: 'Medical',
      ranking: '#2',
      location: 'Delhi',
      avgPackage: 'N/A',
      placements: 'Hospital Posts',
      icon: '🏥'
    },
    {
      id: 4,
      name: 'National Law School',
      type: 'Law',
      ranking: '#1',
      location: 'Bangalore',
      avgPackage: '₹15 LPA',
      placements: '92%',
      icon: '⚖️'
    },
    {
      id: 5,
      name: 'IIM Ahmedabad',
      type: 'Management',
      ranking: '#1',
      location: 'Ahmedabad',
      avgPackage: '₹28 LPA',
      placements: '100%',
      icon: '💼'
    },
    {
      id: 6,
      name: 'St. Stephen\'s College',
      type: 'Arts',
      ranking: '#3',
      location: 'Delhi',
      avgPackage: '₹8 LPA',
      placements: '78%',
      icon: '📚'
    }
  ];

  const toggleCollege = (collegeId) => {
    if (selectedColleges.includes(collegeId)) {
      setSelectedColleges(selectedColleges.filter(id => id !== collegeId));
    } else if (selectedColleges.length < 3) {
      setSelectedColleges([...selectedColleges, collegeId]);
    }
  };

  const selectedCollegeData = colleges.filter(c => selectedColleges.includes(c.id));

  return (
    <div className="compare-colleges">
      <div className="compare-header">
        <h1>🏫 Compare Colleges</h1>
        <p>Select up to 3 colleges to compare features, placements, and more</p>
      </div>

      <div className="compare-container">
        <div className="colleges-list">
          <h2>Available Colleges</h2>
          <div className="colleges-grid">
            {colleges.map(college => (
              <div 
                key={college.id} 
                className={`college-item ${selectedColleges.includes(college.id) ? 'selected' : ''}`}
                onClick={() => toggleCollege(college.id)}
              >
                <div className="college-icon">{college.icon}</div>
                <h3>{college.name}</h3>
                <p className="college-type">{college.type}</p>
                <p className="ranking">Ranking: {college.ranking}</p>
                <p className="location">📍 {college.location}</p>
                <div className="checkbox">
                  {selectedColleges.includes(college.id) && <span>✓</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedCollegeData.length > 0 && (
          <div className="comparison-table">
            <h2>Comparison Details</h2>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Criteria</th>
                    {selectedCollegeData.map(college => (
                      <th key={college.id}>{college.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Type</td>
                    {selectedCollegeData.map(college => (
                      <td key={college.id}>{college.type}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Location</td>
                    {selectedCollegeData.map(college => (
                      <td key={college.id}>{college.location}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Ranking</td>
                    {selectedCollegeData.map(college => (
                      <td key={college.id} className="highlight">{college.ranking}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Avg Package</td>
                    {selectedCollegeData.map(college => (
                      <td key={college.id} className="highlight">{college.avgPackage}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Placement Rate</td>
                    {selectedCollegeData.map(college => (
                      <td key={college.id} className="highlight">{college.placements}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompareColleges;
