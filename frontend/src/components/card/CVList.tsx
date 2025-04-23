import CVCard from "./CVCard";

type CV = Parameters<typeof CVCard>[0];

export default function CVList({ cvs }: { cvs: CV[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#003f51]">Postulaciones: {cvs.length}</h2>
      {cvs.map((cv, index) => (
        <CVCard key={index} {...cv} />
      ))}
    </div>
  );
}
