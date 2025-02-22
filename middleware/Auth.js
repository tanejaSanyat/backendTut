import { User } from "../model/user.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "login first",
    });
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decode._id;
  const user = await User.findOne({ _id: userId });
  req.user = user;
  next();
};
