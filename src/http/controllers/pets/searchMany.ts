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
      .enum(["DOG", "CAT", "BIRD", "RODENT", "REPTILE", "OTHER"])
      .optional(),
    fase: z.enum(["BABY", "YOUNG", "ADULT", "SENIOR"]).optional(),
    isAdopted: z.coerce.boolean().optional().optional(),
    page: z.coerce.number(),
  });

  const { name, fase, sex, size, specie, isAdopted, page } =
    searchManyPetBodySchema.parse(request.body);

  const searchManyGymService = makeSearchManyPetsService();

  const { pets } = await searchManyGymService.execute({
    searchData: {
      name,
      fase,
      sex,
      size,
      specie,
      isAdopted,
    },
    page,
  });

  return reply.status(200).send({
    pets,
  });
};
