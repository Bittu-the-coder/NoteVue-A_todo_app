import API from "./api";

const addTask = async (taskData) => {
  try {
    const response = await API.post('/tasks', taskData);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

const getTasks = async () => {
  try {
    const response = await API.get('/tasks');
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

const updateTask = async (id, taskData) => {
  try {
    const response = await API.put(`/tasks/${id}`, taskData);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

const deleteTask = async (id) => {
  try {
    const response = await API.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export { addTask, getTasks, updateTask, deleteTask };