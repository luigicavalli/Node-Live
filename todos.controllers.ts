import { Request, Response } from "express";

interface Todo {
  id: number;
  userId: number;
  todo: string;
  completed: boolean;
}

const todos: Array<Todo> = [];

export const ADD_TODO = (req: Request, res: Response) => {
  todos.push(req.body);
  res.status(200).json({ message: "Todo inserito con successo." });
};

export const UPDATE_TODO = (req: Request, res: Response) => {
  const index = todos.findIndex((todo) => {
    return todo.id === req.body.id;
  });
  if (index !== -1) {
    todos[index] = req.body;
  } else {
    res.status(404).json({ message: "Todo non trovato" });
  }
  res.status(200).json({ message: "Todo inserito con successo." });
};

export const DELETE_TODO = (req: Request, res: Response) => {
  const index = todos.findIndex((todo) => {
    return todo.id === Number(req.query.id);
  });
  if (index !== -1) {
    todos.splice(index, 1);
    res.status(200).json({ message: "Todo eliminato con successo." });
  } else {
    res.status(404).json({ message: "Todo non trovato" });
  }
};

export const READ_TODO = (req: Request, res: Response) => {
  res.status(200).json(todos);
};
