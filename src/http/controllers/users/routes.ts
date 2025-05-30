import type { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/users/auth", authenticate);

  app.patch("/token/refresh", refresh);
}
