import {countries} from "../data/countries";
import {schema} from "../lib/yup-schema";
import {useRef, useState} from "react";
import * as yup from "yup";
import {UncontrolledInput} from "./UncontrolledInput";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AppDispatch, saveFormData} from "../store/store";

interface FieldType {
  name: keyof FormData;
  label: string;
  type: string;
  placeholder: string;
}

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female";
  terms: boolean;
  country: string;
  file: FileList | File;
}
export interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string | number | boolean | FileList | File;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const fields: FieldType[] = [
  {name: "name", label: "Name", type: "text", placeholder: "Write your name"},
  {name: "age", label: "Age", type: "number", placeholder: "Write your age"},
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Write your email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Write your password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
  },
];

const UnControlledPage = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());

      try {
        await schema.validate(data, {abortEarly: false});
        setFormErrors({});
        console.log("Form Data:", data);
        dispatch(saveFormData(data));
        navigate("/");
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors: Record<string, string> = {};
          err.inner.forEach((error) => {
            if (error.path) {
              errors[error.path] = error.message;
            }
          });
          setFormErrors(errors);
          console.log("Validation Errors:", errors);
        }
      }
    }
  };

  return (
    <form
      ref={formRef}
      className="max-w-[500px] mx-auto flex flex-col gap-7 text-start"
      onSubmit={handleSubmit}>
      {fields.map((field) => (
        <UncontrolledInput
          key={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          name={field.name}
          error={formErrors[field.name]}
        />
      ))}

      <div className="flex flex-col gap-5">
        <label className="text-start">Gender</label>
        <div className="flex justify-center gap-10 items-center self-start">
          <div className="flex items-center gap-2">
            <input type="radio" name="gender" value="male" />
            <label className="text-sm">Male</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="radio" name="gender" value="female" />
            <label className="text-sm">Female</label>
          </div>
        </div>
        <div className="h-1 mt-3">
          {formErrors.gender && (
            <p className="text-red-500 text-sm">{formErrors.gender}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2 self-start">
          <input
            type="checkbox"
            name="terms"
            className="text-sm bg-white border border-black rounded-md mt-1 p-2 placeholder:text-black text-black w-4 h-4"
          />
          <label className="text-start whitespace-nowrap">
            I accept the Terms and Conditions
          </label>
        </div>
        <div className="h-1 mt-3">
          {formErrors.terms && (
            <p className="text-red-500 text-sm">{formErrors.terms}</p>
          )}
        </div>
      </div>
      <div className="flex items-start gap-4 flex-col text-start">
        <label className="text-sm whitespace-nowrap self-start">
          Choose your file
        </label>
        <input
          type="file"
          name="file"
          className="text-sm bg-white w-full border border-black rounded-md mt-1 p-2 placeholder:text-black text-black"
        />
        <div className="h-1 mt-3">
          {formErrors.file && (
            <p className="text-red-500 text-sm">{formErrors.file}</p>
          )}
        </div>
      </div>
      <div className="flex items-start gap-2 self-start flex-col w-full ">
        <label
          className="text-start whitespace-nowrap self-start"
          htmlFor="country">
          Select a Country:
        </label>
        <input
          type="text"
          id="country"
          list="country-list"
          name="country"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Start typing a country name..."
        />
        <div className="h-1 mt-3">
          {formErrors.country && (
            <p className="text-red-500 text-sm">{formErrors.country}</p>
          )}
        </div>
        <datalist id="country-list">
          {countries.map((country, index) => (
            <option key={index} value={country} />
          ))}
        </datalist>
      </div>
      <button
        type="submit"
        className="bg-green-500 text-black p-2 w-fit self-center px-7 rounded-lg hover:bg-green-400 transition-all duration-300 ease-in-out">
        Submit
      </button>
    </form>
  );
};

export default UnControlledPage;
