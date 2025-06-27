import mongoose from "mongoose";
import { User } from "./user.model.js";
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },
  { timestamps: true }
);
const blogModel = mongoose.model("blogModel", blogSchema);
export default blogModel;
