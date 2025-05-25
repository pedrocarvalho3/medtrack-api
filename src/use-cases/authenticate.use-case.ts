import type { UsersRepository } from "@/repositories/users.repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials.error";
import bcrypt from "bcryptjs";
import type { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
  notificationToken: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
    notificationToken,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    const updatedUser = await this.usersRepository.updateNotificationToken(
      user.id,
      notificationToken
    );

    return {
      user: updatedUser,
    };
  }
}
