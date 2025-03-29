const { Controllers } = require('../../controllers/index');
const { auth } = require('../../middlewares/auth');

module.exports = (router) => {
    router.post('/create-profile', auth, Controllers.userProfileController.createProfile);
    router.post('/update-profile', auth, Controllers.userProfileController.updateProfile);
    router.get('/get-profile/:UserId', auth, Controllers.userProfileController.getProfile);
}