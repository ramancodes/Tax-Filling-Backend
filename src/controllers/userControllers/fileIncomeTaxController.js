const { generate, handleS3Upload, calculateAge } = require('../../common/helper');
const { Models } = require('../../models/index');
const { Validation } = require('../../validations/index');

module.exports = {
    addIncomeTax: async (req, res)=>{
        try {
            if (!req?.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const { error, value } = Validation.incomeTaxValidator.addIncomeTax(req.body);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const incomeSources = await Models.incomeSources.findAndCountAll({
                where: {
                    UserId: value.UserId
                },
                order: [['createdAt', 'DESC']]
            });

            if(!incomeSources){
                return res.status(404).json({
                    message: 'No data found! Add Your income sources'
                });
            }

            const incomeDetails = incomeSources.rows.map((income) => ({
                incomeType: income.source,
                incomeAmount: income.amountPerAnnum,
            }));

            const totalIncome = incomeDetails.reduce((acc, current) => acc + Number(current.incomeAmount), 0);
              
            const userDetails = await Models.userProfile.findOne({
                where: {
                    UserId: value.UserId
                }
            });

            if(!userDetails){
                return res.status(404).json({
                    message: 'No profile found! Update Your profile'
                });
            }

            const age = calculateAge(userDetails.dob);

            let taxAmount;
            if(age<60){
                if(totalIncome <= 250000){
                    taxAmount = 0;
                } else if (totalIncome <= 500000) {
                    taxAmount = totalIncome * 0.05;
                } else if (totalIncome <= 1000000) {
                    taxAmount = totalIncome * 0.2;
                } else {
                    taxAmount = totalIncome * 0.3;
                }
            } else if(age<80){
                if(totalIncome <= 300000){
                    taxAmount = 0;
                } else if (totalIncome <= 500000) {
                    taxAmount = totalIncome * 0.05;
                } else if (totalIncome <= 1000000) {
                    taxAmount = totalIncome * 0.2;
                } else {
                    taxAmount = totalIncome * 0.3;
                }
            } else if (age>80) {
                if (totalIncome <= 500000) {
                    taxAmount = 0;
                } else if (totalIncome <= 1000000) {
                    taxAmount = totalIncome * 0.2;
                } else {
                    taxAmount = totalIncome * 0.3;
                }
            } else {
                return res.status(400).json({ status: 400, message: "You cannot File Tax" });
            }

            incomeDetails.push({totalIncome: totalIncome});

            const prefix = Date.now() + '_incomeTax';
            const fileUrl = await handleS3Upload(req.file, prefix);
            if(fileUrl.status === 400){
                return res.status(400).json({ status: 400, message: fileUrl.message });
            }
            
            const newincomeTax = await Models.incomeTaxModel.create({
                ...value,
                id: generate(),
                file: fileUrl.data,
                taxAmount: taxAmount,
                incomeDetails: incomeDetails
            });

            res.status(201).json({
                message: 'Income Tax added successfully!',
                incomeTax: newincomeTax
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    updateIncomeTax: async (req, res)=>{
        try {
            const { error, value } = Validation.incomeTaxValidator.updateIncomeTax(req.body);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const incomeTax = await Models.incomeTaxModel.findOne({where: {
                id: value.incomeTaxId
            }});

            if(!incomeTax){
                return res.status(404).json({
                    message: `No income tax found with type ${value.filingType}`
                });
            }

            delete value.incomeTaxId;

            await Models.incomeTaxModel.update(
                {...value},
                {
                    where: {
                        id: incomeTax.id
                    }
                }
            );

            res.status(200).json({
                message: 'Income Tax updated successfully!'
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    getincomeTaxs: async (req, res)=>{
        try {
            const { error, value } = Validation.incomeTaxValidator.getIncomeTaxs(req.params);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const incomeTaxs = await Models.incomeTaxModel.findAndCountAll({
                where: {
                    UserId: value.UserId
                },
                order: [['createdAt', 'DESC']]
            });

            if(!incomeTaxs){
                return res.status(404).json({
                    message: 'No incomeTaxs found!'
                });
            }

            res.status(200).json({
                message: 'Income Taxs fetched successfully!',
                incomeTaxs
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    deleteincomeTax: async (req, res)=>{
        try {
            const { error, value } = Validation.incomeTaxValidator.deleteIncomeTax(req.params);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            await Models.incomeTaxModel.destroy({
                where: {
                    id: value.incomeTaxId
                }
            });

            res.status(200).json({
                message: 'Income Tax deleted successfully!'
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}