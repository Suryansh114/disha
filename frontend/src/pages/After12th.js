import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Calendar, BookOpen, TrendingUp, University } from 'lucide-react';
import { useClassLevel } from '../context/ClassLevelContext';
import ExamCard from '../components/cards/ExamCard';
import CourseCard from '../components/cards/CourseCard';
import useBookmarks from '../hooks/useBookmarks';
import '../components/cards/Cards.css';
import './After12th.css';

/* ─── Data ─── */
const streams12th = ['Science PCM', 'Science PCB', 'Commerce', 'Humanities', 'Vocational'];

const exams12th = [
  { id: 'jee-main', name: 'JEE Main', category: 'Engineering', examDate: '2026-04-06', resultDate: '2026-04-25', status: 'Exam Finished', description: 'National entrance for B.Tech at NITs, IIITs, GFTIs. Also gateway to JEE Advanced (IITs).', website: 'https://jeemain.nta.ac.in', streams: ['Science PCM'] },
  { id: 'jee-adv', name: 'JEE Advanced', category: 'Engineering', examDate: '2026-05-24', resultDate: '2026-06-08', status: 'Admit Card Out', description: 'Prestigious IIT entrance — only top 2.5L JEE Main qualifiers can apply.', website: 'https://jeeadv.ac.in', streams: ['Science PCM'] },
  { id: 'neet', name: 'NEET UG', category: 'Medical', examDate: '2026-05-03', resultDate: '2026-06-15', status: 'Exam Finished', description: 'Single gateway to MBBS, BDS, Ayush, Veterinary seats across India.', website: 'https://neet.nta.nic.in', streams: ['Science PCB'] },
  { id: 'clat', name: 'CLAT', category: 'Law', examDate: '2026-05-10', resultDate: '2026-05-25', status: 'Exam Finished', description: 'Gateway to 5-year integrated Law at 24 National Law Universities.', website: 'https://consortiumofnlus.ac.in', streams: ['Humanities', 'Commerce'] },
  { id: 'cuet', name: 'CUET UG', category: 'Central Universities', examDate: '2026-05-18', resultDate: '2026-06-28', status: 'Exam Ongoing', description: 'Common entrance for BA, B.Sc, B.Com at Delhi University, JNU, BHU & 200+ central universities.', website: 'https://cuet.samarth.ac.in', streams: ['Science PCM', 'Science PCB', 'Commerce', 'Humanities', 'Vocational'] },
  { id: 'ipmat', name: 'IPMAT (IIM Indore)', category: 'Management', examDate: '2026-05-22', resultDate: '2026-06-12', status: 'Admit Card Out', description: '5-year integrated BBA+MBA at IIM Indore and IIM Rohtak.', website: 'https://www.iimidr.ac.in', streams: ['Commerce', 'Science PCM'] },
  { id: 'uceed', name: 'UCEED', category: 'Design', examDate: '2026-01-18', resultDate: '2026-03-05', status: 'Results Out', description: 'B.Des at IIT Bombay, IIT Guwahati, IIITDM Jabalpur — design entrance for all streams.', website: 'https://uceed.iitb.ac.in', streams: ['Vocational', 'Science PCM', 'Humanities'] },
  { id: 'cat', name: 'CAT', category: 'Management', examDate: '2026-11-29', resultDate: '2026-12-21', status: 'Registration Closed', description: 'IIM MBA entrance — write after graduation. Plan early.', website: 'https://iimcat.ac.in', streams: ['Commerce', 'Science PCM', 'Humanities'] },
];

const courses12th = [
  { id: '12-pcm-yt-1', title: 'JEE Advanced Previous Year Solutions', platform: 'youtube', url: 'https://www.youtube.com/@PhysicsWallah', stream: 'Science PCM', level: '12', description: 'Full solutions with strategy tips by PW faculty.' },
  { id: '12-pcb-udemy', title: 'NEET Biology Mastery Course', platform: 'udemy', url: 'https://www.udemy.com/topic/neet/', stream: 'Science PCB', level: '12', description: 'NCERT-aligned complete biology for NEET aspirants.' },
  { id: '12-com-yt-1', title: 'CA Foundation Maths & Stats', platform: 'youtube', url: 'https://www.youtube.com/@ICAI_official', stream: 'Commerce', level: '12', description: 'Official ICAI resource for foundation exam prep.' },
  { id: '12-hum-yt-1', title: 'CLAT Legal Reasoning Masterclass', platform: 'youtube', url: 'https://www.youtube.com/@ClatClasses', stream: 'Humanities', level: '12', description: 'Structured CLAT prep with passage-based questions.' },
  { id: '12-voc-udemy', title: 'NID DAT Design Aptitude Prep', platform: 'udemy', url: 'https://www.udemy.com/topic/design/', stream: 'Vocational', level: '12', description: 'Visual & spatial reasoning for design entrance tests.' },
  { id: '12-cuet-yt', title: 'CUET UG Complete Prep – All Domains', platform: 'youtube', url: 'https://www.youtube.com/@Unacademy_JEEplus', stream: 'All Streams', level: '12', description: 'Language, domain, and general test sections covered.' },
];

