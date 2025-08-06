// Kambaz/Assignments/dao.js
import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

// Get assignments for a course
export function findAssignmentsForCourse(courseId) {
  return Database.assignments.filter((a) => a.course === courseId);
}

// Create a new assignment
export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  Database.assignments.push(newAssignment);
  return newAssignment;
}

// Update an assignment by ID
export function updateAssignment(assignmentId, updates) {
  const assignment = Database.assignments.find((a) => a._id === assignmentId);
  Object.assign(assignment, updates);
  return assignment;
}

// Delete an assignment by ID
export function deleteAssignment(assignmentId) {
  Database.assignments = Database.assignments.filter((a) => a._id !== assignmentId);
  return { acknowledged: true };
}
