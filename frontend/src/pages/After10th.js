import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, BookOpen, Briefcase, GraduationCap, Wrench, ChevronDown, ChevronUp } from 'lucide-react';
import { useClassLevel } from '../context/ClassLevelContext';
import CourseCard from '../components/cards/CourseCard';
import useBookmarks from '../hooks/useBookmarks';
import '../components/cards/Cards.css';
import './After10th.css';

/* ─── Data ─── */
const streams10th = [
  {
    id: 'science-pcm',
    name: 'Science PCM',
    icon: '⚙️',
    tagline: 'Physics · Chemistry · Maths',
    color: '#6366f1',
    glow: 'rgba(99,102,241,0.15)',
    description: 'Best for students who enjoy logic, numbers, and building things. Opens engineering, tech, architecture, and defence pathways.',
    leads: ['B.Tech / B.E. (4 years)', 'B.Arch (5 years)', 'BCA, B.Sc Maths/Physics', 'NDA (Defence)'],
    courses: [
      { id: 'pcm-yt-1', title: 'Class 11 Physics – Complete Lectures', platform: 'youtube', url: 'https://youtube.com/playlist?list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt', stream: 'Science PCM', level: '10' },
      { id: 'pcm-yt-2', title: 'JEE Maths Crash Course by Unacademy', platform: 'youtube', url: 'https://www.youtube.com/@Unacademy_JEEplus', stream: 'Science PCM', level: '10' },
      { id: 'pcm-udemy', title: 'Physics for IIT-JEE (Beginner Level)', platform: 'udemy', url: 'https://www.udemy.com/topic/iit-jee/', stream: 'Science PCM', level: '10' },
    ],
  },
  {
    id: 'science-pcb',
    name: 'Science PCB',
    icon: '🏥',
    tagline: 'Physics · Chemistry · Biology',
    color: '#0d9488',
    glow: 'rgba(13,148,136,0.15)',
    description: 'Choose this if you are fascinated by living systems, want to heal people, or are interested in biotech and pharmacy.',
    leads: ['MBBS via NEET (5.5 years)', 'BDS, BPT, Nursing', 'B.Sc Biotech / Genetics', 'BAMS, BHMS, Veterinary'],
    courses: [
      { id: 'pcb-yt-1', title: 'Class 11 Biology – NCERT Explained', platform: 'youtube', url: 'https://www.youtube.com/@MagnetBrains', stream: 'Science PCB', level: '10' },
      { id: 'pcb-ncert', title: 'NCERT Biology Class 11 & 12 PDF', platform: 'ncert', url: 'https://ncert.nic.in/textbook.php', stream: 'Science PCB', level: '10' },
      { id: 'pcb-udemy', title: 'NEET Biology: Genetics & Evolution', platform: 'udemy', url: 'https://www.udemy.com/topic/neet/', stream: 'Science PCB', level: '10' },
    ],
  },
  {
    id: 'commerce',
    name: 'Commerce',
    icon: '📊',
    tagline: 'Accountancy · Economics · Business',
    color: '#f97316',
    glow: 'rgba(249,115,22,0.15)',
    description: 'Ideal if you enjoy understanding money, businesses, markets, and financial systems. The CA/MBA pathway begins here.',
    leads: ['B.Com Hons (3 years)', 'BBA / BMS (3 years)', 'CA Foundation → CA', 'IPMAT → IIM 5yr BBA+MBA'],
    courses: [
      { id: 'com-yt-1', title: 'Accountancy Class 11 – Full Course', platform: 'youtube', url: 'https://www.youtube.com/@LetsTute', stream: 'Commerce', level: '10' },
      { id: 'com-udemy', title: 'Basics of Finance for Beginners', platform: 'udemy', url: 'https://www.udemy.com/topic/finance/', stream: 'Commerce', level: '10' },
      { id: 'com-ncert', title: 'NCERT Business Studies Class 11', platform: 'ncert', url: 'https://ncert.nic.in/textbook.php', stream: 'Commerce', level: '10' },
    ],
  },
  {
    id: 'humanities',
    name: 'Arts & Humanities',
    icon: '🎭',
    tagline: 'History · PoliSci · Psychology · Languages',
    color: '#f43f5e',
    glow: 'rgba(244,63,94,0.15)',
    description: 'Perfect if you love reading, writing, debating, understanding society, and want to pursue law, UPSC, or psychology.',
    leads: ['BA LLB 5yr Integrated Law (CLAT)', 'BA Hons – Psychology / History', 'BJMC Journalism', 'UPSC / State Civil Services prep'],
    courses: [
      { id: 'hum-yt-1', title: 'Political Science Class 11 – NCERT Based', platform: 'youtube', url: 'https://www.youtube.com/@MagnetBrains', stream: 'Humanities', level: '10' },
      { id: 'hum-yt-2', title: 'Psychology for CBSE Class 11', platform: 'youtube', url: 'https://www.youtube.com/@LetsTute', stream: 'Humanities', level: '10' },
      { id: 'hum-udemy', title: 'CLAT Preparation – Legal Aptitude', platform: 'udemy', url: 'https://www.udemy.com/topic/clat/', stream: 'Humanities', level: '10' },
    ],
  },
  {
    id: 'vocational',
    name: 'Vocational',
    icon: '🎨',
    tagline: 'Design · Media · Hospitality · IT',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.15)',
    description: 'Great for hands-on learners who prefer applied skills over theory — portfolio-based careers in design, media, culinary arts, and IT support.',
    leads: ['B.Des via UCEED / NID DAT', 'B.Sc Hospitality via NCHM JEE', 'Mass Communication / BJMC', 'B.Voc in Web Tech / Digital Media'],
    courses: [
      { id: 'voc-yt-1', title: 'UI/UX Design Crash Course for Beginners', platform: 'youtube', url: 'https://www.youtube.com/@DesignCourse', stream: 'Vocational', level: '10' },
      { id: 'voc-udemy', title: 'Figma UI Design – Zero to Hero', platform: 'udemy', url: 'https://www.udemy.com/topic/figma/', stream: 'Vocational', level: '10' },
      { id: 'voc-yt-2', title: 'Graphic Design Principles | Canva & Photoshop', platform: 'youtube', url: 'https://www.youtube.com/@GarySimons', stream: 'Vocational', level: '10' },
    ],
  },
];

