import axios from 'axios'

const instance = axios.create({
    baseURL:"https://shopping-authentication.onrender.com",
    withCredentials: true 
})

export default instance;
