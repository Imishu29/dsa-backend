const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  chapter: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  youtubeLink: {
    type: String
  },
  leetcodeLink: {
    type: String
  },
  articleLink: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Problem', problemSchema);