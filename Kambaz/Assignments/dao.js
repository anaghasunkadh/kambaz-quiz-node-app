import Assignment from "./model.js";

// DO NOT cast to ObjectId if you're using string course IDs
export async function findAssignmentsForCourse(courseId) {
  return await Assignment.find({ course: courseId });
}

export async function createAssignment(assignment) {
  const newAssignment = new Assignment(assignment);
  return await newAssignment.save();
}

// Update assignment by its title
export async function updateAssignment(title, updates) {
  return await Assignment.findOneAndUpdate({ title }, updates, { new: true });
}

// Delete assignment by its title
export async function deleteAssignment(title) {
  await Assignment.findOneAndDelete({ title });
  return { acknowledged: true };
}
