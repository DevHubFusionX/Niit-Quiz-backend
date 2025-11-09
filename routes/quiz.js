const express = require('express');
const auth = require('../middleware/auth');
const Question = require('../models/Question');
const router = express.Router();

// Get quiz questions
router.get('/:subject', auth, async (req, res) => {
  try {
    const { subject } = req.params;
    const { difficulty, count = 10 } = req.query;

    // Build query
    const query = { subject };
    if (difficulty) {
      query.difficulty = difficulty;
    }

    // Get questions from database
    const questions = await Question.find(query).select('-correct');
    
    console.log(`Found ${questions.length} questions for subject ${subject}`);
    
    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this subject' });
    }

    // Shuffle and limit questions
    const shuffled = questions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, parseInt(count));

    res.json({
      subject,
      questions: selectedQuestions,
      total: selectedQuestions.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Submit quiz answers
router.post('/:subject/submit', auth, async (req, res) => {
  try {
    const { subject } = req.params;
    const { answers, timeSpent } = req.body;
    
    console.log('Quiz submission for subject:', subject);
    console.log('Received answers:', answers);

    // Calculate score
    let correct = 0;
    const results = [];

    for (const answer of answers) {
      try {
        const question = await Question.findById(answer.questionId);
        if (question) {
          const isCorrect = question.correct === answer.selectedOption;
          if (isCorrect) correct++;
          
          results.push({
            questionId: answer.questionId,
            correct: isCorrect,
            correctAnswer: question.correct,
            selectedAnswer: answer.selectedOption,
            question: question.question,
            options: question.options
          });
          console.log(`Question ${answer.questionId}: ${isCorrect ? 'CORRECT' : 'INCORRECT'}`);
        } else {
          console.warn('Question not found:', answer.questionId);
          results.push({
            questionId: answer.questionId,
            correct: false,
            correctAnswer: null,
            selectedAnswer: answer.selectedOption,
            question: 'Question not found',
            options: []
          });
        }
      } catch (error) {
        console.error('Error processing question:', answer.questionId, error);
        results.push({
          questionId: answer.questionId,
          correct: false,
          correctAnswer: null,
          selectedAnswer: answer.selectedOption,
          question: 'Error processing question',
          options: []
        });
      }
    }
    
    console.log(`Quiz results: ${correct}/${answers.length} correct (${Math.round((correct / answers.length) * 100)}%)`);

    const percentage = Math.round((correct / answers.length) * 100);

    // Update user stats
    const user = req.user;
    const subjectStats = user.quizStats.get(subject) || { attempts: 0, bestScore: 0 };
    
    user.quizStats.set(subject, {
      attempts: subjectStats.attempts + 1,
      bestScore: Math.max(subjectStats.bestScore, percentage),
      lastScore: percentage,
      lastAttempt: new Date()
    });

    await user.save();

    res.json({
      score: correct,
      total: answers.length,
      percentage,
      timeSpent,
      results
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;