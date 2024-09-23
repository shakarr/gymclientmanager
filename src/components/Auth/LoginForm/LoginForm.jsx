import { Form, Icon } from "semantic-ui-react";
import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";

import useAuth from "../../../hooks/useAuth";
import { initialValues, validationSchema } from "./LoginForm.data";

import "./loginForm.scss";
import { BackendClient } from "../../../utils/backendClient";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const client = new BackendClient()

  const { setAuth } = useAuth();

  const onShowHidenPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { data } = await client.post(
          "/api/users/login",
          formValue
        );
        localStorage.setItem("token", data.token);
        setAuth(data);
      } catch (error) {
        const { data } = error.response;
        toast.error(data.msg);
      }
    },
  });

  return (
    <div className="login-form">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="email"
          type="text"
          placeholder="Email"
          icon="mail outline"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          icon={
            <Icon
              name={showPassword ? "eye slash" : "eye"}
              link
              onClick={onShowHidenPassword}
            />
          }
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />
        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
          Iniciar Sesión
        </Form.Button>
      </Form>
    </div>
  );
}
