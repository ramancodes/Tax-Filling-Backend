const Joi = require("joi");

module.exports = {
  addIncomeTax: (userObj) => {
    const schema = Joi.object({
        assessmentYear: Joi.string().trim().min(1).required(),
        filingType: Joi.string().trim().min(1).required(),
        itrType: Joi.string().trim().min(1).required(),
        UserId: Joi.string().trim().required(),
    });
    return schema.validate(userObj);
  },
  updateIncomeTax: (userObj) => {
    const schema = Joi.object({
        incomeTaxId: Joi.string().trim().min(1).required(),
        filingType: Joi.string().trim().min(1).required(),
        itrType: Joi.string().trim().min(1).required(),
    });
    return schema.validate(userObj);
  },
  deleteIncomeTax: (userObj) => {
    const schema = Joi.object({
        incomeTaxId: Joi.string().trim().required()
    });
    return schema.validate(userObj);
  },
  getIncomeTaxs: (userObj) => {
    const schema = Joi.object({
      UserId: Joi.string().trim().required()
    });
    return schema.validate(userObj);
  },
  paymentRazorpay: (userObj) => {
    const schema = Joi.object({
      incomeTaxId: Joi.string().trim().required(),
      type: Joi.string().trim().required(),
    });
    return schema.validate(userObj);
  }
};
