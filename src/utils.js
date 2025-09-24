const getStudentPercentage = ({ courses, courseId, studentId }) => {
  const course = courses.find(({ id }) => id === courseId);
  if (!course) return 0;

  const student = course.students.find(({ id }) => id === studentId);
  if (!student) return 0;

  const { totalPoints, totalMaxPoints } = student.assignments.reduce(
    (acc, { points = 0, maxPoints }) => ({
      totalPoints: acc.totalPoints + points,
      totalMaxPoints: acc.totalMaxPoints + maxPoints,
    }),
    { totalPoints: 0, totalMaxPoints: 0 }
  );

  return Math.round((totalPoints / totalMaxPoints) * 100);
};

const getClassAverage = (courses, courseId) => {
  const foundCourse = courses.find(({ id }) => id === courseId);
  if (!foundCourse) return 0;

  const totalStudents = foundCourse.students.length;
  if (totalStudents === 0) return 0;

  return Math.round(
    foundCourse.students
      .map(({ id }) =>
        getStudentPercentage({ courses, courseId, studentId: id })
      )
      .reduce((sum, percentage) => sum + percentage, 0) / totalStudents
  );
};

const addAssignment = ({ courses, courseId, assignmentName, maxPoints }) => {
  const clonedCOURSES = structuredClone(courses);

  const foundCourse = clonedCOURSES.find(({ id }) => id === courseId);
  if (!foundCourse) return clonedCOURSES;

  const newAssignment = { name: assignmentName, points: null, maxPoints };
  if (!newAssignment.name || !newAssignment.maxPoints) return clonedCOURSES;

  foundCourse.students = foundCourse.students.map((student) => ({
    ...student,
    assignments: [...student.assignments, newAssignment],
  }));

  return clonedCOURSES;
};

export { getStudentPercentage, getClassAverage, addAssignment };
