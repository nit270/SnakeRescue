const express = require('express');
const router = express.Router();
const {
  getUsers,
  addUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

router.get('/', getUsers);
router.post('/add', addUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;