const careerOutcomes = [
  { stream: 'Science PCM', outcomes: ['Software Engineer – ₹8-40 LPA', 'Data Scientist – ₹7-25 LPA', 'Aerospace Eng. – ₹6-18 LPA', 'Actuarial Scientist – ₹9-30 LPA'], color: '#6366f1' },
  { stream: 'Science PCB', outcomes: ['Doctor (MBBS+MD) – ₹12-30+ LPA', 'Clinical Researcher – ₹6-18 LPA', 'Pharmacist – ₹3-8 LPA', 'Genetic Counselor – ₹5-14 LPA'], color: '#0d9488' },
  { stream: 'Commerce', outcomes: ['CA – ₹8-25 LPA', 'Investment Banker – ₹12-35 LPA', 'CFA Analyst – ₹6-18 LPA', 'Mgmt. Consultant – ₹10-28 LPA'], color: '#f97316' },
  { stream: 'Humanities', outcomes: ['Civil Servant (IAS) – ₹8-15 LPA + perks', 'Psychologist – ₹4-12 LPA', 'Lawyer (NLU) – ₹16 LPA avg', 'UX Researcher – ₹7-20 LPA'], color: '#f43f5e' },
  { stream: 'Vocational', outcomes: ['UI/UX Designer – ₹8-25 LPA', 'Chef (Hospitality) – ₹4-16 LPA', 'Digital Marketer – ₹5-15 LPA', 'Content Creator – ₹3-12 LPA+'], color: '#06b6d4' },
];

