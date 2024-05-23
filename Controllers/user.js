import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";
import jwt from "jsonwebtoken";
export const getAllCont = async (req, res) => {
  const users = await User.find({});
  res.json({
    success: true,
    users,
  });
};
export const postNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
};
export const userById = async (req, res) => {
  const { id } = req.query;
  const user = await User.findById(id);
  res.json({
    success: true,
    user,
  });
};
export const updatedUser = async (req, res) => {
  const { id } = req.query;
  const user = await User.findById(id);
  res.send("updated");
};
export const deletedUser = async (req, res) => {
  const { id } = req.query;
  const user = await User.findById(id);
  res.send("deleted");
};
export const userById2 = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({
    success: true,
    user,
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User doesnt exist",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "invalid email or password",
    });
  }
  sendCookies(user, res, "Welcome Back", 201);
};

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(404).json({
      success: false,
      message: "user already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedPassword });
  sendCookies(user, res, "Registered Successfully", 201);
};

export const logout = (req, res) => {
  res
    .clearCookie("token", {
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
export const getUserProfile = (req, res) => {
  const user = req.user;
  res.json({
    success: true,
    user,
  });
};
