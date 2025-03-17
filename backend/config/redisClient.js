import { createClient } from "redis";

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: process.env.REDIS_PORT || 6379,
    },
});

redisClient.on("error", (err) => {
    console.error("❌ Redis connection error:", err);
});

redisClient
    .connect()
    .then(() => console.log("✅ Connected to Redis"))
    .catch((err) => console.error("❌ Redis connection failed:", err));

export default redisClient;

