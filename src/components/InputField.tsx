interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string | number | boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
}: InputFieldProps) => (
  <div>
    <label className="text-start">{label}</label>
    <input
      type={type}
      className="text-sm mb-1 bg-white w-full border border-black rounded-md mt-1 p-2 placeholder:text-black text-black"
      placeholder={placeholder}
      value={value as string | number}
      onChange={onChange}
      onBlur={onBlur}
    />
  </div>
);
