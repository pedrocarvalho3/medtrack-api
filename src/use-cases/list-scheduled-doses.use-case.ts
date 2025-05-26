import type { ScheduledDosesRepository } from "@/repositories/scheduled-doses.repository";
import type { DoseStatus, ScheduledDose } from "@prisma/client";

interface ListScheduledDosesUseCaseRequest {
  userId: string;
  page?: number;
  status?: DoseStatus[];
  startDate?: Date;
  endDate?: Date;
}

interface ListScheduledDosesUseCaseResponse {
  scheduledDoses: ScheduledDose[];
}

export class ListScheduledDosesUseCase {
  constructor(private scheduledDosesRepository: ScheduledDosesRepository) {}

  async execute({
    userId,
    page = 1,
    status,
    startDate,
    endDate,
  }: ListScheduledDosesUseCaseRequest): Promise<ListScheduledDosesUseCaseResponse> {
    const scheduledDoses = await this.scheduledDosesRepository.findAll(
      userId,
      page,
      status,
      startDate,
      endDate
    );

    return { scheduledDoses };
  }
}
