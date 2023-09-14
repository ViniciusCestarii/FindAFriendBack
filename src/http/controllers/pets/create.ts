import { ResourceNotFound } from "@/services/errors/resourceNotFound";
import { makeCreatePetService } from "@/services/factories/pets/makeCreatePet";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    birthDate: z.coerce.date(),
    organizationId: z.string().uuid(),
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
    imageUrls: z.array(z.string()).optional(),
    isAdopted: z.coerce.boolean().optional(),
    energyLevel: z.coerce.number(),
  });

  const {
    name,
    description,
    birthDate,
    organizationId,
    sex,
    size,
    specie,
    imageUrls,
    isAdopted,
    energyLevel,
  } = createPetBodySchema.parse(request.body);

  const createPetService = makeCreatePetService();

  try {
    await createPetService.execute({
      pet: {
        name,
        description,
        birthDate,
        organizationId,
        sex,
        size,
        specie,
        isAdopted,
        energyLevel,
      },
      imageUrls,
    });

    return reply.status(201).send();
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(404).send(err.message);
    }
  }
};
