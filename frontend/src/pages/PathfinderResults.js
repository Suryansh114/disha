import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, ArrowRight, Sparkles, BookOpen, Calendar, GraduationCap } from 'lucide-react';
import CourseCard from '../components/cards/CourseCard';
import ExamCard from '../components/cards/ExamCard';
import CollegeCard from '../components/cards/CollegeCard';
import useBookmarks from '../hooks/useBookmarks';
import '../components/cards/Cards.css';
import './PathfinderResults.css';

const QUIZ_KEY = 'disha_quiz_result';

/* ─── Data pools for matching ─── */
const COURSES_POOL = [
  { id: 'pcm-yt-1', title: 'JEE Mains Physics Complete Playlist', platform: 'youtube', url: 'https://www.youtube.com/@PhysicsWallah', stream: 'Science PCM', level: 'both', description: 'Best free resource for JEE Mains Physics prep.' },
  { id: 'pcb-ncert', title: 'NEET Biology NCERT Summary', platform: 'ncert', url: 'https://ncert.nic.in/textbook.php', stream: 'Science PCB', level: 'both', description: 'NCERT-based NEET Biology notes — essential reading.' },
  { id: 'com-udemy', title: 'CA Foundation Accounts & Law', platform: 'udemy', url: 'https://www.udemy.com/topic/ca-foundation/', stream: 'Commerce', level: 'both', description: 'Structured CA Foundation prep with practice papers.' },
  { id: 'hum-yt-2', title: 'CLAT Legal Reasoning Masterclass', platform: 'youtube', url: 'https://www.youtube.com/@ClatClasses', stream: 'Humanities', level: 'both', description: 'Passage-based CLAT reasoning — all NLU cutoffs covered.' },
  { id: 'voc-yt-1', title: 'UI/UX Design for Beginners', platform: 'youtube', url: 'https://www.youtube.com/@DesignCourse', stream: 'Vocational', level: 'both', description: 'Portfolio-first design course — start building on day 1.' },
  { id: 'cuet-general', title: 'CUET UG General Test Prep', platform: 'youtube', url: 'https://www.youtube.com/@Unacademy_JEEplus', stream: 'all', level: 'both', description: 'Common for all streams — English + General Knowledge sections.' },
];

const EXAMS_POOL = [
  { id: 'jee-main', name: 'JEE Main', category: 'Engineering', examDate: '2026-04-06', resultDate: '2026-04-25', status: 'Exam Finished', description: 'Gateway to B.Tech at NITs, IIITs.', website: 'https://jeemain.nta.ac.in', streams: ['science-pcm'], levels: ['10', '12'] },
  { id: 'neet', name: 'NEET UG', category: 'Medical', examDate: '2026-05-03', resultDate: '2026-06-15', status: 'Exam Finished', description: 'MBBS, BDS, Ayush entrance across India.', website: 'https://neet.nta.nic.in', streams: ['science-pcb'], levels: ['10', '12'] },
  { id: 'clat', name: 'CLAT', category: 'Law', examDate: '2026-05-10', resultDate: '2026-05-25', status: 'Exam Finished', description: '5-year integrated Law at 24 National Law Universities.', website: 'https://consortiumofnlus.ac.in', streams: ['humanities', 'commerce'], levels: ['10', '12'] },
  { id: 'cuet', name: 'CUET UG', category: 'Central Universities', examDate: '2026-05-18', resultDate: '2026-06-28', status: 'Exam Ongoing', description: 'BA, B.Sc, B.Com at central universities.', website: 'https://cuet.samarth.ac.in', streams: ['all'], levels: ['10', '12'] },
  { id: 'ipmat', name: 'IPMAT (IIM Indore)', category: 'Management', examDate: '2026-05-22', resultDate: '2026-06-12', status: 'Admit Card Out', description: '5-year BBA+MBA at IIM Indore.', website: 'https://www.iimidr.ac.in', streams: ['commerce', 'science-pcm'], levels: ['10', '12'] },
  { id: 'uceed', name: 'UCEED (Design)', category: 'Design', examDate: '2026-01-18', resultDate: '2026-03-05', status: 'Results Out', description: 'B.Des at IITs — for all streams.', website: 'https://uceed.iitb.ac.in', streams: ['vocational', 'all'], levels: ['10', '12'] },
];

