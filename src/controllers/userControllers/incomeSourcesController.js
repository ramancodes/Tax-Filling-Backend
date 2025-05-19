const { generate } = require('../../common/helper');
const { Models } = require('../../models/index')
const { Validation } = require('../../validations/index')

module.exports = {
    addIncomeSource: async (req, res)=>{
        try {
            const { error, value } = Validation.incomeSourcesValidator.addIncomeSource(req.body);
            
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const newIncomeSource = await Models.incomeSources.create({
                ...value,
                userId: value.UserId,
                id: generate()
            });

            res.status(201).json({
                message: 'Income Source added successfully!',
                incomeSource: newIncomeSource
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    updateIncomeSource: async (req, res)=>{
        try {
            const { error, value } = Validation.incomeSourcesValidator.updateIncomeSource(req.body);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const incomeSource = await Models.incomeSources.findOne({where: {
                id: value.incomeSourceId
            }});

            if(!incomeSource){
                return res.status(404).json({
                    message: `No income source found with: ${value.source}`
                });
            }

            delete value.UserId;
            delete value.incomeSourceId;

            await Models.incomeSources.update(
                {...value},
                {
                    where: {
                        id: incomeSource.id
                    }
                }
            );

            res.status(200).json({
                message: 'Income Source updated successfully!'
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    getIncomeSources: async (req, res)=>{
        try {
            const { error, value } = Validation.incomeSourcesValidator.getIncomeSources(req.params);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const incomeSources = await Models.incomeSources.findAndCountAll({
                where: {
                    userId: value.UserId
                },
                order: [['createdAt', 'DESC']]
            });

            if(!incomeSources){
                return res.status(404).json({
                    message: 'No data found! Add Your income sources'
                });
            }

            res.status(200).json({
                message: 'Income Sources fetched successfully!',
                incomeSources
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    deleteIncomeSource: async (req, res)=>{
        try {
            const { error, value } = Validation.incomeSourcesValidator.deleteIncomeSource(req.params);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            await Models.incomeSources.destroy({
                where: {
                    id: value.incomeSourceId
                }
            });

            res.status(200).json({
                message: 'Income Source deleted successfully!'
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}