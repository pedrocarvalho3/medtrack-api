import type { MedicationsRepository } from "@/repositories/medications.repository";
import type { Medication } from "@prisma/client";

interface ListMedicationsUseCaseRequest {
  userId: string;
  page?: number;
}

interface ListMedicationsUseCaseResponse {
  medications: Medication[];
}

export class ListMedicationsUseCase {
  constructor(private medicationsRepository: MedicationsRepository) {}

  async execute({
    userId,
    page = 1,
  }: ListMedicationsUseCaseRequest): Promise<ListMedicationsUseCaseResponse> {
    const medications = await this.medicationsRepository.findAll(userId, page);

    return { medications };
  }
}
