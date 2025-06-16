import API from "./api";

export const login = async (email, password) => {
  try {
    const response = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await API.post('/auth/register', { username, email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const logout = () => {
  localStorage.removeItem('token');
};

// get me, 
export const getMe = async () => {
  try {
    const response = await API.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.log("Error fetching user data:", error);
  }
}

export const updateProfile = async (data) => {
  try {
    const response = await API.put('/auth/edit-profile', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const deleteAccount = async () => {
  try {
    const response = await API.delete('/auth/delete-account', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}