import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
const TiptapEditor = ({ onContentChange, content = "" }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate({ editor }) {
      onContentChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const toolbarButtons = [
    {
      label: "B",
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
      title: "Bold",
    },
    {
      label: "I",
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
      title: "Italic",
    },
    {
      label: "S",
      action: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
      title: "Strikethrough",
    },
    {
      label: "H1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editor.isActive("heading", { level: 1 }),
      title: "Heading 1",
    },
    {
      label: "H2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
      title: "Heading 2",
    },
    {
      label: "H3",
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: editor.isActive("heading", { level: 3 }),
      title: "Heading 3",
    },
    {
      label: "P",
      action: () => editor.chain().focus().setParagraph().run(),
      active: editor.isActive("paragraph"),
      title: "Paragraph",
    },
    {
      label: "UL",
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
      title: "Bullet List",
    },
    {
      label: "OL",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
      title: "Ordered List",
    },
    {
      label: "Quote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      active: editor.isActive("blockquote"),
      title: "Quote",
    },
    {
      label: "Code",
      action: () => editor.chain().focus().toggleCode().run(),
      active: editor.isActive("code"),
      title: "Inline Code",
    },
    {
      label: "HR",
      action: () => editor.chain().focus().setHorizontalRule().run(),
      active: false,
      title: "Horizontal Rule",
    },
    {
      label: "↶",
      action: () => editor.chain().focus().undo().run(),
      active: false,
      title: "Undo",
    },
    {
      label: "↷",
      action: () => editor.chain().focus().redo().run(),
      active: false,
      title: "Redo",
    },
  ];

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-4 bg-[#eed2d1] rounded-t-lg">
        {toolbarButtons.map(({ label, action, active, title }, idx) => (
          <button
            key={idx}
            onClick={action}
            type="button"
            title={title}
            className={`
            px-3 py-1.5 text-sm font-semibold rounded transition-all duration-200 border shadow-sm
            ${
              active
                ? "bg-[#a55050] text-white border-[#a55050]"
                : "bg-white text-[#333] border-gray-300 hover:bg-[#f5eaea] hover:text-[#a55050] hover:border-[#a55050] hover:scale-[1.05]"
            }
            focus:outline-none focus:ring-2 focus:ring-[#a55050]
          `}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Editor Content */}
      <div
        className="min-h-[300px] bg-[#121212] p-6 text-white rounded-b-lg focus-within:ring-2 focus-within:ring-[#a55050] transition-all"
        onClick={() => editor?.chain().focus().run()}
      >
        <EditorContent
          editor={editor}
          className="ProseMirror focus:outline-none focus:ring-0 outline-none text-white"
        />
      </div>
    </div>
  );
};

export default TiptapEditor;
