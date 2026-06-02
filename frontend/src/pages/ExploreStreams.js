import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Users, Briefcase, ChevronRight } from 'lucide-react';
import './ExploreStreams.css';

export const streamsData = [
  {
    id: 'science-pcm',
    name: 'Science PCM',
    theme: 'pcm-theme',
    icon: '⚙️',
    popularity: '32%',
    careersCount: 45,
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English'],
    description: 'For students who love analytical thinking, equations, coding, and logical problem-solving.',
    tagline: 'The Engineering & Tech pathway'
  },
  {
    id: 'science-pcb',
    name: 'Science PCB',
    theme: 'pcb-theme',
    icon: '🏥',
    popularity: '18%',
    careersCount: 30,
    subjects: ['Physics', 'Chemistry', 'Biology', 'English'],
    description: 'For students fascinated by living systems, medical sciences, clinical research, and nature.',
    tagline: 'The Medical & Life Sciences pathway'
  },
  {
    id: 'commerce',
    name: 'Commerce',
    theme: 'commerce-theme',
    icon: '📊',
    popularity: '28%',
    careersCount: 35,
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'Applied Math'],
    description: 'For students interested in business, financial markets, trade, wealth creation, and corporate strategy.',
    tagline: 'The Business & Finance pathway'
  },
  {
    id: 'humanities',
    name: 'Arts & Humanities',
    theme: 'arts-theme',
    icon: '🎭',
    popularity: '16%',
    careersCount: 40,
    subjects: ['History', 'Political Science', 'Psychology', 'Sociology'],
    description: 'For students intrigued by human behavior, societies, history, literature, law, and creative expression.',
    tagline: 'The Social Sciences & Law pathway'
  },
  {
    id: 'vocational',
    name: 'Vocational & Emerging',
    theme: 'vocational-theme',
    icon: '🎨',
    popularity: '6%',
    careersCount: 25,
    subjects: ['Design', 'Mass Media', 'Hospitality', 'Fine Arts'],
    description: 'For students who want to build careers in fast-evolving fields like product design, media production, and culinary arts.',
    tagline: 'The Creative & Applied Arts pathway'
  }
];

function ExploreStreams() {
  const navigate = useNavigate();

  return (
    <div className="explore-streams-page animate-fade-in">
      {/* Page Header */}
      <section className="explore-hero">
        <div className="explore-glow bg-glow-explore"></div>
        <div className="explore-hero-container">
          <span className="badge-pill explore-badge">
            <Compass size={12} className="badge-icon" />
            Interactive Career Map
          </span>
          <h1>Explore Educational Streams</h1>
          <p>
            Understand the subjects, workload, statistics, and career options for each main high school stream in India. 
            Click any card to read our brutally honest take, career pathways, and entry requirements.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="streams-grid-section">
        <div className="section-container">
          <div className="streams-grid">
            {streamsData.map((stream) => (
              <div 
                key={stream.id}
                className={`stream-card-large glass-card ${stream.theme}`}
                onClick={() => navigate(`/stream/${stream.id}`)}
              >
                <div className="stream-card-glow"></div>
                
                <div className="stream-card-header">
                  <div className="stream-icon-circle">{stream.icon}</div>
                  <div className="stream-meta">
                    <span className="stream-tagline">{stream.tagline}</span>
                    <h3>{stream.name}</h3>
                  </div>
                </div>

                <p className="stream-description">{stream.description}</p>

                <div className="stream-subjects-chips">
                  {stream.subjects.map((sub, index) => (
                    <span key={index} className="subject-chip">{sub}</span>
                  ))}
                </div>

                <div className="stream-card-stats">
                  <div className="stat-item">
                    <Users size={16} className="stat-icon" />
                    <div>
                      <span className="stat-label">Popularity</span>
                      <span className="stat-value">{stream.popularity}</span>
                    </div>
                  </div>
                  
                  <div className="stat-item">
                    <Briefcase size={16} className="stat-icon" />
                    <div>
                      <span className="stat-label">Careers Open</span>
                      <span className="stat-value">{stream.careersCount}+ Fields</span>
                    </div>
                  </div>
                </div>

                <div className="stream-card-footer">
                  <span className="explore-link">Explore Detailed Guide</span>
                  <ChevronRight size={16} className="chevron-icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ExploreStreams;
