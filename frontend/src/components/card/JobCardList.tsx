import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { getJobs } from "../../services/company/companyService";
import svg from "../../assets/fi_search.svg";
import Pagination from "../pagination/Pagination";

interface Job {
  id: number;
  title: string;
  schedule: string;
  min_salary: string;
  max_salary: string;
  company_name: string;
  company_location: string;
}

export default function JobCardList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch((err) => {
        console.error("Error al obtener vacantes:", err);
      });
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      job.title.toLowerCase().includes(lowerSearch) ||
      job.company_name.toLowerCase().includes(lowerSearch) ||
      job.company_location.toLowerCase().includes(lowerSearch)
    );
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Input de búsqueda */}
      <div className="relative w-[85%]">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
          <img src={svg} className="w-auto h-4" alt="search icon" />
        </span>
        <input
          type="text"
          placeholder="Buscar por título, empresa o ubicación..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reinicia a la página 1 cuando se busca
          }}
          className="font-montserrat text-[11px] w-full h-10 pl-10 pr-3 bg-white rounded-lg outline outline-[#767f8c]/20 focus:ring-1 focus:ring-[#00B837] transition-all duration-400 ease-in-out"
        />
      </div>

      {/* Lista de vacantes filtradas */}
      <div className="grid grid-cols-3 gap-4 w-[85%]">
        {paginatedJobs.length > 0 ? (
          paginatedJobs.map((job) => (
            <JobCard
              id={job.id}
              key={job.id}
              title={job.title}
              schedule={job.schedule}
              minSalary={job.min_salary}
              maxSalary={job.max_salary}
              companyName={job.company_name}
              companyLocation={job.company_location}
            />
          ))
        ) : (
          <p className="col-span-3 text-gray-500 font-montserrat text-[11px] ">
            No se encontraron vacantes.
          </p>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
