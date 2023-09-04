import { FastifyInstance } from "fastify";
import { update } from "./update";

export const organizationsRoutes = async (app: FastifyInstance) => {
  // app.post('/organizations', create)
  app.put("/organization/:id", update);
};
