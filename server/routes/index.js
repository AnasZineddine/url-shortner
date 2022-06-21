const express = require('express');

const { postUrl } = require('../controllers/postUrl');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/url', postUrl);

module.exports = router;
