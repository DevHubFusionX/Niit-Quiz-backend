const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Question Schema
const questionSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  subjectName: { type: String, required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correct: { type: Number, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  tags: [String],
  analytics: {
    totalAttempts: { type: Number, default: 0 },
    correctAttempts: { type: Number, default: 0 },
    avgTimeSpent: { type: Number, default: 0 }
  }
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

async function migrateQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    // Read JSON file
    const jsonPath = path.join(__dirname, '../../vite-project/src/data/web_quiz_questions.json');
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    const dbQuestions = jsonData.map((q, index) => {
      // Find correct answer index
      const correctIndex = q.options.findIndex(option => option === q.answer);
      
      return {
        subject: 'WebDev',
        subjectName: 'Introduction to Web Development',
        question: q.question,
        options: q.options,
        correct: correctIndex,
        difficulty: q.difficulty.toLowerCase(), // Convert to lowercase
        tags: [q.topic],
        analytics: {
          totalAttempts: 0,
          correctAttempts: 0,
          avgTimeSpent: 0
        }
      };
    });

    await Question.insertMany(dbQuestions);
    console.log(`✓ Migrated ${dbQuestions.length} questions for Web Development`);

    console.log(`\n🎉 Migration completed! Total questions in database: ${dbQuestions.length}`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

migrateQuestions();