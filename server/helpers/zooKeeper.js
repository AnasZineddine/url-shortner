const zookeeper = require('node-zookeeper-client');

const zooKeeperClient = zookeeper.createClient('zookeeper');

const connectZooKeeper = async () => {
  zooKeeperClient.once('connected', async () => {
    console.log('Connected to the ZK server.');
  });

  zooKeeperClient.connect();
};

module.exports = { connectZooKeeper };
