const { generate } = require('../../common/helper');
const { Models } = require('../../models/index')
const { Validation } = require('../../validations/index')

module.exports = {
    getSummary: async (req, res)=>{
        try {
            

            

            res.status(200).json({
                message: 'Bank Details fetched successfully!',
                bankDetails
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
}