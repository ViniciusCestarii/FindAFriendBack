import { ResourceNotFound } from "@/services/errors/resourceNotFound"
import { makeUpdateOrganizationService } from "@/services/factories/makeUpdateOrganization"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const update = async (request: FastifyRequest, reply: FastifyReply) => {

  const updateOrganizationParamsSchema = z.object({
    id: z.string().uuid()
  })

  const updateOrganizationBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    imageUrls: z.array(z.string()).optional(),
    cep: z.string().regex(/^\d{5}-\d{3}$/),
    city: z.string(),
    state: z.string(),
    street: z.string(),
    email: z.string().email(),
    phone: z.string(),
  })

  const { description, imageUrls, name,cep, city, email, phone, state, street } = updateOrganizationBodySchema.parse(request.body)
  const { id } = updateOrganizationParamsSchema.parse(request.params)

  const updateOrganizationService = makeUpdateOrganizationService()

  try {
    await updateOrganizationService.execute({
      organization: {
        id,
        description,
        name,
        cep,
        city,
        state,
        street,
        email,
        phone
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
