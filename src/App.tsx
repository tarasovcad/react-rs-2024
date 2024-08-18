import {useSelector} from "react-redux";

interface RootState {
  formData: {
    name?: string;
    email?: string;
    age?: number;
    password?: string;
    gender?: string;
    confirmPassword?: string;
    file?: {
      base64?: string;
      name?: string;
    };
  };
}

function App() {
  const formData = useSelector((state: RootState) => state.formData);
  console.log("Form Data at App:", formData);

  if (!formData || Object.keys(formData).length === 0) {
    return "No List Found";
  }
  return (
    <div className="text-2xl">
      <h1 className="text-center mb-4">React Form Handling</h1>
      <div className="text-center text-base">
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
        <p>Age: {formData.age}</p>
        <p>Password: {formData.password}</p>
        <p>Gender: {formData.gender}</p>
        <p>Confirm Password: {formData.confirmPassword}</p>
        {formData.file && formData.file.base64 && (
          <img
            className="w-[250px] h-[250px] object-cover mx-auto mt-5"
            src={formData.file.base64}
            alt={formData.file.name}
          />
        )}
      </div>
    </div>
  );
}

export default App;
