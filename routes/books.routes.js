const express = require('express');
const router = express.Router();
const bookController = require('../controllers/books.controller');
const validateYear = require('../middleware/validateYear');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', validateYear, bookController.createBook);
router.put('/:id', validateYear, bookController.updateBook);
router.patch('/:id', bookController.patchBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;