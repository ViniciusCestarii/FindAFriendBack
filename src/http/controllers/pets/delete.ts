import { ResourceNotFound } from "@/services/errors/resourceNotFound";
import { makeDeletePetService } from "@/services/factories/pets/makeDeletePet";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const deletePet = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const updatePetParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = updatePetParamsSchema.parse(request.params);

  const deletePetService = makeDeletePetService();

  try {
    await deletePetService.execute(id);

    return reply.status(200).send();
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(404).send(err.message);
    }
  }
};
