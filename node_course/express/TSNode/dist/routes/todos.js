"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
let todos = [];
router.get("/todos", (req, res, next) => {
    res.status(200).json({ todos });
});
router.post("/todos", (req, res, next) => {
    const body = req.body;
    const newTodo = { id: new Date().toISOString(), text: body.text };
    todos.push(newTodo);
    res.status(200).json({ success: true });
});
router.put("/todos/:id", (req, res, next) => {
    const params = req.params;
    const todo = todos.find((todo) => todo.id === params.id);
    if (!todo)
        return res.status(404).json({ success: false, message: "Failed to update, todo not found" });
    const body = req.body;
    todo.text = body.text;
    res.status(200).json({ success: true });
});
router.delete("/todos/:id", (req, res, next) => {
    const params = req.params;
    todos = todos.filter((todo) => todo.id !== params.id);
    res.status(200).json({ success: true });
});
exports.default = router;
