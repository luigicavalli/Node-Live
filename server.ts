import express, { Express, Request, Response } from "express";
import Joi from "joi";

const app: Express = express();
const port: number = 3000;
app.use(express.json());

interface Todo {
  id: number;
  userId: number;
  todo: string;
  completed: boolean;
}

const schema = Joi.object({
  id: Joi.number().integer().required(),
  userId: Joi.number().integer().required(),
  todo: Joi.string().required(),
  completed: Joi.boolean().required(),
});

const todos: Array<Todo> = [];

app.get("/todos", (req: Request, res: Response) => {
  res.status(200).json(todos);
});

app.post("/todos", (req: Request, res: Response) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ errors: error.details.map((message) => message) });
  } else {
    todos.push(req.body);
    res.status(200).json({ message: "Todo inserito con successo." });
  }
});

app.put("/todos", (req: Request, res: Response) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ errors: error.details.map((message) => message) });
  } else {
    const index = todos.findIndex((todo) => {
      return todo.id === value.id;
    });
    if (index !== -1) {
      todos[index] = value;
    } else {
      res.status(404).json({ message: "Todo non trovato" });
    }
    res.status(200).json({ message: "Todo inserito con successo." });
  }
});

app.delete("/todos", (req: Request, res: Response) => {
  const index = todos.findIndex((todo) => {
    return todo.id === Number(req.query.id);
  });
  if (index !== -1) {
    todos.splice(index, 1);
    res.status(200).json({ message: "Todo eliminato con successo." });
  } else {
    res.status(404).json({ message: "Todo non trovato" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
