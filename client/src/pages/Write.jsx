import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import instance from "../api/axios";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [thumbnail, setThumbnail] = useState(null);
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p></p>",
  });

  const onSubmit = async (data) => {
    if (!editor?.getHTML() || !thumbnail) {
      toast.error("Content and thumbnail are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("content", editor.getHTML());
    formData.append("thumbnail", thumbnail);

    try {
      const res = await instance.post("/v1/blog/create", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Blog created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating blog");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
          className="w-full p-2 border rounded"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">Title is required</p>
        )}

        <input
          type="text"
          placeholder="Subtitle"
          {...register("subtitle", { required: true })}
          className="w-full p-2 border rounded"
        />
        {errors.subtitle && (
          <p className="text-red-500 text-sm">Subtitle is required</p>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
          className="w-full"
        />
        {!thumbnail && (
          <p className="text-red-500 text-sm">Thumbnail is required</p>
        )}

        <div className="border p-2 rounded">
          <EditorContent editor={editor} />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
