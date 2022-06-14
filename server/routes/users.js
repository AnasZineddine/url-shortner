const express = require('express');

const router = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
/* GET users listing. */
router.get('/', async (req, res) => {
  await prisma.$connect();
  const result = await prisma.link.create({
    data: {
      url: 'test',
      shortUrl: 'test',
    },
  });
  console.log({ result });
  res.json(result);
});

module.exports = router;
