import { makeListScheduledDosesUseCase } from "@/use-cases/fatories/make-list-scheduled-doses.use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { DoseStatus } from "@prisma/client";

export async function listScheduledDoses(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const listScheduledDosesUseCase = makeListScheduledDosesUseCase();

  const listScheduledDosesQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    status: z
      .string()
      .optional()
      .transform((value) => {
        if (!value) return undefined;

        if (!value.includes(",")) {
          return [value as DoseStatus];
        }

        return value.split(",").map((s) => s.trim() as DoseStatus);
      })
      .refine(
        (value) => {
          if (!value) return true;

          const validStatuses = Object.values(DoseStatus);
          return value.every((status) => validStatuses.includes(status));
        },
        {
          message:
            "Status deve ser um dos valores válidos: PENDING, TAKEN, SNOOZED, MISSED",
        }
      ),
  });

  const { page, status } = listScheduledDosesQuerySchema.parse(request.query);

  const userId = request.user.sub;

  try {
    const { scheduledDoses } = await listScheduledDosesUseCase.execute({
      userId,
      page,
      status,
    });

    return reply.status(200).send({ scheduledDoses });
  } catch (error) {
    console.error(error);

    return reply.status(500).send({ message: "Internal server error" });
  }
}
