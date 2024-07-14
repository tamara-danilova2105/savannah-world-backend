const express = require('express');
const { getCats, saveCat } = require('./controller');

const router = express.Router();

router.get('/', getCats);
router.post('/', saveCat);

module.exports = router; 