const prisma = require('../prisma/prismaClient');

const getUrls = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);
    const skipIndex = (page - 1) * limit;

    const results = await prisma.link.findMany({
      skip: skipIndex,
      take: limit,
      select: {
        createdAt: true,
        url: true,
        shortUrl: true,
      },
    });
    const linksCollectionCount = await prisma.link.count();

    const totalPages = Math.ceil(linksCollectionCount / limit);

    // const currentPage = Math.ceil(linksCollectionCount % skipIndex);
    if (results) {
      res.json({
        data: results,
        paging: {
          total: linksCollectionCount,
          // page: currentPage,
          pages: totalPages,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getUrls };
