const express = require('express');
const { getCats, saveCat, deleteCat, updatedCat, uploadFile } = require('./controller');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (_, _, cb) {
        cb(null, 'uploads');
    },
    filename: function (_, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

router.get('/cats', getCats);
router.post('/cats', saveCat);
router.delete('/cats/:id', deleteCat);
router.put('/cats/:id', updatedCat);

router.post('/upload', upload.single('image'), uploadFile);

module.exports = router; 