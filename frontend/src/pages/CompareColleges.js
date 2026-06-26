import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeftRight, Sparkles, Heart, Award, Users, Coins, Flame,
  Building, Search, X, List, Table2
} from 'lucide-react';

import { api } from '../services/api';
import CollegeCard from '../components/cards/CollegeCard';
import useBookmarks from '../hooks/useBookmarks';
import '../components/cards/Cards.css';
import './CompareColleges.css';

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
  const [colleges, setColleges] = useState([]);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'table' | 'compare'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [collegeAId, setCollegeAId] = useState('iit-bombay');
  const [collegeBId, setCollegeBId] = useState('bits-pilani');
  const [sortConfig, setSortConfig] = useState({ key: 'nirfRank', dir: 'asc' });

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch colleges from API
        const collegesData = await api.getColleges();
        setColleges(collegesData || []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        // Fallback will show empty states gracefully
      }
    }
    fetchData();
  }, []);

  const emptyCollege = {
    name: 'No college loaded',
    placements: 'No data available',
    campusLife: 'No data available',
    research: 'No data available',
    culture: 'No data available',
    feesROI: 'No data available',
    admissionDifficulty: 'No data available',
    infrastructure: 'No data available'
  };

  const collegeA = colleges.find(c => c.id === collegeAId) || colleges[0] || emptyCollege;
  const collegeB = colleges.find(c => c.id === collegeBId) || colleges[1] || emptyCollege;

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
            Browse curated top colleges, compare them side-by-side, and find the
            best match for your future studies.
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
            {colleges.length === 0 ? (
              <div className="empty-state">
                <span>📚</span>
                <p>No colleges are loaded yet. Check your Supabase connection or make sure the backend API is running.</p>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        )}


      </div>
    </div>
  );
}

export default CompareColleges;
