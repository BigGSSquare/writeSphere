import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import instance from "../api/axios";
import { logout } from "../features/auth/authSlice";
import toast from "react-hot-toast";
const ProfileDropdown = ({ user }) => {
  const navigate = useNavigate();
  console.log(user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    instance.post("http://localhost:3000/api/v1/user/logout");
    dispatch(logout());
    toast.success("logged out successfully");
    navigate("/");
  };
  return (
    <Menu as="div" className="relative inline-block text-left z-50">
      <MenuButton className="focus:outline-none">
        {user?.profilePic ? (
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-[#a55050] shadow-lg transition hover:scale-105"
          />
        ) : (
          <FaUserCircle className="w-10 h-10 text-white hover:text-[#a55050] transition cursor-pointer" />
        )}
      </MenuButton>

      <MenuItems className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-[#a55050]/30 bg-[#0f0f10]/80 backdrop-blur-md shadow-2xl ring-1 ring-black ring-opacity-10 focus:outline-none overflow-visible">
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#a55050]/20">
          <p className="text-sm text-white font-semibold">
            {user?.firstname || "Guest User"}
          </p>
          <p className="text-xs text-gray-400">
            {user?.email || "email@example.com"}
          </p>
        </div>

        {/* Menu Items */}
        <MenuItem>
          {({ active }) => (
            <NavLink
              to="/profile"
              className={`block px-4 py-2 text-sm rounded-md transition ${
                active
                  ? "bg-[#a55050]/20 text-white"
                  : "text-gray-200 hover:bg-[#a55050]/10"
              }`}
            >
              Profile Settings
            </NavLink>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <NavLink
              to="/MyBlogs"
              className={`block px-4 py-2 text-sm rounded-md transition ${
                active
                  ? "bg-[#a55050]/20 text-white"
                  : "text-gray-200 hover:bg-[#a55050]/10"
              }`}
            >
              My Blogs
            </NavLink>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <button
              onClick={handleLogout}
              className={`block w-full text-left px-4 py-2 text-sm rounded-md transition cursor-pointer ${
                active
                  ? "bg-[#a55050]/30 text-white"
                  : "text-red-400 hover:bg-[#a55050]/10"
              }`}
            >
              Logout
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default ProfileDropdown;
