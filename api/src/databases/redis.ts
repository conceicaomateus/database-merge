import redis from "redis";

const client = redis.createClient();

export const Redis = {
  async connect() {
    console.log("Connecting to Redis");
    client.connect();
    console.log("Connected to Redis");
  },

  async set(key: string, value: string) {
    client.set(key, value);
  },

  async hasKey(key: string) {
    const result = await client.exists(key);
    return result === 1;
  },

  async delete(key: string) {
    await client.del(key);
  },

  async deleteAll() {
    await client.flushAll();
  },
};
