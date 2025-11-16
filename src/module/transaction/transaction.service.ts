import { CreditInCallback } from "../../dto/callback";
import { RedisTransactionKey } from "../../helper/redis";
import { CacheService } from "../cache/cache.service";

export class CallbackService {
    private cacheService: CacheService
    constructor(cacheService: CacheService){
        this.cacheService = cacheService
    }
    async CreditIn(p: CreditInCallback){
        console.log(p.message)
        const { key, ttl } = RedisTransactionKey(p.message)
        this.cacheService.set(key,ttl)
        return "ok"
    }
}