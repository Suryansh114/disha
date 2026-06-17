import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { ClassLevelProvider } from './context/ClassLevelContext';
import Header from './components/Header';
import DeadlinesBanner from './components/DeadlinesBanner';
import Home from './pages/Home';
import After10th from './pages/After10th';
import After12th from './pages/After12th';
import Pathfinder from './pages/Pathfinder';
import PathfinderResults from './pages/PathfinderResults';
import ExploreStreams from './pages/ExploreStreams';
import StreamDetail from './pages/StreamDetail';
import ExamDates from './pages/ExamDates';
import CompareColleges from './pages/CompareColleges';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function App() {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) setUser({ email: session.user.email, name: session.user.email.split('@')[0] })
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  if (!userLoaded) {
    return null;
  }

  return (
    <ClassLevelProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Header user={user} setUser={setUser} />
          <DeadlinesBanner />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/after-10th" element={<After10th />} />
              <Route path="/after-12th" element={<After12th />} />
              <Route path="/pathfinder" element={<Pathfinder />} />
              <Route path="/pathfinder/results" element={<PathfinderResults />} />
              <Route path="/explore-streams" element={<ExploreStreams />} />
              <Route path="/stream/:streamId" element={<StreamDetail />} />
              <Route path="/exam-dates" element={<ExamDates />} />
              <Route path="/compare-colleges" element={<CompareColleges />} />

              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/signup" element={<Signup setUser={setUser} />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ClassLevelProvider>
  );
}

export default App;