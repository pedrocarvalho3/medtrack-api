import { makeListScheduledDosesUseCase } from "@/use-cases/fatories/make-list-scheduled-doses.use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { DoseStatus } from "@prisma/client";

export async function listScheduledDoses(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const listScheduledDosesUseCase = makeListScheduledDosesUseCase();

  const listScheduledDosesQuerySchema = z
    .object({
      page: z.coerce.number().min(1).default(1),
      startDate: z
        .string()
        .optional()
        .transform((value) => {
          if (!value) return undefined;
          const date = new Date(value);
          if (isNaN(date.getTime())) {
            throw new Error("Invalid start date format");
          }
          return date;
        }),
      endDate: z
        .string()
        .optional()
        .transform((value) => {
          if (!value) return undefined;
          const date = new Date(value);
          if (isNaN(date.getTime())) {
            throw new Error("Invalid end date format");
          }
          return date;
        }),
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
    })
    .refine(
      (data) => {
        if (data.startDate && data.endDate) {
          return data.startDate <= data.endDate;
        }
        return true;
      },
      {
        message: "Start date must be before or equal to end date",
        path: ["startDate"],
      }
    );

  try {
    const { page, status, startDate, endDate } =
      listScheduledDosesQuerySchema.parse(request.query);

    const userId = request.user.sub;

    const { scheduledDoses } = await listScheduledDosesUseCase.execute({
      userId,
      page,
      status,
      startDate,
      endDate,
    });

    return reply.status(200).send({ scheduledDoses });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: "Invalid query parameters",
        errors: error.errors,
      });
    }

    return reply.status(500).send({ message: "Internal server error" });
  }
}
