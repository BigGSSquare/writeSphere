import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { setCategory, clearCategory } from "../features/blog/blogSlice";

const categories = ["Tech", "Politics", "Business", "Anime"];

const CategoryDropdown = () => {
  const dispatch = useDispatch();
  // Correctly select the category string from the state
  const category = useSelector((state) => state.blog.category);

  const handleClick = (cat) => {
    // Correctly dispatch the category string or clear it
    cat ? dispatch(setCategory(cat)) : dispatch(clearCategory());
  };

  return (
    <div className="relative inline-block text-left">
      <Menu>
        {/* The MenuButton is styled to exactly match the Searchbar's appearance */}
        <MenuButton className="flex h-full items-center gap-2 border border-[#a55050] rounded-md w-full max-w-md px-4 py-2.5 shadow-sm bg-black text-sm font-medium text-gray-400 hover:border-red-400 transition-colors">
          <span className="flex-1 text-left">{category || "Category"}</span>
          <svg
            className="h-5 w-5 text-[#a55050]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </MenuButton>

        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {/* The MenuItems panel now has a matching dark theme */}
          <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-black border border-[#a55050] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {categories.map((cat) => (
                <MenuItem key={cat}>
                  {({ active }) => (
                    <button
                      onClick={() => handleClick(cat)}
                      className={`${
                        active ? "bg-[#a55050] text-white" : "text-gray-300"
                      } group flex w-full items-center px-4 py-2 text-sm transition-colors`}
                    >
                      {cat}
                    </button>
                  )}
                </MenuItem>
              ))}
              <div className="border-t border-gray-700 my-1" />
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => handleClick()}
                    className={`${
                      active ? "bg-[#a55050] text-white" : "text-gray-300"
                    } group flex w-full items-center px-4 py-2 text-sm transition-colors`}
                  >
                    No Category
                  </button>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default CategoryDropdown;
