import * as yup from "yup";
import {countries} from "../data/countries";

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
    .required("Password is required")
    .test(
      "has-number",
      "Password must contain at least one number",
      (value) => {
        return value ? /[0-9]/.test(value) : false;
      },
    )
    .test(
      "has-uppercase",
      "Password must contain at least one uppercase letter",
      (value) => {
        return value ? /[A-Z]/.test(value) : false;
      },
    )
    .test(
      "has-lowercase",
      "Password must contain at least one lowercase letter",
      (value) => {
        return value ? /[a-z]/.test(value) : false;
      },
    )
    .test(
      "has-special",
      "Password must contain at least one special character",
      (value) => {
        return value ? /[!@#$%^&*(),.?":{}|<>]/.test(value) : false;
      },
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),

  gender: yup
    .string()
    .oneOf(["male", "female"] as const, "Please select a valid gender")
    .required("Gender is required"),

  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
  country: yup
    .string()
    .oneOf(countries, "Please select a valid country")
    .required("Country is required"),
  file: yup
    .mixed<File | FileList>()
    // .test("fileType", "Invalid file type", (value) => {
    //   if (!value) return true;
    //   return value instanceof FileList || value instanceof File;
    // })
    .required("File is required"),
});
