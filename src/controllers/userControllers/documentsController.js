const { generate, handleS3Upload } = require('../../common/helper');
const { Models } = require('../../models/index');
const { Validation } = require('../../validations/index');

module.exports = {
    addDocument: async (req, res)=>{
        try {
            if (!req?.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const { error, value } = Validation.documentsValidator.addDocument(req.body);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const prefix = Date.now() + '_document';
            const fileUrl = await handleS3Upload(req.file, prefix);
            if(fileUrl.status === 400){
                return res.status(400).json({ status: 400, message: fileUrl.message });
            }
            
            const newDocument = await Models.documentModel.create({
                ...value,
                userId: value.UserId,
                id: generate(),
                file: fileUrl.data
            });

            res.status(201).json({
                message: 'Document added successfully!',
                document: newDocument
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    updateDocument: async (req, res)=>{
        try {
            const { error, value } = Validation.documentsValidator.updateDocument(req.body);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const document = await Models.documentModel.findOne({where: {
                id: value.documentId
            }});

            if(!document){
                return res.status(404).json({
                    message: `No document found with type ${value.documentType}`
                });
            }

            delete value.documentId;

            await Models.documentModel.update(
                {...value},
                {
                    where: {
                        id: document.id
                    }
                }
            );

            res.status(200).json({
                message: 'Document updated successfully!'
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    getDocuments: async (req, res)=>{
        try {
            const { error, value } = Validation.documentsValidator.getDocuments(req.params);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const documents = await Models.documentModel.findAndCountAll({
                where: {
                    userId: value.UserId
                },
                order: [['createdAt', 'DESC']]
            });

            if(!documents){
                return res.status(404).json({
                    message: 'No documents found! Add Your documents'
                });
            }

            res.status(200).json({
                message: 'Documents fetched successfully!',
                documents
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    deleteDocument: async (req, res)=>{
        try {
            const { error, value } = Validation.documentsValidator.deleteDocument(req.params);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            await Models.documentModel.destroy({
                where: {
                    id: value.documentId
                }
            });

            res.status(200).json({
                message: 'Document deleted successfully!'
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}