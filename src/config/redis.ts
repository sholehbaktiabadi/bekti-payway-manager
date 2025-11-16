import IORedis from "ioredis";

export var MQRedis: IORedis

export async function initIOredis() {
    const redis = new IORedis({ 
        maxRetriesPerRequest: null
    });
    MQRedis = redis
}