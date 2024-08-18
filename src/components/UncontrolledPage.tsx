import {ChangeEvent, useState} from "react";
import {InputField} from "./InputField";
import {countries} from "../data/countries";

interface FieldData {
  label: string;
  type: string;
  placeholder: string;
}

const fields: FieldData[] = [
  {label: "Name", type: "text", placeholder: "Write your name"},
  {label: "Age", type: "number", placeholder: "Write your age"},
  {label: "Email", type: "email", placeholder: "Write your email"},
  {label: "Password", type: "password", placeholder: "Write your password"},
  {
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
  },
];

const UncontrolledPage = () => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className="max-w-[500px] mx-auto flex flex-col gap-7 text-start">
      {fields.map((field, index) => (
        <InputField key={index} {...field} />
      ))}
      asdfkjsafjasdflajsdflksjfkljasfk;ljsadfkl;j
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
    </div>
  );
};

export default UncontrolledPage;
