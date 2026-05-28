import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ExploreStreams.css';

function ExploreStreams() {
  const navigate = useNavigate();

  const streams = [
    {
      id: 1,
      name: 'Engineering',
      icon: '⚙️',
      colleges: 156,
      seats: 45000,
      cutoff: 'NTA Score: 450+',
      description: 'B.Tech in various specializations'
    },
    {
      id: 2,
      name: 'Medical',
      icon: '🏥',
      colleges: 52,
      seats: 8000,
      cutoff: 'NTA Score: 600+',
      description: 'MBBS and allied health courses'
    },
    {
      id: 3,
      name: 'Law',
      icon: '⚖️',
      colleges: 89,
      seats: 5000,
      cutoff: 'CLAT Score: 80+',
      description: 'Bachelor of Laws (LLB)'
    },
    {
      id: 4,
      name: 'Management',
      icon: '💼',
      colleges: 120,
      seats: 12000,
      cutoff: 'CAT Score: 60+',
      description: 'MBA and Business Management'
    },
    {
      id: 5,
      name: 'Arts',
      icon: '🎭',
      colleges: 200,
      seats: 20000,
      cutoff: 'Merit Based',
      description: 'BA in various subjects'
    },
    {
      id: 6,
      name: 'Commerce',
      icon: '📊',
      colleges: 180,
      seats: 18000,
      cutoff: 'Merit Based',
      description: 'B.Com and related courses'
    }
  ];

  return (
    <div className="explore-streams">
      <div className="explore-header">
        <h1>Explore All Streams</h1>
        <p>Discover various educational paths and find the perfect stream for you</p>
      </div>

      <div className="streams-container">
        <div className="streams-list">
          {streams.map(stream => (
            <div key={stream.id} className="stream-item">
              <div className="stream-icon-large">{stream.icon}</div>
              <div className="stream-details">
                <h3>{stream.name}</h3>
                <p className="description">{stream.description}</p>
                <div className="stream-stats">
                  <span>🏫 {stream.colleges} Colleges</span>
                  <span>📈 {stream.seats.toLocaleString()} Seats</span>
                </div>
                <p className="cutoff">Avg Cutoff: {stream.cutoff}</p>
              </div>
              <button className="details-btn" onClick={() => navigate(`/stream-details/${stream.name.toLowerCase()}`)}>
                Details →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreStreams;
