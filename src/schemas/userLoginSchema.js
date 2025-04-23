import Joi from "joi";

// Custom regex patterns for validation
import { emailRegex, passwordRegex } from "./regexPatterns";

//
//

const userLoginSchema = Joi.object({
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
});

export default userLoginSchema;
