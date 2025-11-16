import fastify from 'fastify'
import { initMysql } from './config/mysql';
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import fastifyMultipart from "@fastify/multipart";
import { env } from './config/env';
import { TransactionRoutes } from './module/transaction/transaction.route';
import { rootRoutes } from './module/_root';
import { appBanner } from './helper/banner';
import { swaggerConfig } from './config/swagger';
import { initIOredis } from './config/redis';
import { FastifyAdapter } from '@bull-board/fastify';
import { createBullBoard } from '@bull-board/api'
import { BullQueueMonitorConfig } from './config/bull-board';
import { BullWorker } from './module/bull/bull.worker';


async function bootstrap() {
    await initMysql();
    await initIOredis()
    const worker = new BullWorker()
    worker.TransactionsWorker()
    const app = fastify();
    const bullServerAdapter = new FastifyAdapter()
    createBullBoard({
        queues: BullQueueMonitorConfig.queueList,
        serverAdapter: bullServerAdapter
    })
    bullServerAdapter.setBasePath(BullQueueMonitorConfig.path)
    const bullBoardPlugin = bullServerAdapter.registerPlugin()
    app.register(bullBoardPlugin, { prefix: BullQueueMonitorConfig.path })
    app.register(fastifyMultipart);
    app.register(swagger, { ...swaggerConfig });
    app.register(swaggerUI, { routePrefix: "/docs" });
    app.register(rootRoutes, { prefix: "/" });
    app.register(TransactionRoutes, { prefix: "transaction" });
    appBanner()
    app.listen({ port: env.appPort, host: '0.0.0.0' }, (err) => {
        if (err) throw err
    });
}
bootstrap()