import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useClassLevel } from '../context/ClassLevelContext';
import './Pathfinder.css';

/* ─── Quiz Steps ─── */
const STEPS = [
  {
    id: 'classLevel',
    question: 'Which class have you just completed?',
    emoji: '🎓',
    type: 'single',
    options: [
      { value: '10', label: 'Class 10', desc: 'Just finished my 10th boards' },
      { value: '12', label: 'Class 12', desc: 'Just finished my 12th boards' },
    ],
  },
  {
    id: 'stream',
    question: 'Which stream are you interested in (or did you study)?',
    emoji: '📚',
    type: 'single',
    options: [
      { value: 'science-pcm', label: 'Science PCM', desc: 'Physics, Chemistry, Maths — engineering, tech, design' },
      { value: 'science-pcb', label: 'Science PCB', desc: 'Physics, Chemistry, Biology — medicine, biotech, pharmacy' },
      { value: 'commerce', label: 'Commerce', desc: 'Accounts, Economics, Business — CA, MBA, banking, law' },
      { value: 'humanities', label: 'Arts & Humanities', desc: 'History, PoliSci, Psychology — UPSC, law, journalism' },
      { value: 'vocational', label: 'Vocational / Creative', desc: 'Design, Media, Hospitality — portfolio-based careers' },
    ],
  },
  {
    id: 'marksRange',
    question: 'What was your approximate board percentage?',
    emoji: '📊',
    type: 'single',
    options: [
      { value: 'below-60', label: 'Below 60%', desc: 'Looking for practical or vocational paths' },
      { value: '60-75', label: '60% – 75%', desc: 'Solid foundation — good state university options' },
      { value: '75-90', label: '75% – 90%', desc: 'Strong scores — national entrance exam viable' },
      { value: '90+', label: '90% and above', desc: 'Excellent — top college / IIT / AIIMS tier options open' },
    ],
  },
  {
    id: 'budget',
    question: 'What is your approximate annual college budget?',
    emoji: '💰',
    type: 'single',
    options: [
      { value: 'under-1l', label: 'Under ₹1 Lakh/yr', desc: 'Government colleges, central universities' },
      { value: '1-5l', label: '₹1 – 5 Lakh/yr', desc: 'State private colleges, central uni hostels' },
      { value: '5-15l', label: '₹5 – 15 Lakh/yr', desc: 'Private tier-1 colleges, BITS, VIT etc.' },
      { value: '15l+', label: '₹15 Lakh+/yr', desc: 'Premium private / international tier institutions' },
    ],
  },
  {
    id: 'state',
    question: 'Which state would you prefer to study in?',
    emoji: '📍',
    type: 'single',
    options: [
      { value: 'any', label: 'Any State (All India)', desc: 'Open to moving anywhere in India' },
      { value: 'delhi-ncr', label: 'Delhi / NCR', desc: 'Delhi, Gurgaon, Noida region' },
      { value: 'maharashtra', label: 'Maharashtra', desc: 'Mumbai, Pune, Nagpur' },
      { value: 'karnataka', label: 'Karnataka', desc: 'Bengaluru, Mysuru, Manipal' },
      { value: 'tamil-nadu', label: 'Tamil Nadu', desc: 'Chennai, Coimbatore, Vellore' },
      { value: 'west-bengal', label: 'West Bengal', desc: 'Kolkata, Jadavpur region' },
      { value: 'rajasthan', label: 'Rajasthan', desc: 'Kota, Jaipur, Ajmer, BITS Pilani' },
      { value: 'uttar-pradesh', label: 'Uttar Pradesh', desc: 'Lucknow, Varanasi, Noida' },
    ],
  },
];

const QUIZ_KEY = 'disha_quiz_result';

