const express = require('express');
const router = express.Router();
const controller = require('../controllers/api/apiController');

router.get('/bancosTasas', controller.index);

module.exports = router;