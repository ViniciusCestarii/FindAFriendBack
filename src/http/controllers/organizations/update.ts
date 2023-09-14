import { ResourceNotFound } from "@/services/errors/resourceNotFound";
import { makeUpdateOrganizationService } from "@/services/factories/organizations/makeUpdateOrganization";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const updateOrganizationBodySchema = z.object({
    id: z.string().uuid(),
    name: z.string().optional(),
    description: z.string().nullable().optional(),
    imageUrls: z.array(z.string()).optional(),
    cep: z
      .string()
      .regex(/^\d{5}-\d{3}$/)
      .optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    street: z.string().optional(),
    phone: z.string().optional(),
  });

  const { id, description, imageUrls, name, cep, city, phone, state, street } =
    updateOrganizationBodySchema.parse(request.body);
  const updateOrganizationService = makeUpdateOrganizationService();

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
        phone,
      },
      imageUrls,
    });

    return reply.status(200).send();
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(404).send(err.message);
    }
  }
};
