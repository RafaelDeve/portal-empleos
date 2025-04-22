import axios from "../api"; // Asegúrate de tener `api.ts` con baseURL

export const saveCompany = async (companyData: {
  company: string;
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

export const getJobs = async () => {
  const response = await axios.get("/company/getJobs.php");
  return response.data;
};

export const getJobById = async (id: string) => {
  const response = await axios.get(`/company/get_job.php?id=${id}`);
  return response.data;
};

export const getVacanteDetalle = async (id: string) => {
  const response = await axios.get(`/company/get_vacante_detalle.php?id=${id}`);
  return response.data;
};

