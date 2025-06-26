import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import toast from "react-hot-toast";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const res = await instance.post("/v1/user/register", data, {
        withCredentials: true,
      });
      toast.success("registered successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090b0a] to-[#1f1f1f] flex items-center justify-center px-4">
      <div className="bg-[#dacacf] rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#a55050] mb-6">
          Create Account
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
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a55050]"
            />
            {errors.username && (
              <p className="text-sm text-red-600 mt-1">Email is required</p>
            )}
          </div>

          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                {...register("firstname", { required: true })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a55050]"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastname", { required: true })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a55050]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Middle Name
            </label>
            <input
              type="text"
              {...register("middlename")}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a55050]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 8 })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a55050]"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                Password must be at least 8 characters
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#a55050] text-white py-2 rounded-md hover:bg-[#923b3b] transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
