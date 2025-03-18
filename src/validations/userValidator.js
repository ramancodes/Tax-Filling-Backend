const Joi = require("joi");

module.exports = {
  createUser: (userObj) => {
    const schema = Joi.object({
      email: Joi.string().lowercase().trim().min(1).required().email(),
      password: Joi.string().trim().min(8).max(12).required(),
      username: Joi.string().trim().min(1).required(),
      role: Joi.string().trim() 
    });
    return schema.validate(userObj);
  },
  loginUser: (userObj) => {
    const schema = Joi.object({
      username: Joi.string().trim().min(1).required(),
      password: Joi.string().trim().min(8).max(12).required(),
      role: Joi.string().valid("user", "admin").required(),
    });
    return schema.validate(userObj);
  },
  updateUser: (userObj) => {
    const schema = Joi.object({
      id: Joi.string().trim().required(),
      email: Joi.string().lowercase().trim().min(1).required().email(),
      role: Joi.string().valid("user", "admin").required(),
    });
    return schema.validate(userObj);
  },
  getuserName: (userObj) => {
    const schema = Joi.object({
      email: Joi.string().lowercase().trim().min(1).required().email(),
      role: Joi.string().valid("user", "admin").required(),
    });
    return schema.validate(userObj);
  },
  forgotPassword: (resetPasswordObj) => {
    const schema = Joi.object({
      username: Joi.string().trim().min(1).required(),
      newPassword: Joi.string().trim().min(8).max(12).required(),
      role: Joi.string().valid("user", "admin").required(),
    });
    return schema.validate(resetPasswordObj);
  },
  resetPassword: (resetPasswordObj) => {
    const schema = Joi.object({
      id: Joi.string().trim().min(1).required(),
      oldPassword: Joi.string().trim().min(8).max(12).required(),
      newPassword: Joi.string().trim().min(8).max(12).required()
    });
    return schema.validate(resetPasswordObj);
  },
};
