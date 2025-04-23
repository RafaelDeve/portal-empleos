import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import LoginCompany from "../pages/login/LoginCompany";
import Register from "../pages/register/Register";
import RegisterCompany from "../pages/register/RegisterCompany";
import Home from "../pages/home/Home";
import AddJob from "../pages/job/AddJob";
import JobDetail from "../pages/job/JobDetail";
import HomeCompany from "../pages/home/HomeCompany";
import EditJob from "../pages/job/EditJob";
import CVForm from "../pages/cv/CVForm";
import CVDetail from "../pages/cv/CVDetail";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/LoginCompany" element={<LoginCompany />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/RegisterCompany" element={<RegisterCompany />} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/HomeCompany" element={<HomeCompany/>} />
        <Route path="/AddJob" element={<AddJob/>} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/edit-job/:id" element={<EditJob/>} />
        <Route path="/cv" element={<CVForm />} />
        <Route path="/cv/:userId" element={<CVDetail />} />
      </Routes>
    </>
  );
}
