const express = require('express');

const { postUrl } = require('../controllers/postUrl');

const Validator = require('../middlewares/validator');

const router = express.Router();

router.post('/url', Validator('url'), postUrl);

module.exports = router;
