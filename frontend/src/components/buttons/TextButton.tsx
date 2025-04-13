
type TextButtonProps = {
    span: String,
    CTA: String
}



export default function TextButton({span, CTA}: TextButtonProps) {
  return (
    <>
      <button className="btn btn-link font-montserrat font-light text-[#003F51] text-[11px] no-underline hover:underline inline-flex gap-0.5 items-center">
        <span>{span}</span>
        <h4 className="text-[#00B837] text-[11px] font-medium">
          {CTA}
        </h4>
      </button>
    </>
  );
}
