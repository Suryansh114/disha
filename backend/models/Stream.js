const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // Slug used in URLs — e.g. "science-pcm"
  slug: {
    type: String,
    unique: true,
    trim: true,
  },
  tagline: {
    type: String,
    default: '',      // e.g. "The Engineering & Tech pathway"
  },
  icon: {
    type: String,
    default: '📚',    // Emoji displayed on the stream card
  },
  description: {
    type: String,
    default: '',
  },
  // --- Fields used by the Explore Streams grid cards ---
  popularity: {
    type: String,
    default: '',      // e.g. "32%" — % of students who pick it
  },
  careersCount: {
    type: Number,
    default: 0,       // Number of career fields open
  },
  subjects: {
    type: [String],
    default: [],      // Core subjects, e.g. ["Physics","Chemistry","Maths"]
  },
  popularCourses: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Stream', streamSchema);
