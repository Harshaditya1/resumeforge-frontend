import apiClient from "./apiClient";

/**
 * Upload Resume
 */
export const uploadResume = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post(
    "/api/resumes/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (event) => {
        if (!event.total) return;

        const progress = Math.round(
          (event.loaded * 100) / event.total
        );

        if (onUploadProgress) {
          onUploadProgress(progress);
        }
      },
    }
  );

  return response.data;
};

/**
 * Get all resumes
 */
export const getResumes = async () => {
  const response = await apiClient.get("/api/resumes");
  return response.data;
};

/**
 * Get latest resume
 */
export const getLatestResume = async () => {
  const response = await apiClient.get("/api/resumes/latest");
  return response.data;
};

/**
 * Get resume by id
 */
export const getResumeById = async (resumeId) => {
  const response = await apiClient.get(`/api/resumes/${resumeId}`);
  return response.data;
};

/**
 * Delete resume
 */
export const deleteResume = async (resumeId) => {
  const response = await apiClient.delete(
    `/api/resumes/${resumeId}`
  );

  return response.data;
};

/**
 * Download resume
 */
export const downloadResume = async (resumeId) => {
  const response = await apiClient.get(
    `/api/resumes/${resumeId}/download`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};