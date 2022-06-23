const express = require('express');

const { postUrl } = require('../controllers/postUrl');
const { getUrls } = require('../controllers/getUrls');

const Validator = require('../middlewares/validator');
const queryValidator = require('../middlewares/queryValidator');

const router = express.Router();

router.post('/url', Validator('url'), postUrl);
router.get('/urls', queryValidator('urls'), getUrls);

module.exports = router;
