import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobDetails, getCVsByJobId } from "../../services/company/companyService";
import { applyToJob, checkApplication } from "../../services/user/userService";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [cvs, setCvs] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isCompany = user && "address" in user;

  useEffect(() => {
    if (id) {
      getJobDetails(id)
        .then(setJob)
        .catch((err) => console.error("Error al cargar detalles:", err));
    }

    if (user && id && !isCompany) {
      checkApplication(user.id, parseInt(id))
        .then(setAlreadyApplied)
        .catch((err) => console.error("Error verificando postulación:", err));
    }

    if (isCompany && id) {
      getCVsByJobId(parseInt(id))
        .then(setCvs)
        .catch((err) => console.error("Error al obtener CVs:", err));
    }
  }, [id]);

  const handleApply = async () => {
    if (!user || !id || alreadyApplied) return;

    try {
      const response = await applyToJob(user.id, parseInt(id));
      setSuccessMessage(response.message);
      setAlreadyApplied(true);
      setJob((prev: any) => ({
        ...prev,
        postulaciones: (Number(prev.postulaciones) || 0) + 1,
      }));
    } catch (error) {
      console.error("Error al postularse:", error);
    }
  };

  const handleDelete = async () => {
    if (confirm("¿Seguro que deseas eliminar esta vacante?")) {
      try {
        await fetch(`http://localhost:8888/api/company/deleteJob.php`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        alert("Vacante eliminada correctamente");
        navigate("/HomeCompany");
      } catch (err) {
        console.error("Error al eliminar:", err);
        alert("Error al eliminar la vacante");
      }
    }
  };

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
        <p>{job.benefits || "No indicados."}</p>

        {!isCompany && (
          <p className="text-sm mt-4 text-gray-800">
            Postulaciones: {Number(job.postulaciones) || 0}
          </p>
        )}

        {user && !isCompany && (
          <>
            <button
              onClick={handleApply}
              className={`mt-4 px-5 py-2 rounded transition text-white ${
                alreadyApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#00B837] hover:bg-[#01982c]"
              }`}
              disabled={alreadyApplied}
            >
              {alreadyApplied ? "Ya estás postulado" : "Postularme"}
            </button>
            {successMessage && (
              <p className="text-green-600 text-sm mt-2">{successMessage}</p>
            )}
          </>
        )}

        {!user && !isCompany && (
          <p className="text-sm text-gray-500 mt-4">
            Inicia sesión para postularte.
          </p>
        )}

        {isCompany && (
          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => navigate(`/edit-job/${job.id}`)}
              className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="text-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        )}

        {isCompany && cvs.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-lg font-semibold">Postulaciones: {cvs.length}</h2>
            {cvs.map((cv, i) => (
              <div key={i} className="p-4 border rounded space-y-1">
                <p><strong>Nombre:</strong> {cv.nombres} {cv.apellidos}</p>
                <p><strong>Teléfono:</strong> {cv.telefono}</p>
                <p><strong>Ciudad:</strong> {cv.ciudad}</p>
                <p><strong>Dirección:</strong> {cv.direccion}</p>
                <p><strong>Educación:</strong> {cv.titulo_obtenido} - {cv.institucion}</p>
                <p><strong>Experiencia:</strong> {cv.puesto} en {cv.empresa}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
