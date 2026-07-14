import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
instance.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
instance.interceptors.response.use(
    (response) => response,
    
  async (error) => {
      const originalRequest = error.config;

      // Don't refresh token for login requests
    if (
      originalRequest.url === "/login" ||
      originalRequest.url === "/google-login"
    ) {
      return Promise.reject(error);
    }

    if (
      (error.response?.status === 401 ||
        error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await instance.post("/refresh");
        
        const newAccessToken = response.data.accessToken;
        
        localStorage.setItem("accessToken", newAccessToken);
        
        originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;
        
        return instance(originalRequest);
        
    } catch (refreshError) {
        localStorage.removeItem("accessToken");
        window.location.href = "/";
        return Promise.reject(refreshError);
    }
}

return Promise.reject(error);
}
);
instance.interceptors.request.use((config) => {
  console.log("REQUEST DATA:", config.data);
  return config;
});