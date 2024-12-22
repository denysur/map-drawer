import { ValidationError } from "../types";

/**
 * This function validates email and password from login form.
 *
 * @param email
 * @param password
 * @returns
 */
export const validateLoginForm = (
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null
): ValidationError | null => {
  if (!email && !password) {
    return {
      validationError: "Пошта та пароль - обовʼязкові.",
      invalidFields: ["email", "password"],
    };
  } else if (!password) {
    return {
      validationError: "Пароль обовʼязковий.",
      invalidFields: ["password"],
    };
  } else if (!email) {
    return {
      validationError: "Пошта обовʼязкова.",
      invalidFields: ["email"],
    };
  }

  return null;
};
