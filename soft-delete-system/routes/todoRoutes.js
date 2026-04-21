const express = require('express');

const {
  createTodo,
  listTodos,
  deleteTodo
} = require('../controllers/todoController');

const router = express.Router();

router.post('/todos', createTodo);
router.get('/todos', listTodos);
router.delete('/todos/:id', deleteTodo);

module.exports = router;
