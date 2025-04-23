import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobCardList from "../../components/card/JobCardList";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    // Si el usuario es una empresa, redirigir
    if (user && "address" in user) {
      navigate("/HomeCompany");
    }
  }, []);

  return <JobCardList />;
}