/* ─── Component ─── */
function After12th() {
  const navigate = useNavigate();
  const { setClassLevel } = useClassLevel();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [selectedStream, setSelectedStream] = useState('All');

  const handlePathfinder = () => {
    setClassLevel('12');
    navigate('/pathfinder');
  };

  const filteredExams = selectedStream === 'All'
    ? exams12th
    : exams12th.filter((e) => e.streams.includes(selectedStream));

  const filteredCourses = selectedStream === 'All'
    ? courses12th
    : courses12th.filter((c) => c.stream === selectedStream || c.stream === 'All Streams');

  return (
    <div className="after12-page animate-fade-in">
      {/* ── Hero ── */}
      <section className="after12-hero">
        <div className="after12-glow-1" />
        <div className="after12-glow-2" />
        <div className="section-container after12-hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/" className="breadcrumb-link" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-current">After 12th</span>
          </nav>

          <span className="badge-pill after12-badge">
            <Sparkles size={12} className="badge-icon" />
            Class 12 Pathway Guide 🎓
          </span>
          <h1 className="after12-hero-title">
            12th done.<br />
            <span className="text-gradient-accent">Now pick your college pathway.</span>
          </h1>
          <p className="after12-hero-sub">
            Filter by your stream to see the exact entrance exams, UG degree options, college admissions timeline, and career salaries — all in one place.
          </p>
          <div className="after12-hero-ctas">
            <button className="btn btn-primary" onClick={handlePathfinder}>
              Personalised Path Quiz <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Stream Filter ── */}
      <section className="stream-filter-section">
        <div className="section-container">
          <p className="filter-label">Filter everything below by your stream:</p>
          <div className="stream-filter-pills">
            {['All', ...streams12th].map((s) => (
              <button
                key={s}
                className={`stream-filter-pill ${selectedStream === s ? 'active' : ''}`}
                onClick={() => setSelectedStream(s)}
                aria-pressed={selectedStream === s}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Entrance Exams ── */}
      <section className="after12-exams-section">
        <div className="section-container">
          <div className="section-header-row">
            <div>
              <h2 className="section-title"><Calendar size={22} className="section-icon" /> Entrance Exams</h2>
              <p className="section-subtitle">Key competitive exams for your stream. Click Official Site for latest dates and syllabus.</p>
            </div>
          </div>

          {filteredExams.length === 0 ? (
            <div className="empty-state">
              <span>📭</span>
              <p>No exams match this stream filter.</p>
              <button className="btn btn-secondary" onClick={() => setSelectedStream('All')}>Show All Exams</button>
            </div>
          ) : (
            <div className="exams-grid-12">
              {filteredExams.map((exam) => (
                <ExamCard
                  key={exam.id}
                  {...exam}
                  isBookmarked={isBookmarked(exam.id)}
                  onBookmark={() => toggleBookmark({ id: exam.id, type: 'exam', data: exam })}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Course Resources ── */}
      <section className="after12-courses-section">
        <div className="section-container">
          <div>
            <h2 className="section-title"><BookOpen size={22} className="section-icon" /> Prep Resources</h2>
            <p className="section-subtitle">Curated YouTube, Udemy, and NCERT resources for entrance exam preparation.</p>
          </div>
          <div className="courses-grid-12">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                isBookmarked={isBookmarked(course.id)}
                onBookmark={() => toggleBookmark({ id: course.id, type: 'course', data: course })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Career Outcomes ── */}
      <section className="after12-outcomes-section">
        <div className="section-container">
          <div>
            <h2 className="section-title"><TrendingUp size={22} className="section-icon" /> Career Outcomes by Stream</h2>
            <p className="section-subtitle">Entry-to-mid career salary ranges (LPA) across all streams. So you know what's possible.</p>
          </div>
          <div className="outcomes-grid">
            {careerOutcomes
              .filter((o) => selectedStream === 'All' || o.stream === selectedStream)
              .map((o) => (
                <div key={o.stream} className="outcome-card glass-card" style={{ '--stream-color': o.color }}>
                  <h4 className="outcome-stream-name" style={{ color: o.color }}>{o.stream}</h4>
                  <ul className="outcome-list">
                    {o.outcomes.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <button
                    className="outcome-explore-btn"
                    onClick={() => navigate(`/stream/${o.stream.toLowerCase().replace(/ /g, '-').replace('science-pcm', 'science-pcm').replace('science-pcb', 'science-pcb').replace('arts-&-humanities', 'humanities').replace('arts-&amp;-humanities', 'humanities').replace('vocational', 'vocational').replace('commerce', 'commerce')}`)}
                  >
                    Full Guide →
                  </button>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── Admission Timeline ── */}
      <section className="after12-timeline-section">
        <div className="section-container">
          <h2 className="section-title"><University size={22} className="section-icon" /> College Admission Timeline</h2>
          <p className="section-subtitle">Typical timeline for most UG admissions after Class 12 board results.</p>
          <div className="timeline-track">
            {[
              { month: 'Feb–Mar', label: 'Board Exams', desc: 'CBSE / ICSE / State Board theory & practicals' },
              { month: 'Apr–May', label: 'Entrance Exams', desc: 'JEE, NEET, CLAT, CUET, IPMAT, UCEED — all happen in this window' },
              { month: 'June', label: 'Results + Score Analysis', desc: 'Board results out. Entrance scores released. Rank cards downloaded.' },
              { month: 'June–July', label: 'Counselling Rounds', desc: 'JoSAA (IITs/NITs), NEET MCC, CUET DU counselling open. Fill preferences carefully.' },
              { month: 'July–Aug', label: 'Seat Allotment', desc: 'Accept your allotted seat, pay fees, and complete document verification.' },
              { month: 'Aug–Sep', label: 'College Begins', desc: 'Orientation week, hostel setup, and the start of your UG journey 🎉' },
            ].map((step, i) => (
              <div key={i} className="timeline-step">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-month">{step.month}</span>
                  <h4 className="timeline-label">{step.label}</h4>
                  <p className="timeline-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="after12-cta-section">
        <div className="section-container">
          <div className="after12-cta-box glass-card">
            <div className="after12-cta-glow" />
            <span className="badge-pill">✨ Personalised for You</span>
            <h2>Want a matched list of colleges and exams?</h2>
            <p>Answer 5 quick questions — we'll filter by your stream, marks, budget, and preferred state.</p>
            <button className="btn btn-primary" onClick={handlePathfinder}>
              Take the Pathfinder Quiz <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default After12th;
