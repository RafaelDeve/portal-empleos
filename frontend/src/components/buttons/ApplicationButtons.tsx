type Props = {
  alreadyApplied: boolean;
  isLoggedIn: boolean;
  isCompany: boolean;
  hasCV: boolean;
  onApply: () => void;
};

export default function ApplicationButtons({
  alreadyApplied,
  isLoggedIn,
  isCompany,
  hasCV,
  onApply,
}: Props) {
  if (isCompany) return null;

  const isDisabled = alreadyApplied || !hasCV;

  let buttonText = "Postularme";
  let tooltip = "";

  if (alreadyApplied) {
    buttonText = "Ya estás postulado";
  } else if (!hasCV) {
    buttonText = "Completa tu CV para postularte";
    tooltip = "Debes completar tu CV Digital antes de postularte.";
  }

  return (
    <div className="mt-4">
      {!isLoggedIn ? (
        <p className="text-sm text-gray-500">Inicia sesión para postularte.</p>
      ) : (
        <button
          onClick={onApply}
          disabled={isDisabled}
          title={tooltip}
          className={`px-6 py-2 text-sm rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
            isDisabled
              ? "bg-gray-300 text-white cursor-not-allowed"
              : "bg-[#00B837] text-white hover:bg-[#01982c] hover:scale-105 shadow-md"
          }`}
        >
          {buttonText}
          {isDisabled && !alreadyApplied && <span className="text-yellow-400">⚠️</span>}
        </button>
      )}
    </div>
  );
}