function Pathfinder() {
  const navigate = useNavigate();
  const { setClassLevel } = useClassLevel();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If returning user has saved answers, pre-load classLevel choice
  useEffect(() => {
    try {
      const saved = localStorage.getItem(QUIZ_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.classLevel) {
          // Let user restart fresh but pre-select their class level
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const currentStep = STEPS[step];
  const progress = ((step) / STEPS.length) * 100;

  const handleSelect = (value) => {
    setSelected(value);
  };

  const handleNext = () => {
    if (!selected) return;

    const newAnswers = { ...answers, [currentStep.id]: selected };
    setAnswers(newAnswers);

    // Sync classLevel context immediately when that step is answered
    if (currentStep.id === 'classLevel') {
      setClassLevel(selected);
    }

    if (step < STEPS.length - 1) {
      setStep(step + 1);
      setSelected(newAnswers[STEPS[step + 1]?.id] || null);
    } else {
      // Final step — save and navigate to results
      setIsSubmitting(true);
      try {
        localStorage.setItem(QUIZ_KEY, JSON.stringify(newAnswers));
      } catch {
        // ignore
      }
      setTimeout(() => {
        navigate('/pathfinder/results');
      }, 600);
    }
  };

  const handleBack = () => {
    if (step === 0) {
      navigate(-1);
      return;
    }
    setStep(step - 1);
    setSelected(answers[STEPS[step - 1].id] || null);
  };

  return (
    <div className="pathfinder-page animate-fade-in">
      <div className="pathfinder-bg-glow" />

      <div className="section-container pathfinder-container">
        {/* Header */}
        <div className="pathfinder-header">
          <span className="badge-pill pathfinder-badge">
            <Sparkles size={12} className="badge-icon" />
            Pathfinder Quiz · {step + 1} of {STEPS.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar-wrapper" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={STEPS.length} aria-label={`Step ${step + 1} of ${STEPS.length}`}>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="progress-steps-dots">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={`progress-dot ${i < step ? 'done' : i === step ? 'active' : ''}`}
                aria-label={`Step ${i + 1}: ${s.question}`}
              >
                {i < step ? <CheckCircle2 size={14} /> : <span>{i + 1}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className={`quiz-card glass-card ${isSubmitting ? 'submitting' : ''}`} key={step}>
          <div className="quiz-emoji">{currentStep.emoji}</div>
          <h1 className="quiz-question">{currentStep.question}</h1>

          <div className="quiz-options" role="radiogroup" aria-label={currentStep.question}>
            {currentStep.options.map((opt) => (
              <button
                key={opt.value}
                className={`quiz-option ${selected === opt.value ? 'selected' : ''}`}
                onClick={() => handleSelect(opt.value)}
                role="radio"
                aria-checked={selected === opt.value}
              >
                <div className="quiz-option-indicator">
                  {selected === opt.value ? <CheckCircle2 size={18} /> : <span className="option-circle" />}
                </div>
                <div className="quiz-option-text">
                  <span className="option-label">{opt.label}</span>
                  <span className="option-desc">{opt.desc}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="quiz-nav">
            <button
              className="btn btn-secondary quiz-back-btn"
              onClick={handleBack}
              aria-label="Go to previous question"
            >
              <ArrowLeft size={16} />
              {step === 0 ? 'Cancel' : 'Back'}
            </button>

            <button
              className={`btn btn-primary quiz-next-btn ${!selected ? 'disabled' : ''}`}
              onClick={handleNext}
              disabled={!selected || isSubmitting}
              aria-label={step === STEPS.length - 1 ? 'See your results' : 'Next question'}
            >
              {isSubmitting ? (
                <span className="submitting-text">Finding your path…</span>
              ) : step === STEPS.length - 1 ? (
                <>Show My Results <Sparkles size={16} /></>
              ) : (
                <>Next <ArrowRight size={16} /></>
              )}
            </button>
          </div>
        </div>

        {/* Step label */}
        <p className="quiz-step-label">
          Question {step + 1} of {STEPS.length} — {currentStep.question.split('?')[0]}
        </p>
      </div>
    </div>
  );
}

export default Pathfinder;
