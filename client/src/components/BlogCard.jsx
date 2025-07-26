import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
const BlogCard = ({ _id, title, subtitle, author, thumbnail, createdAt }) => {
  const formattedDate = format(new Date(createdAt), "dd/MM/yy");
  return (
    <Link to={`/blog/${_id}`}>
      <div className="max-w-sm rounded-2xl bg-[#0f0f10]/80 backdrop-blur-md transition duration-250 cursor-pointer overflow-hidden hover:scale-[1.02] will-change-transform backface-hidden">
        {thumbnail && (
          <img
            className="block w-full h-48 object-cover"
            src={thumbnail}
            alt="Blog Thumbnail"
          />
        )}
        <div className="p-4">
          <h2 className="text-xl font-bold text-[#a55050] mb-1">{title}</h2>
          <p className="text-sm text-black mb-3">{subtitle}</p>
          <div className="text-sm text-[#923b3b] font-semibold">
            By {author?.firstname || "Unknown Author"} | {formattedDate}
          </div>
          <div className="mt-auto">
            <button
              className="bg-[#a55050] text-black px-3 py-1 rounded-md text-sm font-medium hover:bg-[#923b3b] cursor-pointer overflow-hidden
            mt-4"
              // onClick={readMoreHandler}
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
