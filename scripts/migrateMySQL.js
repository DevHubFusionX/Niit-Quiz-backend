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

async function migrateMySQLQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing MySQL questions
    await Question.deleteMany({ subject: 'MySQL' });
    console.log('Cleared existing MySQL Database questions');

    const dbQuestions = mysqlQuestions.map(q => ({
      subject: 'MySQL',
      subjectName: 'MySQL Database',
      question: q.question,
      options: q.options,
      correct: q.correct,
      difficulty: q.difficulty,
      tags: ['Database', 'SQL'],
      analytics: {
        totalAttempts: 0,
        correctAttempts: 0,
        avgTimeSpent: 0
      }
    }));

    await Question.insertMany(dbQuestions);
    console.log(`✓ Migrated ${dbQuestions.length} MySQL Database questions`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

migrateMySQLQuestions();