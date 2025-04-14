import axios from "../api"; // Asegúrate de tener `api.ts` con baseURL

export const registerUser = async (userData: {
  user: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post("/save.php", userData); // O ajusta la ruta según tu API
  return response.data;
};

