import type { Medication, Prisma } from "@prisma/client";

export interface MedicationsRepository {
  findAll(userId: string, page: number): Promise<Medication[]>;
  findById(id: string): Promise<Medication | null>;
  addStock(id: string, quantity: number): Promise<Medication>;
  findLowStock(threshold: number): Promise<Medication[]>;
  create(data: Prisma.MedicationUncheckedCreateInput): Promise<Medication>;
}
