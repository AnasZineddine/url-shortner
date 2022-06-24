const prisma = require('../prisma/prismaClient');

const getUrl = async (req, res) => {
  try {
    const { hash } = req.query;
    const result = await prisma.link.findFirst({
      where: {
        shortUrl: hash,
      },
    });
    if (result) {
      res.redirect(result.url);
    } else {
      res.status(404).send('Url not found');
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getUrl };
