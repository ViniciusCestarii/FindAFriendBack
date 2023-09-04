import { ResourceNotFound } from "@/services/errors/resourceNotFound";
import { makeFetchPetService } from "@/services/factories/pets/makeFetchPet";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const fetch = async (request: FastifyRequest, reply: FastifyReply) => {
  const fetchPetParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = fetchPetParamsSchema.parse(request.params);

  const fetchPetService = makeFetchPetService();

  try {
    const { pet } = await fetchPetService.execute(id);

    return reply.status(200).send(pet);
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(401).send(err.message);
    }
  }
};
