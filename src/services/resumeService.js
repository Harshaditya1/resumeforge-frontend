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
 * Get all resumes of current user
 */
export const getResumes = async () => {
  const response = await apiClient.get("/api/resumes");
  return response.data;
};