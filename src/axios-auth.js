import axios from "axios";

export const axiosAuth = axios.create({
    baseURL: process.env.VUE_APP_FIREBASE_AUTH_URL,
});

export const axiosRefreshToken = axios.create({
    baseURL: process.env.VUE_APP_REFRESH_TOKEN_URL,
});