import axios from 'axios'

const instance = axios.create({
    baseURL:"https://shopping-authentication.onrender.com",
})

export default instance;
