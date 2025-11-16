import { IncomingCreditCallback } from "../../dto/callback";
import { BullQueueTransactionPayload } from "../../dto/bull";
import { BullQueue } from "../bull/bull.queue";

export class CallbackService {
    private bullQueue: BullQueue
    constructor(bullQueue: BullQueue){
        this.bullQueue = bullQueue
    }
    async IncomingCredit(p: IncomingCreditCallback){
        const queuePayload = new BullQueueTransactionPayload()
        queuePayload.orderID = p.message
        this.bullQueue.AddTransactionJob(queuePayload)
        return "ok"
    }
}