import type { ScheduledDose } from "@prisma/client";
import type { ScheduledDosesRepository } from "@/repositories/scheduled-doses.repository";

export interface UpdateScheduledDoseStatusUseCaseRequest {
  scheduledDoseId: string;
  userId: string;
  status: "PENDING" | "TAKEN" | "MISSED" | "SKIPPED";
}

export interface UpdateScheduledDoseStatusUseCaseResponse {
  scheduledDose: ScheduledDose;
}

export class UpdateScheduledDoseStatusUseCase {
  constructor(private scheduledDosesRepository: ScheduledDosesRepository) {}

  async execute({
    scheduledDoseId,
    userId,
    status,
  }: UpdateScheduledDoseStatusUseCaseRequest): Promise<UpdateScheduledDoseStatusUseCaseResponse> {
    const existingScheduledDose = await this.scheduledDosesRepository.findById(
      scheduledDoseId
    );

    if (!existingScheduledDose) {
      throw new Error("Scheduled dose not found");
    }

    if (existingScheduledDose.medication.user_id !== userId) {
      throw new Error("Unauthorized access to scheduled dose");
    }

    const scheduledDose = await this.scheduledDosesRepository.updateStatus(
      scheduledDoseId,
      status
    );

    return { scheduledDose };
  }
}
