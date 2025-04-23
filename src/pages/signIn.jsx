import { useFormik } from "formik";
import { Navigate, useNavigate } from "react-router";
import { useState } from "react";

import PageHeader from "../components/common/pageHeader";
import Input from "../components/common/input";

import { useAuth } from "../context/auth.context.jsx";

import userLoginSchema from "../schemas/userLoginSchema";

function signIn() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  //
  const { user, login } = useAuth();

  const { getFieldProps, handleSubmit, touched, errors, isValid } = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate(values) {
      const { error } = userLoginSchema.validate(values, {
        abortEarly: false,
      });

      if (!error) {
        return null;
      }

      const errors = {};
      for (const detail of error.details) {
        errors[detail.path[0]] = detail.message;
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        await login(values);
        navigate("/");
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError(err.response.data);
          console.log(err);
        } else {
          console.log(err);
        }
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  const title = "Login";
  const description = "Access your account";
  return (
    <div className="container">
      <PageHeader title={title} description={description}></PageHeader>
      <div className="row justify-content-center mt-4">
        <div className="col-md-5">
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            {serverError && (
              <div className="alert alert-danger">{serverError}</div>
            )}

            <Input
              label="Email"
              //
              error={touched.email && errors.email}
              //
              type="email"
              name="email"
              placeholder="john@doe.com"
              required
              //
              {...getFieldProps("email")}
            />
            <Input
              label="Password"
              //
              error={touched.password && errors.password}
              //
              type="password"
              name="password"
              required
              //
              {...getFieldProps("password")}
            />

            <div className="my-2">
              <button
                disabled={!isValid}
                type="submit"
                className="btn btn-primary"
              >
                {title}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default signIn;
