type PrimaryButtonProps = {
  text: String;
  width: String;
};

export default function PrimaryButton({ text, width }: PrimaryButtonProps) {
  return (
    <>
      <button
        className={`btn btn-primary font-montserrat text-white font-light text-[11px] w-[${width}%] bg-[#003F51] hover:bg-[#005D77] h-9  shadow-none border-none transition-colors duration-300 ease-in-out rounded-lg inline-flex`}
      >
        {text}
      </button>
    </>
  );
}
