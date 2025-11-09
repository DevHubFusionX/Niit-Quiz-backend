const express = require('express');
const Question = require('../models/Question');
const router = express.Router();

// Get questions by subject
router.get('/subject/:subject', async (req, res) => {
  try {
    const { subject } = req.params;
    const { difficulty, limit } = req.query;
    
    let query = { subject };
    if (difficulty && difficulty !== 'all') {
      query.difficulty = difficulty;
    }
    
    let questions = await Question.find(query).select('-analytics');
    
    // Shuffle questions
    questions = questions.sort(() => Math.random() - 0.5);
    
    if (limit) {
      questions = questions.slice(0, parseInt(limit));
    }
    
    res.json({
      success: true,
      questions,
      total: questions.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch questions',
      error: error.message
    });
  }
});

// Get all subjects with question counts
router.get('/subjects', async (req, res) => {
  try {
    const subjects = await Question.aggregate([
      {
        $group: {
          _id: '$subject',
          subjectName: { $first: '$subjectName' },
          totalQuestions: { $sum: 1 },
          easyCount: {
            $sum: { $cond: [{ $eq: ['$difficulty', 'easy'] }, 1, 0] }
          },
          mediumCount: {
            $sum: { $cond: [{ $eq: ['$difficulty', 'medium'] }, 1, 0] }
          },
          hardCount: {
            $sum: { $cond: [{ $eq: ['$difficulty', 'hard'] }, 1, 0] }
          }
        }
      }
    ]);
    
    res.json({
      success: true,
      subjects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subjects',
      error: error.message
    });
  }
});

// Update question analytics
router.post('/analytics/:questionId', async (req, res) => {
  try {
    const { questionId } = req.params;
    const { isCorrect, timeSpent } = req.body;
    
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    // Update analytics
    question.analytics.totalAttempts += 1;
    if (isCorrect) {
      question.analytics.correctAttempts += 1;
    }
    
    // Update average time spent
    const currentAvg = question.analytics.avgTimeSpent;
    const totalAttempts = question.analytics.totalAttempts;
    question.analytics.avgTimeSpent = 
      ((currentAvg * (totalAttempts - 1)) + timeSpent) / totalAttempts;
    
    await question.save();
    
    res.json({
      success: true,
      message: 'Analytics updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update analytics',
      error: error.message
    });
  }
});

module.exports = router;