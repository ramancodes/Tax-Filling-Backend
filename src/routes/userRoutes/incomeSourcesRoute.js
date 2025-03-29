const { Controllers } = require('../../controllers/index');
const { auth } = require('../../middlewares/auth');

module.exports = (router) => {
    router.post('/add-incomeSource', auth, Controllers.incomeSourcesController.addIncomeSource);
    router.put('/update-incomeSource', auth, Controllers.incomeSourcesController.updateIncomeSource);
    router.delete('/delete-incomeSource/:incomeSourceId', auth, Controllers.incomeSourcesController.deleteIncomeSource);
    router.get('/get-incomeSource/:UserId', auth, Controllers.incomeSourcesController.getIncomeSources);
}