const mongoose = require('mongoose');

const RescueRequestSchema = new mongoose.Schema({
  location: { type: String, required: true },
  contact: { type: String, required: true },
  urgency: { type: String, required: true },
  snakeType: { type: String },
  situation: { type: String, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'In Progress', 'Completed'] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('RescueRequest', RescueRequestSchema);
