import React from "react";

const BlogSkeleton = () => {
  return (
    <div className="bg-[#1e1e1e] rounded-2xl p-4 shadow-md animate-pulse">
      <div className="h-48 bg-[#333] rounded-xl mb-4 shimmer" />
      <div className="h-6 bg-[#333] rounded w-3/4 mb-2 shimmer" />
      <div className="h-4 bg-[#444] rounded w-1/2 shimmer" />
      <div className="mt-4 flex gap-2">
        <div className="h-10 w-10 rounded-full bg-[#444] shimmer" />
        <div className="flex-1">
          <div className="h-4 bg-[#444] rounded w-1/2 shimmer" />
          <div className="h-3 bg-[#333] rounded w-1/3 mt-1 shimmer" />
        </div>
      </div>
    </div>
  );
};

export default BlogSkeleton;
