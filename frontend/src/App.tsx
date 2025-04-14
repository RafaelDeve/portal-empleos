import { Link } from "react-router-dom";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import LoginCompany from "./pages/LoginCompany";
import Register from "./pages/Register";


export default function App() {

const location = useLocation();

  return (
    <>
      <div className="relative">
      {/* Botón que solo aparece en "/" */}
      {location.pathname === "/" && (
        <div className="absolute top-4 right-4">
          <Link to="/Login">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Ir al Login
            </button>
          </Link>
        </div>
      )}

      {/* Tus rutas */}
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/LoginCompany" element={<LoginCompany />} />
        <Route path="/Register" element={<Register />} />


      </Routes>
      
    </div>

    </>
  );
}

