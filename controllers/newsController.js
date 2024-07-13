const NewsModel = require('../models/News');

const addNews = async (req, res) => {
  try {
    const { title, link } = req.body;

    if (!title || !link) {
      return res.status(400).send('Title and link are required');
    }

    const newNews = new NewsModel({ title, link });
    const savedNews = await newNews.save();

    return res.status(201).json({
      news: savedNews,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

const getNews = async (req, res) => {
  try {
    const news = await NewsModel.find().sort({ createdAt: -1 });
    return res.status(200).json(news);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  addNews,
  getNews,
};
