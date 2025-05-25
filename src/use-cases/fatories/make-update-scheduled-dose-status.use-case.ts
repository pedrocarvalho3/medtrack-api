import { PrismaScheduledDosesRepository } from "@/repositories/prisma/prisma-scheduled-doses.repository";
import { UpdateScheduledDoseStatusUseCase } from "../update-scheduled-dose-status.use-case";

export function makeUpdateScheduledDoseStatusUseCase() {
  const scheduledDosesRepository = new PrismaScheduledDosesRepository();
  const updateScheduledDoseStatusUseCase = new UpdateScheduledDoseStatusUseCase(
    scheduledDosesRepository
  );

  return updateScheduledDoseStatusUseCase;
}