const COLLEGES_POOL = [
  { id: 'iit-bombay', name: 'IIT Bombay', type: 'Engineering', state: 'Maharashtra', icon: '⚙️', fees: '~₹2.5L/yr', avgPackage: '₹23.5 LPA', exams: ['JEE Advanced'], streams: ['science-pcm'], budgets: ['5-15l', '15l+'], description: 'Top-ranked engineering institute — world-class research and placements.' },
  { id: 'nit-trichy', name: 'NIT Trichy', type: 'Engineering', state: 'Tamil Nadu', icon: '🔧', fees: '~₹1.5L/yr', avgPackage: '₹14 LPA', exams: ['JEE Main'], streams: ['science-pcm'], budgets: ['1-5l', '5-15l'], description: 'One of the best NITs — strong core and CS placement track record.' },
  { id: 'aiims-delhi', name: 'AIIMS New Delhi', type: 'Medical', state: 'Delhi', icon: '🏥', fees: '<₹1K/yr', avgPackage: '₹12-18 LPA', exams: ['NEET UG'], streams: ['science-pcb'], budgets: ['under-1l', '1-5l'], description: 'India\'s premier medical college. Fees under ₹6,000 total for MBBS.' },
  { id: 'srcc', name: 'SRCC (Delhi University)', type: 'Commerce', state: 'Delhi', icon: '📊', fees: '~₹40K/yr', avgPackage: '₹10.5 LPA', exams: ['CUET UG'], streams: ['commerce'], budgets: ['under-1l', '1-5l'], description: 'Best commerce UG in India — McKinsey, BCG recruit directly.' },
  { id: 'nls-bangalore', name: 'NLS Bangalore (NLSIU)', type: 'Law', state: 'Karnataka', icon: '⚖️', fees: '~₹2.5L/yr', avgPackage: '₹16 LPA', exams: ['CLAT'], streams: ['humanities', 'commerce'], budgets: ['1-5l', '5-15l'], description: 'India\'s #1 law school. 100% placement into premium law firms.' },
  { id: 'nid-ahmedabad', name: 'NID Ahmedabad', type: 'Design', state: 'Gujarat', icon: '🎨', fees: '~₹2L/yr', avgPackage: '₹8 LPA', exams: ['NID DAT'], streams: ['vocational'], budgets: ['1-5l', '5-15l'], description: 'National Institute of Design — India\'s top design school.' },
  { id: 'bits-pilani', name: 'BITS Pilani', type: 'Engineering', state: 'Rajasthan', icon: '⚡', fees: '~₹5.5L/yr', avgPackage: '₹20.8 LPA', exams: ['BITSAT'], streams: ['science-pcm'], budgets: ['5-15l', '15l+'], description: 'Top private engineering college — zero attendance, strong startup culture.' },
  { id: 'du-miranda', name: 'Miranda House (DU)', type: 'Humanities', state: 'Delhi', icon: '📖', fees: '~₹20K/yr', avgPackage: '₹6 LPA', exams: ['CUET UG'], streams: ['humanities'], budgets: ['under-1l', '1-5l'], description: 'NIRF #1 Arts college — excellent research and cultural life.' },
];

/* ─── Matcher ─── */
function matchResults(answers) {
  if (!answers) return { courses: [], exams: [], colleges: [] };

  const { classLevel, stream, budget, state } = answers;

  const courses = COURSES_POOL.filter((c) =>
    c.stream === stream || c.stream === 'all'
  ).slice(0, 3);

  const exams = EXAMS_POOL.filter((e) =>
    (e.streams.includes(stream) || e.streams.includes('all')) &&
    e.levels.includes(classLevel)
  ).slice(0, 4);

  const colleges = COLLEGES_POOL.filter((c) => {
    const streamMatch = c.streams.includes(stream) || c.streams.includes('all');
    const budgetMatch = c.budgets.includes(budget);
    const stateMatch = state === 'any' || c.state.toLowerCase().includes(state.replace(/-/g, ' '));
    return streamMatch && budgetMatch && stateMatch;
  });

  // If nothing matches state filter, fall back to stream + budget only
  const finalColleges = colleges.length > 0
    ? colleges
    : COLLEGES_POOL.filter((c) => c.streams.includes(stream) && c.budgets.includes(budget)).slice(0, 3);

  return { courses, exams, colleges: finalColleges };
}

