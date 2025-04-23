import { FiLogOut, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import svg from "../../assets/fi_search.svg";

const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
const isCompany = storedUser && "address" in storedUser;

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setCurrentPage: (value: number) => void;
}

export default function SearchAndLogout({ searchTerm, setSearchTerm, setCurrentPage }: Props) {
    const navigate = useNavigate();

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const isCompany = storedUser && "address" in storedUser;
  
    const handleLogout = () => {
      localStorage.removeItem("user");
      if (isCompany) {
        window.location.href = "/LoginCompany";
      } else {
        window.location.href = "/Login";
      }
    };
  
    return (
      <div className="w-[85%] flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-2 py-2 bg-white rounded-md shadow-sm">
        {/* Search input */}
        <div className="relative w-full md:flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
            <img src={svg} className="w-auto h-4" alt="search icon" />
          </span>
          <input
            type="text"
            placeholder="Buscar por título, empresa o ubicación..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="font-montserrat text-[11px] w-full h-10 pl-10 pr-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#00B837] transition-all duration-300"
          />
        </div>
  
        {/* Botones agrupados */}
        <div className="flex gap-2 self-end md:self-auto">
        {isCompany && (
          <button
            onClick={() => navigate("/AddJob")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#00B837] text-white rounded-md hover:bg-[#01982c] transition-all"
          >
            <FiPlus className="text-lg" />
            Agregar Vacante
          </button>
        )}

        {!isCompany && (
          <button
            onClick={() => navigate("/cv")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#003F51] border border-[#003F51] rounded-md hover:bg-[#003F51] hover:text-white transition-all"
          >
            CV Digital
          </button>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all"
        >
          <FiLogOut className="text-lg" />
          Cerrar sesión
        </button>
      </div>

      </div>
    );
  }
  