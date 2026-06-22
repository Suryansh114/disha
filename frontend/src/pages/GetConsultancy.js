import React from 'react';
import { Link } from 'react-router-dom';
import './GetConsultancy.css'; // optional style file

function GetConsultancy() {
  return (
    <div className="page-container">
      <h1 className="page-title">Online Consultancy</h1>
      <div className="badge-coming-soon">COMING SOON</div>
      <p className="description">
        1‑on‑1 face‑to‑face career counselling with expert counsellors at the lowest price ever.
      </p>
      <button className="btn btn-secondary" disabled>Notify Me</button>
      <p className="back-link">
        <Link to="/">← Back to Home</Link>
      </p>
    </div>
  );
}

export default GetConsultancy;
