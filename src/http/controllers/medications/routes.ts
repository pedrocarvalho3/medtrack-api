import { verifyJWT } from "@/http/middlewares/verify-jwt";
import type { FastifyInstance } from "fastify";
import { create } from "./create";
import { listMedications } from "./list-medications";
import { addStock } from "./add-stock";

export async function medicationsRoutes(app: FastifyInstance) {
  app.post("/medications", { onRequest: [verifyJWT] }, create);
  app.get("/medications", { onRequest: [verifyJWT] }, listMedications);
  app.patch(
    "/medications/:medicationId/add-stock",
    { onRequest: [verifyJWT] },
    addStock
  );
}
