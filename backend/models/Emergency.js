const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
  location: { type: String, required: true },
  contact: { type: String, required: true },
  urgency: { type: String, enum: ['High - Snake in living area', 'Medium - Snake in compound', 'Low - Spotted outside boundary'], default: 'Low - Spotted outside boundary' },
  snakeType: { type: String, required: true },
  situation: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Emergency', emergencySchema);
