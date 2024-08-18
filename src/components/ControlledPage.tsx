import {ChangeEvent, useState} from "react";
import {InputField} from "./InputField";
import {countries} from "../data/countries";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "../lib/yup-schema";

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
  gender: string;
  terms: boolean;
  country: string;
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

const ControlledPage = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(schema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const [selectedCountry, setSelectedCountry] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <form
      className="max-w-[500px] mx-auto flex flex-col gap-7 text-start"
      onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <Controller
          key={index}
          name={field.name as keyof FormData}
          control={control}
          render={({field: {onChange, value, onBlur}}) => (
            <>
              <div>
                <InputField
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
                <div className="h-1">
                  {errors[field.name as keyof FormData] && (
                    <p className="text-red-500 text-xs">
                      {errors[field.name as keyof FormData]?.message}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        />
      ))}
      <label className="text-start">Gender</label>
      <div className="flex justify-center gap-10 items-center self-start">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            className="text-sm bg-white w-full border border-black rounded-md mt-1 p-2 placeholder:text-black text-black"
          />
          <label className="text-sm">Male</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            className="text-sm bg-white w-full border border-black rounded-md mt-1 p-2 placeholder:text-black text-black"
          />
          <label className="text-sm">Female</label>
        </div>
      </div>
      <div className="flex items-center gap-2 self-start ">
        <input
          type="checkbox"
          className="text-sm bg-white border border-black rounded-md mt-1 p-2 placeholder:text-black text-black w-4 h-4"
        />
        <label className="text-start whitespace-nowrap">
          I accept the Terms and Conditions
        </label>
      </div>
      <div className="flex items-center gap-4 flex-col text-start">
        <label className="text-sm whitespace-nowrap self-start">
          Choose your file
        </label>
        <input
          type="file"
          className="text-sm bg-white w-full border border-black rounded-md mt-1 p-2 placeholder:text-black text-black"
        />
      </div>
      <div className="flex items-center gap-2 self-start flex-col w-full">
        <label
          className="text-start whitespace-nowrap self-start"
          htmlFor="country">
          Select a Country:
        </label>
        <input
          type="text"
          id="country"
          name="country"
          list="country-list"
          value={selectedCountry}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Start typing a country name..."
        />
        <datalist id="country-list">
          {countries.map((country, index) => (
            <option key={index} value={country} />
          ))}
        </datalist>
      </div>
      <button className="bg-green-500 text-black p-2 w-fit self-center px-7 rounded-lg hover:bg-green-400 transition-all duration-300 ease-in-out">
        Submit
      </button>
    </form>
  );
};

export default ControlledPage;
