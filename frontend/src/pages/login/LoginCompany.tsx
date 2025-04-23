import PrimaryButton from "../../components/buttons/PrimaryButton";
import OutlineButton from "../../components/buttons/OutlineButton";
import TextInput from "../../components/inputs/TextInput";
import TextButton from "../../components/buttons/TextButton";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { loginCompany } from "../../services/company/companyService";

export default function LoginCompany() {
  const location = useLocation();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    user: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await loginCompany(inputs);
      console.log("Login correcto:", response);

      // Puedes guardar token si lo devuelves
      // localStorage.setItem("token", response.token);

      // Redirige a home o dashboard
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/HomeCompany");
    } catch (error) {
      console.error("Error en login:", error);
      alert("Credenciales incorrectas");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="flex">
        <div className="w-[50%] h-screen bg-[#003f51]"></div>
        <div className="flex items-center justify-center h-screen w-[50%] ">
          <div className="w-[60%] space-y-6 flex flex-col ">
            <h1 className="self-stretch justify-start text-[#003f51] text-[1rem] font-regular font-montserrat">
              Acceso empresarial
            </h1>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <TextInput
                  title="Nombre de la empresa"
                  width="100%"
                  placeholder="Ej: Grupo Empresarial XYZ"
                  type="text"
                  name="user"
                  value={inputs.user}
                  onChange={handleChange}
                />
                <TextInput
                  title="Contraseña"
                  width="100%"
                  placeholder="Escribe tu contraseña"
                  type="password"
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-3">
                <PrimaryButton text="Acceder" width="100" />
                {location.pathname === "/LoginCompany" && (
                  <div className="">
                    <Link to="/Login">
                      <OutlineButton
                        text="Iniciar sesión como usuario"
                        width="100%"
                      />
                    </Link>
                  </div>
                )}
              </div>
            </form>
            {location.pathname === "/LoginCompany" && (
              <div className="flex items-center justify-center">
                <Link to="/RegisterCompany">
                  <TextButton
                    span="¿Cuenta empresarial lista?"
                    CTA="¡Regístrate!"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
