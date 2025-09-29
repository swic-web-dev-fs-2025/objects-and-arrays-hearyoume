import {
  getStudentPercentage,
  getClassAverage,
  addAssignmentToCourse,
} from "./utils.js";

const courses = [
  {
    id: "CS277",
    name: "Web Development",
    students: [
      {
        id: 1,
        name: "Maria",
        assignments: [
          { name: "Project 1", points: 85, maxPoints: 100 },
          { name: "Quiz 1", points: 18, maxPoints: 20 },
        ],
      },
      {
        id: 2,
        name: "John",
        assignments: [
          { name: "Project 1", points: 92, maxPoints: 100 },
          { name: "Quiz 1", points: 19, maxPoints: 20 },
        ],
      },
    ],
  },
];

// Test student percentage
const mariaPercentage = getStudentPercentage({
  courses,
  courseId: "CS277",
  studentId: 1,
});

console.info("Maria's percentage:", mariaPercentage);
const johnPercentage = getStudentPercentage({
  courses,
  courseId: "CS277",
  studentId: 2,
});
console.info("John's percentage:", johnPercentage);

// Test class average
const classAverage = getClassAverage(courses, "CS277");
console.info("Class average:", classAverage);

// Test adding assignment
const updatedGradeBook = addAssignmentToCourse({
  courses,
  courseId: "CS277",
  assignmentName: "Homework 1",
  maxPoints: 50,
});
console.info("Updated gradebook:", updatedGradeBook);

export default courses;
