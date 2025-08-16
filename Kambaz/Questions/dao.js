import questionModel from "./model.js";
import quizModel from "../Quizzes/model.js";

export const createQuestion = async (quizId, question) => {
  try {
    console.log("🔍 Creating question with data:", { quizId, question });
    
    // Validate quizId exists
    if (!quizId) {
      throw new Error("Quiz ID is required");
    }
    
    // Check if quiz exists
    const quiz = await quizModel.findOne({ id: quizId });
    if (!quiz) {
      throw new Error(`Quiz with ID ${quizId} not found`);
    }
    console.log("✅ Quiz found:", quiz.title);
    
    delete question._id;
    question.id = "QUE" + Date.now();
    question.quizId = quizId;
    
    console.log("📝 Processed question data:", question);
    
    const createdQuestion = await questionModel.create(question);
    console.log("✅ Question created successfully:", createdQuestion);
    return createdQuestion;
  } catch (error) {
    console.error("❌ Error creating question:", error);
    throw error;
  }
};

export const findQuestionsByQuizId = (quizId) =>
  questionModel.find({ quizId });

export const findQuestionById = (questionId) =>
  questionModel.findOne({ id: questionId });

export const updateQuestion = (questionId, updates) =>
  questionModel.findOneAndUpdate({ id: questionId }, { $set: updates }, { new: true });

export const deleteQuestion = (questionId) =>
  questionModel.findOneAndDelete({ id: questionId });
