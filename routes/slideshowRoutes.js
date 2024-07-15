const express = require('express');
const { addSlideshow, getSlideshows, deleteSlideshow } = require('../controllers/slideshowController');
const router = express.Router();

router.post('/slideshow', addSlideshow);
router.get('/slideshows', getSlideshows);
router.delete('/slideshow/:id', deleteSlideshow);

module.exports = router;
