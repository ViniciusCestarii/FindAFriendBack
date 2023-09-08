import { ResourceNotFound } from "@/services/errors/resourceNotFound";
import { makeUpdatePetService } from "@/services/factories/pets/makeUpdatePet";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const updatePetBodySchema = z.object({
    id: z.string().uuid(),
    organizationId: z.string().uuid(),
    name: z.string(),
    description: z.string().optional(),
    birthDate: z.coerce.date(),
    sex: z.enum(["MALE", "FEMALE"]),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
    specie: z.enum([
      "DOG",
      "CAT",
      "BIRD",
      "RODENT",
      "REPTILE",
      "FISH",
      "OTHER",
    ]),
    imageUrls: z.array(z.string()),
    isAdopted: z.coerce.boolean(),
  });

  const {
    id,
    birthDate,
    description,
    imageUrls,
    isAdopted,
    name,
    sex,
    size,
    specie,
  } = updatePetBodySchema.parse(request.body);

  const updatePetService = makeUpdatePetService();

  try {
    await updatePetService.execute({
      pet: {
        id,
        birthDate,
        isAdopted,
        description,
        name,
        sex,
        size,
        specie,
      },
      imageUrls,
    });

    return reply.status(200).send();
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(401).send(err.message);
    }
  }
};
