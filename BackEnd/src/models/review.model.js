const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: "1", // temporary placeholder until you add real users
  },
  code: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  }
}, { timestamps: true }); // adds createdAt, updatedAt

module.exports = mongoose.model('Review', reviewSchema);