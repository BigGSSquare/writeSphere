import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
dotenv.config();
connectDB();
const app = express();

app.use(cors({ origin: true, credentials: true })); // for cookies
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRoute);
app.get("/", (req, res, next) => {
  res.send("API is running");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server running");
});
