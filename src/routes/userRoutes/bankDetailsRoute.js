const { Controllers } = require('../../controllers/index');
const { auth } = require('../../middlewares/auth');

module.exports = (router) => {
    router.post('/add-bankdetails', auth, Controllers.bankDetailsController.addBankDetails);
    router.put('/update-bankdetails', auth, Controllers.bankDetailsController.updateBankDetails);
    router.delete('/delete-bankdetails/:bankId', auth, Controllers.bankDetailsController.deleteBankDetails);
    router.get('/get-bankdetails/:UserId', auth, Controllers.bankDetailsController.getBankDetails);
}