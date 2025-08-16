import * as dao from "./dao.js";

function QuizRoutes(app) {
  app.post("/api/courses/:cid/quizzes", async (req, res) => {
    const newQuiz = await dao.createQuiz(req.params.cid, req.body);
    res.json(newQuiz);
  });

  app.get("/api/courses/:cid/quizzes", async (req, res) => {
    const quizzes = await dao.findQuizzesByCourse(req.params.cid);
    res.json(quizzes);
  });

  app.get("/api/quizzes/:qid", async (req, res) => {
    const quiz = await dao.findQuizById(req.params.qid);
    res.json(quiz);
  });
  
app.get("/api/quizzes", async (req, res) => {
  const quizzes = await dao.findAllQuizzes();
  res.json(quizzes);
});

  app.put("/api/quizzes/:qid", async (req, res) => {
    const updated = await dao.updateQuiz(req.params.qid, req.body);
    res.json(updated);
  });

  app.put("/api/quizzes/:qid/:published", async (req, res) => {
    const updated = await dao.updatePublished(req.params.qid, req.params.published);
    res.json(updated);
  });

  app.delete("/api/quizzes/:qid", async (req, res) => {
    const status = await dao.deleteQuiz(req.params.qid);
    res.json(status);
  });
}

export default QuizRoutes;
