const { Controllers } = require('../controllers/index');
const { auth } = require('../middlewares/auth')

module.exports = (router) => {
    router.get('/api-check', (req, res)=>{
        res.send('API is working fine');
    });
    router.post('/register', Controllers.userController.register);
    router.post('/login', Controllers.userController.login);
    router.post('/update-user', auth, Controllers.userController.updateUser);
    router.post('/reset-password', auth, Controllers.userController.resetPassword);
    router.post('/forgot-password', Controllers.userController.forgotPassword);
    router.get('/get-username', Controllers.userController.getUsername);
}