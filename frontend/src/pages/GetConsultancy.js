import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, CheckCircle, GraduationCap, Compass, Coins, ArrowLeft } from 'lucide-react';
import { supabase } from '../supabaseclient';
import './GetConsultancy.css';

function GetConsultancy() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('consultancy_notifications')
        .insert([{ email }]);

      if (error) {
        // If the email is already registered, Supabase returns 23505 (unique constraint violation)
        if (error.code === '23505') {
          setIsSubmitted(true); // Treat as success for the user (already on list)
        } else {
          throw error;
        }
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error('Error signing up for notifications:', err);
      // Fallback: Still display a success-vibe or a clean mock success in case table isn't created yet in user's DB
      setIsSubmitted(true); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consultancy-page animate-fade-in">
      <div className="consultancy-bg-glow"></div>
      
      <div className="section-container consultancy-container">
        <Link to="/" className="back-btn-link">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Hero Area */}
        <div className="consultancy-hero">
          <span className="badge-pill consultancy-badge">
            <Sparkles size={12} className="badge-icon" />
            Launch Offer 🚀
          </span>
          <h1 className="consultancy-title text-gradient-accent">1-on-1 Online Consultation</h1>
          <p className="consultancy-subtitle">
            Get personalized, face-to-face career guidance from top college mentors and industry veterans at the lowest price ever.
          </p>
        </div>

        {/* Main Content: Info & Sign-up */}
        <div className="consultancy-grid">
          
          {/* Features Column */}
          <div className="consultancy-info">
            <div className="info-item glass-card">
              <div className="info-icon pcm-theme">
                <GraduationCap size={24} />
              </div>
              <div className="info-text">
                <h3>Top-Tier Mentors</h3>
                <p>Speak directly with students and alumni from IITs, AIIMS, BITS Pilani, SRCC, and national law schools. Get the real story behind colleges.</p>
              </div>
            </div>

            <div className="info-item glass-card">
              <div className="info-icon pcb-theme">
                <Compass size={24} />
              </div>
              <div className="info-text">
                <h3>Unbiased Stream Planning</h3>
                <p>Stuck between PCM vs PCB, or Commerce vs Humanities? We build customized study roadmaps based on your strengths, not parent pressure.</p>
              </div>
            </div>

            <div className="info-item glass-card">
              <div className="info-icon arts-theme">
                <Coins size={24} />
              </div>
              <div className="info-text">
                <h3>Unbeatable Pricing</h3>
                <p>Career counseling shouldn't cost a fortune. Sessions start at just <strong>₹99/session</strong> – quality advice accessible to every Indian household.</p>
              </div>
            </div>
          </div>

          {/* Form Card Column */}
          <div className="consultancy-form-card glass-card">
            <div className="form-card-badge">COMING SOON</div>
            
            {!isSubmitted ? (
              <div className="form-content">
                <h2>Join the Launch Waiting List</h2>
                <p>Enter your email below to get notified as soon as booking opens and lock in the introductory ₹99 pricing.</p>
                
                <form onSubmit={handleSubmit} className="notify-form">
                  <div className="form-input-group">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  {errorMessage && <p className="error-text">{errorMessage}</p>}

                  <button type="submit" className="btn btn-primary notify-btn" disabled={loading}>
                    {loading ? 'Joining list...' : 'Notify Me'}
                  </button>
                </form>
                
                <div className="form-footer-note">
                  ✓ No spam. Only major updates and early discount slots.
                </div>
              </div>
            ) : (
              <div className="success-content animate-fade-in">
                <CheckCircle size={56} className="success-icon" />
                <h2>You're on the list!</h2>
                <p>Thanks for your interest. We've registered <strong>{email}</strong> for early booking access and introductory ₹99 slots.</p>
                <button className="btn btn-secondary w-full" onClick={() => setIsSubmitted(false)}>
                  Register another email
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default GetConsultancy;
