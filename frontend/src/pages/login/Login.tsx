import PrimaryButton from "../../components/buttons/PrimaryButton";
import OutlineButton from "../../components/buttons/OutlineButton";
import TextInput from "../../components/inputs/TextInput";
import TextButton from "../../components/buttons/TextButton";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../services/user/userService";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    user: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await loginUser(inputs);
      console.log("Login correcto:", response);

      // Puedes guardar token si lo devuelves
      // localStorage.setItem("token", response.token);

      // Redirige a home o dashboard
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/Home");
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
              Iniciar Sesión
            </h1>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <TextInput
                  title="Usuario"
                  width="100%"
                  placeholder="Ingresa tu nombre de usuario"
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
                {location.pathname === "/Login" && (
                  <div className="">
                    <Link to="/LoginCompany">
                      <OutlineButton text="Acceso para empresas" width="100%" />
                    </Link>
                  </div>
                )}
              </div>
            </form>
            {location.pathname === "/Login" && (
              <div className="flex items-center justify-center">
                <Link to="/Register">
                  <TextButton span="¿Nuevo por aquí?" CTA="¡Regístrate!" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
