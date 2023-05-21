import axios from "axios";

export const tokenInstance = axios.create({
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
    throw Error("로그인 상태가 아닙니다.");
  }
  return config;
});
