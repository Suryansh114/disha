import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Calendar, Split, Sparkles, AlertCircle, Quote } from 'lucide-react';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow bg-glow-1"></div>
        <div className="hero-glow bg-glow-2"></div>
        
        <div className="hero-container">
          <span className="badge-pill hero-badge">
            <Sparkles size={12} className="badge-icon" />
            Empowering Indian High Schoolers 🇮🇳
          </span>
          
          <h1 className="hero-title animate-slide-up">
            Figure out your next step. <br />
            <span className="text-gradient-accent">Without the pressure or jargon.</span>
          </h1>
          
          <p className="hero-subtitle">
            Choosing a stream or career path shouldn't feel like a high-stakes gamble. 
            Get clear, brutally honest career paths, critical exam trackers, and zero sales pitches.
          </p>
          
          <div className="hero-ctas">
            <button 
              className="btn btn-primary hero-btn"
              onClick={() => navigate('/stream-choice/10th')}
            >
              I just finished 10th
              <span className="arrow-icon">→</span>
            </button>
            <button 
              className="btn btn-secondary hero-btn"
              onClick={() => navigate('/stream-choice/12th')}
            >
              I just finished 12th
              <span className="arrow-icon">→</span>
            </button>
          </div>
          
          <div className="hero-footer-text">
            <span>✓ 100% Free</span>
            <span className="divider">•</span>
            <span>✓ No Signup Required</span>
            <span className="divider">•</span>
            <span>✓ Built for Indian Students</span>
          </div>
        </div>
      </section>

      {/* "What can we help with?" Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">What can we help with?</h2>
            <p className="section-subtitle">No overwhelming choices, just practical tools designed to help you navigate your transition.</p>
          </div>

          <div className="features-grid">
            {/* Feature Card 1 */}
            <div 
              className="feature-card glass-card"
              onClick={() => navigate('/explore-streams')}
            >
              <div className="feature-icon-wrapper pcm-theme">
                <Compass size={24} className="feature-icon" />
              </div>
              <h3 className="feature-card-title">Explore Streams</h3>
              <p className="feature-card-desc">
                Dive deep into Science (PCM/PCB), Commerce, Arts, and new vocational streams. Subjects, cutoffs, and actual study realities.
              </p>
              <span className="feature-card-action">Explore pathways →</span>
            </div>

            {/* Feature Card 2 */}
            <div 
              className="feature-card glass-card"
              onClick={() => navigate('/exam-dates')}
            >
              <div className="feature-icon-wrapper pcb-theme">
                <Calendar size={24} className="feature-icon" />
              </div>
              <h3 className="feature-card-title">Track Exam Deadlines</h3>
              <p className="feature-card-desc">
                Never miss a critical date. Track JEE, NEET, CUET, CLAT, NATA, and NDA dates. Build a personalized calendar.
              </p>
              <span className="feature-card-action">View exam dates →</span>
            </div>

            {/* Feature Card 3 */}
            <div 
              className="feature-card glass-card coming-soon"
              onClick={() => navigate('/compare-colleges')}
            >
              <div className="feature-icon-wrapper arts-theme">
                <Split size={24} className="feature-icon" />
              </div>
              <h3 className="feature-card-title">Compare Colleges</h3>
              <div className="badge-coming-soon">COMING SOON</div>
              <p className="feature-card-desc">
                Compare top universities side-by-side on real parameters like average placement package (LPA), research, and culture.
              </p>
              <span className="feature-card-action">Preview compare tools →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial section */}
      <section className="why-section">
        <div className="section-container">
          <div className="why-grid">
            <div className="why-content">
              <span className="why-badge-pill">OUR MISSION</span>
              <h2 className="why-title">Why we built Disha</h2>
              <p>
                In India, completing Class 10 and 12 is often treated like a final judgment. Relatives start asking questions, advertisements scream about Coaching Institutes promising 99.9 percentiles, and parents want you to be safe.
              </p>
              <p>
                Amidst this chaos, <strong>the student is left alone</strong>, feeling overwhelmed, pressured, and forced into paths they barely understand. 
              </p>
              <p>
                We built Disha to be the voice we wish we had when we were 16. We don't sell coaching. We don't partner with colleges for referrals. We just compile clean, honest, student-first facts to help you find your footing.
              </p>
              <div className="why-feature-points">
                <div className="why-point">
                  <div className="why-point-bullet">✓</div>
                  <div><strong>No Jargon:</strong> Clear terms, simplified explanations, and relatable insights.</div>
                </div>
                <div className="why-point">
                  <div className="why-point-bullet">✓</div>
                  <div><strong>India-Specific:</strong> Focuses on actual career realities here, including LPA salaries, JEE/NEET ranks, and local options.</div>
                </div>
              </div>
            </div>
            
            <div className="why-editorial-card glass-card">
              <div className="editorial-card-glow"></div>
              <AlertCircle size={32} className="editorial-icon" />
              <h4>A Quick Reality Check</h4>
              <blockquote className="editorial-quote">
                "IITs/AIIMS are incredible, but they are not the only ways to build a good life. In India, there are 250+ other careers opening up. Take a deep breath. You're going to figure this out."
              </blockquote>
              <div className="editorial-author">— Team Disha</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="testimonials-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">What other students say</h2>
            <p className="section-subtitle">Real feedback from 10th and 12th graders across CBSE, ICSE, and State Boards.</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card glass-card">
              <Quote size={20} className="quote-icon" />
              <p className="testimonial-text">
                "The Honest Take on Science PCB was a lifesaver. My relatives assumed I'd prepare for NEET, but reading about the actual MBBS workload made me realize research was my true calling."
              </p>
              <div className="testimonial-user">
                <div className="avatar">A</div>
                <div>
                  <div className="name">Ananya Sharma</div>
                  <div className="class-board">Class 12, CBSE (Delhi)</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card glass-card">
              <Quote size={20} className="quote-icon" />
              <p className="testimonial-text">
                "The exam calendar was exactly what I needed. It gathered registration dates for NDA, JEE, and CUET in one place so I didn't have to keep digging through messy government websites."
              </p>
              <div className="testimonial-user">
                <div className="avatar">R</div>
                <div>
                  <div className="name">Rahul Deshmukh</div>
                  <div className="class-board">Class 12, HSC Board (Pune)</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card glass-card">
              <Quote size={20} className="quote-icon" />
              <p className="testimonial-text">
                "Honestly, the lack of signup forms or ads was the best part. I could just open the comparison page, check placements, and save a PDF without getting 10 sales calls the next day."
              </p>
              <div className="testimonial-user">
                <div className="avatar">P</div>
                <div>
                  <div className="name">Priya Nair</div>
                  <div className="class-board">Class 10, ICSE (Bengaluru)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="closing-cta-section">
        <div className="closing-glow"></div>
        <div className="closing-container">
          <h2 className="closing-title">Ready to figure out your next step?</h2>
          <p className="closing-subtitle">No stress, no pressure. Choose where you are currently at, and explore your choices at your own pace.</p>
          <div className="closing-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/stream-choice/10th')}
            >
              I just finished 10th
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/stream-choice/12th')}
            >
              I just finished 12th
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
