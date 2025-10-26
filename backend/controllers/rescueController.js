const RescueRequest = require('../models/RescueRequest');

// Create new rescue request
exports.createRescueRequest = async (req, res) => {
  try {
    const { location, contact, urgency, snakeType, situation } = req.body;

     let rescueRequest = await RescueRequest.findOne({ contact });
        if (rescueRequest) return res.status(400).json({ msg: 'User already exists' });

     rescueRequest = new RescueRequest({
      location,
      contact,
      urgency,
      snakeType,
      situation,
      userId: req.user ? req.user.id : null, // if user is logged in
    });

    await rescueRequest.save();

    res.status(201).json({ 
      msg: 'Rescue request submitted successfully',
      request: rescueRequest 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all rescue requests
exports.getAllRescueRequests = async (req, res) => {
  try {
    const requests = await RescueRequest.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'fullName email');
    
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get user's own rescue requests
exports.getUserRescueRequests = async (req, res) => {
  try {
    const requests = await RescueRequest.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update rescue request status
exports.updateRescueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await RescueRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ msg: 'Rescue request not found' });
    }

    res.json({ msg: 'Status updated successfully', request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete rescue request
exports.deleteRescueRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await RescueRequest.findByIdAndDelete(id);

    if (!request) {
      return res.status(404).json({ msg: 'Rescue request not found' });
    }

    res.json({ msg: 'Rescue request deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get statistics
exports.getStatistics = async (req, res) => {
  try {
    const total = await RescueRequest.countDocuments();
    const pending = await RescueRequest.countDocuments({ status: 'Pending' });
    const inProgress = await RescueRequest.countDocuments({ status: 'In Progress' });
    const completed = await RescueRequest.countDocuments({ status: 'Completed' });

    res.json({ total, pending, inProgress, completed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

