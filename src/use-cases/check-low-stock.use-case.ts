import type { MedicationsRepository } from "@/repositories/medications.repository";
import type { UsersRepository } from "@/repositories/users.repository";
import { NotificationService } from "@/services/notification-service";

export interface LowStockMedication {
  id: string;
  name: string;
  quantityAvailable: number;
  user_id: string;
  userNotificationToken?: string;
}

export class CheckLowStockUseCase {
  constructor(
    private medicationsRepository: MedicationsRepository,
    private usersRepository: UsersRepository,
    private notificationService: NotificationService
  ) {}

  async execute(): Promise<void> {
    try {
      const lowStockMedications = await this.medicationsRepository.findLowStock(
        5
      );

      console.log(
        `Found ${lowStockMedications.length} medications with low stock`
      );

      for (const medication of lowStockMedications) {
        const user = await this.usersRepository.findById(medication.user_id);

        if (user?.notificationToken) {
          await this.notificationService.sendLowStockNotification(
            user.notificationToken,
            medication.name,
            medication.quantityAvailable
          );

          console.log(
            `Low stock notification sent for medication: ${medication.name}`
          );
        } else {
          console.log(
            `No notification token for user ${medication.user_id}. Skipping notification for medication: ${medication.name}`
          );
        }
      }
    } catch (error) {
      console.error("Error in CheckLowStockUseCase:", error);
    }
  }
}
