import { Queue } from "bullmq";
import { QueueNameTransaction } from "../contant/bull";
import { MQRedis } from "./redis";
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'

const queueTransaction = new Queue(QueueNameTransaction, { connection: MQRedis })
export const BullQueueMonitorConfig = ({
    queueList : [new BullMQAdapter(queueTransaction)],
    path: '/admin/queues'
})