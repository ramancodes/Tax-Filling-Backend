const { generate } = require('../../common/helper');
const { Models } = require('../../models/index')
const { Validation } = require('../../validations/index')

module.exports = {
    getSummary: async (req, res)=>{
        try {
            const users = await Models.user.findAll({
                include: [
                    {
                        model: Models.userProfile,
                    },
                    {
                        model: Models.bankDetails,
                    },
                    {
                        model: Models.documentModel,
                    },
                    {
                        model: Models.incomeSources,
                    },
                    {
                        model: Models.incomeTaxModel,
                    },
                ],
            });

            if (!users) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            const profileData = users.userProfile?.dataValues;

            console.log('profileData', profileData);
            

        //{
        //     taxFilingStats: [
        //     { name: 'Filed Taxes', value: 5 },
        //     { name: 'Not Filed', value: 2 }
        //     ],
        //     ageGroupStats: [
        //     { name: 'Below 60 years', value: 4 },
        //     { name: '60-80 years', value: 2 },
        //     { name: 'Above 80 years', value: 1 }
        //     ],
        //     profileCompletionStats: [
        //     { name: 'Complete Profile', value: 6 },
        //     { name: 'Incomplete Profile', value: 1 }
        //     ],
        //     financialInfoStats: [
        //     { name: 'Added Income Details', value: 10 },
        //     { name: 'Added Bank Accounts', value: 8 },
        //     { name: 'Missing Financial Info', value: 2 }
        //     ]
        // }
            
            
            

            res.status(200).json({
                message: 'Details fetched successfully!',
                users
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
}