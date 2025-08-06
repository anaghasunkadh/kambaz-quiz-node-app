export default function QueryParameters(app) {
  app.get("/lab5/calculator", (req, res) => {
    const { a, b, operation } = req.query;
    let result;

    const numA = parseInt(a);
    const numB = parseInt(b);

    if (isNaN(numA) || isNaN(numB)) {
      res.status(400).send("Invalid parameters");
      return;
    }

    switch (operation) {
      case "add":
        result = numA + numB;
        break;
      case "subtract":
        result = numA - numB;
        break;
      case "multiply":
        result = numA * numB;
        break;
      case "divide":
        if (numB === 0) {
          res.status(400).send("Error: Division by zero");
          return;
        }
        result = numA / numB;
        break;
      default:
        res.status(400).send("Invalid operation");
        return;
    }

    res.send(result.toString());
  });
}
