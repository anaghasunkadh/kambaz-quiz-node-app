import mongoose from "mongoose";

const quizzesSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: String,
    type: String,
    points: Number,
    assignment_group: String,
    shuffle_answers: Boolean,
    time_limit: Number,
    multiple_attempts: Boolean,
    show_correct: String, // Changed from Boolean for flexibility
    access_code: String,
    one_question: Boolean,
    webcam: Boolean,
    lock_question: Boolean,
    due_date: Date,
    available_date: Date,
    until_date: Date,
    question_count: Number,
    course: String,
    published: Boolean,
  },
  { collection: "quizzes" }
);

export default quizzesSchema;
