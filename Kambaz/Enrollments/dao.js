// dao/enrollmentsDao.js
import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function getAllEnrollments(filter = {}) {
  const { enrollments } = Database;
  let results = enrollments;

  if (filter.user) {
    results = results.filter(e => e.user === filter.user);
  }
  if (filter.course) {
    results = results.filter(e => e.course === filter.course);
  }
  return results;
}

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
  enrollments.push(newEnrollment);
  return newEnrollment;
}

export function unenrollUserFromCourse(enrollmentId) {
  const { enrollments } = Database;
  const idx = enrollments.findIndex(e => e._id === enrollmentId);
  if (idx === -1) return null;
  const removed = enrollments.splice(idx, 1)[0];
  return removed;
}
