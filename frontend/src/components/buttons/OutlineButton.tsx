type OutlineButtonProps = {
  text: string;
  width: string;
};

export default function OutlineButton({ text, width }: OutlineButtonProps) {
  return (
    <button
      style={{ width }}
      className="btn font-montserrat h-9 font-light text-[12px] text-[#003F51] border border-[#003F51] hover:text-white hover:bg-[#003F51] hover:border-[#003F51] rounded-lg inline-flex justify-center items-center transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
    >
      {text}
    </button>
  );
}
