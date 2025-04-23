type PrimaryButtonProps = {
  text: string;
  width: string;
};

export default function PrimaryButton({ text, width }: PrimaryButtonProps) {
  return (
    <button
      style={{ width }}
      className="btn font-montserrat text-white font-light text-[12px] bg-[#003F51] hover:bg-[#005D77] h-9 shadow-none border-none transition duration-300 ease-in-out rounded-lg inline-flex justify-center items-center hover:scale-105 active:scale-95"
    >
      {text}
    </button>
  );
}
