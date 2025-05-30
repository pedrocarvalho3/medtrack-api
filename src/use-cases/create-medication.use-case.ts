import type { $Enums, Medication } from "@prisma/client";
import type { MedicationsRepository } from "@/repositories/medications.repository";
import type { GenerateScheduledDosesUseCase } from "./generate-scheduled-doses.use-case";

export interface CreateMedicationUseCaseRequest {
  userId: string;
  name: string;
  dosage: string;
  periodicityType: $Enums.PeriodicityType;
  periodicity: string;
  validity: Date;
  quantityAvailable: number;
}

export interface CreateMedicationUseCaseResponse {
  medication: Medication;
}

export class CreateMedicationUseCase {
  constructor(
    private medicationsRepository: MedicationsRepository,
    private generateScheduledDosesUseCase: GenerateScheduledDosesUseCase
  ) {}

  async execute({
    userId,
    name,
    dosage,
    periodicityType,
    periodicity,
    validity,
    quantityAvailable,
  }: CreateMedicationUseCaseRequest): Promise<CreateMedicationUseCaseResponse> {
    const medication = await this.medicationsRepository.create({
      user_id: userId,
      name,
      dosage,
      periodicityType,
      periodicity,
      validity,
      quantityAvailable,
    });

    await this.generateScheduledDosesUseCase.execute({ medication });

    return { medication };
  }
}
