import axios from "axios";
const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});
const token = localStorage.getItem("token");
axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = "Bearer " + token;
    return config;
});

export default axiosClient;
