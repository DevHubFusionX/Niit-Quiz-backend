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

// Import question files directly
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

const pltQuestions =[
  {
    "id": 1,
    "question": "What is the main purpose of programming logic?",
    "options": {
      "A": "To write code faster",
      "B": "To solve problems systematically",
      "C": "To memorize syntax",
      "D": "To design user interfaces"
    },
    "answer": "B"
  },
  {
    "id": 2,
    "question": "Which of the following best defines an algorithm?",
    "options": {
      "A": "A flowchart diagram",
      "B": "A step-by-step procedure to solve a problem",
      "C": "A programming language",
      "D": "A debugging tool"
    },
    "answer": "B"
  },
  {
    "id": 3,
    "question": "What is pseudocode?",
    "options": {
      "A": "Code written in assembly language",
      "B": "A simplified description of a program logic",
      "C": "An executable program",
      "D": "A syntax of a real language"
    },
    "answer": "B"
  },
  {
    "id": 4,
    "question": "Which of these symbols represents a decision in a flowchart?",
    "options": {
      "A": "Rectangle",
      "B": "Parallelogram",
      "C": "Diamond",
      "D": "Circle"
    },
    "answer": "C"
  },
  {
    "id": 5,
    "question": "Which control structure is used for making choices?",
    "options": {
      "A": "Sequence",
      "B": "Selection",
      "C": "Repetition",
      "D": "Function"
    },
    "answer": "B"
  },
  {
    "id": 6,
    "question": "Sample PLT question number 6?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 7,
    "question": "Sample PLT question number 7?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 8,
    "question": "Sample PLT question number 8?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 9,
    "question": "Sample PLT question number 9?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 10,
    "question": "Sample PLT question number 10?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 11,
    "question": "Sample PLT question number 11?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 12,
    "question": "Sample PLT question number 12?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 13,
    "question": "Sample PLT question number 13?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 14,
    "question": "Sample PLT question number 14?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 15,
    "question": "Sample PLT question number 15?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 16,
    "question": "Sample PLT question number 16?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 17,
    "question": "Sample PLT question number 17?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 18,
    "question": "Sample PLT question number 18?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 19,
    "question": "Sample PLT question number 19?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 20,
    "question": "Sample PLT question number 20?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 21,
    "question": "Sample PLT question number 21?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 22,
    "question": "Sample PLT question number 22?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 23,
    "question": "Sample PLT question number 23?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 24,
    "question": "Sample PLT question number 24?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 25,
    "question": "Sample PLT question number 25?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 26,
    "question": "Sample PLT question number 26?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 27,
    "question": "Sample PLT question number 27?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 28,
    "question": "Sample PLT question number 28?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 29,
    "question": "Sample PLT question number 29?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 30,
    "question": "Sample PLT question number 30?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 31,
    "question": "Sample PLT question number 31?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 32,
    "question": "Sample PLT question number 32?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 33,
    "question": "Sample PLT question number 33?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 34,
    "question": "Sample PLT question number 34?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 35,
    "question": "Sample PLT question number 35?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 36,
    "question": "Sample PLT question number 36?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 37,
    "question": "Sample PLT question number 37?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 38,
    "question": "Sample PLT question number 38?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 39,
    "question": "Sample PLT question number 39?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 40,
    "question": "Sample PLT question number 40?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 41,
    "question": "Sample PLT question number 41?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 42,
    "question": "Sample PLT question number 42?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 43,
    "question": "Sample PLT question number 43?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 44,
    "question": "Sample PLT question number 44?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 45,
    "question": "Sample PLT question number 45?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 46,
    "question": "Sample PLT question number 46?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 47,
    "question": "Sample PLT question number 47?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 48,
    "question": "Sample PLT question number 48?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 49,
    "question": "Sample PLT question number 49?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 50,
    "question": "Sample PLT question number 50?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 51,
    "question": "Sample PLT question number 51?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 52,
    "question": "Sample PLT question number 52?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 53,
    "question": "Sample PLT question number 53?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 54,
    "question": "Sample PLT question number 54?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 55,
    "question": "Sample PLT question number 55?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 56,
    "question": "Sample PLT question number 56?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 57,
    "question": "Sample PLT question number 57?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 58,
    "question": "Sample PLT question number 58?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 59,
    "question": "Sample PLT question number 59?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  },
  {
    "id": 60,
    "question": "Sample PLT question number 60?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  }
];
const mysqlQuestions = [
   {
    id: 1,
    question: "Which command is used to create a new database in MySQL?",
    options: ["CREATE DATABASE dbname;", "NEW DATABASE dbname;", "MAKE DATABASE dbname;", "ADD DATABASE dbname;"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 2,
    question: "Which statement is used to select data from a MySQL table?",
    options: ["SELECT * FROM table;", "SHOW table;", "DISPLAY table;", "FETCH table;"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 3,
    question: "Which of these data types is used to store decimal numbers?",
    options: ["INT", "FLOAT", "CHAR", "DATE"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 4,
    question: "Which keyword is used to eliminate duplicate rows in a SELECT query?",
    options: ["UNIQUE", "DISTINCT", "DIFFERENT", "NODUP"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 5,
    question: "Which clause is used to filter rows returned by a SELECT statement?",
    options: ["WHERE", "ORDER BY", "HAVING", "GROUP BY"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 6,
    question: "Which SQL keyword sorts results in ascending order by default?",
    options: ["ORDER", "ORDER BY", "SORT", "GROUP"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 7,
    question: "Which function returns the number of rows in a result set?",
    options: ["SUM()", "COUNT()", "TOTAL()", "ROWS()"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 8,
    question: "What does the following command do? DROP TABLE students;",
    options: ["Deletes all rows", "Removes table structure and data", "Removes only table data", "Renames table"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 9,
    question: "Which constraint ensures that all values in a column are unique?",
    options: ["FOREIGN KEY", "CHECK", "PRIMARY KEY", "UNIQUE"],
    correct: 3,
    difficulty: "medium"
  },
  {
    id: 10,
    question: "Which of the following is not a valid MySQL engine?",
    options: ["InnoDB", "MyISAM", "MEMORY", "ORACLE"],
    correct: 3,
    difficulty: "medium"
  },
  {
    id: 11,
    question: "Which clause is used to group rows in SQL?",
    options: ["GROUP BY", "ORDER BY", "HAVING", "WHERE"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 12,
    question: "Which SQL statement is used to change data in a table?",
    options: ["INSERT", "UPDATE", "MODIFY", "ALTER"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 13,
    question: "What is the default port number for MySQL?",
    options: ["1433", "1521", "3306", "8080"],
    correct: 2,
    difficulty: "medium"
  },
  {
    id: 14,
    question: "Which function returns the current date and time in MySQL?",
    options: ["CURRDATE()", "DATE()", "NOW()", "TIME()"],
    correct: 2,
    difficulty: "easy"
  },
  {
    id: 15,
    question: "Which SQL command adds a new column to an existing table?",
    options: ["UPDATE TABLE", "ADD COLUMN", "ALTER TABLE", "INSERT COLUMN"],
    correct: 2,
    difficulty: "medium"
  },
  {
    id: 16,
    question: "Which keyword is used to remove duplicate records?",
    options: ["DISTINCT", "REMOVE", "UNIQUE", "FILTER"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 17,
    question: "Which command is used to delete all rows from a table without removing the structure?",
    options: ["DELETE", "TRUNCATE", "DROP", "REMOVE"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 18,
    question: "Which type of JOIN returns rows that have matching values in both tables?",
    options: ["LEFT JOIN", "INNER JOIN", "RIGHT JOIN", "FULL JOIN"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 19,
    question: "Which MySQL statement is used to create a new table?",
    options: ["ADD TABLE", "CREATE TABLE", "MAKE TABLE", "NEW TABLE"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 20,
    question: "Which keyword is used to sort results in descending order?",
    options: ["DESC", "DOWN", "REVERSE", "DSC"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 21,
    question: "What does the AUTO_INCREMENT attribute do?",
    options: ["Automatically increments text", "Generates unique integer values automatically", "Updates values automatically", "None"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 22,
    question: "Which operator is used to test for NULL values?",
    options: ["= NULL", "IS NULL", "== NULL", "EQ NULL"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 23,
    question: "Which function returns the highest value in a column?",
    options: ["TOP()", "MAX()", "GREATEST()", "HIGH()"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 24,
    question: "Which of the following commands creates a view?",
    options: ["MAKE VIEW", "CREATE VIEW", "NEW VIEW", "ADD VIEW"],
    correct: 1,
    difficulty: "hard"
  },
  {
    id: 25,
    question: "Which clause filters grouped records?",
    options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 26,
    question: "Which function is used to return the length of a string in MySQL?",
    options: ["LEN()", "STRLEN()", "LENGTH()", "CHARCOUNT()"],
    correct: 2,
    difficulty: "medium"
  },
  {
    id: 27,
    question: "Which of the following statements starts a transaction?",
    options: ["BEGIN", "START TRANSACTION", "NEW TRANSACTION", "OPEN TRANSACTION"],
    correct: 1,
    difficulty: "hard"
  },
  {
    id: 28,
    question: "Which command is used to save changes made by a transaction?",
    options: ["SAVE", "APPLY", "COMMIT", "STORE"],
    correct: 2,
    difficulty: "hard"
  },
  {
    id: 29,
    question: "Which command undoes all changes made by a transaction?",
    options: ["UNDO", "REVERT", "ROLLBACK", "DELETE"],
    correct: 2,
    difficulty: "hard"
  },
  {
    id: 30,
    question: "Which keyword is used to assign an alias to a column?",
    options: ["AS", "ALIAS", "RENAME", "LABEL"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 31,
    question: "Which function is used to combine results from two SELECT statements?",
    options: ["JOIN", "COMBINE", "UNION", "MERGE"],
    correct: 2,
    difficulty: "medium"
  },
  {
    id: 32,
    question: "Which command is used to remove a database?",
    options: ["DELETE DATABASE", "DROP DATABASE", "REMOVE DATABASE", "CLEAR DATABASE"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 33,
    question: "Which of the following is a valid MySQL data type?",
    options: ["BOOLEAN", "FLOAT", "VARCHAR", "All of the above"],
    correct: 3,
    difficulty: "easy"
  },
  {
    id: 34,
    question: "Which constraint defines a column as the table's primary key?",
    options: ["UNIQUE", "FOREIGN KEY", "PRIMARY KEY", "NOT NULL"],
    correct: 2,
    difficulty: "easy"
  },
  {
    id: 35,
    question: "Which of the following is used to back up a MySQL database?",
    options: ["mysqldump", "mysqlsave", "mysqlbackup", "dumpdb"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 36,
    question: "Which SQL function gives the average of a numeric column?",
    options: ["SUM()", "AVG()", "MEAN()", "AVERAGE()"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 37,
    question: "Which function is used to extract a portion of a string?",
    options: ["SPLIT()", "LEFT()", "SUBSTRING()", "MID()"],
    correct: 2,
    difficulty: "medium"
  },
  {
    id: 38,
    question: "Which MySQL statement grants a user permission?",
    options: ["PERMIT", "ALLOW", "GRANT", "ACCESS"],
    correct: 2,
    difficulty: "hard"
  },
  {
    id: 39,
    question: "Which MySQL statement revokes a user permission?",
    options: ["DENY", "REVOKE", "DELETE", "DROP"],
    correct: 1,
    difficulty: "hard"
  },
  {
    id: 40,
    question: "Which clause limits the number of rows returned?",
    options: ["LIMIT", "STOP", "MAXROWS", "TOP"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 41,
    question: "Which of these creates a foreign key relationship?",
    options: ["REFERENCES", "LINK", "FOREIGN LINK", "BIND"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 42,
    question: "Which MySQL function returns the current user?",
    options: ["USER()", "CURRENT_USER()", "SESSION_USER()", "All of the above"],
    correct: 3,
    difficulty: "medium"
  },
  {
    id: 43,
    question: "What is the default storage engine in MySQL 8.0?",
    options: ["MyISAM", "InnoDB", "MEMORY", "NDB"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 44,
    question: "Which command displays all databases?",
    options: ["SHOW DATABASES;", "LIST DATABASES;", "DISPLAY DATABASES;", "SELECT DATABASES;"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 45,
    question: "Which command displays all tables in a database?",
    options: ["SHOW TABLES;", "LIST TABLES;", "DISPLAY TABLES;", "SELECT TABLES;"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 46,
    question: "Which function combines multiple strings into one?",
    options: ["MERGE()", "CONCAT()", "JOIN()", "COMBINE()"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 47,
    question: "Which keyword is used to define a stored procedure?",
    options: ["MAKE PROCEDURE", "CREATE PROCEDURE", "NEW PROCEDURE", "ADD PROCEDURE"],
    correct: 1,
    difficulty: "hard"
  },
  {
    id: 48,
    question: "Which keyword is used to define a trigger?",
    options: ["MAKE TRIGGER", "CREATE TRIGGER", "NEW TRIGGER", "ADD TRIGGER"],
    correct: 1,
    difficulty: "hard"
  },
  {
    id: 49,
    question: "Which function returns the number of columns in a result set?",
    options: ["COLCOUNT()", "NUM_COLUMNS()", "COLUMN_COUNT()", "COUNT_COLUMNS()"],
    correct: 2,
    difficulty: "hard"
  },
  {
    id: 50,
    question: "Which MySQL clause restricts the results returned based on a condition?",
    options: ["HAVING", "WHERE", "LIMIT", "ORDER"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 51,
    question: "Which of the following is true about PRIMARY KEY?",
    options: ["It can have NULL values", "It ensures uniqueness", "It can be duplicated", "It is optional"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 52,
    question: "Which of these is a valid MySQL constraint?",
    options: ["CHECK", "FOREIGN KEY", "NOT NULL", "All of the above"],
    correct: 3,
    difficulty: "medium"
  },
  {
    id: 53,
    question: "What is the default sorting order in MySQL?",
    options: ["DESC", "ASC", "RANDOM", "NONE"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 54,
    question: "Which function returns the database name currently in use?",
    options: ["DB()", "DATABASE()", "CURRENT_DB()", "GETDB()"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 55,
    question: "Which of the following creates an index?",
    options: ["CREATE INDEX", "MAKE INDEX", "ADD INDEX", "NEW INDEX"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 56,
    question: "Which of these is used to add a condition to a GROUP BY result?",
    options: ["WHERE", "HAVING", "ORDER BY", "GROUP"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 57,
    question: "Which SQL clause is used to rename a column or table in the output?",
    options: ["AS", "RENAME", "CHANGE", "LABEL"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 58,
    question: "Which MySQL command is used to check the server version?",
    options: ["SELECT VERSION();", "SHOW VERSION;", "VERSION();", "GET VERSION;"],
    correct: 0,
    difficulty: "medium"
  }
];

const phpQuestions = [
   {
    id: 1,
    question: "Which of the following is the correct way to start a PHP block?",
    options: ["<?php", "<php>", "<?=", "<script>"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 2,
    question: "Which symbol is used to declare a variable in PHP?",
    options: ["#", "@", "$", "&"],
    correct: 2,
    difficulty: "easy"
  },
  {
    id: 3,
    question: "Which of the following is a valid PHP variable name?",
    options: ["$1number", "$_value", "$-name", "$this"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 4,
    question: "Which function outputs text to the browser in PHP?",
    options: ["echo", "printText", "printf", "display"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 5,
    question: "Which of the following data types is not supported in PHP?",
    options: ["Integer", "Float", "Character", "Boolean"],
    correct: 2,
    difficulty: "easy"
  },
  {
    id: 6,
    question: "What will be the output of: echo 5 . 6;",
    options: ["11", "56", "Error", "None"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 7,
    question: "Which operator is used for concatenation in PHP?",
    options: ["+", "&", ".", ","],
    correct: 2,
    difficulty: "easy"
  },
  {
    id: 8,
    question: "How do you write a single-line comment in PHP?",
    options: ["// comment", "/* comment */", "<!-- comment -->", "#comment"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 9,
    question: "Which of the following is a PHP superglobal variable?",
    options: ["$_FORM", "$_POST", "$_INPUT", "$GLOBALS_POST"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 10,
    question: "What is the correct way to define a constant in PHP?",
    options: ["$PI = 3.14;", "define('PI', 3.14);", "const PI = 3.14;", "Both B and C"],
    correct: 3,
    difficulty: "medium"
  },
  {
    id: 11,
    question: "Which function is used to determine the length of a string in PHP?",
    options: ["count()", "strlen()", "size()", "strcount()"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 12,
    question: "Which of these is used to include a file in PHP and halt on failure?",
    options: ["include", "require", "import", "use"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 13,
    question: "Which loop executes at least once even if the condition is false?",
    options: ["for", "foreach", "do...while", "while"],
    correct: 2,
    difficulty: "medium"
  },
  {
    id: 14,
    question: "Which of the following function sorts an array in ascending order?",
    options: ["ksort()", "asort()", "sort()", "rsort()"],
    correct: 2,
    difficulty: "medium"
  },
  {
    id: 15,
    question: "Which function is used to count all elements in an array?",
    options: ["size()", "len()", "count()", "array_size()"],
    correct: 2,
    difficulty: "easy"
  },
  {
    id: 16,
    question: "What will `isset($var)` return if $var = null?",
    options: ["true", "false", "null", "error"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 17,
    question: "Which of the following is used to destroy a session?",
    options: ["unset()", "session_destroy()", "session_unset()", "destroy_session()"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 18,
    question: "What will the expression 10 == '10' return?",
    options: ["true", "false", "error", "null"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 19,
    question: "What will the expression 10 === '10' return?",
    options: ["true", "false", "error", "null"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 20,
    question: "Which of these methods connects PHP to a MySQL database using PDO?",
    options: ["mysqli_connect()", "pdo_connect()", "new PDO()", "mysql_open()"],
    correct: 2,
    difficulty: "hard"
  },
  {
    id: 21,
    question: "Which keyword is used to define a class in PHP?",
    options: ["class", "struct", "define", "object"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 22,
    question: "How do you define a constructor in PHP?",
    options: ["function constructor()", "function __construct()", "function construct()", "function __create()"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 23,
    question: "Which of the following keywords is used to inherit a class in PHP?",
    options: ["implements", "inherits", "extends", "uses"],
    correct: 2,
    difficulty: "medium"
  },
  {
    id: 24,
    question: "Which magic method is called when trying to print an object?",
    options: ["__get()", "__construct()", "__toString()", "__print()"],
    correct: 2,
    difficulty: "hard"
  },
  {
    id: 25,
    question: "Which of these is NOT a PHP error type?",
    options: ["E_PARSE", "E_NOTICE", "E_WARNING", "E_DEBUG"],
    correct: 3,
    difficulty: "hard"
  },
  {
    id: 26,
    question: "How can you get the number of rows returned by a MySQL query in MySQLi?",
    options: ["$result->rows", "mysqli_num_rows($result)", "num_rows($result)", "count($result)"],
    correct: 1,
    difficulty: "hard"
  },
  {
    id: 27,
    question: "Which of these functions is used to redirect in PHP?",
    options: ["redirect()", "header()", "send()", "url_redirect()"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 28,
    question: "What does the function `explode()` do?",
    options: ["Split a string into an array", "Combine array into string", "Delete a string", "None"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 29,
    question: "Which of the following converts an array into a string?",
    options: ["implode()", "explode()", "join()", "split()"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 30,
    question: "How do you check if a file exists in PHP?",
    options: ["is_file()", "exists()", "file_exist()", "file_exists()"],
    correct: 3,
    difficulty: "medium"
  },
  {
    id: 31,
    question: "Which of these functions is used to upload files in PHP?",
    options: ["move_uploaded_file()", "upload_file()", "file_put_contents()", "copy()"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 32,
    question: "Which function is used to read a file line by line?",
    options: ["fgets()", "read()", "file()", "getline()"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 33,
    question: "What is the default session timeout in PHP (in seconds)?",
    options: ["600", "1440", "1800", "3600"],
    correct: 1,
    difficulty: "hard"
  },
  {
    id: 34,
    question: "Which global variable holds uploaded file information?",
    options: ["$_POST", "$_FILES", "$_SERVER", "$_SESSION"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 35,
    question: "Which function starts a new session in PHP?",
    options: ["session_begin()", "start_session()", "session_start()", "init_session()"],
    correct: 2,
    difficulty: "easy"
  },
  {
    id: 36,
    question: "Which superglobal is used to access session variables?",
    options: ["$_SESSION", "$_COOKIE", "$_GLOBAL", "$_POST"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 37,
    question: "Which of the following is the correct way to set a cookie?",
    options: ["cookie_set()", "setcookie()", "create_cookie()", "make_cookie()"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 38,
    question: "Which function is used to hash a password securely in PHP?",
    options: ["md5()", "sha1()", "password_hash()", "crypt()"],
    correct: 2,
    difficulty: "hard"
  },
  {
    id: 39,
    question: "What does `json_encode()` do?",
    options: ["Converts JSON to array", "Encodes array into JSON", "Parses XML", "Encodes HTML"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 40,
    question: "What does `json_decode()` return by default?",
    options: ["Array", "Object", "String", "Boolean"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 41,
    question: "Which of these keywords is used to handle exceptions in PHP?",
    options: ["try", "catch", "throw", "All of the above"],
    correct: 3,
    difficulty: "medium"
  },
  {
    id: 42,
    question: "Which of these functions terminates script execution?",
    options: ["exit()", "end()", "stop()", "die()"],
    correct: 3,
    difficulty: "medium"
  },
  {
    id: 43,
    question: "What PHP version introduced the nullsafe operator ( ?-> )?",
    options: ["7.0", "7.4", "8.0", "8.1"],
    correct: 2,
    difficulty: "hard"
  },
  {
    id: 44,
    question: "What does the spaceship operator (<=>) do?",
    options: ["String concatenation", "Comparison", "Null coalescing", "Error suppression"],
    correct: 1,
    difficulty: "hard"
  },
  {
    id: 45,
    question: "Which of these functions returns the current PHP version?",
    options: ["php_version()", "phpinfo()", "version()", "get_php_version()"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 46,
    question: "Which statement is used to stop the execution of a loop?",
    options: ["exit", "continue", "break", "return"],
    correct: 2,
    difficulty: "easy"
  },
  {
    id: 47,
    question: "What is the use of the `list()` function in PHP?",
    options: ["Create list of items", "Assign variables from array values", "Loop through array", "Print arrays"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 48,
    question: "Which of the following is NOT a valid PHP data type?",
    options: ["array", "boolean", "char", "object"],
    correct: 2,
    difficulty: "easy"
  },
  {
    id: 49,
    question: "What does `require_once` do?",
    options: ["Includes file multiple times", "Includes file only once", "Requires a file only when needed", "None"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 50,
    question: "What is the output of `gettype(5.5)`?",
    options: ["int", "double", "float", "decimal"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 51,
    question: "What is the output of `var_dump(true)`?",
    options: ["true", "1", "bool(true)", "boolean"],
    correct: 2,
    difficulty: "medium"
  },
  {
    id: 52,
    question: "Which function returns the number of characters in a file?",
    options: ["fsize()", "filesize()", "filelength()", "length()"],
    correct: 1,
    difficulty: "hard"
  },
  {
    id: 53,
    question: "Which of these can be used to prevent SQL injection?",
    options: ["mysqli_real_escape_string()", "Prepared statements", "htmlspecialchars()", "Both A and B"],
    correct: 3,
    difficulty: "hard"
  },
  {
    id: 54,
    question: "Which function removes whitespace from both ends of a string?",
    options: ["strip()", "trim()", "remove_space()", "clean()"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 55,
    question: "Which PHP statement is used to end an if block?",
    options: ["endif;", "end;", "closeif;", "}"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 56,
    question: "What is the purpose of `declare(strict_types=1);`?",
    options: ["Forces type declarations", "Disables type casting", "Enables type casting", "Strictly checks variable names"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 57,
    question: "Which PHP 8 feature allows named arguments in functions?",
    options: ["Associative arguments", "Named parameters", "Function mapping", "Argument unpacking"],
    correct: 1,
    difficulty: "hard"
  },
  {
    id: 58,
    question: "Which function is used to convert special characters to HTML entities?",
    options: ["htmlspecialchars()", "htmlentities()", "escape_html()", "Both A and B"],
    correct: 3,
    difficulty: "medium"
  },
  {
    id: 59,
    question: "What is the difference between include and require?",
    options: ["include stops script on failure", "require stops script on failure", "Both behave the same", "None"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 60,
    question: "Which PHP tag is the most recommended for portability?",
    options: ["<?php ?>", "<? ?>", "<% %>", "<?="],
    correct: 0,
    difficulty: "easy"
  }
];

const dreamweaverQuestions = [
   {
    id: 1,
    question: "Which panel in Dreamweaver is used to manage and organize files in your website?",
    options: ["Files panel", "Properties panel", "CSS Designer", "Insert panel"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 2,
    question: "Dreamweaver templates use which file extension?",
    options: [".dwt", ".html", ".css", ".js"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 3,
    question: "What does FTP stand for?",
    options: ["File Transfer Protocol", "Fast Transfer Process", "File Type Program", "Format Transfer Protocol"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 4,
    question: "Which feature helps you check how your site looks on mobile devices?",
    options: ["Responsive Design Mode", "Code View", "Split View", "Live Code"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 5,
    question: "Which company developed Dreamweaver?",
    options: ["Adobe Systems", "Microsoft", "Google", "Apple"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 6,
    question: "Which panel shows all images, colors, and links used in your site?",
    options: ["Assets panel", "Files panel", "Properties panel", "DOM panel"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 7,
    question: "What does the Properties Inspector do?",
    options: ["Displays and edits attributes of selected items", "Shows file structure", "Manages CSS styles", "Previews in browser"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 8,
    question: "What is the purpose of Snippets in Dreamweaver?",
    options: ["Reusable blocks of code", "Image editing", "File compression", "Color management"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 9,
    question: "Which view shows how the page will appear in a browser?",
    options: ["Live View", "Code View", "Design View", "Split View"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 10,
    question: "What does Code Hinting help with?",
    options: ["Auto-completion of code", "Error detection", "File organization", "Image optimization"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 11,
    question: "What panel is used to organize and upload website files?",
    options: ["Files panel", "Assets panel", "CSS Designer", "Insert panel"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 12,
    question: "Which tool lets you preview your website on different screen sizes?",
    options: ["Device Preview", "Code View", "Properties Inspector", "DOM panel"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 13,
    question: "Which shortcut opens the code view?",
    options: ["F10", "F12", "Ctrl+F10", "Shift+F10"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 14,
    question: "What does the term 'Library Items' refer to?",
    options: ["Reusable design components", "Image files", "CSS stylesheets", "JavaScript functions"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 15,
    question: "Which protocol is used by Dreamweaver for publishing a website?",
    options: ["FTP/SFTP", "HTTP", "SMTP", "TCP/IP"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 16,
    question: "What is the default file extension for web pages?",
    options: [".html", ".dwt", ".css", ".js"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 17,
    question: "Which Dreamweaver panel helps create and manage CSS styles?",
    options: ["CSS Designer", "Properties Inspector", "Files panel", "Insert panel"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 18,
    question: "What does the DOM panel display?",
    options: ["Document Object Model structure", "File directory", "CSS properties", "Image gallery"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 19,
    question: "What does the 'Insert Panel' allow you to add?",
    options: ["HTML elements like images and tables", "CSS styles", "JavaScript functions", "File directories"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 20,
    question: "Which workspace layout is best for beginners?",
    options: ["Designer Workspace", "Coder Workspace", "Developer Workspace", "Classic Workspace"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 21,
    question: "What is the purpose of defining a site in Dreamweaver?",
    options: ["To manage links and assets correctly", "To create templates", "To edit images", "To write JavaScript"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 22,
    question: "What color is Dreamweaver's default app icon?",
    options: ["Green", "Blue", "Red", "Purple"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 23,
    question: "Which tag is automatically generated when creating a new HTML document?",
    options: ["<html>", "<body>", "<head>", "<div>"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 24,
    question: "Which Dreamweaver feature checks for broken links?",
    options: ["Link Checker", "Code Inspector", "File Manager", "Site Reporter"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 25,
    question: "What does the shortcut Ctrl+Shift+U do?",
    options: ["Upload selected files to server", "Undo last action", "Update links", "Underline text"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 26,
    question: "Which Dreamweaver view allows both code and design editing?",
    options: ["Split View", "Live View", "Code View", "Design View"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 27,
    question: "Which version introduced Bootstrap integration?",
    options: ["Dreamweaver CC 2015", "Dreamweaver CS6", "Dreamweaver CC 2014", "Dreamweaver CC 2016"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 28,
    question: "Which menu allows creating new documents?",
    options: ["File menu", "Edit menu", "Insert menu", "View menu"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 29,
    question: "What is the main advantage of using templates?",
    options: ["Consistency across web pages", "Faster loading", "Better SEO", "Smaller file size"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 30,
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Computer Style System", "Creative Style Syntax", "Code Style Structure"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 31,
    question: "Where do you manage external style sheets?",
    options: ["CSS Designer panel", "Files panel", "Properties Inspector", "Insert panel"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 32,
    question: "What panel allows JavaScript behaviors to be added?",
    options: ["Behaviors panel", "CSS Designer", "DOM panel", "Assets panel"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 33,
    question: "What does the Files panel show?",
    options: ["Local and remote site files", "CSS properties", "HTML structure", "Image gallery"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 34,
    question: "What file extension is used for Dreamweaver templates?",
    options: [".dwt", ".html", ".css", ".tmp"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 35,
    question: "Which option enables synchronization between local and server files?",
    options: ["Synchronize", "Upload", "Download", "Refresh"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 36,
    question: "What is 'Live Code' used for?",
    options: ["Viewing dynamic content changes", "Editing CSS", "Managing files", "Creating templates"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 37,
    question: "Which feature automatically closes HTML tags?",
    options: ["Auto Tag Completion", "Code Hinting", "Live View", "Split View"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 38,
    question: "What is the purpose of the Assets panel?",
    options: ["Manage images, colors, and links", "Edit HTML code", "Preview in browser", "Upload files"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 39,
    question: "What shortcut previews a file in browser?",
    options: ["F12", "F10", "Ctrl+F12", "Shift+F12"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 40,
    question: "What panel manages reusable HTML fragments?",
    options: ["Library panel", "Assets panel", "Snippets panel", "Templates panel"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 41,
    question: "Which Dreamweaver feature allows responsive grid layouts?",
    options: ["Fluid Grid Layout", "Bootstrap Grid", "CSS Grid", "Flexbox Layout"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 42,
    question: "What is the advantage of using Split View?",
    options: ["View design and code simultaneously", "Faster rendering", "Better performance", "Smaller file size"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 43,
    question: "Which key toggles full code view?",
    options: ["F10", "F12", "F9", "F11"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 44,
    question: "What protocol is used for secure file transfers?",
    options: ["SFTP", "FTP", "HTTP", "SMTP"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 45,
    question: "Which menu contains the Preferences option?",
    options: ["Edit menu", "File menu", "View menu", "Tools menu"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 46,
    question: "Which shortcut saves all open documents?",
    options: ["Ctrl+Shift+S", "Ctrl+S", "Ctrl+Alt+S", "Shift+S"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 47,
    question: "Which file type stores a Dreamweaver site definition?",
    options: [".ste", ".site", ".dwt", ".def"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 48,
    question: "Which window allows you to check code syntax?",
    options: ["Output panel", "Properties Inspector", "CSS Designer", "DOM panel"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 49,
    question: "Which language is primarily used for website structure?",
    options: ["HTML", "CSS", "JavaScript", "PHP"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 50,
    question: "What feature helps preview on multiple screen sizes?",
    options: ["Device Preview", "Live View", "Split View", "Code View"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 51,
    question: "Which Dreamweaver component can connect to a database?",
    options: ["Server Behaviors", "CSS Designer", "Assets panel", "DOM panel"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 52,
    question: "Which tag defines a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 53,
    question: "What is the shortcut to insert an image?",
    options: ["Ctrl+Alt+I", "Ctrl+I", "Alt+I", "Shift+I"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 54,
    question: "Which option allows connecting to a remote server?",
    options: ["Manage Sites", "File Manager", "Server Panel", "FTP Setup"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 55,
    question: "What Dreamweaver feature supports Bootstrap grid editing?",
    options: ["Bootstrap Integration", "Grid Editor", "CSS Designer", "Layout Panel"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 56,
    question: "What tool helps visually create CSS selectors?",
    options: ["CSS Designer", "Code Navigator", "Properties Inspector", "DOM panel"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 57,
    question: "What does 'DOM' stand for?",
    options: ["Document Object Model", "Data Object Management", "Design Object Module", "Dynamic Object Method"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 58,
    question: "What is the purpose of the Code Navigator?",
    options: ["Show related CSS and JS for selected element", "Navigate file structure", "Edit code syntax", "Preview in browser"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 59,
    question: "Which feature highlights code errors?",
    options: ["Linting", "Code Hinting", "Syntax Checker", "Error Panel"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 60,
    question: "Which Dreamweaver view displays real-time browser rendering?",
    options: ["Live View", "Design View", "Code View", "Split View"],
    correct: 0,
    difficulty: "medium"
  }
];

const iwcdQuestions = [
   {
    id: 1,
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 2,
    question: "Which tag is used to define the main heading of a webpage?",
    options: ["<h1>", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 3,
    question: "What is the correct HTML element for inserting a line break?",
    options: ["<br>", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 4,
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<a>", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 5,
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 6,
    question: "Which property changes the text color in CSS?",
    options: ["color", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 7,
    question: "Which HTML tag is used to define a table row?",
    options: ["<tr>", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 8,
    question: "Which HTML attribute specifies an image source?",
    options: ["src", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 9,
    question: "Which CSS property controls the text size?",
    options: ["font-size", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 10,
    question: "What does the <title> tag define?",
    options: ["The title of the webpage shown in the browser tab", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 11,
    question: "Which HTML tag is used to display an image?",
    options: ["<img>", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 12,
    question: "What is the purpose of a <meta> tag?",
    options: ["To provide metadata about the webpage", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 13,
    question: "What does SEO stand for?",
    options: ["Search Engine Optimization", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 14,
    question: "Which HTML tag is used to define a list item?",
    options: ["<li>", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 15,
    question: "What tag defines a paragraph?",
    options: ["<p>", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 16,
    question: "What is the default file name for a homepage?",
    options: ["index.html", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 17,
    question: "Which tag is used to define a navigation bar?",
    options: ["<nav>", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 18,
    question: "What does the <footer> tag represent?",
    options: ["The bottom section of a webpage", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 19,
    question: "Which CSS property sets the background color?",
    options: ["background-color", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 20,
    question: "What is the purpose of responsive design?",
    options: ["To make websites adapt to different screen sizes", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 21,
    question: "Which tag is used to embed a video?",
    options: ["<video>", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 22,
    question: "Which CSS unit is relative to the font size of the root element?",
    options: ["rem", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 23,
    question: "What does the <header> tag represent?",
    options: ["The top section or introductory part of a page", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 24,
    question: "Which tag defines an unordered list?",
    options: ["<ul>", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 25,
    question: "What does <strong> do in HTML?",
    options: ["Displays bold text with emphasis", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 26,
    question: "Which HTML tag is used to define a form?",
    options: ["<form>", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 27,
    question: "What attribute is used to specify a form submission URL?",
    options: ["action", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 28,
    question: "Which input type creates a password field?",
    options: ["password", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 29,
    question: "What does the <iframe> tag do?",
    options: ["Embeds another webpage", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 30,
    question: "What does JavaScript add to a webpage?",
    options: ["Interactivity and dynamic behavior", "Alternate Option 1", "Alternate Option 2", "Alternate Option 3"],
    correct: 0,
    difficulty: "medium"
  }
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