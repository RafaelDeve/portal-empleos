type JobHeaderProps = {
    title: string;
    company_name: string;
    company_location: string;
    schedule: string;
    min_salary: string;
    max_salary: string;
  };
  
  export default function JobHeader({
    title,
    company_name,
    company_location,
    schedule,
    min_salary,
    max_salary,
  }: JobHeaderProps) {
    return (
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-[#003f51] leading-tight">{title}</h1>
        <p className="text-[13px] text-gray-500">{company_name} — {company_location}</p>
        <p className="text-[13px] text-[#00B837] font-semibold uppercase">{schedule}</p>
        <p className="text-[13px] font-medium">Salario: ${min_salary} - ${max_salary}</p>
      </div>
    );
  }
  