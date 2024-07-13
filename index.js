const express = require('express');
const connectDB = require('./config/db');
const userRouter = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoutes")
const cors = require("cors");
const app = express();
app.use(express.json({}));
app.use(cors());
connectDB();

app.use("/api", userRouter);
app.use('/api/news', newsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
