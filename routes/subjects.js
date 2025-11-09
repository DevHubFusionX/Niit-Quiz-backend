const express = require('express');
const Subject = require('../models/Subject');
const Question = require('../models/Question');
const router = express.Router();

// Get all subjects with question counts
router.get('/', async (req, res) => {
  try {
    console.log('Fetching subjects...');
    const subjects = await Subject.find({ isActive: true });
    console.log('Found subjects:', subjects.length);
    
    // Get question counts for each subject and filter out subjects with no questions
    const subjectsWithCounts = await Promise.all(
      subjects.map(async (subject) => {
        const questionCount = await Question.countDocuments({ subject: subject.code });
        return {
          ...subject.toObject(),
          questionCount
        };
      })
    );

    // Only return subjects that have questions available
    const subjectsWithQuestions = subjectsWithCounts.filter(subject => subject.questionCount > 0);

    res.json(subjectsWithQuestions);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single subject
router.get('/:code', async (req, res) => {
  try {
    const subject = await Subject.findOne({ code: req.params.code, isActive: true });
    
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const questionCount = await Question.countDocuments({ subject: subject.code });
    
    // Return 404 if subject has no questions available
    if (questionCount === 0) {
      return res.status(404).json({ message: 'Subject has no available questions' });
    }
    
    res.json({
      ...subject.toObject(),
      questionCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;