import { Queue } from "bullmq";
import IORedis from "ioredis";
import { BullQueueTransactionPayload } from "../../dto/bull";
import { MQRedis } from "../../config/redis";
import { QueueNameTransaction } from "../../contant/bull";

export class BullQueue {
    async AddTransactionJob(payload: BullQueueTransactionPayload) {
        const queueTransactionName = QueueNameTransaction
        const myQueue = new Queue(queueTransactionName, { connection: MQRedis });
        const job = await myQueue.add(payload.orderID, payload);
        console.log("Job added:", job.id, payload.orderID );
    }
}