const pathwayForks = [
  {
    id: 'plus2',
    icon: GraduationCap,
    title: 'Class 11 & 12 (+2)',
    badge: 'Most Common',
    badgeColor: 'var(--accent-primary)',
    desc: 'Continue in one of the four main streams. After 12th, you compete for college admissions via entrance exams (JEE, NEET, CUET, CLAT).',
    pros: ['Opens all professional degree pathways', 'Leads to B.Tech, MBBS, Law, MBA, CA', 'Nationally recognised boards (CBSE/ICSE/State)'],
    cons: ['2 more years of school', 'Board + entrance exam pressure combined'],
  },
  {
    id: 'diploma',
    icon: Briefcase,
    title: 'Diploma (Polytechnic)',
    badge: 'Faster Entry',
    badgeColor: 'var(--accent-teal)',
    desc: '3-year diploma in Engineering, Architecture, or applied technology directly after Class 10. Get a job faster or enter B.Tech in 2nd year (Lateral Entry).',
    pros: ['3-year program, job-ready faster', 'Lateral entry into B.Tech (2nd year)', 'Low fees compared to private colleges', 'Good for practical, hands-on learners'],
    cons: ['Fewer options for postgrad (GATE/MBA need UG degree)', 'Some employers still prefer degree holders'],
  },
  {
    id: 'iti',
    icon: Wrench,
    title: 'ITI (Industrial Training)',
    badge: 'Skill-Focused',
    badgeColor: 'var(--accent-secondary)',
    desc: '1-2 year government trade courses in electrician, plumbing, welder, COPA (computers), mechanic, and 130+ other trades. Direct industry employment after.',
    pros: ['1-2 years only', 'Government ITIs are very affordable', 'Direct employment in industry & PSUs', 'Apprenticeship stipend during training'],
    cons: ['Limited to specific trades', 'Further academic upgradation is harder'],
  },
];

