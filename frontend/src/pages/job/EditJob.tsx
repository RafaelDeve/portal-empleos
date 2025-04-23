import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobDetails, updateJob } from "../../services/company/companyService";
import TextInput from "../../components/inputs/TextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

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

  if (loading || !job) return <p className="p-4">Cargando vacante...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#003F51] to-[#00B837] py-12 px-4">
      <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-xl px-8 py-10 space-y-4">
        <h1 className="text-2xl font-bold text-[#003f51] font-montserrat mb-2">Editar Vacante</h1>
        <form onSubmit={handleSubmit} className="space-y-1 font-montserrat text-[13px]">
          <TextInput
            title="Título"
            width="100%"
            placeholder=""
            type="text"
            name="title"
            value={job.title}
            onChange={handleChange}
          />
          <TextInput
            title="Horario"
            width="100%"
            placeholder=""
            type="text"
            name="schedule"
            value={job.schedule}
            onChange={handleChange}
          />
          <TextInput
            title="Salario Mínimo"
            width="100%"
            placeholder=""
            type="text"
            name="min_salary"
            value={job.min_salary}
            onChange={handleChange}
          />
          <TextInput
            title="Salario Máximo"
            width="100%"
            placeholder=""
            type="text"
            name="max_salary"
            value={job.max_salary}
            onChange={handleChange}
          />
          <TextInput
            title="Nombre Empresa"
            width="100%"
            placeholder=""
            type="text"
            name="company_name"
            value={job.company_name}
            onChange={handleChange}
          />
          <TextInput
            title="Ubicación"
            width="100%"
            placeholder=""
            type="text"
            name="company_location"
            value={job.company_location}
            onChange={handleChange}
          />

          <PrimaryButton text="Guardar cambios" width="100%" />
          {success && <p className="text-green-600 text-xs pt-2">{success}</p>}
        </form>
      </div>
    </div>
  );
}
