import { PrismaMedicationsRepository } from "@/repositories/prisma/prisma-medications.repository";
import { CreateMedicationUseCase } from "../create-medication.use-case";

export function makeCreateMedicationsUseCase() {
  const medicationsRepository = new PrismaMedicationsRepository();

  const useCase = new CreateMedicationUseCase(medicationsRepository);

  return useCase;
}
