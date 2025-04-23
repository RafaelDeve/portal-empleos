type JobDescriptionProps = {
  description?: string;
  requirements?: string;
  benefits?: string;
};

export default function JobDescription({ description, requirements, benefits }: JobDescriptionProps) {
  return (
    <section className="space-y-4 text-[13px] leading-relaxed mt-6">
      <div>
        <h2 className="font-semibold text-[#003f51]">Descripción</h2>
        <p>{description || "No disponible."}</p>
      </div>
      <div>
        <h2 className="font-semibold text-[#003f51]">Requisitos</h2>
        <p>{requirements || "No especificados."}</p>
      </div>
      <div>
        <h2 className="font-semibold text-[#003f51]">Beneficios</h2>
        <p>{benefits || "No indicados."}</p>
      </div>
    </section>
  );
}
