import { makeUpdateScheduledDoseStatusUseCase } from "@/use-cases/fatories/make-update-scheduled-dose-status.use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function updateStatus(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateStatusParamsSchema = z.object({
    scheduledDoseId: z.string().uuid(),
  });

  const updateStatusBodySchema = z.object({
    status: z.enum(["PENDING", "TAKEN", "MISSED", "SKIPPED"]),
  });

  const { scheduledDoseId } = updateStatusParamsSchema.parse(request.params);
  const { status } = updateStatusBodySchema.parse(request.body);

  try {
    const updateStatusUseCase = makeUpdateScheduledDoseStatusUseCase();
    const userId = request.user.sub;

    const { scheduledDose } = await updateStatusUseCase.execute({
      scheduledDoseId,
      userId,
      status,
    });

    return reply.status(200).send({
      scheduledDose,
    });
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      switch (err.message) {
        case "Scheduled dose not found":
          return reply
            .status(404)
            .send({ message: "Scheduled dose not found" });
        case "Unauthorized access to scheduled dose":
          return reply.status(403).send({ message: "Forbidden" });
        default:
          return reply.status(500).send({ message: "Internal server error" });
      }
    }

    return reply.status(500).send({ message: "Internal server error" });
  }
}
