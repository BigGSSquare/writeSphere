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
export const getUserBlogs = async (req, res) => {
  try {
    console.log(req.user);
    console.log(req.user._id);
    const userId = req.user._id;
    const data = await blogModel
      .find({ author: userId })
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      blogs: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const updateBlog = async (req, res) => {
  try {
    const { title, subtitle, content } = req.body;
    const thumbnail = req.file?.path;
    const blogId = req.params.id;
    const userId = req.user._id;

    if (!title || !subtitle || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.author.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this blog",
      });
    }

    const updateData = { title, subtitle, content };
    if (thumbnail) updateData.thumbnail = thumbnail;

    await blogModel.findByIdAndUpdate(
      { _id: blogId },
      { $set: updateData },
      { lean: true }
    );
    const updatedBlog = await blogModel.findById(blogId);
    console.log(updatedBlog);
    return res.status(200).json({
      success: true,
      message: "Blog successfully updated",
      blog: updatedBlog,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "blog not found",
      });
    }
    const response = await blogModel.deleteOne({ _id: id });
    if (response.acknowledged) {
      return res.status(200).json({
        success: true,
        message: "blog successfully deleted",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "failed to delete blog",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "error deleting blog",
    });
  }
};
