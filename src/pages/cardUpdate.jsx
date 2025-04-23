import cardsService from "../services/cardsService";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";

import { useFormik } from "formik";

import PageHeader from "../components/common/pageHeader";
import Input from "../components/common/input";
import useCard from "../hooks/useCard";

import cardDefaultValues from "../formDefaults/cardDefaults";
import cardSchema from "../schemas/cardSchema.js";
import cardTransformToObject from "../utils/cardTransform.js";
import cardFormFields from "../utils/cardFormFields.js";
import { useAuth } from "../context/auth.context.jsx";

function CardUpdate({ cardCreate = false }) {
  const { user } = useAuth();

  const { id } = useParams();

  let card = null;

  if (!cardCreate) {
    card = useCard(id);
  }

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
    initialValues: cardDefaultValues,

    validate(values) {
      const { error } = cardSchema.validate(values, { abortEarly: false });

      if (!error) {
        return null;
      }

      const errors = {};
      for (const detail of error.details) {
        errors[detail.path[0]] = detail.message;
      }

      return errors;
    },
    async onSubmit(values) {
      const cardObject = cardTransformToObject(values);

      try {
        if (!cardCreate) {
          await cardsService.updateCard(id, cardObject);
        }
        if (cardCreate) {
          await cardsService.createCard(cardObject);
        }

        navigate("/my-cards");
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        }
      }
    },
  });

  const oldValuesRef = useRef(null);

  useEffect(() => {
    if (!cardCreate) {
      if (!card) {
        return;
      }

      const oldValues = {
        title: card.data.title,
        subtitle: card.data.subtitle,
        description: card.data.description,
        phone: card.data.phone,
        email: card.data.email,
        web: card.data.web,
        image_url: card.data.image.url,
        image_alt: card.data.image.alt,
        address_state: card.data.address.state,
        address_country: card.data.address.country,
        address_city: card.data.address.city,
        address_street: card.data.address.street,
        address_houseNumber: card.data.address.houseNumber,
        address_zip: card.data.address.zip,
      };

      oldValuesRef.current = oldValues;
      setValues(oldValues);
    }
  }, [card]);

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

  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container">
      {!cardCreate ? <PageHeader title="Edit Card" /> : null}

      <div className="row justify-content-center mt-4">
        <div className="col-7">
          <form onSubmit={handleSubmit}>
            {serverError && (
              <div className="alert alert-danger">{serverError}</div>
            )}

            <div className="row">
              {cardFormFields.map((field, index) => (
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
                type="submit"
                disabled={!isValid}
                className="btn btn-primary"
              >
                {cardCreate ? "Create Card" : "Update Card"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default CardUpdate;
