import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobCardListCompany from "../../components/card/JobCardListCompany";

export default function HomeCompany() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    // Si el usuario no es una empresa, redirigir a /Home
    if (!user || !("address" in user)) {
      navigate("/Home");
    }
  }, []);

  return <JobCardListCompany />;
}
