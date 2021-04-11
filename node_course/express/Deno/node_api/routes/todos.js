const express = require("express");

const Router = express.Router();

let todos = [];

Router.get("/todos", (req, res, next) => res.json({ todos }));
Router.post("/todos", (req, res, next) => {
  const newTodo = { id: new Date().toISOString(), text: req.body.text };
  todos.push(newTodo);
  res.status(200).json({ message: "Created!", todo: newTodo });
});
Router.put("/todos/:id", (req, res, next) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === id);
  todo.text = req.body.text;
  res.status(200).json({ message: "Updated!", todo });
});
Router.delete("/todos/:id", (req, res, next) => {
  todos = todos.filter((todo) => todo.id !== req.params.id);
  res.status(200).json({ message: "Deleted!" });
});

module.exports = Router;
