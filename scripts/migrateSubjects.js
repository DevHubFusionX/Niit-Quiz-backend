const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const subjectSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  color: { type: String, required: true },
  icon: { type: String, required: true },
  description: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);

const subjects = [
  {
    code: "WebDev",
    name: "Introduction to Web Development",
    color: "bg-green-500",
    icon: "🌐",
    description: "Learn the fundamentals of web development"
  },
  {
    code: "PLT",
    name: "Programming Logic & Techniques",
    color: "bg-blue-500",
    icon: "💻",
    description: "Master programming logic and problem-solving techniques"
  },
  {
    code: "MySQL",
    name: "MySQL Database",
    color: "bg-orange-500",
    icon: "🗄️",
    description: "Database management with MySQL"
  },
  {
    code: "PHP",
    name: "PHP Programming",
    color: "bg-indigo-500",
    icon: "🐘",
    description: "Server-side programming with PHP"
  },
  {
    code: "Dreamweaver",
    name: "Dreamweaver",
    color: "bg-purple-500",
    icon: "🎨",
    description: "Web design with Adobe Dreamweaver"
  },
  {
    code: "IWCD",
    name: "Internet & Web Client Development",
    color: "bg-teal-500",
    icon: "💻",
    description: "Client-side web development technologies"
  }
];

async function migrateSubjects() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Subject.deleteMany({});
    console.log('Cleared existing subjects');

    await Subject.insertMany(subjects);
    console.log(`Migrated ${subjects.length} subjects successfully`);

    await mongoose.disconnect();
    console.log('Migration completed');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  migrateSubjects();
}

module.exports = migrateSubjects;