const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user profile
router.get('/profile', auth, (req, res) => {
  try {
    const user = req.user;
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      quizStats: Object.fromEntries(user.quizStats),
      createdAt: user.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user statistics
router.get('/stats', auth, (req, res) => {
  try {
    const user = req.user;
    const stats = Object.fromEntries(user.quizStats);
    
    // Calculate overall stats
    const subjects = Object.keys(stats);
    const totalAttempts = subjects.reduce((sum, subject) => sum + stats[subject].attempts, 0);
    const averageScore = subjects.length > 0 
      ? subjects.reduce((sum, subject) => sum + stats[subject].bestScore, 0) / subjects.length 
      : 0;

    res.json({
      subjectStats: stats,
      overallStats: {
        totalAttempts,
        averageScore: Math.round(averageScore),
        subjectsCompleted: subjects.length
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;