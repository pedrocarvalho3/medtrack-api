import type { Medication } from "@prisma/client";
import type { ScheduledDosesRepository } from "@/repositories/scheduled-doses.repository";
import type { Prisma } from "@prisma/client";

const GENERATE_DAYS_AHEAD = 7;

export interface GenerateScheduledDosesUseCaseRequest {
  medication: Medication;
}

export interface GenerateScheduledDosesUseCaseResponse {
  count: number;
}

export class GenerateScheduledDosesUseCase {
  constructor(private scheduledDosesRepository: ScheduledDosesRepository) {}

  async execute({
    medication,
  }: GenerateScheduledDosesUseCaseRequest): Promise<GenerateScheduledDosesUseCaseResponse> {
    const doses: Prisma.ScheduledDoseCreateManyInput[] = [];
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + GENERATE_DAYS_AHEAD);

    const periodicityNumber = parseInt(medication.periodicity);
    const isInterval = medication.periodicityType === "INTERVAL";

    if (isInterval) {
      const intervalHours = periodicityNumber;
      const currentDate = new Date(startDate);

      while (currentDate <= endDate && currentDate <= medication.validity) {
        if (currentDate >= startDate) {
          doses.push({
            medication_id: medication.id,
            scheduledAt: new Date(
              new Date(currentDate).setHours(
                new Date(currentDate).getHours() - 3
              )
            ),
          });
        }
        currentDate.setHours(currentDate.getHours() + intervalHours);
      }
    } else if (medication.periodicity.includes(":")) {
      const times = medication.periodicity.split(",");
      const currentDate = new Date(startDate);

      while (currentDate <= endDate && currentDate <= medication.validity) {
        times.forEach((time) => {
          const [hour, minute] = time.trim().split(":").map(Number);
          if (!isNaN(hour) && !isNaN(minute)) {
            const doseDate = new Date(currentDate);
            doseDate.setHours(hour, minute, 0, 0);

            if (
              doseDate >= startDate &&
              doseDate <= endDate &&
              doseDate <= medication.validity
            ) {
              doses.push({
                medication_id: medication.id,
                scheduledAt: doseDate,
              });
            }
          }
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else {
      console.warn(
        `Periodicidade inválida ou não suportada para o medicamento ${medication.id}: ${medication.periodicity}`
      );
    }

    let count = 0;
    if (doses.length > 0) {
      const result = await this.scheduledDosesRepository.createMany(doses);
      count = result.count;
    }

    return { count };
  }
}
