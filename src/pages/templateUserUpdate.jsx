import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router";

import Input from "../components/common/input.jsx";

import { useAuth } from "../context/auth.context.jsx";

import userUpdateDefaultValues from "../formDefaults/userUpdateDefaults.js";
import userUpdateSchema from "../schemas/userUpdateSchema.js";

import userFormFields from "../utils/userFormFields.js";
import userUpdateTransformToObject from "../utils/userUpdateTransform.js";

function TemplateUserUpdate({ user, me_info }) {
  const { updateUser, refreshMeInfo } = useAuth();

  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const {
    getFieldProps,
    handleSubmit,
    touched,
    errors,
    isValid,
    setValues,
    setTouched,
    values,
  } = useFormik({
    validateOnMount: true,
    initialValues: userUpdateDefaultValues,
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

      const { error } = userUpdateSchema.validate(formValues, {
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
      const userUpdateObject = userUpdateTransformToObject(submitData);

      try {
        await updateUser(me_info?._id, userUpdateObject);
        if (!user?.isAdmin) {
          refreshMeInfo();
          navigate("/profile");
        }

        if (user?.isAdmin) {
          if (user?._id == me_info?._id) {
            navigate("/profile");
          } else {
            navigate(`/admin/user-description/${me_info?._id}`);
          }
        }
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError(err.response.data);
          console.log("err");
        }
      }
    },
  });

  if (!user) {
    return <Navigate to="/" />;
  }

  const oldValuesRef = useRef(null);

  useEffect(() => {
    if (!me_info) return;

    const oldValues = {
      name_first: me_info.name.first,
      name_middle: me_info.name.middle,
      name_last: me_info.name.last,
      phone: me_info.phone,
      image_url: me_info.image.url,
      image_alt: me_info.image.alt,
      address_state: me_info.address.state,
      address_country: me_info.address.country,
      address_city: me_info.address.city,
      address_street: me_info.address.street,
      address_houseNumber: me_info.address.houseNumber?.toString() || "",
      address_zip: me_info.address.zip?.toString() || "",
    };

    oldValuesRef.current = oldValues;
    setValues(oldValues);
  }, [me_info]);

  useEffect(() => {
    if (!oldValuesRef.current) return;

    const allMatched = Object.entries(oldValuesRef.current).every(
      ([key, val]) => values[key] === val
    );

    if (allMatched) {
      const touchedFields = Object.keys(oldValuesRef.current).reduce(
        (acc, key) => {
          acc[key] = true;
          return acc;
        },
        {}
      );
      setTouched(touchedFields);
      oldValuesRef.current = null; // clear after applying
    }
  }, [values]);

  //

  const userUpdateFormFields = userFormFields.filter(
    (field) => !["email", "password", "isBusiness"].includes(field.name)
  );

  return (
    <div className="container">
      <div className="row justify-content-center mt-4">
        <div className="col-7">
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            {serverError && (
              <div className="alert alert-danger">{serverError}</div>
            )}
            <div className="row">
              {userUpdateFormFields.map((field, index) => (
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
                User Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default TemplateUserUpdate;
