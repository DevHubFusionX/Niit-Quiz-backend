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

async function migratePHPQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing PHP questions
    await Question.deleteMany({ subject: 'PHP' });
    console.log('Cleared existing PHP Programming questions');

    const dbQuestions = phpQuestions.map(q => ({
      subject: 'PHP',
      subjectName: 'PHP Programming',
      question: q.question,
      options: q.options,
      correct: q.correct,
      difficulty: q.difficulty,
      tags: ['PHP', 'Programming'],
      analytics: {
        totalAttempts: 0,
        correctAttempts: 0,
        avgTimeSpent: 0
      }
    }));

    await Question.insertMany(dbQuestions);
    console.log(`✓ Migrated ${dbQuestions.length} PHP Programming questions`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

migratePHPQuestions();