import { makeSearchManyPetsService } from "@/services/factories/pets/makeSearchManyPets";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const searchMany = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const searchManyPetBodySchema = z.object({
    name: z.string().optional(),
    organizationId: z.string().uuid().optional(),
    sex: z.enum(["MALE", "FEMALE"]).optional(),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
    specie: z
      .enum(["DOG", "CAT", "BIRD", "RODENT", "REPTILE", "FISH", "OTHER"])
      .optional(),
    fase: z.enum(["BABY", "YOUNG", "ADULT", "SENIOR"]).optional(),
    isAdopted: z.coerce.boolean().optional(),
    page: z.coerce.number(),
    city: z.string().optional(),
    state: z.string().optional(),
    energyLevel: z.coerce.number().optional(),
  });

  const {
    name,
    fase,
    sex,
    size,
    specie,
    isAdopted,
    city,
    organizationId,
    state,
    page,
    energyLevel,
  } = searchManyPetBodySchema.parse(request.body);

  const searchManyGymService = makeSearchManyPetsService();

  const { pets, count } = await searchManyGymService.execute({
    petSearchData: {
      name,
      fase,
      sex,
      size,
      specie,
      isAdopted,
      energyLevel,
    },
    organizationSearchData: {
      organizationId,
      city,
      state,
    },
    page,
  });

  return reply.status(200).send({
    pets,
    count,
  });
};
