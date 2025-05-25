import { makeAddStockToMedicationUseCase } from "@/use-cases/fatories/make-add-stock-to-medication.use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function addStock(request: FastifyRequest, reply: FastifyReply) {
  const addStockParamsSchema = z.object({
    medicationId: z.string().uuid(),
  });

  const addStockBodySchema = z.object({
    quantity: z.number().positive(),
  });

  const { medicationId } = addStockParamsSchema.parse(request.params);
  const { quantity } = addStockBodySchema.parse(request.body);

  try {
    const addStockUseCase = makeAddStockToMedicationUseCase();
    const userId = request.user.sub;

    const { medication } = await addStockUseCase.execute({
      medicationId,
      userId,
      quantity,
    });

    return reply.status(200).send({
      medication,
    });
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      switch (err.message) {
        case "Medication not found":
          return reply.status(404).send({ message: "Medication not found" });
        case "Unauthorized access to medication":
          return reply.status(403).send({ message: "Forbidden" });
        case "Quantity must be greater than zero":
          return reply.status(400).send({ message: "Invalid quantity" });
        default:
          return reply.status(500).send({ message: "Internal server error" });
      }
    }

    return reply.status(500).send({ message: "Internal server error" });
  }
}
