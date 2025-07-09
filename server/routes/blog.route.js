import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { createBlog } from "../controllers/blog.controller.js";
import { fetchAllBlogs } from "../controllers/blog.controller.js";
import { getBlogWithId } from "../controllers/blog.controller.js";
// import { updateBlog } from "../controllers/blog.controller.js";
// import { deleteBlog } from "../controllers/blog.controller.js";
// import upload from "../middlewares/multer.js";
import upload from "../middlewares/multer.js";

const blogRouter = express.Router();

blogRouter.get("/fetchAllBlogs", fetchAllBlogs);
blogRouter.get("/:id", verifyToken, getBlogWithId);
blogRouter.post(
  "/createBlog",
  verifyToken,
  upload.single("thumbnail"),
  createBlog
);
// blogRouter.delete("/:id", verifyToken, deleteBlog);

export { blogRouter };
