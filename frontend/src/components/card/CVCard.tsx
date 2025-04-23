import { useNavigate } from "react-router-dom";

type CV = {
  user_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
  address: string;
  degree_title: string;
  education_institution: string;
  work_position: string;
  work_company: string;
};

export default function CVCard(cv: CV) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/cv/${cv.user_id}`)}
      className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-[13px] leading-relaxed shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <p><strong>Nombre:</strong> {cv.first_name} {cv.last_name}</p>
      <p><strong>Teléfono:</strong> {cv.phone}</p>
      <p><strong>Ciudad:</strong> {cv.city}</p>
      <p><strong>Dirección:</strong> {cv.address}</p>
      <p><strong>Educación:</strong> {cv.degree_title} - {cv.education_institution}</p>
      <p><strong>Experiencia:</strong> {cv.work_position} en {cv.work_company}</p>
    </div>
  );
}
