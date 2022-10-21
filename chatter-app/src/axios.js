import axios from 'axios'

const instance = axios.create({
    //baseURL: 'https://chatter-backend.onrender.com'
    baseURL: 'http://localhost:3001'
});

export default instance;