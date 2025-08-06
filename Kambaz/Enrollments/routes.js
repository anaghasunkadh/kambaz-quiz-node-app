// ./Kambaz/Enrollments/routes.js
import express from "express";
import {
  getAllEnrollments,
  enrollUserInCourse,
  unenrollUserFromCourse,
} from "./dao.js";

export default function EnrollmentsRoutes(app) {
  app.get("/api/enrollments", (req, res) => {
    const { user, course } = req.query;
    const enrollments = getAllEnrollments({ user, course });
    res.json(enrollments);
  });

  app.post("/api/enrollments", (req, res) => {
    const { user, course } = req.body;
    if (!user || !course) {
      return res.status(400).json({ error: "Missing user or course" });
    }
    const newEnrollment = enrollUserInCourse(user, course);
    res.status(201).json(newEnrollment);
  });

  app.delete("/api/enrollments/:id", (req, res) => {
    const removed = unenrollUserFromCourse(req.params.id);
    if (!removed) {
      return res.status(404).json({ error: "Enrollment not found" });
    }
    res.sendStatus(204);
  });
}
