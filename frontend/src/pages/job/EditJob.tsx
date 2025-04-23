import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobDetails, updateJob } from "../../services/company/companyService";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (id) {
      getJobDetails(id)
        .then(setJob)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJob((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateJob({ ...job, id: Number(id) });
      setSuccess(response.message);
      setTimeout(() => navigate(`/job/${id}`), 1000);
    } catch (err) {
      console.error("Error al actualizar:", err);
    }
  };

  if (loading || !job) return <p className="p-4">Cargando...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Editar Vacante</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={job.title} onChange={handleChange} placeholder="Título" className="w-full border px-3 py-2 rounded" />
        <input name="schedule" value={job.schedule} onChange={handleChange} placeholder="Horario" className="w-full border px-3 py-2 rounded" />
        <input name="min_salary" value={job.min_salary} onChange={handleChange} placeholder="Salario mínimo" className="w-full border px-3 py-2 rounded" />
        <input name="max_salary" value={job.max_salary} onChange={handleChange} placeholder="Salario máximo" className="w-full border px-3 py-2 rounded" />
        <input name="company_name" value={job.company_name} onChange={handleChange} placeholder="Nombre empresa" className="w-full border px-3 py-2 rounded" />
        <input name="company_location" value={job.company_location} onChange={handleChange} placeholder="Ubicación" className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar cambios</button>
        {success && <p className="text-green-600 mt-2">{success}</p>}
      </form>
    </div>
  );
}
