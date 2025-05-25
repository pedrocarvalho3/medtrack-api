import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { env } from "./env";
import { usersRoutes } from "./http/controllers/users/routes";
import { medicationsRoutes } from "./http/controllers/medications/routes";
import { scheduledDosesRoutes } from "./http/controllers/scheduled-doses/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(usersRoutes);

app.register(medicationsRoutes);

app.register(scheduledDosesRoutes);
