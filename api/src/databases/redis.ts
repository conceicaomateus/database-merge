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

  async deleteAll() {
    await client.flushAll();
  },

  async getAll<T>() {
    let data: Array<T> = [];

    const keys = await client.keys("*");

    for (const key of keys) {
      const value = await client.get(key);
      if (!value) continue;

      data.push(JSON.parse(value));
    }

    return data;
  },
};
