const express = require('express');
const { addNews, getNews } = require('../controllers/newsController');
const router = express.Router();

router.post('/addNews', addNews);
router.get('/allNews', getNews);

module.exports = router;
