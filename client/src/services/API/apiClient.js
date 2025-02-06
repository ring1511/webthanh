import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.HOST || "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
});

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Token hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.");
      // Có thể redirect người dùng tới trang đăng nhập hoặc logout
    }
    return Promise.reject(error);
  }
);
export default apiClient;
