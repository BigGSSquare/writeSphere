import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";
import Searchbar from "./searchbar";
import CategoryDropdown from "./CategoryDropdown";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <nav className="shadow-md bg-[#090b0a] text-[#a55050] p-4 flex justify-between h-16 items-center">
      {/* This is the container with the layout fixes */}
      <div className="flex items-center gap-4 ml-10">
        <NavLink to="/" className="text-xl font-bold">
          <h1 className="font-Inter font-extrabold tracking-tighter text-2xl">
            WriteSphere
          </h1>
        </NavLink>

        {/* This container groups the search elements */}
        <div className="flex items-center gap-2">
          {isAuthenticated && <Searchbar />}
          {isAuthenticated && <CategoryDropdown />}
        </div>
      </div>

      <div className="flex items-center space-x-6 mr-10 tracking-wider">
        <NavLink
          to="/Blogs"
          className="text-[#eed2d1] hover:text-[#a55050] transition"
        >
          Blog
        </NavLink>
        <NavLink
          to="/About"
          className="text-[#eed2d1] hover:text-[#a55050] transition"
        >
          About
        </NavLink>

        {!isAuthenticated ? (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-[#a55050] hover:text-[#a55050] transition"
                  : "text-[#eed2d1] hover:text-[#a55050] transition"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/SignUp"
              className="text-[#eed2d1] hover:text-[#a55050] transition"
            >
              Register
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/create"
              className="text-[#eed2d1] hover:text-[#a55050] transition"
            >
              Write
            </NavLink>
            {isAuthenticated && user && <ProfileDropdown user={user} />}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
