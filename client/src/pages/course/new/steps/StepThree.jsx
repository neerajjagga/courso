import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

const StepThree = () => {
  const { setCourseFormData, setIsNextBtnEnabled } = useOutletContext();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      Placeholder.configure({
        placeholder: "Insert your course description.",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "min-h-[300px] px-4 py-2 outline-none text-gray-200 text-xl",
      },
    },
    onUpdate: ({ editor }) => {
      setCourseFormData((prev) => ({
        ...prev,
        description: editor.getHTML(),
      }));
    },
  });

  useEffect(() => {
    setIsNextBtnEnabled(true);
  }, []);

  const toolbarButton = (label, action, isActive) => (
    <button
      onClick={(e) => {
        e.preventDefault();
        action();
      }}
      className={`px-2 py-1 text-lg rounded-md ${isActive ? "bg-blue-600 text-gray-300" : "hover:bg-gray-500"} transition-all ease-in duration-100`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center w-full gap-10 md:gap-20 md:pt-16">

      <div className='space-y-4 text-center md:space-y-8'>
        <h1 className="text-2xl font-bold text-gray-200 sm:text-3xl md:text-4xl">How about a working description?</h1>
        <p className="text-gray-400">It's ok if you can't think of a good title now. You can change it later.</p>
      </div>

      <div className="space-y-2 border border-gray-500 rounded-md">
        <div className="flex items-center gap-6 px-2 py-1 border-b border-gray-600">
          {toolbarButton("B", () => editor.chain().focus().toggleBold().run(), editor?.isActive("bold"))}
          {toolbarButton("I", () => editor.chain().focus().toggleItalic().run(), editor?.isActive("italic"))}
          {toolbarButton("U", () => editor.chain().focus().toggleUnderline().run(), editor?.isActive("underline"))}
          {toolbarButton("S", () => editor.chain().focus().toggleStrike().run(), editor?.isActive("strike"))}
          {toolbarButton("1.", () => editor.chain().focus().toggleOrderedList().run(), editor?.isActive("orderedList"))}
          {toolbarButton("•", () => editor.chain().focus().toggleBulletList().run(), editor?.isActive("bulletList"))}
        </div>

        <EditorContent editor={editor} className="min-h-[150px] md:w-[800px] xs:w-[400px] w-full sm:w-[600px] text-white" />
      </div>
    </div>
  );
};

export default StepThree;
