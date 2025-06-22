import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" shadow-md bg-[#090b0a] text-[#a55050] p-4 flex justify-between h-16">
      <Link to="/" className="text-xl font-bold">
        <h1 className="font-Inter font-extrabold tracking-tighter ml-10">
          WriteSphere
        </h1>
      </Link>
      <div className="space-x-4 mr-10 gap-5 tracking-wider">
        <Link to="/Blogs" className="text-[#eed2d1] hover:text-[#a55050]">
          Blog
        </Link>
        <Link to="/login" className="text-[#eed2d1] hover:text-[#a55050]">
          Login
        </Link>
        <Link to="/SignUp" className="text-[#eed2d1] hover:text-[#a55050]">
          Register
        </Link>
        <Link to="/About" className="text-[#eed2d1] hover:text-[#a55050]">
          About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
