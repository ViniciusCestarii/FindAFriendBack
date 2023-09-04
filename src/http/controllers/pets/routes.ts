import { FastifyInstance } from "fastify";
import { create } from "./create";
import { searchMany } from "./searchMany";
import { update } from "./update";
import { fetch } from "./fetch";
import { verifyJWT } from "@/http/middlewares/vefifyJwt";
import { deletePet } from "./delete";

export const petsRoutes = async (app: FastifyInstance) => {
  app.get("/pet/:id", fetch);

  app.post("/pets/search", searchMany);

  /* Authenticated Routes */

  app.put("/pet/:id", { onRequest: [verifyJWT] }, update);
  app.post("/pets", { onRequest: [verifyJWT] }, create);

  app.delete("/pet/:id", { onRequest: [verifyJWT] }, deletePet);
};
