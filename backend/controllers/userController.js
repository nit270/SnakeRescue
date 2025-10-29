const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get all users (filter by search term)
exports.getUsers = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { fullName: { $regex: search, $options: "i" } },
          { email:    { $regex: search, $options: "i" } },
          { accountType: { $regex: search, $options: "i" } },
        ]
      };
    }
    const users = await User.find(query).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Add new user
exports.addUser = async (req, res) => {
  try {
    const { fullName, email, password, phone, accountType } = req.body;
    if (!fullName || !email || !password) return res.status(400).json({ msg: "Required fields missing" });

    // Check duplicate
    let existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ fullName, email, password: hashed, phone, accountType });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, password, phone, accountType } = req.body;
    let updateObj = { fullName, email, phone, accountType };
    if (password) updateObj.password = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(id, updateObj, { new: true });
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
