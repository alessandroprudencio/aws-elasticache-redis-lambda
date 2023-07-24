const Redis = require("ioredis");

const redisHost = "clustercfg.test-vpc-memory-db.xshhff.memorydb.us-east-1.amazonaws.com";
// const redisHost = "test-vpc-redis-cluster.xshhff.clustercfg.use1.cache.amazonaws.com";
const redisPort = 6379;

const redisClient = new Redis.Cluster(
  [
    {
      port: redisPort,
      host: redisHost,
    },
  ],
  {
    dnsLookup: (address, callback) => callback(null, address),
    redisOptions: {
      tls: {},
    },
  }
);

const userId = getRandomInteger(1, 100);

exports.handler = async (event) => {
  const latencyCreate = await createData();
  const data = await getData(latencyCreate);

  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      ...data,
      redisHost
    },
  };

  return response;
};

async function getData(latencyCreate) {
  try {
    console.log("Start getting data");

    const start = new Date();
    const data = JSON.parse(await redisClient.get(`user:${userId}`));
    const end = new Date();

    console.log("Data retrieved:", data);

    return {
      latencyRead: `${end - start}ms`,
      latencyCreate: `${latencyCreate}ms`,
      data,
    };
  } catch (error) {
    console.error("Error accessing data:", error);
    return {
      error,
      message: error.message,
    };
  }
}

async function createData() {
  try {
    const start = new Date();
    await redisClient.set(
      `user:${userId}`,
      JSON.stringify({ id: userId, name: `Username-${userId}` })
    );
    const end = new Date();

    return end - start;
  } catch (error) {
    console.error("Error saving data:", error);
    throw error;
  }
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
