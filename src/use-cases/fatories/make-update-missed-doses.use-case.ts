import { PrismaScheduledDosesRepository } from "@/repositories/prisma/prisma-scheduled-doses.repository";
import { UpdateMissedDosesUseCase } from "../update-missed-doses.use-case";

export function makeUpdateMissedDosesUseCase() {
  const scheduledDosesRepository = new PrismaScheduledDosesRepository();
  const updateMissedDosesUseCase = new UpdateMissedDosesUseCase(
    scheduledDosesRepository
  );

  return updateMissedDosesUseCase;
}
