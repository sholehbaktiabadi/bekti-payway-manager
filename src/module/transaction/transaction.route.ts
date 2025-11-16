import { FastifyInstance } from "fastify";
import { CreditInCallback } from "../../dto/callback";
import { response } from "../../helper/response";
import { validation } from "../../helper/validation";
import { Req, Res } from "../types/fastify";
import { CallbackService } from "./transaction.service";
import { creditInSchema } from "./transaction.schema";
import { CacheService } from "../cache/cache.service";
import { initRedis } from "../../config/redis";
import { RedisClientType } from "redis";

class Controller {
    private static callbackService = new CallbackService(
        new CacheService(initRedis as RedisClientType)
    )

    static async CreditIn(req: Req, res: Res) {
        const p = new CreditInCallback();
        const dataValue = Object.assign(p, req.body);
        const { valid, msg } = await validation(dataValue);
        if (!valid) response(res, msg, 400);
        const data = await this.callbackService.CreditIn(p)
        response(res, data)
    }
}

export function Rcallback(route: FastifyInstance) {
    route.post("/callback", { schema: creditInSchema.creditIn }, (req, res) =>
        Controller.CreditIn(req, res)
    )
}