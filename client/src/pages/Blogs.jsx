import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton.jsx";
import { fetchAllBlogs } from "../features/blog/blogSlice.js";
import { useState } from "react";
const Blogs = () => {
  const [page, setPage] = useState(1);
  const { blogs, loading, blogSearch, searchActive } = useSelector(
    (state) => state.blog
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!searchActive && blogs.length === 0) {
      dispatch(fetchAllBlogs());
    }
  }, [dispatch, blogs.length, searchActive]);
  const displayedBlogs = searchActive ? blogSearch : blogs;
  console.log(displayedBlogs);
  console.log(blogSearch);
  return (
    <div className="px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-[#090b0a] min-h-screen">
      {loading &&
        Array.from({ length: 6 }).map((_, idx) => <BlogSkeleton key={idx} />)}
      {!loading &&
        Array.isArray(displayedBlogs) &&
        displayedBlogs.length > 0 &&
        displayedBlogs.map((blog) => <BlogCard key={blog._id} {...blog} />)}
      {!loading && displayedBlogs.length === 0 && (
        <p className="col-span-full text-center text-[#f87171] text-lg font-medium bg-[#1a1a1a] px-6 py-4 rounded-xl shadow-md border border-[#333]">
          {searchActive
            ? "No blogs found for your search."
            : "No blogs available."}
        </p>
      )}
    </div>
  );
};

export default Blogs;
