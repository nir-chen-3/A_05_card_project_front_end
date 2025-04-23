import Joi from "joi";

// Custom regex patterns for validation
import { phoneRegex, emailRegex, imageUrlRegex } from "./regexPatterns";

//
//

const cardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required().label("Title").messages({
    "string.empty": "{#label} is required",
    "string.min": "{#label} must be at least {#limit} characters",
    "string.max": "{#label} must be at most {#limit} characters",
  }),
  subtitle: Joi.string().min(2).max(256).required().label("Subtitle").messages({
    "string.empty": "{#label} is required",
    "string.min": "{#label} must be at least {#limit} characters",
    "string.max": "{#label} must be at most {#limit} characters",
  }),
  description: Joi.string()
    .min(2)
    .max(1024)
    .required()
    .label("Description")
    .messages({
      "string.empty": "{#label} is required",
      "string.min": "{#label} must be at least {#limit} characters",
      "string.max": "{#label} must be at most {#limit} characters",
    }),

  // Phone validation for Israeli number
  phone: Joi.string()
    .regex(phoneRegex)
    .min(9)
    .max(11)
    .required()
    .label("Phone")
    .messages({
      "string.empty": "{#label} is required",
      "string.pattern.base":
        "{#label} must be a valid Israeli phone number (starting with 05 followed by 8 digits)",
      "string.min": "{#label} must be at least {#limit} characters",
      "string.max": "{#label} must be at most {#limit} characters",
    }),

  // Email validation
  email: Joi.string()
    .regex(emailRegex)
    .min(5)
    .required()
    .label("Email")
    .messages({
      "string.empty": "{#label} is required",
      "string.min": "{#label} must be at least {#limit} characters",
      "string.pattern.base": "{#label} must be a valid email address",
    }),

  // Image URL validation
  web: Joi.string().min(14).optional().allow("").label("Website").messages({
    "string.min": "{#label} must be at least {#limit} characters",
  }),

  image_url: Joi.string()
    .regex(imageUrlRegex)
    .min(14)
    .optional()
    .allow("")
    .label("Image URL")
    .messages({
      "string.pattern.base": "{#label} must be a valid URL",
      "string.min": "{#label} must be at least {#limit} characters long",
    }),

  image_alt: Joi.string()
    .min(2)
    .max(256)
    .optional()
    .allow("")
    .label("Image Alt")
    .messages({
      "string.min": "{#label} must be at least {#limit} characters",
      "string.max": "{#label} must be at most {#limit} characters",
    }),

  address_state: Joi.string().optional().allow("").label("State").messages({
    "string.base": "{#label} must be a string",
  }),

  address_country: Joi.string()
    .min(2)
    .max(256)
    .required()
    .label("Country")
    .messages({
      "string.empty": "{#label} is required",
      "string.min": "{#label} must be at least {#limit} characters",
      "string.max": "{#label} must be at most {#limit} characters",
    }),

  address_city: Joi.string().min(2).max(256).required().label("City").messages({
    "string.empty": "{#label} is required",
    "string.min": "{#label} must be at least {#limit} characters",
    "string.max": "{#label} must be at most {#limit} characters",
  }),

  address_street: Joi.string()
    .min(2)
    .max(256)
    .required()
    .label("Street")
    .messages({
      "string.empty": "{#label} is required",
      "string.min": "{#label} must be at least {#limit} characters",
      "string.max": "{#label} must be at most {#limit} characters",
    }),

  address_houseNumber: Joi.number()
    .min(1)
    .required()
    .label("House Number")
    .messages({
      "number.base": "{#label} must be a number",
      "number.min": "{#label} must be at least {#limit}",
      "any.required": "{#label} is required",
    }),

  address_zip: Joi.number().optional().allow("").label("ZIP").messages({
    "number.base": "{#label} must be a number",
  }),
});

export default cardSchema;
