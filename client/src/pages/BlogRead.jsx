import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById } from "../features/blog/blogSlice";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const BlogRead = () => {
  const { loading, blogDetails } = useSelector((state) => {
    return state.blog;
  });
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(fetchBlogById(id))
        .unwrap()
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (err) {}
  }, [dispatch, id]);

  if (loading) return <p className="text-white text-xl">Loading blog...</p>;
  if (!blogDetails) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-white">
      <img
        src={blogDetails.thumbnail}
        alt={blogDetails.title}
        className="w-full h-[400px] object-cover rounded-xl mb-6"
      />
      <h1 className="text-4xl font-bold text-[#eed2d1]">{blogDetails.title}</h1>
      <h2 className="text-xl text-[#a55050] mt-2 mb-6">
        {blogDetails.subtitle}
      </h2>
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: blogDetails.content }}
      ></div>
    </div>
  );
};

export default BlogRead;
