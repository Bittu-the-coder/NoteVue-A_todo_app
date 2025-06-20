import { useState, useEffect } from "react";
import { X, Tag, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { useNotesContext } from "../contexts/NoteContext";
import { getTags } from "../services/tags";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const COLORS = [
  { name: "Yellow", value: "bg-yellow-100" },
  { name: "Blue", value: "bg-blue-100" },
  { name: "Green", value: "bg-green-100" },
  { name: "Pink", value: "bg-pink-100" },
  { name: "Purple", value: "bg-purple-100" },
];

const AddNoteModal = ({
  isOpen,
  onClose,
  className,
  isEditing = false,
  noteId = null,
  note = null,
  onSuccess = () => {},
}) => {
  const [tags, setTags] = useState([]);
  const [noteData, setNoteData] = useState({
    content: "",
    color: COLORS[0].value,
    tags: [],
  });

  const { createNote, editNote } = useNotesContext();

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

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getTags();
        setTags(response || []);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    if (editor && noteData.content !== editor.getHTML()) {
      editor.commands.setContent(noteData.content);
    }
  }, [noteData.content, editor]);

  useEffect(() => {
    if (isEditing && note) {
      setNoteData({
        content: note.content || "",
        color: note.color || COLORS[0].value,
        tags: note.tags?.map((tag) => tag._id) || note.tags || [],
      });
    }
  }, [isEditing, note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!noteData.content.trim()) {
      alert("Note content is required");
      return;
    }

    try {
      if (isEditing) {
        await editNote(noteId, noteData);
      } else {
        await createNote(noteData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const toggleNoteTag = (tagId) => {
    setNoteData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId],
    }));
  };

  const renderToolbarButton = (icon, action, isActive, tooltip) => (
    <motion.button
      type="button"
      onClick={action}
      className={`p-2 rounded hover:bg-gray-200 transition-colors ${
        isActive
          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          : "text-gray-700"
      }`}
      title={tooltip}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.button>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <motion.div
            className={`${className} bg-white rounded-xl w-full max-w-md relative z-10`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-center p-4 border-b border-blue-100">
              <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {isEditing ? "Edit Note" : "Add New Note"}
              </h3>
              <motion.button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note Content
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-transparent bg-white shadow-sm">
                  {/* Toolbar */}
                  <div className="flex flex-wrap items-center p-2 border-b bg-gray-50 gap-1">
                    <div className="flex gap-1 mr-3 border-r pr-3">
                      {renderToolbarButton(
                        <span className="font-bold">B</span>,
                        () => editor?.chain().focus().toggleBold().run(),
                        editor?.isActive("bold"),
                        "Bold"
                      )}
                      {renderToolbarButton(
                        <span className="italic">I</span>,
                        () => editor?.chain().focus().toggleItalic().run(),
                        editor?.isActive("italic"),
                        "Italic"
                      )}
                      {renderToolbarButton(
                        <span className="underline">U</span>,
                        () => editor?.chain().focus().toggleUnderline().run(),
                        editor?.isActive("underline"),
                        "Underline"
                      )}
                    </div>
                  </div>

                  {/* Editor Content */}
                  <EditorContent
                    editor={editor}
                    className="p-3 bg-white text-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <Palette className="w-4 h-4 text-blue-600" /> Color
                  </label>
                  <div className="flex gap-2">
                    {COLORS.map((color) => (
                      <motion.button
                        type="button"
                        key={color.value}
                        onClick={() =>
                          setNoteData({ ...noteData, color: color.value })
                        }
                        className={`w-6 h-6 rounded-full ${color.value} ${
                          noteData.color === color.value
                            ? "ring-2 ring-offset-1 ring-blue-600"
                            : ""
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <Tag className="w-4 h-4 text-blue-600" /> Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <motion.button
                        type="button"
                        key={tag._id}
                        onClick={() => toggleNoteTag(tag._id)}
                        className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${
                          noteData.tags.includes(tag._id)
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tag.name}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isEditing ? "Save Changes" : "Add Note"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddNoteModal;
