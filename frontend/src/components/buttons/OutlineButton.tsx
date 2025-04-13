type OutlineButtonProps = {
  text: String;
  width: String;
};

export default function OutlineButton({ text, width }: OutlineButtonProps) {
  return (
    <>
      <button
        className={`btn btn-outline btn-primary font-montserrat w-[${width}%] h-9 font-light text-[11px] text-[#003F51] hover:text-white border-[#003F51] hover:bg-[#003F51] hover:border-none shadow-none transition-colors duration-300 ease-in-out rounded-lg inline-flex`}
      >
        {text}
      </button>
    </>
  );
}
