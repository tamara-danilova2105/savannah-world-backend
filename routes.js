const express = require('express');
const { getCats, saveCat, deleteCat, updatedCat } = require('./controller');

const router = express.Router();

router.get('/', getCats);
router.post('/', saveCat);
router.delete('/:id', deleteCat);
router.put('/:id', updatedCat);

module.exports = router; 