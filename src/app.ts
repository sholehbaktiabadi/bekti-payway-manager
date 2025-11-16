import fastify from 'fastify'
import { initMysql } from './config/mysql';
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import fastifyMultipart from "@fastify/multipart";
import { env } from './config/env';
import { Rcallback } from './module/transaction/transaction.route';
import { Rroot } from './module/_root';
import { appBanner } from './helper/banner';
import { swaggerConfig } from './config/swagger';
import { initIOredis } from './config/redis';
import { TransactionsWorker } from './config/bull';
import { FastifyAdapter } from '@bull-board/fastify';
import { createBullBoard } from '@bull-board/api'
import { BullQueueMonitorConfig } from './config/bull-board';


async function bootstrap() {
    await initMysql();
    await initIOredis()
    await TransactionsWorker()
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
    app.register(Rroot, { prefix: "/" });
    app.register(swaggerUI, { routePrefix: "/docs" });
    app.register(Rcallback, { prefix: "transaction" });
    appBanner()
    app.listen({ port: env.appPort, host: '0.0.0.0' }, (err) => {
        if (err) throw err
    });
}
bootstrap()