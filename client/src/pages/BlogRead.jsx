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
    <div className=" bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8 text-white">
        <h1 className="text-8xl font-bold text-[#eed2d1]">
          {blogDetails.title}
        </h1>
        <h2 className="text-4xl text-[#a55050] mt-2 mb-6 font-serif">
          {blogDetails.subtitle}
        </h2>
        <img
          src={blogDetails.thumbnail}
          alt={blogDetails.title}
          className="w-full h-[400px] object-cover rounded-xl mb-6"
        />
        <div className="prose prose-lg max-w-none text-[#eed2d1] font-alter prose-headings:font-semibold prose-p:leading-relaxed prose-img:rounded-xl prose-img:shadow-md prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 text-2xl">
          <div dangerouslySetInnerHTML={{ __html: blogDetails.content }}></div>
        </div>
      </div>
    </div>
  );
};

export default BlogRead;
