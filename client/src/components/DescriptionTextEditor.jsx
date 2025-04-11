import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

const DescriptionTextEditor = ({ setCourseFormData, setDescription }) => {
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
            if (setCourseFormData) {
                setCourseFormData((prev) => ({
                    ...prev,
                    description: editor.getHTML(),
                }));
            } else {
                setDescription(editor.getHTML());
            }
        },
    });

    const toolbarButton = (label, action, isActive) => (
        <button
            onClick={(e) => {
                e.preventDefault();
                action();
            }}
            className={`px-2 py-1 text-lg rounded-md ${isActive ? "bg-blue-600 text-gray-300" : "hover:bg-gray-500"
                } transition-all ease-in duration-100`}
        >
            {label}
        </button>
    );

    return (
        <div className="h-full max-w-full space-y-2 border border-gray-500 rounded-md w-fit">
            <div className="flex items-center gap-6 px-2 py-1 border-b border-gray-600">
                {toolbarButton("B", () => editor.chain().focus().toggleBold().run(), editor?.isActive("bold"))}
                {toolbarButton("I", () => editor.chain().focus().toggleItalic().run(), editor?.isActive("italic"))}
                {toolbarButton("U", () => editor.chain().focus().toggleUnderline().run(), editor?.isActive("underline"))}
                {toolbarButton("S", () => editor.chain().focus().toggleStrike().run(), editor?.isActive("strike"))}
                {toolbarButton("1.", () => editor.chain().focus().toggleOrderedList().run(), editor?.isActive("orderedList"))}
                {toolbarButton("•", () => editor.chain().focus().toggleBulletList().run(), editor?.isActive("bulletList"))}
            </div>
            <EditorContent editor={editor} className="h-full text-white xl:w-[800px] lg:w-[700px] w-full" />
        </div>
    );
};

export default DescriptionTextEditor;
