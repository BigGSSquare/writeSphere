import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { clearSearch, searchBlog } from "../features/blog/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import { useEffect } from "react";
const Searchbar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 500);
  const category = useSelector((state) => state.blog.category);
  console.log("This is state change in searchbar" + category);
  useEffect(() => {
    if (debouncedValue || category) {
      dispatch(searchBlog({ searchTerm: debouncedValue, category: category }));
    } else {
      dispatch(clearSearch());
    }
  }, [debouncedValue, dispatch, category]);
  return (
    <div className="flex items-center gap-2 border border-[#a55050] rounded-md w-full max-w-md px-4 py-2 shadow-sm bg-black">
      <IoSearchOutline className="text-xl text-[#a55050] " />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search blogs..."
        className="flex-1 outline-none bg-transparent text-[#a55050]  placeholder:text-gray-400"
      />
    </div>
  );
};

export default Searchbar;
