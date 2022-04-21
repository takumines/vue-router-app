import axios from "axios";

const axiosAuth = axios.create({
    baseURL: process.env.VUE_APP_FIREBASE_AUTH_URL,
});

export default axiosAuth;