import model from "./model.js";

export const createQuiz = (course, quiz) => {
  delete quiz._id;
  quiz.id = "Q" + Date.now();
  quiz.course = course;
  return model.create(quiz);
};

export const findAllQuizzes = () => model.find();

export const findQuizzesByCourse = (courseId) =>
  model.find({ course: courseId }).sort({ available_date: 1 });

export const findQuizById = (quizId) => model.findOne({ id: quizId });

export const updateQuiz = (quizId, quiz) =>
  model.findOneAndUpdate({ id: quizId }, { $set: quiz }, { new: true });

export const deleteQuiz = (quizId) =>
  model.findOneAndDelete({ id: quizId });

export const updatePublished = (quizId, published) =>
  model.findOneAndUpdate(
    { id: quizId },
    { $set: { published: published === "true" } },
    { new: true }
  );
