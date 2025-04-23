import { useFormik } from "formik";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";

import PageHeader from "../components/common/pageHeader";
import Input from "../components/common/input";

import { useAuth } from "../context/auth.context.jsx";

import userDefaultValues from "../formDefaults/userDefaults.js";
import userSchema from "../schemas/userSchema.js";

import userFormFields from "../utils/userFormFields.js";
import userTransformToObject from "../utils/userTransform.js";

function SignUp() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const { user, createUser } = useAuth();

  const { getFieldProps, handleSubmit, touched, errors, isValid, setValues } =
    useFormik({
      validateOnMount: true,
      initialValues: userDefaultValues,
      validate(values) {
        const formValues = {
          ...values,
          address_houseNumber:
            typeof values.address_houseNumber === "number"
              ? values.address_houseNumber.toString()
              : values.address_houseNumber,
          address_zip:
            typeof values.address_zip === "number"
              ? values.address_zip.toString()
              : values.address_zip,
        };

        const { error } = userSchema.validate(formValues, {
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
        const submitData = {
          ...values,
          address_houseNumber: Number(values.address_houseNumber),
          address_zip: Number(values.address_zip),
        };
        const userObject = userTransformToObject(submitData);

        try {
          await createUser(userObject);

          navigate("/sign-in");
        } catch (err) {
          if (err.response?.status === 400) {
            setServerError(err.response.data);
            console.log("err");
          }
        }
      },
    });

  if (user) {
    return <Navigate to="/" />;
  }

  const title = "Sign Up";
  const description = "Create an account to get started";

  return (
    <div className="container">
      <PageHeader title={title} description={description}></PageHeader>

      <div className="row justify-content-center mt-4">
        <div className="col-7">
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            {serverError && (
              <div className="alert alert-danger">{serverError}</div>
            )}
            <div className="row">
              {userFormFields.map((field, index) => (
                <div key={index} className="col-12 col-md-8 col-lg-6 mb-3">
                  <div className="w-100">
                    <Input
                      label={field.label}
                      error={touched[field.name] && errors[field.name]}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder || ""}
                      required={field.required}
                      {...getFieldProps(field.name)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="my-2">
              <button
                disabled={!isValid}
                type="submit"
                className="btn btn-primary"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
