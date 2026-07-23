const express = require('express');

const { getRoot, getSlow } = require('../controllers/homeController');

const router = express.Router();

router.get('/', getRoot);
router.get('/slow', getSlow);

module.exports = router;
