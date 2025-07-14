import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById, updateBlogById } from "../features/blog/blogSlice";
import TiptapEditor from "../components/tiptap";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  content: z.string().min(1, "Content is required"),
  thumbnail: z.any(),
});

const EditBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blog = useSelector((state) => state.blog.blogDetails);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      content: "",
      thumbnail: null,
    },
  });

  const watchThumbnail = watch("thumbnail");

  // Fetch blog data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogData = await dispatch(fetchBlogById(id)).unwrap();
        reset({
          title: blogData.title,
          subtitle: blogData.subtitle,
          content: blogData.content,
          thumbnail: null,
        });
      } catch (err) {
        toast.error("Failed to fetch blog.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, id, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("content", data.content);
    if (data.thumbnail && data.thumbnail.length > 0) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    try {
      await dispatch(updateBlogById({ id, formData })).unwrap();
      toast.success("Blog updated successfully!");
      navigate("/blogs");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update blog.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading blog data...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="min-h-screen bg-[#090b0a] py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-[#a55050] mb-10">
            Edit Your Blog
          </h2>

          <div className="space-y-6 bg-black text-white p-8 rounded-xl shadow-lg">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Title
              </label>
              <input
                type="text"
                {...register("title")}
                placeholder="Enter your blog title..."
                className="w-full p-4 text-lg border border-gray-600 bg-[#121212] text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a55050]"
              />
              {errors.title && (
                <p className="text-red-400 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Subtitle Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Subtitle
              </label>
              <input
                type="text"
                {...register("subtitle")}
                placeholder="Enter your blog subtitle..."
                className="w-full p-4 text-lg border border-gray-600 bg-[#121212] text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a55050]"
              />
              {errors.subtitle && (
                <p className="text-red-400 text-sm">
                  {errors.subtitle.message}
                </p>
              )}
            </div>

            {/* Tiptap Content Editor */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Content
              </label>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <TiptapEditor
                    content={field.value}
                    onContentChange={field.onChange}
                  />
                )}
              />
              {errors.content && (
                <p className="text-red-400 text-sm">{errors.content.message}</p>
              )}
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Thumbnail Image
              </label>
              <div className="mb-3 border-2 border-dashed border-[#a55050] rounded-lg p-8 text-center hover:border-[#8b4444] transition-colors duration-200">
                <label className="block cursor-pointer">
                  <div className="p-10">
                    <span className="bg-[#eed2d1] text-[#a55050] px-6 py-3 rounded-md font-medium hover:bg-[#e0c5c4] transition">
                      Choose Thumbnail
                    </span>
                    <p className="text-sm text-gray-400 mt-6">
                      PNG, JPG, GIF up to 10MB
                    </p>
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
                <p className="text-red-400 text-sm">
                  {errors.thumbnail.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#a55050] text-white py-4 rounded-lg text-lg font-semibold hover:bg-[#8b4444] disabled:bg-gray-600 disabled:cursor-not-allowed transition shadow-md hover:shadow-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin" />
                    <span>UPDATING...</span>
                  </div>
                ) : (
                  <span>Update Blog</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditBlog;
