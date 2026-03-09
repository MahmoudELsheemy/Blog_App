import axios from "axios";
import { toast } from "react-toastify";

const request = axios.create({
  baseURL: "https://blog-app-vpcw.onrender.com",
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response?.data?.message || error.message);
    return Promise.reject(error);
  },
);

export default request;
