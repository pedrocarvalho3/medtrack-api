import { prisma } from "@/lib/prisma";
import type { Prisma, Medication } from "@prisma/client";
import type { MedicationsRepository } from "../medications.repository";

export class PrismaMedicationsRepository implements MedicationsRepository {
  async findAll(userId: string, page: number = 1): Promise<Medication[]> {
    const medications = await prisma.medication.findMany({
      where: {
        user_id: userId,
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return medications;
  }

  async create(
    data: Prisma.MedicationUncheckedCreateInput
  ): Promise<Medication> {
    const medication = await prisma.medication.create({
      data,
    });
    return medication;
  }
}
