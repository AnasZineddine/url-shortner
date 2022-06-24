const express = require('express');

const { postUrl } = require('../controllers/postUrl');
const { getUrls } = require('../controllers/getUrls');
const { getUrl } = require('../controllers/getUrl');

const Validator = require('../middlewares/validator');
const queryValidator = require('../middlewares/queryValidator');

const router = express.Router();

router.post('/url', Validator('url'), postUrl);
router.get('/url', queryValidator('getUrl'), getUrl);
router.get('/urls', queryValidator('urls'), getUrls);

module.exports = router;
