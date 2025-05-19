const { Models } = require('../../models/index');

module.exports = {
    getAllTaxes: async (req, res)=>{
        try {
            const taxes = await Models.incomeTaxModel.findAndCountAll({
                include: [
                    {
                    model: Models.user
                    }
                ]
            });
            if (!taxes) {
                return res.status(404).json({ message: 'No taxes found' });
            }

            res.status(200).json({
              message: "Taxes fetched successfully!",
              taxes,
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
}