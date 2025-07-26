import { useState } from "react";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../features/blog/blogSlice";
import TiptapEditor from "../components/tiptap";

const Write = () => {
  const { loading } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Zod schema updated to include 'category'
  const blogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().min(1, "Subtitle is required"),
    category: z.string().min(1, "Category is required"),
    content: z.string().min(1, "Content is required"),
    // Allow for empty file list initially
    thumbnail: z
      .any()
      .refine((files) => files?.length >= 1, "Thumbnail is required."),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(blogSchema),
    // 2. Default value for category added
    defaultValues: {
      title: "",
      subtitle: "",
      category: "",
      content: "",
      thumbnail: null,
    },
  });

  const watchThumbnail = watch("thumbnail");

  const onsubmit = async (data) => {
    const formData = new FormData();
    // 3. Category appended to FormData
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("category", data.category);
    formData.append("content", data.content);
    formData.append("thumbnail", data.thumbnail[0]);

    try {
      await dispatch(addBlog(formData)).unwrap();
      toast.success("Blog created successfully");
      navigate("/blogs");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Failed to create blog");
    }
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="min-h-screen bg-[#090b0a] py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-[#a55050] mb-10">
            Write Your Blog
          </h2>

          <div className="space-y-6 bg-black text-white p-8 rounded-xl shadow-lg">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter your blog title..."
                {...register("title")}
                className="w-full p-4 text-lg border border-gray-600 bg-[#121212] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a55050] focus:border-transparent transition-all duration-200 placeholder-gray-400"
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Subtitle Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Subtitle
              </label>
              <input
                type="text"
                placeholder="Enter your blog subtitle..."
                {...register("subtitle")}
                className="w-full p-4 text-lg border border-gray-600 bg-[#121212] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a55050] focus:border-transparent transition-all duration-200 placeholder-gray-400"
              />
              {errors.subtitle && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.subtitle.message}
                </p>
              )}
            </div>

            {/* 4. Category Dropdown Added */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Category
              </label>
              <select
                {...register("category")}
                className="w-full p-4 text-lg border border-gray-600 bg-[#121212] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a55050] focus:border-transparent transition-all duration-200"
              >
                <option value="" disabled>
                  Select a category...
                </option>
                <option value="Tech">Tech</option>
                <option value="Politics">Politics</option>
                <option value="Business">Business</option>
                <option value="Anime">Anime</option>
              </select>
              {errors.category && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Content Editor */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Content
              </label>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <TiptapEditor
                    onContentChange={field.onChange}
                    content={field.value}
                  />
                )}
              />
              {errors.content && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.content.message}
                </p>
              )}
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Thumbnail Image
              </label>
              <div className="mb-3 border-2 border-dashed border-[#a55050] rounded-lg p-8 text-center hover:border-[#8b4444] transition-colors duration-200">
                <label className="block cursor-pointer">
                  <div className="space-y-2">
                    <div className="p-10">
                      <span className="bg-[#eed2d1] text-[#a55050] px-6 py-3 rounded-md font-medium hover:bg-[#e0c5c4] transition-colors duration-200">
                        Choose Thumbnail
                      </span>
                      <p className="text-sm text-gray-400 mt-6">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("thumbnail")}
                    className="hidden"
                  />
                </label>
                {watchThumbnail && watchThumbnail[0] && (
                  <div className="mt-4 p-3 bg-[#1a1a1a] rounded-lg border border-gray-600">
                    <p className="text-sm text-gray-300 font-medium">
                      Selected: {watchThumbnail[0].name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(watchThumbnail[0].size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>
              {errors.thumbnail && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.thumbnail.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#a55050] text-white py-4 rounded-lg text-lg font-semibold hover:bg-[#8b4444] disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg mt-3"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin" />
                    <span>PUBLISHING...</span>
                  </div>
                ) : (
                  <span>Publish Blog</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Write;
