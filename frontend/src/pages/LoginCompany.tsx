import PrimaryButton from "../components/buttons/PrimaryButton";
import OutlineButton from "../components/buttons/OutlineButton";
import TextInput from "../components/inputs/TextInput";
import TextButton from "../components/buttons/TextButton";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function LoginCompany() {
  const location = useLocation();

  return (
    <>
      <div className="flex">
        <div className="w-[50%] h-screen bg-[#003f51]"></div>
        <div className="flex items-center justify-center h-screen w-[50%] ">
          <div className="w-[60%] space-y-6 flex flex-col ">
            <h1 className="self-stretch justify-start text-[#003f51] text-[1rem] font-regular font-montserrat">
              Acceso empresarial
            </h1>
            <div className="space-y-1">
              <TextInput
                title="Nombre de la empresa"
                width="100"
                placeholder="Ej: Grupo Empresarial XYZ"
                type="text"
              />
              <TextInput
                title="Contraseña"
                width="100"
                placeholder="Escribe tu contraseña"
                type="password"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <PrimaryButton text="Acceder" width="100" />
              {location.pathname === "/LoginCompany" && (
                <div className="">
                  <Link to="/Login">
                    <OutlineButton
                      text="Iniciar sesión como usuario"
                      width="100"
                    />
                  </Link>
                </div>
              )}
            </div>
            <TextButton span="¿Cuenta empresarial lista?" CTA="¡Regístrate!" />
          </div>
        </div>
      </div>
    </>
  );
}
