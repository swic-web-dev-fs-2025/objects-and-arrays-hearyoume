import COURSE from "./data.js";
import {
  getStudentPercentage,
  getClassAverage,
  addAssignmentToCourse,
} from "./utils.js";

// Test student percentage
const CIS277 = COURSE[0];

// Find Maria and John by name
const maria = CIS277.students.find((student) => student.name === "Maria");
const john = CIS277.students.find((student) => student.name === "John");

console.info(`Maria's percentage: ${getStudentPercentage(CIS277, maria.id)}%`);
console.info(`John's percentage: ${getStudentPercentage(CIS277, john.id)}%`);

// Test class average
console.info(`Class average: ${getClassAverage(CIS277)}%`);

// Test adding assignment
console.info("Adding assignment: Shows original vs new data (immutable)");
const newCourse = addAssignmentToCourse({
  course: CIS277,
  assignmentName: "Project 2",
  maxPoints: 100,
});

console.info("Original assignments for Maria:", maria.assignments);

const newMaria = newCourse.students.find((student) => student.name === "Maria");
console.info("New assignments for Maria:", newMaria.assignments);
