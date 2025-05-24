import { PrismaMedicationsRepository } from "@/repositories/prisma/prisma-medications.repository";
import { ListMedicationsUseCase } from "../list-medications.use-case";

export function makeListMedicationsUseCase() {
  const medicationsRepository = new PrismaMedicationsRepository();

  const useCase = new ListMedicationsUseCase(medicationsRepository);

  return useCase;
}
