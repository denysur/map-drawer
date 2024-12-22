import { useCallback, useState } from "react";

import Form from "../../components/Login/Form";
import Layout from "../../components/Login/Layout";
import Title from "../../components/Login/Title";
import Logo from "../../components/Logo";

import { useTitle } from "../../hooks/useTitle";
import { validateLoginForm } from "../../utils/form";

import { ValidationError } from "../../types";

const Login = () => {
  const [validationError, setValidationError] =
    useState<ValidationError | null>(null);

  useTitle("Times of Ukraine Map - Login");

  const onSubmitHandler = useCallback((formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const validationErrors = validateLoginForm(email, password);

    setValidationError(validationErrors);

    if (!validationErrors) {
      console.log("email", formData.get("email"));
      console.log("password", formData.get("password"));
    }
  }, []);

  return (
    <>
      <Layout>
        <Logo />
        <Title />
        <Form
          errorMessage={validationError?.validationError}
          invalidFields={validationError?.invalidFields || []}
          onSubmit={onSubmitHandler}
        />
      </Layout>
    </>
  );
};

export default Login;
