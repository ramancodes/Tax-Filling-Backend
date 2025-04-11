const Joi = require("joi");

module.exports = {
  addDocument: (userObj) => {
    const schema = Joi.object({
        documentType: Joi.string().trim().min(1).required(),
        fileName: Joi.string().trim().min(1).required(),
        UserId: Joi.string().trim().required(),
    });
    return schema.validate(userObj);
  },
  updateDocument: (userObj) => {
    const schema = Joi.object({
        documentId: Joi.string().trim().min(1).required(),
        documentType: Joi.string().trim().min(1).optional(),
    });
    return schema.validate(userObj);
  },
  deleteDocument: (userObj) => {
    const schema = Joi.object({
        documentId: Joi.string().trim().required()
    });
    return schema.validate(userObj);
  },
  getDocuments: (userObj) => {
    const schema = Joi.object({
      UserId: Joi.string().trim().required()
    });
    return schema.validate(userObj);
  },
};
