import Svg from "../../assets/react.svg";
import { useNavigate } from "react-router-dom";

type JobCardProps = {
    id: number;
    title: string;
    schedule: string;
    minSalary: string;
    maxSalary: string;
    companyName: string;
    companyLocation: string;
}


export default function JobCard({id, title, schedule, minSalary, maxSalary, companyName, companyLocation }:JobCardProps) {
const navigate = useNavigate();
  return (
    <> 
      <div onClick={() => navigate(`/job/${id}`)} className="font-montserrat space-y-3 outline-1 outline-[#767F8C]/20 px-5 py-5 w-[40] rounded-lg hover:bg-[#F7F7F7] hover:outline-[#0BA02C]/30  cursor-pointer transition-all duration-400 ease-in-out">
        <div className="space-y-2">
          <h1 className="text-[11px] text-[#003f51] font-medium ">{title}</h1>
          <div className="flex items-center space-x-2">
            <h3 className="flex justify-center px-2 py-0.5 w-17 rounded-sm text-[9px] text-[#0BA02C] uppercase font-semibold bg-[#0BA02C]/30 ">{schedule}</h3>
            <h4 className="text-[10px] text-[#767f8c]">Salary: ${minSalary} - ${maxSalary}</h4>
          </div>
        </div>
        <div className="flex space-x-3 items-center">
          <img className="h-auto w-8.5 bg-[#EDEFF5] px-2 py-2 rounded-sm" src={Svg} alt="" />
          <div className="space-y-0.5">
        <h3 className="text-[10px]">{companyName}</h3>
            <div className="flex space-x-1">
              <img className="h-auto w-3" src={Svg} alt="" />
              <h3 className="text-[9px] text-[#767F8C]">{companyLocation}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
