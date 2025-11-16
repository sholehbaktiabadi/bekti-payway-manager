import { createClient } from "redis";
import { env } from "./env";

export var initRedis = createClient({
    url: `redis://${env.redisHost}:${env.redisPort}`
})