import api from "../api/axios";

export const getJobs = async () => {
  const { data } = await api.get("/jobs/");
  return data;
};

export const getResumes = async () => {
  const { data } = await api.get("/resumes/");
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/me/");
  return data;
};