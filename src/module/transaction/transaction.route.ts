import { FastifyInstance } from "fastify";
import { IncomingCreditCallback } from "../../dto/callback";
import { response } from "../../helper/response";
import { validation } from "../../helper/validation";
import { Req, Res } from "../../types/fastify";
import { CallbackService } from "./transaction.service";
import { incomingCreditSchema } from "./transaction.schema";
import { BullQueue } from "../bull/bull.queue";

class Controller {
    private static callbackService = new CallbackService(
        new BullQueue()
    )

    static async IncomingCredit(req: Req, res: Res) {
        const p = new IncomingCreditCallback();
        const dataValue = Object.assign(p, req.body);
        const { valid, msg } = await validation(dataValue);
        if (!valid) response(res, msg, 400);
        const data = await this.callbackService.IncomingCredit(p)
        response(res, data)
    }
}

export function TransactionRoutes(route: FastifyInstance) {
    route.post("/callback", { schema: incomingCreditSchema.creditIn }, (req, res) =>
        Controller.IncomingCredit(req, res)
    )
}