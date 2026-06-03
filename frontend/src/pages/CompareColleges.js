import React, { useState } from 'react';
import { Mail, ArrowLeftRight, Sparkles, Heart, Award, Users, Coins, Flame, Building } from 'lucide-react';
import './CompareColleges.css';

const collegesData = [
  {
    id: 'iit-bombay',
    name: 'IIT Bombay (Powai)',
    type: 'Engineering',
    icon: '⚙️',
    placements: '₹23.5 LPA overall average. Tech-focused recruiters (Google, Microsoft, high-frequency trading firms) dominate. Strong international offers.',
    campusLife: 'Sprawling 550-acre green campus next to Powai Lake. Iconic cultural fest "Mood Indigo" and tech fest "Techfest". Active sports clubs. Hostel infrastructure is massive, though older hostels are basic and shared.',
    research: 'Top-tier. High funding from government and MNCs. Houses advanced centers in nanotechnology, AI, and environmental engineering. Active patent filings.',
    culture: 'Extremely competitive and high-pressure. Peer environment is exceptionally smart. Strong startup culture (E-Cell is highly influential).',
    feesROI: 'Excellent ROI. Total fees are around ₹10 Lakhs for 4 years. Many students get full/partial waivers. Average starting package (~₹23.5 LPA) exceeds the cost easily.',
    admissionDifficulty: 'Extremely High. Requires clearing JEE Main and ranking in the top 3,000 in JEE Advanced (CS branch closes around AIR 60).',
    infrastructure: 'World-class tech labs, state-of-the-art supercomputing center, massive library, sports complexes, and standard hostel facilities.'
  },
  {
    id: 'bits-pilani',
    name: 'BITS Pilani (Pilani Campus)',
    type: 'Engineering',
    icon: '⚡',
    placements: '₹20.8 LPA average. Top IT recruiters, core engineering firms, and finance companies (Goldman Sachs, Morgan Stanley) recruit in huge numbers.',
    campusLife: 'Fully residential 328-acre self-contained desert campus. Vibrant student culture with fests like OASIS. Unique "Zero Attendance Policy" gives students maximum independence.',
    research: 'High quality. Offers strong industry-linked research projects. Highly acclaimed Practice School (PS-I & PS-II) program offers 6-month industry internships.',
    culture: 'Collaborative, relaxed compared to IITs. Strong student-run clubs. Exceptional alumni network (BITSians are known to help junior BITSians aggressively).',
    feesROI: 'Moderate ROI. High academic fees (approx. ₹22-26 Lakhs for 4 years). Excellent average placements (~₹20.8 LPA) help recover it, but it requires substantial initial investment.',
    admissionDifficulty: 'Very High. Admission purely via BITSAT exam. BITSAT score requirements are high, especially for Pilani Computer Science (typically 320+/400).',
    infrastructure: 'Outstanding self-contained residential infrastructure. Fully air-conditioned library, modern classrooms, high-tech labs, and sports arenas.'
  },
  {
    id: 'aiims-delhi',
    name: 'AIIMS New Delhi',
    type: 'Medical',
    icon: '🏥',
    placements: 'Almost 100% placement into top medical residency positions globally. Incredible clinical exposure. OPD handles over 10,000 patients daily.',
    campusLife: 'Located in the heart of South Delhi. Pulse is the largest medical fest in South Asia. Compact, cozy campus. Hostel rooms are guaranteed and very affordable (less than ₹1000/year).',
    research: 'World-class clinical research. AIIMS papers are cited globally in healthcare policies. Undergraduate research is highly encouraged with ICMR grants.',
    culture: 'Highly academic and demanding, but peers are extremely supportive. High sense of duty and public service. Workload is heavy, particularly during clinical postings.',
    feesROI: 'Exceptional ROI. Total fees for 5.5 years of MBBS is under ₹6,000 (including hostels). Average starting salary is ₹12-18 LPA, making it virtually free education.',
    admissionDifficulty: 'Insanely High. Open general seats are only ~50. Requires NEET rank in the top 50-100 nationally.',
    infrastructure: 'Cutting-edge medical labs, advanced diagnostic machinery, 24/7 library access, clean campus, and guaranteed hostel accommodation for all students.'
  },
  {
    id: 'srcc',
    name: 'SRCC (Delhi University)',
    type: 'Commerce',
    icon: '📊',
    placements: '₹10.5 LPA average (highest for a non-tech UG college). Top consultancies (McKinsey, BCG, Bain) and financial firms recruit heavily.',
    campusLife: 'Located in DU North Campus. Premium building infrastructure compared to other DU colleges. Fests like Crossroads are popular. Hostel seats are highly limited and merit-based.',
    research: 'Focused on financial policy papers and corporate economics. Excellent resources at the GBO library. Less focus on patents, high focus on research journals.',
    culture: 'Hyper-competitive. High emphasis on building corporate portfolios, case competitions, and obtaining high board/semester grades.',
    feesROI: 'Stellar ROI. DU fees are very low, around ₹30,000-45,000 per year. Average package is ₹10.5 LPA, yielding one of the best ROIs in India for commerce.',
    admissionDifficulty: 'Exceptionally High. Admission via CUET UG. Requires nearly perfect scores in Commerce domains (often 790+/800).',
    infrastructure: 'Good campus building, fully air-conditioned classrooms, large seminar halls, well-stocked library, and sports facilities, though hostel capacity is extremely limited.'
  },
  {
    id: 'nls-bangalore',
    name: 'NLS Bangalore (NLSIU)',
    type: 'Law',
    icon: '⚖️',
    placements: '₹16.0 LPA average. Premium domestic and international law firms (Amarchand, Trilegal, Linklaters) recruit directly. 100% placement rate for batches.',
    campusLife: 'Cozy, leafy 23-acre campus in Nagarbhavi. Intense academic schedule with trimester system (3 terms/year). Excellent library resources and moot court infrastructure.',
    research: 'India\'s leading center for legal reforms. Houses multiple research centers working directly with the Indian Judiciary and Law Commission.',
    culture: 'Intellectually rigorous, argumentative, and socially conscious. Moot court and debating cultures dominate. High reading workloads.',
    feesROI: 'Great ROI. Total fees are around ₹2.5-3 Lakhs per year. Placements average ₹16 LPA at top corporate law firms.',
    admissionDifficulty: 'High. Admission via CLAT UG. Requires a top 100-150 rank nationally.',
    infrastructure: 'Beautiful green campus, vast law library with extensive online legal database subscriptions, modern moot courts, and newly constructed hostel blocks.'
  },
  {
    id: 'ashoka-univ',
    name: 'Ashoka University (Sonepat)',
    type: 'Liberal Arts & Sciences',
    icon: '📚',
    placements: '₹8.5 LPA average. Diverse recruiters across consulting, media houses, tech startups, and social impact NGOs.',
    campusLife: 'Ultra-modern 25-acre residential campus in Sonepat (NCR). Top-tier hostels, fully air-conditioned, with premium dining halls. Very active student government and debating clubs.',
    research: 'High emphasis on interdisciplinary studies. Renowned faculty with international publications. Great funding for humanities and basic sciences research.',
    culture: 'Open, expressive, and liberal. Heavy focus on critical thinking, writing papers, and exploring subjects across fields before majoring.',
    feesROI: 'Moderate ROI. Premium fees of ~₹10-12 Lakhs per year (total B.A. cost is ~₹30-36 Lakhs). Generous need-based financial aid is available, but ROI is subjective compared to public universities.',
    admissionDifficulty: 'High. Holistic admissions process including SAT/ACT or Ashoka Aptitude Test (AAT), essays, and interviews, rather than purely exam scores.',
    infrastructure: 'Ivy-league style campus. State-of-the-art lecture halls, premium labs, Olympic-grade sports complex (swimming, squash), and premium dining/residence halls.'
  }
];


