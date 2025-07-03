import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useForm } from "react-hook-form";
import React from "react";
import instance from "../api/axios";
import toast from "react-hot-toast";
import TiptapEditor from "../components/tiptap";
const Write = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("content", editor.getHTML());
    formData.append("thumbnail", data.thumbnail[0]);
    try {
      await instance.post("/v1/blog/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      toast.success("Blog created successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create blog");
    }
  };

  return (
    <div className="bg-[#090b0a]">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-4xl font-extrabold text-center text-[#a55050] mb-10">
          Write Your Blog
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="space-y-8 bg-white p-8 rounded-xl shadow-md"
        >
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
            className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a55050]"
          />
          <input
            type="text"
            placeholder="Subtitle"
            {...register("subtitle", { required: true })}
            className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a55050]"
          />
          <div className="border border-[#eed2d1] rounded-b-lg min-h-[400px] p-4 bg-white">
            <EditorContent editor={editor} />
          </div>

          <div className="border border-dashed border-[#a55050] rounded-lg p-6 text-center">
            <label className="block cursor-pointer">
              <span className="bg-[#eed2d1] text-[#a55050] px-4 py-2 rounded-md font-medium">
                Choose Thumbnail
              </span>
              <input
                type="file"
                accept="image/*"
                {...register("thumbnail", { required: true })}
                className="hidden"
              />
            </label>
            {watch("thumbnail")?.[0]?.name && (
              <p className="mt-2 text-sm text-gray-700">
                {watch("thumbnail")[0].name}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!editor}
            className="w-full bg-[#eed2d1] text-[#b08f8f] py-3 rounded-lg text-lg font-semibold hover:bg-[#a55050] transition duration-200"
          >
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Write;
