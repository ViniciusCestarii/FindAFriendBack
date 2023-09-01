import { FastifyInstance } from "fastify";
import { create } from "./create";
import { searchMany } from "./searchMany";

export const petsRoutes = async (app: FastifyInstance) => {

  app.post('/pets', create)
  app.post('/pets/searchMany', searchMany)
}