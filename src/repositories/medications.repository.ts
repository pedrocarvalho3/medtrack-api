import type { Medication, Prisma } from "@prisma/client";

export interface MedicationsRepository {
  findAll(userId: string, page: number): Promise<Medication[]>;
  create(data: Prisma.MedicationUncheckedCreateInput): Promise<Medication>;
}
