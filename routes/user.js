import { Router } from "express";
import express from "express";
import bodyParser from "body-parser";
import {
  getAllCont,
  postNewUser,
  userById,
  userById2,
  updatedUser,
  deletedUser,
  register,
  login,
  getUserProfile,
  logout,
} from "../Controllers/user.js";
import { isAuthenticated } from "../middleware/Auth.js";
const router = express.Router();
import { User } from "../model/user.js";
router.use(express.json());
router.get("/all", getAllCont);
router.get("/", (req, res) => {
  res.send("Noice");
});
router.get(userById);
router.post("/login", login);
router.post("/logout", logout);
router.post("/new", register);
router.post("/me", isAuthenticated, getUserProfile);
export default router;
