import { IRedisKeyTTL } from "../interface/redis";

export const RedisTransactionKey =(bo: string): IRedisKeyTTL => ({
    key: `TRANSACTION:${bo}`,
    ttl: 1000
})