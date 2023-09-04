import { FastifyInstance } from "fastify";
import { create } from "./create";
import { searchMany } from "./searchMany";
import { update } from "./update";

export const petsRoutes = async (app: FastifyInstance) => {

  app.post('/pets', create)
  app.post('/pets/search', searchMany)
  app.put('/pet/:id', update)
}