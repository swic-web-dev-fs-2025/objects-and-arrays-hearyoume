import { describe, it, expect } from "vitest";
import {
  getStudentPercentage,
  getClassAverage,
  addAssignmentToCourse,
  formatGrade,
  isValidScore,
  calculateDiscount,
  generateStudentId,
  calculateLetterGrade,
  findTopStudent,
} from "./utils.js";
import COURSE from "./data.js";

// Use real data for most tests
const CIS277 = COURSE[0];

// Main describe block split into smaller blocks

// eslint-disable-next-line max-lines-per-function
describe("getStudentPercentage", () => {
  it("should calculate the correct percentage for a student", () => {
    const percentage = getStudentPercentage(CIS277, 1);
    expect(percentage).toBe(86);
    expect(percentage).toBeGreaterThan(0);
    expect(percentage).toBeLessThanOrEqual(100);
  });

  it("should handle student with zero points", () => {
    const testCourse = {
      ...CIS277,
      students: [
        {
          id: 99,
          name: "Test Student",
          assignments: [{ name: "Test", points: 0, maxPoints: 100 }],
        },
      ],
    };
    expect(getStudentPercentage(testCourse, 99)).toBe(0);
  });

  it("should handle perfect score", () => {
    const testCourse = {
      ...CIS277,
      students: [
        {
          id: 100,
          name: "Perfect Student",
          assignments: [{ name: "Test", points: 100, maxPoints: 100 }],
        },
      ],
    };
    expect(getStudentPercentage(testCourse, 100)).toBe(100);
  });

  it("should handle non-existent student", () => {
    expect(() => getStudentPercentage(CIS277, 999)).toThrow();
  });
});

it("calculates Maria's percentage correctly", () => {
  const maria = CIS277.students.find(({ name }) => name === "Maria");
  const percentage = getStudentPercentage(CIS277, maria.id);
  expect(percentage).toBe(86);
});

it("calculates John's percentage correctly", () => {
  const john = CIS277.students.find(({ name }) => name === "John");
  const percentage = getStudentPercentage(CIS277, john.id);
  expect(percentage).toBe(93);
});

describe("getClassAverage", () => {
  it("should calculate the correct average for the class", () => {
    const average = getClassAverage(CIS277);
    expect(average).toBe(90);
    expect(average).toBeGreaterThan(0);
    expect(average).toBeLessThanOrEqual(100);
  });

  it("should handle single student", () => {
    const singleStudentCourse = {
      ...CIS277,
      students: [CIS277.students[0]],
    };
    expect(getClassAverage(singleStudentCourse)).toBe(86);
  });
});

// eslint-disable-next-line max-lines-per-function
describe("addAssignmentToCourse", () => {
  it("should add an assignment to the course", () => {
    const updatedCourse = addAssignmentToCourse({
      course: CIS277,
      assignmentName: "Project 2",
      maxPoints: 40,
    });
    expect(updatedCourse.students[0].assignments).toContainEqual({
      name: "Project 2",
      points: null,
      maxPoints: 40,
    });
  });

  it("should return unchanged course when missing name", () => {
    const result = addAssignmentToCourse({
      course: CIS277,
      assignmentName: "",
      maxPoints: 50,
    });
    expect(result).toEqual(CIS277);
  });

  it("should return unchanged course when missing maxPoints", () => {
    const result = addAssignmentToCourse({
      course: CIS277,
      assignmentName: "Valid Name",
      maxPoints: null,
    });
    expect(result).toEqual(CIS277);
  });

  it("should not mutate original course", () => {
    const originalStudentCount = CIS277.students[0].assignments.length;
    addAssignmentToCourse({
      course: CIS277,
      assignmentName: "Test Assignment",
      maxPoints: 50,
    });
    expect(CIS277.students[0].assignments.length).toBe(originalStudentCount);
  });
});

describe("formatGrade", () => {
  it("should return 'A' for percentages equal to or above 90", () => {
    expect(formatGrade(95)).toBe("A");
    expect(formatGrade(90)).toBe("A");
  });

  it("should return 'B' for percentages between 80 and 89", () => {
    expect(formatGrade(85)).toBe("B");
    expect(formatGrade(80)).toBe("B");
  });

  it("should return 'C' for percentages between 70 and 79", () => {
    expect(formatGrade(75)).toBe("C");
    expect(formatGrade(70)).toBe("C");
  });

  it("should return 'D' for percentages between 60 and 69", () => {
    expect(formatGrade(65)).toBe("D");
    expect(formatGrade(60)).toBe("D");
  });

  it("should return 'F' for percentages below 60", () => {
    expect(formatGrade(59)).toBe("F");
    expect(formatGrade(0)).toBe("F");
  });
});

describe("isValidScore", () => {
  it("should return true for valid scores", () => {
    expect(isValidScore(50, 100)).toBe(true);
    expect(isValidScore(0, 100)).toBe(true);
    expect(isValidScore(100, 100)).toBe(true);
  });
});

describe("calculateDiscount", () => {
  it("should calculate the discounted price correctly", () => {
    expect(calculateDiscount(100, 20)).toBe(20);
    expect(calculateDiscount(50, 10)).toBe(5);
    expect(calculateDiscount(200, 50)).toBe(100);
  });
});

describe("generateStudentId", () => {
  it("should generate student ID correctly", () => {
    const id = generateStudentId("John", "Smith");
    expect(id).toMatch(/^jsmith\d{3}$/); // Pattern: jsmith + 3 digits
  });
});

describe("calculateLetterGrade", () => {
  it("should calculate letter grades correctly", () => {
    expect(calculateLetterGrade(95)).toBe("A");
    expect(calculateLetterGrade(85)).toBe("B");
    expect(calculateLetterGrade(75)).toBe("C");
    expect(calculateLetterGrade(65)).toBe("D");
    expect(calculateLetterGrade(55)).toBe("F");
  });
});

describe("findTopStudent", () => {
  it("should find student with highest percentage", () => {
    const testCourse = {
      students: [
        { name: "Alice", assignments: [{ maxPoints: 100, pointsEarned: 85 }] },
        { name: "Bob", assignments: [{ maxPoints: 100, pointsEarned: 95 }] },
        {
          name: "Charlie",
          assignments: [{ maxPoints: 100, pointsEarned: 75 }],
        },
      ],
    };
    const topStudent = findTopStudent(testCourse);
    expect(topStudent.name).toBe("Bob");
  });
});
