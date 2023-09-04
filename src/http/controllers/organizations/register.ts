import { ResourceNotFound } from "@/services/errors/resourceNotFound";
import { makeRegisterOrganizationService } from "@/services/factories/organizations/makeRegisterOrganization";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerOrganizationBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    password: z.string(),
    imageUrls: z.array(z.string()).optional(),
    cep: z.string().regex(/^\d{5}-\d{3}$/),
    city: z.string(),
    state: z.string(),
    street: z.string(),
    email: z.string().email(),
    phone: z.string(),
  });

  const {
    description,
    imageUrls,
    name,
    cep,
    city,
    email,
    phone,
    state,
    street,
    password,
  } = registerOrganizationBodySchema.parse(request.body);

  const registerOrganizationService = makeRegisterOrganizationService();

  try {
    await registerOrganizationService.execute({
      organization: {
        password,
        description,
        name,
        cep,
        city,
        state,
        street,
        email,
        phone,
      },
      imageUrls,
    });

    return reply.status(201).send();
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(401).send(err.message);
    }
  }
};
