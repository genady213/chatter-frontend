import axios from 'axios'

const apiClient = () => {
    const defaultOptions = {
    baseURL: 'https://chatter-backend.onrender.com',
    headers: {
      "Content-Type": "application/json",
    },
    //withCredentials: true,
  };

  return axios.create(defaultOptions);
};

export default apiClient();