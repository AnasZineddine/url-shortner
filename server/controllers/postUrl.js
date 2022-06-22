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
    console.log('current - 1', range.current - 1);
    console.log('hash', shortUrlGenerator(range.current - 1));

    await redisClient.connect();
    const cachedUrl = await redisClient.get(req.body.url);
    if (cachedUrl) {
      console.log('CASHED');
      await redisClient.disconnect();
      res.json({ shortUrl: cachedUrl });
    } else {
      const findUrl = await prisma.link.findFirst({
        where: {
          url: req.body.url,
        },
      });
      if (findUrl) {
        await redisClient.set(findUrl.url, findUrl.shortUrl);
        await redisClient.disconnect();
        res.json({ shortUrl: findUrl.shortUrl });
      } else {
        const shortnedUrl = await prisma.link.create({
          data: {
            url: req.body.url,
            shortUrl: shortUrlGenerator(range.current - 1),
          },
        });
        await redisClient.set(shortnedUrl.url, shortnedUrl.shortUrl);
        await redisClient.disconnect();
        res.json({ shortUrl: shortnedUrl.shortUrl });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { postUrl };
