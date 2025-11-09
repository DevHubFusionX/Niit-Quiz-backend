const mongoose = require('mongoose');
require('dotenv').config();

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

const webdevQuestions = [
  {
    "question": "What does HTML stand for?",
    "options": [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Multi Language",
      "Hyperlinks and Text Markup Language"
    ],
    "answer": "Hyper Text Markup Language",
    "topic": "HTML",
    "difficulty": "Easy"
  },
  {
    "question": "Which tag is used to define a hyperlink in HTML?",
    "options": [
      "<a>",
      "<link>",
      "<href>",
      "<hyper>"
    ],
    "answer": "<a>",
    "topic": "HTML",
    "difficulty": "Easy"
  },
  {
    "question": "What tag is used to insert an image in HTML?",
    "options": [
      "<img>",
      "<src>",
      "<image>",
      "<picture>"
    ],
    "answer": "<img>",
    "topic": "HTML",
    "difficulty": "Easy"
  },
  {
    "question": "Which HTML element is used to create a numbered list?",
    "options": [
      "<ol>",
      "<ul>",
      "<li>",
      "<list>"
    ],
    "answer": "<ol>",
    "topic": "HTML",
    "difficulty": "Easy"
  },
  {
    "question": "What attribute is used to provide alternative text for an image?",
    "options": [
      "alt",
      "title",
      "src",
      "href"
    ],
    "answer": "alt",
    "topic": "HTML",
    "difficulty": "Easy"
  },
  {
    "question": "What does the <title> element define?",
    "options": [
      "The page title shown in the browser tab",
      "The heading on the page",
      "A tooltip",
      "The footer content"
    ],
    "answer": "The page title shown in the browser tab",
    "topic": "HTML",
    "difficulty": "Medium"
  },
  {
    "question": "Which tag is used for inserting a line break?",
    "options": [
      "<break>",
      "<br>",
      "<lb>",
      "<hr>"
    ],
    "answer": "<br>",
    "topic": "HTML",
    "difficulty": "Easy"
  },
  {
    "question": "Which HTML tag is used to define a table row?",
    "options": [
      "<td>",
      "<th>",
      "<tr>",
      "<table>"
    ],
    "answer": "<tr>",
    "topic": "HTML",
    "difficulty": "Easy"
  },
  {
    "question": "Which HTML tag is used to define a form?",
    "options": [
      "<form>",
      "<input>",
      "<fieldset>",
      "<submit>"
    ],
    "answer": "<form>",
    "topic": "HTML",
    "difficulty": "Easy"
  },
  {
    "question": "What does the <meta> tag provide?",
    "options": [
      "Metadata about the page",
      "Defines page layout",
      "Links JavaScript files",
      "Inserts images"
    ],
    "answer": "Metadata about the page",
    "topic": "HTML",
    "difficulty": "Medium"
  },
  {
    "question": "Which attribute specifies the URL in an anchor tag?",
    "options": [
      "href",
      "src",
      "url",
      "link"
    ],
    "answer": "href",
    "topic": "HTML",
    "difficulty": "Easy"
  },
  {
    "question": "What is the correct HTML element for the largest heading?",
    "options": [
      "<heading>",
      "<h6>",
      "<h1>",
      "<head>"
    ],
    "answer": "<h1>",
    "topic": "HTML",
    "difficulty": "Easy"
  },
  {
    "question": "Which element is used to play video files?",
    "options": [
      "<media>",
      "<video>",
      "<movie>",
      "<play>"
    ],
    "answer": "<video>",
    "topic": "HTML",
    "difficulty": "Medium"
  },
  {
    "question": "What is the correct HTML element for inserting a line break?",
    "options": [
      "<break>",
      "<br>",
      "<lb>",
      "<newline>"
    ],
    "answer": "<br>",
    "topic": "HTML",
    "difficulty": "Easy"
  },
  {
    "question": "Which input type defines a slider control?",
    "options": [
      "range",
      "slider",
      "scroll",
      "scale"
    ],
    "answer": "range",
    "topic": "HTML",
    "difficulty": "Medium"
  },
  {
    "question": "Which HTML element defines navigation links?",
    "options": [
      "<nav>",
      "<menu>",
      "<navigate>",
      "<links>"
    ],
    "answer": "<nav>",
    "topic": "HTML",
    "difficulty": "Medium"
  },
  {
    "question": "What does the <iframe> tag do?",
    "options": [
      "Embeds another HTML page",
      "Creates a frame layout",
      "Displays an image",
      "Adds a sidebar"
    ],
    "answer": "Embeds another HTML page",
    "topic": "HTML",
    "difficulty": "Hard"
  },
  {
    "question": "What is the correct HTML for making a checkbox?",
    "options": [
      "<input type='check'>",
      "<checkbox>",
      "<input type='checkbox'>",
      "<check>"
    ],
    "answer": "<input type='checkbox'>",
    "topic": "HTML",
    "difficulty": "Medium"
  },
  {
    "question": "Which HTML tag is used to define a footer?",
    "options": [
      "<bottom>",
      "<footer>",
      "<end>",
      "<section>"
    ],
    "answer": "<footer>",
    "topic": "HTML",
    "difficulty": "Medium"
  },
  {
    "question": "What tag is used to embed audio in a web page?",
    "options": [
      "<music>",
      "<sound>",
      "<audio>",
      "<voice>"
    ],
    "answer": "<audio>",
    "topic": "HTML",
    "difficulty": "Medium"
  },
  {
    "question": "What does CSS stand for?",
    "options": [
      "Cascading Style Sheets",
      "Creative Style System",
      "Computer Style Syntax",
      "Colorful Style Sheets"
    ],
    "answer": "Cascading Style Sheets",
    "topic": "CSS",
    "difficulty": "Easy"
  },
  {
    "question": "Which property changes the background color?",
    "options": [
      "color",
      "background-color",
      "bgcolor",
      "background"
    ],
    "answer": "background-color",
    "topic": "CSS",
    "difficulty": "Easy"
  },
  {
    "question": "Which CSS property controls text size?",
    "options": [
      "font-style",
      "text-size",
      "font-size",
      "text-style"
    ],
    "answer": "font-size",
    "topic": "CSS",
    "difficulty": "Easy"
  },
  {
    "question": "How do you select an element with id 'main'?",
    "options": [
      ".main",
      "#main",
      "main",
      "*main"
    ],
    "answer": "#main",
    "topic": "CSS",
    "difficulty": "Easy"
  },
  {
    "question": "Which CSS property is used to change text color?",
    "options": [
      "text-color",
      "font-color",
      "color",
      "foreground"
    ],
    "answer": "color",
    "topic": "CSS",
    "difficulty": "Easy"
  }
];

async function migrateWebDevQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing WebDev questions
    await Question.deleteMany({ subject: 'WebDev' });
    console.log('Cleared existing Web Development questions');

    const dbQuestions = webdevQuestions.map((q, index) => ({
      subject: 'WebDev',
      subjectName: 'Introduction to Web Development',
      question: q.question,
      options: q.options,
      correct: q.options.indexOf(q.answer),
      difficulty: q.difficulty.toLowerCase(),
      tags: [q.topic],
      analytics: {
        totalAttempts: 0,
        correctAttempts: 0,
        avgTimeSpent: 0
      }
    }));

    await Question.insertMany(dbQuestions);
    console.log(`✓ Migrated ${dbQuestions.length} Web Development questions`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

migrateWebDevQuestions();