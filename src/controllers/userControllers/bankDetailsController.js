const { generate } = require('../../common/helper');
const { Models } = require('../../models/index')
const { Validation } = require('../../validations/index')

module.exports = {
    addBankDetails: async (req, res)=>{
        try {
            const { error, value } = Validation.bankDetailsValidator.addBankDetails(req.body);
            
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const newBankDetails = await Models.bankDetails.create({
                ...value,
                id: generate()
            });

            res.status(201).json({
                message: 'Bank Details added successfully!',
                bankDetails: newBankDetails
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    updateBankDetails: async (req, res)=>{
        try {
            const { error, value } = Validation.bankDetailsValidator.updateBankDetails(req.body);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const bankDetails = await Models.bankDetails.findOne({where: {
                id: value.bankId
            }});

            if(!bankDetails){
                return res.status(404).json({
                    message: `No bank details found with bank name: ${value.bankName}`
                });
            }

            delete value.UserId;
            delete value.bankId;

            await Models.bankDetails.update(
                {...value},
                {
                    where: {
                        id: bankDetails.id
                    }
                }
            );

            res.status(200).json({
                message: 'Bank Details updated successfully!'
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    getBankDetails: async (req, res)=>{
        try {
            const { error, value } = Validation.bankDetailsValidator.getBankDetails(req.params);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const bankDetails = await Models.bankDetails.findAndCountAll({
                where: {
                    UserId: value.UserId
                }
            });

            if(!bankDetails){
                return res.status(404).json({
                    message: 'No Bank Details found! Add Your Bank Details'
                });
            }

            res.status(200).json({
                message: 'Bank Details fetched successfully!',
                bankDetails
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    deleteBankDetails: async (req, res)=>{
        try {
            const { error, value } = Validation.bankDetailsValidator.deleteBankDetails(req.params);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            await Models.bankDetails.destroy({
                where: {
                    id: value.bankId
                }
            });

            res.status(200).json({
                message: 'Bank Details deleted successfully!'
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}