const express = require('express');

const { postUrl } = require('../controllers/postUrl');

const router = express.Router();

router.post('/url', postUrl);

module.exports = router;
