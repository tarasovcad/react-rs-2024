import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

interface RootState {
  formData: {
    name?: string;
    email?: string;
    age?: number;
    password?: string;
    gender?: string;
    confirmPassword?: string;
    file?: {base64?: string; name?: string};
  };
}

function App() {
  const [isUpdated, setIsUpdated] = useState(false);
  const formData = useSelector((state: RootState) => state.formData);

  useEffect(() => {
    setIsUpdated(true);
    const timer = setTimeout(() => setIsUpdated(false), 3000);
    return () => clearTimeout(timer);
  }, [formData]);

  if (!formData || Object.keys(formData).length === 0) {
    return "No List Found";
  }
  return (
    <div
      className={`text-2xl p-4 max-w-[800px] mx-auto ${isUpdated ? "border-4 border-red-500 " : ""}`}>
      {isUpdated && (
        <p className="text-center mb-5 text-red-500">Form data updated</p>
      )}
      <h1 className="text-center mb-4">React Form Handling</h1>
      <div className="text-center text-base">
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
        <p>Age: {formData.age}</p>
        <p>Password: {formData.password}</p>
        <p>Gender: {formData.gender}</p>
        <p>Confirm Password: {formData.confirmPassword}</p>
        {formData.file && (
          <img
            className="w-[250px] h-[250px] object-cover mx-auto mt-5"
            src={formData.file as unknown as string}
            alt={formData.file.name || "Uploaded image"}
          />
        )}
      </div>
    </div>
  );
}

export default App;
