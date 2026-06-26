import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeftRight, Sparkles, Heart, Award, Users, Coins, Flame,
  Building, Search, X, List, Table2, Play, BookOpen, ExternalLink,
  TrendingUp, Star, Video
} from 'lucide-react';

import { supabase } from '../supabaseclient';
import CollegeCard from '../components/cards/CollegeCard';
import useBookmarks from '../hooks/useBookmarks';
import '../components/cards/Cards.css';
import './CompareColleges.css';

const collegesData = [
  { id: 'iit-bombay', name: 'IIT Bombay', type: 'Engineering', state: 'Maharashtra', icon: '⚙️', fees: '~₹2.5L/yr', avgPackage: '₹23.5 LPA', exams: ['JEE Advanced'], streams: ['science-pcm'], placements: '₹23.5 LPA overall average. Tech-focused recruiters dominate.', campusLife: '550-acre green campus. Hostels are older but functional.', research: 'Top-tier. High funding from government and MNCs.', culture: 'Extremely competitive. Strong startup culture.', feesROI: 'Excellent ROI. Average starting package exceeds cost.', admissionDifficulty: 'Extremely High. Top 3,000 in JEE Advanced.', infrastructure: 'World-class tech labs, supercomputing center.', feesNum: 250000, packageNum: 2350000, nirfRank: 3 },
  { id: 'bits-pilani', name: 'BITS Pilani', type: 'Engineering', state: 'Rajasthan', icon: '⚡', fees: '~₹5.5L/yr', avgPackage: '₹20.8 LPA', exams: ['BITSAT'], streams: ['science-pcm'], placements: '₹20.8 LPA average. Top IT recruiters.', campusLife: '328-acre self-contained desert campus. Zero Attendance Policy.', research: 'High quality. Industry-linked Practice School.', culture: 'Collaborative, relaxed. Exceptional alumni network.', feesROI: 'Moderate ROI due to high fees, but excellent placements.', admissionDifficulty: 'Very High. Admission purely via BITSAT.', infrastructure: 'Outstanding self-contained residential infrastructure.', feesNum: 550000, packageNum: 2080000, nirfRank: 30 },
  { id: 'aiims-delhi', name: 'AIIMS New Delhi', type: 'Medical', state: 'Delhi', icon: '🏥', fees: '<₹1K/yr', avgPackage: '₹12-18 LPA', exams: ['NEET UG'], streams: ['science-pcb'], placements: '100% placement into top residencies globally.', campusLife: 'Located in South Delhi. Very affordable hostels.', research: 'World-class clinical research.', culture: 'Highly academic and demanding.', feesROI: 'Exceptional ROI. Under ₹6,000 total fees for MBBS.', admissionDifficulty: 'Insanely High. Top 50-100 NEET rank.', infrastructure: 'Cutting-edge medical labs and hospitals.', feesNum: 1000, packageNum: 1500000, nirfRank: 1 },
  { id: 'srcc', name: 'SRCC (DU)', type: 'Commerce', state: 'Delhi', icon: '📊', fees: '~₹40K/yr', avgPackage: '₹10.5 LPA', exams: ['CUET UG'], streams: ['commerce'], placements: '₹10.5 LPA average. Top consultancies recruit heavily.', campusLife: 'Located in DU North Campus. Premium building.', research: 'Focused on financial policy papers.', culture: 'Hyper-competitive. High emphasis on corporate portfolios.', feesROI: 'Stellar ROI. DU fees are very low.', admissionDifficulty: 'Exceptionally High. Nearly perfect CUET scores.', infrastructure: 'Good campus building, air-conditioned classrooms.', feesNum: 40000, packageNum: 1050000, nirfRank: 7 },
  { id: 'nls-bangalore', name: 'NLS Bangalore', type: 'Law', state: 'Karnataka', icon: '⚖️', fees: '~₹2.5L/yr', avgPackage: '₹16 LPA', exams: ['CLAT'], streams: ['humanities', 'commerce'], placements: '₹16.0 LPA average. Premium law firms recruit directly.', campusLife: '23-acre campus in Nagarbhavi. Trimester system.', research: "India's leading center for legal reforms.", culture: 'Intellectually rigorous, argumentative.', feesROI: 'Great ROI. Placements average ₹16 LPA.', admissionDifficulty: 'High. Top 100-150 rank in CLAT.', infrastructure: 'Beautiful campus, vast law library.', feesNum: 250000, packageNum: 1600000, nirfRank: 1 },
  { id: 'ashoka-univ', name: 'Ashoka University', type: 'Liberal Arts & Sciences', state: 'Haryana', icon: '📚', fees: '~₹10L/yr', avgPackage: '₹8.5 LPA', exams: ['AAT', 'SAT'], streams: ['humanities', 'science-pcm', 'commerce'], placements: '₹8.5 LPA average. Consulting, media, social impact.', campusLife: '25-acre residential campus in Sonepat.', research: 'High emphasis on interdisciplinary studies.', culture: 'Open, expressive, and liberal.', feesROI: 'Moderate ROI. Premium fees, but generous financial aid.', admissionDifficulty: 'High. Holistic admissions process.', infrastructure: 'Ivy-league style campus. State-of-the-art facilities.', feesNum: 1000000, packageNum: 850000, nirfRank: 25 }
];

