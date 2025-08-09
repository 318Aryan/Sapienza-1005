import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Clear tables
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    // Insert courses (subjects)
    await db.insert(schema.courses).values([
      { id: 1, title: "Physics", imageSrc: "/physics.svg" },
      { id: 2, title: "Chemistry", imageSrc: "/chemistry.svg" },
      { id: 3, title: "Biology", imageSrc: "/biology.svg" },
      { id: 4, title: "Mathematics", imageSrc: "/maths.svg" },
      { id: 5, title: "Hindi", imageSrc: "/hindi.svg" },
      { id: 6, title: "English", imageSrc: "/english.svg" },
      { id: 7, title: "Commerce", imageSrc: "/commerce.svg" },
    ]);

    // Insert units for each subject
    await db.insert(schema.units).values([
      // Physics
      { id: 1, courseId: 1, title: "Mechanics", description: "Basics of Motion and Force", order: 1 },
      { id: 2, courseId: 1, title: "Heat and Thermodynamics", description: "Heat and temperature concepts", order: 2 },

      // Chemistry
      { id: 3, courseId: 2, title: "Chemical Reactions", description: "Types of reactions", order: 1 },
      { id: 4, courseId: 2, title: "Acids and Bases", description: "Properties and reactions", order: 2 },

      // Biology
      { id: 5, courseId: 3, title: "Cell Biology", description: "Structure and function of cells", order: 1 },
      { id: 6, courseId: 3, title: "Human Anatomy", description: "Body systems basics", order: 2 },

      // Mathematics
      { id: 7, courseId: 4, title: "Algebra", description: "Polynomials and equations", order: 1 },
      { id: 8, courseId: 4, title: "Geometry", description: "Shapes and theorems", order: 2 },

      // Hindi
      { id: 9, courseId: 5, title: "Grammar", description: "Hindi grammar basics", order: 1 },
      { id: 10, courseId: 5, title: "Literature", description: "Stories and poems", order: 2 },

      // English
      { id: 11, courseId: 6, title: "Grammar", description: "English grammar rules", order: 1 },
      { id: 12, courseId: 6, title: "Comprehension", description: "Reading and understanding", order: 2 },

      // Commerce
      { id: 13, courseId: 7, title: "Accounting", description: "Basics of bookkeeping", order: 1 },
      { id: 14, courseId: 7, title: "Economics", description: "Fundamentals of economy", order: 2 },
    ]);

    // Insert lessons (2 per unit for brevity)
    await db.insert(schema.lessons).values([
      // Physics - Mechanics
      { id: 1, unitId: 1, order: 1, title: "Laws of Motion" },
      { id: 2, unitId: 1, order: 2, title: "Work and Energy" },

      // Physics - Heat
      { id: 3, unitId: 2, order: 1, title: "Temperature and Heat" },
      { id: 4, unitId: 2, order: 2, title: "Thermodynamics" },

      // Chemistry - Reactions
      { id: 5, unitId: 3, order: 1, title: "Types of Chemical Reactions" },
      { id: 6, unitId: 3, order: 2, title: "Balancing Equations" },

      // Chemistry - Acids and Bases
      { id: 7, unitId: 4, order: 1, title: "Properties of Acids" },
      { id: 8, unitId: 4, order: 2, title: "Properties of Bases" },

      // Biology - Cell Biology
      { id: 9, unitId: 5, order: 1, title: "Cell Structure" },
      { id: 10, unitId: 5, order: 2, title: "Cell Functions" },

      // Biology - Human Anatomy
      { id: 11, unitId: 6, order: 1, title: "Digestive System" },
      { id: 12, unitId: 6, order: 2, title: "Circulatory System" },

      // Mathematics - Algebra
      { id: 13, unitId: 7, order: 1, title: "Polynomials" },
      { id: 14, unitId: 7, order: 2, title: "Quadratic Equations" },

      // Mathematics - Geometry
      { id: 15, unitId: 8, order: 1, title: "Triangles" },
      { id: 16, unitId: 8, order: 2, title: "Circles" },

      // Hindi - Grammar
      { id: 17, unitId: 9, order: 1, title: "Parts of Speech" },
      { id: 18, unitId: 9, order: 2, title: "Tenses" },

      // Hindi - Literature
      { id: 19, unitId: 10, order: 1, title: "Short Stories" },
      { id: 20, unitId: 10, order: 2, title: "Poems" },

      // English - Grammar
      { id: 21, unitId: 11, order: 1, title: "Verb Tenses" },
      { id: 22, unitId: 11, order: 2, title: "Active and Passive Voice" },

      // English - Comprehension
      { id: 23, unitId: 12, order: 1, title: "Reading Skills" },
      { id: 24, unitId: 12, order: 2, title: "Answering Questions" },

      // Commerce - Accounting
      { id: 25, unitId: 13, order: 1, title: "Basics of Accounting" },
      { id: 26, unitId: 13, order: 2, title: "Journal Entries" },

      // Commerce - Economics
      { id: 27, unitId: 14, order: 1, title: "Demand and Supply" },
      { id: 28, unitId: 14, order: 2, title: "Market Structures" },
    ]);

    // Insert challenges with options (simple questions for each lesson)
    // For brevity, only 1 challenge per lesson here, expand as needed

    await db.insert(schema.challenges).values([
      // Physics - Laws of Motion
      { id: 1, lessonId: 1, type: "SELECT", order: 1, question: "Newton's First Law states that?" },
      // Physics - Work and Energy
      { id: 2, lessonId: 2, type: "SELECT", order: 1, question: "Work is done when a force causes?" },

      // Physics - Temperature and Heat
      { id: 3, lessonId: 3, type: "SELECT", order: 1, question: "Unit of temperature in SI system is?" },
      // Physics - Thermodynamics
      { id: 4, lessonId: 4, type: "SELECT", order: 1, question: "Thermodynamics studies?" },

      // Chemistry - Types of Reactions
      { id: 5, lessonId: 5, type: "SELECT", order: 1, question: "What type of reaction is combustion?" },
      // Chemistry - Balancing Equations
      { id: 6, lessonId: 6, type: "SELECT", order: 1, question: "To balance chemical equations, you change?" },

      // Chemistry - Properties of Acids
      { id: 7, lessonId: 7, type: "SELECT", order: 1, question: "Acids turn blue litmus paper to?" },
      // Chemistry - Properties of Bases
      { id: 8, lessonId: 8, type: "SELECT", order: 1, question: "Bases feel?" },

      // Biology - Cell Structure
      { id: 9, lessonId: 9, type: "SELECT", order: 1, question: "The control center of a cell is?" },
      // Biology - Cell Functions
      { id: 10, lessonId: 10, type: "SELECT", order: 1, question: "Mitochondria are known as?" },

      // Biology - Digestive System
      { id: 11, lessonId: 11, type: "SELECT", order: 1, question: "Where does digestion start?" },
      // Biology - Circulatory System
      { id: 12, lessonId: 12, type: "SELECT", order: 1, question: "The human heart has how many chambers?" },

      // Mathematics - Polynomials
      { id: 13, lessonId: 13, type: "SELECT", order: 1, question: "A polynomial of degree 2 is called?" },
      // Mathematics - Quadratic Equations
      { id: 14, lessonId: 14, type: "SELECT", order: 1, question: "The quadratic formula solves equations of degree?" },

      // Mathematics - Triangles
      { id: 15, lessonId: 15, type: "SELECT", order: 1, question: "The sum of angles in a triangle is?" },
      // Mathematics - Circles
      { id: 16, lessonId: 16, type: "SELECT", order: 1, question: "The diameter of a circle is?" },

      // Hindi - Parts of Speech
      { id: 17, lessonId: 17, type: "SELECT", order: 1, question: "संज्ञा किसे कहते हैं?" },
      // Hindi - Tenses
      { id: 18, lessonId: 18, type: "SELECT", order: 1, question: "वर्तमान काल क्या है?" },

      // Hindi - Short Stories
      { id: 19, lessonId: 19, type: "SELECT", order: 1, question: "‘नीलू की दादी’ किसने लिखा?" },
      // Hindi - Poems
      { id: 20, lessonId: 20, type: "SELECT", order: 1, question: "‘मधुशाला’ के लेखक कौन हैं?" },

      // English - Verb Tenses
      { id: 21, lessonId: 21, type: "SELECT", order: 1, question: "Past tense of ‘go’ is?" },
      // English - Active and Passive Voice
      { id: 22, lessonId: 22, type: "SELECT", order: 1, question: "Passive voice of ‘She writes a letter’ is?" },

      // English - Reading Skills
      { id: 23, lessonId: 23, type: "SELECT", order: 1, question: "What is the main idea of a passage?" },
      // English - Answering Questions
      { id: 24, lessonId: 24, type: "SELECT", order: 1, question: "How to find answers in the text?" },

      // Commerce - Basics of Accounting
      { id: 25, lessonId: 25, type: "SELECT", order: 1, question: "Accounting is the process of?" },
      // Commerce - Journal Entries
      { id: 26, lessonId: 26, type: "SELECT", order: 1, question: "Debit entry increases which account?" },

      // Commerce - Demand and Supply
      { id: 27, lessonId: 27, type: "SELECT", order: 1, question: "Law of demand states that?" },
      // Commerce - Market Structures
      { id: 28, lessonId: 28, type: "SELECT", order: 1, question: "Monopoly means?" },
    ]);

    // Insert options for all challenges (one correct + two incorrect per question)
    await db.insert(schema.challengeOptions).values([
      // 1
      { challengeId: 1, text: "An object remains at rest or in uniform motion unless acted upon by a force", correct: true },
      { challengeId: 1, text: "For every action, there is an equal and opposite reaction", correct: false },
      { challengeId: 1, text: "Force equals mass times acceleration", correct: false },

      // 2
      { challengeId: 2, text: "Displacement", correct: false },
      { challengeId: 2, text: "Movement without force", correct: false },
      { challengeId: 2, text: "Displacement in direction of force", correct: true },

      // 3
      { challengeId: 3, text: "Celsius", correct: true },
      { challengeId: 3, text: "Kelvin", correct: false },
      { challengeId: 3, text: "Fahrenheit", correct: false },

      // 4
      { challengeId: 4, text: "Heat and work", correct: true },
      { challengeId: 4, text: "Electricity", correct: false },
      { challengeId: 4, text: "Light and sound", correct: false },

      // 5
      { challengeId: 5, text: "Exothermic", correct: true },
      { challengeId: 5, text: "Endothermic", correct: false },
      { challengeId: 5, text: "Neutralisation", correct: false },

      // 6
      { challengeId: 6, text: "Coefficients", correct: true },
      { challengeId: 6, text: "Subscripts", correct: false },
      { challengeId: 6, text: "Elements", correct: false },

      // 7
      { challengeId: 7, text: "Red", correct: false },
      { challengeId: 7, text: "Blue", correct: true },
      { challengeId: 7, text: "Green", correct: false },

      // 8
      { challengeId: 8, text: "Slippery", correct: true },
      { challengeId: 8, text: "Sticky", correct: false },
      { challengeId: 8, text: "Rough", correct: false },

      // 9
      { challengeId: 9, text: "Nucleus", correct: true },
      { challengeId: 9, text: "Mitochondria", correct: false },
      { challengeId: 9, text: "Ribosome", correct: false },

      // 10
      { challengeId: 10, text: "Powerhouse of the cell", correct: true },
      { challengeId: 10, text: "Control center", correct: false },
      { challengeId: 10, text: "Protein factory", correct: false },

      // 11
      { challengeId: 11, text: "Mouth", correct: true },
      { challengeId: 11, text: "Stomach", correct: false },
      { challengeId: 11, text: "Esophagus", correct: false },

      // 12
      { challengeId: 12, text: "4", correct: true },
      { challengeId: 12, text: "2", correct: false },
      { challengeId: 12, text: "3", correct: false },

      // 13
      { challengeId: 13, text: "Quadratic polynomial", correct: true },
      { challengeId: 13, text: "Linear polynomial", correct: false },
      { challengeId: 13, text: "Constant polynomial", correct: false },

      // 14
      { challengeId: 14, text: "2", correct: true },
      { challengeId: 14, text: "3", correct: false },
      { challengeId: 14, text: "1", correct: false },

      // 15
      { challengeId: 15, text: "180 degrees", correct: true },
      { challengeId: 15, text: "360 degrees", correct: false },
      { challengeId: 15, text: "90 degrees", correct: false },

      // 16
      { challengeId: 16, text: "Twice the radius", correct: true },
      { challengeId: 16, text: "Half the radius", correct: false },
      { challengeId: 16, text: "Equal to circumference", correct: false },

      // 17
      { challengeId: 17, text: "नाम", correct: true },
      { challengeId: 17, text: "क्रिया", correct: false },
      { challengeId: 17, text: "विशेषण", correct: false },

      // 18
      { challengeId: 18, text: "जो अभी हो रहा है", correct: true },
      { challengeId: 18, text: "जो पहले हुआ", correct: false },
      { challengeId: 18, text: "जो भविष्य में होगा", correct: false },

      // 19
      { challengeId: 19, text: "रमेश पोखरियाल", correct: true },
      { challengeId: 19, text: "महादेवी वर्मा", correct: false },
      { challengeId: 19, text: "सुमित्रानंदन पंत", correct: false },

      // 20
      { challengeId: 20, text: "हरिवंश राय बच्चन", correct: true },
      { challengeId: 20, text: "रामधारी सिंह दिनकर", correct: false },
      { challengeId: 20, text: "सुमित्रानंदन पंत", correct: false },

      // 21
      { challengeId: 21, text: "Went", correct: true },
      { challengeId: 21, text: "Go", correct: false },
      { challengeId: 21, text: "Gone", correct: false },

      // 22
      { challengeId: 22, text: "A letter is written by her", correct: true },
      { challengeId: 22, text: "She is writing a letter", correct: false },
      { challengeId: 22, text: "She wrote a letter", correct: false },

      // 23
      { challengeId: 23, text: "Central thought", correct: true },
      { challengeId: 23, text: "First sentence", correct: false },
      { challengeId: 23, text: "Last sentence", correct: false },

      // 24
      { challengeId: 24, text: "Look for keywords", correct: true },
      { challengeId: 24, text: "Guess the answer", correct: false },
      { challengeId: 24, text: "Skip the question", correct: false },

      // 25
      { challengeId: 25, text: "Recording financial transactions", correct: true },
      { challengeId: 25, text: "Making profit", correct: false },
      { challengeId: 25, text: "Buying goods", correct: false },

      // 26
      { challengeId: 26, text: "Asset account", correct: true },
      { challengeId: 26, text: "Liability account", correct: false },
      { challengeId: 26, text: "Expense account", correct: false },

      // 27
      { challengeId: 27, text: "Demand decreases as price increases", correct: true },
      { challengeId: 27, text: "Demand increases as price increases", correct: false },
      { challengeId: 27, text: "Demand is constant", correct: false },

      // 28
      { challengeId: 28, text: "Single seller market", correct: true },
      { challengeId: 28, text: "Many sellers market", correct: false },
      { challengeId: 28, text: "Government controlled market", correct: false },
    ]);

    console.log("Seeding completed!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main();
