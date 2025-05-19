const { Controllers } = require('../../controllers/index');
const { auth } = require('../../middlewares/auth')

module.exports = (router) => {
    router.get('/admin/get-allUsers', auth, Controllers.allUsers.getAllUsers);
    router.get('/admin/get-user/:userId', auth, Controllers.allUsers.getOne);
    router.put('/admin/edit-user/:userId', auth, Controllers.allUsers.editUser);
    router.delete('/admin/delete-user/:userId', auth, Controllers.allUsers.deleteUser);
    router.post('/admin/add-user', auth, Controllers.allUsers.addUser);
}