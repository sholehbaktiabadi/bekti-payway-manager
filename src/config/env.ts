import { configDotenv } from "dotenv";
configDotenv();

export const env = {
    appPort: +process.env.APP_PORT,
    appEnv: process.env.APP_ENV,

    mysqlDatabase: process.env.MYSQL_DATABASE,
    mysqlHost: process.env.MYSQL_HOST,
    mysqlPort: +process.env.MYSQL_PORT,
    mysqlUser: process.env.MYSQL_USER,
    mysqlPass: process.env.MYSQL_PASS,

    redisHost: process.env.REDIS_HOST,
    redisPort: +process.env.REDIS_PORT,
};