import { describe, it, expect } from "vitest";
import {
  getStudentPercentage,
  getClassAverage,
  addAssignmentToCourse,
} from "./utils.js";
import COURSE from "./data.js";

const CIS277 = COURSE[0];

describe("Student Management Functions", () => {
  it("getStudentPercentage should return the correct percentage for a student", () => {
    const percentage = getStudentPercentage(CIS277, 1); // Use student ID, not name
    expect(percentage).toBe(86);
  });

  it("getClassAverage should return the correct average for the class", () => {
    const average = getClassAverage(CIS277);
    expect(average).toBe(90);
  });

  it("addAssignmentToCourse should add an assignment to the course", () => {
    const updatedCourse = addAssignmentToCourse({
      course: CIS277,
      assignmentName: "Project 2",
      maxPoints: 40,
    });
    // Check that the assignment was added to the first student
    expect(updatedCourse.students[0].assignments).toContainEqual({
      name: "Project 2",
      points: null,
      maxPoints: 40,
    });
  });
});
