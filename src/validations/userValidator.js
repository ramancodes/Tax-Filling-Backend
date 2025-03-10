const Joi = require("joi");

module.exports = {
  createUser: (userObj) => {
    const schema = Joi.object({
      email: Joi.string().lowercase().trim().min(1).required().email(),
      password: Joi.string().trim().min(1).required(),
      firstName: Joi.string().trim().min(1).required(),
      lastName: Joi.string().trim().min(1).required(),
      mobileNo: Joi.string().trim()
    });
    return schema.validate(userObj);
  },
  updateUser: (userObj) => {
    const schema = Joi.object({
      password: Joi.string().trim(),
      mobileNo: Joi.string().trim(),
      verified: Joi.boolean(),
    });
    return schema.validate(userObj);
  },
  loginUser: (userObj) => {
    const schema = Joi.object({
      email: Joi.string().lowercase().trim().min(1).required().email(),
      password: Joi.string().trim().min(1).required(),
      type: Joi.string().valid("user", "admin").required(),
    });
    return schema.validate(userObj);
  },
  createOpsAdmin: (userObj) => {
    const schema = Joi.object({
      email: Joi.string().lowercase().trim().min(1).required().email(),
      username: Joi.string(),
      password: Joi.string().trim().min(1).required(),
      firstName: Joi.string().trim().min(1).required(),
      lastName: Joi.string().trim().min(1).required(),
      mobileNo: Joi.string().trim(),
      role: Joi.string().required()
    });
    return schema.validate(userObj);
  },
  forgotPassword: (resetPasswordObj) => {
    const schema = Joi.object({
      email: Joi.string().lowercase().trim().min(1).required().email(),
    });
    return schema.validate(resetPasswordObj);
  },
  resetPassword: (resetPasswordObj) => {
    const schema = Joi.object({
      email: Joi.string().lowercase().trim().min(1).required().email(),
      token: Joi.string().required(),
      newPassword: Joi.string().trim().min(1).required(),
    });
    return schema.validate(resetPasswordObj);
  },
};
