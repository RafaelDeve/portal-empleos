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
  const response = await axios.post("/auth/login.php", credentials);
  return response.data;
};