function CompareColleges() {
  const [collegeAId, setCollegeAId] = useState('iit-bombay');
  const [collegeBId, setCollegeBId] = useState('bits-pilani');
  
  // Email capture state
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState({ submitted: false, success: false, msg: '' });

  const collegeA = collegesData.find(c => c.id === collegeAId);
  const collegeB = collegesData.find(c => c.id === collegeBId);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubmitStatus({ submitted: true, success: false, msg: 'Please enter a valid email address.' });
      return;
    }
    
    // Simulate API registration
    setSubmitStatus({ 
      submitted: true, 
      success: true, 
      msg: '🚀 Awesome! We will notify you as soon as our full 500+ college database goes live.' 
    });
    setEmail('');
  };

  return (
    <div className="compare-colleges-page animate-fade-in">
      <div className="compare-bg-glow"></div>
      
      <div className="section-container">
        {/* Header */}
        <div className="compare-page-header">
          <span className="badge-pill compare-badge">
            <ArrowLeftRight size={12} className="badge-icon" />
            No-Rankings Comparison
          </span>
          <h1>Compare Colleges Beyond Rank</h1>
          <p>
            Rankings are often skewed. Compare India's top colleges side-by-side on real, 
            practical parameters that actually shape your future, your daily lifestyle, and campus happiness.
          </p>
        </div>

        {/* Dropdown Selectors */}
        <div className="comparison-selectors glass-card">
          <div className="selector-col">
            <label htmlFor="collegeA">Select College A</label>
            <div className="select-wrapper">
              <select 
                id="collegeA"
                value={collegeAId}
                onChange={(e) => setCollegeAId(e.target.value)}
              >
                {collegesData.map(c => (
                  <option key={c.id} value={c.id} disabled={c.id === collegeBId}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="comparison-icon-divider">
            <ArrowLeftRight size={20} className="divider-arrows" />
          </div>

          <div className="selector-col">
            <label htmlFor="collegeB">Select College B</label>
            <div className="select-wrapper">
              <select 
                id="collegeB"
                value={collegeBId}
                onChange={(e) => setCollegeBId(e.target.value)}
              >
                {collegesData.map(c => (
                  <option key={c.id} value={c.id} disabled={c.id === collegeAId}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="comparison-results-grid">
          {/* Factor 1: Placements */}
          <div className="comparison-row glass-card">
            <div className="factor-heading-col">
              <Award className="factor-icon text-orange" size={24} />
              <h4>Average Placements</h4>
              <span className="factor-sub">Entry salary & recruiters</span>
            </div>
            
            <div className="college-data-cols">
              <div className="college-data-col border-right">
                <span className="college-name-badge">{collegeA.name}</span>
                <p className="factor-text">{collegeA.placements}</p>
              </div>
              <div className="college-data-col">
                <span className="college-name-badge">{collegeB.name}</span>
                <p className="factor-text">{collegeB.placements}</p>
              </div>
            </div>
          </div>

          {/* Factor 2: Campus Life */}
          <div className="comparison-row glass-card">
            <div className="factor-heading-col">
              <Heart className="factor-icon text-rose" size={24} />
              <h4>Campus Life</h4>
              <span className="factor-sub">Fests, hostels & infrastructure</span>
            </div>
            
            <div className="college-data-cols">
              <div className="college-data-col border-right">
                <span className="college-name-badge">{collegeA.name}</span>
                <p className="factor-text">{collegeA.campusLife}</p>
              </div>
              <div className="college-data-col">
                <span className="college-name-badge">{collegeB.name}</span>
                <p className="factor-text">{collegeB.campusLife}</p>
              </div>
            </div>
          </div>

          {/* Factor 3: Research */}
          <div className="comparison-row glass-card">
            <div className="factor-heading-col">
              <Sparkles className="factor-icon text-indigo" size={24} />
              <h4>Research Focus</h4>
              <span className="factor-sub">Patents, labs & funding</span>
            </div>
            
            <div className="college-data-cols">
              <div className="college-data-col border-right">
                <span className="college-name-badge">{collegeA.name}</span>
                <p className="factor-text">{collegeA.research}</p>
              </div>
              <div className="college-data-col">
                <span className="college-name-badge">{collegeB.name}</span>
                <p className="factor-text">{collegeB.research}</p>
              </div>
            </div>
          </div>

          {/* Factor 4: Culture */}
          <div className="comparison-row glass-card">
            <div className="factor-heading-col">
              <Users className="factor-icon text-teal" size={24} />
              <h4>Peer Culture</h4>
              <span className="factor-sub">Workload & study environment</span>
            </div>
            
            <div className="college-data-cols">
              <div className="college-data-col border-right">
                <span className="college-name-badge">{collegeA.name}</span>
                <p className="factor-text">{collegeA.culture}</p>
              </div>
              <div className="college-data-col">
                <span className="college-name-badge">{collegeB.name}</span>
                <p className="factor-text">{collegeB.culture}</p>
              </div>
            </div>
          </div>

          {/* Factor 5: Fees & ROI */}
          <div className="comparison-row glass-card">
            <div className="factor-heading-col">
              <Coins className="factor-icon text-orange" size={24} />
              <h4>Fees & ROI</h4>
              <span className="factor-sub">Hostel & tuition vs salary returns</span>
            </div>
            
            <div className="college-data-cols">
              <div className="college-data-col border-right">
                <span className="college-name-badge">{collegeA.name}</span>
                <p className="factor-text">{collegeA.feesROI}</p>
              </div>
              <div className="college-data-col">
                <span className="college-name-badge">{collegeB.name}</span>
                <p className="factor-text">{collegeB.feesROI}</p>
              </div>
            </div>
          </div>

          {/* Factor 6: Admission Difficulty */}
          <div className="comparison-row glass-card">
            <div className="factor-heading-col">
              <Flame className="factor-icon text-rose" size={24} />
              <h4>Admission Difficulty</h4>
              <span className="factor-sub">Entrance exams & cutoffs</span>
            </div>
            
            <div className="college-data-cols">
              <div className="college-data-col border-right">
                <span className="college-name-badge">{collegeA.name}</span>
                <p className="factor-text">{collegeA.admissionDifficulty}</p>
              </div>
              <div className="college-data-col">
                <span className="college-name-badge">{collegeB.name}</span>
                <p className="factor-text">{collegeB.admissionDifficulty}</p>
              </div>
            </div>
          </div>

          {/* Factor 7: Infrastructure */}
          <div className="comparison-row glass-card">
            <div className="factor-heading-col">
              <Building className="factor-icon text-indigo" size={24} />
              <h4>Infrastructure</h4>
              <span className="factor-sub">Labs, library & sports facilities</span>
            </div>
            
            <div className="college-data-cols">
              <div className="college-data-col border-right">
                <span className="college-name-badge">{collegeA.name}</span>
                <p className="factor-text">{collegeA.infrastructure}</p>
              </div>
              <div className="college-data-col">
                <span className="college-name-badge">{collegeB.name}</span>
                <p className="factor-text">{collegeB.infrastructure}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Email Capture */}
        <section className="coming-soon-email-section glass-card">
          <div className="coming-soon-glow"></div>
          <div className="coming-soon-content">
            <span className="badge-pill coming-soon-pill">
              <Sparkles size={12} className="badge-icon" />
              Expanding Database
            </span>
            <h3>Unlock 500+ Indian Colleges</h3>
            <p>
              We are compiling honest reviews, placement data, and hostel feedback for 500+ engineering, 
              medical, commerce, and liberal arts colleges across India. Sign up to get notified when we launch.
            </p>

            <form onSubmit={handleEmailSubmit} className="email-form">
              <div className="input-wrapper">
                <Mail className="mail-icon" size={18} />
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary form-btn">
                Notify Me
              </button>
            </form>

            {submitStatus.submitted && (
              <p className={`form-message ${submitStatus.success ? 'success' : 'error'}`}>
                {submitStatus.msg}
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default CompareColleges;