function PathfinderResults() {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const answers = useMemo(() => {
    try {
      const raw = localStorage.getItem(QUIZ_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const { courses, exams, colleges } = useMemo(() => matchResults(answers), [answers]);

  const retakeQuiz = () => {
    try { localStorage.removeItem(QUIZ_KEY); } catch {}
    navigate('/pathfinder');
  };

  if (!answers) {
    return (
      <div className="results-page section-container">
        <div className="results-no-data">
          <span>🧭</span>
          <h2>No quiz results found</h2>
          <p>Take the Pathfinder quiz to get your personalised recommendations.</p>
          <button className="btn btn-primary" onClick={() => navigate('/pathfinder')}>
            Start Quiz <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  const streamLabel = {
    'science-pcm': 'Science PCM',
    'science-pcb': 'Science PCB',
    'commerce': 'Commerce',
    'humanities': 'Arts & Humanities',
    'vocational': 'Vocational',
  }[answers.stream] || answers.stream;

  return (
    <div className="results-page animate-fade-in">
      <div className="results-bg-glow" />

      <div className="section-container">
        {/* Header */}
        <div className="results-header">
          <span className="badge-pill results-badge">
            <Sparkles size={12} className="badge-icon" />
            Your Personalised Path
          </span>
          <h1 className="results-title">
            Here's what we recommend for you
          </h1>
          <p className="results-subtitle">
            Based on: <strong>Class {answers.classLevel}</strong> · <strong>{streamLabel}</strong> · <strong>{answers.marksRange}%</strong> · Budget <strong>{answers.budget}</strong>
          </p>
        </div>

        {/* Summary chips */}
        <div className="results-answer-chips">
          {Object.entries(answers).map(([k, v]) => (
            <span key={k} className="answer-chip">
              {v.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            </span>
          ))}
          <button className="retake-btn" onClick={retakeQuiz}>
            <RotateCcw size={13} /> Retake Quiz
          </button>
        </div>

        {/* Matched Courses */}
        <section className="results-section">
          <h2 className="results-section-title">
            <BookOpen size={20} /> Recommended Prep Resources
          </h2>
          {courses.length === 0 ? (
            <p className="results-empty">No courses matched. <button onClick={retakeQuiz} className="inline-link">Retake quiz</button></p>
          ) : (
            <div className="results-grid">
              {courses.map((c) => (
                <CourseCard
                  key={c.id}
                  {...c}
                  isBookmarked={isBookmarked(c.id)}
                  onBookmark={() => toggleBookmark({ id: c.id, type: 'course', data: c })}
                />
              ))}
            </div>
          )}
        </section>

        {/* Matched Exams */}
        <section className="results-section">
          <h2 className="results-section-title">
            <Calendar size={20} /> Entrance Exams to Target
          </h2>
          {exams.length === 0 ? (
            <p className="results-empty">No exams matched. <button onClick={retakeQuiz} className="inline-link">Retake quiz</button></p>
          ) : (
            <div className="results-grid">
              {exams.map((e) => (
                <ExamCard
                  key={e.id}
                  {...e}
                  isBookmarked={isBookmarked(e.id)}
                  onBookmark={() => toggleBookmark({ id: e.id, type: 'exam', data: e })}
                />
              ))}
            </div>
          )}
        </section>

        {/* Matched Colleges */}
        <section className="results-section">
          <h2 className="results-section-title">
            <GraduationCap size={20} /> Colleges That Fit Your Profile
          </h2>
          {colleges.length === 0 ? (
            <div className="results-empty-state">
              <span>🏫</span>
              <p>No colleges matched all your filters exactly.</p>
              <button className="btn btn-secondary" onClick={retakeQuiz}>
                Adjust Filters
              </button>
            </div>
          ) : (
            <div className="results-grid">
              {colleges.map((c) => (
                <CollegeCard
                  key={c.id}
                  {...c}
                  isBookmarked={isBookmarked(c.id)}
                  onBookmark={() => toggleBookmark({ id: c.id, type: 'college', data: c })}
                />
              ))}
            </div>
          )}
        </section>

        {/* Next Steps CTA */}
        <div className="results-next-steps glass-card">
          <div className="results-next-glow" />
          <h3>What next?</h3>
          <div className="next-steps-grid">
            <button className="next-step-card" onClick={() => navigate('/exam-dates')}>
              <Calendar size={20} />
              <span>Track Exam Dates</span>
            </button>
            <button className="next-step-card" onClick={() => navigate('/explore-streams')}>
              <BookOpen size={20} />
              <span>Explore Streams Deep Dive</span>
            </button>
            <button className="next-step-card" onClick={() => navigate('/compare-colleges')}>
              <GraduationCap size={20} />
              <span>Compare Colleges</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PathfinderResults;