const collegeCourses = [
  { college_id: 'iit-bombay', title: 'IIT JEE Physics by HC Verma', provider: 'YouTube', url: 'https://www.youtube.com/@physicsgalaxyworld', instructor: 'Ashish Arora', type: 'Free', rating: 4.9, exam: 'JEE Advanced' },
  { college_id: 'iit-bombay', title: 'Complete JEE Maths Masterclass', provider: 'Udemy', url: 'https://www.udemy.com/course/jee-main-maths-algebra/', instructor: 'LearnTech India', type: 'Paid', rating: 4.6, exam: 'JEE Advanced' },
  { college_id: 'bits-pilani', title: 'BITSAT Full Mock Test Series', provider: 'YouTube', url: 'https://www.youtube.com/@AakashiTutor', instructor: 'Aakash Team', type: 'Free', rating: 4.7, exam: 'BITSAT' },
  { college_id: 'bits-pilani', title: 'BITSAT English Proficiency Course', provider: 'Udemy', url: 'https://www.udemy.com/course/english-proficiency-for-competitive-exams/', instructor: 'Priya Khanna', type: 'Paid', rating: 4.5, exam: 'BITSAT' },
  { college_id: 'aiims-delhi', title: 'NCERT Biology Line by Line Series', provider: 'YouTube', url: 'https://www.youtube.com/@GarimaGoelBiology', instructor: 'Garima Goel', type: 'Free', rating: 4.9, exam: 'NEET UG' },
  { college_id: 'aiims-delhi', title: 'NEET Physics One-Shot Crash Course', provider: 'YouTube', url: 'https://www.youtube.com/@PhysicsWallah', instructor: 'Alakh Pandey', type: 'Free', rating: 4.9, exam: 'NEET UG' },
  { college_id: 'aiims-delhi', title: 'Mastering Biology for NEET', provider: 'Udemy', url: 'https://www.udemy.com/course/neet-biology-physiology/', instructor: 'Dr. Shalini', type: 'Paid', rating: 4.6, exam: 'NEET UG' },
  { college_id: 'srcc', title: 'CUET Commerce Domain Core Classes', provider: 'YouTube', url: 'https://www.youtube.com/@CommerceAdda247', instructor: 'Commerce Adda', type: 'Free', rating: 4.8, exam: 'CUET UG' },
  { college_id: 'srcc', title: 'CUET Section III Quantitative Aptitude', provider: 'Udemy', url: 'https://www.udemy.com/course/cuet-general-test-quantitative-aptitude/', instructor: 'PrepOnline', type: 'Paid', rating: 4.4, exam: 'CUET UG' },
  { college_id: 'nls-bangalore', title: 'Daily Current Affairs & Legal Reasoning for CLAT', provider: 'YouTube', url: 'https://www.youtube.com/@LegalEdgeCLATPreparation', instructor: 'LegalEdge Team', type: 'Free', rating: 4.8, exam: 'CLAT' },
  { college_id: 'nls-bangalore', title: 'Crack CLAT: Step-by-Step Law Prep Bootcamp', provider: 'Udemy', url: 'https://www.udemy.com/course/clat-legal-reasoning-bootcamp/', instructor: 'Legal Academy', type: 'Paid', rating: 4.7, exam: 'CLAT' },
  { college_id: 'ashoka-univ', title: 'Liberal Arts Career Roadmap in India', provider: 'YouTube', url: 'https://www.youtube.com/@StudySmarter', instructor: 'StudySmarter', type: 'Free', rating: 4.5, exam: 'AAT / SAT' },
  { college_id: 'ashoka-univ', title: 'SAT Math & Reading Complete Prep', provider: 'Udemy', url: 'https://www.udemy.com/course/sat-complete-prep/', instructor: 'Target Test Prep', type: 'Paid', rating: 4.8, exam: 'AAT / SAT' },
];

