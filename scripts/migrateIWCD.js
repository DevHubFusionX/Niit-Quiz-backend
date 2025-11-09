const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

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

const iwcdQuestions = [
  {
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "Hyperlink Text Markup Language", "Home Tool Markup Language", "Hypertext Transfer Markup Language"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "Which tag is used to define the main heading of a webpage?",
    options: ["<h1>", "<header>", "<title>", "<head>"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    options: ["<br>", "<break>", "<lb>", "<newline>"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "Which property changes the text color in CSS?",
    options: ["color", "text-color", "font-color", "foreground-color"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "Which HTML tag is used to define a table row?",
    options: ["<tr>", "<row>", "<table-row>", "<td>"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "Which HTML attribute specifies an image source?",
    options: ["src", "source", "img", "href"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-size", "text-size", "size", "font-weight"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "What does the <title> tag define?",
    options: ["The title of the webpage shown in the browser tab", "The main heading of the page", "The page footer", "The navigation menu"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "Which HTML tag is used to display an image?",
    options: ["<img>", "<image>", "<picture>", "<photo>"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "What is the purpose of a <meta> tag?",
    options: ["To provide metadata about the webpage", "To create navigation links", "To display images", "To format text"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "What does SEO stand for?",
    options: ["Search Engine Optimization", "Site Engine Optimization", "Search Engine Operation", "System Engine Optimization"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "Which HTML tag is used to define a list item?",
    options: ["<li>", "<item>", "<list>", "<bullet>"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "What tag defines a paragraph?",
    options: ["<p>", "<para>", "<paragraph>", "<text>"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "What is the default file name for a homepage?",
    options: ["index.html", "home.html", "main.html", "default.html"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "Which tag is used to define a navigation bar?",
    options: ["<nav>", "<navigation>", "<menu>", "<navbar>"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "What does the <footer> tag represent?",
    options: ["The bottom section of a webpage", "The top section of a webpage", "A sidebar", "The main content"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "Which CSS property sets the background color?",
    options: ["background-color", "bg-color", "color-background", "background"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "What is the purpose of responsive design?",
    options: ["To make websites adapt to different screen sizes", "To make websites load faster", "To improve SEO", "To add animations"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "Which tag is used to embed a video?",
    options: ["<video>", "<media>", "<movie>", "<embed>"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "Which CSS unit is relative to the font size of the root element?",
    options: ["rem", "em", "px", "pt"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "What does the <header> tag represent?",
    options: ["The top section or introductory part of a page", "The main content", "The footer", "A sidebar"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "Which tag defines an unordered list?",
    options: ["<ul>", "<ol>", "<list>", "<unordered>"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "What does <strong> do in HTML?",
    options: ["Displays bold text with emphasis", "Creates a line break", "Defines a paragraph", "Creates a hyperlink"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "Which HTML tag is used to define a form?",
    options: ["<form>", "<input>", "<field>", "<submit>"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "What attribute is used to specify a form submission URL?",
    options: ["action", "method", "target", "href"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "Which input type creates a password field?",
    options: ["password", "hidden", "secret", "secure"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "What does the <iframe> tag do?",
    options: ["Embeds another webpage", "Creates a frame border", "Defines an image", "Creates a form"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "What does JavaScript add to a webpage?",
    options: ["Interactivity and dynamic behavior", "Styling and layout", "Structure and content", "Database connectivity"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "Which HTML element contains visible content of a webpage?",
    options: ["<body>", "<head>", "<html>", "<content>"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "What is an external CSS file linked with?",
    options: ["<link>", "<style>", "<css>", "<import>"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "Which attribute specifies alternate text for images?",
    options: ["alt", "title", "description", "text"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "Which CSS selector targets an element by its ID?",
    options: ["#idname", ".idname", "idname", "*idname"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "Which HTML element defines the document structure?",
    options: ["<html>", "<document>", "<page>", "<structure>"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "Which tag is used for numbered lists?",
    options: ["<ol>", "<ul>", "<nl>", "<numbered>"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "What is the function of the <div> tag?",
    options: ["Defines a division or container", "Creates a line break", "Defines a paragraph", "Creates a hyperlink"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "What is the purpose of <span>?",
    options: ["Applies inline styling or grouping text", "Creates a block element", "Defines a paragraph", "Creates a table"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "Which attribute opens a link in a new tab?",
    options: ["target='_blank'", "new='true'", "tab='new'", "window='new'"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "Which tag defines a table?",
    options: ["<table>", "<tab>", "<grid>", "<data>"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "Which CSS property sets margins around elements?",
    options: ["margin", "padding", "border", "spacing"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "Which CSS property defines padding inside elements?",
    options: ["padding", "margin", "border", "spacing"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "What does <section> tag represent?",
    options: ["A thematic grouping of content", "A navigation menu", "A footer", "A header"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "What is a favicon?",
    options: ["A small icon displayed on the browser tab", "A large banner image", "A navigation menu", "A footer element"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "Which protocol is used to transfer web content?",
    options: ["HTTP/HTTPS", "FTP", "SMTP", "TCP"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "What does URL stand for?",
    options: ["Uniform Resource Locator", "Universal Resource Locator", "Unique Resource Locator", "United Resource Locator"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "Which tag is used for adding external JavaScript?",
    options: ["<script>", "<js>", "<javascript>", "<code>"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "What does the <style> tag define?",
    options: ["Internal CSS rules", "External CSS files", "JavaScript code", "HTML structure"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "Which tag defines the largest heading?",
    options: ["<h1>", "<h6>", "<header>", "<title>"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "Which attribute specifies the width of an image?",
    options: ["width", "size", "dimension", "scale"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "Which tag is used to add a horizontal line?",
    options: ["<hr>", "<line>", "<horizontal>", "<break>"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "Which HTML tag is used for comments?",
    options: ["<!-- comment -->", "<comment>", "<note>", "<remark>"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "What is the correct HTML for inserting a background color?",
    options: ["<body style='background-color:blue;'>", "<body bg='blue'>", "<body color='blue'>", "<body background='blue'>"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "Which element represents an article or post?",
    options: ["<article>", "<post>", "<content>", "<story>"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "What is the function of <aside>?",
    options: ["Defines sidebar or tangential content", "Defines main content", "Defines a header", "Defines a footer"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "Which CSS property makes text italic?",
    options: ["font-style", "text-style", "font-weight", "text-decoration"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "Which HTML element defines emphasized text?",
    options: ["<em>", "<emphasis>", "<italic>", "<i>"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "Which element contains metadata like title and links?",
    options: ["<head>", "<header>", "<meta>", "<info>"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "Which tag is used to embed audio?",
    options: ["<audio>", "<sound>", "<music>", "<media>"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "What does the 'responsive meta tag' control?",
    options: ["Viewport scaling for mobile devices", "Page loading speed", "SEO optimization", "Color scheme"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "Which tag is used to group form elements?",
    options: ["<fieldset>", "<group>", "<formgroup>", "<section>"],
    correct: 0,
    difficulty: "hard"
  }
];

async function migrateIWCDQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing IWCD questions
    await Question.deleteMany({ subject: 'IWCD' });
    console.log('Cleared existing IWCD questions');

    const dbQuestions = iwcdQuestions.map(q => ({
      subject: 'IWCD',
      subjectName: 'Internet & Web Client Development',
      question: q.question,
      options: q.options,
      correct: q.correct,
      difficulty: q.difficulty,
      tags: ['html', 'css', 'javascript', 'web-development', 'client-side'],
      analytics: {
        totalAttempts: 0,
        correctAttempts: 0,
        avgTimeSpent: 0
      }
    }));

    await Question.insertMany(dbQuestions);
    
    const easyCount = iwcdQuestions.filter(q => q.difficulty === 'easy').length;
    const mediumCount = iwcdQuestions.filter(q => q.difficulty === 'medium').length;
    const hardCount = iwcdQuestions.filter(q => q.difficulty === 'hard').length;
    
    console.log(`✓ Migrated ${dbQuestions.length} IWCD questions`);
    console.log(`   - Easy: ${easyCount} questions`);
    console.log(`   - Medium: ${mediumCount} questions`);
    console.log(`   - Hard: ${hardCount} questions`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

migrateIWCDQuestions();