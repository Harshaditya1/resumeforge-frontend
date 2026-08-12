import apiClient from "./apiClient";

/**
 * Save Job Description
 */
export const saveJobDescription = async (content) => {
  const response = await apiClient.post(
    "/api/job-descriptions",
    {
      content,
    }
  );

  return response.data;
};

/**
 * Get all Job Descriptions
 */
export const getJobDescriptions = async () => {
  const response = await apiClient.get(
    "/api/job-descriptions"
  );

  return response.data;
};

/**
 * Get latest Job Description
 */
export const getLatestJobDescription = async () => {
  const response = await apiClient.get(
    "/api/job-descriptions/latest"
  );

  return response.data;
};

/**
 * Get Job Description by ID
 */
export const getJobDescriptionById = async (
  jobDescriptionId
) => {
  const response = await apiClient.get(
    `/api/job-descriptions/${jobDescriptionId}`
  );

  return response.data;
};

/**
 * Delete Job Description
 */
export const deleteJobDescription = async (
  jobDescriptionId
) => {
  const response = await apiClient.delete(
    `/api/job-descriptions/${jobDescriptionId}`
  );

  return response.data;
};