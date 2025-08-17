import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    quizId: { type: String, required: true }, // Links to quiz `id` (not Mongo _id)
    title: { type: String, required: true },
    type: { type: String, default: "Multiple Choice" },
    description: { type: String }, // Added to match existing data
    points: { type: Number, default: 1 },
    group: { type: String, default: "Ungrouped" }, // Added group field with default
    answer: [String], // Added to match existing data structure
    options: [String], // Added to match existing data structure
    answers: [
      {
        text: String,
        isCorrect: Boolean
      }
    ]
  },
  { collection: "questions" }
);

export default questionsSchema;
