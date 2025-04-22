type OutlineButtonProps = {
  text: string;
  width: string; // puede ser "100%" o "200px" o "10rem"
};

export default function OutlineButton({ text, width }: OutlineButtonProps) {
  return (
    <button
      style={{ width }}
      className="btn btn-outline btn-primary font-montserrat h-9 font-light text-[11px] text-[#003F51] hover:text-white border-[#003F51] hover:bg-[#003F51] hover:border-none shadow-none transition-colors duration-300 ease-in-out rounded-lg inline-flex justify-center items-center"
    >
      {text}
    </button>
  );
}
