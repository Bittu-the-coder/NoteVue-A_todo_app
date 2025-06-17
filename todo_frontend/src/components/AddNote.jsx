// import { useState } from "react";
// import { FiX } from "react-icons/fi";

// const COLORS = [
//   { name: "Yellow", value: "bg-yellow-100" },
//   { name: "Blue", value: "bg-blue-100" },
//   { name: "Green", value: "bg-green-100" },
//   { name: "Pink", value: "bg-pink-100" },
//   { name: "Purple", value: "bg-purple-100" },
// ];

// const AddNoteModal = ({ isOpen, onClose, onSubmit }) => {
//   const [noteData, setNoteData] = useState({
//     content: "",
//     color: COLORS[0].value,
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(noteData);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl w-full max-w-md">
//         <div className="flex justify-between items-center p-4 border-b">
//           <h3 className="text-lg font-semibold text-purple-900">
//             Add New Note
//           </h3>
//           <button
//             onClick={onClose}
//             className="text-purple-400 hover:text-purple-600"
//           >
//             <FiX size={20} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-4 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Note Content
//             </label>
//             <textarea
//               value={noteData.content}
//               onChange={(e) =>
//                 setNoteData({ ...noteData, content: e.target.value })
//               }
//               className="w-full h-32 border text-black border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-300 focus:border-transparent"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Color
//             </label>
//             <div className="flex gap-2">
//               {COLORS.map((color) => (
//                 <button
//                   type="button"
//                   key={color.value}
//                   onClick={() =>
//                     setNoteData({ ...noteData, color: color.value })
//                   }
//                   className={`w-8 h-8 rounded-full ${color.value} ${
//                     noteData.color === color.value
//                       ? "ring-2 ring-offset-2 ring-purple-500"
//                       : ""
//                   }`}
//                   title={color.name}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-end gap-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
//             >
//               Add Note
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddNoteModal;
import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiLink,
} from "react-icons/fi";

const COLORS = [
  { name: "Yellow", value: "bg-yellow-100" },
  { name: "Blue", value: "bg-blue-100" },
  { name: "Green", value: "bg-green-100" },
  { name: "Pink", value: "bg-pink-100" },
  { name: "Purple", value: "bg-purple-100" },
];

const AddNoteModal = ({ isOpen, onClose, onSubmit }) => {
  const [noteData, setNoteData] = useState({
    content: "",
    color: COLORS[0].value,
  });

  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Write your note here...",
      }),
    ],
    content: noteData.content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setNoteData({ ...noteData, content: html });
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none text-black focus:outline-none w-full min-h-[120px]",
      },
    },
  });

  // Update editor content when noteData.content changes (e.g., when editing an existing note)
  useEffect(() => {
    if (editor && noteData.content !== editor.getHTML()) {
      editor.commands.setContent(noteData.content);
    }
  }, [noteData.content, editor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(noteData);
    onClose();
  };

  const addLink = () => {
    if (linkUrl) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
      setLinkUrl("");
      setShowLinkInput(false);
    }
  };

  const renderToolbarButton = (icon, action, isActive, tooltip) => (
    <button
      type="button"
      onClick={action}
      className={`p-2 rounded hover:bg-gray-200 transition-colors ${
        isActive ? "bg-purple-100 text-purple-800" : "text-gray-700"
      }`}
      title={tooltip}
    >
      {icon}
    </button>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-purple-900">
            Add New Note
          </h3>
          <button
            onClick={onClose}
            className="text-purple-400 hover:text-purple-600 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Note Content
            </label>
            {/* Tiptap Editor Container */}
            <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-purple-300 focus-within:border-transparent bg-white shadow-sm">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center p-2 border-b bg-gray-50">
                <div className="flex space-x-1 mr-3 border-r pr-3">
                  {renderToolbarButton(
                    <FiBold size={16} />,
                    () => editor?.chain().focus().toggleBold().run(),
                    editor?.isActive("bold"),
                    "Bold"
                  )}
                  {renderToolbarButton(
                    <FiItalic size={16} />,
                    () => editor?.chain().focus().toggleItalic().run(),
                    editor?.isActive("italic"),
                    "Italic"
                  )}
                  {renderToolbarButton(
                    <FiUnderline size={16} />,
                    () => editor?.chain().focus().toggleUnderline().run(),
                    editor?.isActive("underline"),
                    "Underline"
                  )}
                </div>

                <div className="flex space-x-1 mr-3 border-r pr-3">
                  {renderToolbarButton(
                    <FiList size={16} />,
                    () => editor?.chain().focus().toggleBulletList().run(),
                    editor?.isActive("bulletList"),
                    "Bullet List"
                  )}
                </div>

                <div className="flex space-x-1 mr-3 border-r pr-3">
                  {renderToolbarButton(
                    <FiAlignLeft size={16} />,
                    () => editor?.chain().focus().setTextAlign("left").run(),
                    editor?.isActive({ textAlign: "left" }),
                    "Align Left"
                  )}
                  {renderToolbarButton(
                    <FiAlignCenter size={16} />,
                    () => editor?.chain().focus().setTextAlign("center").run(),
                    editor?.isActive({ textAlign: "center" }),
                    "Align Center"
                  )}
                  {renderToolbarButton(
                    <FiAlignRight size={16} />,
                    () => editor?.chain().focus().setTextAlign("right").run(),
                    editor?.isActive({ textAlign: "right" }),
                    "Align Right"
                  )}
                </div>

                <div className="flex space-x-1">
                  {renderToolbarButton(
                    <FiLink size={16} />,
                    () => setShowLinkInput(!showLinkInput),
                    showLinkInput,
                    "Add Link"
                  )}
                </div>
              </div>

              {/* Link Input */}
              {showLinkInput && (
                <div className="flex items-center p-2 bg-gray-50 border-b">
                  <input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="Enter URL"
                    className="flex-1 p-1 text-purple-700 border border-gray-300 rounded text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLinkInput(false)}
                    className="ml-2 px-2 py-1 bg-gray-200 text-gray-600 rounded text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={addLink}
                    className="ml-2 px-2 py-1 bg-purple-600 text-white rounded text-sm"
                  >
                    Add
                  </button>
                </div>
              )}

              {/* Editor Content (Visible Area) */}
              <EditorContent
                editor={editor}
                className="p-3 bg-white text-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex gap-3">
              {COLORS.map((color) => (
                <button
                  type="button"
                  key={color.value}
                  onClick={() =>
                    setNoteData({ ...noteData, color: color.value })
                  }
                  className={`w-8 h-8 rounded-full ${color.value} ${
                    noteData.color === color.value
                      ? "ring-2 ring-offset-2 ring-purple-500"
                      : "hover:ring-1 hover:ring-offset-1 hover:ring-purple-300"
                  } transition-all`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNoteModal;
