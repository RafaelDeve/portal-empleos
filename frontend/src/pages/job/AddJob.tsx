import PrimaryButton from "../../components/buttons/PrimaryButton";
import TextInput from "../../components/inputs/TextInput";
import { useState } from "react";
import { saveJob, saveJobDetails } from "../../services/company/companyService";
const storedCompany = JSON.parse(localStorage.getItem("user") || "{}");

export default function AddJob() {
  const [inputs, setInputs] = useState({
    title: "",
    schedule: "",
    min_salary: "",
    max_salary: "",
    company_name: storedCompany.user || "",
    company_location: storedCompany.address || "",
    description: "",
    requirements: "",
    benefits: "",
    publication_date: ""
  });
   

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const response = await saveJob(inputs);
      const jobId = response.job_id;
  
      await saveJobDetails({
        job_id: jobId,
        description: inputs.description,
        requirements: inputs.requirements,
        benefits: inputs.benefits,
        publication_date: inputs.publication_date,
      });
  
      console.log("Vacante y detalles guardados correctamente");
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="w-[50%] h-screen bg-[#003f51]"></div>
        <div className="flex items-center justify-center h-screen w-[50%] ">
          <div className="w-[60%] space-y-6 flex flex-col ">
            <h1 className="self-stretch justify-start text-[#003f51] text-[1rem] font-regular font-montserrat">
              Agregar vacante
            </h1>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <TextInput
                  title="Titulo"
                  width="100"
                  placeholder=""
                  type="text"
                  name="title"
                  value={inputs.title}
                  onChange={handleChange}
                />
                <TextInput
                  title="Horario"
                  width="100"
                  placeholder=""
                  type="text"
                  name="schedule"
                  value={inputs.schedule}
                  onChange={handleChange}
                />
                <TextInput
                  title="Salario Minimo"
                  width="100"
                  placeholder=""
                  type="text"
                  name="min_salary"
                  value={inputs.min_salary}
                  onChange={handleChange}
                />
                <TextInput
                  title="Salario Maximo"
                  width="100"
                  placeholder=""
                  type="text"
                  name="max_salary"
                  value={inputs.max_salary}
                  onChange={handleChange}
                />
                <TextInput
                  title="Nombre de la empresa"
                  width="100"
                  placeholder=""
                  type="text"
                  name="company_name"
                  value={inputs.company_name}
                  onChange={handleChange}
                  disabled={true}
                />

                <TextInput
                  title="Ubicacion"
                  width="100"
                  placeholder=""
                  type="text"
                  name="company_location"
                  value={inputs.company_location}
                  onChange={handleChange}
                  disabled={true}
                />

                <TextInput
                  title="Descripcion"
                  width="100"
                  placeholder=""
                  type="text"
                  name="description"
                  value={inputs.description}
                  onChange={handleChange}
                  />
                <TextInput
                  title="Requisitos"
                  width="100"
                  placeholder=""
                  type="text"
                  name="requirements"
                  value={inputs.requirements}
                  onChange={handleChange}
                />
                <TextInput
                  title="Beneficios"
                  width="100"
                  placeholder=""
                  type="text"
                  name="benefits"
                  value={inputs.benefits}
                  onChange={handleChange}
                />
                <TextInput
                  title="Fecha de publicación"
                  width="100"
                  placeholder=""
                  type="date"
                  name="publication_date"
                  value={inputs.publication_date}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-3">
                <PrimaryButton text="Agregar vacante" width="100%" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
