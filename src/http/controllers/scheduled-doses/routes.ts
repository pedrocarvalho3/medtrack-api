import { verifyJWT } from "@/http/middlewares/verify-jwt";
import type { FastifyInstance } from "fastify";
import { listScheduledDoses } from "./list-scheduled-doses";
import { updateStatus } from "./update-status";

export async function scheduledDosesRoutes(app: FastifyInstance) {
  app.get("/scheduled-doses", { onRequest: [verifyJWT] }, listScheduledDoses);
  app.patch(
    "/scheduled-doses/:scheduledDoseId/update-status",
    { onRequest: [verifyJWT] },
    updateStatus
  );
}
