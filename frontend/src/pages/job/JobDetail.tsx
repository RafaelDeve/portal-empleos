import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobDetails } from "../../services/company/companyService";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getJobDetails(id)
        .then(setJob)
        .catch((err) => console.error("Error al cargar detalles:", err));
    }
  }, [id]);

  if (!job) return <p className="p-4">Cargando detalle...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-3">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-sm text-gray-500">
        {job.company_name} — {job.company_location}
      </p>
      <p className="text-sm text-gray-600">{job.schedule}</p>
      <p className="text-sm">Salario: ${job.min_salary} - ${job.max_salary}</p>

      <hr className="my-4" />

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Descripción</h2>
        <p>{job.description || "No disponible."}</p>

        <h2 className="text-lg font-semibold">Requisitos</h2>
        <p>{job.requirements || "No especificados."}</p>

        <h2 className="text-lg font-semibold">Beneficios</h2>
        <p>{job.beneficios || "No indicados."}</p>

        <p className="text-xs text-gray-400 mt-4">
          Publicado el: {job.fecha_publicacion || "N/D"}
        </p>
      </section>
    </div>
  );
}
