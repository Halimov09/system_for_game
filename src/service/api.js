import axios from "axios";
import { getItem } from "../helpers/persistance-storage";

axios.defaults.baseURL = "https://api.gameroom.uz/api/";

axios.interceptors.request.use(config => {
    const token = getItem("user")

    const authToken = token ? `Bearer ${token}` : "";
    config.headers.Authorization = authToken;
    console.log(config.headers);
    
    return config;
});

export default axios;

