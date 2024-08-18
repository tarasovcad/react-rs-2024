import {useEffect, useState} from "react";
import {InputFieldProps} from "./ControlledPage";

export const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
}: InputFieldProps) => {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    if (type === "password" && typeof value === "string") {
      const password = value;
      let newStrength = 0;

      if (password.match(/[0-9]/)) newStrength++;
      if (password.match(/[A-Z]/)) newStrength++;
      if (password.match(/[a-z]/)) newStrength++;
      if (password.match(/[^A-Za-z0-9]/)) newStrength++;

      setStrength(newStrength);
    } else {
      setStrength(0);
    }
  }, [value, type]);

  return (
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
      {type === "password" && (
        <div className="mt-1 h-1 w-full bg-gray-200 overflow-hidden rounded-full transition-all duration-300 ease-in-out">
          <div
            className={`h-full ${getStrengthColor(strength)}  transition-all duration-300 ease-in-out`}
            style={{width: `${strength * 25}%`}}></div>
        </div>
      )}
    </div>
  );
};

function getStrengthColor(strength: number): string {
  switch (strength) {
    case 1:
      return "bg-red-500";
    case 2:
      return "bg-orange-500";
    case 3:
      return "bg-yellow-500";
    case 4:
      return "bg-green-500";
    default:
      return "bg-gray-200";
  }
}
