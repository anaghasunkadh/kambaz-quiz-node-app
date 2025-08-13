// Kambaz/Assignments/model.js
import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },  // Now acts as primary key
  description: String,
  points: { type: Number, default: 0 },
  dueDate: Date,
  availableFrom: Date,
  availableUntil: Date,
  course: { type: String, ref: "Course", required: true }
}, { timestamps: true });


const AssignmentModel = mongoose.model("Assignment", assignmentSchema);
export default AssignmentModel;
