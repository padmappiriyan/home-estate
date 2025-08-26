import axios from 'axios'

export const axiosInstance=axios.create(
    {withCredentials:true,baseURL:import.meta.env.VITE_REACT_APP_BASE_URL}
)