const types = ['All', 'Engineering', 'Medical', 'Commerce', 'Law', 'Liberal Arts & Sciences'];

const TABLE_COLUMNS = [
  { key: 'name', label: 'College', sortable: false },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'state', label: 'State', sortable: true },
  { key: 'fees', label: 'Annual Fees', sortable: true, sortKey: 'feesNum' },
  { key: 'avgPackage', label: 'Avg Package', sortable: true, sortKey: 'packageNum' },
  { key: 'exams', label: 'Entrance Exam', sortable: false },
  { key: 'nirfRank', label: 'NIRF Rank', sortable: true },
];

function CompareColleges() {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [colleges, setColleges] = useState(collegesData);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'table' | 'compare' | 'courses'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [collegeAId, setCollegeAId] = useState('iit-bombay');
  const [collegeBId, setCollegeBId] = useState('bits-pilani');
  const [sortConfig, setSortConfig] = useState({ key: 'nirfRank', dir: 'asc' });
  const [selectedCourseCollege, setSelectedCourseCollege] = useState('all');

  useEffect(() => {
    async function fetchColleges() {
      try {
        const { data, error } = await supabase.from('colleges').select('*');
        if (error) throw error;
        if (data && data.length > 0) {
          const mapped = data.map(c => ({
            id: c.id, name: c.name, type: c.type, state: c.state, icon: c.icon,
            fees: c.fees, avgPackage: c.avg_package || c.avgPackage,
            exams: c.exams, streams: c.streams, placements: c.placements,
            campusLife: c.campus_life || c.campusLife, research: c.research,
            culture: c.culture, feesROI: c.fees_roi || c.feesROI,
            admissionDifficulty: c.admission_difficulty || c.admissionDifficulty,
            infrastructure: c.infrastructure
          }));
          setColleges(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch colleges from Supabase, using local fallback:", err);
      }
    }
    fetchColleges();
  }, []);

  const collegeA = colleges.find(c => c.id === collegeAId) || colleges[0] || collegesData[0];
  const collegeB = colleges.find(c => c.id === collegeBId) || colleges[1] || collegesData[1];

  const filteredColleges = useMemo(() => {
    return colleges.filter((c) => {
      const typeMatch = selectedType === 'All' || c.type === selectedType;
      const searchMatch = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.state.toLowerCase().includes(searchQuery.toLowerCase());
      return typeMatch && searchMatch;
    });
  }, [colleges, selectedType, searchQuery]);

  const sortedTableColleges = useMemo(() => {
    const list = [...filteredColleges];
    if (!sortConfig.key) return list;
    list.sort((a, b) => {
      const col = TABLE_COLUMNS.find(c => c.key === sortConfig.key);
      const k = col?.sortKey || sortConfig.key;
      const aVal = a[k] ?? 9999;
      const bVal = b[k] ?? 9999;
      return sortConfig.dir === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });
    return list;
  }, [filteredColleges, sortConfig]);

  const filteredCourses = useMemo(() => {
    return collegeCourses.filter(c =>
      selectedCourseCollege === 'all' || c.college_id === selectedCourseCollege
    );
  }, [selectedCourseCollege]);

  const handleSort = (col) => {
    if (!col.sortable) return;
    setSortConfig(prev => ({
      key: col.key,
      dir: prev.key === col.key && prev.dir === 'asc' ? 'desc' : 'asc'
    }));
  };

  const clearSearch = () => setSearchQuery('');

  const tabs = [
    { id: 'list', label: 'Directory', icon: List },
    { id: 'table', label: 'Table View', icon: Table2 },
    { id: 'compare', label: 'Compare', icon: ArrowLeftRight },
    { id: 'courses', label: 'Prep Courses', icon: BookOpen },
  ];

  return (
    <div className="compare-colleges-page animate-fade-in">
      <div className="compare-bg-glow" />
      <div className="section-container">
        {/* Header */}
        <div className="compare-page-header">
          <span className="badge-pill compare-badge">
            <Building size={12} className="badge-icon" />
            College Directory & Compare
          </span>
          <h1>Find & Compare Top Colleges</h1>
          <p>
            Browse curated top colleges, compare them side-by-side, or explore
            prep courses to get exam-ready from the start.
          </p>
          <div className="tabs-toggle">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`tab-btn ${activeTab === id ? 'active' : ''}`}
                onClick={() => setActiveTab(id)}
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* ──── LIST VIEW ──── */}
        {activeTab === 'list' && (
          <div className="list-view-content animate-fade-in">
            <div className="exams-search-row">
              <div className="search-input-wrapper">
                <Search size={16} className="search-icon" />
                <input
                  type="search"
                  placeholder="Search by name or state…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="exam-search-input"
                />
                {searchQuery && (
                  <button className="search-clear-btn" onClick={clearSearch}><X size={14} /></button>
                )}
              </div>
            </div>
            <div className="filter-chips-container">
              {types.map((t) => (
                <button key={t} className={`filter-chip ${selectedType === t ? 'active' : ''}`} onClick={() => setSelectedType(t)}>
                  {t}
                  {t === selectedType && t !== 'All' && (
                    <X size={11} className="chip-remove" onClick={(e) => { e.stopPropagation(); setSelectedType('All'); }} />
                  )}
                </button>
              ))}
            </div>
            <div className="colleges-grid-directory">
              {filteredColleges.length === 0 ? (
                <div className="empty-state">
                  <span>🏫</span>
                  <p>No colleges found matching your criteria.</p>
                </div>
              ) : (
                filteredColleges.map((c) => (
                  <CollegeCard
                    key={c.id}
                    {...c}
                    isBookmarked={isBookmarked(c.id)}
                    onBookmark={() => toggleBookmark({ id: c.id, type: 'college', data: c })}
                    onClick={() => { setCollegeAId(c.id); setActiveTab('compare'); }}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* ──── TABLE VIEW ──── */}
        {activeTab === 'table' && (
          <div className="animate-fade-in">
            <div className="table-search-row">
              <div className="search-input-wrapper">
                <Search size={16} className="search-icon" />
                <input
                  type="search"
                  placeholder="Search colleges…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="exam-search-input"
                />
                {searchQuery && (
                  <button className="search-clear-btn" onClick={clearSearch}><X size={14} /></button>
                )}
              </div>
              <div className="filter-chips-container" style={{ marginBottom: 0 }}>
                {types.map((t) => (
                  <button key={t} className={`filter-chip ${selectedType === t ? 'active' : ''}`} onClick={() => setSelectedType(t)}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="college-table-wrapper glass-card">
              <table className="college-data-table">
                <thead>
                  <tr>
                    {TABLE_COLUMNS.map((col) => (
                      <th
                        key={col.key}
                        className={col.sortable ? 'sortable' : ''}
                        onClick={() => handleSort(col)}
                      >
                        {col.label}
                        {col.sortable && (
                          <span className="sort-arrow">
                            {sortConfig.key === col.key
                              ? (sortConfig.dir === 'asc' ? ' ↑' : ' ↓')
                              : ' ⇅'}
                          </span>
                        )}
                      </th>
                    ))}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTableColleges.length === 0 ? (
                    <tr>
                      <td colSpan={TABLE_COLUMNS.length + 1} className="table-empty">
                        No colleges match your filters.
                      </td>
                    </tr>
                  ) : sortedTableColleges.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <div className="table-college-name">
                          <span className="table-college-icon">{c.icon}</span>
                          <span>{c.name}</span>
                        </div>
                      </td>
                      <td><span className="type-badge">{c.type}</span></td>
                      <td>{c.state}</td>
                      <td className="fees-cell">{c.fees}</td>
                      <td className="package-cell">{c.avgPackage}</td>
                      <td>
                        {(Array.isArray(c.exams) ? c.exams : [c.exams]).map((ex, i) => (
                          <span key={i} className="exam-tag">{ex}</span>
                        ))}
                      </td>
                      <td>
                        {c.nirfRank ? (
                          <span className="nirf-rank">#{c.nirfRank}</span>
                        ) : '—'}
                      </td>
                      <td>
                        <button
                          className="table-compare-btn"
                          onClick={() => { setCollegeAId(c.id); setActiveTab('compare'); }}
                        >
                          Compare
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="table-footnote">
              * NIRF ranks are category-specific. Fees and package data are approximate. Click "Compare" to do a deep dive.
            </p>
          </div>
        )}

        {/* ──── COMPARE VIEW ──── */}
        {activeTab === 'compare' && (
          <div className="compare-view-content animate-slide-up">
            <div className="comparison-selectors glass-card">
              <div className="selector-col">
                <label htmlFor="collegeA">Select College A</label>
                <div className="select-wrapper">
                  <select id="collegeA" value={collegeAId} onChange={(e) => setCollegeAId(e.target.value)}>
                    {colleges.map(c => (
                      <option key={c.id} value={c.id} disabled={c.id === collegeBId}>{c.icon} {c.name}</option>
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
                  <select id="collegeB" value={collegeBId} onChange={(e) => setCollegeBId(e.target.value)}>
                    {colleges.map(c => (
                      <option key={c.id} value={c.id} disabled={c.id === collegeAId}>{c.icon} {c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="comparison-results-grid">
              {[
                { key: 'placements', icon: Award, color: 'text-orange', title: 'Average Placements', sub: 'Entry salary & recruiters' },
                { key: 'campusLife', icon: Heart, color: 'text-rose', title: 'Campus Life', sub: 'Fests, hostels & infrastructure' },
                { key: 'research', icon: Sparkles, color: 'text-indigo', title: 'Research Focus', sub: 'Patents, labs & funding' },
                { key: 'culture', icon: Users, color: 'text-teal', title: 'Peer Culture', sub: 'Workload & study environment' },
                { key: 'feesROI', icon: Coins, color: 'text-green', title: 'Fees & ROI', sub: 'Cost vs Return' },
                { key: 'admissionDifficulty', icon: Flame, color: 'text-red', title: 'Admission Difficulty', sub: 'Exams & cutoffs' },
                { key: 'infrastructure', icon: Building, color: 'text-blue', title: 'Infrastructure', sub: 'Labs, library & sports' }
              ].map((factor, i) => {
                const Icon = factor.icon;
                return (
                  <div key={i} className="comparison-row glass-card">
                    <div className="factor-heading-col">
                      <Icon className={`factor-icon ${factor.color}`} size={24} />
                      <h4>{factor.title}</h4>
                      <span className="factor-sub">{factor.sub}</span>
                    </div>
                    <div className="college-data-cols">
                      <div className="college-data-col border-right">
                        <span className="college-name-badge">{collegeA.name}</span>
                        <p className="factor-text">{collegeA[factor.key]}</p>
                      </div>
                      <div className="college-data-col">
                        <span className="college-name-badge">{collegeB.name}</span>
                        <p className="factor-text">{collegeB[factor.key]}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ──── COURSES VIEW ──── */}
        {activeTab === 'courses' && (
          <div className="animate-fade-in">
            <div className="courses-header">
              <TrendingUp size={20} className="courses-header-icon" />
              <div>
                <h2 className="courses-title">Exam Prep Courses</h2>
                <p className="courses-subtitle">Handpicked free & paid resources from YouTube and Udemy — sorted by college entrance exam.</p>
              </div>
            </div>

            <div className="courses-filter-row">
              <span className="courses-filter-label">Filter by college:</span>
              <div className="filter-chips-container" style={{ marginBottom: 0 }}>
                <button
                  className={`filter-chip ${selectedCourseCollege === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCourseCollege('all')}
                >
                  All Colleges
                </button>
                {collegesData.map(c => (
                  <button
                    key={c.id}
                    className={`filter-chip ${selectedCourseCollege === c.id ? 'active' : ''}`}
                    onClick={() => setSelectedCourseCollege(c.id)}
                  >
                    {c.icon} {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="courses-table-wrapper glass-card">
              <table className="courses-data-table">
                <thead>
                  <tr>
                    <th>Course Title</th>
                    <th>College Target</th>
                    <th>Exam</th>
                    <th>Platform</th>
                    <th>Instructor</th>
                    <th>Type</th>
                    <th>Rating</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course, i) => {
                    const college = collegesData.find(c => c.id === course.college_id);
                    return (
                      <tr key={i}>
                        <td className="course-title-cell">{course.title}</td>
                        <td>
                          <span className="table-college-icon">{college?.icon}</span>{' '}
                          <span className="course-college-name">{college?.name}</span>
                        </td>
                        <td><span className="exam-tag">{course.exam}</span></td>
                        <td>
                          <span className={`platform-badge ${course.provider === 'YouTube' ? 'yt' : 'udemy'}`}>
                            {course.provider === 'YouTube' ? <video size={13} /> : <BookOpen size={13} />}
                            {course.provider}
                          </span>
                        </td>
                        <td className="instructor-cell">{course.instructor}</td>
                        <td>
                          <span className={`type-tag ${course.type === 'Free' ? 'free' : 'paid'}`}>
                            {course.type}
                          </span>
                        </td>
                        <td>
                          <span className="rating-cell">
                            <Star size={12} className="star-icon" />
                            {course.rating}
                          </span>
                        </td>
                        <td>
                          <a
                            href={course.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="course-link-btn"
                          >
                            Open <ExternalLink size={12} />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="table-footnote">
              * All external links are independent course providers. Disha does not earn referral fees from any of these links.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompareColleges;
