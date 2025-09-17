const gradeBook = {
  courses: [
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
  ],
};

// TODO: Calculate student's percentage in a course
const getStudentPercentage = (courseId, studentId) => {
  // Your implementation here
  // Should return percentage (0-100) based on assignments
  const course = gradeBook.courses.find((cs) => cs.id === courseId);
  if (!course) return null;

  const student = course.students.find((st) => st.id === studentId);
  if (!student) return null;

  // Only include assignments that have a valid numeric score
  const gradedAssignments = student.assignments.filter(
    (assignment) =>
      typeof assignment.points === "number" &&
      typeof assignment.maxPoints === "number"
  );

  if (gradedAssignments.length === 0) return null;

  const totalPoints = student.assignments.reduce(
    (sum, assign) => sum + assign.points,
    0
  );
  const totalMaxPoints = student.assignments.reduce(
    (sum, assign) => sum + assign.maxPoints,
    0
  );

  return (totalPoints / totalMaxPoints) * 100;
};

// TODO: Get class average for a course
const getClassAverage = (courseId) => {
  // Your implementation here
  // Should return average percentage for all students
  const course = gradeBook.courses.find((cs) => cs.id === courseId);
  if (!course) return null;

  // Filter out students who have no assignments
  const validStudents = course.students.filter(
    (student) => student.assignments.length > 0
  );

  if (validStudents.length === 0) return null;

  const totalPercentages = validStudents.reduce((sum, student) => {
    const studentPercentage = getStudentPercentage(courseId, student.id);
    return typeof studentPercentage === "number"
      ? sum + studentPercentage
      : sum;
  }, 0);

  return totalPercentages / validStudents.length;
};

// TODO: Add new assignment to all students (immutably!)
const addAssignment = ({ courseId, assignmentName, maxPoints }) => {
  // Return a new gradeBook object with the assignment added to all students in the course
  return {
    ...gradeBook,
    courses: gradeBook.courses.map((course) => {
      if (course.id !== courseId) return course;

      return {
        ...course,
        students: course.students.map((student) => ({
          ...student,
          assignments: [
            ...student.assignments,
            {
              name: assignmentName,
              maxPoints,
              points: null, // placeholder until graded
            },
          ],
        })),
      };
    }),
  };
};

// Test your implementations
console.info("=== Grade Book Testing ===");

// Test student percentage
const mariaPercentage = getStudentPercentage("CS277", 1);
console.info("Maria's percentage:", mariaPercentage.toFixed(2));

// Test class average
const classAverage = getClassAverage("CS277");
console.info("Class average:", classAverage.toFixed(2));

// Test adding assignment
const updatedGradeBook = addAssignment({
  courseId: "CS277",
  assignmentName: "Homework 1",
  maxPoints: 50,
});
console.info("Updated gradebook:", updatedGradeBook);
