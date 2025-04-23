type TextInputProps = {
  title: string;
  width: string;
  placeholder: string;
  type: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean; // ✅ nuevo
};

export default function TextInput({
  title,
  width,
  placeholder,
  type,
  name,
  value,
  onChange,
  disabled = false, // ✅ valor por defecto
}: TextInputProps) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend text-[14px] font-light font-montserrat text-[#003F51]">
        {title}
      </legend>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{ width }}
        className={`input text-[12px] font-light font-montserrat h-9 rounded-lg transition-all duration-400 ease-in-out shadow-none
          ${disabled
            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
            : "focus:outline-none focus:ring-1 focus:ring-[#00B837] focus:border-none"
          }`}
        placeholder={placeholder}
        required={!disabled}
      />
    </fieldset>
  );
}
