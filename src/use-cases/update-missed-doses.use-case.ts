import type { ScheduledDosesRepository } from "@/repositories/scheduled-doses.repository";

export interface UpdateMissedDosesUseCaseRequest {
  time: Date;
}

export interface UpdateMissedDosesUseCaseResponse {
  updatedCount: number;
}

export class UpdateMissedDosesUseCase {
  constructor(private scheduledDosesRepository: ScheduledDosesRepository) {}

  async execute(): Promise<UpdateMissedDosesUseCaseResponse> {
    try {
      const result = await this.scheduledDosesRepository.updateMissedDoses();

      return {
        updatedCount: result.count,
      };
    } catch (error) {
      console.error("❌ Erro to update doses:", error);
      throw error;
    }
  }
}
