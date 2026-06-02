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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('College', collegeSchema);
