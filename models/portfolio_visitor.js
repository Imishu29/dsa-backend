// models/visitor.model.js
const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address']
    },
    subject: {
      type: String,
      trim: true,
      maxlength: 150
    },
    message: {
      type: String,
      trim: true,
      maxlength: 5000
    }
  },
  { timestamps: true } // adds createdAt, updatedAt
);

module.exports = mongoose.model('Visitor', VisitorSchema);
