let todos = [
  { id: 1, title: "Task 1", description: "Desc 1", completed: false },
  { id: 2, title: "Task 2", description: "Desc 2", completed: true },
  { id: 3, title: "Task 3", description: "Desc 3", completed: false },
  { id: 4, title: "Task 4", description: "Desc 4", completed: true },
];

export default function WorkingWithArrays(app) {
  // Create new todo - BEFORE :id routes
  app.get("/lab5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      description: "New Description",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  });

  // Update completed property
  app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) todo.completed = completed === "true";
    res.json(todos);
  });

  // Update description property
  app.get("/lab5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) todo.description = decodeURIComponent(description);
    res.json(todos);
  });

  // Update title property
  app.get("/lab5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) todo.title = decodeURIComponent(title);
    res.json(todos);
  });

  // Delete todo by ID
  app.get("/lab5/todos/:id/delete", (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === parseInt(id));
    if (index !== -1) todos.splice(index, 1);
    res.json(todos);
  });

  // Get single todo by ID
  app.get("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo || {});
  });

  // Get all or filtered todos by completed query param
  app.get("/lab5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const filtered = todos.filter((t) => t.completed === completedBool);
      res.json(filtered);
    } else {
      res.json(todos);
    }
  });
    app.post("/lab5/todos", (req, res) => {
    const newTodo = { ...req.body,  id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  });
  app.delete("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }

    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  });
  app.put("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }

    todos = todos.map((t) => {
      if (t.id === parseInt(id)) {
        return { ...t, ...req.body };
      }
      return t;
    });
    res.sendStatus(200);
  });


}
