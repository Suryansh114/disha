import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeftRight, Sparkles, Heart, Award, Users, Coins, Flame, Building, Search, X, List } from 'lucide-react';
import { supabase } from '../supabaseclient';
import CollegeCard from '../components/cards/CollegeCard';
import useBookmarks from '../hooks/useBookmarks';
import '../components/cards/Cards.css';
import './CompareColleges.css';

const collegesData = [
  { id: 'iit-bombay', name: 'IIT Bombay', type: 'Engineering', state: 'Maharashtra', icon: '⚙️', fees: '~₹2.5L/yr', avgPackage: '₹23.5 LPA', exams: ['JEE Advanced'], streams: ['science-pcm'], placements: '₹23.5 LPA overall average. Tech-focused recruiters dominate.', campusLife: '550-acre green campus. Hostels are older but functional.', research: 'Top-tier. High funding from government and MNCs.', culture: 'Extremely competitive. Strong startup culture.', feesROI: 'Excellent ROI. Average starting package exceeds cost.', admissionDifficulty: 'Extremely High. Top 3,000 in JEE Advanced.', infrastructure: 'World-class tech labs, supercomputing center.' },
  { id: 'bits-pilani', name: 'BITS Pilani', type: 'Engineering', state: 'Rajasthan', icon: '⚡', fees: '~₹5.5L/yr', avgPackage: '₹20.8 LPA', exams: ['BITSAT'], streams: ['science-pcm'], placements: '₹20.8 LPA average. Top IT recruiters.', campusLife: '328-acre self-contained desert campus. Zero Attendance Policy.', research: 'High quality. Industry-linked Practice School.', culture: 'Collaborative, relaxed. Exceptional alumni network.', feesROI: 'Moderate ROI due to high fees, but excellent placements.', admissionDifficulty: 'Very High. Admission purely via BITSAT.', infrastructure: 'Outstanding self-contained residential infrastructure.' },
  { id: 'aiims-delhi', name: 'AIIMS New Delhi', type: 'Medical', state: 'Delhi', icon: '🏥', fees: '<₹1K/yr', avgPackage: '₹12-18 LPA', exams: ['NEET UG'], streams: ['science-pcb'], placements: '100% placement into top residencies globally.', campusLife: 'Located in South Delhi. Very affordable hostels.', research: 'World-class clinical research.', culture: 'Highly academic and demanding.', feesROI: 'Exceptional ROI. Under ₹6,000 total fees for MBBS.', admissionDifficulty: 'Insanely High. Top 50-100 NEET rank.', infrastructure: 'Cutting-edge medical labs and hospitals.' },
  { id: 'srcc', name: 'SRCC (DU)', type: 'Commerce', state: 'Delhi', icon: '📊', fees: '~₹40K/yr', avgPackage: '₹10.5 LPA', exams: ['CUET UG'], streams: ['commerce'], placements: '₹10.5 LPA average. Top consultancies recruit heavily.', campusLife: 'Located in DU North Campus. Premium building.', research: 'Focused on financial policy papers.', culture: 'Hyper-competitive. High emphasis on corporate portfolios.', feesROI: 'Stellar ROI. DU fees are very low.', admissionDifficulty: 'Exceptionally High. Nearly perfect CUET scores.', infrastructure: 'Good campus building, air-conditioned classrooms.' },
  { id: 'nls-bangalore', name: 'NLS Bangalore', type: 'Law', state: 'Karnataka', icon: '⚖️', fees: '~₹2.5L/yr', avgPackage: '₹16 LPA', exams: ['CLAT'], streams: ['humanities', 'commerce'], placements: '₹16.0 LPA average. Premium law firms recruit directly.', campusLife: '23-acre campus in Nagarbhavi. Trimester system.', research: 'India\'s leading center for legal reforms.', culture: 'Intellectually rigorous, argumentative.', feesROI: 'Great ROI. Placements average ₹16 LPA.', admissionDifficulty: 'High. Top 100-150 rank in CLAT.', infrastructure: 'Beautiful campus, vast law library.' },
  { id: 'ashoka-univ', name: 'Ashoka University', type: 'Liberal Arts & Sciences', state: 'Haryana', icon: '📚', fees: '~₹10L/yr', avgPackage: '₹8.5 LPA', exams: ['AAT', 'SAT'], streams: ['humanities', 'science-pcm', 'commerce'], placements: '₹8.5 LPA average. Consulting, media, social impact.', campusLife: '25-acre residential campus in Sonepat.', research: 'High emphasis on interdisciplinary studies.', culture: 'Open, expressive, and liberal.', feesROI: 'Moderate ROI. Premium fees, but generous financial aid.', admissionDifficulty: 'High. Holistic admissions process.', infrastructure: 'Ivy-league style campus. State-of-the-art facilities.' }
];

