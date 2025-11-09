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

const pltQuestions = [
  {
    id: 1,
    question: "What is the main purpose of programming logic?",
    options: ["To write code faster", "To solve problems systematically", "To memorize syntax", "To design user interfaces"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 2,
    question: "Which of the following best defines an algorithm?",
    options: ["A flowchart diagram", "A step-by-step procedure to solve a problem", "A programming language", "A debugging tool"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 3,
    question: "What is pseudocode?",
    options: ["Code written in assembly language", "A simplified description of a program logic", "An executable program", "A syntax of a real language"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 4,
    question: "Which of these symbols represents a decision in a flowchart?",
    options: ["Rectangle", "Parallelogram", "Diamond", "Circle"],
    correct: 2,
    difficulty: "easy"
  },
  {
    id: 5,
    question: "Which control structure is used for making choices?",
    options: ["Sequence", "Selection", "Repetition", "Function"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 6,
    question: "Which data type stores true or false values?",
    options: ["Integer", "Character", "Boolean", "Float"],
    correct: 2,
    difficulty: "easy"
  },
  {
    id: 7,
    question: "Which control structure repeats a set of statements multiple times?",
    options: ["Selection", "Sequence", "Loop", "Condition"],
    correct: 2,
    difficulty: "easy"
  },
  {
    id: 8,
    question: "Which keyword is commonly used for decision making in many programming languages?",
    options: ["for", "if", "loop", "print"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 9,
    question: "What is a variable in programming?",
    options: ["A reserved word", "A storage location for data", "A compiler command", "A syntax error"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 10,
    question: "Which shape is used to represent input/output in a flowchart?",
    options: ["Diamond", "Rectangle", "Parallelogram", "Circle"],
    correct: 2,
    difficulty: "easy"
  },
  {
    id: 11,
    question: "What is the main purpose of using flowcharts?",
    options: ["To represent program logic visually", "To execute code faster", "To replace programming languages", "To debug syntax errors"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 12,
    question: "What is the difference between syntax error and logical error?",
    options: ["Syntax error stops code execution, logical error gives wrong output", "Both are the same", "Logical errors crash the program", "Syntax errors are ignored"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 13,
    question: "Which of the following best defines iteration?",
    options: ["A decision-making step", "Repeating steps until a condition is met", "Declaring variables", "Compiling code"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 14,
    question: "Which statement allows a program to make a choice between alternatives?",
    options: ["Assignment statement", "Conditional statement", "Loop statement", "Declaration statement"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 15,
    question: "What is the output of an algorithm that finds the largest of three numbers?",
    options: ["The sum of the numbers", "The smallest number", "The highest number", "The average number"],
    correct: 2,
    difficulty: "medium"
  },
  {
    id: 16,
    question: "Which control structure ensures that a block of code is executed at least once?",
    options: ["for loop", "while loop", "do-while loop", "if statement"],
    correct: 2,
    difficulty: "medium"
  },
  {
    id: 17,
    question: "Which operator is used for comparison in most programming languages?",
    options: ["=", "==", "++", "--"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 18,
    question: "What does 'debugging' mean?",
    options: ["Running the program", "Finding and fixing errors in the code", "Compiling the code", "Designing algorithms"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 19,
    question: "Which of the following represents a valid variable name?",
    options: ["2value", "value_2", "@value", "value-2"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 20,
    question: "What is an algorithm's input-output relationship called?",
    options: ["Mapping", "Logic flow", "Process", "Iteration"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 21,
    question: "What is the main difference between structured and unstructured programming?",
    options: ["Structured uses functions and loops, unstructured uses goto statements", "Unstructured is faster", "Structured has no syntax", "Unstructured has better readability"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 22,
    question: "What is a dry run in programming logic?",
    options: ["Running a program without output", "Manually simulating code execution to trace logic", "Testing with data", "Optimizing a program"],
    correct: 1,
    difficulty: "hard"
  },
  {
    id: 23,
    question: "Which part of an algorithm defines how it should terminate?",
    options: ["Initialization", "Condition", "Iteration", "Syntax"],
    correct: 1,
    difficulty: "hard"
  },
  {
    id: 24,
    question: "What is a flowchart connector used for?",
    options: ["To connect two parts of a flowchart on the same page", "To indicate data storage", "To show decision-making", "To define output"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 25,
    question: "Which approach divides a large problem into smaller subproblems?",
    options: ["Iterative approach", "Modular approach", "Sequential approach", "Static approach"],
    correct: 1,
    difficulty: "hard"
  },
  {
    id: 26,
    question: "What is a sentinel value used for in loops?",
    options: ["To mark the end of data input", "To control syntax rules", "To speed up execution", "To define data type"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 27,
    question: "What is recursion in programming logic?",
    options: ["Repeating a task manually", "A function calling itself", "Using nested loops", "Using multiple conditions"],
    correct: 1,
    difficulty: "hard"
  },
  {
    id: 28,
    question: "What is the difference between compilation and interpretation?",
    options: ["Compilation converts entire code, interpretation executes line by line", "Interpretation is faster", "Compilation skips errors", "They are identical"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 29,
    question: "What does time complexity measure?",
    options: ["Program length", "Execution time with input size", "Memory size", "Loop count"],
    correct: 1,
    difficulty: "hard"
  },
  {
    id: 30,
    question: "What is algorithm optimization?",
    options: ["Making an algorithm faster or more efficient", "Writing pseudocode", "Testing output", "Debugging"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 31,
    question: "What is the time complexity of linear search?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correct: 2,
    difficulty: "medium"
  },
  {
    id: 32,
    question: "Which data structure follows FIFO principle?",
    options: ["Stack", "Queue", "Array", "Tree"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 33,
    question: "What is a constant in programming?",
    options: ["A variable that changes", "A fixed value that cannot be changed", "A loop counter", "A function parameter"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 34,
    question: "Which sorting algorithm has O(n²) worst-case complexity?",
    options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"],
    correct: 2,
    difficulty: "medium"
  },
  {
    id: 35,
    question: "What is the purpose of comments in code?",
    options: ["To execute faster", "To explain code logic", "To reduce file size", "To prevent errors"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 36,
    question: "What is a nested loop?",
    options: ["A loop inside another loop", "A broken loop", "A loop with no condition", "A loop that runs once"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 37,
    question: "Which of the following is a logical operator?",
    options: ["+", "-", "AND", "*"],
    correct: 2,
    difficulty: "easy"
  },
  {
    id: 38,
    question: "What is the purpose of initialization in a loop?",
    options: ["To end the loop", "To set starting values", "To check conditions", "To increment values"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 39,
    question: "Which flowchart symbol represents the start/end of a program?",
    options: ["Rectangle", "Diamond", "Oval", "Parallelogram"],
    correct: 2,
    difficulty: "easy"
  },
  {
    id: 40,
    question: "What is a counter in programming?",
    options: ["A variable that counts iterations", "A syntax error", "A data type", "A function"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 41,
    question: "Which of these is NOT a programming construct?",
    options: ["Sequence", "Selection", "Iteration", "Compilation"],
    correct: 3,
    difficulty: "medium"
  },
  {
    id: 42,
    question: "What is the difference between = and == operators?",
    options: ["= assigns, == compares", "Both are same", "== assigns, = compares", "Both are invalid"],
    correct: 0,
    difficulty: "medium"
  },
  {
    id: 43,
    question: "What is an infinite loop?",
    options: ["A loop that never starts", "A loop that never ends", "A loop with errors", "A loop that runs once"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 44,
    question: "Which data type stores whole numbers?",
    options: ["Float", "Integer", "Character", "Boolean"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 45,
    question: "What is the purpose of a condition in a loop?",
    options: ["To start the loop", "To control when the loop stops", "To increment variables", "To declare variables"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 46,
    question: "Which symbol connects different parts of a flowchart?",
    options: ["Arrow", "Rectangle", "Diamond", "Circle"],
    correct: 0,
    difficulty: "easy"
  },
  {
    id: 47,
    question: "What is modular programming?",
    options: ["Writing code in modules/functions", "Using only loops", "Avoiding functions", "Writing in one block"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 48,
    question: "Which of these represents good programming practice?",
    options: ["No comments", "Meaningful variable names", "Complex logic", "No indentation"],
    correct: 1,
    difficulty: "medium"
  },
  {
    id: 49,
    question: "What is a trace table used for?",
    options: ["To track variable values during execution", "To draw flowcharts", "To write code", "To compile programs"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 50,
    question: "Which loop structure checks condition at the beginning?",
    options: ["do-while", "while", "for", "Both B and C"],
    correct: 3,
    difficulty: "medium"
  },
  {
    id: 51,
    question: "What is the scope of a variable?",
    options: ["Its data type", "Where it can be accessed", "Its value", "Its name"],
    correct: 1,
    difficulty: "hard"
  },
  {
    id: 52,
    question: "Which of these is a selection structure?",
    options: ["for loop", "while loop", "if-else", "sequence"],
    correct: 2,
    difficulty: "easy"
  },
  {
    id: 53,
    question: "What is stepwise refinement?",
    options: ["Breaking down problems into smaller steps", "Optimizing code", "Testing programs", "Debugging errors"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 54,
    question: "Which operator has highest precedence?",
    options: ["Addition", "Multiplication", "Parentheses", "Subtraction"],
    correct: 2,
    difficulty: "medium"
  },
  {
    id: 55,
    question: "What is a flag variable?",
    options: ["A variable that signals a condition", "An error variable", "A constant", "A loop counter"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 56,
    question: "Which of these improves code readability?",
    options: ["Proper indentation", "Meaningful names", "Comments", "All of the above"],
    correct: 3,
    difficulty: "medium"
  },
  {
    id: 57,
    question: "What is the purpose of desk checking?",
    options: ["To manually verify algorithm logic", "To run the program", "To write code", "To design interfaces"],
    correct: 0,
    difficulty: "hard"
  },
  {
    id: 58,
    question: "Which structure allows code to be executed based on conditions?",
    options: ["Sequence", "Selection", "Iteration", "Declaration"],
    correct: 1,
    difficulty: "easy"
  },
  {
    id: 59,
    question: "What is algorithm efficiency?",
    options: ["How fast an algorithm runs", "How much memory it uses", "Both time and space complexity", "How readable it is"],
    correct: 2,
    difficulty: "hard"
  },
  {
    id: 60,
    question: "Which approach helps in problem-solving?",
    options: ["Top-down design", "Bottom-up design", "Divide and conquer", "All of the above"],
    correct: 3,
    difficulty: "hard"
  }
];

async function migratePLTQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing PLT questions
    await Question.deleteMany({ subject: 'PLT' });
    console.log('Cleared existing Programming Logic & Techniques questions');

    const dbQuestions = pltQuestions.map(q => ({
      subject: 'PLT',
      subjectName: 'Programming Logic & Techniques',
      question: q.question,
      options: q.options,
      correct: q.correct,
      difficulty: q.difficulty,
      tags: ['Programming Logic'],
      analytics: {
        totalAttempts: 0,
        correctAttempts: 0,
        avgTimeSpent: 0
      }
    }));

    await Question.insertMany(dbQuestions);
    console.log(`✓ Migrated ${dbQuestions.length} Programming Logic & Techniques questions`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

migratePLTQuestions();