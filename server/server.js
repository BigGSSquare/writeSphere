import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import userRoute from "./routes/user.route.js";
import { blogRouter } from "./routes/blog.route.js";
import cookieParser from "cookie-parser";
const app = express();
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRouter);
app.get("/", (req, res, next) => {
  res.send("API is running");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server running");
});
