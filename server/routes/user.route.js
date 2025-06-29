import express from "express";
import { login, logout, register } from "../controllers/user.controller.js";
const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/logout", logout);

export default userRoute;
