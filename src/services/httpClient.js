import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  withCredentials: true,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (!error.config.url.includes("/api/auth/me") && !error.config.url.includes("/api/auth/logout")) {
        window.dispatchEvent(new Event("auth:unauthorized"));
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;

