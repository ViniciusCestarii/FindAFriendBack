import { FastifyInstance } from "fastify";
import { update } from "./update";
import { fetch } from "./fetch";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJWT } from "@/http/middlewares/vefifyJwt";
import { refresh } from "./refresh";

export const organizationsRoutes = async (app: FastifyInstance) => {
  app.get("/organization/:id", fetch);

  app.post("/sessions", authenticate);
  app.post("/organizations", register);

  app.patch("/token/refresh", refresh);

  /* Authenticated Routes */
  app.get("/me", { onRequest: [verifyJWT] }, profile);

  app.put("/organization", { onRequest: [verifyJWT] }, update);
};
