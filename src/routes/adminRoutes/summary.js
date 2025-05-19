const { Controllers } = require('../../controllers/index');
const { auth } = require('../../middlewares/auth')

module.exports = (router) => {
    router.get('/admin/summary', auth, Controllers.summary.getSummary);
}