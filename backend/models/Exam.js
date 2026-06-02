const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  streams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stream',
  }],
  eligibility: {
    type: String,
    default: '',
  },
  examDates: {
    type: [
      {
        name: String,
        date: Date,
      }
    ],
    default: [],
  },
  pattern: {
    type: String,
    default: '',
  },
  officialWebsite: {
    type: String,
    default: '',
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Exam', examSchema);
