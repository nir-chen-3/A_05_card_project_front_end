import Joi from "joi";

// Custom regex patterns for validation
import {
  phoneRegex,
  emailRegex,
  imageUrlRegex,
  passwordRegex,
} from "./regexPatterns";

//
//

const userSchema = Joi.object({
  name_first: Joi.string()
    .min(2)
    .max(256)
    .required()
    .label("First Name")
    .messages({
      "string.empty": "{#label} is required",
      "string.min": "{#label} must be at least {#limit} characters",
      "string.max": "{#label} must be at most {#limit} characters",
    }),
  name_middle: Joi.string()
    .min(2)
    .max(256)
    .optional()
    .allow("")
    .label("Middle Name")
    .messages({
      "string.min": "{#label} must be at least {#limit} characters",
      "string.max": "{#label} must be at most {#limit} characters",
    }),
  name_last: Joi.string()
    .min(2)
    .max(256)
    .required()
    .label("Last Name")
    .messages({
      "string.empty": "{#label} is required",
      "string.min": "{#label} must be at least {#limit} characters",
      "string.max": "{#label} must be at most {#limit} characters",
    }),

  phone: Joi.string().regex(phoneRegex).required().label("Phone").messages({
    "string.empty": "{#label} is required",
    "string.pattern.base":
      "{#label} must be a valid Israeli phone number (starting with 05 followed by 8 digits)",
  }),

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

  password: Joi.string()
    .regex(passwordRegex)
    .min(9)
    .max(20)
    .required()
    .label("Password")
    .messages({
      "string.empty": "{#label} is required",
      "string.min": "{#label} must be at least {#limit} characters",
      "string.max": "{#label} must be at most {#limit} characters",
      "string.pattern.base":
        "{#label} must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*-)",
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

  address_state: Joi.string()
    .min(2)
    .max(256)
    .optional()
    .allow("")
    .label("State")
    .messages({
      "string.min": "{#label} must be at least {#limit} characters",
      "string.max": "{#label} must be at most {#limit} characters",
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

  address_houseNumber: Joi.string()
    .pattern(/^\d+$/)
    .min(2)
    .max(256)
    .required()
    .label("House Number")
    .messages({
      "string.base": "{#label} must be a string of digits",
      "string.empty": "{#label} cannot be empty",
      "string.pattern.base": "{#label} must contain only digits",
      "string.min": "{#label} must be at least {#limit} digits",
      "string.max": "{#label} must be at most {#limit} digits",
      "any.required": "{#label} is required",
    }),

  address_zip: Joi.string()
    .pattern(/^\d+$/)
    .min(2)
    .max(256)
    .required()
    .label("ZIP")
    .messages({
      "string.base": "{#label} must be a string of digits",
      "string.empty": "{#label} cannot be empty",
      "string.pattern.base": "{#label} must contain only digits",
      "string.min": "{#label} must be at least {#limit} digits",
      "string.max": "{#label} must be at most {#limit} digits",
      "any.required": "{#label} is required",
    }),

  isBusiness: Joi.boolean().required().label("Is Business").messages({
    "boolean.base": "{#label} must be true or false",
    "any.required": "{#label} is required",
  }),
});

export default userSchema;
