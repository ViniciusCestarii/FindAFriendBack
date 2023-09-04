import { FastifyInstance } from "fastify";
import { create } from "./create";
import { searchMany } from "./searchMany";
import { update } from "./update";
import { fetch } from "./fetch";

export const petsRoutes = async (app: FastifyInstance) => {
  app.get("/pet/:id", fetch);

  app.post("/pets", create);
  app.post("/pets/search", searchMany);

  app.put("/pet/:id", update);
};
