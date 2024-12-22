import { useCallback } from "react";

import Form from "../../components/Login/Form";
import Layout from "../../components/Login/Layout";
import Title from "../../components/Login/Title";
import Logo from "../../components/Logo";

import { useTitle } from "../../hooks/useTitle";

const Login = () => {
  useTitle("Times of Ukraine Map - Login");

  const onSubmitHandler = useCallback((formData: FormData) => {
    console.log("email", formData.get("email"));
    console.log("password", formData.get("password"));
  }, []);

  return (
    <>
      <Layout>
        <Logo />
        <Title />
        <Form onSubmit={onSubmitHandler} />
      </Layout>
    </>
  );
};

export default Login;
