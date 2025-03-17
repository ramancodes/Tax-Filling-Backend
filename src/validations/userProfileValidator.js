const Joi = require("joi");

module.exports = {
  userProfile: (userObj) => {
    const schema = Joi.object({
      UserId: Joi.string().trim().required(),
      firstName: Joi.string().trim().min(1).required(),
      middleName: Joi.string().trim().optional(),
      lastName: Joi.string().trim().min(1).required(),
      gender: Joi.string().trim().min(1).required().valid("male", "female", "other"),
      dob: Joi.string().trim().min(1).required(),
      phoneNo: Joi.number().min(6000000000).max(10000000000).required(),
      address: Joi.string().trim().min(1).required(),
      occupation: Joi.string().trim().required(),
      website: Joi.string().trim().optional(),
    });
    return schema.validate(userObj);
  },
  updateUserProfile: (userObj) => {
    const schema = Joi.object({
      UserId: Joi.string().trim().required(),
      firstName: Joi.string().trim().min(1).optional(),
      middleName: Joi.string().trim().optional(),
      lastName: Joi.string().trim().min(1).optional(),
      gender: Joi.string().trim().min(1).valid("male", "female", "other").optional(),
      dob: Joi.string().trim().min(1).optional(),
      phoneNo: Joi.number().min(6000000000).max(10000000000).optional(),
      address: Joi.string().trim().min(1).optional(),
      occupation: Joi.string().trim().optional(),
      website: Joi.string().trim().optional(),
    });
    return schema.validate(userObj);
  },
  getUserProfile: (userObj) => {
    const schema = Joi.object({
      UserId: Joi.string().trim().required()
    });
    return schema.validate(userObj);
  },
};
