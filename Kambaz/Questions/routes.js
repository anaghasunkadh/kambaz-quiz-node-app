import * as dao from "./dao.js";

function QuestionRoutes(app) {
  // Create question for a quiz
  app.post("/api/quizzes/:qid/questions", async (req, res) => {
    const question = await dao.createQuestion(req.params.qid, req.body);
    res.json(question);
  });

  // Get all questions for a quiz
  app.get("/api/quizzes/:qid/questions", async (req, res) => {
    const questions = await dao.findQuestionsByQuizId(req.params.qid);
    res.json(questions);
  });

  // Get single question
  app.get("/api/questions/:qid", async (req, res) => {
    const question = await dao.findQuestionById(req.params.qid);
    res.json(question);
  });

  // Update question
  app.put("/api/questions/:qid", async (req, res) => {
    const updated = await dao.updateQuestion(req.params.qid, req.body);
    res.json(updated);
  });

  // Delete question
  app.delete("/api/questions/:qid", async (req, res) => {
    const status = await dao.deleteQuestion(req.params.qid);
    res.json(status);
  });
}

export default QuestionRoutes;
