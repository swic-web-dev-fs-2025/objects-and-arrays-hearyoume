const addAssignmentToCourse = ({ course, assignmentName, maxPoints }) => {
  const clonedCOURSE = structuredClone(course);

  const newAssignment = { name: assignmentName, points: null, maxPoints };
  if (!newAssignment.name || !newAssignment.maxPoints) return clonedCOURSE;

  clonedCOURSE.students = clonedCOURSE.students.map((student) => ({
    ...student,
    assignments: [...student.assignments, newAssignment],
  }));

  return clonedCOURSE;
};

const getClassAverage = (course) => {
  return Math.round(
    course.students
      .map(({ id }) => getStudentPercentage(course, id))
      .reduce((sum, percentage) => sum + percentage, 0) / course.students.length
  );
};

const getStudentPercentage = (course, studentId) => {
  const { totalPoints, totalMaxPoints } = course.students
    .find(({ id }) => id === studentId)
    .assignments.reduce(
      (acc, { points = 0, maxPoints }) => ({
        totalPoints: acc.totalPoints + points,
        totalMaxPoints: acc.totalMaxPoints + maxPoints,
      }),
      { totalPoints: 0, totalMaxPoints: 0 }
    );

  return Math.round((totalPoints / totalMaxPoints) * 100);
};

const calculateDiscount = (price, discountPercent) => {
  return price * (discountPercent / 100);
};

// eslint-disable-next-line complexity
const formatGrade = (percentage) => {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  return "F";
};

const isValidScore = (points, maxPoints) => {
  return points >= 0 && points <= maxPoints;
};

const generateStudentId = (firstName, lastName) => {
  // Generate a student ID based on first and last name
  // Lowercase first initial + lowercase last name + random 3-digits
  const randomDigits = Math.floor(100 + Math.random() * 900);
  return `${firstName[0].toLowerCase()}${lastName.toLowerCase()}${randomDigits}`;
};

// eslint-disable-next-line complexity
const calculateLetterGrade = (percentage) => {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  return "F";
};

const findTopStudent = (course) => {
  // Find student with highest percentage in a course
  return course.students.reduce((topStudent, currentStudent) => {
    const getPercentage = (student) => {
      const { totalPoints, totalMaxPoints } = student.assignments.reduce(
        (acc, { pointsEarned = 0, maxPoints }) => ({
          totalPoints: acc.totalPoints + pointsEarned,
          totalMaxPoints: acc.totalMaxPoints + maxPoints,
        }),
        { totalPoints: 0, totalMaxPoints: 0 }
      );
      return totalMaxPoints === 0
        ? 0
        : Math.round((totalPoints / totalMaxPoints) * 100);
    };

    const topPercentage = getPercentage(topStudent);
    const currentPercentage = getPercentage(currentStudent);

    return currentPercentage > topPercentage ? currentStudent : topStudent;
  }, course.students[0]);
};

export {
  getStudentPercentage,
  getClassAverage,
  addAssignmentToCourse,
  formatGrade,
  isValidScore,
  calculateDiscount,
  generateStudentId,
  calculateLetterGrade,
  findTopStudent,
};
