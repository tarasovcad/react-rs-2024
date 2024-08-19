import {InputField} from "./InputField";
import {countries} from "../data/countries";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "../lib/yup-schema";
import {useDispatch} from "react-redux";
import {AppDispatch, saveFormData} from "../store/store";
import {useNavigate} from "react-router-dom";

interface FieldType {
  name: keyof FormData;
  label: string;
  type: string;
  placeholder: string;
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


export interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string | number | boolean | FileList | File;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
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
  file: File | FileList | string;
}

const ControlledPage = () => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(schema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValue("file", base64String, {shouldValidate: true});
      };
      reader.readAsDataURL(file);
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    console.log(data);
    dispatch(saveFormData(data));
    navigate("/");
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
      <div className=" flex flex-col gap-5">
        <label className="text-start">Gender</label>
        <Controller
          name="gender"
          control={control}
          render={({field}) => (
            <>
              <div className="flex flex-col text-start">
                <div className="flex justify-center gap-10 items-center self-start">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...field}
                      value="male"
                      checked={field.value === "male"}
                    />
                    <label className="text-sm">Male</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...field}
                      value="female"
                      checked={field.value === "female"}
                    />
                    <label className="text-sm">Female</label>
                  </div>
                </div>
                <div className="h-1 mt-3">
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
      </div>
      <div className=" flex flex-col gap-5">
        <label className="text-start">Gender</label>
        <Controller
          name="terms"
          control={control}
          render={({field: {onChange, onBlur, value, name, ref}}) => (
            <>
              <div className="flex items-center gap-2 self-start">
                <input
                  type="checkbox"
                  onChange={onChange}
                  onBlur={onBlur}
                  checked={value}
                  name={name}
                  ref={ref}
                  className="text-sm bg-white border border-black rounded-md mt-1 p-2 placeholder:text-black text-black w-4 h-4"
                />
                <label className="text-start whitespace-nowrap">
                  I accept the Terms and Conditions
                </label>
              </div>
              <div className="h-1">
                {errors.terms && (
                  <p className="text-red-500 text-xs">{errors.terms.message}</p>
                )}
              </div>
            </>
          )}
        />
      </div>

      <div className="flex items-start gap-4 flex-col text-start">
        <label className="text-sm whitespace-nowrap self-start">
          Choose your file
        </label>
        <Controller
          name="file"
          control={control}
          render={({field: {onBlur}}) => (
            <>
              <input
                type="file"
                onChange={(e) => handleFileChange(e.target.files)}
                onBlur={onBlur}
                className="text-sm bg-white w-full border border-black rounded-md mt-1 p-2 placeholder:text-black text-black"
              />
              <div className="h-1">
                {errors.file && (
                  <p className="text-red-500 text-xs">{errors.file.message}</p>
                )}
              </div>
            </>
          )}
        />
      </div>
      <div className="flex items-start gap-2 self-start flex-col w-full ">
        <label
          className="text-start whitespace-nowrap self-start"
          htmlFor="country">
          Select a Country:
        </label>
        <Controller
          name="country"
          control={control}
          render={({field}) => (
            <>
              <input
                type="text"
                id="country"
                list="country-list"
                {...field}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Start typing a country name..."
              />
              <datalist id="country-list">
                {countries.map((country, index) => (
                  <option key={index} value={country} />
                ))}
              </datalist>
              <div className="h-1">
                {errors.country && (
                  <p className="text-red-500 text-xs">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </>
          )}
        />
      </div>
      <button
        className="bg-green-500 text-black p-2 w-fit self-center px-7 rounded-lg hover:bg-green-400 transition-all duration-300 ease-in-out disabled:bg-green-200 disabled:cursor-not-allowed"
        disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default ControlledPage;
