import { FastifyInstance } from "fastify";
import { update } from "./update";
import { fetch } from "./fetch";
import { register } from "./register";
import { authenticate } from "./authenticate";

export const organizationsRoutes = async (app: FastifyInstance) => {
  app.get("/organization/:id", fetch);

  app.post("/sessions", authenticate);
  app.post("/organizations", register);

  app.put("/organization/:id", update);
};
