type TextInputProps = {
    title: String,
    width: String,
    placeholder: String,
    type: String
}


export default function TextInput({title, width, placeholder, type}: TextInputProps) {
  return (
    <>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-[11px] font-light font-montserrat text-[#003F51]">{title}</legend>
        <input type={`${type}`} className={`input text-[10px] font-light w-[${width}%] font-montserrat h-9 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00B837] focus:border-none shadow-none transition-all duration-400 ease-in-out text-`} placeholder={`${placeholder}`}/>
      </fieldset>
    </>
  );
}
