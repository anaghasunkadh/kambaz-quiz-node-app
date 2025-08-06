let assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

let moduleObj = {
  id: "CS101",
  name: "Intro to Computer Science",
  description: "Basics of computer science and programming",
  course: "Computer Science",
};

export default function WorkingWithObjects(app) {
  // Existing assignment routes
  app.get("/lab5/assignment", (req, res) => {
    res.json(assignment);
  });

  app.get("/lab5/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  });

  // New: Update assignment score (number)
  app.get("/lab5/assignment/score/:newScore", (req, res) => {
    const newScore = parseInt(req.params.newScore);
    if (isNaN(newScore)) {
      return res.status(400).send("Invalid score");
    }
    assignment.score = newScore;
    res.json(assignment);
  });

  // New: Update assignment completed (boolean)
  app.get("/lab5/assignment/completed/:completed", (req, res) => {
    const completedStr = req.params.completed.toLowerCase();
    if (completedStr !== "true" && completedStr !== "false") {
      return res.status(400).send("Invalid completed value");
    }
    assignment.completed = completedStr === "true";
    res.json(assignment);
  });

  // Module routes
  app.get("/lab5/module", (req, res) => {
    res.json(moduleObj);
  });

  app.get("/lab5/module/name", (req, res) => {
    res.json(moduleObj.name);
  });

  app.get("/lab5/module/name/:newName", (req, res) => {
    const { newName } = req.params;
    moduleObj.name = newName;
    res.json(moduleObj);
  });

  app.get("/lab5/module/description/:newDescription", (req, res) => {
    const newDescription = decodeURIComponent(req.params.newDescription);
    moduleObj.description = newDescription;
    res.json(moduleObj);
  });
}
