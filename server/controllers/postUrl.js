const redisClient = require('../helpers/redis');

const prisma = require('../prisma/prismaClient');

const { range, getRangeFromZNode } = require('../helpers/zooKeeper');

const shortUrlGenerator = require('../helpers/shortUrlGenerator');

const postUrl = async (req, res) => {
  try {
    if (range.current < range.end - 1 && range.current !== 0) {
      range.current += 1;
    } else {
      await getRangeFromZNode();
      range.current += 1;
    }
    await redisClient.connect();
    const cachedUrl = await redisClient.get(req.body.url);
    if (cachedUrl) {
      res.json({ shortUrl: cachedUrl });
      await redisClient.disconnect();
    } else {
      const findUrl = await prisma.link.findFirst({
        where: {
          url: req.body.url,
        },
      });
      if (findUrl) {
        await redisClient.set(findUrl.url, findUrl.shortUrl);
        res.json({ shortUrl: findUrl.shortUrl });
        await redisClient.disconnect();
      } else {
        const shortnedUrl = await prisma.link.create({
          data: {
            url: req.body.url,
            shortUrl: shortUrlGenerator(range.current - 1),
          },
        });
        await redisClient.set(shortnedUrl.url, shortnedUrl.shortUrl);
        res.json({ shortUrl: shortnedUrl.shortUrl });
        await redisClient.disconnect();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { postUrl };
