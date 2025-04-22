import axios from "../api"; // Asegúrate de tener `api.ts` con baseURL

export const loginCompany = async (credentials: {
  user: string;
  password: string;
}) => {
  const response = await axios.post("/auth/loginCompany.php", credentials);
  return response.data;
};

export const saveCompany = async (companyData: {
  user: string;
  email: string;
  address: string;
  password: string;
}) => {
  const response = await axios.post("/company/saveCompany.php", companyData); // O ajusta la ruta según tu API
  return response.data;
};

export const saveJob = async (jobData: {
  title: string,
  schedule: string,
  min_salary: string,
  max_salary: string,
  company_name: string,
  company_location: string
}) => {
  const response = await axios.post("/company/saveJob.php", jobData); // O ajusta la ruta según tu API
  return response.data;
};

export const getAllJobs = async () => {
  const response = await axios.get("/company/getAllJobs.php");
  return response.data;
};

export const getJobById = async (id: string) => {
  const response = await axios.get(`/company/get_job.php?id=${id}`);
  return response.data;
};

export const getJobDetails = async (id: string) => {
  const response = await axios.get(`/company/getJobDetails.php?id=${id}`);
  return response.data;
};

