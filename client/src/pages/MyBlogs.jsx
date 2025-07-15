import MyBlogCard from "../components/MyBlogCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogById } from "../features/blog/blogSlice";
import toast from "react-hot-toast";

const MyBlogs = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blog);

  const handleDelete = async (id) => {
    try {
      const res = await dispatch(deleteBlogById({ id })).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error(err || "error deleting blog");
    }
  };

  return (
    <div className="min-h-screen bg-[#090b0a] p-6">
      <h1 className="text-[#a55050] text-6xl ml-7  font-bold mb-9">My Blogs</h1>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <MyBlogCard key={blog._id} blog={blog} onDelete={handleDelete} />
        ))
      ) : (
        <p className="text-gray-400">You haven't written any blogs yet.</p>
      )}
    </div>
  );
};

export default MyBlogs;
