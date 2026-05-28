import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import StreamSelection from './pages/StreamSelection';
import ExploreStreams from './pages/ExploreStreams';
import ExamDates from './pages/ExamDates';
import CompareColleges from './pages/CompareColleges';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header user={user} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stream-choice/:level" element={<StreamSelection />} />
            <Route path="/explore-streams" element={<ExploreStreams />} />
            <Route path="/exam-dates" element={<ExamDates />} />
            <Route path="/compare-colleges" element={<CompareColleges />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
