export interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value?: string | number | boolean | FileList | File;
  error: string;
  name: string;
}
export const UncontrolledInput = ({
  label,
  type,
  placeholder,
  error,
  name,
}: InputFieldProps) => (
  <div>
    <label className="text-start">{label}</label>
    <input
      name={name}
      type={type}
      className="text-sm mb-1 bg-white w-full border border-black rounded-md mt-1 p-2 placeholder:text-black text-black"
      placeholder={placeholder}
    />
    <div className="h-1">
      <p className="text-red-500 text-xs">{error}</p>
    </div>
  </div>
);
