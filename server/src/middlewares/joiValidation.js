const Joi = require("joi");

const userJoi = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string()
    .min(8)
    .required()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .message(
      "Password must include min 8 letters and at least: 1 special character,1 number. "
    ),
  type: Joi.string().required().valid("ADMIN", "VENDOR"),
});

const loginJoi = Joi.object({
  email: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});

const productJoi = Joi.object({
  productName: Joi.string().required(),
  unit: Joi.number().min(0).required(),
  price: Joi.number().min(0).required(),
});

const productUpdateJoi = Joi.object({
  productName: Joi.string(),
  unit: Joi.number().min(0),
  price: Joi.number(),
});

const createBillValidation = Joi.object({
  customerName: Joi.string().required(),
  phone: Joi.string()
    .min(0)
    .required()
    .regex(/^[6-9][0-9]{9}$/),
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().required(),
      })
    )
    .required(),
});

module.exports = {
  userJoi,
  productJoi,
  productUpdateJoi,
  loginJoi,
  createBillValidation,
};
