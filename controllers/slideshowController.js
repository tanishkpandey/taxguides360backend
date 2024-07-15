const SlideshowModel = require('../models/Slideshow');

const addSlideshow = async (req, res) => {
  try {
    const { imageLinks } = req.body;

    if (!imageLinks || !Array.isArray(imageLinks) || imageLinks.length !== 4) {
      return res.status(400).send('Exactly 4 image links are required');
    }

    const newSlideshow = new SlideshowModel({ imageLinks });
    const savedSlideshow = await newSlideshow.save();

    return res.status(201).json({
      slideshow: savedSlideshow,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

const getSlideshows = async (req, res) => {
  try {
    const slideshows = await SlideshowModel.find().sort({ createdAt: -1 });
    return res.status(200).json(slideshows);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

const deleteSlideshow = async (req, res) => {
  try {
    const { id } = req.params;
    await SlideshowModel.findByIdAndDelete(id);
    return res.status(200).send('Slideshow deleted');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  addSlideshow,
  getSlideshows,
  deleteSlideshow,
};
