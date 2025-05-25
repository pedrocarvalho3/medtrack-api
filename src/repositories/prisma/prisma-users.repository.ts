import type { Prisma, User } from "@prisma/client";
import type { UsersRepository } from "../users.repository";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async updateNotificationToken(userId: string, token: string): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        notificationToken: token,
      },
    });

    return user;
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
