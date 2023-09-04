import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { petsRoutes } from "./http/controllers/pets/routes";
import { organizationsRoutes } from "./http/controllers/organizations/routes";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "20m",
  },
});
app.register(fastifyCookie);

app.register(petsRoutes);
app.register(organizationsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO log error to external service
  }

  return reply.status(500).send({ message: "Internal server error" });
});
