import apiClient from "./apiClient";

const dashboardService = {
  async getDashboardSummary() {
    const response = await apiClient.get("/api/dashboard/summary");
    return response.data;
  },
};

export default dashboardService;