import { OrganizationAlredyExistsError } from "@/services/errors/organizationAlredyExistsError";
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
    cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/),
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
    cnpj,
  } = registerOrganizationBodySchema.parse(request.body);

  const registerOrganizationService = makeRegisterOrganizationService();

  try {
    await registerOrganizationService.execute({
      organization: {
        cnpj,
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
    if (err instanceof OrganizationAlredyExistsError) {
      return reply.status(409).send(err.message);
    }
  }
};
