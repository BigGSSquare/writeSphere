import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import instance from "../api/axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ProfileDropdown from "./ProfileDropdown";
import { FaSearch } from "react-icons/fa";
import Searchbar from "./searchbar";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <nav className="shadow-md bg-[#090b0a] text-[#a55050] p-4 flex justify-between h-16 items-center">
      <div className="flex items-baseline gap-9 ml-10">
        <NavLink to="/" className="text-xl font-bold">
          <h1 className="font-Inter font-extrabold tracking-tighter text-2xl">
            WriteSphere
          </h1>
        </NavLink>
        <Searchbar />
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
              className={({ isActive }) => {
                isActive
                  ? "text-[#a55050] hover:text-[#a55050] transition"
                  : "text-[#eed2d1] hover:text-[#a55050] transition";
              }}
            >
              Register
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/create"
              className={({ isActive }) => {
                isActive
                  ? "text-[#a55050] hover:text-[#a55050] transition"
                  : "text-[#eed2d1] hover:text-[#a55050] transition";
              }}
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