/* ─── Component ─── */
function After10th() {
  const navigate = useNavigate();
  const { setClassLevel } = useClassLevel();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [expandedStream, setExpandedStream] = useState(null);

  const handlePathfinder = () => {
    setClassLevel('10');
    navigate('/pathfinder');
  };

  const toggleStream = (id) => {
    setExpandedStream(prev => prev === id ? null : id);
  };

  return (
    <div className="after10-page animate-fade-in">
      {/* ── Hero ── */}
      <section className="after10-hero">
        <div className="after10-glow-1" />
        <div className="after10-glow-2" />
        <div className="section-container after10-hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/" className="breadcrumb-link" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-current">After 10th</span>
          </nav>

          <span className="badge-pill after10-badge">
            <Sparkles size={12} className="badge-icon" />
            Class 10 Pathway Guide 🎓
          </span>
          <h1 className="after10-hero-title">
            You just cleared Class 10.<br />
            <span className="text-gradient-accent">What comes next?</span>
          </h1>
          <p className="after10-hero-sub">
            Three forks in the road: Class 11-12 (streams), Diploma (polytechnic), or ITI (trade skills).
            No wrong choice — just different timelines. Explore each below and take our 5-minute quiz for a personalised recommendation.
          </p>
          <div className="after10-hero-ctas">
            <button className="btn btn-primary" onClick={handlePathfinder}>
              Take the Pathfinder Quiz <ArrowRight size={16} />
            </button>
            <a href="#streams" className="btn btn-secondary">
              Explore Streams ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── Fork Cards: +2 vs Diploma vs ITI ── */}
      <section className="after10-forks-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Three Paths After Class 10</h2>
            <p className="section-subtitle">Each has different timelines, costs, and outcomes. Pick what fits your goals and learning style.</p>
          </div>
          <div className="forks-grid">
            {pathwayForks.map((fork) => {
              const Icon = fork.icon;
              return (
                <div key={fork.id} className="fork-card glass-card">
                  <div className="fork-icon-row">
                    <div className="fork-icon-circle">
                      <Icon size={22} />
                    </div>
                    <span className="fork-badge" style={{ backgroundColor: fork.badgeColor + '22', color: fork.badgeColor, borderColor: fork.badgeColor + '44' }}>
                      {fork.badge}
                    </span>
                  </div>
                  <h3 className="fork-title">{fork.title}</h3>
                  <p className="fork-desc">{fork.desc}</p>
                  <div className="fork-pros-cons">
                    <div className="fork-list fork-pros">
                      {fork.pros.map((p, i) => <span key={i}><span className="green-dot">✓</span>{p}</span>)}
                    </div>
                    <div className="fork-list fork-cons">
                      {fork.cons.map((c, i) => <span key={i}><span className="red-dot">✗</span>{c}</span>)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stream Accordion ── */}
      <section className="after10-streams-section" id="streams">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Explore Each Class 11-12 Stream</h2>
            <p className="section-subtitle">Click any stream to see what you'll study, where it leads, and free course resources to get started.</p>
          </div>

          <div className="streams-accordion">
            {streams10th.map((stream) => {
              const isOpen = expandedStream === stream.id;
              return (
                <div key={stream.id} className={`stream-accordion-item glass-card ${isOpen ? 'open' : ''}`} style={{ '--stream-color': stream.color, '--stream-glow': stream.glow }}>
                  <button
                    className="accordion-header"
                    onClick={() => toggleStream(stream.id)}
                    aria-expanded={isOpen}
                    aria-controls={`stream-body-${stream.id}`}
                  >
                    <div className="accordion-header-left">
                      <span className="accordion-icon">{stream.icon}</span>
                      <div>
                        <h3 className="accordion-title">{stream.name}</h3>
                        <span className="accordion-tagline">{stream.tagline}</span>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp size={20} className="chevron" /> : <ChevronDown size={20} className="chevron" />}
                  </button>

                  {isOpen && (
                    <div className="accordion-body animate-fade-in" id={`stream-body-${stream.id}`}>
                      <p className="accordion-desc">{stream.description}</p>

                      <div className="accordion-leads">
                        <h4 className="leads-title"><BookOpen size={14} /> Where it leads:</h4>
                        <div className="leads-chips">
                          {stream.leads.map((l, i) => (
                            <span key={i} className="lead-chip">{l}</span>
                          ))}
                        </div>
                      </div>

                      <div className="accordion-courses">
                        <h4 className="courses-section-title">📚 Free Resources to Get Started:</h4>
                        <div className="courses-mini-grid">
                          {stream.courses.map((course) => (
                            <CourseCard
                              key={course.id}
                              {...course}
                              isBookmarked={isBookmarked(course.id)}
                              onBookmark={() => toggleBookmark({ id: course.id, type: 'course', data: course })}
                            />
                          ))}
                        </div>
                      </div>

                      <button
                        className="explore-stream-btn btn btn-secondary"
                        onClick={() => navigate(`/stream/${stream.id}`)}
                        aria-label={`Explore full guide for ${stream.name}`}
                      >
                        Full {stream.name} Guide <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Pathfinder CTA ── */}
      <section className="after10-cta-section">
        <div className="section-container">
          <div className="after10-cta-box glass-card">
            <div className="after10-cta-glow" />
            <span className="badge-pill">✨ Personalised for You</span>
            <h2>Not sure which path fits?</h2>
            <p>Answer 5 quick questions about your interests, marks, budget, and preferred state. We'll match you with the best streams, exams, and colleges.</p>
            <button className="btn btn-primary" onClick={handlePathfinder}>
              Start the Pathfinder Quiz <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default After10th;
