// Kambaz/Assignments/routes.js
import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignments = await dao.findAssignmentsForCourse(courseId);
      res.json(assignments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignmentData = { ...req.body, course: courseId };
      const newAssignment = await dao.createAssignment(assignmentData);
      res.json(newAssignment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
app.put("/api/assignments/:title", async (req, res) => {
  const { title } = req.params;
  const updatedAssignment = await dao.updateAssignment(title, req.body);
  res.json(updatedAssignment);
});

// Delete
app.delete("/api/assignments/:title", async (req, res) => {
  const { title } = req.params;
  const result = await dao.deleteAssignment(title);
  res.json(result);
});

}
