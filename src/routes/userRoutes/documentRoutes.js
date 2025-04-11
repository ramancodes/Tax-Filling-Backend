const { Controllers } = require('../../controllers/index');
const { auth } = require('../../middlewares/auth');
const { upload } = require('../../middlewares/multer.js');

module.exports = (router) => {
    router.post('/add-document', upload.single('file'), auth, Controllers.documentsController.addDocument);
    router.put('/update-document', auth, Controllers.documentsController.updateDocument);
    router.delete('/delete-document/:documentId', auth, Controllers.documentsController.deleteDocument);
    router.get('/get-documents/:UserId', auth, Controllers.documentsController.getDocuments);
}