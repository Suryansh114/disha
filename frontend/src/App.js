import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import StreamSelection from './pages/StreamSelection';
import ExploreStreams from './pages/ExploreStreams';
import StreamDetail from './pages/StreamDetail';
import ExamDates from './pages/ExamDates';
import CompareColleges from './pages/CompareColleges';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        localStorage.removeItem('user');
        setUser(null);
      }
    }
    setUserLoaded(true);
  }, []);

  if (!userLoaded) {
    return null;
  }

  return (
    <Router>
      <div className="App">
        <Header user={user} setUser={setUser} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route element={<ProtectedRoute user={user} userLoaded={userLoaded} />}>
              <Route path="/stream-choice/:level" element={<StreamSelection />} />
              <Route path="/explore-streams" element={<ExploreStreams />} />
              <Route path="/stream/:streamId" element={<StreamDetail />} />
              <Route path="/exam-dates" element={<ExamDates />} />
              <Route path="/compare-colleges" element={<CompareColleges />} />
            </Route>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
