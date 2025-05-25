import type { Medication } from "@prisma/client";
import type { MedicationsRepository } from "@/repositories/medications.repository";

export interface AddStockToMedicationUseCaseRequest {
  medicationId: string;
  userId: string;
  quantity: number;
}

export interface AddStockToMedicationUseCaseResponse {
  medication: Medication;
}

export class AddStockToMedicationUseCase {
  constructor(private medicationsRepository: MedicationsRepository) {}

  async execute({
    medicationId,
    userId,
    quantity,
  }: AddStockToMedicationUseCaseRequest): Promise<AddStockToMedicationUseCaseResponse> {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }

    const existingMedication = await this.medicationsRepository.findById(
      medicationId
    );

    if (!existingMedication) {
      throw new Error("Medication not found");
    }

    if (existingMedication.user_id !== userId) {
      throw new Error("Unauthorized access to medication");
    }

    const medication = await this.medicationsRepository.addStock(
      medicationId,
      quantity
    );

    return { medication };
  }
}
