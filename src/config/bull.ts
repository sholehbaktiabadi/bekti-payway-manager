import { Worker } from "bullmq";
import { MQRedis } from "./redis";
import { QueueNameTransaction } from "../contant/bull";

export async function TransactionsWorker() {
    const worker = new Worker(
    QueueNameTransaction,
    async (job) => {
        console.log("Processing job:", job.id, job.name);
        console.log("Payload:", job.data);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return { status: "Transaction processed successfully" };
    },
    { connection: MQRedis }
);

    worker.on("completed", (job) => {
        console.log(`Job ${job.id} completed`);
    });
    
    worker.on("failed", (job, err) => {
        console.error(`Job ${job?.id} failed`, err);
    });
}
