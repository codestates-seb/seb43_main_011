import axios from "axios";

export const tokenInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "content-type": "application/json",
    accept: "application/json",
    withCredentianals: true,
  },
});

tokenInstance.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("UTK");
  if (token) {
    config.headers.Authorization = token;
  } else {
    config.headers.Authorization = "";
  }
  return config;
});
