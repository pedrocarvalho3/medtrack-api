import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(userId: string): Promise<User | null>;
  updateNotificationToken(userId: string, token: string): Promise<User>;
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>;
}
