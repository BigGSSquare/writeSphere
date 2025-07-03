import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const TiptapEditor = ({ onContentChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate({ editor }) {
      onContentChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 p-3 rounded-md bg-light border border-primary/30">
        {[
          {
            label: "B",
            action: () => editor.chain().focus().toggleBold().run(),
            active: editor.isActive("bold"),
          },
          {
            label: "I",
            action: () => editor.chain().focus().toggleItalic().run(),
            active: editor.isActive("italic"),
          },
          {
            label: "H1",
            action: () =>
              editor.chain().focus().toggleHeading({ level: 1 }).run(),
            active: editor.isActive("heading", { level: 1 }),
          },
          {
            label: "H2",
            action: () =>
              editor.chain().focus().toggleHeading({ level: 2 }).run(),
            active: editor.isActive("heading", { level: 2 }),
          },
          {
            label: "List",
            action: () => editor.chain().focus().toggleBulletList().run(),
            active: editor.isActive("bulletList"),
          },
          { label: "Undo", action: () => editor.chain().focus().undo().run() },
          { label: "Redo", action: () => editor.chain().focus().redo().run() },
        ].map(({ label, action, active }, idx) => (
          <button
            key={idx}
            onClick={action}
            type="button"
            className={`px-3 py-1 rounded border ${
              active ? "bg-primary text-white" : "bg-white text-primary"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Editor Content */}
      <div className="border border-light rounded-md min-h-[350px] bg-white">
        <EditorContent editor={editor} className="prose w-full max-w-none" />
      </div>
    </div>
  );
};

export default TiptapEditor;
