"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var todos = [];
router.get("/todos", function (req, res, next) {
    res.status(200).json({ todos: todos });
});
router.post("/todos", function (req, res, next) {
    var body = req.body;
    var newTodo = { id: new Date().toISOString(), text: body.text };
    todos.push(newTodo);
    res.status(200).json({ success: true });
});
router.put("/todos/:id", function (req, res, next) {
    var params = req.params;
    var todo = todos.find(function (todo) { return todo.id === params.id; });
    if (!todo)
        return res.status(404).json({ success: false, message: "Failed to update, todo not found" });
    var body = req.body;
    todo.text = body.text;
    res.status(200).json({ success: true });
});
router.delete("/todos/:id", function (req, res, next) {
    var params = req.params;
    todos = todos.filter(function (todo) { return todo.id !== params.id; });
    res.status(200).json({ success: true });
});
exports.default = router;
