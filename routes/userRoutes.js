const express = require("express");
const {
  loginUser,
  signupUser,
} = require("../controllers/userControllers");
const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/signup", signupUser);

module.exports = userRouter;
