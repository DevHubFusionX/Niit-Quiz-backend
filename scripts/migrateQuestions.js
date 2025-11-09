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

// Subject mapping
const subjects = {
  webdev: { name: 'Introduction to Web Development', key: 'WebDev' },
  plt: { name: 'Programming Logic & Techniques', key: 'PLT' },
  mysql: { name: 'MySQL Database', key: 'MySQL' },
  php: { name: 'PHP Programming', key: 'PHP' },
  dreamweaver: { name: 'Dreamweaver', key: 'Dreamweaver' },
  iwcd: { name: 'Internet & Web Client Development', key: 'IWCD' }
};

async function migrateQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    const frontendPath = path.join(__dirname, '../../vite-project/src/data/questions');
    
    for (const [subjectKey, subjectInfo] of Object.entries(subjects)) {
      const filePath = path.join(frontendPath, `${subjectKey}.js`);
      
      if (fs.existsSync(filePath)) {
        console.log(`Processing ${subjectInfo.name}...`);
        
        // Read and parse the JS file
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const questionsMatch = fileContent.match(/export const \w+Questions = (\[[\s\S]*?\]);/);
        
        if (questionsMatch) {
          // Clean up the JS array format to make it JSON parseable
          let questionsStr = questionsMatch[1]
            .replace(/(\w+):/g, '"$1":')  // Add quotes to keys
            .replace(/'/g, '"')          // Replace single quotes with double quotes
            .replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas
          
          try {
            const questions = JSON.parse(questionsStr);
            
            const dbQuestions = questions.map((q, index) => ({
              subject: subjectInfo.key,
              subjectName: subjectInfo.name,
              question: q.question,
              options: q.options,
              correct: q.correct,
              difficulty: q.difficulty || 'medium',
              tags: q.tags || [],
              analytics: {
                totalAttempts: 0,
                correctAttempts: 0,
                avgTimeSpent: 0
              }
            }));

            await Question.insertMany(dbQuestions);
            console.log(`✓ Migrated ${dbQuestions.length} questions for ${subjectInfo.name}`);
          } catch (parseError) {
            console.error(`Error parsing ${subjectKey}.js:`, parseError.message);
          }
        }
      }
    }

    const totalQuestions = await Question.countDocuments();
    console.log(`\n🎉 Migration completed! Total questions in database: ${totalQuestions}`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

migrateQuestions();