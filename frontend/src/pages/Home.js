import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Calendar, Split, Sparkles, AlertCircle, Quote } from 'lucide-react';
import './Home.css';

function Home({ user }) {
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
            You just finished class. <br />
            <span className="text-gradient-accent">Now what?</span>
          </h1>
          
          <p className="hero-subtitle">
            The pressure to "pick the right path" hits hard after 10th and 12th. Disha cuts through the noise — 
            honest stream comparisons, real career outlooks, and critical exam dates. All in one place. All free.
          </p>
          
          <div className="hero-ctas">
            <button 
              className="btn btn-primary hero-btn"
              onClick={() => navigate('/after-10th')}
            >
              I just finished 10th
              <span className="arrow-icon">→</span>
            </button>
            <button 
              className="btn btn-secondary hero-btn"
              onClick={() => navigate('/after-12th')}
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

            {/* Feature Card 4 */}
            <div 
              className="feature-card glass-card"
              onClick={() => navigate('/get-consultancy')}
            >
              <div className="feature-icon-wrapper arts-theme">
                <AlertCircle size={24} className="feature-icon" />
              </div>
              <h3 className="feature-card-title">Get Online Consultation</h3>
              <p className="feature-card-desc">
                1‑on‑1 face‑to‑face career counselling with expert counsellors at the lowest price ever.
              </p>
              <button className="btn btn-secondary">Get Started</button>
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
                In India, the moment you finish Class 10 or 12, everyone around you 
                seems to have an opinion about what you should do next. Relatives suggest engineering, 
                ads scream about coaching centers, and parents push for "safe" choices.
              </p>
              <p>
                Meanwhile, <strong>you’re standing in the middle of it all</strong>, trying to figure out 
                what you actually want — without a clear picture of what each path really looks like day to day.
              </p>
              <p>
                We built Disha to be the honest friend you wish you had when you were 16. 
                No coaching sales. No college referral money. Just real info, student-first.
              </p>
              <div className="why-feature-points">
                <div className="why-point">
                  <div className="why-point-bullet">✓</div>
                  <div><strong>No Jargon:</strong> Everything explained in plain language — the way a senior student would explain it to you.</div>
                </div>
                <div className="why-point">
                  <div className="why-point-bullet">✓</div>
                  <div><strong>India-Specific:</strong> JEE, NEET, LPA salaries, state board realities — not generic global advice.</div>
                </div>
              </div>
            </div>
            
            <div className="why-editorial-card glass-card">
              <div className="editorial-card-glow"></div>
              <AlertCircle size={32} className="editorial-icon" />
              <h4>A Quick Reality Check</h4>
              <blockquote className="editorial-quote">
                "IITs and AIIMS are genuinely incredible places. But they're not the only roads to a great life. 
                There are 250+ career paths in India that most people never hear about. Take a breath. 
                You have more options than you think."
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
            <h2 className="section-title">What real students are saying</h2>
          <p className="section-subtitle">From students across CBSE, ICSE, and State Boards who used Disha to cut through the confusion.</p>
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
          <h2 className="closing-title">Ready to sort out your next step?</h2>
          <p className="closing-subtitle">No fees, no signup, no pressure. Just pick where you are right now and start exploring at your own pace.</p>
          <div className="closing-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/after-10th')}
            >
              I just finished 10th
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/after-12th')}
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
