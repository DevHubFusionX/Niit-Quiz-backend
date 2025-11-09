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

// Function to safely evaluate JS files
function loadQuestions(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Extract the questions array using regex
    const match = content.match(/export const \w+Questions = (\[[\s\S]*?\]);/);
    if (match) {
      // Clean up the JS to make it valid JSON
      let questionsStr = match[1]
        .replace(/(\w+):/g, '"$1":')  // Add quotes to keys
        .replace(/'/g, '"')          // Replace single quotes
        .replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas
      
      return JSON.parse(questionsStr);
    }
    return [];
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error.message);
    return [];
  }
}

async function migrateQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    const frontendPath = path.join(__dirname, '../../vite-project/src/data/questions');
    
    const subjects = {
      webdev: { name: 'Introduction to Web Development', key: 'WebDev' },
      plt: { name: 'Programming Logic & Techniques', key: 'PLT' },
      mysql: { name: 'MySQL Database', key: 'MySQL' },
      php: { name: 'PHP Programming', key: 'PHP' },
      dreamweaver: { name: 'Dreamweaver', key: 'Dreamweaver' },
      iwcd: { name: 'Internet & Web Client Development', key: 'IWCD' }
    };

    let totalMigrated = 0;

    for (const [fileKey, subjectInfo] of Object.entries(subjects)) {
      const filePath = path.join(frontendPath, `${fileKey}.js`);
      
      if (fs.existsSync(filePath)) {
        console.log(`Processing ${subjectInfo.name}...`);
        
        const questions = loadQuestions(filePath);
        
        if (questions.length > 0) {
          const dbQuestions = questions.map(q => ({
            subject: subjectInfo.key,
            subjectName: subjectInfo.name,
            question: q.question,
            options: q.options || ["Option 1", "Option 2", "Option 3", "Option 4"],
            correct: typeof q.correct === 'number' ? q.correct : 0,
            difficulty: q.difficulty || 'medium',
            tags: [],
            analytics: {
              totalAttempts: 0,
              correctAttempts: 0,
              avgTimeSpent: 0
            }
          }));

          await Question.insertMany(dbQuestions);
          console.log(`✓ Migrated ${dbQuestions.length} questions for ${subjectInfo.name}`);
          totalMigrated += dbQuestions.length;
        } else {
          console.log(`⚠ No questions found in ${fileKey}.js`);
        }
      } else {
        console.log(`⚠ File not found: ${fileKey}.js`);
      }
    }

    console.log(`\n🎉 Migration completed! Total questions in database: ${totalMigrated}`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

migrateQuestions();