import API from "./api";

const addNote = async (noteData) => {
  try {
    const response = await API.post('/notes', noteData);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

const getNotes = async () => {
  try {
    const response = await API.get('/notes');
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

const updateNote = async (noteId, noteData) => {
  try {
    const response = await API.put(`/notes/${noteId}`, noteData);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

const deleteNote = async (noteId) => {
  try {
    const response = await API.delete(`/notes/${noteId}`);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export { addNote, getNotes, updateNote, deleteNote };