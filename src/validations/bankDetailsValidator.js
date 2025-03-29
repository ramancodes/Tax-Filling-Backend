const Joi = require("joi");

module.exports = {
  addBankDetails: (userObj) => {
    const schema = Joi.object({
      bankName: Joi.string().trim().min(1).required(),
      accountNumber: Joi.number().required(),
      customerId: Joi.number().optional(),
      ifscCode: Joi.string().trim().required(),
      UserId: Joi.string().trim().required(),
    });
    console.log("Hello");
    return schema.validate(userObj);
  },
  updateBankDetails: (userObj) => {
    const schema = Joi.object({
        bankId: Joi.string().trim().min(1).required(),
        bankName: Joi.string().trim().min(1).required(),
        accountNumber: Joi.number().required(),
        customerId: Joi.number().optional(),
        ifscCode: Joi.string().trim().min(1).required(),
    });
    return schema.validate(userObj);
  },
  deleteBankDetails: (userObj) => {
    const schema = Joi.object({
      bankId: Joi.string().trim().required()
    });
    return schema.validate(userObj);
  },
  getBankDetails: (userObj) => {
    const schema = Joi.object({
      UserId: Joi.string().trim().required()
    });
    return schema.validate(userObj);
  },
};
