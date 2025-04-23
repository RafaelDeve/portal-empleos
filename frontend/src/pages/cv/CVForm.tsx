import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCV,
  saveCV,
  uploadCVPDF,
} from "../../services/user/userService";
import TextInput from "../../components/inputs/TextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

export default function CVForm() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  const initialForm = {
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    city: "",
    education_institution: "",
    degree_title: "",
    education_start_date: "",
    education_end_date: "",
    work_company: "",
    work_position: "",
    work_start_date: "",
    work_end_date: "",
    skills: "",
    languages: "",
    career_objective: "",
    achievements_projects: "",
    availability: "",
    linkedin_profile: "",
    references: "",
  };

  const [formData, setFormData] = useState<any>(initialForm);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      getCV(userId).then((data) => {
        console.log("CV DATA >>>", data);

        if (data) {
          const updatedData = Object.keys(initialForm).reduce((acc, key) => {
            acc[key] = data[key] ?? "";
            return acc;
          }, {} as any);
          setFormData(updatedData);
          const pdfUrl = `/user/getCVPDF.php?user_id=${userId}`;
fetch(pdfUrl, { method: "HEAD" })
  .then((res) => {
    if (res.ok && res.headers.get("Content-Type") === "application/pdf") {
      setPreviewUrl(pdfUrl);
    }
  });
        }
      });
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveCV({ ...formData, user_id: userId });
      if (pdfFile) await uploadCVPDF(userId, pdfFile);
      alert("CV guardado exitosamente");
      navigate("/Home");
    } catch (err) {
      console.error(err);
      alert("Hubo un error al guardar el CV.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-emerald-900 flex justify-center items-center py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-8 w-full max-w-3xl shadow-xl space-y-4"
      >
        <h1 className="text-2xl font-semibold text-[#003F51] font-montserrat mb-4">
          CV Digital
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput title="Nombre" name="first_name" type="text" value={formData.first_name} onChange={handleChange} placeholder="Juan" width="100%" />
          <TextInput title="Apellido" name="last_name" type="text" value={formData.last_name} onChange={handleChange} placeholder="Martínez" width="100%" />
          <TextInput title="Teléfono" name="phone" type="text" value={formData.phone} onChange={handleChange} placeholder="829-000-0000" width="100%" />
          <TextInput title="Dirección" name="address" type="text" value={formData.address} onChange={handleChange} placeholder="Av. Siempre Viva" width="100%" />
          <TextInput title="Ciudad" name="city" type="text" value={formData.city} onChange={handleChange} placeholder="Santo Domingo" width="100%" />
          <TextInput title="Institución Académica" name="education_institution" type="text" value={formData.education_institution} onChange={handleChange} placeholder="ITLA" width="100%" />
          <TextInput title="Título Obtenido" name="degree_title" type="text" value={formData.degree_title} onChange={handleChange} placeholder="Técnico en Desarrollo" width="100%" />
          <TextInput title="Fecha Inicio Educación" name="education_start_date" type="date" value={formData.education_start_date} onChange={handleChange} width="100%" />
          <TextInput title="Fecha Fin Educación" name="education_end_date" type="date" value={formData.education_end_date} onChange={handleChange} width="100%" />
          <TextInput title="Empresa" name="work_company" type="text" value={formData.work_company} onChange={handleChange} placeholder="DosSE" width="100%" />
          <TextInput title="Puesto" name="work_position" type="text" value={formData.work_position} onChange={handleChange} placeholder="Implementador" width="100%" />
          <TextInput title="Fecha Inicio Trabajo" name="work_start_date" type="date" value={formData.work_start_date} onChange={handleChange} width="100%" />
          <TextInput title="Fecha Fin Trabajo" name="work_end_date" type="date" value={formData.work_end_date} onChange={handleChange} width="100%" />
          <TextInput title="Habilidades" name="skills" type="text" value={formData.skills} onChange={handleChange} placeholder="React, PHP" width="100%" />
          <TextInput title="Idiomas" name="languages" type="text" value={formData.languages} onChange={handleChange} placeholder="Español, Inglés" width="100%" />
          <TextInput title="Disponibilidad" name="availability" type="text" value={formData.availability} onChange={handleChange} placeholder="Inmediata" width="100%" />
          <TextInput title="LinkedIn" name="linkedin_profile" type="text" value={formData.linkedin_profile} onChange={handleChange} placeholder="https://linkedin.com/in/..." width="100%" />
        </div>

        <textarea
          name="career_objective"
          onChange={handleChange}
          value={formData.career_objective}
          placeholder="Objetivo profesional..."
          className="w-full border rounded-lg p-2 text-sm font-light font-montserrat focus:ring-1 focus:ring-[#00B837]"
        />
        <textarea
          name="achievements_projects"
          onChange={handleChange}
          value={formData.achievements_projects}
          placeholder="Logros y proyectos..."
          className="w-full border rounded-lg p-2 text-sm font-light font-montserrat focus:ring-1 focus:ring-[#00B837]"
        />
        <textarea
          name="references"
          onChange={handleChange}
          value={formData.references}
          placeholder="Referencias profesionales..."
          className="w-full border rounded-lg p-2 text-sm font-light font-montserrat focus:ring-1 focus:ring-[#00B837]"
        />

        <div className="space-y-2">
          <label className="text-sm font-montserrat text-[#003F51]">Sube tu CV en PDF</label>

          <div
            onClick={() => document.getElementById("cvUploader")?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (file && file.type === "application/pdf") {
                setPdfFile(file);
                setPreviewUrl(URL.createObjectURL(file));
              } else {
                alert("Solo se permiten archivos PDF.");
              }
            }}
            className="w-full h-32 border-2 border-dashed border-[#00B837] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#003F51] transition-colors duration-300"
          >
            <p className="text-sm text-[#003F51] font-montserrat">Haz clic o arrastra tu CV en PDF aquí</p>
            {pdfFile && <p className="text-xs text-green-600 mt-1">{pdfFile.name}</p>}
          </div>

          <input
            id="cvUploader"
            type="file"
            accept=".pdf"
            onChange={handlePdfChange}
            className="hidden"
          />

          {previewUrl && (
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center">
                <p className="text-sm font-montserrat text-[#003F51]">Vista previa del CV</p>
                <a
                  href={previewUrl}
                  download="CV.pdf"
                  className="text-[#00B837] font-montserrat text-xs hover:underline"
                >
                  Descargar PDF
                </a>
              </div>
              <iframe src={previewUrl} className="w-full h-[900px] border rounded-md" />
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <PrimaryButton text="Guardar CV" width="200px" />
        </div>
      </form>
    </div>
  );
}
