import { ResourceNotFound } from "@/services/errors/resourceNotFound"
import { makeUpdatePetService } from "@/services/factories/makeUpdatePet"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const update = async (request: FastifyRequest, reply: FastifyReply) => {

  const updatePetParamsSchema = z.object({
    id: z.string().uuid()
  })

  const updatePetBodySchema = z.object({
    organizationId: z.string().uuid(),
    name: z.string(),
    description: z.string(),
    birthDate: z.coerce.date(),
    sex: z.enum(["MALE", "FEMALE"]),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
    specie: z.enum(["DOG", "CAT", "BIRD", "RODENT", "REPTILE", "OTHER"]),
    imageUrls: z.array(z.string()),
    isAdopted: z.coerce.boolean()
  })

  const { birthDate, description, imageUrls, isAdopted, name, organizationId, sex, size, specie } = updatePetBodySchema.parse(request.body)
  const { id } = updatePetParamsSchema.parse(request.params)

  const updatePetService = makeUpdatePetService()

  try {
    await updatePetService.execute({
      pet: {
        id,
        birthDate,
        isAdopted,
        description,
        name,
        organizationId,
        sex,
        size,
        specie,
      },
      imageUrls
    })

    return reply.status(200).send()

  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(401).send(err.message)
    }
  }
}
