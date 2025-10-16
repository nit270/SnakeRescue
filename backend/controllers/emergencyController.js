const Emergency = require('../models/Emergency');
const jwt = require('jsonwebtoken');

exports.emergency = async (req, res) => {
  try {
    const { location,contact, urgency, snakeType, situation } = req.body;

    // Check if user exists
    let emergency = await Emergency.findOne({ contact });
    if (emergency) return res.status(400).json({ msg: 'User already exists' });


    // Create user
    emergency = new Emergency({
      location,
      contact,
      urgency,
      snakeType,
      situation
    });

    await emergency.save();

    const token = jwt.sign({ id: emergency._id }, process.env.JWT_SECRET, { expiresIn: '2d' });

    res.status(201).json({ token, emergency: { id: emergency._id, location: emergency.location,contact: emergency.contact, urgency:emergency.urgency, snakeType: emergency.snakeType, situation: emergency.situation } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};


