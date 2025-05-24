import { verifyJWT } from "@/http/middlewares/verify-jwt";
import type { FastifyInstance } from "fastify";
import { create } from "./create";
import { listMedications } from "./list-medications";

export async function medicationsRoutes(app: FastifyInstance) {
  app.post("/medications", { onRequest: [verifyJWT] }, create);
  app.get("/medications", { onRequest: [verifyJWT] }, listMedications);
}
