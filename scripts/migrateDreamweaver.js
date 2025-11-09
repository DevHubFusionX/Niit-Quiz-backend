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

// Easy questions
const easyQuestions = [
  {
    question: "What is the primary use of Adobe Dreamweaver?",
    options: ["Video editing", "Web design and development", "Photo editing", "Database management"],
    correct: 1,
    difficulty: "easy"
  },
  {
    question: "Which view in Dreamweaver lets you edit HTML visually?",
    options: ["Design View", "Code View", "Split View", "Live View"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "What is the file extension for a standard HTML file?",
    options: [".htm", ".html", ".xhtml", ".xml"],
    correct: 1,
    difficulty: "easy"
  },
  {
    question: "Which key combination opens a new file in Dreamweaver?",
    options: ["Ctrl + N", "Ctrl + S", "Ctrl + O", "Ctrl + P"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "What does the Files panel in Dreamweaver manage?",
    options: ["Images", "Site files and folders", "Fonts", "JavaScript libraries"],
    correct: 1,
    difficulty: "easy"
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<a>", "<link>", "<url>", "<href>"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "Which view allows you to see both code and design together?",
    options: ["Split View", "Live View", "Browser View", "Preview Mode"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "What panel allows inserting HTML elements quickly?",
    options: ["Insert Panel", "Properties Panel", "CSS Designer", "Assets Panel"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "What is the function of the Properties Panel?",
    options: ["Change font and color settings", "Edit element attributes and formatting", "Manage external files", "Insert multimedia"],
    correct: 1,
    difficulty: "easy"
  },
  {
    question: "Which menu previews the site in a browser?",
    options: ["File > Preview in Browser", "Edit > Preferences", "Site > Manage Sites", "View > Code"],
    correct: 0,
    difficulty: "easy"
  }
];

// Medium questions
const mediumQuestions = [
  {
    question: "What is a Dreamweaver template used for?",
    options: ["Creating reusable layouts", "Managing CSS files", "Previewing sites", "Editing JavaScript"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "Which view simulates a real-time browser environment?",
    options: ["Live View", "Code View", "Split View", "Preview Mode"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "What does the CSS Designer panel control?",
    options: ["CSS properties and stylesheets", "File management", "HTML validation", "Database connections"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "Which tool in Dreamweaver helps test responsive design?",
    options: ["Multiscreen Preview", "Template Editor", "Code Navigator", "FTP Manager"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "What is Bootstrap integration in Dreamweaver used for?",
    options: ["Building responsive websites", "Editing images", "Creating animations", "Managing JavaScript libraries"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "Which feature lets you connect Dreamweaver to Git repositories?",
    options: ["Git integration", "Sync Manager", "FTP Panel", "History Panel"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "What does the Assets panel manage?",
    options: ["Images, colors, and media files", "CSS properties", "HTML structure", "Server settings"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "Which shortcut saves the current file in Dreamweaver?",
    options: ["Ctrl + S", "Ctrl + P", "Ctrl + E", "Ctrl + F"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "How do you create a new CSS rule in Dreamweaver?",
    options: ["CSS Designer > Add Rule", "File > New", "Edit > Preferences", "Insert > Style"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "Which feature lets you drag-and-drop Bootstrap components into a layout?",
    options: ["Bootstrap Visual Editor", "Insert Panel", "Live Code", "Snippets"],
    correct: 0,
    difficulty: "medium"
  }
];

// Hard questions
const hardQuestions = [
  {
    question: "What is the function of the DOM panel in Dreamweaver?",
    options: ["Display the document structure", "Preview site performance", "Debug scripts", "Optimize CSS"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "Which Dreamweaver feature checks code for HTML5 validation errors?",
    options: ["Validation panel", "Assets panel", "CSS Designer", "Insert menu"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "What is the role of the Extract panel in Dreamweaver CC?",
    options: ["Extracts design data from Photoshop files", "Extracts CSS rules", "Extracts HTML from live pages", "Extracts FTP connections"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "Which protocol is used by Dreamweaver to upload website files?",
    options: ["FTP/SFTP", "HTTP", "SMTP", "SSH only"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "What feature allows for synchronization of local and remote sites?",
    options: ["Site Synchronization", "Bootstrap Sync", "Server Behavior", "Live Sync"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "How can you connect Dreamweaver to a MySQL database for dynamic sites?",
    options: ["Use Server Behaviors", "Insert > Database", "Edit > Preferences", "Use CSS Designer"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "What is the function of the Code Navigator?",
    options: ["Displays all related CSS, HTML, and scripts for a selected element", "Navigates FTP folders", "Shows browser preview", "Changes code color themes"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "How can you preview a responsive website on multiple devices at once?",
    options: ["Device Preview", "Bootstrap Grid", "Multiscreen Preview", "Site Inspector"],
    correct: 2,
    difficulty: "hard"
  },
  {
    question: "Which advanced feature lets you use JavaScript frameworks inside Dreamweaver?",
    options: ["Code Intellisense", "Bootstrap Integration", "Git Support", "Live Preview"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "What is the use of the Emmet toolkit in Dreamweaver?",
    options: ["Speed up HTML/CSS coding", "Generate images", "Run database queries", "Render PHP output"],
    correct: 0,
    difficulty: "hard"
  }
];

const dreamweaverQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];

async function migrateDreamweaverQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing Dreamweaver questions
    await Question.deleteMany({ subject: 'Dreamweaver' });
    console.log('Cleared existing Dreamweaver questions');

    const dbQuestions = dreamweaverQuestions.map(q => ({
      subject: 'Dreamweaver',
      subjectName: 'Adobe Dreamweaver',
      question: q.question,
      options: q.options,
      correct: q.correct,
      difficulty: q.difficulty,
      tags: ['dreamweaver', 'web-design', 'adobe', 'html', 'css'],
      analytics: {
        totalAttempts: 0,
        correctAttempts: 0,
        avgTimeSpent: 0
      }
    }));

    await Question.insertMany(dbQuestions);
    console.log(`✓ Migrated ${dbQuestions.length} Dreamweaver questions`);
    console.log(`   - Easy: ${easyQuestions.length} questions`);
    console.log(`   - Medium: ${mediumQuestions.length} questions`);
    console.log(`   - Hard: ${hardQuestions.length} questions`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

migrateDreamweaverQuestions();