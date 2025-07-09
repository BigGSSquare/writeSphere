import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import TiptapEditor from "../components/tiptap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById } from "../features/blog/blogSlice";
const EditBlog = () => {
  const [editorContent, setEditorContent] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    thumbnail: null,
  });
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBlogById(id));
  }, [dispatch, id]);
  const blog = useSelector((state) => {
    return state.blog.blogDetails;
  });
  const { title, subtitle, content, author } = blog || {};
  useEffect(() => {
    if (blog) {
      setFormData({
        title: title,
        subtitle: subtitle,
        author: author,
        thumbnail: null,
      });
      setEditorContent(content);
    }
  }, [blog]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.subtitle.trim()) {
      newErrors.subtitle = "Subtitle is required";
    }

    if (!formData.thumbnail) {
      newErrors.thumbnail = "Thumbnail is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validateForm()) return;

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("subtitle", formData.subtitle);
    submitData.append("content", editorContent);
    submitData.append("thumbnail", formData.thumbnail);

    try {
      console.log("Form submitted:", { ...formData, content: editorContent });
      // Here you would make your API call
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditorChange = (html) => {
    setEditorContent(html);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, thumbnail: file }));
    if (errors.thumbnail) {
      setErrors((prev) => ({ ...prev, thumbnail: "" }));
    }
  };

  return (
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
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full p-4 text-lg border border-gray-600 bg-[#121212] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a55050] focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
            {errors.title && (
              <p className="text-red-400 text-sm">{errors.title}</p>
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
              value={formData.subtitle}
              onChange={(e) => handleInputChange("subtitle", e.target.value)}
              className="w-full p-4 text-lg border border-gray-600 bg-[#121212] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a55050] focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
            {errors.subtitle && (
              <p className="text-red-400 text-sm">{errors.subtitle}</p>
            )}
          </div>

          {/* Content Editor */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Content
            </label>
            <TiptapEditor onContentChange={handleEditorChange} />
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Thumbnail Image
            </label>
            <div className="mb-3 border-2 border-dashed border-[#a55050] rounded-lg p-8 text-center hover:border-[#8b4444] transition-colors duration-200">
              <label className="block cursor-pointer">
                <div className="space-y-2">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-[#eed2d1] rounded-full">
                    <svg
                      className="w-6 h-6 text-[#a55050]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <div>
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
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {formData.thumbnail && (
                <div className="mt-4 p-3 bg-[#1a1a1a] rounded-lg border border-gray-600">
                  <p className="text-sm text-gray-300 font-medium">
                    Selected: {formData.thumbnail.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {(formData.thumbnail.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>
            {errors.thumbnail && (
              <p className="text-red-400 text-sm">{errors.thumbnail}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={onSubmit}
              disabled={!editorContent}
              className="w-full bg-[#a55050] text-white py-4 rounded-lg text-lg font-semibold hover:bg-[#8b4444] disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Publish Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