const types = ['All', 'Engineering', 'Medical', 'Commerce', 'Law', 'Liberal Arts & Sciences'];

function CompareColleges() {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [colleges, setColleges] = useState(collegesData);
  
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'compare'
  
  // List View State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  // Compare View State
  const [collegeAId, setCollegeAId] = useState('iit-bombay');
  const [collegeBId, setCollegeBId] = useState('bits-pilani');

  useEffect(() => {
    async function fetchColleges() {
      try {
        const { data, error } = await supabase.from('colleges').select('*');
        if (error) throw error;
        if (data && data.length > 0) {
          const mapped = data.map(c => ({
            id: c.id,
            name: c.name,
            type: c.type,
            state: c.state,
            icon: c.icon,
            fees: c.fees,
            avgPackage: c.avg_package || c.avgPackage,
            exams: c.exams,
            streams: c.streams,
            placements: c.placements,
            campusLife: c.campus_life || c.campusLife,
            research: c.research,
            culture: c.culture,
            feesROI: c.fees_roi || c.feesROI,
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

  // List filtering
  const filteredColleges = useMemo(() => {
    return colleges.filter((c) => {
      const typeMatch = selectedType === 'All' || c.type === selectedType;
      const searchMatch = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.state.toLowerCase().includes(searchQuery.toLowerCase());
      return typeMatch && searchMatch;
    });
  }, [colleges, selectedType, searchQuery]);

  const clearSearch = () => setSearchQuery('');

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
            Browse curated top colleges, or compare them side-by-side on real, 
            practical parameters that shape your future and campus happiness.
          </p>
          
          <div className="tabs-toggle">
            <button className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>
              <List size={16} /> Directory
            </button>
            <button className={`tab-btn ${activeTab === 'compare' ? 'active' : ''}`} onClick={() => setActiveTab('compare')}>
              <ArrowLeftRight size={16} /> Compare
            </button>
          </div>
        </div>

        {activeTab === 'list' ? (
          <div className="list-view-content animate-fade-in">
            {/* Search */}
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
                  <button className="search-clear-btn" onClick={clearSearch}>
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="filter-chips-container">
              {types.map((t) => (
                <button
                  key={t}
                  className={`filter-chip ${selectedType === t ? 'active' : ''}`}
                  onClick={() => setSelectedType(t)}
                >
                  {t}
                  {t === selectedType && t !== 'All' && (
                    <X size={11} className="chip-remove" onClick={(e) => { e.stopPropagation(); setSelectedType('All'); }} />
                  )}
                </button>
              ))}
            </div>

            {/* Grid */}
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
                    onClick={() => {
                      setCollegeAId(c.id);
                      setActiveTab('compare');
                    }}
                  />
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="compare-view-content animate-slide-up">
            {/* Dropdowns */}
            <div className="comparison-selectors glass-card">
              <div className="selector-col">
                <label htmlFor="collegeA">Select College A</label>
                <div className="select-wrapper">
                  <select 
                    id="collegeA"
                    value={collegeAId}
                    onChange={(e) => setCollegeAId(e.target.value)}
                  >
                    {colleges.map(c => (
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
                    {colleges.map(c => (
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
      </div>
    </div>
  );
}

export default CompareColleges;
