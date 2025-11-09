const mongoose = require('mongoose');
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

// Sample questions for each subject
const sampleQuestions = {
  WebDev: {
    name: 'Introduction to Web Development',
    questions: [
      {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
        correct: 0,
        difficulty: "easy"
      },
      {
        question: "Which CSS property is used to change the text color?",
        options: ["font-color", "text-color", "color", "foreground-color"],
        correct: 2,
        difficulty: "easy"
      },
      {
        question: "What is the correct way to create a function in JavaScript?",
        options: ["function = myFunction() {}", "function myFunction() {}", "create myFunction() {}", "def myFunction() {}"],
        correct: 1,
        difficulty: "medium"
      }
    ]
  },
  PLT: {
    name: 'Programming Logic & Techniques',
    questions: [
      {
        question: "What is an algorithm?",
        options: ["A programming language", "A step-by-step procedure to solve a problem", "A type of computer", "A software application"],
        correct: 1,
        difficulty: "easy"
      },
      {
        question: "Which data structure follows LIFO principle?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correct: 1,
        difficulty: "medium"
      }
    ]
  },
  MySQL: {
    name: 'MySQL Database',
    questions: [
      {
        question: "What does SQL stand for?",
        options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"],
        correct: 0,
        difficulty: "easy"
      },
      {
        question: "Which command is used to retrieve data from a database?",
        options: ["GET", "SELECT", "RETRIEVE", "FETCH"],
        correct: 1,
        difficulty: "easy"
      }
    ]
  },
  PHP: {
    name: 'PHP Programming',
    questions: [
      {
        question: "What does PHP stand for?",
        options: ["Personal Home Page", "PHP: Hypertext Preprocessor", "Private Home Page", "Professional Hypertext Processor"],
        correct: 1,
        difficulty: "easy"
      }
    ]
  },
  Dreamweaver: {
    name: 'Dreamweaver',
    questions: [
      {
        question: "What is Adobe Dreamweaver primarily used for?",
        options: ["Image editing", "Web development", "Video editing", "3D modeling"],
        correct: 1,
        difficulty: "easy"
      }
    ]
  },
  IWCD: {
    name: 'Internet & Web Client Development',
    questions: [
      {
        question: "What is the World Wide Web?",
        options: ["A type of spider web", "A global information system", "A computer network", "A programming language"],
        correct: 1,
        difficulty: "easy"
      }
    ]
  }
};

async function migrateQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    let totalMigrated = 0;

    for (const [subjectKey, subjectData] of Object.entries(sampleQuestions)) {
      console.log(`Processing ${subjectData.name}...`);
      
      const dbQuestions = subjectData.questions.map(q => ({
        subject: subjectKey,
        subjectName: subjectData.name,
        question: q.question,
        options: q.options,
        correct: q.correct,
        difficulty: q.difficulty,
        tags: [],
        analytics: {
          totalAttempts: 0,
          correctAttempts: 0,
          avgTimeSpent: 0
        }
      }));

      await Question.insertMany(dbQuestions);
      console.log(`✓ Migrated ${dbQuestions.length} questions for ${subjectData.name}`);
      totalMigrated += dbQuestions.length;
    }

    console.log(`\n🎉 Migration completed! Total questions in database: ${totalMigrated}`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

migrateQuestions();