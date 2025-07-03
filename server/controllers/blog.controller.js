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

  console.log(blogs);
};

export const createBlog = () => {
  res.send(200).json({
    success: "true",
    message: "idhigo veedni adugu isthadu blog",
  });
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
