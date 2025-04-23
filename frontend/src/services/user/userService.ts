import axios from "../api"; // Usa tu baseURL ya configurada

// 🧑 Registro de usuario
export const saveUser = async (userData: {
  user: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post("/user/saveUser.php", userData);
  return response.data;
};

// 🔐 Login
export const loginUser = async (credentials: {
  user: string;
  password: string;
}) => {
  const response = await axios.post("/auth/loginUser.php", credentials);
  return response.data;
};

// 📩 Aplicar a trabajo
export const applyToJob = async (userId: number, jobId: number) => {
  const response = await axios.post("/user/apply.php", {
    user_id: userId,
    job_id: jobId
  });
  return response.data;
};

// 🔍 Verificar si ya aplicó
export const checkApplication = async (userId: number, jobId: number) => {
  const response = await axios.post("/user/checkApplication.php", {
    user_id: userId,
    job_id: jobId
  });
  return response.data.alreadyApplied;
};

// 📄 Obtener CV
export const getCV = async (userId: number) => {
  const response = await axios.get(`/user/getCV.php?user_id=${userId}`);
  return response.data;
};

// 💾 Guardar datos del CV
export const saveCV = async (cvData: any) => {
  const response = await axios.post("/user/saveCV.php", cvData);
  return response.data;
};

// 📤 Subir PDF del CV
export const uploadCVPDF = async (userId: number, pdfFile: File) => {
  const formData = new FormData();
  formData.append("user_id", String(userId));
  formData.append("cv_pdf", pdfFile);
  const response = await axios.post("/user/updateCVPDF.php", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// ✅ Verificar si tiene CV
export const hasCV = async (userId: number) => {
  const response = await axios.get(`/user/hasCV.php?user_id=${userId}`);
  return response.data.hasCV;
};

// 📥 Obtener URL del PDF para visualización
export const getCVPDF = (userId: number) => {
  return `/user/getCVPDF.php?user_id=${userId}`;
};
