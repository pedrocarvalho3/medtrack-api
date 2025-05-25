import { PrismaMedicationsRepository } from "@/repositories/prisma/prisma-medications.repository";
import { AddStockToMedicationUseCase } from "../add-stock-to-medication.use-case";

export function makeAddStockToMedicationUseCase() {
  const medicationsRepository = new PrismaMedicationsRepository();
  const addStockToMedicationUseCase = new AddStockToMedicationUseCase(
    medicationsRepository
  );

  return addStockToMedicationUseCase;
}
