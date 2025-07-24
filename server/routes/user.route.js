import express from "express";
import { login, logout, register } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";
import { verifyToken } from "../middlewares/verifyToken";
import { updateUser } from "../controllers/user.controller.js";
const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/logout", logout);
userRoute.post(
  "/update",
  verifyToken,
  upload.single("profileImage"),
  updateUser
);
export default userRoute;
