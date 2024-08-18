interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
}

export const InputField = ({label, type, placeholder}: InputFieldProps) => (
  <div>
    <label className="text-start">{label}</label>
    <input
      type={type}
      className="text-sm bg-white w-full border border-black rounded-md mt-1 p-2 placeholder:text-black text-black"
      placeholder={placeholder}
    />
  </div>
);
