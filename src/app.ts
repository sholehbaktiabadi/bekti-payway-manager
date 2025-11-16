import fastify from 'fastify'
import { initMysql } from './config/mysql';
import { initRedis } from './config/redis';
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import fastifyMultipart from "@fastify/multipart";
import { env } from './config/env';
import { Rcallback } from './module/transaction/transaction.route';
import { Rroot } from './module/_root';
import { appBanner } from './helper/banner';
import { swaggerConfig } from './config/swagger';


async function bootstrap() {
    await initRedis.connect()
    await initMysql();
    const app = fastify();
    app.register(fastifyMultipart);
    app.register(swagger, { ...swaggerConfig });
    app.register(Rroot, { prefix: "/" });
    app.register(swaggerUI, { routePrefix: "/docs" });
    app.register(Rcallback, { prefix: "transaction/" });
    appBanner()
    app.listen({ port: env.appPort, host: '0.0.0.0' }, (err) => {
        if (err) throw err
    });
}
bootstrap()