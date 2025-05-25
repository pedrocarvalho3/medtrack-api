import { PrismaMedicationsRepository } from "@/repositories/prisma/prisma-medications.repository";
import { PrismaScheduledDosesRepository } from "@/repositories/prisma/prisma-scheduled-doses.repository";
import { CreateMedicationUseCase } from "../create-medication.use-case";
import { GenerateScheduledDosesUseCase } from "../generate-scheduled-doses.use-case";

export function makeCreateMedicationsUseCase() {
  const medicationsRepository = new PrismaMedicationsRepository();
  const scheduledDosesRepository = new PrismaScheduledDosesRepository();

  const generateScheduledDosesUseCase = new GenerateScheduledDosesUseCase(
    scheduledDosesRepository
  );

  const useCase = new CreateMedicationUseCase(
    medicationsRepository,
    generateScheduledDosesUseCase
  );

  return useCase;
}
