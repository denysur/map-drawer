import { useCallback, useState } from "react";

import Layout from "../../components/Layout";
import Form from "../../components/Login/Form";
import Title from "../../components/Login/Title";

import { useTitle } from "../../hooks/useTitle";
import { validateLoginForm } from "../../utils/form";
import { useAuthorization } from "../../hooks/useAuthorization";

import { ValidationError } from "../../types";
import LoginContent from "../../components/Login/LoginContent";

const LoginPage = () => {
  const [validationError, setValidationError] =
    useState<ValidationError | null>(null);

  useTitle("Times of Ukraine Map - Login");

  const { login } = useAuthorization();

  const onSubmitHandler = useCallback((formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const formValidationErrorState = validateLoginForm(email, password);

    setValidationError(formValidationErrorState);

    if (!formValidationErrorState && email && password) {
      login(email.toString(), password.toString());
    }
  }, []);

  return (
    <>
      <Layout>
        <LoginContent>
          <Title />
          <Form
            errorMessage={validationError?.validationError}
            invalidFields={validationError?.invalidFields || []}
            onSubmit={onSubmitHandler}
          />
        </LoginContent>
      </Layout>
    </>
  );
};

export default LoginPage;
