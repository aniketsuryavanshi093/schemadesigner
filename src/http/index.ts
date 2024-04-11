import axios from "axios";

const axiosInterceptorInstance = axios.create({
  baseURL: process.env.NEXT_SERVERURL, // Replace with your API base URL
});

export default axiosInterceptorInstance;
