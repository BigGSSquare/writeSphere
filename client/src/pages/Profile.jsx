import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { updateUserById } from "../features/auth/authSlice";
const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  useEffect(() => {
    if (user) {
      reset({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        bio: user.bio || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("bio", data.bio);
    if (selectedImage) {
      formData.append("profileImage", selectedImage);
    }
    dispatch(updateUserById({ formData }));
  };

  // A simple loading state
  if (loading) {
    return (
      <div className="bg-[#1a1a1a] min-h-screen w-full flex justify-center items-center text-white">
        Loading Profile...
      </div>
    );
  }

  return (
    // PRINCIPLE 1: The Page Container
    <div className="bg-[#1a1a1a] min-h-screen w-full p-4 sm:p-6 lg:p-8 flex justify-center items-start">
      {/* PRINCIPLE 2: The "Card" Layout */}
      <div className="w-full max-w-2xl bg-[#2a2a2a] rounded-2xl shadow-2xl p-6 sm:p-8 space-y-8">
        {/* PRINCIPLE 3: The Profile Header */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            <img
              alt="User Avatar"
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : user?.photoURL
              }
              className="w-28 h-28 rounded-full object-cover border-4 border-[#a55050]"
            />
            <label
              htmlFor="profile-image-upload"
              className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
            >
              <CameraAltIcon style={{ color: "white", fontSize: "2rem" }} />
            </label>
            <input
              type="file"
              accept="image/*"
              id="profile-image-upload"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setSelectedImage(file);
              }}
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {`${user?.firstname || ""} ${user?.lastname || ""}`.trim() ||
                "User Name"}
            </h1>
            <p className="text-md text-gray-400">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>

        {/* PRINCIPLE 4: The Form with Clear Structure */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* First Name Field Group */}
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                First Name
              </label>
              <input
                id="firstname"
                type="text"
                {...register("firstname", {
                  required: "First name is required",
                })}
                className="w-full p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#a55050] focus:border-[#a55050] transition-colors"
                placeholder="Your first name"
              />
              {errors.firstname && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstname.message}
                </p>
              )}
            </div>

            {/* Last Name Field Group */}
            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Last Name
              </label>
              <input
                id="lastname"
                type="text"
                {...register("lastname", { required: "Last name is required" })}
                className="w-full p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#a55050] focus:border-[#a55050] transition-colors"
                placeholder="Your last name"
              />
              {errors.lastname && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>

          {/* Email field (often read-only) */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              readOnly
              className="w-full p-3 bg-[#101010] border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
              placeholder="you@example.com"
            />
          </div>

          {/* Bio field */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Bio
            </label>
            <textarea
              id="bio"
              rows="3"
              {...register("bio")}
              className="w-full p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#a55050] focus:border-[#a55050] transition-colors"
              placeholder="Tell us a little about yourself..."
            />
          </div>

          {/* PRINCIPLE 5: The Call-to-Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-3 bg-[#a55050] text-white font-bold rounded-lg hover:bg-[#944646] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#2a2a2a] focus:ring-[#a55050] transition-all duration-300 transform hover:scale-[1.02] disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
