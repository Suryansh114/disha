const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    default: '',
    trim: true,
  },
  state: {
    type: String,
    default: '',
    trim: true,
  },
  country: {
    type: String,
    default: 'India',
    trim: true,
  },
  type: {
    type: String,
    default: '',
    trim: true,
  },
  website: {
    type: String,
    default: '',
    trim: true,
  },
  establishedYear: {
    type: Number,
  },
  // --- Rich fields used by the Compare Colleges page ---
  avgPlacementLPA: {
    type: String,
    default: '',        // e.g. "₹23.5 LPA"
  },
  placements: {
    type: String,
    default: '',        // Narrative about placement stats and top recruiters
  },
  campusLife: {
    type: String,
    default: '',        // Hostels, fests, infrastructure
  },
  research: {
    type: String,
    default: '',        // Labs, funding, publications
  },
  culture: {
    type: String,
    default: '',        // Peer environment, workload vibe
  },
  feesROI: {
    type: String,
    default: '',        // Hostels & tuition fees vs average salary
  },
  admissionDifficulty: {
    type: String,
    default: '',        // Cutoffs and difficulty details
  },
  infrastructure: {
    type: String,
    default: '',        // Labs, sports, libraries
  },
  // --- Used by the Explore Streams stream cards ---
  streams: [{
    type: String,       // e.g. ["Engineering", "Science"]
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('College', collegeSchema);
