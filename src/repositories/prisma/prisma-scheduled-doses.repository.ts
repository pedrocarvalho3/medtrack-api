import { prisma } from "@/lib/prisma";
import type { DoseStatus, Prisma } from "@prisma/client";
import type {
  ScheduledDosesRepository,
  ScheduledDoseWithMedication,
} from "../scheduled-doses.repository";

export class PrismaScheduledDosesRepository
  implements ScheduledDosesRepository
{
  async findAll(
    userId: string,
    page: number = 1,
    status?: DoseStatus[]
  ): Promise<ScheduledDoseWithMedication[]> {
    const scheduledDoses = await prisma.scheduledDose.findMany({
      where: {
        medication: {
          user_id: userId,
        },
        ...(status &&
          status.length > 0 && {
            status: {
              in: status,
            },
          }),
      },
      include: {
        medication: {
          select: {
            name: true,
            dosage: true,
          },
        },
      },
      orderBy: {
        scheduledAt: "asc",
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return scheduledDoses;
  }

  async createMany(
    data: Prisma.ScheduledDoseCreateManyInput[]
  ): Promise<Prisma.BatchPayload> {
    const result = await prisma.scheduledDose.createMany({
      data,
      skipDuplicates: true,
    });
    return result;
  }

  async updateMissedDoses(): Promise<{ count: number }> {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    const result = await prisma.scheduledDose.updateMany({
      where: {
        status: "PENDING",
        scheduledAt: {
          lt: oneHourAgo,
        },
      },
      data: {
        status: "MISSED",
      },
    });

    return { count: result.count };
  }

  async updateStatus(scheduledDoseId: string, status: DoseStatus) {
    await prisma.scheduledDose.update({
      where: {
        id: scheduledDoseId,
      },
      data: {
        status,
      },
    });
  }
}
