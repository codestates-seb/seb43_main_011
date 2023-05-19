import axios from "axios";
import TokenStorege from "./tokenStorege";
const tokenStorege = new TokenStorege();

const tokenInstance = axios.create({
  headers: {
    "content-type": "application/json",
    accept: "application/json",
    withCredentianals: true,
  },
});

tokenInstance.interceptors.request.use(function (config) {
  const token = tokenStorege.getToken();
  if (token) {
    config.headers.common["Authorization"] = token;
  } else {
    throw Error("로그인 상태가 아닙니다.");
  }
  return config;
});
