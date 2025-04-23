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
  const company = JSON.parse(localStorage.getItem("user") || "{}");

  const response = await axios.post("/company/saveJob.php", {
    ...jobData,
    company_id: company.id // ← Aquí agregas el ID del login
  });

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

export const getCompanyJobs = async (company_id: number) => {
  const response = await axios.post("/company/getCompanyJobs.php", { company_id });
  return response.data;
};

export const updateJob = async (jobData: any) => {
  const response = await fetch("http://localhost:8888/api/company/updateJob.php", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("Error del servidor: " + errorText);
  }

  return await response.json();
};

export const getCVsByJobId = async (jobId: number) => {
  const response = await fetch("http://localhost:8888/api/company/getApplicationsWithCV.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ job_id: jobId }),
  });

  return await response.json();
};
