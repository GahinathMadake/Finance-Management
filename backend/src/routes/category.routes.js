const express = require('express');
const router = express.Router();
const { getAllCategories } = require('../controllers/categories.controller');

router.get('/get', getAllCategories);

module.exports = router;
