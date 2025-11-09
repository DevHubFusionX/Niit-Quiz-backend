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

// WebDev Questions (61 questions)
const webdevQuestions = [
  { question: "What does HTML stand for?", options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"], correct: 0, difficulty: "easy" },
  { question: "Which tag is used to define the main heading of a webpage?", options: ["<h1>", "<header>", "<title>", "<head>"], correct: 0, difficulty: "easy" },
  { question: "What is the correct HTML element for inserting a line break?", options: ["<br>", "<break>", "<lb>", "<newline>"], correct: 0, difficulty: "easy" },
  { question: "Which tag is used to create a hyperlink in HTML?", options: ["<a>", "<link>", "<href>", "<url>"], correct: 0, difficulty: "easy" },
  { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Syntax", "Colorful Style Sheets"], correct: 0, difficulty: "easy" },
  { question: "Which property changes the text color in CSS?", options: ["color", "text-color", "font-color", "foreground"], correct: 0, difficulty: "easy" },
  { question: "Which HTML tag is used to define a table row?", options: ["<tr>", "<td>", "<th>", "<table>"], correct: 0, difficulty: "easy" },
  { question: "Which HTML attribute specifies an image source?", options: ["src", "href", "alt", "link"], correct: 0, difficulty: "easy" },
  { question: "Which CSS property controls the text size?", options: ["font-size", "text-size", "size", "font-style"], correct: 0, difficulty: "easy" },
  { question: "What does the <title> tag define?", options: ["The title of the webpage shown in the browser tab", "The main heading", "A tooltip", "The footer"], correct: 0, difficulty: "easy" }
];

// PLT Questions (35 questions)
const pltQuestions = [
  { question: "What is an algorithm?", options: ["A step-by-step procedure to solve a problem", "A programming language", "A type of computer", "A software application"], correct: 0, difficulty: "easy" },
  { question: "Which data structure follows LIFO principle?", options: ["Queue", "Stack", "Array", "Linked List"], correct: 1, difficulty: "medium" },
  { question: "What does 'iteration' mean in programming?", options: ["Repeating a process", "Creating variables", "Writing functions", "Debugging code"], correct: 0, difficulty: "easy" },
  { question: "What is a variable in programming?", options: ["A storage location with a name", "A function", "A loop", "An operator"], correct: 0, difficulty: "easy" },
  { question: "Which of these is a conditional statement?", options: ["for", "if", "while", "function"], correct: 1, difficulty: "easy" }
];

// MySQL Questions (30 questions)
const mysqlQuestions = [
  { question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"], correct: 0, difficulty: "easy" },
  { question: "Which command is used to retrieve data from a database?", options: ["GET", "SELECT", "RETRIEVE", "FETCH"], correct: 1, difficulty: "easy" },
  { question: "Which clause is used to filter records in SQL?", options: ["FILTER", "WHERE", "HAVING", "CONDITION"], correct: 1, difficulty: "medium" },
  { question: "What does PRIMARY KEY ensure?", options: ["Unique identification of records", "Sorting of data", "Data encryption", "Backup creation"], correct: 0, difficulty: "medium" },
  { question: "Which command is used to add new records?", options: ["ADD", "INSERT", "CREATE", "NEW"], correct: 1, difficulty: "easy" }
];

// PHP Questions (25 questions)
const phpQuestions = [
  { question: "What does PHP stand for?", options: ["Personal Home Page", "PHP: Hypertext Preprocessor", "Private Home Page", "Professional Hypertext Processor"], correct: 1, difficulty: "easy" },
  { question: "Which symbol is used to start a PHP variable?", options: ["@", "#", "$", "%"], correct: 2, difficulty: "easy" },
  { question: "How do you write 'Hello World' in PHP?", options: ["echo 'Hello World';", "print('Hello World');", "console.log('Hello World');", "printf('Hello World');"], correct: 0, difficulty: "easy" },
  { question: "Which function is used to include a file in PHP?", options: ["include()", "import()", "require()", "load()"], correct: 0, difficulty: "medium" },
  { question: "What is the correct way to end a PHP statement?", options: [".", ";", ":", ","], correct: 1, difficulty: "easy" }
];

// Dreamweaver Questions (30 questions)
const dreamweaverQuestions = [
  { question: "What is Adobe Dreamweaver primarily used for?", options: ["Image editing", "Web development", "Video editing", "3D modeling"], correct: 1, difficulty: "easy" },
  { question: "Which view in Dreamweaver shows the visual layout?", options: ["Code view", "Design view", "Split view", "Live view"], correct: 1, difficulty: "easy" },
  { question: "What file extension does Dreamweaver use for templates?", options: [".dwt", ".dw", ".template", ".tmp"], correct: 0, difficulty: "medium" },
  { question: "Which panel shows the structure of your HTML?", options: ["Properties panel", "Tag Inspector", "Code Navigator", "DOM panel"], correct: 1, difficulty: "medium" },
  { question: "What does Live View display?", options: ["Code only", "Design only", "Real browser rendering", "File structure"], correct: 2, difficulty: "easy" }
];

// IWCD Questions (30 questions)
const iwcdQuestions = [
  { question: "What is the World Wide Web?", options: ["A type of spider web", "A global information system", "A computer network", "A programming language"], correct: 1, difficulty: "easy" },
  { question: "What does HTTP stand for?", options: ["HyperText Transfer Protocol", "High Tech Transfer Process", "Home Text Transfer Protocol", "Hyperlink Text Transfer Protocol"], correct: 0, difficulty: "easy" },
  { question: "Which protocol is secure for web communication?", options: ["HTTP", "HTTPS", "FTP", "SMTP"], correct: 1, difficulty: "medium" },
  { question: "What does URL stand for?", options: ["Uniform Resource Locator", "Universal Resource Link", "Unique Resource Location", "United Resource Locator"], correct: 0, difficulty: "easy" },
  { question: "Which port does HTTP typically use?", options: ["21", "25", "80", "443"], correct: 2, difficulty: "medium" }
];

const subjects = {
  WebDev: { name: 'Introduction to Web Development', questions: webdevQuestions },
  PLT: { name: 'Programming Logic & Techniques', questions: pltQuestions },
  MySQL: { name: 'MySQL Database', questions: mysqlQuestions },
  PHP: { name: 'PHP Programming', questions: phpQuestions },
  Dreamweaver: { name: 'Dreamweaver', questions: dreamweaverQuestions },
  IWCD: { name: 'Internet & Web Client Development', questions: iwcdQuestions }
};

async function migrateQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    let totalMigrated = 0;

    for (const [subjectKey, subjectData] of Object.entries(subjects)) {
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