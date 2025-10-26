const express = require('express');
const router = express.Router();
const { 
  createRescueRequest, 
  getAllRescueRequests, 
  getUserRescueRequests,
  updateRescueStatus,
  deleteRescueRequest,
  getStatistics
} = require('../controllers/rescueController');

// Public routes
router.post('/create', createRescueRequest);
router.get('/all', getAllRescueRequests);
router.get('/user', getUserRescueRequests);

// Admin routes
router.put('/update/:id', updateRescueStatus);
router.delete('/delete/:id', deleteRescueRequest);
router.get('/statistics', getStatistics);

module.exports = router;

