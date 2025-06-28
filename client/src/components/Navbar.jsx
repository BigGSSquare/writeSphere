import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import instance from "../api/axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <nav className="shadow-md bg-[#090b0a] text-[#a55050] p-4 flex justify-between h-16 items-center">
      <Link to="/" className="text-xl font-bold">
        <h1 className="font-Inter font-extrabold tracking-tighter ml-10">
          WriteSphere
        </h1>
      </Link>

      <div className="flex items-center space-x-6 mr-10 tracking-wider">
        <Link to="/Blogs" className="text-[#eed2d1] hover:text-[#a55050]">
          Blog
        </Link>
        <Link to="/About" className="text-[#eed2d1] hover:text-[#a55050]">
          About
        </Link>

        {!isAuthenticated ? (
          <>
            <Link to="/login" className="text-[#eed2d1] hover:text-[#a55050]">
              Login
            </Link>
            <Link to="/SignUp" className="text-[#eed2d1] hover:text-[#a55050]">
              Register
            </Link>
          </>
        ) : (
          <>
            {isAuthenticated && user && (
              <span className="text-[#eed2d1]">Welcome, {user.firstname}</span>
            )}
            <Link to="/create" className="text-[#eed2d1] hover:text-[#a55050]">
              Write
            </Link>

            <button
              onClick={() => {
                instance.post("http://localhost:3000/api/v1/user/logout");
                dispatch(logout());
                toast.success("logged out successfully");
                navigate("/");
              }}
              className="text-[#eed2d1] hover:text-red-400"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
