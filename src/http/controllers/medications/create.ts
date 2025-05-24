import { makeCreateMedicationsUseCase } from "@/use-cases/fatories/make-create-medications.use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    dosage: z.string(),
    periodicityType: z.enum(["INTERVAL", "FIXED_TIMES"]),
    periodicity: z.string(),
    validity: z.coerce.date(),
    quantityAvailable: z.number(),
  });

  const {
    name,
    dosage,
    periodicityType,
    periodicity,
    validity,
    quantityAvailable,
  } = createBodySchema.parse(request.body);

  try {
    const createUseCase = makeCreateMedicationsUseCase();

    const userId = request.user.sub;

    await createUseCase.execute({
      name,
      dosage,
      periodicityType,
      periodicity,
      validity,
      quantityAvailable,
      userId,
    });

    return reply.status(201).send();
  } catch (err) {
    console.error(err);
    return reply.status(500).send({ message: "Internal server error." });
  }
}
