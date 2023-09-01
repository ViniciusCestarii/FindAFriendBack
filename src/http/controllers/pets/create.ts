import { ResourceNotFound } from "@/services/errors/resourceNotFound"
import { makeCreatePetService } from "@/services/factories/makeCreatePet"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    birthDate: z.coerce.date(),
    organizationId: z.string().uuid(),
    sex: z.enum(["MALE", "FEMALE"]),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
    specie: z.enum(["DOG", "CAT", "BIRD", "RODENT", "REPTILE", "OTHER"]),
    imageUrls: z.array(z.string()).optional(),
    isAdopted: z.coerce.boolean().optional()
  })

  const { name, description, birthDate, organizationId, sex, size, specie, imageUrls, isAdopted } = createPetBodySchema.parse(request.body)

    const createPetService = makeCreatePetService()

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
      isAdopted
      },
      imageUrls
    })

    return reply.status(201).send()

  } catch (err) {
    if(err instanceof ResourceNotFound) {
      return reply.status(401).send(err.message)
    }
}
}
