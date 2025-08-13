// // dao/enrollmentsDao.js
// import Database from "../Database/index.js";
// import { v4 as uuidv4 } from "uuid";

// export function getAllEnrollments(filter = {}) {
//   const { enrollments } = Database;
//   let results = enrollments;

//   if (filter.user) {
//     results = results.filter(e => e.user === filter.user);
//   }
//   if (filter.course) {
//     results = results.filter(e => e.course === filter.course);
//   }
//   return results;
// }

// export function enrollUserInCourse(userId, courseId) {
//   const { enrollments } = Database;
//   const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
//   enrollments.push(newEnrollment);
//   return newEnrollment;
// }

// export function unenrollUserFromCourse(enrollmentId) {
//   const { enrollments } = Database;
//   const idx = enrollments.findIndex(e => e._id === enrollmentId);
//   if (idx === -1) return null;
//   const removed = enrollments.splice(idx, 1)[0];
//   return removed;
// }
import model from "./model.js";
export async function findCoursesForUser(userId) {
 const enrollments = await model.find({ user: userId }).populate("course");
 return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
 const enrollments = await model.find({ course: courseId }).populate("user");
 return enrollments.map((enrollment) => enrollment.user);
}
// export function enrollUserInCourse(user, course) {
//  return model.create({ user, course, _id: `${user}-${course}` });
// }
// export function unenrollUserFromCourse(user, course) {
//  return model.deleteOne({ user, course });
// }
export async function enrollUserInCourse(user, course) {
  const _id = `${user}-${course}`;
  const existing = await model.findOne({ _id });
  if (existing) {
    return existing; // Already enrolled, return existing enrollment
  }
  const newEnrollment = { user, course, _id };
  return model.create(newEnrollment);
}

export function unenrollUserFromCourse(user, course) {
 return model.deleteOne({ user, course });
}
