import axios from 'axios'

axios.interceptors.request.use(
  (config) => {
    config.baseURL = 'http://localhost:8000/api'
    config.headers.Accept = 'application/json'
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    const newToken = response.data.access_token
    if (newToken) {
      localStorage.setItem('token', newToken)
    }
    
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axios
