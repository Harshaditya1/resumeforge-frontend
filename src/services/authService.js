import apiClient from "./apiClient";

const authService = {
  async login(credentials) {
    const response = await apiClient.post("/api/auth/login", credentials);
    return response.data;
  },

  async register(userData) {
    const response = await apiClient.post("/api/auth/register", userData);
    return response.data;
  },
};

export default authService;