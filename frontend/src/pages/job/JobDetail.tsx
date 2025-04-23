import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getJobDetails,
  getCVsByJobId,
} from "../../services/company/companyService";
import {
  applyToJob,
  checkApplication,
  hasCV,
} from "../../services/user/userService";

// Componentes reutilizables
import JobHeader from "../../components/job/JobHeader";
import JobDescription from "../../components/job/JobDescription";
import ApplicationButtons from "../../components/buttons/ApplicationButtons";
import CVList from "../../components/card/CVList";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState<any>(null);
  const [cvs, setCvs] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [hasCVState, setHasCVState] = useState(true); // Nuevo estado para saber si el usuario tiene CV

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

      hasCV(user.id)
        .then(setHasCVState)
        .catch((err) => {
          console.error("Error verificando CV:", err);
          setHasCVState(false);
        });
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
      const tieneCV = await hasCV(user.id);
      if (!tieneCV) {
        alert("Debes completar tu CV Digital antes de postularte.");
        return;
      }

      const response = await applyToJob(user.id, parseInt(id));
      setSuccessMessage(response.message);
      setAlreadyApplied(true);

      setJob((prev: any) => ({
        ...prev,
        postulaciones: (Number(prev.postulaciones) || 0) + 1,
      }));
    } catch (error) {
      console.error("Error al postularse:", error);
      alert("Hubo un error al enviar tu postulación.");
    }
  };

  const handleDelete = async () => {
    if (confirm("¿Seguro que deseas eliminar esta vacante?")) {
      try {
        await fetch(`http://localhost:8888/api/company/deleteJob.php`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
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
    <div className="min-h-screen w-full bg-gradient-to-tr from-[#003F51] to-[#00B837] py-12 px-4">
      <div className="w-full max-w-[1300px] mx-auto bg-white rounded-2xl shadow-2xl px-10 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* ======================== */}
        {/* COLUMNA IZQUIERDA */}
        {/* ======================== */}
        <div className="space-y-5">
          <JobHeader
            title={job.title}
            company_name={job.company_name}
            company_location={job.company_location}
            schedule={job.schedule}
            min_salary={job.min_salary}
            max_salary={job.max_salary}
          />

          <hr className="my-4 border-gray-200" />

          <JobDescription
            description={job.description}
            requirements={job.requirements}
            benefits={job.benefits}
          />

          <ApplicationButtons
            alreadyApplied={alreadyApplied}
            isLoggedIn={!!user}
            isCompany={isCompany}
            hasCV={hasCVState}
            onApply={handleApply}
          />

          {isCompany && (
            <div className="flex flex-wrap gap-3 mt-6">
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
        </div>

        {/* ======================== */}
        {/* COLUMNA DERECHA */}
        {/* ======================== */}
        {isCompany && cvs.length > 0 && <CVList cvs={cvs} />}
      </div>
    </div>
  );
}
