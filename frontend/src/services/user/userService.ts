import axios from "../api"; // Asegúrate de tener `api.ts` con baseURL

export const saveUser = async (userData: {
  user: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post("/user/saveUser.php", userData); // O ajusta la ruta según tu API
  return response.data;
};

export const loginUser = async (credentials: {
  user: string;
  password: string;
}) => {
  const response = await axios.post("/auth/loginUser.php", credentials);
  return response.data;
};

export const applyToJob = async (userId: number, jobId: number) => {
  const response = await axios.post("/user/apply.php", {
    user_id: userId,
    job_id: jobId
  });
  return response.data;
};

export const checkApplication = async (userId: number, jobId: number) => {
  const response = await axios.post("/user/checkApplication.php", {
    user_id: userId,
    job_id: jobId
  });
  return response.data.alreadyApplied;
};