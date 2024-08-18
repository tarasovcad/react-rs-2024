import * as yup from "yup";
export const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, "Name must start with an uppercase letter")
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  age: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue.trim() === "" ? undefined : value;
    })
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .required("Age is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),

  gender: yup
    .string()
    .oneOf(["male", "female", "other"], "Please select a valid gender")
    .required("Gender is required"),

  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
  country: yup.string().required("Country is required"),
});
