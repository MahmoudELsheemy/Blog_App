// في ملف request.js
import axios from "axios";
import { toast } from "react-toastify";

const request = axios.create({
  baseURL: "https://blog-app-vpcw.onrender.com", // بدون /api في النهاية
  withCredentials: true,
});

// للتحقق من إضافة token إذا كان موجوداً
request.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response?.data?.message || error.message);
    return Promise.reject(error);
  },
);

export default request;
