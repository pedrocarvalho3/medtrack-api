import { makeListMedicationsUseCase } from "@/use-cases/fatories/make-list-medications.use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listMedications(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const listMedicationsUseCase = makeListMedicationsUseCase();

  const listMedicationsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = listMedicationsQuerySchema.parse(request.query);

  const userId = request.user.sub;

  try {
    const { medications } = await listMedicationsUseCase.execute({
      userId,
      page,
    });

    return reply.status(200).send({ medications });
  } catch (error) {
    console.error(error);

    return reply.status(500).send({ message: "Internal server error" });
  }
}
