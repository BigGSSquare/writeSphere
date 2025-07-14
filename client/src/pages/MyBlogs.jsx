import MyBlogCard from "../components/MyBlogCard";
import { useSelector } from "react-redux";

const MyBlogs = () => {
  const { blogs } = useSelector((state) => state.blog);

  const handleDelete = (id) => {
    console.log("Delete blog with ID:", id);
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
