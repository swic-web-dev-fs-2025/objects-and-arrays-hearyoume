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

export { getStudentPercentage, getClassAverage, addAssignmentToCourse };
