import type { DoseStatus, Prisma, ScheduledDose } from "@prisma/client";

export type ScheduledDoseWithMedication = ScheduledDose & {
  medication: {
    name: string;
    dosage: string;
  };
};

export interface ScheduledDosesRepository {
  findAll(
    userId: string,
    page: number,
    status: DoseStatus[] | undefined,
    startDate?: Date,
    endDate?: Date
  ): Promise<ScheduledDoseWithMedication[]>;
  createMany(
    data: Prisma.ScheduledDoseCreateManyInput[]
  ): Promise<Prisma.BatchPayload>;
  updateMissedDoses(): Promise<{ count: number }>;
  updateStatus(scheduledDoseId: string, status: DoseStatus): Promise<void>;
}
