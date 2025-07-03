import React from "react";
import BlogCard from "../components/BlogCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllBlogs } from "../features/blog/blogSlice.js";
import { useEffect } from "react";
import toast from "react-hot-toast";
import BlogSkeleton from "../components/BlogSkeleton.jsx";
const Blogs = () => {
  const { blogs, loading } = useSelector((state) => {
    return state.blog;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const res = async () => {
      try {
        await dispatch(fetchAllBlogs()).unwrap();
      } catch (err) {
        toast.error(err.response?.message || "error fetching blogs");
      }
    };
    res();
  }, [dispatch]);
  return (
    <div className="px-4 py-6 grid grid-cols-3 gap-6 bg-[#090b0a]">
      {loading &&
        Array.from({ length: 6 }).map((_, idx) => <BlogSkeleton key={idx} />)}
      {!loading &&
        blogs.map((blog) => {
          console.log(blog);
          return <BlogCard key={blog._id} {...blog} />;
        })}
    </div>
  );
};

export default Blogs;
