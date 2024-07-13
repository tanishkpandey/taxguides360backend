const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send("User does not exist");
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (isPasswordMatching) {
      const token = jwt.sign({ userID: user._id }, "randomsecret");
      return res.status(200).json({
        user: user,
        token: token,
      });
    }
    return res.status(401).send("Incorrect login credentials");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailExists = await UserModel.findOne({ email: email });
    if (emailExists) {
      return res.status(409).send("User Already Exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      email: email,
      password: hashPassword,
    });
    const savedUser = await newUser.save();
    const token = jwt.sign({ userId: savedUser._id }, "randomsecret");
    return res.status(201).json({
      user: savedUser,
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  signupUser,
  loginUser,
};
