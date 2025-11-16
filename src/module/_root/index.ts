import { FastifyInstance } from "fastify";
import { response } from "../../helper/response";
import { Res } from "../../types/fastify";

export function rootRoutes(route: FastifyInstance) {
  route.get("", (_, res: Res) =>
    response(res, "healthy"),
  );
  route.get("/health", (_, res: Res) =>
    response(res, "ok"),
  );
}