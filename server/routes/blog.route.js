import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { createBlog } from "../controllers/blog.controller.js";
import { getAllBlogs } from "../controllers/blog.controller.js";
import { getBlogWithId } from "../controllers/blog.controller.js";
import { updateBlog } from "../controllers/blog.controller.js";
import { deleteBlog } from "../controllers/blog.controller.js";
const blogRouter = express.Router();

blogRouter.post("/create", verifyToken, createBlog);
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getBlogWithId);
blogRouter.put("/:id", updateBlog);
blogRouter.delete("/:id", verifyToken, deleteBlog);

export { blogRouter };
