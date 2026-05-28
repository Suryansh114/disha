import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <div className="badge">Free for every student in India 🇮🇳</div>
          
          <h1 className="hero-title">
            Confused about what to do after 10th?
          </h1>
          
          <p className="hero-subtitle">
            Most students are. Disha helps you figure it out - one honest step at a time. 
            No pressure. No jargon. Just clarity.
          </p>
          
          <div className="cta-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/stream-choice/10th')}
            >
              I just finished 10th
              <span className="arrow">→</span>
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/stream-choice/12th')}
            >
              I just finished 12th
              <span className="arrow">→</span>
            </button>
          </div>
          
          <p className="hero-footer">Free to use · No sign up needed · Built for Indian students</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
