import { PrismaMedicationsRepository } from "@/repositories/prisma/prisma-medications.repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { NotificationService } from "@/services/notification-service";
import { CheckLowStockUseCase } from "../check-low-stock.use-case";

export function makeCheckLowStockUseCase() {
  const medicationsRepository = new PrismaMedicationsRepository();
  const usersRepository = new PrismaUsersRepository();
  const notificationService = new NotificationService();

  const checkLowStockUseCase = new CheckLowStockUseCase(
    medicationsRepository,
    usersRepository,
    notificationService
  );

  return checkLowStockUseCase;
}
