import API from './api';

const addTag = async (tagData) => {
  try {
    const response = await API.post('/tags', tagData);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

const getTags = async () => {
  try {
    const response = await API.get('/tags');
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

const deleteTag = async (tagId) => {
  try {
    await API.delete(`/tags/${tagId}`);
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export { addTag, getTags, deleteTag };