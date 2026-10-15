// IMPORTANT: options ke text backend ke "answer" se EXACT match hone chahiye
// (testController.js me jo answer likhe hain). Correct answer frontend me nahi rakha.
export const DURATION_MS = 30 * 60 * 1000; // 30 minutes

export const SECTIONS = ["Aptitude", "Reasoning", "English"];

export const QUESTIONS = [
  // Aptitude
  { category: "Aptitude", q: "What is 25% of 480?", options: ["96", "120", "140", "150"] },
  { category: "Aptitude", q: "A train travels 60 km in 1 hour. How far will it travel in 2.5 hours?", options: ["120", "140", "150", "160"] },
  { category: "Aptitude", q: "Next number in the series: 2, 4, 8, 16, ?", options: ["24", "30", "32", "64"] },
  { category: "Aptitude", q: "Speed is 72 km/h. What distance is covered in 25 seconds?", options: ["400m", "500m", "600m", "720m"] },
  { category: "Aptitude", q: "Solve: x² − 9x + 20 = 0", options: ["4, 5", "3, 6", "2, 10", "-4, -5"] },
  { category: "Aptitude", q: "Square of 12?", options: ["124", "132", "144", "156"] },
  { category: "Aptitude", q: "5 workers finish a job in 10 days. In how many days will 10 workers finish it?", options: ["2", "5", "10", "20"] },
  { category: "Aptitude", q: "Series: 2, 6, 12, 20, 30, ?", options: ["40", "42", "44", "48"] },
  { category: "Aptitude", q: "A 10% discount is given on ₹500. What is the selling price?", options: ["400", "450", "475", "490"] },
  { category: "Aptitude", q: "√x = 7. What is x?", options: ["14", "21", "49", "343"] },
  // Reasoning
  { category: "Reasoning", q: "Missing number: 5, 11, 23, 47, ?", options: ["71", "85", "95", "101"] },
  { category: "Reasoning", q: "Which one is the odd one out?", options: ["Circle", "Square", "Triangle", "Cube"] },
  { category: "Reasoning", q: "Series: 3, 6, 9, 12, ?", options: ["13", "14", "15", "18"] },
  { category: "Reasoning", q: "Which day comes 5 days after Monday?", options: ["Friday", "Saturday", "Sunday", "Thursday"] },
  {
    category: "Reasoning",
    q: "All programmers are gamers. Some gamers are students. Which conclusion follows?",
    options: ["All students are programmers", "Some programmers may be gamers", "No programmer is a student", "All gamers are programmers"],
  },
  { category: "Reasoning", q: "What is the mirror image of the time 3:25?", options: ["8:35", "9:35", "8:25", "3:35"] },
  { category: "Reasoning", q: "If A=1, B=2, C=3, then CAB = ?", options: ["123", "312", "321", "132"] },
  { category: "Reasoning", q: "What is the mirror image of the word LEFT?", options: ["TFEL", "LEFT", "FELT", "TLEF"] },
  // English
  { category: "English", q: "Choose the correct spelling.", options: ["Recieve", "Receive", "Receeve", "Receve"] },
  { category: "English", q: "Synonym of “Happy”?", options: ["Sad", "Angry", "Joyful", "Tired"] },
  { category: "English", q: "Choose the correct sentence.", options: ["He don't know", "He doesn't know", "He not know", "He doesn't knows"] },
  { category: "English", q: "Fill in the blank: She ___ going to school.", options: ["am", "is", "are", "be"] },
  { category: "English", q: "Choose the correct sentence (simple present).", options: ["He go", "He goes", "He going", "He gone"] },
  { category: "English", q: "Meaning of “Honest”?", options: ["Lazy", "Truthful", "Clever", "Rude"] },
  { category: "English", q: "Plural of “Child”?", options: ["Childs", "Childes", "Children", "Childrens"] },
];

export const SECTION_TOTALS = SECTIONS.reduce((acc, s) => {
  acc[s] = QUESTIONS.filter((q) => q.category === s).length;
  return acc;
}, {});
