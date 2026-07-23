const { Todo } = require("../models/Todo");

async function createTodo(req, res) {
  const { text } = req.body || {};
  if (!text) {
    return res.status(400).json({ ok: false, error: "text is required" });
  }

  const todo = await Todo.create({ text });
  res.status(201).json({ ok: true, todo });
}

async function listTodos(req, res) {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json({ ok: true, todos });
}

async function deleteTodo(req, res) {
  const result = await Todo.deleteOne({ _id: req.params.id });
  res.json({ ok: true, result });
}

module.exports = { createTodo, listTodos, deleteTodo };
