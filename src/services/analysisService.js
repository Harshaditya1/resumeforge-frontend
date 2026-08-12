import apiClient from "./apiClient";

/**
 * Analyze latest Resume against latest Job Description
 */
export const analyzeResume = async () => {
  const response = await apiClient.post(
    "/api/analysis/analyze"
  );

  return response.data;
};

/**
 * Get latest analysis
 */
export const getLatestAnalysis = async () => {
  const response = await apiClient.get(
    "/api/analysis/latest"
  );

  return response.data;
};

/**
 * Get analysis history
 */
export const getAnalysisHistory = async () => {
  const response = await apiClient.get(
    "/api/analysis"
  );

  return response.data;
};