import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { addNote, deleteNote, getNotes, updateNote } from "../services/notes";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newNote, setNewNote] = useState({
    content: "",
    color: "",
    tags: [],
    createdAt: new Date(),
  });

  // Fetch all notes on initial load
  useEffect(() => {
    getAllNotes();
  }, []);

  // Create new note
  const createNote = async (noteData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await addNote(noteData || newNote);
      if (response) {
        setNotes((prevNotes) => [...prevNotes, response]);
        // Reset the new note form
        setNewNote({
          content: "",
          color: "",
          tags: [],
          createdAt: new Date(),
        });
        return response;
      }
    } catch (err) {
      setError(err.message || "Failed to create note");
      console.error("Failed to create note:", err);
    } finally {
      setLoading(false);
    }
    return null;
  };

  // Update an existing note
  const editNote = async (id, updatedNote) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateNote(id, updatedNote);
      if (response) {
        setNotes((prevNotes) =>
          prevNotes.map((note) => (note._id === id ? response : note))
        );
        return response;
      }
    } catch (err) {
      setError(err.message || "Failed to update note");
      console.error("Failed to update note:", err);
    } finally {
      setLoading(false);
    }
    return null;
  };

  // Delete a note
  const removeNote = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteNote(id);
      if (response) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        return true;
      }
    } catch (err) {
      setError(err.message || "Failed to delete note");
      console.error("Failed to delete note:", err);
    } finally {
      setLoading(false);
    }
    return false;
  };

  // Get all notes
  const getAllNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getNotes();
      setNotes(response || []);
      return response;
    } catch (err) {
      setError(err.message || "Failed to fetch notes");
      console.error("Failed to fetch notes:", err);
      setNotes([]);
    } finally {
      setLoading(false);
    }
    return [];
  };

  // Filter notes by different criteria
  const filterNotes = useCallback(
    (criteria = {}) => {
      const { color, tags, search } = criteria;

      return notes.filter((note) => {
        // Filter by color
        if (color && note.color !== color) return false;

        // Filter by tags
        if (tags && tags.length > 0) {
          const noteTagIds = note.tags
            ? note.tags.map((tag) => tag._id || tag)
            : [];
          if (!tags.some((tagId) => noteTagIds.includes(tagId))) return false;
        }

        // Filter by search term
        if (search) {
          const searchLower = search.toLowerCase();
          return note.content.toLowerCase().includes(searchLower);
        }

        return true;
      });
    },
    [notes]
  );

  // Get notes by tag ID
  const getNotesByTag = useCallback(
    (tagId) => {
      return notes.filter(
        (note) => note.tags && note.tags.some((tag) => tag._id === tagId)
      );
    },
    [notes]
  );

  // Handle input change for new note form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote((prev) => ({ ...prev, [name]: value }));
  };

  // Add or remove a tag from a note
  const toggleNoteTag = async (noteId, tagId) => {
    const note = notes.find((n) => n._id === noteId);
    if (!note) return null;

    const hasTag = note.tags && note.tags.some((tag) => tag._id === tagId);
    let updatedTags;

    if (hasTag) {
      updatedTags = note.tags.filter((tag) => tag._id !== tagId);
    } else {
      updatedTags = [...(note.tags || []), { _id: tagId }];
    }

    return await editNote(noteId, {
      ...note,
      tags: updatedTags.map((tag) => tag._id),
    });
  };

  // Reset new note form
  const resetNewNoteForm = () => {
    setNewNote({
      content: "",
      color: "",
      tags: [],
      createdAt: new Date(),
    });
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        error,
        newNote,
        createNote,
        editNote,
        removeNote,
        getAllNotes,
        filterNotes,
        getNotesByTag,
        handleInputChange,
        setNewNote,
        toggleNoteTag,
        resetNewNoteForm,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotesContext must be used within a NotesProvider");
  }
  return context;
};

export { NotesProvider, useNotesContext };
