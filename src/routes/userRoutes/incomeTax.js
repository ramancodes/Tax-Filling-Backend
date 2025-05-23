const { Controllers } = require('../../controllers/index');
const { auth } = require('../../middlewares/auth');
const { upload } = require('../../middlewares/multer.js');

module.exports = (router) => {
    router.post('/add-incomeTax', upload.single('file'), auth, Controllers.fileIncomeTaxController.addIncomeTax);
    router.post('/payment-razorpay', auth, Controllers.fileIncomeTaxController.paymentRazorpay);
    router.post('/verify-payment', auth, Controllers.fileIncomeTaxController.verifyRazorpay);
    router.put('/update-incomeTax', auth, Controllers.fileIncomeTaxController.updateIncomeTax);
    router.delete('/delete-incomeTax/:incomeTaxId', auth, Controllers.fileIncomeTaxController.deleteincomeTax);
    router.get('/get-incomeTaxs/:UserId', auth, Controllers.fileIncomeTaxController.getincomeTaxs);
}