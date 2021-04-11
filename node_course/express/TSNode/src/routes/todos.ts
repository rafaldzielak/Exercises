import { Router } from "express";
import { Todo } from "../models/todos";

const router = Router();

type RequestBody = { text: string };
type RequestParams = { id: string };

let todos: Todo[] = [];

router.get("/todos", (req, res, next) => {
  res.status(200).json({ todos });
});

router.post("/todos", (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = { id: new Date().toISOString(), text: body.text };
  todos.push(newTodo);
  res.status(200).json({ success: true });
});

router.put("/todos/:id", (req, res, next) => {
  const params = req.params as RequestParams;
  const todo = todos.find((todo) => todo.id === params.id);
  if (!todo) return res.status(404).json({ success: false, message: "Failed to update, todo not found" });
  const body = req.body as RequestBody;
  todo.text = body.text;
  res.status(200).json({ success: true });
});

router.delete("/todos/:id", (req, res, next) => {
  const params = req.params as RequestParams;
  todos = todos.filter((todo) => todo.id !== params.id);
  res.status(200).json({ success: true });
});

export default router;
