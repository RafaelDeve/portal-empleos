import { useEffect, useState } from "react";
import SearchAndLogout from "../header/SearchAndLogout";
import JobCard from "./JobCard";
import { getCompanyJobs } from "../../services/company/companyService"; 
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
    const company = JSON.parse(localStorage.getItem("user") || "{}");

    if (company.id) {
      getCompanyJobs(company.id)
        .then(setJobs)
        .catch((err) => {
          console.error("Error al obtener vacantes de la empresa:", err);
        });
    }
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
      {/* Input de búsqueda y botón de logout */}
      <SearchAndLogout
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCurrentPage={setCurrentPage}
      />
  
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
          <p className="col-span-3 text-gray-500 font-montserrat text-[11px]">
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
