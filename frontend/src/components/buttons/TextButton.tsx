type TextButtonProps = {
  span: String;
  CTA: String;
};

export default function TextButton({ span, CTA }: TextButtonProps) {
  return (
    <button className="btn btn-link font-montserrat font-light text-[#003F51] text-[12px] no-underline hover:underline inline-flex gap-1 items-center transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
      <span>{span}</span>
      <h4 className="text-[#00B837] text-[12px] font-medium">
        {CTA}
      </h4>
    </button>
  );
}
