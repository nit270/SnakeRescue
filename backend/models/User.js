const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone:    { type: String, required: true },
  accountType: { type: String, enum: ['Customer', 'Business', 'Admin'], default: 'Customer' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
