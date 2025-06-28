import blogModel from "../models/blog.model.js";
export const createBlog = async (req, res) => {
  try {
    const { title, subtitle, content } = req.body;
    if (!title || !subtitle || !content) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }
    const thumbnail = req.file.path;
    const author = req.user.id;
    console.log(author);
    const newBlog = await blogModel.create({
      title,
      subtitle,
      content,
      author,
      thumbnail,
    });
    res.status(201).json({
      success: true,
      message: "blog created",
      blog: newBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error creating the blog",
      error: error.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find().populate("author", "-password");
    res.status(200).json({ success: true, blogs });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "error fetching blogs",
      error: err.message,
    });
  }
};

export const getBlogWithId = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog)
      return res.status(201).json({
        success: false,
        message: "blog not found",
      });
    res.status(200).json({ blog });
  } catch (err) {
    res.status(201).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const updated = await blogModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "blogModel not found" });
    res.status(200).json({ message: "blogModel updated", blog: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating blog", error: err.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const deleted = await blogModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "blog not found" });
    res.status(200).json({ message: "blog deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting blog", error: err.message });
  }
};
