import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import instance from "../api/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await instance.post(
        "http://localhost:3000/api/v1/user/login",
        data,
        { withCredentials: true }
      );
      if (res.data.success == true) {
        dispatch(loginSuccess(res.data.user));
        toast.success("Logged in successfully");
        navigate("/");
      } else {
        toast.error("Logged out successfully");
      }
    } catch (err) {
      toast.error("login failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090b0a] to-[#1f1f1f] flex items-center justify-center px-4">
      <div className="bg-[#dacacf] rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#a55050] mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              placeholder="you@example.com"
              {...register("username", { required: true })}
              className="mt-1 p-2 w-full border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a55050]"
            />
            {errors.username && (
              <p className="text-sm text-red-600 mt-1">Email is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", { required: true })}
              className="mt-1 p-2 w-full border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a55050]"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">Password is required</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#a55050] text-white py-2 rounded-md hover:bg-[#923b3b] transition duration-200"
          >
            Login
          </button>
          <div className="text-center">
            <p>
              did not register?{" "}
              <Link to="/SignUp" className="text-blue-400">
                register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
