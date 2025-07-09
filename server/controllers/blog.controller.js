import blogModel from "../models/blog.model.js";
export const fetchAllBlogs = async (req, res) => {
  const blogs = await blogModel
    .find({})
    .populate("author", "-password")
    .sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    blogs,
  });
};

export const createBlog = async (req, res) => {
  try {
    const { title, subtitle, content } = req.body;
    const thumbnail = req.file.path;
    if (!title || !subtitle || !content) {
      return res.status(500).json({
        success: false,
        message: "all fields are required",
      });
    }
    const author = req.user?._id;
    console.log(author);
    const newBlog = await blogModel.create({
      title,
      subtitle,
      content,
      thumbnail,
      author,
    });
    console.log(newBlog);
    return res.status(200).json({
      success: true,
      message: "blog created successfully",
      blog: newBlog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || err,
    });
  }
};

export const getBlogWithId = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await blogModel.findById(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "blog not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        data,
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "server error",
    });
  }
};
