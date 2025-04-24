import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCV } from "../../services/user/userService";

export default function CVDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [cvData, setCvData] = useState<any>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      getCV(Number(userId))
        .then((data) => {
          setCvData(data);
  
          const url = `http://localhost:8888/api/user/getCVPDF.php?user_id=${userId}`;
          
          fetch(url, { method: "HEAD" })
            .then((res) => {
              if (res.ok && res.headers.get("Content-Type") === "application/pdf") {
                setPdfUrl(url);
              }
            })
            .catch(() => {
              console.warn("No se pudo verificar el PDF.");
            });
        })
        .catch((err) => {
          console.error("Error cargando CV:", err);
          alert("No se pudo cargar el CV del postulante.");
          navigate("/HomeCompany");
        });
    }
  }, [userId]);  

  if (!cvData) return <p className="p-6">Cargando CV del postulante...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#003F51] to-[#00B837] py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 grid md:grid-cols-2 gap-10">
        {/* DATOS DEL POSTULANTE */}
        <div className="space-y-2 font-montserrat text-[14px]">
          <h2 className="text-xl font-semibold text-[#003F51] mb-2">Información del Postulante</h2>
          <p><strong>Nombre:</strong> {cvData.first_name} {cvData.last_name}</p>
          <p><strong>Teléfono:</strong> {cvData.phone}</p>
          <p><strong>Dirección:</strong> {cvData.address}, {cvData.city}</p>
          <p><strong>Institución Académica:</strong> {cvData.education_institution}</p>
          <p><strong>Título:</strong> {cvData.degree_title}</p>
          <p><strong>Educación:</strong> {cvData.education_start_date} a {cvData.education_end_date}</p>
          <p><strong>Empresa:</strong> {cvData.work_company}</p>
          <p><strong>Puesto:</strong> {cvData.work_position}</p>
          <p><strong>Experiencia:</strong> {cvData.work_start_date} a {cvData.work_end_date}</p>
          <p><strong>Habilidades:</strong> {cvData.skills}</p>
          <p><strong>Idiomas:</strong> {cvData.languages}</p>
          <p><strong>Disponibilidad:</strong> {cvData.availability}</p>
          <p><strong>LinkedIn:</strong> <a href={cvData.linkedin_profile} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{cvData.linkedin_profile}</a></p>
          <p><strong>Objetivo Profesional:</strong> {cvData.career_objective}</p>
          <p><strong>Logros y Proyectos:</strong> {cvData.achievements_projects}</p>
          <p><strong>Referencias:</strong> {cvData.references}</p>
        </div>

        {/* PDF EMBEBIDO */}
        <div>
          <h2 className="text-xl font-semibold text-[#003F51] mb-4 font-montserrat">CV en PDF</h2>
          {pdfUrl ? (
            <div className="space-y-2">
              <a
                href={pdfUrl}
                download="CV.pdf"
                className="text-[#00B837] text-sm font-montserrat underline"
              >
                Descargar PDF
              </a>
              <iframe
                src={pdfUrl}
                className="w-full h-[650px] border rounded-md"
              />
            </div>
          ) : (
            <div className="p-4 border border-gray-200 rounded text-sm text-gray-500 bg-gray-50">
            Este postulante no ha subido un archivo PDF.
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
