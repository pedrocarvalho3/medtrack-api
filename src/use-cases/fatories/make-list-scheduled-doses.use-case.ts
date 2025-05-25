import { PrismaScheduledDosesRepository } from "@/repositories/prisma/prisma-scheduled-doses.repository";
import { ListScheduledDosesUseCase } from "../list-scheduled-doses.use-case";

export function makeListScheduledDosesUseCase() {
  const scheduledDosesRepository = new PrismaScheduledDosesRepository();
  const listScheduledDosesUseCase = new ListScheduledDosesUseCase(
    scheduledDosesRepository
  );

  return listScheduledDosesUseCase;
}
