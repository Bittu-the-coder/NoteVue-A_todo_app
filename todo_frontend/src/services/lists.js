import API from './api';

const addList = async (listData) => {
  try {
    const response = await API.post('/lists', listData);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

const getLists = async () => {
  try {
    const response = await API.get('/lists');
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

const updateList = async (id, listData) => {
  try {
    const response = await API.put(`/lists/${id}`, listData);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

const deleteList = async (id) => {
  try {
    const response = await API.delete(`/lists/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export { addList, getLists, updateList, deleteList };
