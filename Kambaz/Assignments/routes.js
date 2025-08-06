// Kambaz/Assignments/routes.js
import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  // Get assignments for a course
  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  // Create a new assignment for a course
  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const newAssignment = dao.createAssignment({ ...req.body, course: courseId });
    res.json(newAssignment);
  });

  // Update an assignment
  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const updated = dao.updateAssignment(assignmentId, req.body);
    res.json(updated);
  });

  // Delete an assignment
  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const result = dao.deleteAssignment(assignmentId);
    res.send(result);
  });
}
