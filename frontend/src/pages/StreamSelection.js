import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import './StreamSelection.css';

function StreamSelection() {
  const { level } = useParams();
  const navigate = useNavigate();

  const isAfter10th = level === '10th';

  const streams = [
    {
      id: 'science-pcm',
      name: 'Science PCM',
      tagline: 'Physics, Chemistry, Maths',
      icon: '⚙️',
      advice10th: 'Choose this if you want to pursue Engineering, Tech, Architecture, or Math-related research.',
      advice12th: 'For PCM students exploring B.Tech, B.Sc, BCA, NDA, Architecture, and emerging tech careers.',
      badgeColor: 'rgba(99, 102, 241, 0.1)'
    },
    {
      id: 'science-pcb',
      name: 'Science PCB',
      tagline: 'Physics, Chemistry, Biology',
      icon: '🏥',
      advice10th: 'Choose this if you want to pursue Medicine, Veterinary, Biotech, Genetics, or Pharmacy.',
      advice12th: 'For PCB students exploring MBBS, BDS, Nursing, Biotechnology, Pharmacy, and Life Sciences.',
      badgeColor: 'rgba(13, 148, 136, 0.1)'
    },
    {
      id: 'commerce',
      name: 'Commerce',
      tagline: 'Accountancy, Economics, Business',
      icon: '📊',
      advice10th: 'Choose this if you are interested in finance, entrepreneurship, auditing, or management.',
      advice12th: 'For Commerce students exploring CA, CS, B.Com, BBA, Actuarial Science, and Investment Banking.',
      badgeColor: 'rgba(249, 115, 22, 0.1)'
    },
    {
      id: 'humanities',
      name: 'Arts & Humanities',
      tagline: 'History, PoliSci, Psychology, Law',
      icon: '🎭',
      advice10th: 'Choose this if you love writing, social studies, creative fields, or plan to prepare for law and civil services.',
      advice12th: 'For Humanities students exploring BA, Law (CLAT), Journalism, Design, and Civil Services preparation.',
      badgeColor: 'rgba(244, 63, 94, 0.1)'
    },
    {
      id: 'vocational',
      name: 'Vocational & Emerging',
      tagline: 'Design, Mass Media, Hospitality',
      icon: '🎨',
      advice10th: 'Choose this if you want to focus early on applied skills like digital arts, design, culinary arts, or hospitality.',
      advice12th: 'For creative fields exploring B.Des, Mass Communication, Hotel Management, and Freelance careers.',
      badgeColor: 'rgba(6, 182, 212, 0.1)'
    }
  ];

  return (
    <div className="stream-selection-page animate-fade-in">
      <div className="stream-selection-glow"></div>
      
      <div className="selection-container section-container">
        <button className="back-btn-selection" onClick={() => navigate('/')}>
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>

        <div className="selection-header">
          <span className="badge-pill selection-badge">
            <Sparkles size={12} className="badge-icon" />
            Tailored Path Finder
          </span>
          <h1>
            {isAfter10th 
              ? "Which stream are you thinking of taking in Class 11?"
              : "Which stream did you complete in Class 12?"
            }
          </h1>
          <p>
            {isAfter10th
              ? "Select the stream you want to explore. We'll show you what subjects you'll read, what the honest classroom reality is, and where it leads."
              : "Select the stream you did in Class 12. We'll show you the exact college degrees, career routes, average salary (LPA), and entrance exams open to you."
            }
          </p>
        </div>

        <div className="selection-grid">
          {streams.map((stream) => (
            <div 
              key={stream.id} 
              className="selection-card glass-card"
              onClick={() => navigate(`/stream/${stream.id}`)}
            >
              <div className="selection-card-header">
                <div className="selection-icon">{stream.icon}</div>
                <div>
                  <h3>{stream.name}</h3>
                  <span className="selection-tagline" style={{ backgroundColor: stream.badgeColor }}>
                    {stream.tagline}
                  </span>
                </div>
              </div>

              <div className="selection-body">
                <p>
                  {isAfter10th ? stream.advice10th : stream.advice12th}
                </p>
              </div>

              <div className="selection-footer">
                <span className="btn-explore-selection">
                  {isAfter10th ? "Explore 11th Stream Reality" : "Explore Careers & Exams"} →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StreamSelection;
