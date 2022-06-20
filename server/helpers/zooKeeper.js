const zookeeper = require('node-zookeeper-client');

const zooKeeperClient = zookeeper.createClient('zookeeper');

const range = {
  start: 0,
  current: 0,
  end: 0,
};

const createZnode = async () => {
  const buffer = Buffer.from('0', 'utf8');

  zooKeeperClient.create(
    '/range',
    buffer,
    zookeeper.CreateMode.PERSISTENT,
    (error, path) => {
      if (error) {
        console.log(error.stack);
        return;
      }
      console.log('Node: %s is created.', path);
    },
  );
};

const checkIfZnodeExists = async () => {
  zooKeeperClient.exists('/range', (error, stat) => {
    if (error) {
      console.log(error.stack);
      return;
    }

    if (stat) {
      console.log('Node exists: %s', stat);
    } else {
      console.log('Node does not exist.');
      createZnode();
    }
  });
};

const setRange = async (start) => {
  const newData = Buffer.from(String(start), 'utf8');

  zooKeeperClient.setData('/range', newData, (error) => {
    if (error) {
      console.log(error.stack);
      return;
    }

    console.log('Data is set.');
  });
};

const getRangeFromZNode = async () => {
  zooKeeperClient.getData('/range', (error, data) => {
    if (error) {
      console.log(error.stack);
      return;
    }
    console.log({ data });
    console.log('Got data: %s', data.toString('utf8'));
    range.start = parseInt(data.toString(), 10) + 1000000;
    range.current = parseInt(data.toString(), 10) + 1000000;
    range.end = parseInt(data.toString(), 10) + 2000000;
    setRange(range.start);
    console.log('Range :', range);
  });
};

const connectZooKeeper = async () => {
  zooKeeperClient.once('connected', async () => {
    console.log('Connected to the zooKeeper server');
    await checkIfZnodeExists();
    await getRangeFromZNode();
  });

  zooKeeperClient.connect();
};

module.exports = { connectZooKeeper, getRangeFromZNode, range };
