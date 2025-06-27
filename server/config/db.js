import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const connectDB = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export default connectDB;
