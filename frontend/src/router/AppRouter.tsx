import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import LoginCompany from "../pages/login/LoginCompany";
import Register from "../pages/register/Register";
import RegisterCompany from "../pages/register/RegisterCompany";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/LoginCompany" element={<LoginCompany />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/RegisterCompany" element={<RegisterCompany />} />


      </Routes>
    </>
  );
}
