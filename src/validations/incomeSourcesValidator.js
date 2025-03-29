const Joi = require("joi");

module.exports = {
  addIncomeSource: (userObj) => {
    const schema = Joi.object({
      incomeType: Joi.string().trim().min(1).required(),
      source: Joi.string().trim().required(),
      amountPerAnnum: Joi.number().required(),
      UserId: Joi.string().trim().required(),
    });
    return schema.validate(userObj);
  },
  updateIncomeSource: (userObj) => {
    const schema = Joi.object({
      incomeSourceId: Joi.string().trim().optional(),
      incomeType: Joi.string().trim().min(1).optional(),
      source: Joi.string().trim().optional(),
      amountPerAnnum: Joi.number().optional(),
    });
    return schema.validate(userObj);
  },
  deleteIncomeSource: (userObj) => {
    const schema = Joi.object({
      incomeSourceId: Joi.string().trim().required(),
    });
    return schema.validate(userObj);
  },
  getIncomeSources: (userObj) => {
    const schema = Joi.object({
      UserId: Joi.string().trim().required(),
    });
    return schema.validate(userObj);
  },
};
