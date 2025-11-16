import { FastifyDynamicSwaggerOptions } from "@fastify/swagger";

export const swaggerConfig: FastifyDynamicSwaggerOptions = {
  swagger: {
    info: {
      title: "Payway Manager Documentation",
      version: "1.0.0",
    },
    consumes: ["application/json"],
    produces: ["application/json"],
    schemes: ["http", "https"]
  },
};