import { verifyJWT } from "@/http/middlewares/verify-jwt";
import type { FastifyInstance } from "fastify";
import { listScheduledDoses } from "./list-scheduled-doses";

export async function scheduledDosesRoutes(app: FastifyInstance) {
  app.get("/scheduled-doses", { onRequest: [verifyJWT] }, listScheduledDoses);
}
