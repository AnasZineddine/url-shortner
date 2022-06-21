const redisClient = require('../helpers/redis');

const prisma = require('../prisma/prismaClient');

const { range, getRangeFromZNode } = require('../helpers/zooKeeper');

const postUrl = async (req, res) => {
  if (range.current < range.end - 1 && range.current !== 0) {
    range.current += 1;
  } else {
    await getRangeFromZNode();
    range.current += 1;
  }
  console.log('current', range.current);

  await redisClient.connect();
  await redisClient.set('key', 'Testmethis');
  const value = await redisClient.get('key');
  console.log({ value });

  const result = await prisma.link.create({
    data: {
      url: 'test',
      shortUrl: 'test',
    },
  });
  console.log({ result });
  res.json(result);
};

module.exports = { postUrl };
