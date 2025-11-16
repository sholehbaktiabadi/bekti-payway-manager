import { Worker } from "bullmq";
import { MQRedis } from "../../config/redis";
import { QueueNameTransaction } from "../../contant/bull";

export class BullWorker {
    async TransactionsWorker() {
        const worker = new Worker(
            QueueNameTransaction,
            async (job) => {
                console.log("PROCESSING:QUEUE transactionID:", job.name);
                await new Promise((resolve) => setTimeout(resolve, 2000));
            },
            { connection: MQRedis }
        );

        worker.on("completed", (job) => {
            console.log("FINISHED:QUEUE transactionID:", job.name);
        });

        worker.on("failed", (job, err) => {
            console.error("FAILED:QUEUE queue transactionID:", job.name);
        });
    }
}
