import Joi from "joi";

export const bizNumberInputSchema = Joi.number()
  .integer()
  .min(1000000)
  .max(9999999)
  .required()
  .messages({
    "number.base": "Must be a number",
    "number.min": "Must be at least 1000000",
    "number.max": "Must be at most 9999999",
    "any.required": "This field is required",
  });
