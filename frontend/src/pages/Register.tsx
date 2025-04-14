import PrimaryButton from "../components/buttons/PrimaryButton";
import OutlineButton from "../components/buttons/OutlineButton";
import TextInput from "../components/inputs/TextInput";
import TextButton from "../components/buttons/TextButton";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Register() {
  const location = useLocation();

  const [inputs, setInputs] = useState({
    user: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
        const response = await axios.post("http://localhost:8888/api/save", inputs);
        console.log("Respuesta:", response.data);
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
              Crea tu cuenta
            </h1>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <TextInput
                  title="Usuario"
                  width="100"
                  placeholder="Ingresa tu nombre de usuario"
                  type="text"
                  name="user"
                  value={inputs.user}
                  onChange={handleChange}
                />
                <TextInput
                  title="Email"
                  width="100"
                  placeholder="Ej. empresa@correo.com"
                  type="text"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                />
                <TextInput
                  title="Contraseña"
                  width="100"
                  placeholder="Escribe tu contraseña"
                  type="password"
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-3">
                <PrimaryButton text="Registrarse" width="100" />
                {location.pathname === "/Register" && (
                  <div className="">
                    <Link to="/LoginCompany">
                      <OutlineButton
                        text="Registro para empresas"
                        width="100"
                      />
                    </Link>
                  </div>
                )}
              </div>
            </form>
            <TextButton span="¿Ya estás registrado?" CTA="¡Entra aquí!" />
          </div>
        </div>
      </div>
    </>
  );
}
