import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './StreamSelection.css';

function StreamSelection() {
  const { level } = useParams();
  const navigate = useNavigate();

  const streams = level === '10th' ? [
    {
      id: 1,
      name: 'Science',
      description: 'For students interested in Physics, Chemistry, and Biology',
      careers: 'Engineering, Medicine, Research, Technology',
      icon: '🔬'
    },
    {
      id: 2,
      name: 'Commerce',
      description: 'For students interested in Business and Economics',
      careers: 'Accounting, Finance, MBA, Entrepreneurship',
      icon: '📊'
    },
    {
      id: 3,
      name: 'Humanities',
      description: 'For students interested in History, Geography, and Social Studies',
      careers: 'Law, Civil Service, Journalism, Education',
      icon: '📚'
    }
  ] : [
    {
      id: 1,
      name: 'Engineering',
      description: 'Bachelor of Technology (B.Tech) in various specializations',
      careers: 'Software Engineer, Data Scientist, Architect, AI/ML Specialist',
      icon: '⚙️'
    },
    {
      id: 2,
      name: 'Medicine',
      description: 'MBBS and other medical professional courses',
      careers: 'Doctor, Surgeon, Psychiatrist, Specialist',
      icon: '🏥'
    },
    {
      id: 3,
      name: 'Law',
      description: 'Bachelor of Laws (LLB) and legal studies',
      careers: 'Lawyer, Judge, Legal Advisor, Advocate',
      icon: '⚖️'
    },
    {
      id: 4,
      name: 'Management',
      description: 'MBA and business management courses',
      careers: 'Manager, Consultant, Entrepreneur, CEO',
      icon: '💼'
    },
    {
      id: 5,
      name: 'Arts & Social Sciences',
      description: 'BA in various specializations',
      careers: 'Researcher, Journalist, Civil Servant, Professor',
      icon: '🎭'
    }
  ];

  return (
    <div className="stream-selection">
      <div className="stream-header">
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <h1>Choose Your Stream</h1>
        <p>Level: Class {level}</p>
      </div>

      <div className="streams-grid">
        {streams.map(stream => (
          <div key={stream.id} className="stream-card">
            <div className="stream-icon">{stream.icon}</div>
            <h2>{stream.name}</h2>
            <p className="description">{stream.description}</p>
            <div className="careers">
              <strong>Career Paths:</strong>
              <p>{stream.careers}</p>
            </div>
            <button className="explore-btn" onClick={() => navigate(`/stream/${stream.name.toLowerCase()}`)}>
              Explore More →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StreamSelection;
